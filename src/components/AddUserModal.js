import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddUserModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    let token = JSON.parse(localStorage.getItem("data")).token

    fetch(
      "http://127.0.0.1:9091/api/v1/user/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: event.target.fullName.value,
          email: event.target.email.value,
          numberPhone: event.target.numberPhone.value,
          passWord: event.target.passWord.value,
          role: event.target.role.value,
        
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        alert(JSON.stringify(result.status));
        this.props.refreshList();
        this.props.onHide();
      });
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Thêm người dùng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlID="fullName">
                    <Form.Label>Họ Tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      required
                      placeholder="Họ Tên"
                    />
                  </Form.Group>
                  <Form.Group controlID="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      required
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group controlID="numberPhone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="numberPhone"
                      required
                      placeholder="Số Điện Thoại"
                    />
                  </Form.Group>
                  <Form.Group controlID="passWord">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      name="passWord"
                      required
                      placeholder="Mật Khẩu"
                    />
                  </Form.Group>
                  <Form.Group controlID="role">
                    <Form.Label>Vai Trò</Form.Label>
                    <Form.Control as="select" name="role" required>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Thêm
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
