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

import React, { Component, useRef } from "react";
import ipfsCore from "ipfs-core";
import Hls from "hls.js";
import HlsjsIpfsLoader from "hlsjs-ipfs-loader";
import { store, collect } from "react-recollect";
class IPFSVideo extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    store.ipfsServer = store.ipfsServer
      ? store.ipfsServer
      : await ipfsCore.create({ repo: "ipfs-" + Math.random() });
  }

  render() {
    const { ipfsHash } = this.props;
    return (
      <div>
        <video ref={Player("master.m3u8", "QmQjDRKG8pZaeBnQi9zLqupCgY9D2Mth6noF4GMdZR6CVQ")} id="video" controls></video>
      </div>
    );
  }
}

class IPFSAudio extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    store.ipfsServer = store.ipfsServer
      ? store.ipfsServer
      : await ipfsCore.create({ repo: "ipfs-" + Math.random() });
  }

  render() {
    const { ipfsHash } = this.props;
    return (
      <div>
        <audio ref={Player("master.m3u8", "QmQjDRKG8pZaeBnQi9zLqupCgY9D2Mth6noF4GMdZR6CVQ")} id="audio" controls></audio>
      </div>
    );
  }
}

// Players IPFS Datastream
function Player(source, hash) {  
  Hls.DefaultConfig.loader = HlsjsIpfsLoader;
  Hls.DefaultConfig.debug = true;

  return (ref) => {
    if (Hls.isSupported()) {
      const hls = new Hls({ ipfs: store.ipfsServer, ipfsHash: hash });
      hls.loadSource(source); //'master.m3u8'
      hls.attachMedia(ref);
      hls.on(Hls.Events.MANIFEST_PARSED, () => ref.play());
    }
  };
}

export default { Video: collect(IPFSVideo), Audio: collect(IPFSAudio) };
