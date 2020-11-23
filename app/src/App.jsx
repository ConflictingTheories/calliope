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

import React, { useRef, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// External Style Frameworks (RSuite / BlueprintJS)
import "rsuite/dist/styles/rsuite-default.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "./theme/less/App.less";

// HELPERS
import withSplashScreen from "./modules/utils/splashScreen";

// ROUTER
import { AuthenticatedRoute } from "./modules/utils/authRouter";

// SCREENS
import LoginScreen from "./modules/login";
import LogoutScreen from "./modules/login/logout";
import HomeScreen from "./modules/dashboard";

import { initializeTheme } from "./theme";
// APP
const App = () => {
  // Initialize Canvas for Theme
  const ref = useRef();
  const date = new Date().toDateString();
  useEffect(() => {
    let canvas = ref.current;
    initializeTheme(canvas);
  });
  // Return Themed Site
  return (
    <React.Fragment>
      <canvas ref={ref} />
      <div className="calliope-container">
        <Router>
          <Switch>
            {/* LOGIN / LOGOUT */}
            <Route path="/login" component={LoginScreen} />
            <AuthenticatedRoute exact path="/logout" component={LogoutScreen} />
            {/* DASHBOARD  */}
            <AuthenticatedRoute path="/dashboard" component={HomeScreen} />
            <AuthenticatedRoute path="*" component={HomeScreen} />
          </Switch>
        </Router>
      </div>
      {/* Special Effects */}
      <div class="specialEffect1"></div>
      <div class="specialEffect2"></div>
      <div class="specialEffect3"></div>
      <div class="specialEffect4"></div>
      <div class="specialEffect5"></div>
      {/* Powered by Calliope and Date */}
      <p class="f">
        <a target="_blank" href="https://www.calliope.site">
          powered by Calliope ⚡⚡⚡
        </a>
        <br />
        <span id="date">{date}</span>
      </p>
    </React.Fragment>
  );
};

export default withSplashScreen(App);
