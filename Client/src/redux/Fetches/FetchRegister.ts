import { createAsyncThunk } from "@reduxjs/toolkit";
import registerDTO from "../../types/DTO/registerDTO";
import { userDTO } from "../../types/DTO/userDTO";
 export const fetchRegister = createAsyncThunk('user/register',
    async(user:registerDTO, thunkApi) =>{
        try {
            const res:Response = await fetch('http://localhost:8200/api/user/register',{
                method:'POST',
                headers:{'Content-Type': 'application/json' },
                body:JSON.stringify(user)
            });
            if(!res.ok){
                return thunkApi.rejectWithValue('Cannot register, please try again 🥲')
            }
            const data = await res.json()
            return thunkApi.fulfillWithValue(data)
        } catch (err) {
            return  thunkApi.rejectWithValue('Cannot register, please try again 🥲');
            
        }
    }
 )