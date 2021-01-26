import React, { Component } from "react";
import ipfsCore from "ipfs-core";
import HLSPlayer from "react-hls";
import { store } from "react-recollect";

import "react-hls/src/style.css"; // need to import basic styles
import "react-hls/src/icons.css"; // need to import basic icons

class IPFSVideo extends Component {
  constructor() {
    store.ipfsServer = store.ipfsServer
      ? store.ipfsServer
      : ipfsCore.create({ repo: "ipfs-" + Math.random() });
  }

  render() {
    const { ipfsHash } = this.props;
    return (
      <div>
        <HLSPlayer
          hlsOptions={{ ipfsHash, ipfs: store.ipfsServer }}
          source={"master.m3u8"}
        />
      </div>
    );
  }
}

export default IPFSVideo;
