import React, { useEffect, useState } from 'react'
import { fetchGetMyLists } from '../../Fetches/allMyList'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import productDTO from '../../types/DTO/productDTO';

export default function ViewList() {

    const username = localStorage.getItem("username");
    const[myLists,setMyLists]= useState([])
    const[selectedList,setSelectedList]= useState("")
    const[products,setProducts] = useState<productDTO[]>([])


    const fetchMyLists = async()=>{
      try {
         const data = await fetchGetMyLists(`http://localhost:7160/api/buyin-group/all-my-lists/${username}`)
         setMyLists(data)
         setSelectedList(data.length> 0 ? data[0]:"")
        }  
        catch (err) {
          console.log(err);
        }}

        useEffect(()=>{
          fetchMyLists()
          console.log(myLists);
          console.log(selectedList);
          
       },[])

       const handleChange =async (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as string;
        setSelectedList(selectedValue);
        if(selectedList && selectedValue !== ""){
          try {
            const productsData = await fetchGetMyLists(`http://localhost:7160/api/product/get-all-products/${selectedList}`)
            setProducts(productsData)
          } catch (error) {
            console.log(error,"lolo");
            
          }
        }else{
          setProducts([])
        }
       
      };
        
      

    
  return (
    <div className='view-list'>
      <h1 className='title'>רשימת קניות :{selectedList===""?"לא נבחרה רשימה":selectedList}</h1>
      <Box sx={{ minWidth: 120 }}>
      <FormControl style={{width:"280px"}}>
        <InputLabel id="demo-simple-select-label">בחירת רשימה</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedList}
          label="בחירת רשימה"
          onChange={handleChange}
        >
          <MenuItem value="" >בחר רשימה</MenuItem>
          {myLists && myLists.length>0 && myLists.map((list:any,index)=><MenuItem key={index} value={list}>{list}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>

    <TableContainer component={Paper} style={{ margin: "20px auto", width: "80%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>תאריך יצירה</TableCell>
            <TableCell>הערה</TableCell>
            <TableCell>כמות</TableCell>
            <TableCell>מוצר</TableCell>
            <TableCell>ערוך</TableCell>
            <TableCell>מחק</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.length >0 && products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.created_at}</TableCell>
              <TableCell>{p.details == null ? "אין פרטים נוספים":p.details}</TableCell>
              <TableCell>{p.amount}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>✏️</TableCell>
              <TableCell>🗑️</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    


    </div>
  )
}




