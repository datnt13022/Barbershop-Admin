import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ReviewForm from "./ReviewForm";


class AddServiceModal extends React.Component {
  constructor(props) {
    super(props);
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
            <Modal.Title id="contained-modal-title-vcenter" >
              Thêm dịch vụ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={1}></Col>
              <Col md={10}>
                <ReviewForm refreshList={this.props.refreshList} onHide={this.props.onHide}/>
              </Col>
              <Col md={1}></Col>
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
export default AddServiceModal;
