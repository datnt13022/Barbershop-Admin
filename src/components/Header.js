import React, { Component } from 'react'
import { Link } from  "react-router-dom";

export default class Header extends Component {
    render() {
        return (
        <div>
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></Link>
      </li>
      {/* <li className="nav-item d-none d-sm-inline-block">
        <Link className="nav-link">Trang chủ</Link>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link   className="nav-link">Liên hệ</Link>
      </li> */}
    </ul>
    {/* SEARCH FORM */}
    {/* <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Tìm kiếm" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </form> */}
    {/* Right navbar links */}
   
  </nav>
</div>

        )
    }
}
