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

// ASSETS & APP STYLES
import logo from "../../assets/logo.svg";
import "../../styles/App.less";

// Splash Screen
function SplashScreen() {
  return (
    <div className="App">
      <header className="App-splash">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Please, wait a moment while we load the application.</p>
      </header>
    </div>
  );
}

// Splash Screen
export default function withSplashScreen(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      if (this.state.loading) return SplashScreen();
      return <WrappedComponent {...this.props} />;
    }
  };
}
