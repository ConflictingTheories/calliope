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
  List,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
// Blueprint
import { NonIdealState, Tabs, Tab, Icon } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// Misc
import Swal from "sweetalert2";
import "@sweetalert2/themes/dark/dark.min.css";

// Components
import NavBar from "../../components/nav";
import SideMenu from "../../components/menu";
import MarkdownEdit from "../../components/edit";

// ASSETS & APP STYLES
import "../../theme/less/App.less";

//SERVICES
import { posts, pages, save } from "../../services/content";

const { Paragraph } = Placeholder;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.create = this.create.bind(this);
    this.fetchLists = this.fetchLists.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.profilePanel = this.renderPanel.bind(this);
  }

  async componentDidMount() {
    // Fetch & Render Posts
    store.show = false;
    store.isEditting = false;
    store.isSaved = true;
    await this.fetchLists();
    setTimeout(
      () =>
        Notification.open({
          title: "Welcome to Calliope",
          description: <Paragraph width={320} rows={3} />,
        }),
      ~~(Math.random() * 10000)
    );
  }

  async fetchLists() {
    const resultPosts = await posts();
    const resultPages = await pages();
    store.posts = resultPosts;
    store.pages = resultPages;
  }

  async create(type, name = "untitled") {
    // New Post
    if (name === "") {
      name = "untitled";
    }
    const date = new Date().toISOString().split(".")[0].replaceAll(/[:-]/g, ""); // Date format (ISO - No TZ - Minimized)
    const formattedName = `${date}_${name}.md`;
    await save(formattedName, "", type); // Create Blank File
    await this.fetchLists();
    return formattedName;
  }

  async edit(post, type) {
    store.editPost = post;
    store.selectedType = type;
    // Prompt to Save if Changing
    if (store.selectedPost != post && store.isEditting && !store.isSaved) {
      this.saveChanges();
    } else {
      // Fetch Post & Store Content
      if (post && post !== "" && store.selectedPost != post) {
        this.fetchPost(post, type);
      }
    }
  }

  async fetchPost(post, type) {
    const fileResponse = await fetch("/content/" + type + "/" + post);
    if (fileResponse.ok) {
      let content = await fileResponse.text();
      store.selectedType = type;
      store.selectedPost = post;
      store.selectedContent = content;
      store.isEditting = true;
      store.isSaved = true;
    }
  }

  async saveChanges() {
    let result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      await save(store.selectedPost, store.selectedContent, store.selectedType);
      Swal.fire("Saved!", "", "success");
      await this.fetchPost(store.editPost, store.selectedType);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      await this.fetchPost(store.editPost,store.selectedType);
    }
  }

  async newFile() {
    let result = await Swal.fire({
      title: "Please enter the name of the new file",
      input: "text",
      inputPlaceholder: "untitled",
      showCancelButton: true,
      confirmButtonText: `Create`,
    });
    if (result.isConfirmed) {
      let newFile = await this.create(store.selectedType, result.value);
      Swal.fire("Created!", "", "success");
      await this.fetchPost(newFile);
    }
  }

  renderPosts() {
    return (
      <React.Fragment>
        <Row>
          <Container className="calliope-list-item">
            <List>
              {store.posts &&
                store.posts?.map((post) => {
                  return (
                    <List.Item>
                      <label>
                        <a onClick={() => this.edit(post, "posts")}>
                          {post.replace(/\d+T\d+_/, "")}
                        </a>{" "}
                        <a
                          onClick={async () =>{
                            await navigator.clipboard.writeText(`/embed/posts/${post.replace(".md","")}`);
                            await Swal.fire("Link Copied!", "", "success");
                          }}
                        >
                          <Icon icon="link"></Icon>
                        </a>
                      </label>
                    </List.Item>
                  );
                })}
            </List>
          </Container>
        </Row>
      </React.Fragment>
    );
  }

  renderPages() {
    return (
      <React.Fragment>
        <Row>
          <Container className="calliope-list-item">
            <List>
              {store.pages &&
                store.pages?.map((page) => {
                  return (
                    <List.Item>
                      <label>
                        <a onClick={() => this.edit(page, "pages")}>
                          {page.replace(/\d+T\d+_/, "")}
                        </a>{" "}
                        <a
                            onClick={async () =>{
                              await navigator.clipboard.writeText(`/embed/pages/${page.replace(".md","")}`);
                              await Swal.fire("Link Copied!", "", "success");
                            }                          }
                        >
                          <Icon icon="link"></Icon>
                        </a>
                      </label>
                    </List.Item>
                  );
                })}
            </List>
          </Container>
        </Row>
      </React.Fragment>
    );
  }
  // PANELS & COMPONENTS
  renderPanel() {
    let content = store.selectedContent;
    return (
      <Panel style={{ width: "100%", maxWidth: "100vw" }}>
        <Content>
          <Row>
            <Col md={4}>
              <details open>
                <summary>
                  Posts{" "}
                  <button
                    onClick={async () => {
                      store.selectedType = "posts";
                      await this.newFile();
                    }}
                  >
                    + Add New Post
                  </button>
                </summary>
                {this.renderPosts()}
              </details>
              <details open>
                <summary>
                  Pages{" "}
                  <button
                    onClick={async () => {
                      store.selectedType = "pages";
                      await this.newFile();
                    }}
                  >
                    + Add New Page
                  </button>
                </summary>
                {this.renderPages()}
              </details>
            </Col>
            <Col md={20}>
              {store.selectedPost && content !== null ? (
                <MarkdownEdit content={content} />
              ) : (
                <NonIdealState
                  style={{ height: "87vh" }}
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
          <Container className="calliope-admin">
            <NavBar
              isAdmin={true}
              isLogin={false}
              renderBrand={this.renderClientSelect}
              renderBar={() => null}
              renderRight={() => null}
            />
            <Content style={{ marginTop: "3em" }}>{this.renderPanel()}</Content>
          </Container>
        </div>
      </div>
    );
  }
}

export default collect(Dashboard);
