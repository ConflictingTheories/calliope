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
      let { diagram, type, separator, options } = props.attributes;
      if (diagram) {
        return <MermaidDiagram diagram={diagram} type={type} separator={separator} options={options} />;
      } else {
        return <></>;
      }
    default:
      return <>{JSON.stringify(props)}</>;
  }
}
