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
// Plugins
import ipfsStream from "./ipfs-stream/jsx";
import MermaidDiagram from "./mermaid/jsx";
import BlockWorld from "./blockworld/jsx";

// TODO - Add Theme Injection Somehow (Or Wrapper)

export default function plugins(props) {
  console.log(props);
  switch (props.identifier) {
    // IPFS Video Streams (HLS)
    case "ipfsStream":
      let { ipfsHash, audioOnly } = props.attributes;
      if (audioOnly) {
        return <ipfsStream.Audio ipfsHash={ipfsHash} />;
      } else {
        return <ipfsStream.Video ipfsHash={ipfsHash} />;
      }
    // Mermaid Diagrams
    case "mermaid":
      let { diagram } = props.attributes;
      if (diagram) {
        return <MermaidDiagram diagram={diagram} />;
      } else {
        return <></>;
      }
    // Blockworld Diagrams
    case "blockworld":
      let { networkString } = props.attributes;
      if (networkString) {
        return <BlockWorld networkString={networkString} />;
      } else {
        return <></>;
      }
    default:
      return <>{JSON.stringify(props)}</>;
  }
}
