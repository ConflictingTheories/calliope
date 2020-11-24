import React from "react";
import { collect } from "react-recollect";
import { Link } from "react-router-dom";

// BLUEPRINT STYLES UI LIBRARY
import { Button, Colors, Navbar, Alignment } from "@blueprintjs/core";
// BLUEPRINT STYLES
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "../../theme/less/App.less";

// APP
class ArchNavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLogin: props.isLogin || false,
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
        <Link to="/settings">
          <Button className="bp3-minimal" icon="badge" text="Account" />
        </Link>
        <Link to="/logout">
          <Button className="bp3-minimal" icon="log-out" text="Logout" />
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return this.state.isLogin ? (
      <Navbar
        className="App-nav"
        style={{ color: Colors.WHITE, background: Colors.DARK_GRAY4 }}
      >
        {this.renderBrand()}
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
