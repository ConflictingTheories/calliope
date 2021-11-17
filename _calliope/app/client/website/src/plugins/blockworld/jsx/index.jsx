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
import WebGLView from "./view";
// Blockworld Scene Provider
import SceneProvider from "./scene";
// Style Plugin
import "../less/bitworld.less";

class BlockWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkString: props.networkString,
      updated: Date.now(),
    };
  }

  // Update world on Edit
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      JSON.stringify(this.props.networkString) !=
      JSON.stringify(nextProps.networkString)
    ) {
      this.setState({
        networkString: nextProps.networkString,
        updated: Date.now(),
      });
    }
  }

  // Render World as Passed in String or FlatLand (Default)
  render() {
    const { networkString, updated } = this.state;
    return (
      <>
        <WebGLView class="bitworld" key={updated} width={720} height={480} SceneProvider={new SceneProvider()} networkString={networkString} />
      </>
    );
  }
}
export default collect(BlockWorld);
