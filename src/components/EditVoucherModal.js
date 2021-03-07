import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker} from 'react-dates';
export class EditVoucherModal extends Component{
    constructor(props){
        super(props);
        this.state={
            startDate:null,
            endDate:null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    converts(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [ day,mnth, date.getFullYear()].join("-");
      }
    handleSubmit(event){
        event.preventDefault();
        let token = JSON.parse(localStorage.getItem("data")).token

        fetch('http://127.0.0.1:9091/api/v1/voucher/'+token+'/update',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                
                {   voucherCode:this.props.voucherCodeEdit,
                    name: event.target.name.value,
                    description: event.target.description.value,
                    price: event.target.price.value,
                    begin:  this.converts(this.state.startDate._d),
                    end: this.converts(this.state.endDate._d)
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
             Cập nhật mã khuyến mại
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
                <Row>
                    <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                    <Form.Label>Thời Gian</Form.Label>
                    <br/>
                    {/* <Form.Control> */}
                    <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    required

                    />
                    {/* </Form.Control> */}
                    </Form.Group>
                    <Form.Group controlID="voucherCode">
                    <Form.Label>Mã voucher</Form.Label>
                    <Form.Control
                        type="text"
                        name="voucherCode"
                        required
                        placeholder="Mã voucher"
                        defaultValue = {this.props.voucherCodeEdit}
                        readOnly 
                    />
                    </Form.Group>
                    <Form.Group controlID="name">
                    <Form.Label>Tên dịch vụ</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder="Tên dịch vụ"
                        defaultValue = {this.props.nameEdit}

                    />
                    </Form.Group>
                    <Form.Group controlID="description">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        required
                        placeholder="Mô tả"
                        defaultValue = {this.props.descriptionEdit}

                    />
                    </Form.Group>
                    
                    <Form.Group controlID="price">
                    <Form.Label>Giá giảm</Form.Label>
                    <Form.Control
                        type="price"
                        name="price"
                        required
                        placeholder="Giá giảm"
                        defaultValue = {this.props.priceEdit}

                    />
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
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
        </div>
        );
    }

}