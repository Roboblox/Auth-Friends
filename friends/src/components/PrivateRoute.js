import React from "react";
import { Route, Redirect } from "react-router-dom";

/*
    Rules to Follow for Private Routes
    1. Has to have same API as <Route />
    2. Renders a <Route /> and passes all the props through to it
    3. It checks if the user is authorized, if they are renders the "component" prop, if not it redirects user to /login
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem("token")) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
