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
  Panel,
  Row,
  Col,
  Notification,
  Placeholder,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

import { NonIdealState, Tabs, Tab } from "@blueprintjs/core";
// BLUEPRINT STYLES
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import NavBar from "../../components/nav";
import SideMenu from "../../components/menu";
import MarkdownEdit from "../../components/edit";
// ASSETS & APP STYLES
import "../../theme/less/App.less";

//SERVICES
import { posts } from "../../services/content";

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.profilePanel = this.profilePanel.bind(this);
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

  async edit(post) {
    // Fetch Post & Store Content
    if (post && post !== "") {
      console.log(post);
      const fileResponse = await fetch("/content/" + post);
      if (fileResponse.ok) {
        let content = await fileResponse.text();
        store.selectedPost = post;
        store.selectedContent = content;
      }
    }
  }

  renderPosts() {
    return (
      <React.Fragment>
        {store.posts &&
          store.posts?.map((post) => {
            return (
              <Row>
                <Container className="calliope-list-item">
                  <label>
                    {post} <a onClick={() => this.edit(post)}>Edit</a>
                  </label>
                </Container>
              </Row>
            );
          })}
      </React.Fragment>
    );
  }

  // PANELS & COMPONENTS
  profilePanel() {
    let content = store.selectedContent;
    return (
      <Panel style={{ width: "100%" }}>
        <Content>
          <Row>
            <Col md={4}>{this.renderPosts()}</Col>
            <Col md={20}>
              {content ? (
                <MarkdownEdit content={content} />
              ) : (
                <NonIdealState
                  icon={"build"}
                  title="Getting Started"
                  description={"Please select a post to edit"}
                />
              )}
            </Col>
          </Row>
        </Content>
      </Panel>
    );
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
            <Content>{this.profilePanel()}</Content>
          </Container>
        </div>
      </div>
    );
  }
}

export default collect(Dashboard);
