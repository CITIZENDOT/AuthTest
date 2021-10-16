import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const authContext = React.createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return React.useContext(authContext);
}

function useProvideAuth() {
  const [authenticated, setAuthenticated] = React.useState(
    Boolean(Cookies.get("token"))
  );

  const logIn = async (userName, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          userName: userName,
          password: password,
        }
      );
      Cookies.set("token", response.data.token, {
        expires: new Date(response.data.expiresIn),
      });
      Cookies.set("currentUser", userName, {
        expires: new Date(response.data.expiresIn),
      });
      setAuthenticated(true);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("currentUser");
    setAuthenticated(false);
  };

  return {
    authenticated,
    logIn,
    logOut,
  };
}
