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
const PAGE_LIMIT = 10;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isPage: false };

    let { page } = props.match.params;

    if (page) {
      store.page = page;
    }
  }

  renderPage() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={0} md={3} lg={6} />
          <Col sm={24} md={18} lg={12}>
            <Container>
              <Content>
                {store.page && (
                  <Row>
                    <Container className="calliope-page">
                      <Post t={"pages"} src={`${store.page}.md`} />
                    </Container>
                  </Row>
                )}
                <footer className={"calliope-site-link"}>
                  <a href="/">Back Home</a>
                </footer>
              </Content>
            </Container>
          </Col>
          <Col sm={0} md={3} lg={6} />
        </Row>
      </React.Fragment>
    );
  }

  renderPosts() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={0} md={3} lg={6} />
          <Col sm={24} md={18} lg={12}>
            <Container>
              <Content>
                {store.posts &&
                  store.posts
                    ?.filter((post, i) => i < store.end && i >= store.start)
                    .map((post) => {
                      return (
                        <Row>
                          <Container className="calliope-post">
                            <Post t={"posts"} src={`${post}`} />
                          </Container>
                        </Row>
                      );
                    })}
                <footer className={"calliope-load-post"}>
                  {store.end && store.end < store.posts?.length && (
                    <a
                      onClick={() => {
                        store.end += PAGE_LIMIT;
                      }}
                    >
                      Load More Posts
                    </a>
                  )}
                </footer>
              </Content>
            </Container>
          </Col>
          <Col sm={0} md={3} lg={6} />
        </Row>
      </React.Fragment>
    );
  }

  async componentDidMount() {
    // If Page - Load Page Specifically
    let { page } = store;
    if (page && page !== "") {
      this.setState({ isPage: true });
    } else {
      // Else - Fetch & Render Posts
      const result = await posts();
      if (result) {
        store.posts = result;
        store.start = 0;
        store.end = store.start + PAGE_LIMIT;
      }
    }
    setTimeout(
      () =>
        Notification.open({
          title: `Welcome! ⚡⚡⚡`,
          description: <Paragraph width={320} rows={3} />,
        }),
      ~~(Math.random() * 10000)
    );
  }

  render() {
    return (
      <React.Fragment>
        <SideMenu
          activeKey={"1"}
          style={{ flex: 1, flexShrink: 1, flexGrow: 0 }}
        />
        <Container className="calliope-container">
          <NavBar
            isLogin={false}
            renderBrand={this.renderClientSelect}
            renderBar={() => null}
            renderRight={() => null}
          />
          {this.state.isPage ? (
            <Content>{this.renderPage()}</Content>
          ) : (
            <Content>{this.renderPosts()}</Content>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default collect(Dashboard);
