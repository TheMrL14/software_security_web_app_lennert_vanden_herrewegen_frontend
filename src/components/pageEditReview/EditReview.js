import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../../style/addReview.scss";
import CreateForm from "../pageAddReview/CreateForm";
import ReviewAPI from "../../API/ReviewAPI";

let accessToken, userId, reviewId;

class EditReview extends Component {
  state = {
    review: null,
    isUpdated: false,
  };

  componentDidMount() {
    accessToken = this.props.auth.getAccessToken();
    userId = this.props.auth.getUserId();
    reviewId = this.props.match.params.id;
    this.getReview();
  }

  render() {
    if (this.state.review == null) return "loading";
    if (this.state.review.userId !== userId) return "No ACCES";
    if (this.state.isUpdated) {
      return <Redirect to="/myreviews" />;
    }
    return (
      <Container>
        <CreateForm onSubmit={this.updateReview} review={this.state.review} />
        <br />
        <Button variant="danger" onClick={() => this.deleteReview()}>
          Delete
        </Button>
      </Container>
    );
  }

  updateReview = (newReview) => {
    delete newReview.formIsValid;
    ReviewAPI.updateReview(newReview, accessToken, (response) => {
      if (response.ok) this.setState({ isUpdated: true });
    });
  };

  getReview() {
    ReviewAPI.getReviewById(reviewId, (response) => {
      this.setState({ review: response[0] });
    });
  }

  deleteReview = () => {
    ReviewAPI.deleteReview(reviewId, accessToken, (response) => {
      if (response) this.setState({ isUpdated: true });
    });
  };
}

export default EditReview;
