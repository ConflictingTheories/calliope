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

import React, { Component, useRef } from "react";
import Mermaid from "react-mermaid2";
import { collect } from "react-recollect";
class MermaidDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: props.diagram,
      updated: Date.now(),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      JSON.stringify(this.props.diagram) != JSON.stringify(nextProps.diagram)
    ) {
      this.setState({
        diagram: nextProps.diagram,
        updated: Date.now(),
      });
    }
  }

  // TODO - Add Theme Injection Somehow (Or Wrapper)
  render() {
    const { diagram, updated } = this.state;
    return (
      <>
        <Mermaid
          key={updated}
          chart={String(diagram).replaceAll("\\n", "\n")}
        />
      </>
    );
  }
}
export default collect(MermaidDiagram);
