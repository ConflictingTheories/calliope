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

import ReactMarkdownWithHtml from "react-markdown/with-html";

import htmlParser from "react-markdown/plugins/html-parser";

import math from "remark-math";
import a11yEmoji from "@fec/remark-a11y-emoji";
import html from "remark-html";
import emoji from "remark-emoji";
import headings from "remark-autolink-headings";
import shortcodes from "remark-shortcodes";

import { renderers } from "../../theme/jsx";
import { Icon } from "@blueprintjs/core";
import Swal from "sweetalert2";
import "@sweetalert2/themes/dark/dark.css";

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    /* ... */
  ],
});
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src || "",
      type: props.t || "posts",
      hideEmbed: props.hideEmbed,
      content: null,
    };
  }

  async componentDidMount() {
    //Fetch Source and Render Content
    if (this.state.src && this.state.src !== "") {
      const fileResponse = await fetch(
        "/content/" + this.state.type + "/" + this.state.src
      );
      if (fileResponse.ok) {
        let content = await fileResponse.text();
        this.setState({ content });
      } else {
        this.setState({
          content:
            "# 404\n## Page Not Found\n\nSorry, but that page does not exist. 😬😬😬",
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        content: nextProps.content,
      });
    }
  }

  async showEmbed(type, src) {
    // Url to Post
    let url = `${window.location.protocol}//${
      window.location.host
    }/embed/${type}/${src.replaceAll(".md", "")}`;
    console.log(type, src, url);
    // Iframe Link
    let embedLink = `
    <iframe style="margin-top: 20px; margin-bottom: 30px;-moz-border-radius: 12px;
    -webkit-border-radius: 12px; border-radius: 12px; -moz-box-shadow: 4px 4px 14px #000;-webkit-box-shadow: 4px 4px 14px #000;
    box-shadow: 4px 4px 14px #000;filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=.2);" 
    src="${url}" height="448" width="448"></iframe>`;
    // Popup
    await Swal.fire({
      customClass: "calliope-modal calliope-post",
      background: "rgba(4, 21, 27, 0.99)",
      title: "Embed and Share!",
      html: `<div><p>Link to this Post using the URL below</p>
        <br/><input class="calliope-input" type="text" value="${url}"/>
        <br/><br/><p>Or paste this inside of any HTML website</p>
        <br/><textarea style="height:144px" class="calliope-input" >${embedLink}</textarea>
        </div>`,
    });
  }

  render() {
    const { content, src, type, hideEmbed } = this.state;
    let res = null;
    try {
      res = (
        <React.Fragment className="calliope-post">
          <hr />
          <ReactMarkdownWithHtml
            astPlugins={[parseHtml]}
            escapeHtml={false}
            parserOptions={{ gfm: true }}
            plugins={[
              [
                shortcodes,
                { startBlock: "[[", endBlock: "]]", inlineMode: true },
              ],
              emoji,
              a11yEmoji,
              math,
              headings,
              html,
            ]}
            children={content || ""}
            renderers={renderers}
            allowDangerousHtml
          />
          <hr />
          {hideEmbed ?? (
            <footer>
              <a
                className={"calliope-share"}
                style={{
                  margin: "5px 1em 2.5em 0",
                  padding: "0.5em",
                  float: "right",
                }}
                onClick={() => this.showEmbed(type, src)}
              >
                Share Post&nbsp;&nbsp;
                <Icon icon="share" title="Embed Post"></Icon>
              </a>
            </footer>
          )}
        </React.Fragment>
      );
    } catch (e) {
      console.error(e);
    }
    return res;
  }
}

export default collect(Post);
