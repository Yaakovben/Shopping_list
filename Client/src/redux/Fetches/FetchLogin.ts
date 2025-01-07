import { createAsyncThunk } from "@reduxjs/toolkit";
import userDetailsDTO from "../../types/DTO/userDetailsDTO";


 export const fetchLogin = createAsyncThunk('user/login',
    async(user:userDetailsDTO, thunkApi) =>{
        try {
            const res:Response = await fetch('http://localhost:7160/api/user/login',{
                method:'POST',
                headers:{'Content-Type': 'application/json' },
                body:JSON.stringify(user),
                
            });
            if(!res.ok){
                return thunkApi.rejectWithValue('Cannot login, please try again 🥲')
            }
            const data = await res.json()
            localStorage.setItem('token', data.token);
            localStorage.setItem('username',data.username)
            return thunkApi.fulfillWithValue(data)
        } catch (err) {
            return  thunkApi.rejectWithValue('Cannot login, please try again 🥲');      
        }
    } 
 )