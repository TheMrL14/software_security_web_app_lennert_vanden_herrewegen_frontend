import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class CreateForm extends Component {
  state = {
    title: "",
    review: "",
    score: "5",
    formIsValid: true,
    id: 0,
  };

  componentDidMount = () => {
    const review = this.props.review;
    if (this.props.review) {
      this.setState({
        id: review.id,
        title: review.title,
        review: review.review,
        score: review.score,
        formIsValid: true,
      });
    }
  };

  handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let newReview = { ...this.state };
    newReview[name] = value;
    this.setState(newReview);
  };

  submitHandler = () => {
    if (!this.checkFormValid()) {
      console.log("nie goed");
      this.setState({ formIsValid: false });
    } else {
      this.props.onSubmit(this.state);
    }
  };

  checkFormValid = () => {
    const review = this.state;
    if (!review.title | (review.title === "") | (review.title.length > 50))
      return false;
    if (!review.review | (review.review === "") | (review.title.review > 5000))
      return false;
    if (!review.score | (review.score < 0) | (review.title.review > 10))
      return false;

    return true;
  };

  render() {
    return (
      <Form className="createForm">
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className={!this.state.formIsValid ? "faultyForm" : null}
            type="text"
            name="title"
            defaultValue={this.state.title}
            placeholder="Enter the movie title"
            onChange={this.handleFormChange}
          ></Form.Control>
          {!this.state.formIsValid ? (
            <Form.Text className="notValid">
              Fill in a title of max 20 chars
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="review">
          <Form.Label>Your review</Form.Label>
          <Form.Control
            className={!this.state.formIsValid ? "faultyForm" : null}
            name="review"
            as="textarea"
            defaultValue={this.state.review}
            rows={3}
            onChange={this.handleFormChange}
          />
          {!this.state.formIsValid ? (
            <Form.Text className="notValid">
              Fill in a review of max 255 chars
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="score">
          <Form.Label>Your score {this.state.score}/10</Form.Label>
          <Form.Control
            name="score"
            type="range"
            min="0"
            max="10"
            step="0.5"
            defaultValue={this.state.score}
            onChange={this.handleFormChange}
          />
        </Form.Group>
        <Button onClick={this.submitHandler} variant="primary">
          Submit
        </Button>
      </Form>
    );
  }
}

export default CreateForm;
