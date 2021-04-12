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
import Bitworld from "./core";
// Style
import "../less/bitworld.less";

class BlockWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkString: props.networkString,
      updated: Date.now(),
    };
  }

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

  // TODO - Add Theme Injection Somehow (Or Wrapper)
  render() {
    const { networkString, updated } = this.state;
    return (
      <>
        <Bitworld key={updated} networkString={networkString} />
      </>
    );
  }
}
export default collect(BlockWorld);
