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
// BLUEPRINT STYLES
import {
  InputGroup,
  FormGroup,
  Card,
  Classes,
  Intent,
  ProgressBar,
  Button,
  Callout,
} from "@blueprintjs/core";

// BLUEPRINT STYLES
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// RSuite UI Library
import {
  Container,
  Header,
  Navbar,
  Content,
  Sidebar,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
  Footer,
} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";

// ASSETS & APP STYLES
import logo from "../../assets/logo.svg";
import "../../theme/less/App.less";

import { login, logout, getAll, check } from "../../services/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let auth = await check();
    store.auth = auth;
    console.log(auth);
    if (auth.isAuth) {
      const { from } = { from: { pathname: "/" } };
      this.props.history.push(from);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    login(username, password).then(
      (user) => {
        console.log(user);
        const { from } = this.props.location.state || {
          from: { pathname: "/admin" },
        };
        this.props.history.push(from);
      },
      (error) => {
        console.log(error);
        const { from } = this.props.location.state || {
          from: { pathname: "/login" },
        };
        this.props.history.push(from);
      }
    );
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <Container
        className={"container"}
        style={{
          background: "linear-gradient(45deg, rgba(37, 1, 63, 0.52), black)",
        }}
      >
        <Header></Header>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={24}>
              <div
                className="App-splash"
                style={{ backgroundColor: "transparent" }}
              >
                <Panel bodyFill>
                  <Container style={{ backgroundColor: "#30404d" }}>
                    <Sidebar style={{ width: "320px" }}>
                      <img
                        src={logo}
                        height="320"
                        style={{
                          background: "linear-gradient(45deg, rgba(10,10,10,0.5), black)",
                        }}
                      />
                    </Sidebar>
                    <Container style={{ width: "320px" }}>
                      <Content style={{ padding: "1em" }}>
                        <Form fluid onSubmit={this.handleSubmit}>
                          <FormGroup
                            label="Username or email address"
                            helperText={
                              submitted && !username && "Username is required"
                            }
                          >
                            <InputGroup
                              className={
                                submitted && !username
                                  ? Classes.INTENT_DANGER
                                  : ""
                              }
                              leftIcon="user"
                              type="text"
                              name="username"
                              value={username}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                          <FormGroup
                            label="Password"
                            helperText={
                              submitted && !password && "Password is required"
                            }
                          >
                            <InputGroup
                              className={
                                submitted && !password
                                  ? Classes.INTENT_DANGER
                                  : ""
                              }
                              leftIcon="lock"
                              type="password"
                              name="password"
                              value={password}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <ButtonToolbar>
                              <Button
                                // onClick={this.handleSubmit}
                                disabled={loading}
                              >
                                Login
                              </Button>
                              <Button minimal>Forgot password?</Button>
                            </ButtonToolbar>
                          </FormGroup>
                          {/* IF ERROR */}
                          {error && (
                            <Callout intent={Intent.DANGER} title="Error">
                              {error}
                            </Callout>
                          )}
                        </Form>
                      </Content>
                    </Container>
                  </Container>
                </Panel>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    );
  }
}

export default collect(Login);
