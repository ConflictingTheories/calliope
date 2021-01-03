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
import React from "react";

// Code Highlighting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { funky } from "react-syntax-highlighter/dist/esm/styles/prism";

// Math Latex Support
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Plugins -- MAY NEED TO CUSTOMIZE FOR NOW - NOT INTJECTABLE JUST YET
import ipfsStream from "../../plugins/ipfs-stream/jsx";

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
        style={funky}
        language={language}
        children={value || ""}
      />
    );
  },
  shortcode: (props) => {
    console.log(props);

    // TODO - - Make more Exensible Plugin Injection -- Shortcodes . etc

    switch (props.identifier) {
      case "ipfsStream":
        let { ipfsHash, audioOnly } = props.attributes;
        if (audioOnly) {
          return <ipfsStream.Audio ipfsHash={ipfsHash} />;
        } else {
          return <ipfsStream.Video ipfsHash={ipfsHash} />;
        }
      default:
        return <>{JSON.stringify(props)}</>;
    }
  },
  inlineMath: ({ value }) => <InlineMath math={value} />,
  math: ({ value }) => <BlockMath math={value} />,
};

export default { renderers };
