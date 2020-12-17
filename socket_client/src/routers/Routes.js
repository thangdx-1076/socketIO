import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProductDetail from "../views/ProductDetail/ProductDetail";
import ProductList from "../views/ProductList/ProductList";
import WithLayoutRoute from "./WithLayoutRoute";
function Routes(props) {
  return (
    <Router>
      <Switch>
        <WithLayoutRoute
          path={"/products"}
          component={ProductList}
        ></WithLayoutRoute>
        <WithLayoutRoute
          path={"/products/:id"}
          component={ProductDetail}
        ></WithLayoutRoute>
      </Switch>
    </Router>
  );
}

export default Routes;
