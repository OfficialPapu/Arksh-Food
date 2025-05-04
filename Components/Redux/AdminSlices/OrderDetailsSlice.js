const { createSlice } = require("@reduxjs/toolkit");

const OrderDetailsSlice = createSlice({
    name: "OrderDetails",
    initialState: {
        OrderData: [],
        UpdateStatusDialogOpen: false,
        NewStatus: "",
    },
    reducers: {
        HandelDialogChanges: (state) => {
            state.UpdateStatusDialogOpen = !state.UpdateStatusDialogOpen
        },
        HandelStatusChanges: (state, action) => {
            const { status } = action.payload;
            state.NewStatus = status;
        },
        HandelOrderData: (state, action) => {
            state.OrderData = action.payload;
        },
        HandelOrderDataStatusChanges: (state, action) => {
            const { updateMode, selectedItems, NewStatus } = action.payload;
            state.OrderData.Shipping.Status = NewStatus;
            if (updateMode == "all") {
                state.OrderData.OrderItemsID.forEach(item => {
                    item.Status = NewStatus;
                });
            } else {
                state.OrderData.OrderItemsID.forEach(item => {
                    if (selectedItems.includes(item._id)) {
                        item.Status = NewStatus;
                    } else {
                        item.Status = "Cancelled";
                    }
                });
            }
        }
    }
})

export const { HandelDialogChanges, HandelStatusChanges, HandelOrderData, HandelOrderDataStatusChanges } = OrderDetailsSlice.actions;
export default OrderDetailsSlice.reducer;