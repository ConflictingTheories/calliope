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

import React, { Component } from "react";
import { collect } from "react-recollect";
// WebGL Component
import WebGLView from "./components/WebGLView";
// Pixos Scene Provider
import SceneProvider from "./scene";
// Style Plugin
import "../less/pixos.less";

class Pixos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkString: props.networkString,
      scene: new SceneProvider(),
      updated: Date.now(),
    };
  }

  // Update world on Edit
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (JSON.stringify(this.props.networkString) != JSON.stringify(nextProps.networkString)) {
      this.setState({
        networkString: nextProps.networkString,
        updated: Date.now(),
      });
    }
  }

  // Render World as Passed in String or FlatLand (Default)
  render() {
    const { networkString, updated, scene } = this.state;
    return (
      <>
        <WebGLView
          class="pixos"
          key={updated}
          width={640}
          height={480}
          SceneProvider={scene}
          networkString={networkString}
        />
      </>
    );
  }
}
export default collect(Pixos);
