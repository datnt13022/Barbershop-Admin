import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "tiny-skeleton-loader-react";
import  EditServiceModal  from "../components/EditServiceModal/EditServiceModal";
import AddServiceModal  from "../components/AddServiceModal/AddServiceModal";
import { Button, ButtonToolbar } from "react-bootstrap";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from '../components/Footer'

class QlDichvu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sevices: [],
      isLoading: true,
      addModalShow: false,
      editModalShow: false,
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.setState({ isLoading: true });
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/service"
      )
      .then((res) => this.setState({ sevices: res.data, isLoading: false }))
      .catch(function (error) {
        alert(error.message);
      });
  };
  deleteService(serviceID) {
    let token = JSON.parse(localStorage.getItem("data")).token
    if (window.confirm("Bạn có chắc là mình muốn xóa?")) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "__cfduid=da615458fc4e1c5298a7af3e001f850441605104174"
      );

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "http://127.0.0.1:9091/api/v1/service/"+token+"/delete/" +
          serviceID,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => alert(result.status))
        .then(this.refreshList)
        .catch((error) => console.log("error", error));
    }
  }
  render() {
    const {
      sevices,
      isLoading,
      nameModal,
      descriptionModal,
      priceModal,
      idModal,
      typeModal,
      imageModal
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Quản lý dịch vụ</h1>
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
                      <h3 className="card-title">Danh sách dịch vụ</h3>
                      <div class="float-right">
                        <button
                          type="button"
                          onClick={() => this.setState({ addModalShow: true })}
                          class="btn btn-danger"
                        >
                          <a class="text-light">Thêm Dịch Vụ</a>
                        </button>
                        <AddServiceModal
                          show={this.state.addModalShow}
                          onHide={addModalClose}
                          refreshList={this.refreshList}
                        />
                      </div>
                    </div>
                    <div className="card-body">
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
                              <th>ID</th>
                              <th>Tên Dịch Vụ</th>
                              <th>Type</th>
                              <th>Mô Tả Dịch Vụ</th>
                              <th>Giá</th>
                              <th>Sửa</th>
                              <th>Xóa</th>
                            </tr>
                          </thead>

                          <tbody>
                            {sevices.map((service) => (
                              <tr key={service.idService}>
                                <td>{service.idService}</td>
                                <td>{service.name}</td>
                                <td>{service.type}</td>
                                <td>{service.description}</td>
                                <td>{service.price}</td>
                                <td>
                                  <Link
                                    onClick={() =>
                                      this.setState({
                                        editModalShow: true,
                                        idModal: service.idService,
                                        nameModal: service.name,
                                        descriptionModal: service.description,
                                        priceModal: service.price,
                                        typeModal:service.type,
                                        imageModal:service.image
                                      })
                                    }
                                  >
                                    <i className="fas fa-edit"> </i>
                                  </Link>
                                </td>

                                <td>
                                  <Link
                                    onClick={() =>
                                      this.deleteService(service.idService)
                                    }
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Link>
                                </td>

                                <EditServiceModal
                                  style={{ diskplay: "none" }}
                                  show={this.state.editModalShow}
                                  onHide={editModalClose}
                                  nameEdit={nameModal}
                                  descriptionEdit={descriptionModal}
                                  priceEdit={priceModal}
                                  idEdit={idModal}
                                  imageEdit={imageModal}
                                  typeEdit={typeModal}
                                  refreshList={this.refreshList}
                                />
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

export default QlDichvu;
