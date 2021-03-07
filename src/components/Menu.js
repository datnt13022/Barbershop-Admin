import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
    };
  }
  componentDidMount(){
    this.setState({
      fullname:JSON.parse(localStorage.getItem("data")).fullname
    })
  }
  logout(){
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          {/* <Link to="index3.html" className="brand-link">
            <img
              src="dist/img/reactjs.jpg"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light"> Barber Shop</span>
          </Link> */}
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  className="img-circle elevation-2"
                  src="dist/img/user2-160x160.jpg"
                  alt="User avatar"
                />
              </div>
              <div className="info">
                <Link to="#" className="d-block">
                  {this.state.fullname}
                </Link>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                <li className="nav-header">DANH MỤC QUẢN LÝ</li>
                <li className="nav-item">
                  <Link to="/qldichvu" className="nav-link">
                    <i className="nav-icon fas fa-calendar-alt" />
                    <p>
                      Quản lý dịch vụ
                      {/* <span className="badge badge-info right">2</span> */}
                    </p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                   <Link to="/qluser" className="nav-link">
                    <i className="nav-icon fas fa-user" />
                    <p>
                    Quản lý User
              </p>
                  </ Link>
                </li> */}

                <li className="nav-item">
                  <Link to="/qltintuc" className="nav-link">
                    <i className="fas fa-book nav-icon" />
                    <p>Quản lý tin tức</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/qlNguoiDung" className="nav-link">
                    <i className="fas fa-user-tie nav-icon" />
                    <p>Quản lý người dùng</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                   <Link to="/qltintuc" className="nav-link">
                    <i className="far fa-address-card nav-icon" />
                    <p>Quản lý nhân viên</p>
                  </ Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/qlDonDatHang" className="nav-link">
                    <i className="fas fa-shopping-cart nav-icon" />
                    <p>Quản lý đơn đặt hàng</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/qlKhuyenMai" className="nav-link">
                    <i className="fas fa-gift nav-icon" />
                    <p>Quản lý mã khuyến mãi</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                   <Link to="/qltintuc" className="nav-link">
                    <i className="fas fa-comments nav-icon" />
                    <p>Quản lý bình luận</p>
                  </ Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/thongke" className="nav-link">
                    <i className="fas fa-chart-bar nav-icon" />
                    <p>Báo cáo thống kê</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={this.logout} className="nav-link">
                    <i className="fas fa-sign-out-alt nav-icon" />
                    <p>Đăng xuất</p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
