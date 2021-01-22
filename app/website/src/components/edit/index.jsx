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
import { Panel, Row, Col, Container } from "rsuite";
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
import Post from "../post";

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

  // Write Content Back out to File
  async saveChanges() {
    store.selectedContent = this.state.content;
    await save(store.selectedPost, store.selectedContent);
    store.isSaved = true;
  }

  render() {
    const { content } = this.state;
    let res = null;
    return (
      <Container>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <Panel
              bordered
              bodyFill
              style={{
                height: "87vh",
                overflow: "overlay",
                background: "#121216",
                width: "100%",
              }}
            >
              <Container style={{ minHeight: "100%" }}>
                <MDEditor
                  style={{ height: "100%", minHeight: "87vh" }}
                  height={"100%"}
                  preview={"edit"}
                  value={content}
                  autoFocus={true}
                  visiableDragbar={false}
                  onChange={(value) => {
                    store.selectedContent = value;
                    store.isSaved = false;
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
                        {
                          startBlock: "[[",
                          endBlock: "]]",
                          inlineMode: true,
                        },
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
              </Container>
            </Panel>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <Panel
              bordered
              style={{
                height: "87vh",
                overflow: "overlay",
                background: "#121216",
                width: "100%",
              }}
            >
              <Post content={content} />
            </Panel>
          </Col>
        </Row>
        <Row>
          <button onClick={() => this.saveChanges()}>Save Changes</button>
        </Row>
      </Container>
    );
  }
}

export default collect(EditMarkdown);
