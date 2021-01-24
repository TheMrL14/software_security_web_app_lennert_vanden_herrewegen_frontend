import "./App.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./components/pageIndex/Index";
import NavWithRouter from "./components/navigation/Navigation";
import AddReview from "./components/pageAddReview/AddReview";
import PrivateRoute from "./PrivateRoute";
import Auth from "./Auth/Auth";
import AuthContext from "./context/AuthContext";
import LoginCallback from "./components/AuthPages/LoginCallback";
import Myreviews from "./components/pageEditReview/Myreviews";
import EditReview from "./components/pageEditReview/EditReview";
import Footer from "./components/navigation/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Account from "./components/Account";

class App extends Component {
  state = {
    auth: new Auth(this.props.history),
    tokenRenewalComplete: false,
  };

  componentDidMount() {
    this.state.auth.renewToken(() => {
      this.setState({ tokenRenewalComplete: true });
    });
  }

  render() {
    const { auth } = this.state;

    if (!this.state.tokenRenewalComplete) return <h1>Page Loading ...</h1>;

    return (
      <AuthContext.Provider value={auth}>
        <NavWithRouter auth={auth} />
        <Switch>
          <Route
            path="/loginCallback"
            render={(props) => (
              <LoginCallback auth={auth} {...props}></LoginCallback>
            )}
          />
          <Route path="/" render={(props) => <Index {...props} />} exact />
          <Route
            path="/privacypolicy"
            render={(props) => <PrivacyPolicy {...props} />}
            exact
          />
          <PrivateRoute path="/Add" component={AddReview} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/myreviews" component={Myreviews} />
          <PrivateRoute path="/editReview/:id" component={EditReview} />
        </Switch>
        <Footer />
      </AuthContext.Provider>
    );
  }
}

export default App;
