import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { EditUserModal } from "../components/EditUserModal";
import { AddUserModal } from "../components/AddUserModal";
import { Button, ButtonToolbar } from "react-bootstrap";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import './Login.css'
class QlUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      addModalShow: false,
      editModalShow: false,
      value: "all",
      userFilter: [],
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    this.setState({ isLoading: true });
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/user"
      )
      .then((res) =>
        this.setState({
          userFilter: res.data,
          users: res.data,
          isLoading: false,
        })
      )
      .catch(function (error) {
        alert(error.message);
      });
  };
  deleteUser(tokenUser) {
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
      let token = JSON.parse(localStorage.getItem("data")).token;

      fetch(
        "http://127.0.0.1:9091/api/v1/user/delete/" +
          tokenUser,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => alert(result.status))
        .then(this.refreshList)
        .catch((error) => console.log("error", error));
    }
  }
  filter = (data) => {
    if (data === "all") {
      this.setState({
        value: data,
        userFilter: this.state.users,
      });
    } else {
      let beforeFilter = this.state.users.filter((user) =>
        user.role.includes(data)
      );
      this.setState({
        value: data,
        userFilter: beforeFilter,
      });
    }
  };
  change = (event) => {
    console.log(event.target.value);
    this.filter(event.target.value);
  };

  render() {
    const {
      isLoading,
      userFilter,
      fullNameEdit,
      emailEdit,
      numberPhoneEdit,
      passWordEdit,
      roleEdit,
      tokenEdit
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
                  <h1>Quản lý người dùng</h1>
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
                      <h3 className="card-title">Danh sách người dùng</h3>
                      <div class="float-right">
                        <button
                          type="button"
                          onClick={() => this.setState({ addModalShow: true })}
                          class="btn btn-danger"
                        >
                          <a class="text-light">Thêm Người Dùng</a>
                        </button>
                        <AddUserModal
                          show={this.state.addModalShow}
                          onHide={addModalClose}
                          refreshList={this.refreshList}
                        />
                      </div>
                    </div>
                    <div className="card-body">
                      <select
                        id="lang"
                        onChange={this.change}
                        value={this.state.value}
                      >
                        <option value="all">All</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                      <br />
                      <br />
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
                              <th>Họ tên</th>
                              <th>Số điện thoại</th>
                              <th>Mật khẩu</th>
                              <th>Email</th>
                              <th>Vai Trò</th>
                              <th>Xóa</th>
                              <th>Sửa</th>
                            </tr>
                          </thead>

                          <tbody>
                            {userFilter.map((user) => (
                              <tr key={user.token}>
                                <td>{user.fullName}</td>
                                <td>{user.numberPhone}</td>
                               <td id="pass"><a> {user.passWord} </a></td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                  <Link
                                    onClick={() =>
                                      this.setState({
                                        editModalShow: true,
                                        fullNameEdit: user.fullName,
                                        emailEdit: user.email,
                                        numberPhoneEdit: user.numberPhone,
                                        passWordEdit: user.passWord,
                                        roleEdit:user.role,
                                        tokenEdit:user.token
                                      })
                                    }
                                  >
                                    <i className="fas fa-edit"> </i>
                                  </Link>
                                </td>

                                <td>
                                  <Link
                                    onClick={() => this.deleteUser(user.token)}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Link>
                                </td>
                                <EditUserModal
                                  style={{ diskplay: "none" }}
                                  show={this.state.editModalShow}
                                  onHide={editModalClose}
                                  fullNameEdit={fullNameEdit}
                                  emailEdit={emailEdit}
                                  numberPhoneEdit={numberPhoneEdit}
                                  passWordEdit={passWordEdit}
                                  refreshList={this.refreshList}
                                  roleEdit={roleEdit}
                                  tokenEdit={tokenEdit}
                                  
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
        <Footer />
      </div>
    );
  }
}

export default QlUser;
