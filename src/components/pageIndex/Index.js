import React, { Component } from "react";

import "../../style/index.scss";
import Reviews from "./Reviews";
import ReviewAPI from "../../API/ReviewAPI";

import { Container } from "react-bootstrap";

class Index extends Component {
  state = {
    reviews: [],
  };

  componentDidMount = () => {
    this.findAllReviews();
  };
  render() {
    return (
      <>
        <Container fluid className="container">
          <Reviews reviews={this.state.reviews} />
        </Container>
      </>
    );
  }

  findAllReviews = () => {
    ReviewAPI.getAllReviews((json) => {
      this.setState({ reviews: json });
    });
  };
}

export default Index;
