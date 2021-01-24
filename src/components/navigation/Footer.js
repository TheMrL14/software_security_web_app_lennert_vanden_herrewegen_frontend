import React, { Component } from "react";
import "../../style/footer.scss";
export default class Footer extends Component {
  render() {
    return (
      <>
        <p className="footer">
          2021 BMC - <a href="/privacypolicy"> Privacy Policy</a>
        </p>
      </>
    );
  }
}
