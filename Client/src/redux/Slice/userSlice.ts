import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataStatus } from "../../types/DTO/dataStatus";
import { userDTO } from "../../types/DTO/userDTO";
import { fetchRegister } from "../Fetches/FetchRegister";
import { fetchLogin } from "../Fetches/FetchLogin";


interface userState{
    user: userDTO | null,
    status:dataStatus,
    error: string | null,
}

const initialState: userState = {
    user: null,
    status: dataStatus.START,
    error: null,
  };
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null
        }
    },
    extraReducers:(builder:ActionReducerMapBuilder<userState>)=>{
        //הרשמה
        builder.addCase(fetchRegister.pending,(state)=>{
            state.status = dataStatus.LOADING;
            state.error = null;
        })
        .addCase(fetchRegister.fulfilled,(state,action:PayloadAction<userDTO>)=>{
            state.status= dataStatus.SUCCESS;
            state.user = action.payload as any 
        })
        .addCase(fetchRegister.rejected,(state,action)=>{
            state.status = dataStatus.FAILED;
            state.error = action.error as string
            state.user = null
        })
        // כניסה
        .addCase(fetchLogin.pending,(state)=>{
            state.status = dataStatus.LOADING
            state.error = null
            state.user = null
        })
        .addCase(fetchLogin.fulfilled,(state,action:PayloadAction)=>{
            state.status = dataStatus.SUCCESS
            state.error = null
            state.user = action.payload as any
        })
        .addCase(fetchLogin.rejected,(state,action)=>{
            state.status = dataStatus.FAILED
            state.error = action.error as string
            state.user = null
        }) 
    }
  })