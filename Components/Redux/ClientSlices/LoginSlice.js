import { createSlice } from "@reduxjs/toolkit"

const LoginSlice = createSlice({
    name: "Login",
    initialState: {
        isAuth: false,
        UserDetails: null
    },
    reducers: {
        Login: (state, action) => {
            state.isAuth = true;
            state.UserDetails = action.payload;
        },
        Logout: (state) => {
            state.isAuth = false;
            state.UserDetails = null;
        }
    }
})
export const { Login, Logout } = LoginSlice.actions;
export default LoginSlice.reducer;