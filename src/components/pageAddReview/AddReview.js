import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../../style/addReview.scss";
import CreateForm from "./CreateForm";
import ReviewAPI from "../../API/ReviewAPI";
import { Redirect } from "react-router-dom";

let accessToken, userId;

class AddReview extends Component {
  state = {
    isPosted: false,
  };

  componentDidMount() {
    accessToken = this.props.auth.getAccessToken();
    userId = this.props.auth.getUserId();
  }

  render() {
    if (this.state.isPosted === true) {
      console.log("ja");
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <CreateForm onSubmit={this.postReview} review={null} />
      </Container>
    );
  }

  postReview = (newReview) => {
    delete newReview.formIsValid;
    newReview.userId = userId;
    ReviewAPI.postReview(newReview, accessToken, (response) => {
      if (response.ok) this.setState({ isPosted: true });
    });
  };
}

export default AddReview;
