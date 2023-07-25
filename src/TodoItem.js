import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const TodoItem = ({ index, todo, onToggleComplete }) => {
  const handleToggle = () => {
    onToggleComplete(index);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
      />
      <Typography
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flexGrow: 1,
          marginRight: '1rem'
        }}
      >
        {todo.text}
      </Typography>
      <IconButton
        color="secondary"
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TodoItem;
