import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline, Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/Fetches/FetchLogin';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.user.status);
  const user = useAppSelector((state) => state.user.user);
  

  useEffect(() => {
    if (userStatus === "success") {
      setMessage("Login was successful!");
      setMessageType('success');
      setOpen(true);
    } else if (userStatus === "failed") {
      setMessage("Login failed. Please try again.");
      setMessageType('error');
      setOpen(true);
    }
  }, [userStatus]);
  
  
  useEffect(() => {
    if (user?.username)
      setTimeout(() => {
    navigate("/view-list")
        
      },0   )
     
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ username, password }));
  };

  return (
    <div className='container-register-login'>
      <div className="register-login">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
              Login
            </Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
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
                disabled={!username || !password}
              >
                Login
              </Button>
            </Box>
            <h3>Don't have an account?<a href="/register">Register</a></h3>
          </Box>
        </Container>


        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={messageType}
            sx={{
              width: '100%',
              borderRadius: 1,
              boxShadow: 3,
              fontWeight: 'bold',
              padding: '8px',
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
