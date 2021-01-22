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
import {
  Container,
  Content,
  Row,
  Col,
  Notification,
  Placeholder,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

// BLUEPRINT STYLES
import { Intent, Callout } from "@blueprintjs/core";
// BLUEPRINT STYLES
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import NavBar from "../../components/nav";
import SideMenu from "../../components/menu";
import Post from "../../components/post";
// ASSETS & APP STYLES
import "../../theme/less/App.less";

//SERVICES
import { posts } from "../../services/content";

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPosts() {
    return (
      <React.Fragment>
        <Container>
          <Content>
            {store.posts &&
              store.posts?.map((post) => {
                return (
                  <Row>
                    <Container className="calliope-list-item">
                      <Post src={`posts/${post}`} />
                    </Container>
                  </Row>
                );
              })}
          </Content>
        </Container>
      </React.Fragment>
    );
  }

  async componentDidMount() {
    // Fetch & Render Posts
    const result = await posts();
    if (result) {
      store.posts = result;
      setTimeout(
        () =>
          Notification.open({
            title: "Welcome to Calliope",
            description: <Paragraph width={320} rows={3} />,
          }),
        ~~(Math.random() * 10000)
      );
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          minHeight: "100vh",
        }}
      >
        <SideMenu
          activeKey={"1"}
          style={{ flex: 1, flexShrink: 1, flexGrow: 0 }}
        />
        <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <Container className="calliope-container">
            <NavBar
              isLogin={false}
              renderBrand={this.renderClientSelect}
              renderBar={() => null}
              renderRight={() => null}
            />
            <Content>{this.renderPosts()}</Content>
          </Container>
        </div>
        {/* MEETING sidebar */}
      </div>
    );
  }
}

export default collect(Dashboard);
