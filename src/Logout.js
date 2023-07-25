import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const Logout = ({ todos }) => {
  const history = useHistory();

  const handleLogout = () => {
    // Save the data to Firestore before logging out
    saveTodoListToFirestore(todos);

    // Perform logout
    firebase.auth().signOut()
      .then(() => {
        console.log('User logged out successfully.');
        history.push('/login'); // Redirect to the login page after logout
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
        // You can handle the error here or show a user-friendly message
      });
  };

  const saveTodoListToFirestore = (todoList) => {
    try {
      const db = firebase.firestore();
      const userTodoRef = db.collection('users').doc(firebase.auth().currentUser.uid);

      // Set the Todo list array in Firestore document
      userTodoRef.set({ todos: todoList });

      console.log('Todo list saved to Firestore successfully.');
    } catch (error) {
      console.error('Error saving Todo list to Firestore:', error.message);
    }
  };

  useEffect(() => {
    return () => {
      // Clean to avoid memory leaks
      firebase.auth().onAuthStateChanged(() => {}); // Pass an empty function as the handler
    };
  }, []);

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
