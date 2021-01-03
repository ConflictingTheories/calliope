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
import ipfsCore from "ipfs-core";
import HLSPlayer from "react-hls";
import { store } from "react-recollect";
class IPFSVideo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    store.ipfsServer = store.ipfsServer
    ? store.ipfsServer
    : ipfsCore.create({ repo: "ipfs-" + Math.random() });
  }

  render() {
    const { ipfsHash } = this.props;
    return (
      <div>
        <HLSPlayer
          autoplay={false}
          hlsOptions={{ ipfsHash: ipfsHash, ipfs: store.ipfsServer }}
          source={"master.m3u8"}
        />
      </div>
    );
  }
}

export default IPFSVideo;
