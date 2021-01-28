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
import { collect, store } from "react-recollect";

// RSuite UI Library
import { Container, Content, Row, Col, Placeholder } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

// BLUEPRINT STYLES
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Icon } from "@blueprintjs/core";

import Post from "../../components/post";
// ASSETS & APP STYLES
import "../../theme/less/App.less";

class Embed extends React.Component {
  constructor(props) {
    super(props);
    this.renderPreview = this.renderPreview.bind(this);
    let { src, type } = props.match.params;
    this.state = {
      type: type || "pages",
    };
    if (src) {
      store.preview = src;
    }
  }

  renderPreview() {
    let { type } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col sm={0} md={0} lg={3} />
          <Col sm={24} md={24} lg={18}>
            <Container>
              <Content>
                {store.preview && (
                  <Row>
                    <Container className="calliope-page">
                      <Post
                        t={type}
                        src={`${store.preview}.md`}
                        hideEmbed={true}
                      />
                    </Container>
                  </Row>
                )}
                <footer className={"calliope-site-link"}>
                  <a
                    style={{
                      margin: "5px 0 -2.5em 0",
                      padding: "0.5em",
                      float: "left",
                    }}
                    target="_blank"
                    href="/"
                  >
                    Check out Site&nbsp;&nbsp;
                    <Icon icon="globe-network" title="Embed Post"></Icon>
                  </a>
                </footer>
              </Content>
            </Container>
          </Col>
          <Col sm={0} md={0} lg={3} />
        </Row>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Container className="calliope-container">
          <Content>{this.renderPreview()}</Content>
        </Container>
      </React.Fragment>
    );
  }
}

export default collect(Embed);
