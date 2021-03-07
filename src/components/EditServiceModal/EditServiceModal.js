import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ReviewForm from "./ReviewForm";

class EditServiceModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { snackbaropen: false, snackbarmsg: "" };
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

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
              Thêm dịch vụ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={1}></Col>
              <Col md={10}>
                <ReviewForm
                  show={this.props.show}
                  onHide={this.props.onHide}
                  nameEdit={this.props.nameEdit}
                  imageEdit={this.props.imageEdit}
                  idEdit={this.props.idEdit}
                  priceEdit={this.props.priceEdit}
                  typeEdit={this.props.typeEdit}
                  descriptionEdit={this.props.descriptionEdit}
                  refreshList={this.props.refreshList}
                />
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
export default EditServiceModal;
