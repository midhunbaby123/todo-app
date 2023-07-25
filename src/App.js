import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import TodoApp from './TodoApp';
import Login from './Login';

//  Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_5ummnKm1vnsHScdGIPf76ifaIaXEQTs',
  authDomain: 'todo-9a362.firebaseapp.com',
  projectId: 'todo-9a362',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/todo" /> : <Login />}
        </Route>
        <Route path="/todo">
          {user ? <TodoApp user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {user ? <Redirect to="/todo" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
