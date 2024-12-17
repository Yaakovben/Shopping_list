import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import { fetchRegister } from '../../redux/Fetches/FetchRegister';
import {useAppDispatch} from '../../redux/store'

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = () => {

    dispatch(fetchRegister({
      username:username,
      password:password
      }))
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>{handleSubmit()}}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
