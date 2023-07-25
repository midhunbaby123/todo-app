import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo, index) => (
        <li key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: 8, paddingBottom: 8 }}>
          <TodoItem
            index={index}
            todo={todo}
            onToggleComplete={onToggleComplete}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
