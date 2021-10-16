import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../use-auth";

export default function PrivateRoute({ children, ...rest }) {
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
