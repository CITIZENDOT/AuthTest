import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Nav from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
