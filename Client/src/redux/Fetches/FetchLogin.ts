import { createAsyncThunk } from "@reduxjs/toolkit";

import getTodoGroup from "../../types/DTO/GetTodoGroup";
 export const fetchLogin = createAsyncThunk('user/login',
    async(user:getTodoGroup, thunkApi) =>{
        try {
            const res:Response = await fetch('http://localhost:8200/api/user/login',{
                method:'POST',
                headers:{'Content-Type': 'application/json' },
                body:JSON.stringify(user)
            });
            if(!res.ok){
                return thunkApi.rejectWithValue('Cannot login, please try again 🥲')
            }
            const data = await res.json()

            localStorage.setItem('token', data.token);
            return thunkApi.fulfillWithValue(data)
        } catch (err) {
            return  thunkApi.rejectWithValue('Cannot login, please try again 🥲');      
        }
    } 
 )