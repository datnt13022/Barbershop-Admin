import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ReviewForm from "./ReviewForm";


class EditNewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { snackbaropen: false, snackbarmsg: "" };
    // this.handleSubmit = this.handleSubmit.bind(this);
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
                  show = {this.props.show}
                  onHide={this.props.onHide}
                  idEdit = {this.props.idEdit}
                  titleEdit = {this.props.titleEdit}
                  tagEdit = {this.props.tagEdit}
                  contentEdit={this.props.contentEdit}
                  descriptionEdit = {this.props.descriptionEdit}
                  thumbnailEdit={this.props.thumbnailEdit}
                  linkEdit={this.props.linkEdit}
                  refreshList= {this.props.refreshList}
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
export default EditNewModal;
