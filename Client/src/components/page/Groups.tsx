import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { fetchGetMyLists } from '../../Fetches/allMyList';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { fetchchLeaveGroup } from '../../Fetches/LeaveGroup';

export default function Groups() {
  const user = useAppSelector((state) => state.user.user);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [myLists, setMyLists] = useState<any>([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchMyLists();
  }, [myLists]);

  

  const fetchMyLists = async () => {
    try {
      const res = await fetchGetMyLists(
        `http://localhost:7160/api/buyin-group/all-my-lists/${username}`
      );
      setMyLists(res.lists.list_products);
    } catch (err) {
      console.log("Error fetching lists:", err);
    }
  };

  const handleLeaveGroup = async(group_name:string)=>{
    try {
      await fetchchLeaveGroup("http://localhost:7160/api/buyin-group/left-group",group_name,userId as string)
      const res = await fetchMyLists()
      setMyLists(res); 
    } catch (error) { 
    }
  }

  return (
    <div className='group'>
    <h1 className='title-Card'>הקבוצות שלי</h1>
     <div className='all-card'>
      {myLists && myLists.length >0 ? myLists.map((product: any) => (  
        <Card key={product._id} className='card-group'>
          <CardContent >
            <h1>שם הקבוצה:{product.group_name}</h1>
            <div className='members-list'>
                <h4>חברי הקבוצה</h4>
                {product.group_members?.map((member: any) => (
                <Typography key={member._id} variant="body1"  
               >
                  {member.username}
                </Typography>
              ))}
            </div>
            <Button variant="contained"  fullWidth onClick={()=>{handleLeaveGroup(product.group_name)}} >
                עזוב קבוצה
            </Button>
          </CardContent>
        </Card>
      )):<h2>אין לך עדיין רשימות, זה הזמן ליצור/להצטרף</h2>}
      </div>
    </div>
  );
}
