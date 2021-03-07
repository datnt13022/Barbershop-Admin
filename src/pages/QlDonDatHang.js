import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { EditServiceModal } from "../components/EditServiceModal";
import { AddServiceModal } from "../components/AddServiceModal";
import { Button, ButtonToolbar } from "react-bootstrap";
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

class QlDonDatHang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true,
      addModalShow: false,
      editModalShow: false,
      ordersFilter: [],
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.setState({ isLoading: true });
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/order/07-12-2020/18-12-2020"
      )
      .then((res) =>
        this.setState({
          orders: res.data,
          ordersFilter: res.data,
          isLoading: false,
        })
      )
      .catch(function (error) {
        alert(error.message);
      });
  };
  checkin(id) {
    if (window.confirm("Bạn có chắc là khách đã đến?")) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "__cfduid=da615458fc4e1c5298a7af3e001f850441605104174"
      );
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://127.0.0.1:9091/api/v1/order/checkin/" +
          id,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => alert(JSON.parse(result).status))
        .then(this.refreshList)
        .catch((error) => console.log("error", error));
    }
  }
  payout(id, totalPrice) {
    let x = parseInt(totalPrice).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    if (window.confirm("Bạn muốn thanh toán " + x + " ?")) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "__cfduid=da615458fc4e1c5298a7af3e001f850441605104174"
      );
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://127.0.0.1:9091/api/v1/order/payout/" +
          id,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => alert(JSON.parse(result).status))
        .then(this.refreshList)
        .catch((error) => console.log("error", error));
    }
  }
  filter = (data) => {
    if (data == "all") {
      this.setState({
        value: data,
        ordersFilter: this.state.orders,
      });
    } else {
      let beforeFilter = this.state.orders.filter((order) =>
        order.status.includes(data)
      );
      this.setState({
        value: data,
        ordersFilter: beforeFilter,
      });
    }
  };
  change = (event) => {
    // console.log(event.target.value);
    this.filter(event.target.value);
  };
  renderButton1(id, status) {
    if (status == "booking") {
      return (
        <td>
          <Link onClick={() => this.checkin(id)}>
            <i className="fas fa-check-circle fa-3x"></i>
          </Link>
        </td>
      );
    }
    return (
      <td>
        {/* <Link onClick={() => this.checkin(id)}> */}
        <i className="fas fa-check-circle fa-3x"></i>
        {/* </Link> */}
      </td>
    );
  }
  renderButton2(id, totalPrice,status) {
    if (status == "Checkin") {
      return (
        <td>
          <Link onClick={() => this.payout(id, totalPrice)}>
            <i className="fas fa-coins fa-3x"></i>
          </Link>
        </td>
      );
    }
    return (
      <td>
        {/* <Link onClick={() => this.payout(id, totalPrice)}> */}
          <i className="fas fa-coins fa-3x"></i>
        {/* </Link> */}
      </td>
    );
  }
  render() {
    const {
      orders,
      isLoading,
      nameModal,
      descriptionModal,
      priceModal,
      idModal,
      ordersFilter,
    } = this.state;

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
         <Header/>
       <Menu/>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Quản lý đơn đặt hàng</h1>
                </div>
          
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Danh sách đơn đặt hàng</h3>
                      <div class="float-right">
                        {/* <button type="button" onClick={()=> this.setState({addModalShow: true})} class="btn btn-danger">
                          
                          <a  class="text-light">
                            Thêm Dịch Vụ
                          </a>
                        </button> */}
                        {/* <AddServiceModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            refreshList= {this.refreshList}

                            /> */}
                      </div>
                    </div>
                    <div className="card-body">
                      <select
                        id="lang"
                        onChange={this.change}
                        value={this.state.value}
                      >
                        <option value="all">All</option>
                        <option value="Cancel">Cancel</option>
                        <option value="booking">Chưa Tới</option>
                        <option value="Checkin">Đã Tới</option>
                        <option value="PayoutSuccess">Đã Thanh Toán</option>
                      </select>
                      <br/>
                      <br/>
                      {isLoading ? (
                        <SkeletonLoader
                          style={{ width: "100%", height: 700 }}
                        />
                      ) : (
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              {/* <th>ID</th> */}
                              <th>Tên Khách Hàng</th>
                              <th>Số Điện Thoại</th>
                              <th>Tên Dịch Vụ</th>
                              <th>Giờ Đặt</th>
                              <th>Tổng Tiền</th>
                              <th>Status</th>
                              <th>Check in</th>
                              <th>Thanh Toán</th>
                            </tr>
                          </thead>
                          {/* <i class="fas fa-check-circle"></i>  */}
                          <tbody>
                            {ordersFilter.map((order) => (
                              <tr key={order.numberPhone}>
                                <td>{order.fullname}</td>
                                <td>{order.numberPhone}</td>
                                <td>{order.service.name}</td>
                                <td>{order.timeBooked}</td>
                                <td>
                                  {parseInt(order.totalPrice).toLocaleString(
                                    "it-IT",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </td>
                                <td>{order.status}</td>
                                {/*  */}
                                {this.renderButton1(order.id, order.status)}
                                {this.renderButton2(
                                  order.id,
                                  order.totalPrice,
                                  order.status
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer/>

      </div>
    );
  }
}

export default QlDonDatHang;
