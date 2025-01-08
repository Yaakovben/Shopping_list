import React, { useEffect, useState } from 'react'
import { fetchGetMyLists } from '../../Fetches/allMyList'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import productDTO from '../../types/DTO/productDTO';
import { fetchchangeStatus } from '../../Fetches/changeStatus';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../main';

export default function ViewList() {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const[myLists,setMyLists]= useState([])
  const[selectedList,setSelectedList]= useState("")
  const[products,setProducts] = useState<productDTO[]>([])
  const[addedProduct,setAddedProduct] = useState(0)


    const fetchMyLists = async()=>{
      try {
         const data = await fetchGetMyLists(`http://localhost:7160/api/buyin-group/all-my-lists/${username}`)
         setMyLists(data)
         if(data.length> 0){
         setSelectedList( data[0])
         const productsData = await fetchGetMyLists(`http://localhost:7160/api/product/get-all-products/${data[0]}`);
            setProducts(productsData);
         }else{
          setSelectedList("")
         }
      }catch (err) {
        console.log(err);
      }} 
      
      useEffect(() => {
        if (!user?.username){
          navigate("/login")
        }
      },[user]);


      useEffect(()=>{
        fetchMyLists()
      },[])


      useEffect(()=>{
        const updatedProducts = async ()=>{
          if(selectedList !==""){
          const productsData = await fetchGetMyLists(`http://localhost:7160/api/product/get-all-products/${selectedList}`);
          setProducts(productsData);
          }
        }
        updatedProducts()
      },[addedProduct])


      useEffect(() => {
        // התחבר לחדר (החדר הוא שמו של הרשימה)
        if (selectedList !="") {
          socket.emit('joinRoom', selectedList);  // שלח את שם החדר   
        }
        return () => {
          socket.emit('leaveRoom', selectedList);  // עזוב את החדר כשיוצאים
        };
      }, [selectedList]);


       const handleChange = async (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as string; 
        setSelectedList(event.target.value as string);
        if (selectedValue !== "") {
          try {
            const productsData = await fetchGetMyLists(`http://localhost:7160/api/product/get-all-products/${selectedValue}`);
            setProducts(productsData);
          } catch (error) {
            console.log("Error fetching products:", error);
          }
        } else {
          setProducts([]);
        }
      };

      const changeStatus = async(productId:string)=>{
        try {
          const changeProduct = await fetchchangeStatus("http://localhost:7160/api/product/change-status",selectedList,productId)
          setProducts(changeProduct.lists_products)
        } catch (err) {
          console.log(err);
        }
      }
      
      

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
            <TableCell>נקנה</TableCell>
            <TableCell>ערוך</TableCell>
            <TableCell>מחק</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.length >0 ? products.map((p) => (
            <TableRow key={p._id} onClick={()=>changeStatus(p._id)} className={p.bought?"bought":"unbought"}>
              <TableCell>{p.created_at}</TableCell>
              <TableCell>{p.details == null ? "אין פרטים נוספים":p.details}</TableCell>
              <TableCell>{p.amount}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.bought?"✅":"❌"}</TableCell>
              <TableCell>✏️</TableCell>
              <TableCell>🗑️</TableCell>   
            </TableRow>
          )):   
          <TableRow>
            <TableCell colSpan={7} align="center" style={{ fontSize: "18px", fontWeight: "bold", color: "#888" }}>
              רשימה זו ריקה
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}




