import { Component } from "react";
import { Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

class Reviews extends Component {
  render() {
    return (
      <>
        {this.props.reviews.map((i) => (
          <Row key={i.id}>
            <ReviewCard review={i} isMyPost={this.props.isMyPost}></ReviewCard>
          </Row>
        ))}
      </>
    );
  }
}

export default Reviews;
