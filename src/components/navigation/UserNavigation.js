import React, { Component } from "react";
import { Nav, NavDropdown } from "react-bootstrap";

class UserNavigation extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;

    return (
      <Nav>
        {isAuthenticated() ? (
          <NavDropdown
            className="right"
            title="User"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="/myreviews">My Reviews</NavDropdown.Item>
            <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link className="loginBtn" onClick={login}>
            Login
          </Nav.Link>
        )}
      </Nav>
    );
  }
}

export default UserNavigation;
