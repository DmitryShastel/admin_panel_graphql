// import {createSlice, PayloadAction} from "@reduxjs/toolkit";
//
//
// const initialState = {
//     isLoggedIn: false
// }
//
// type Login = {
//     email: 'admin@gmail.com'
//     password: 'admin'
// }
//
// export const loginSlice = createSlice({
//     name: 'login',
//     initialState: initialState,
//     reducers: {
//         loginToApp(state, action: PayloadAction<Login>) {
//             action.payload.email === 'admin@gmail.com' && action.payload.password === 'admin'
//                 ? state.isLoggedIn = true : state.isLoggedIn = false
//         }
//     },
//     selectors: {selectIsLoggedIn: (state) => state.isLoggedIn}
// })
//
// export const authReducer = loginSlice.reducer
// export const {selectIsLoggedIn} = loginSlice.selectors
// export const authActions = loginSlice.actions