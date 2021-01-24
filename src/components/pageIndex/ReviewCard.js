import React, { Component } from "react";
import { Card } from "react-bootstrap";
class ReviewCard extends Component {
  render() {
    const review = this.props.review;
    const editLink = "/editReview/" + review.id;
    return (
      <>
        <Card className="reviewBox">
          <Card.Title>{review.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {review.score}/10
          </Card.Subtitle>
          <Card.Text>{review.review}</Card.Text>
          {this.props.isMyPost ? (
            <>
              <Card.Link href={editLink}>Edit</Card.Link>
            </>
          ) : null}
        </Card>
      </>
    );
  }
}

export default ReviewCard;
