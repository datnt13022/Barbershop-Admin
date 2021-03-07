import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditUserModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
    };
    handleSubmit(event){
        event.preventDefault();
        // let token = JSON.parse(localStorage.getItem("data")).token

        fetch('http://127.0.0.1:9091/api/v1/user/update/'+this.props.tokenEdit,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                
                {
                  fullName: event.target.fullName.value,
                  email: event.target.email.value,
                  numberPhone: event.target.numberPhone.value,
                  passWord: event.target.passWord.value,
                  role: event.target.role.value,
                }
            )
        })
        .then(res=> res.json())
        .then((result)=>
        {
            alert(JSON.stringify(result.status));
            this.props.refreshList()
            this.props.onHide()
        },
        
        )
   
    }

    render(){
        return(
            <div className="container">
            <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Người Dùng
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
                      defaultValue = {this.props.fullNameEdit}
                    />
                  </Form.Group>
                  <Form.Group controlID="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      required
                      placeholder="Email"
                      defaultValue = {this.props.emailEdit}
                    />
                  </Form.Group>
                  <Form.Group controlID="numberPhone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="numberPhone"
                      required
                      placeholder="Số Điện Thoại"
                      defaultValue = {this.props.numberPhoneEdit}
                    />
                  </Form.Group>
                  <Form.Group controlID="passWord">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      name="passWord"
                      required
                      placeholder="Mật Khẩu"
                      defaultValue = {this.props.passWordEdit}
                    />
                  </Form.Group>
                  <Form.Group controlID="role">
                    <Form.Label>Vai Trò</Form.Label>
                    <Form.Control as="select" name="role"  defaultValue = {this.props.roleEdit} required>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                     </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Cập Nhật
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