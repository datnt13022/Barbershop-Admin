import React, { Component } from "react";
import QlDichvu from "./pages/QlDichvu";
import QlTintuc from "./pages/QlTintuc";
import QlUser from "./pages/QlUser";
import QlKhuyenMai from "./pages/QlKhuyenMai";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import qlDonDatHang from "./pages/QlDonDatHang";
import LoginPage from "./pages/LoginPage";
import PrivateRouter from "./components/PrivateRouter";
import { AuthContext } from "./context/auth";
import ThongKe from "./pages/ThongKe"
import PageNotFound from'./pages/PageNotFound'
export default class App extends Component {

  render() {

    return (
      <AuthContext.Provider value={false}>
        <BrowserRouter>
          <div>
            <Switch>

              <Route path="/admin/login">
                <LoginPage/>
              </Route>
              <PrivateRouter path="/qlNguoiDung" component={QlUser} />
              <PrivateRouter path="/qldichvu" component={QlDichvu} />
              <PrivateRouter path="/qltintuc" component={QlTintuc} />
              <PrivateRouter path="/qlDonDatHang" component={qlDonDatHang} />
              <PrivateRouter path="/qlKhuyenMai" component={QlKhuyenMai} />
              <PrivateRouter path="/thongke" component={ThongKe} />
              <Route  component={ LoginPage}/>

            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}
