import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";
import axios from "axios";
import Cookies from "js-cookie";

function PrivateRoute({ children, ...rest }) {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function Login() {
  const { logIn } = useAuth();
  const [successRedirect, setSuccessRedirect] = React.useState(false);
  const { state } = useLocation();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, password } = event.target;
    try {
      const response = await logIn(userName.value, password.value);
      setSuccessRedirect(true);
    } catch (err) {}
  };

  if (successRedirect) return <Redirect to={state?.from || "/profile"} />;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="userName" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login!</button>
      </form>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user/profile`,
          {
            headers: {
              authorization: Cookies.get("token"),
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        console.log("[Profile.err] = ", err);
      }
    }
    fetchProfile();
  }, []);

  return JSON.stringify(profile, null, 2);
}

function Nav() {
  const { authenticated, logOut } = useAuth();
  return (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      {authenticated && (
        <React.Fragment>
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
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