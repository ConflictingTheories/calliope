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

import React, { Component } from "react";
import { collect } from "react-recollect";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.store = props.store;

    this.state = {
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default collect(NavBar);
