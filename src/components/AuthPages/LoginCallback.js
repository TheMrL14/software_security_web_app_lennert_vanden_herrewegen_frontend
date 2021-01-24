import React, { Component } from "react";

export default class LoginCallback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL");
    }
  }
  render() {
    return (
      <div>
        <h1 className="loading">Loading...</h1>
      </div>
    );
  }
}
