"use client"
import { useEffect, useState } from "react";
import useCartActions from "./Cart";
import axios from "@/lib/axios";
// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAddress } from "@/Components/Redux/Slices/CheckoutSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useCheckoutActions = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // const { enqueueSnackbar: ShowNotification } = useSnackbar();
    const { CartItems, UserID, PickupLocation } = useCartActions();
    const [showAllProducts, setShowAllProducts] = useState(false)
    const initialProductsToShow = 2
    const hasMoreProducts = CartItems.length > initialProductsToShow
    const visibleProducts = showAllProducts ? CartItems : CartItems.slice(0, initialProductsToShow)
    const PaymentMethod = useSelector((state) => state.Checkout.PaymentMethod);
    const AddressID = useSelector((state) => state.Checkout.Address.ID);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [Addresses, setAddresses] = useState([]);
    const [NewAddress, setNewAddress] = useState({
        UserID: UserID,
        AddressName: "",
        Name: "",
        Phone: "",
        Address: "",
        City: "",
        PostalCode: null,
    })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onload = (event) => {
                setFilePreview(event.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddressChange = (e) => {
        setNewAddress((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddressSubmit = async () => {
        if (!NewAddress.Name || !NewAddress.Address || !NewAddress.City || !NewAddress.Phone) {
            toast.error('Please fill the form!');
            return;
        }
        if (NewAddress.Phone.length < 10) {
            toast.error('Please enter a valid number!');
            return;
        }

        try {
            const response = await axios.post('api/checkout/delivery/add', NewAddress);
            if (response.status == 201) {
                const NewAddressObj = {
                    ID: response.data.AddressID,
                    Name: NewAddress.Name,
                    Address: `${NewAddress.Address}, ${NewAddress.City}${NewAddress.PostalCode ? ", " + NewAddress.PostalCode : ""}`,
                    Phone: NewAddress.Phone,
                }
                setAddresses((prev) => [...prev, NewAddressObj])
                setNewAddress({
                    UserID: UserID,
                    AddressName: "",
                    Name: "",
                    Phone: "",
                    Address: "",
                    City: "",
                    PostalCode: null,
                })
                dispatch(UpdateAddress({ Address: NewAddressObj }))
                setDialogOpen(false)
                GetInitialAddress();
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
    const GetInitialAddress = async () => {
        const response = await axios.get(`api/checkout/delivery/${UserID}`);
        if (response.status === 200) {
            const newAddresses = Object.values(response.data);
            setAddresses(newAddresses);
        } else {
            ShowNotification('Something went wrong', { variant: 'error' });
        }
    };

    useEffect(() => {
        GetInitialAddress();
        if (!UserID || !PickupLocation) router.push('/account/cart');
    }, [])



    const HandelCheckout = () => {
        if ((PaymentMethod === "Bank" || PaymentMethod === "eSewa") && !filePreview) {
            toast.error("Upload screenshot!");
            return;
        }

        if (!PaymentMethod || !AddressID) {
            toast.error("Select payment & address!");
            return;
        }

        setIsSubmitting(true);
        router.push("/account/checkout/success");
    };

    return {
        PaymentMethod, showAllProducts, setShowAllProducts, hasMoreProducts, visibleProducts, handleAddressSubmit, handleAddressChange, dialogOpen, AddressID, setDialogOpen, NewAddress, Addresses, AddressID, dispatch, UpdateAddress, HandelCheckout, router, isSubmitting, setIsSubmitting, handleFileChange, filePreview, setFilePreview, selectedFile, setSelectedFile
    }
}

export default useCheckoutActions;