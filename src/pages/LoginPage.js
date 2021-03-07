import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
// import { BallBeat } from 'react-pure-loaders';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberphone: "",
      password: "",
      loading: false,
      isLogined: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if(JSON.parse(localStorage.getItem("role")) === "admin"){
      this.redirectLogined()
    }

  
  }
  stopLoading = () => {
    this.setState({ loading: false });
  };

  startLoading = () => {
    this.setState({ loading: true });
  };
  redirectLogined = () => {
    this.setState({ isLogined: true });
  };
  redirectStart = () => {
    if(JSON.parse(localStorage.getItem("role"))==null){
      alert("Đăng Nhập Thất Bại")
    }
    else{
      alert("Đăng Nhập Thành Công")
      this.setState({ isLogined: true });
    }
  

  };
  // loginSuccess() {
  //   // let path = "/qldichvu";
  //   // history.push(path);
  // }
  handleSubmit(event) {
    event.preventDefault();
    var numberphone = this.state.numberphone;
    var password = this.state.password;
    this.startLoading();

    var axios = require("axios");
    var data = JSON.stringify({
      numberPhone: numberphone.toString(),
      passWord: password,
    });

    var config = {
      method: "post",
      url:
        "http://127.0.0.1:9091/api/v1/user/login",

        headers: { 
          'Content-Type': 'application/json', 
        },
      data: data,
    };
    axios(config)
      .then(function (response) {
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("role", JSON.stringify(response.data.role));
        
      })
      .then(this.stopLoading)
      .then(this.redirectStart)
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLogined === true) {
      return <Redirect to="/qldichvu" />;
    } else {
      return (
        <div>
          <div className="login-box container">
            <div className="login-logo">
              <a>
                <b>Barber</b>Shop
              </a>
            </div>
            <div className="card">
              <div className="card-body login-card-body ">
                <p className="login-box-msg">Đăng nhập để tiếp tục</p>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="numberphone">
                    <Form.Control
                      type="number"
                      placeholder="Số điện thoại"
                      onChange={(e) =>
                        this.setState({ numberphone: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Mật khẩu"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>
                  {this.state.loading ? (
                    <Loader
                      type="ThreeDots"
                      color="#00BFFF"
                      height={80}
                      width={80}
                    />
                  ) : null}
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Đăng Nhập
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // return (

    // );
  }
}

export default LoginPage;
