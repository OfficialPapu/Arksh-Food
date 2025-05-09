import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  RemoveFromCart,
  UpdateQuantity,
  ClearCart,
  UpdatePickup,
} from "@/Components/Redux/ClientSlices/CartSlice";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { MapPin, Store, Truck, Zap } from "lucide-react";
import toast from "react-hot-toast";

const useCartActions = () => {
  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state.Cart.CartItems);
  const isAuth = useSelector((state) => state.Login.isAuth);
  const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [loading, setLoading] = useState(false);
  const PickupOptions = [
    {
      ID: "Inside-Valley",
      Value: "Inside Valley",
      Name: "Inside Valley",
      Price: 100,
      Icon: <MapPin className="h-4 w-4" />,
      Description: "Delivery within 24 hours",
    },
    {
      ID: "Outside-Valley",
      Value: "Outside Valley",
      Name: "Outside Valley",
      Price: 200,
      Icon: <Truck className="h-4 w-4" />,
      Description: "Delivery within 3-5 days",
    },
    {
      ID: "Store-Pickup",
      Value: "Store Pickup",
      Name: "Store Pickup",
      Price: 0,
      Icon: <Store className="h-4 w-4" />,
      Description: "Pick up from our store",
    },
    {
      ID: "Instant-Delivery",
      Value: "Instant Delivery",
      Name: "Instant Delivery",
      Price: 0,
      Icon: <Zap className="h-4 w-4" />,
      Description: "Shipping cost payable by you",
    },
  ];

  const [selectedPickupOption, setSelectedPickupOption] = useState(null);
  const PickupCost = useSelector((state) => state.Cart.Pickup.Cost) || 0;
  const PickupLocation =
    useSelector((state) => state.Cart.Pickup.Location) || 0;
  const router = useRouter();

  const StoreItemInDB = async (Product, UserID) => {
    try {
      const response = await axios.post("api/cart/add", { Product, UserID });
      return response.status;
    } catch (error) {
      return error.status;
    }
  };
  const RemoveFromDB = async (CartItemID) => {
    return (await axios.delete(`api/cart/remove/${CartItemID}`)).status;
  };
  const UpdateQuantityDB = async (ProductID, CartItemID, Quantity) => {
    try {
      return (
        await axios.put(`api/cart/update/${CartItemID}`, {
          ProductID,
          Quantity,
        })
      ).status;
    } catch (error) {
      return error.status;
    }
  };

  const HandleAddToCart = async (
    Product,
    ReAddingItem = false,
    BuyNow = false
  ) => {
    Product.BuyNow = BuyNow;
    if (BuyNow) {
      dispatch(ClearCart());
    }
    const isAlreadyInCart = IsProductInCart(Product._id);
    if (!isAuth) {
      router.push("/auth/login");
      return;
    }
    if (isAlreadyInCart && !ReAddingItem && !BuyNow) {
      toast.error("Oops! Already in your cart");
      return;
    }
    if (loading) return;
    setLoading(true);
    const StatusCode = !ReAddingItem
      ? await StoreItemInDB(Product, UserID)
      : 201;
    if (StatusCode == 450) {
      toast.error("Low in stock");
      setLoading(false);
      return;
    }
    if (StatusCode == 201) {
      dispatch(
        AddToCart({
          ProductID: ReAddingItem ? Product.ID : Product._id,
          CartItemID: ReAddingItem ? Product.CartItemID : null,
          Name: ReAddingItem ? Product.Title : Product.Name,
          Price: Product.Price,
          Discount: ReAddingItem
            ? Product.Discount
            : Product.Discount.Percentage,
          Image: ReAddingItem
            ? Product.ImageUrl
            : BASE_IMAGES_PATH + Product.Media.Images[0],
          Quantity: Product.Quantity,
          SlugUrl: ReAddingItem ? Product.SlugUrl : Product.Slug,
        })
      );
      !ReAddingItem && !BuyNow
        ? toast.success("Success! Item added to cart")
        : "";
    } else {
      toast.error("Something went wrong");
    }
    if (BuyNow) {
      router.push("/account/cart");
    }
    setLoading(false);
  };

  const HandelRemoveFromCart = async (ProductID, CartItemID) => {
    const StatusCode = await RemoveFromDB(CartItemID);
    if (StatusCode == 200) {
      dispatch(RemoveFromCart({ ProductID }));
    } else {
      toast.error("Unable to remove");
    }
  };

  const HandelUpdateQuantity = async (ProductID, Quantity, CartItemID) => {
    if (Quantity <= 0) {
      return;
    }
    const StatusCode = await UpdateQuantityDB(ProductID, CartItemID, Quantity);
    if (StatusCode == 200) {
      dispatch(UpdateQuantity({ ProductID, Quantity }));
    } else if (StatusCode == 450) {
      toast.error("Low in stock");
    } else {
      toast.error("Unable to update");
    }
  };

  const IsProductInCart = (ProductID) => {
    return CartItems.some((item) => item.ProductID === ProductID);
  };

  const GetCartItems = async () => {
    dispatch(ClearCart());
    try {
      const response = await axios.get(`api/cart/items/${UserID}`);
      if (response.status == 200) {
        Object.keys(response.data).forEach((key) => {
          const Product = {
            ID: response.data[key].ProductID._id,
            CartItemID: response.data[key]._id,
            Title: response.data[key].ProductID.Name,
            Price: response.data[key].ProductID.Price,
            Discount: response.data[key].ProductID.Discount.Percentage,
            ImageUrl:
              BASE_IMAGES_PATH + response.data[key].ProductID.Media.Images[0],
            Quantity: response.data[key].Quantity,
            SlugUrl: response.data[key].ProductID.Slug,
          };
          HandleAddToCart(Product, true);
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) { }
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if(isAuth){
      if (!hasFetched.current) {
        hasFetched.current = true;
        GetCartItems();
      }
    }
  }, []);

  const HandelCheckout = () => {
    if (selectedPickupOption) {
      router.push("/account/checkout");
    } else {
      toast.error("Please select a pickup option");
      return;
    }
  };

  const handlePickupOptionChange = (Location) => {
    setSelectedPickupOption(Location);
    let Pickup = {
      Location: Location,
      Cost: PickupOptions.find((option) => option.Name === Location).Price,
    };
    dispatch(UpdatePickup(Pickup));
  };

  const Subtotal = useSelector((state) => state.Cart.OriginalTotal);
  const Discount =
    useSelector(
      (state) => state.Cart.OriginalTotal - state.Cart.DiscountedTotal
    ) || null;
  const Total = Math.max(0, Subtotal + PickupCost - (Discount || 0));

  return {
    GetCartItems,
    HandleAddToCart,
    HandelUpdateQuantity,
    HandelRemoveFromCart,
    IsProductInCart,
    HandelCheckout,
    PickupOptions,
    handlePickupOptionChange,
    selectedPickupOption,
    PickupCost,
    Subtotal,
    Discount,
    Total,
    PickupLocation,
    CartItems,
    UserID,
    loading,
    setLoading,
  };
};

export default useCartActions;
