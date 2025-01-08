import { useState } from "react";
import {AppBar,Toolbar,IconButton,Typography,Drawer,List,ListItem,ListItemText, Avatar, Container,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from "../redux/store";
import LogoutIcon from '@mui/icons-material/Logout';

import { userSlice } from "../redux/Slice/userSlice";


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handle = (url: string) => {
        navigate(url);
        setIsOpen(false);
    }
    const toggleDrawer =(open: boolean) => () => {
            setIsOpen(open);
        };

    return (
        <>
            <AppBar position="static">
            <Container maxWidth="xl" sx={{ backgroundColor: " #f8e518" }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" color="#white" sx={{
                            flexGrow: 1,
                            textAlign: "center",
                             fontWeight: "bold"
                            
                        }}>
                     ~ ~Shooping List~ ~
                    </Typography>

                    <IconButton  sx={{
                                        marginLeft: "auto",
                                    }}>
                               <LogoutIcon style={{ fontSize: 40, color: 'white'}} />
                    </IconButton>
                   
                </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    <ListItem className="listItem" >
                        <ListItemText primary="רשימות קניות" onClick={()=>handle("/view-list")}/>
                    </ListItem>
                    <ListItem className="listItem" >
                        <ListItemText primary="ניהול קבוצות" onClick={()=>handle("/groups")}/>
                    </ListItem>
                    <ListItem className="listItem" >
                        <ListItemText primary="אודות" onClick={()=>handle("/about")}/>
                    </ListItem>
                    <ListItem className="listItem" >
                        <ListItemText primary="התנתק"onClick={() => dispatch(userSlice.actions.logout())}/>
                    </ListItem>
                    
                </List>
            </Drawer>
        </>
    );
}