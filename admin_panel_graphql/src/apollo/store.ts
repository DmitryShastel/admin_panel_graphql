import {AnyAction} from "redux";
import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {authReducer, loginSlice} from "@/features/auth/model/authSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        [loginSlice.name]: authReducer
    }
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType>  = useSelector
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>



