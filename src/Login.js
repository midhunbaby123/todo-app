import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setErrorMessage('');

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User  logged in
        const user = userCredential.user;
        console.log('User logged in:', user);

        // Fetch the user's todo list
        fetchUserTodos(user.uid);
      })
      .catch((error) => {
        //  login error
        setErrorMessage(error.message);
        console.error('Login error:', error.message);
      });
  };

  const handleRegister = () => {
    setErrorMessage('');

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User  registered and logged in
        const user = userCredential.user;
        console.log('User registered:', user);
        
        // Fetch the user's todo list 
        fetchUserTodos(user.uid);
      })
      .catch((error) => {
        // Handle registration error
        setErrorMessage(error.message);
        console.error('Registration error:', error.message);
      });
  };

  const fetchUserTodos = async (userId) => {
    try {
      const db = firebase.firestore();
      const userTodosRef = db.collection('users').doc(userId);
      const userTodosDoc = await userTodosRef.get();

      if (userTodosDoc.exists) {
        
        const userData = userTodosDoc.data();
        console.log('User data:', userData);

        
        const userTodos = userData.todos;
        console.log('User todos:', userTodos);
        
      } else {
       
        console.log('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper elevation={3}>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" gutterBottom>
            Todo App
          </Typography>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          {errorMessage && (
            <Typography color="error" variant="body1" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleRegister}
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
