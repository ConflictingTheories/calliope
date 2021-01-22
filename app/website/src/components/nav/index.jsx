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
import { collect } from "react-recollect";
import { Link } from "react-router-dom";

// BLUEPRINT STYLES UI LIBRARY
import { Button, Colors, Navbar, Alignment } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "../../theme/less/App.less";
import {exportZip} from "../../services/content";

// APP
class ArchNavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLogin: props.isLogin || false,
      isAdmin: props.isAdmin || false,
      renderAdmin: props.renderAdmin || this.renderAdmin,
      renderBrand: props.renderBrand || this.renderBrand,
      renderBar: props.renderBar || this.renderBar,
      renderRight: props.renderRight || this.renderRight,
    };
  }

  renderBrand() {
    return (
      <React.Fragment>
        <Navbar.Heading>{process.env.REACT_APP_SITE_TITLE}</Navbar.Heading>
        <Navbar.Divider />
      </React.Fragment>
    );
  }

  renderBar() {
    return (
      <React.Fragment>
        <Link to="/">
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Link>
      </React.Fragment>
    );
  }

  renderRight() {
    return (
      <React.Fragment>
        <Button
          className="bp3-minimal"
          icon="plus"
          text="+ IPFS"
          onClick={() => {
            console.log("LoadFile for IPFS??");
          }}
        />
      </React.Fragment>
    );
  }

  renderAdmin() {
    return (
      <React.Fragment>
        <button onClick={async () => {await exportZip()}}>
          Download Zip
        </button>
      </React.Fragment>
    );
  }

  render() {
    return this.state.isLogin ? (
      <Navbar
        className="App-nav"
        style={{ color: Colors.WHITE, background: Colors.DARK_GRAY4 }}
      >
        <Navbar.Group align={Alignment.LEFT}>
          {this.state.renderBrand()}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {this.state.renderRight()}
        </Navbar.Group>
      </Navbar>
    ) : this.state.isAdmin ? (
      <Navbar
        className="App-nav"
        style={{ color: Colors.WHITE, background: Colors.DARK_GRAY4 }}
      >
        <Navbar.Group align={Alignment.LEFT}>
          {this.state.renderBrand()}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {this.state.renderAdmin()}
        </Navbar.Group>
      </Navbar>
    ) : (
      <Navbar
        className="App-nav"
        style={{ color: Colors.WHITE, background: Colors.DARK_GRAY4 }}
      >
        <Navbar.Group align={Alignment.LEFT}>
          {this.state.renderBrand()}
          {this.state.renderBar()}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {this.state.renderRight()}
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default collect(ArchNavBar);
