import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "tiny-skeleton-loader-react";
import {EditVoucherModal} from '../components/EditVoucherModal';
import { AddVoucherModal } from "../components/AddVoucherModal";
import {Button, ButtonToolbar} from 'react-bootstrap';
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

class QlKhuyenMai extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vouchers: [], isLoading: true,addModalShow : false, editModalShow : false };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList=()=> {
    this.setState({ isLoading: true })
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/voucher"
      )
      .then((res) => this.setState({ vouchers: res.data, isLoading: false }))
      .catch(function (error) {
        alert(error.message);
      });
  }
  deleteVoucher(voucherCode)
  {    let token = JSON.parse(localStorage.getItem("data")).token

      if(window.confirm('Bạn có chắc là mình muốn xóa?'))
      {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "__cfduid=da615458fc4e1c5298a7af3e001f850441605104174");
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:9091/api/v1/voucher/"+token+"/delete/"+voucherCode, requestOptions)
          .then(response => response.json())
          .then(result => alert(result.status))
          .then(this.refreshList)
          .catch(error => console.log('error', error));
      }
     
  }
  render() {
    const { vouchers, isLoading,voucherCodeModal,nameModal,descriptionModal,priceModal} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});
    let convertsTime=(time)=>{ 
      console.log(time)
    let dArr = time.split('T')[0].split("-"); 
    return dArr[2]+ "-" +dArr[1]+ "-" +dArr[0];
  }
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Quản lý mã khuyến mại</h1>
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
                      <h3 className="card-title">Danh sách mã khuyến mại</h3>
                      <div class="float-right">
                        <button type="button" onClick={()=> this.setState({addModalShow: true})} class="btn btn-danger">
                          
                          <a  class="text-light">
                            Thêm mã khuyến mại
                          </a>
                        </button>
                        <AddVoucherModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            refreshList= {this.refreshList}

                            />
                      </div>
                    </div>
                    <div className="card-body">
                      
                   
                        {isLoading ? <SkeletonLoader style={{ width: "100%", height: 700 }} /> :  <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Mã Voucher</th>
                            <th>Tên Voucher</th>
                            <th>Thông Tin Voucher</th>
                            <th>Giảm</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Ngày Kết Thúc</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>

                        <tbody>
                          {vouchers.map((voucher) => (
                            <tr key={voucher.voucherCode}>
                              <td>{voucher.voucherCode}</td>
                              <td>{voucher.name}</td>
                              <td>{voucher.description}</td>
                              <td>{voucher.price}</td>
                              <td>{convertsTime(voucher.begin)}</td>
                              <td>{convertsTime(voucher.end)}</td>
                              <td>
                                <Link onClick={()=> this.setState({editModalShow:true, voucherCodeModal:voucher.voucherCode,nameModal:voucher.name, descriptionModal:voucher.description, priceModal:voucher.price})}> 
                                 <i className="fas fa-edit"> </i>
                                 </Link>
                              </td>
                              <td>
                                <Link onClick={()=> this.deleteVoucher(voucher.voucherCode)} >
                                  <i className="fas fa-trash-alt"  />
                                </Link>
                              </td>
                              
                              <EditVoucherModal style={{diskplay: "none"}}
                            show = {this.state.editModalShow}
                            onHide={editModalClose}
                            voucherCodeEdit={voucherCodeModal}
                            nameEdit = {nameModal}
                            descriptionEdit = {descriptionModal}
                            priceEdit = {priceModal}
                            refreshList= {this.refreshList}
                            />
                            </tr>
                            
                          ))}
                        </tbody>
                       
                      </table>
                      
                      }
                     
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

export default QlKhuyenMai;
