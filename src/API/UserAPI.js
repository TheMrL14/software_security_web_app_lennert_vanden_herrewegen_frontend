import PATHS from "../Paths";
import Client from "./Client";

export default class UserAPI {
  static findUserById = (id, token, callback) => {
    Client.authenticatedGetMethod(PATHS.USER + "/" + id, token, callback);
  };

  static downloadUserData = (id, token, callback) => {
    Client.authenticatedGetMethod(PATHS.USER + "/data/" + id, token, callback);
  };

  static postUserToDB = (user, token, callback) => {
    Client.postMethod(PATHS.USER, user, token, callback);
  };

  static checkIfUserExists = (id, token, callback) => {
    Client.authenticatedGetMethod(PATHS.CHECKCOUNT + "/" + id, token, callback);
  };

  static checkAndCreateUser = (user, token, callback) => {
    this.checkIfUserExists(user.userId, token, (response) => {
      if (response.count < 1) this.postUserToDB(user, token, callback);
    });
  };

  static getMyReviews = (id, token, callback) => {
    Client.authenticatedGetMethod(
      PATHS.USER + "/reviews/" + id,
      token,
      callback
    );
  };
}
