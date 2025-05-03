const { createSlice } = require("@reduxjs/toolkit");

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState: {
    PaymentMethod: null,
    Address: [],
    CheckoutItems: [],
    OrderID: null,
    Subtotal: null,
    Discount: null,
    Total: null,
    PaymentScreenshot: null
  },
  reducers: {
    UpdatePaymentMethod: (state, action) => {
      state.PaymentMethod = action.payload.PaymentMethod;
    },
    UpdateAddress: (state, action) => {
      state.Address = action.payload.Address;
    },
    ClearCheckoutState: (state) => {
      state.Address = [];
      state.PaymentMethod = null;
    },
    Converted: (state, action) => {
      const { CartItems } = action.payload;
      state.CheckoutItems = CartItems;
    },
    HandelOrderPlace: (state, action) => {
      const { OrderID, Total, Subtotal, Discount } = action.payload;
      state.OrderID = OrderID;
      state.Total = Total;
      state.Subtotal = Subtotal;
      state.Discount = Discount;
    },
    HandelPaymentProof: (state, action) => {
      state.PaymentScreenshot = action.payload;
    },
    ClearPaymentProof: (state) => {
      state.PaymentScreenshot = null;
    }
  }
})

export const ConvertCartToCheckout = () => (dispatch, getState) => {
  const cartState = getState().Cart;
  dispatch(
    CheckoutSlice.actions.Converted({
      CartItems: cartState.CartItems,
    })
  );
};

export const { UpdatePaymentMethod, UpdateAddress, ClearCheckoutState, HandelOrderPlace, HandelPaymentProof, ClearPaymentProof } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;