import React, { Component } from "react";
import "./App.css";
import {
  Input,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
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
      <Container>
        <Row>
          <Input
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder="Enter Url"
          />
          <br />
          {!res ? (
            <p className="danger">
              Please Enter URL including 'http://' to Generate QR Code
            </p>
          ) : (
            <div>
              <div>
                <Card>
                  <CardImg top width="50%" src={res} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>QR Code for {this.state.url}</CardTitle>
                    <CardSubtitle>Scan or Save for later</CardSubtitle>
                    <CardText>{this.state.url}</CardText>
                    <Button>Save</Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </Row>
      </Container>
    );
  }
}

export default App;
