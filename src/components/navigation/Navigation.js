import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";
import "../../style/shared.scss";
import { withRouter } from "react-router";
import UserNavigation from "./UserNavigation";
import "bootstrap/dist/css/bootstrap.min.css";

class Navigation extends Component {
  render() {
    const { location } = this.props;
    const { isAuthenticated, isUser } = this.props.auth;
    return (
      <Navbar bg="bg" expand="lg">
        <Navbar.Brand href="/" bg="Primary">
          Belgium Movie Club
        </Navbar.Brand>
        <Nav className="mr-auto" variant="pills" activeKey={location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated() && isUser() ? (
            <Nav.Link href="/Add">Add Review</Nav.Link>
          ) : null}
        </Nav>
        <UserNavigation auth={this.props.auth} />
      </Navbar>
    );
  }
}
const NavWithRouter = withRouter(Navigation);
export default NavWithRouter;
