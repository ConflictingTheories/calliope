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

import React from "react";
import SplashScreen from "./splash";
// ASSETS & APP STYLES
import "../../theme/less/App.less";
// Splash Screen
export default function withSplashScreen(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const SplashLoaded = sessionStorage.getItem('splashLoaded');
      this.state = {
        loading: !!!SplashLoaded,
      };

    }
    async componentDidMount() {
      try {
        setTimeout(() => {
          sessionStorage.setItem('splashLoaded', true);
          this.setState({
            loading: false,
          });
        }, 5500);
      } catch (err) {
        console.log(err);
        sessionStorage.setItem('splashLoaded', true);
        this.setState({
          loading: false,
        });
      }
    }
    render() {
      if (this.state.loading) return <SplashScreen></SplashScreen>;
      return <WrappedComponent {...this.props} />;
    }
  };
}
