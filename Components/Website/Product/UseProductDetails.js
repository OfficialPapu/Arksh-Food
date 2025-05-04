"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
const UseProductDetails = () => {
  const { Slug } = useParams();
  const [Product, setProduct] = useState([]);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [Rating, setRating] = useState(0);
  const [Comment, setComment] = useState("");
  const [Reviews, setReviews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const BreadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Proudct" },
    { name: Product?.Name },
  ];

  const AddReview = async () => {
    // try {
    //     if (!isAuth) {
    //         router.push("/auth/login");
    //         return;
    //     }
    //     if (Rating == 0 || Comment == "") {
    //         ShowNotification('Please rate the product', { variant: 'error' });
    //         return;
    //     }
    //     const response = await axios.post('api/product/review/add', { UserID, ProductID: Product._id, Rating, Comment });
    //     if (response.status == 201) {
    //         GetReviews();
    //         setRating(0);
    //         setComment("");
    //         ShowNotification('Success! Review added', { variant: 'success' });
    //     }
    // } catch (error) {
    //     if (error.status == 400) {
    //         ShowNotification('Review allowed only once!', { variant: 'error' });
    //     } else {
    //         ShowNotification('Something went wrong', { variant: 'error' });
    //     }
    // }
  };

  async function GetProductInfo() {
    const response = await axios.get("api/product/" + Slug);
    const result = response.data;
    console.log(response.data);

    // setBreadcrumbView((prv) =>
    //     prv.map((item, index) =>
    //         index === 2 ? { ...item, label: result[0].Name } : item
    //     )
    // );
    setProduct(result[0]);
  }

  useEffect(() => {
    GetProductInfo();
  }, []);

  return {
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
  };
};

export default UseProductDetails;
