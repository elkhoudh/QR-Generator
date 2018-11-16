import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    url: "",
    isSubmitted: false,
    res: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, function() {
      this.createQrCode(this.state.url);
    });
  };

  createQrCode = url => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://www.qrtag.net/api/qr_4.png?url=${url}`;
    fetch(proxyUrl + targetUrl).then(res => {
      this.setState({ res: res.url.substring(36) });
    });
  };
  render() {
    const { res } = this.state;
    return (
      <div className="App">
        <input
          name="url"
          value={this.state.url}
          onChange={this.handleChange}
          placeholder="Enter Url"
        />
        <br />
        {!res ? (
          "Please Enter URL to Generate QR Code"
        ) : (
          <div>
            <img src={res} alt="..." />
          </div>
        )}
      </div>
    );
  }
}

export default App;
