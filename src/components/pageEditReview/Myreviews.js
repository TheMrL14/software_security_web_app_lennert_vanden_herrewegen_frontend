import React, { Component } from "react";

import Reviews from "../pageIndex/Reviews";
import UserApi from "../../API/UserAPI";
import { Container } from "react-bootstrap";

let accessToken, userId;

export default class Myreviews extends Component {
  state = {
    myReviews: [],
    isMyPost: false,
  };

  componentDidMount = () => {
    accessToken = this.props.auth.getAccessToken();
    userId = this.props.auth.getUserId();
    this.findAllReviews();
  };
  render() {
    return (
      <>
        <Container fluid className="container">
          <h1>My Reviews</h1>
          <Reviews
            reviews={this.state.myReviews}
            isMyPost={true}
            deleteListener={this.deleteReview}
          />
        </Container>
      </>
    );
  }

  findAllReviews = () => {
    UserApi.getMyReviews(userId, accessToken, (json) => {
      this.setState({ myReviews: json });
    });
  };
}
