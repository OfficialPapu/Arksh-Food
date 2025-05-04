"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getStatusColor,
  getStatusDotColor,
} from "@/Components/ui/getStatusColor";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/lib/axios";
import {
  HandelDialogChanges,
  HandelStatusChanges,
  HandelOrderData,
  HandelOrderDataStatusChanges,
} from "@/Components/Redux/AdminSlices/OrderDetailsSlice";
import toast from "react-hot-toast";

const useOrderDetailsActions = () => {
  let OrderData = useSelector((state) => state.AdminOrderDetails.OrderData);
  const dispatch = useDispatch();
  const { OrderID } = useParams();
  const isUpdateStatusDialogOpen = useSelector(
    (state) => state.AdminOrderDetails.UpdateStatusDialogOpen
  );
  const NewStatus = useSelector((state) => state.AdminOrderDetails.NewStatus);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateMode, setUpdateMode] = useState("all");
  const [isProductListExpanded, setIsProductListExpanded] = useState(false);
  const BASE_IMAGES_PATH = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectInfo, setisCorrectInfo] = useState(false);
  const FetchOrderDetials = async (OrderID) => {
    try {
      const response = await axios.get(`api/admin/orders/${OrderID}`);
      dispatch(HandelOrderData(response.data));
      dispatch(HandelStatusChanges({ status: response.data.Shipping.Status }));
      setisCorrectInfo(true);
    } catch (error) {
      toast.error(`Something went wrong!`);
    }
  };

  useEffect(() => {
    if (isUpdateStatusDialogOpen) {
      setSelectedItems([]);
      setUpdateMode("all");
      setIsProductListExpanded(false);
    }
  }, [isUpdateStatusDialogOpen]);

  const selectAllItems = () => {
    if (selectedItems.length === OrderData.OrderItemsID.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(OrderData.OrderItemsID.map((item) => item._id));
    }
  };

  const handleModeChange = (mode) => {
    setUpdateMode(mode);
    if (mode === "all") {
      setSelectedItems([]);
    }
  };

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      const ApiData = { updateMode, selectedItems, NewStatus };
      const response = await axios.put(`api/admin/order/${OrderID}`, ApiData);
      if (response.status == 200) {
        toast.success(`Status Updated to ${NewStatus}`);
        dispatch(HandelOrderDataStatusChanges(ApiData));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      dispatch(HandelDialogChanges());
      setSelectedItems([]);
    }
  };

  return {
    getStatusColor,
    getStatusDotColor,
    OrderData,
    setActiveTab,
    isUpdateStatusDialogOpen,
    handleStatusUpdate,
    dispatch,
    selectAllItems,
    updateMode,
    BASE_IMAGES_PATH,
    setUpdateMode,
    handleModeChange,
    selectedItems,
    isProductListExpanded,
    setIsProductListExpanded,
    setSelectedItems,
    NewStatus,
    isLoading,
    FetchOrderDetials,
    OrderID,
    isCorrectInfo,
  };
};

export default useOrderDetailsActions;
