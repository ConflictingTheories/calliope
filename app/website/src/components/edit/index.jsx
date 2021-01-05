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
import { collect, store } from "react-recollect";

import MDEditor, { commands } from "@uiw/react-md-editor";
import htmlParser from "react-markdown/plugins/html-parser";

// RSuite UI Library
import { Row, Col } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

import math from "remark-math";
import a11yEmoji from "@fec/remark-a11y-emoji";
import html from "remark-html";
import slug from "remark-slug";
import emoji from "remark-emoji";
import headings from "remark-autolink-headings";
import shortcodes from "remark-shortcodes";

import { renderers } from "../../theme/jsx";
import { save } from "../../services/content";

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    /* ... */
  ],
});

class EditMarkdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || "",
    };
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        content: nextProps.content,
      });
    }
  }

  saveChanges() {
    store.selectedContent = this.state.content;
    // Write Content Back out to File
    save(store.selectedPost, store.selectedContent);
  }

  render() {
    const { content } = this.state;
    let res = null;
    return (
      <div>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <MDEditor
              minSize={600}
              height={900}
              preview={"edit"}
              value={content}
              onChange={(value) => {
                store.selectedContent = value;
                this.setState({ content: value });
              }}
              // Toolbar Settings
              commands={[
                commands.bold,
                commands.hr,
                commands.italic,
                commands.divider,
                commands.fullscreen,
              ]}
              // Markdown Options
              previewOptions={{
                astPlugins: [parseHtml],
                escapeHtml: false,
                parserOptions: { gfm: true },
                plugins: [
                  [
                    shortcodes,
                    { startBlock: "[[", endBlock: "]]", inlineMode: true },
                  ],
                  emoji,
                  a11yEmoji,
                  math,
                  slug,
                  headings,
                  html,
                ],
                renderers: renderers,
                allowDangerousHtml: true,
              }}
            />
          </Col>
          <Col sm={12} md={12} lg={12}>
            <MDEditor.Markdown
              // Markdown Options (needs work)
              previewOptions={{
                astPlugins: [parseHtml],
                escapeHtml: false,
                parserOptions: { gfm: true },
                plugins: [
                  [
                    shortcodes,
                    { startBlock: "[[", endBlock: "]]", inlineMode: true },
                  ],
                  emoji,
                  a11yEmoji,
                  math,
                  slug,
                  headings,
                  html,
                ],
                renderers: renderers,
                allowDangerousHtml: true,
              }}
              source={content}
            />
          </Col>
        </Row>
        <Row>
          <button onClick={() => this.saveChanges()}>Save Changes</button>
        </Row>
      </div>
    );
  }
}

export default collect(EditMarkdown);
