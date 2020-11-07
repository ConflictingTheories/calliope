/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// External Style Frameworks (RSuite / BlueprintJS)
import "rsuite/dist/styles/rsuite-dark.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "./themes/default/App.less";

// HELPERS
import withSplashScreen from "./modules/utils/splashScreen";

// ROUTER
import { AuthenticatedRoute } from "./modules/utils/authRouter";

// SCREENS
import LoginScreen from "./modules/login";
import LogoutScreen from "./modules/login/logout";
import HomeScreen from "./modules/dashboard";

// APP
const App = () => {
  document.body.className = "bp3-dark";
  return (
    <Router>
      <div className="container">
        <Switch>
          {/* LOGIN / LOGOUT */}
          <Route path="/login" component={LoginScreen} />
          <AuthenticatedRoute exact path="/logout" component={LogoutScreen} />
          {/* DASHBOARD  */}
          <AuthenticatedRoute path="/dashboard" component={HomeScreen} />
          <AuthenticatedRoute path="*" component={HomeScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default withSplashScreen(App);
