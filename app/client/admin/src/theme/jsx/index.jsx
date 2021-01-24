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

import React from "react";

// Code Highlighting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
// Math Latex Support
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
// Plugins
import plugins from "../../plugins";

// Customization for Markdown Rendering (react-markdown)
export const renderers = {
  image: ({ alt, src, title }) => (
    <img
      alt={alt}
      src={src}
      title={title}
      style={{ maxWidth: "100%", padding: 0 }}
    />
  ),
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter
        style={synthwave84}
        language={language}
        children={value || ""}
      />
    );
  },
  shortcode: plugins,
  inlineMath: ({ value }) => <InlineMath math={value} />,
  math: ({ value }) => <BlockMath math={value} />,
};

export default { renderers };
