"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const UseProductDetails = () => {
  const { Slug } = useParams();
  const [Product, setProduct] = useState([]);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [Rating, setRating] = useState(0);
  const [Comment, setComment] = useState("");
  const [Reviews, setReviews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const isAuth = useSelector((state) => state.Login.isAuth);
  const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
  const BreadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Proudct" },
    { name: Product?.Name },
  ];

  const GetReviews = async (ProductID) => {
    const response = await axios.get("api/product/review/" + ProductID);
    const result = response.data;
    setReviews(result.Review);
  };

  const AddReview = async (ProductID) => {
    try {
      if (!isAuth) {
        router.push("/auth/login");
        return;
      }
      if (Rating == 0 || Comment == "") {
        toast.error("Please rate the product");
        return;
      }
      const response = await axios.post("api/product/review/add", {
        UserID,
        ProductID,
        Rating,
        Comment,
      });
      if (response.data.status == 201) {
        await GetReviews(ProductID);
        setRating(0);
        setComment("");
        toast.success("Success! Review added");
      }
    } catch (error) {
      if (error.status == 401) {
        toast.error("Review allowed only once!");
      } else {
        toast.error(error.message);
      }
    }
  };

  async function GetProductInfo() {
    const response = await axios.get("api/product/" + Slug);
    const result = response.data;
    setProduct(result[0]);
    return result[0];
  }

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    Product.Quantity = quantity;
  }, [quantity]);



  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    (async () => {
      try {
        const productData = await GetProductInfo();
        if (productData?._id) {
          await GetReviews(productData._id);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [Slug]);

  return {
    quantity,
    GetProductInfo,
    incrementQuantity,
    decrementQuantity,
    BreadcrumbItems,
    Product,
    thumbsSwiper,
    setThumbsSwiper,
    AddReview,
    Rating,
    setRating,
    Comment,
    setComment,
    Reviews,
    BASE_IMAGES_PATH,
    GetReviews,
    loading
  };
};

export default UseProductDetails;
