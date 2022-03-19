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
import ipfsStream from "calliope-ipfs-stream";
import MermaidDiagram from "calliope-mermaid";
import BlockWorld from "calliope-blockworld";
import Pixos from "calliope-pixos";

// TODO - Add Theme Injection Somehow (Or Wrapper)

export default function plugins(props) {
  console.log(props);
  switch (props.identifier) {
    // IPFS Video Streams (HLS)
    case "ipfsStream":
      console.log(ipfsStream);
      let { ipfsHash, audioOnly } = props.attributes;
      if (audioOnly) {
        return <ipfsStream.Audio ipfsHash={ipfsHash} />;
      } else {
        return <ipfsStream.Video ipfsHash={ipfsHash} />;
      }
    // Mermaid Diagrams
    case "mermaid":
      console.log(MermaidDiagram);
      let { diagram } = props.attributes;
      if (diagram) {
        return <MermaidDiagram diagram={diagram} />;
      } else {
        return <></>;
      }
    // Blockworld Diagrams
    case "blockworld":
      console.log(BlockWorld);
      let { networkString } = props.attributes;
      if (networkString) {
        return <BlockWorld networkString={networkString} />;
      } else {
        return <></>;
      }
    // Pixos
    case "pixos":
      let PixosPlugin = Pixos["calliope-pixos"].default;
      return <PixosPlugin style={{ height: "550px" }} />;
    default:
      return <>{JSON.stringify(props)}</>;
  }
}
