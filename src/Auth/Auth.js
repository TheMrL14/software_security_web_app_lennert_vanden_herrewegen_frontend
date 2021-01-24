import auth0 from "auth0-js";
import UserAPI from "../API/UserAPI";
//import User from "../../model/User";

const REDIRECT_ON_LOGIN = "redirect_on_login";
//private

let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let id = null;
let _newUser = null;
export default class Auth {
  constructor(history) {
    this.history = history;

    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECTURI,
      responseType: "token id_token",
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      // scope: this.requestedScopes.AUTH0_AUDIENCE,
    });
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, () => {});
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");

        alert(`Error: ${err}`);
      }
    });
  };

  setSession = async (authResult, callback) => {
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    _scopes = authResult.scope || this.requestedScopes || "";
    _accessToken = authResult.accessToken;

    let userData = authResult.idTokenPayload;
    let userID = userData.sub.split("|").pop();
    id = userID;
    if (userData.email) {
      _newUser = {
        userId: id,
        email: userData.email,
        userName: userData.email,
        isUser: 1,
        isAdmin: 0,
      };
      await UserAPI.checkAndCreateUser(_newUser, _accessToken, () => {
        callback();
      });
    } else {
      this.getProfile((user) => {
        if (user) _newUser = user[0];
        callback();
      });
    }
  };

  getUserId() {
    return id;
  }

  isAuthenticated() {
    return new Date().getTime() < _expiresAt;
  }

  getUser() {
    return _newUser;
  }

  isUser() {
    if (!_newUser) return;
    if (_newUser.isUser === 1) return true;
    return false;
  }

  logout = () => {
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: process.env.REACT_APP_INDEX_PAGE,
    });
  };

  getAccessToken = () => {
    if (!_accessToken) throw new Error("No access token found");
    return _accessToken;
  };

  getProfile = (callback) => {
    UserAPI.findUserById(id, this.getAccessToken(), (response) => {
      callback(response);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  renewToken(callback) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
        callback();
      } else {
        this.setSession(result, () => {
          if (callback) callback(err, result);
        });
      }
    });
  }
}
