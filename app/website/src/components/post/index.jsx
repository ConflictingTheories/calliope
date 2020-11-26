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

import ReactMarkdownWithHtml from "react-markdown/with-html";
import gfm from "remark-gfm";
import math from "remark-math";
import a11yEmoji from "@fec/remark-a11y-emoji";
import html from "remark-html";
import slug from "remark-slug";
import emoji from "remark-emoji";
import headings from "remark-autolink-headings";

import { renderers } from "../../theme/jsx";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props?.src || "",
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
    let res = null;
    try {
      res = (
        <React.Fragment className="calliope-post">
          <hr />
          <ReactMarkdownWithHtml
            plugins={[emoji, a11yEmoji, math, gfm, html, slug, headings]}
            children={content || ""}
            renderers={renderers}
            allowDangerousHtml
          />
          <hr />
        </React.Fragment>
      );
    } catch (e) {
      console.error(e);
    }
    return res;
  }
}

export default collect(Post);
