/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

import React, { useRef, useEffect } from "react";
import { initializeTheme } from "../../theme";

// ASSETS & APP STYLES
import quotes from "../../assets/quotes.json";
import logo from "../../assets/logo.svg";
import "../../theme/less/App.less";
// Random Index
function randomFrom(arr) {
  const index = ~~((Math.random() * arr.length) % arr.length);
  return arr[index];
}
// Splash Screen
export default function SplashScreen() {
  // Initialize Canvas for Theme
  const ref = useRef();
  const date = new Date().toDateString();
  useEffect(() => {
    let canvas = ref.current;
    initializeTheme(canvas);
  });
  const quote = randomFrom(quotes);
  return (
    <div className="App">
      <canvas ref={ref} />
      <header className="App-splash container">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{quote.text}</p>
        <p style={{ textAlign: "left", fontStyle: "italic" }}>
          ~{quote.author}
        </p>
      </header>
    </div>
  );
}
