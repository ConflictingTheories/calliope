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
import ReactMarkdown from "react-markdown";
import { renderers } from "../../theme/jsx";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      content: null,
    };
  }

  async componentDidMount() {
    //Fetch Source and Render Content
    if (this.state.src && this.state.src !== "") {
      const fileResponse = await fetch("/content/" + this.state.src);
      if (fileResponse.ok) {
        let content = await fileResponse.text();
        this.setState({ content });
      }
    }
  }

  componentWillUnmount() {}

  render() {
    const { content } = this.state;
    return (
      <React.Fragment className="calliope-post">
        <hr />
        <ReactMarkdown children={content} renders={renderers} />
        <hr />
      </React.Fragment>
    );
  }
}

export default collect(Post);
