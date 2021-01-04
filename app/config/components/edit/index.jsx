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

import React, { Component, useEffect } from "react";
import { collect, store } from "react-recollect";

import ReactMarkdownWithHtml from "react-markdown/with-html";
import MDEditor, { commands } from "@uiw/react-md-editor";

import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";

// RSuite UI Library
import { Row, Col } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

import gfm from "remark-gfm";
import math from "remark-math";
import a11yEmoji from "@fec/remark-a11y-emoji";
import html from "remark-html";
import slug from "remark-slug";
import emoji from "remark-emoji";
import headings from "remark-autolink-headings";
import shortcodes from "remark-shortcodes";

import { renderers } from "../../theme/jsx";

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    /* ... */
  ],
});

export default function Editor(props) {
  const [value, setValue] = React.useState(props.content);

  function saveChanges() {
    store.selectedContent = value;

    // Write Content Back out to File (TODO)
    //
  }

  useEffect(
    () => {
      console.log(store.selectedContent);
      if (store.selectedContent != value) setValue(store.selectedContent);
    },
    value,
    props.content
  );

  return (
    <div>
      <Row style={{ paddingTop: "5em" }}>
        <Col sm={12} md={12} lg={12}>
          <MDEditor
            minSize={600}
            height={900}
            preview={"edit"}
            value={value}
            onChange={(value) => {
              store.selectedContent = value;
              setValue(value);
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
            source={value}
          />
        </Col>
      </Row>
      <Row>
        <button onClick={saveChanges}>Save Changes</button>
      </Row>
    </div>
  );
}
