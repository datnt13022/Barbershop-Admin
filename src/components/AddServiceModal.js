import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';



export class AddServiceModal extends Component{
    constructor(props){
        super(props);
       
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
  
    handleSubmit(event){
        event.preventDefault();
        let token = JSON.parse(localStorage.getItem("data")).token

        fetch('http://127.0.0.1:9091/api/v1/service/'+token,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                
                {
                    "price": event.target.price.value,
                    "name": event.target.name.value,
                    "description": event.target.description.value
                }
            )
        })
        .then(res=> res.json())
        .then((result)=>
        {
            alert(JSON.stringify(result.status));
            this.props.refreshList()
            this.props.onHide()
        },)
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
             Thêm dịch vụ
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            

                <Row>
                    <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlID="name">
                    <Form.Label>Dịch vụ</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder="Tên dịch vụ"
                    />
                    </Form.Group>
                    <Form.Group controlID="description">
                    <Form.Label>Dịch vụ</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        required
                        placeholder="Mô tả"
                    />
                    </Form.Group>
                    <Form.Group controlID="price">
                    <Form.Label>Giá tiền</Form.Label>
                    <Form.Control
                        type="price"
                        name="price"
                        required
                        placeholder="Giá tiền"
                    />
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
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
        </div>
        );
    }

}