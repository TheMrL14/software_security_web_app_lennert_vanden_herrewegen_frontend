import PATHS from "../Paths";
import Client from "./Client";

export default class ProductAPI {
  static getAllReviews = (callback) => {
    Client.getMethod(PATHS.MOVIES, callback);
  };
  static getReviewById = (id, callback) => {
    Client.getMethod(PATHS.MOVIES + "/" + id, callback);
  };

  static updateReview = (review, token, callback) => {
    Client.putMethod(PATHS.MOVIES + "/" + review.id, review, token, callback);
  };

  static postReview = (review, token, callback) => {
    Client.postMethod(PATHS.MOVIES, review, token, callback);
  };
  static deleteReview = (id, token, callback) => {
    Client.deleteMethod(PATHS.MOVIES + "/" + id, token, callback);
  };
}
