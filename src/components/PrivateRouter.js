import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      JSON.parse(localStorage.getItem("role")) === null ? (
        <Redirect
          to={{
            pathname: "/admin/login",
          }}
        />
      ) : JSON.parse(localStorage.getItem("role")) === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/notAdmin",
          }}
        />
      )
    }
  />
);
export default PrivateRouter;
