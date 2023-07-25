import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Logout from './Logout';
import firebase from 'firebase/app';
import 'firebase/firestore';

const TodoApp = ({ user }) => {
  // input text and filtering
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch user from Firestore
    const fetchTodoList = async () => {
      try {
        const db = firebase.firestore();
        const userTodoRef = db.collection('users').doc(user.uid).collection('todos').doc('userTodo');
        const todoDoc = await userTodoRef.get();
        const todosData = todoDoc.exists ? todoDoc.data().todos : [];
        setTodos(todosData);
        console.log('Todo list fetched successfully:', todosData);
      } catch (error) {
        console.error('Error fetching Todo list:', error.message);
      }
    };

    fetchTodoList();
  }, [user]);

  // Handle the addition of a new todo
  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = { text: inputText, completed: false };
      setTodos([...todos, newTodo]);
      setInputText('');

      // Saving the updated Todo to Firestore
      saveTodoListToFirestore([...todos, newTodo]);
    }
  };

  const saveTodoListToFirestore = (todoList) => {
    try {
      const db = firebase.firestore();
      const userTodoRef = db.collection('users').doc(user.uid).collection('todos').doc('userTodo');

      // Set the Todo list array in Firestore document
      userTodoRef.set({ todos: todoList });

      console.log('Todo list saved to Firestore successfully.');
    } catch (error) {
      console.error('Error saving Todo list to Firestore:', error.message);
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
    return true; // Show all todos for 'all'
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper elevation={3}>
        <Box sx={{ padding: 4, position: 'relative' }}>
          <Typography variant="h4" gutterBottom>
            Todo List
          </Typography>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Typography>
              Total Todos: {totalTodos}
            </Typography>
            <Typography>
              Completed: {completedTodos}
            </Typography>
            <Logout />
          </Box>
          <ButtonGroup sx={{ marginBottom: 3 }}>
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'done' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange('done')}
            >
              Done
            </Button>
          </ButtonGroup>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Add new task..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <IconButton
                    color="primary"
                    aria-label="add"
                    onClick={handleAddTodo}
                  >
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <TodoList
            todos={filteredTodos}
            onToggleComplete={handleToggleComplete}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default TodoApp;
