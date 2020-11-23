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
import { initializeTheme } from "../../theme";

// ASSETS & APP STYLES
import logo from "../../assets/logo.svg";
import "../../theme/less/App.less";

// Splash Screen
export default function SplashScreen() {
  // Initialize Canvas for Theme
  const ref = useRef();
  const date = new Date().toDateString();
  useEffect(() => {
    let canvas = ref.current;
    initializeTheme(canvas);
  });
  return (
    <div className="App">
      <canvas ref={ref} />
      <header className="App-splash container">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Please, wait a moment while we load the application.</p>
      </header>
    </div>
  );
};