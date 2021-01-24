import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UserAPI from "../API/UserAPI";

export default class Account extends Component {
  state = {
    profile: null,
    error: "",
  };

  componentDidMount = () => {
    this.loadUserProfile();
  };

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile: profile[0], error })
    );
  };

  render() {
    const profile = this.state.profile;
    if (!profile) return null;

    return (
      <section className="container">
        <h1>Profile</h1>
        <h1>{profile.email}</h1>
        <Button onClick={this.downloadData} variant="primary">
          Download Data
        </Button>
      </section>
    );
  }

  downloadData = () => {
    const profile = this.state.profile;
    UserAPI.downloadUserData(
      profile.userId,
      this.props.auth.getAccessToken(),
      (response) => {
        this.getFile(response);
      }
    );
  };

  //https://stackoverflow.com/questions/51215642/converting-object-into-json-and-downloading-as-a-json-file-in-react/51215719
  getFile = (data) => {
    let filename = "data_" + data.email + ".json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(data)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement("a");
      a.download = filename;
      a.href =
        "data:" + contentType + "," + encodeURIComponent(JSON.stringify(data));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
}
