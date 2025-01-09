import React, { SyntheticEvent, useEffect, useState } from "react";
import { fetchGetMyLists } from "../../Fetches/allMyList";
import { Box,Button,Fab,FormControl,InputLabel,MenuItem,Paper,Popover,Select,SelectChangeEvent,Snackbar,SnackbarCloseReason,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,Typography,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import productDTO from "../../types/DTO/productDTO";
import { fetchchangeStatus } from "../../Fetches/changeStatus";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { socket } from "../../main";
import { fetchchDeleteProduct } from "../../Fetches/deleteProduct";
import { fetchchAddNewProduct } from "../../Fetches/addNewProduct";
import { fetchchUpdateProduct } from "../../Fetches/updateProduct";

export default function ViewList() {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [myLists, setMyLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [products, setProducts] = useState<productDTO[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [openWindow, setOpenWindow] = useState(false);
  const [update,setUpdate] =useState(false)
  const [updateId,setUpdateID] =useState("")
 
  const [newProductName, setNewProductName] = useState("");
  const [newProductDetails, setNewProductDetails] = useState<string>("");
  const [newProductAmount, setNewProductAmount] = useState(1);

  socket.on("theUpdatedList", (products) => {
    setProducts(products);
    setOpenSnackbar(true);
    setMessage(
      `"${username}" עודכן ברגע זה על ידי  ${selectedList}שים לב סטטוס של מוצר מרשימת   `
    );
  });

  socket.on("theUpdatedListAfterDelete", (products) => {
    setProducts(products);
    setOpenSnackbar(true);
    setMessage(` מחק ברגע זה פריט "${selectedList} שים לב מישהו מקבוצת "`);
  });

  socket.on("theUpdatedListAfterAdd", (products) => {
    setProducts(products);
    setOpenSnackbar(true);
    setMessage(`מוצר חדש נוסף בקבוצה`);
  });
  socket.on("theUpdatedListAfterupdate", (products) => {
    setProducts(products);
    setOpenSnackbar(true);
    setMessage(`בוצע עדכון למוצר ברשימה זו`);
  });

  const fetchMyLists = async () => {
    try {
      const res = await fetchGetMyLists(
        `http://localhost:7160/api/buyin-group/all-my-lists/${username}`
      );
      const data = res.namesLists
      setMyLists(data);
      if (data.length > 0) {
        setSelectedList(data[0]);
        const productsData = await fetchGetMyLists(
          `http://localhost:7160/api/product/get-all-products/${data[0]}`
        );
        setProducts(productsData);
      } else {
        setSelectedList("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchMyLists();
  }, []);

  useEffect(() => {}, [products]);

  useEffect(() => {
    if (selectedList !== "") {
      socket.emit("joinRoom", selectedList);
    }
    return () => {
      if (selectedList !== "") {
        socket.emit("leaveRoom", selectedList);
      }
    };
  }, [selectedList]);

  const handleChange = async (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedList(event.target.value as string);
    if (selectedValue !== "") {
      try {
        const productsData = await fetchGetMyLists(
          `http://localhost:7160/api/product/get-all-products/${selectedValue}`
        );
        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    } else {
      setProducts([]);
    }
  };

  const changeStatus = async (productId: string) => {
    try {
      const changeProduct = await fetchchangeStatus(
        "http://localhost:7160/api/product/change-status",
        selectedList,
        productId
      );
      setProducts(changeProduct.lists_products);
      socket.emit("productUpdated", selectedList);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = async (event: React.MouseEvent, productId: string) => {
    try {
      event.stopPropagation();
      const newList = await fetchchDeleteProduct(
        "http://localhost:7160/api/product/delete-product",
        selectedList,
        productId
      );
      setProducts(newList.lists_products);
      socket.emit("deleteProduct", selectedList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (event: React.MouseEvent) => {
    try {
      if(newProductName ==="" || newProductAmount===null){
        alert("לא ניתן להוסיף ללא שם מוצר וכמות")
        setOpenWindow(false)
        return}
      event.stopPropagation();
      const newProduct = await fetchchAddNewProduct("http://localhost:7160/api/product/add-product",selectedList,newProductName,newProductDetails,newProductAmount);
      setProducts(newProduct.lists_products);
      socket.emit("addProduct", selectedList);
      setOpenWindow(false);
      setNewProductName("")
      setNewProductDetails("")
      setNewProductAmount(1)
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateProduct = async (event: React.MouseEvent) => {
    try {
      if(newProductName ==="" || newProductAmount===null){
        alert("לא ניתן לעדכן ללא שם מוצר וכמות")
        setUpdate(false)
        setOpenWindow(false)
        return}
      event.stopPropagation();
      const newProduct = await fetchchUpdateProduct("http://localhost:7160/api/product/change-details",selectedList,newProductName,newProductDetails,newProductAmount,updateId);
      setProducts(newProduct.lists_products);
      socket.emit("updateProduct", selectedList);
      setOpenWindow(false);
      setTimeout(()=>{setUpdate(false)},1000)
      
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleSnackbarClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason !== "clickaway") {
      setOpenSnackbar(false);
    }
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="large"
        onClick={() => setOpenSnackbar(false)}
      >
        סגור
      </Button>
    </React.Fragment>
  );

  function handleCloseWindow(): void {
    setOpenWindow(false);
  }

  return (
    <div className="view-list">
      <h1 className="title">
        רשימת קניות :{selectedList === "" ? "לא נבחרה רשימה" : selectedList}
      </h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl style={{ width: "280px" }}>
          <InputLabel id="demo-simple-select-label">בחירת רשימה</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedList}
            label="בחירת רשימה"
            onChange={handleChange}
          >
            <MenuItem value="">בחר רשימה</MenuItem>
            {myLists &&
              myLists.length > 0 &&
              myLists.map((list: any, index) => (
                <MenuItem key={index} value={list}>
                  {list}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        style={{ margin: "20px auto", width: "80%" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מחק</TableCell>
              <TableCell>ערוך</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>כמות</TableCell>
              <TableCell>מוצר</TableCell>
              <TableCell>הערה</TableCell>
              <TableCell>תאריך יצירה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((p) => (
                <TableRow
                  key={p._id}
                  onClick={() => changeStatus(p._id)}
                  className={p.bought ? "bought" : "unbought"}
                >
                  <TableCell onClick={(event) => deleteProduct(event, p._id)}>
                  <DeleteIcon sx={{ fontSize: 30, color: 'red' }} />
                  </TableCell>
                  <TableCell onClick={(event)=>{setUpdate(true),setOpenWindow(true),event.stopPropagation(),setUpdateID(p._id),setNewProductName(p.name),setNewProductAmount(p.amount),setNewProductDetails(p.details as string)}}><EditIcon  style={{ fontSize: 30, color: 'blue' }} /></TableCell>
                  <TableCell>{p.bought ? "נקנה" : "לא נקנה"}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    {p.details == null || p.details == "" ? "אין פרטים נוספים" : p.details}
                  </TableCell>
                  <TableCell>{p.created_at}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#888",
                  }}
                >
                  רשימה זו ריקה
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={
          <Box sx={{ display: "flex", alignItems: "center", color: "whith" }}>
            {message}
          </Box>
        }
        action={action}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#d4edda",
            color: "#155724",
            fontWeight: "bold",
          },
        }}
      />

      <Popover
        open={openWindow}
        onClose={handleCloseWindow}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Typography
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 2,
          }}
        >
          <h1>{update?"עדכון מוצר":"הוספת מוצר חדש"}</h1>
          <TextField
            id="outlined-multiline-flexible"
            label="שם המוצר"
            multiline
            maxRows={4}
            value={newProductName}
            onChange={(e) => {
              setNewProductName(e.target.value);
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="כמות"
            multiline
            type="number"
            value={newProductAmount}
            onChange={(e) => {
              setNewProductAmount(parseInt(e.target.value));
            }}
            maxRows={4}
          />
          <TextField
            id="outlined-disabled"
            label="הערה"
            value={newProductDetails}
            onChange={(e) => {
              setNewProductDetails(e.target.value);
            }}
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="שם הרשימה"
            value={selectedList}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: " #f8e518" }}
            onClick={update?handleUpdateProduct :handleAddProduct}
          >
            {update?"עידכון":"הוספה"}
          </Button>
        </Typography>
      </Popover>

      <Fab
        aria-label="add"
        onClick={() => {
          setUpdate(false)
          setOpenWindow(true);
          setNewProductName("");  
          setNewProductDetails("");  
          setNewProductAmount(1);  
        }}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: " #f8e518",
          "&:hover": {
            backgroundColor: "rgb(222, 208, 58)", 
          },
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
