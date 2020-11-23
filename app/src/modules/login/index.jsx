/*                                            *\
** ------------------------------------------ **
**         Calliope - Site Generator   	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

import React from "react";
import { collect } from "react-recollect";
// BLUEPRINT STYLES
import {
  InputGroup,
  FormGroup,
  Classes,
  Intent,
  Button,
  Callout,
} from "@blueprintjs/core";

import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// RSuite UI Library
import {
  Container,
  Header,
  Content,
  Sidebar,
  FlexboxGrid,
  Panel,
  Form,
  ButtonToolbar,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

// ASSETS & APP STYLES
import Logo from "../../assets/logo.svg";
import "../../theme/less/App.less";

import { login, check } from "../../services/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.store = props.store;

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
    };
  
  }

  async componentDidMount() {
    let auth = await check();
    this.store.auth = auth;
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
        const { from } = this.props.location.state || {
          from: { pathname: "/" },
        };
        this.props.history.push(from);
      },
      (error) => this.setState({ error, loading: false })
    );
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <Container
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
                        src={Logo}
                        height="320"
                        style={{
                          background: "linear-gradient(45deg,indigo,black)",
                        }}
                      />
                    </Sidebar>
                    <Container style={{ width: "320px" }}>
                      <Content style={{ padding: "1em" }}>
                        <Form fluid>
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
                                onClick={this.handleSubmit}
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
