import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

// import { BallBeat } from 'react-pure-loaders';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { Bar } from "react-chartjs-2";

import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
class ThongKe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "month",
      month: null,
      year: null,
      fromDate: null,
      endDate: null,
      isLoading: false,
      allData: null,
      filterKey: "all",
      orderFilter: null,
      idServiceArr: [],
      nameServiceArr: [],
      totalServiceArr: [],
      countServiceArr: [],
      orderLastest: [],
      moneyServiceArr: [],
      voucherArr: [],
      byType: [],
    };
  }
  getTime = () => {
    var dd = new Date(this.state.year, this.state.month - 1, 1).getDate();
    var mm = new Date(this.state.year, this.state.month - 1, 1).getMonth() + 1;
    var yyyy = new Date(this.state.year, this.state.month - 1, 1).getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd1 = new Date(this.state.year, this.state.month, 0).getDate();
    var mm1 = new Date(this.state.year, this.state.month, 0).getMonth() + 1;
    var yyyy1 = new Date(this.state.year, this.state.month, 0).getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.setState({
      fromDate: dd + "-" + mm + "-" + yyyy,
      endDate: dd1 + "-" + mm1 + "-" + yyyy1,
    });
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };

  change = (event) => {
    console.log(event.target.value);
    this.filter(event.target.value);
  };
  componentWillMount() {
    var d = new Date();
    var monthNow = d.getMonth() + 1;
    var yearNow = d.getFullYear();

    this.setState({
      month: monthNow.toString(),
      year: yearNow.toString(),
    });
  }
  componentDidMount() {
    this.getTime();
  }

  refreshList = (dd, mm, yyyy, dd1, mm1, yyyy1) => {
    this.setState({ isLoading: true });
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/order/" +
          dd +
          "-" +
          mm +
          "-" +
          yyyy +
          "/" +
          dd1 +
          "-" +
          mm1 +
          "-" +
          yyyy1
      )
      .then((res) => this.filterPayoutSuccess(res))
      .catch(function (error) {
        alert(error.message);
      });
  };
  filterPayoutSuccess = (res) => {
    let beforeFilter = res.data.filter((order) =>
      order.status.includes("PayoutSuccess")
    );
    let result = {
      idServiceArr: [],
      nameServiceArr: [],
      countServiceArr: [],
      totalServiceArr: [],
      moneyServiceArr: [],
      voucherArr: [],
      byType: [0,0,0,0],
      listType:["combo","cat","uon","nhuom"]
    };
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? null
        : (result.idServiceArr.push(order.service.idService),
          result.nameServiceArr.push(order.service.name),
          result.countServiceArr.push(0),
          result.voucherArr.push(0),
          result.totalServiceArr.push(0))
    );
    beforeFilter.forEach((order) =>
      result.moneyServiceArr.includes(order.service.price)
        ? null
        : result.moneyServiceArr.push(order.service.price)
    );
    beforeFilter.forEach((order) =>
      order.voucher === null
        ? null
        : (result.voucherArr[
            result.idServiceArr.indexOf(order.service.idService)
          ] =
            result.voucherArr[
              result.idServiceArr.indexOf(order.service.idService)
            ] + order.voucher.price)
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? null
        : (result.idServiceArr.push(order.service.idService),
          result.nameServiceArr.push(order.service.name),
          result.countServiceArr.push(0),
          result.totalServiceArr.push(0))
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? (result.countServiceArr[
            result.idServiceArr.indexOf(order.service.idService)
          ] =
            result.countServiceArr[
              result.idServiceArr.indexOf(order.service.idService)
            ] + 1)
        : null
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? (result.totalServiceArr[
            result.idServiceArr.indexOf(order.service.idService)
          ] += parseFloat(order.totalPrice))
        : null
    );

    beforeFilter.forEach((order) =>
    result.listType.includes(order.service.type)
        ? (result.byType[
            result.listType.indexOf(order.service.type)
          ] +=1)
        : null
    );
    this.setState({
      orderFilter: beforeFilter,
      allData: res.data,
      idServiceArr: result.idServiceArr,
      nameServiceArr: result.nameServiceArr,
      countServiceArr: result.countServiceArr,
      totalServiceArr: result.totalServiceArr,
      orderLastest: beforeFilter,
      isLoading: false,
      moneyServiceArr: result.moneyServiceArr,
      voucherArr: result.voucherArr,
      byType: result.byType,
      listType: result.listType,
    });
  };
  filterPayoutSuccessOnChange = (data) => {
    let beforeFilter = data.filter((order) => order.status.includes("PayoutSuccess"));
    let result = {
      idServiceArr: [],
      nameServiceArr: [],
      countServiceArr: [],
      totalServiceArr: [],
      moneyServiceArr: [],
    };
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? null
        : (result.idServiceArr.push(order.service.idService),
          result.nameServiceArr.push(order.service.name),
          result.countServiceArr.push(0),
          result.totalServiceArr.push(0))
    );
    beforeFilter.forEach((order) =>
      result.moneyServiceArr.includes(order.service.price)
        ? null
        : result.moneyServiceArr.push(order.service.price)
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? null
        : (result.idServiceArr.push(order.service.idService),
          result.nameServiceArr.push(order.service.name),
          result.countServiceArr.push(0),
          result.totalServiceArr.push(0))
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? (result.countServiceArr[
            result.idServiceArr.indexOf(order.service.idService)
          ] =
            result.countServiceArr[
              result.idServiceArr.indexOf(order.service.idService)
            ] + 1)
        : null
    );
    beforeFilter.forEach((order) =>
      result.idServiceArr.includes(order.service.idService)
        ? (result.totalServiceArr[
            result.idServiceArr.indexOf(order.service.idService)
          ] += parseFloat(order.totalPrice))
        : null
    );

    this.setState({
      allData: data,
      idServiceArr: result.idServiceArr,
      nameServiceArr: result.nameServiceArr,
      countServiceArr: result.countServiceArr,
      totalServiceArr: result.totalServiceArr,
      orderLastest: beforeFilter,
      isLoading: false,
      moneyServiceArr: result.moneyServiceArr,
    });
  };
  onChangeFilter = (e) => {
    this.filter(e.target.value);
  };
  filter = (data) => {
    if (data === "all") {
      this.setState({
        orderLastest: this.state.orderFilter,
        filterKey: data,
      });
      this.filterPayoutSuccessOnChange(this.state.orderFilter);
    } else {
      let beforeFilter = this.state.orderFilter.filter((order) =>
        order.service.type.includes(data)
      );
      this.setState({
        filterKey: data,
        orderLastest: beforeFilter,
      });
      this.filterPayoutSuccessOnChange(beforeFilter);
    }
  };
  updateChecked = (e) => {
    if (e.target.checked) {
      this.setState({
        checked: e.target.value,
      });
      if (e.target.value === "month") {
        this.defaultMonthYear();
      }
      if (e.target.value === "year") {
        this.defaultYear();
      }
      if (e.target.value === "monthyear") {
        this.defaultMonthYear();
      }
    }
  };

  defaultYear = () => {
    var defaultyyyy = new Date().getFullYear();
    this.setState({
      year: defaultyyyy.toString(),
    });
    var dd = new Date(defaultyyyy, 0, 1).getDate();
    var mm = new Date(defaultyyyy, 0, 1).getMonth() + 1;
    var yyyy = new Date(defaultyyyy, 0, 1).getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd1 = new Date(defaultyyyy, 12, 0).getDate();
    var mm1 = new Date(defaultyyyy, 12, 0).getMonth() + 1;
    var yyyy1 = new Date(defaultyyyy, 12, 0).getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };
  defaultMonthYear = () => {
    var mm = new Date().getMonth() + 1;
    var yyyy = new Date().getFullYear();
    var dd = new Date(yyyy, mm - 1, 1).getDate();
    this.setState({
      month: mm.toString(),
      year: yyyy.toString(),
    });
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var mm1 = new Date().getMonth() + 1;
    var yyyy1 = new Date().getFullYear();
    var dd1 = new Date(yyyy1, mm1, 0).getDate();
    this.setState();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };
  onChangeMonth = (event) => {
    this.setState({
      month: event.target.value,
    });
    var dd = new Date(this.state.year, event.target.value - 1, 1).getDate();
    var mm =
      new Date(this.state.year, event.target.value - 1, 1).getMonth() + 1;
    var yyyy = new Date(
      this.state.year,
      event.target.value - 1,
      1
    ).getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd1 = new Date(this.state.year, event.target.value, 0).getDate();
    var mm1 = new Date(this.state.year, event.target.value, 0).getMonth() + 1;
    var yyyy1 = new Date(this.state.year, event.target.value, 0).getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };
  onChangeYear2 = (event) => {
    this.setState({
      year: event.target.value,
    });
    var dd = new Date(event.target.value, this.state.month - 1, 1).getDate();
    var mm =
      new Date(event.target.value, this.state.month - 1, 1).getMonth() + 1;
    var yyyy = new Date(
      event.target.value,
      this.state.month - 1,
      1
    ).getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd1 = new Date(event.target.value, this.state.month, 0).getDate();
    var mm1 = new Date(event.target.value, this.state.month, 0).getMonth() + 1;
    var yyyy1 = new Date(event.target.value, this.state.month, 0).getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };
  onChangeYear = (event) => {
    this.setState({
      year: event.target.value,
    });
    var dd = new Date(event.target.value, 0, 1).getDate();
    var mm = new Date(event.target.value, 0, 1).getMonth() + 1;
    var yyyy = new Date(event.target.value, 0, 1).getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    var dd1 = new Date(event.target.value, 12, 0).getDate();
    var mm1 = new Date(event.target.value, 12, 0).getMonth() + 1;
    var yyyy1 = new Date(event.target.value, 12, 0).getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm1 < 10) {
      mm1 = "0" + mm1;
    }
    this.refreshList(dd, mm, yyyy, dd1, mm1, yyyy1);
  };

  render() {
    const {
      checked,
      isLoading,
      filterKey,
      totalServiceArr,
      idServiceArr,
      countServiceArr,
      nameServiceArr,
      moneyServiceArr,
      voucherArr,
      byType,
    } = this.state;
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Thống kê doanh thu</h1>
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
                      <h3 className="card-title">Thống kê doanh thu</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Thống kê theo</FormLabel>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue={this.state.checked}
                        >
                          <FormControlLabel
                            value="month"
                            control={<Radio color="primary" />}
                            label="Tháng"
                            onChange={this.updateChecked}
                          />
                          <FormControlLabel
                            value="year"
                            control={<Radio color="primary" />}
                            onChange={this.updateChecked}
                            label="Năm"
                          />
                          <FormControlLabel
                            value="monthyear"
                            control={<Radio color="primary" />}
                            onChange={this.updateChecked}
                            label="Tháng,Năm"
                          />
                        </RadioGroup>
                      </FormControl>

                      <div className="row">
                        <div className="col-sm-2">
                          <div className="form-group">
                            <label>Loại dịch vụ</label>
                            <select
                              className="custom-select"
                              onChange={this.onChangeFilter}
                            >
                              <option value="all">Tất cả</option>
                              <option value="combo">Combo</option>
                              <option value="cat">Cắt tóc</option>
                              <option value="uon">Uốn tóc</option>
                              <option value="nhuom">Nhuộm tóc</option>
                            </select>
                          </div>
                        </div>
                        {checked == "month" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label>Tháng</label>
                              <select
                                className="custom-select"
                                onChange={this.onChangeMonth}
                                value={this.state.month}
                              >
                                <option value="1">Tháng 1</option>
                                <option value="2">Tháng 2</option>
                                <option value="3">Tháng 3</option>
                                <option value="4">Tháng 4</option>
                                <option value="5">Tháng 5</option>
                                <option value="6">Tháng 6</option>
                                <option value="7">Tháng 7</option>
                                <option value="8">Tháng 8</option>
                                <option value="9">Tháng 9</option>
                                <option value="10">Tháng 10</option>
                                <option value="11">Tháng 11</option>
                                <option value="12">Tháng 12</option>
                              </select>
                            </div>
                          </div>
                        ) : null}

                        {checked == "year" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label>Năm</label>
                              <select
                                className="custom-select"
                                onChange={this.onChangeYear}
                                value={this.state.year}
                              >
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {checked == "monthyear" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label>Tháng</label>
                              <select
                                className="custom-select"
                                onChange={this.onChangeMonth}
                                value={this.state.month}
                              >
                                <option value="1">Tháng 1</option>
                                <option value="2">Tháng 2</option>
                                <option value="3">Tháng 3</option>
                                <option value="4">Tháng 4</option>
                                <option value="5">Tháng 5</option>
                                <option value="6">Tháng 6</option>
                                <option value="7">Tháng 7</option>
                                <option value="8">Tháng 8</option>
                                <option value="9">Tháng 9</option>
                                <option value="10">Tháng 10</option>
                                <option value="11">Tháng 11</option>
                                <option value="12">Tháng 12</option>
                              </select>
                            </div>
                          </div>
                        ) : null}
                        {checked == "monthyear" ? (
                          <div className="col-sm-2">
                            <div className="form-group">
                              <label>Năm</label>
                              <select
                                className="custom-select"
                                onChange={this.onChangeYear2}
                                value={this.state.year}
                              >
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                              </select>
                            </div>
                          </div>
                        ) : null}
                      </div>
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
                              <th>Tên dịch vụ</th>
                              <th>Số lượng đặt hàng </th>
                              <th>Giá mỗi lượt</th>
                              <th>Tổng tiền khuyến mại</th>
                              <th>Tổng tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {idServiceArr.map((item, index) => (
                              <tr>
                                <th>{nameServiceArr[index]}</th>
                                <th>{countServiceArr[index]}</th>
                                <th>{moneyServiceArr[index]}</th>
                                <th>{voucherArr[index]}</th>
                                <th>{totalServiceArr[index]}</th>
                              </tr>
                            ))}
                          </tbody>
                          <tbody></tbody>
                        </table>
                      )}
                    </div>
                  </div>
                  {
                  filterKey=="all"?(
                  checked=="monthyear"?
                  (isLoading ? (
                    <SkeletonLoader style={{ width: "100%", height: 700 }} />
                  ) : (
                    <div className="card customChart">
                      <Bar
                        data={{
                          labels: [
                            "Tất Cả",
                            "Combo",
                            "Cắt Tóc",
                            "Uốn Tóc",
                            "Nhuộm Tóc",
                          ],
                          datasets: [
                            {
                              label: "Lượt Khách",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                              ],
                              data: [byType[0]+byType[1]+byType[2]+byType[3], byType[0], byType[1], byType[2], byType[3]],
                            },
                          ],
                        }}
                        options={{
                          legend: { display: false },
                          title: {
                            display: true,
                            text:
                              "Bảng thống kê lượt khách theo loại dịch vụ của " +
                              this.state.month +
                              "-" +
                              this.state.year,
                          },
                        }}
                      />
                    </div>
                  )):null):null}
                  {
                  filterKey=="all"?(
                  checked=="month"?
                  (isLoading ? (
                    <SkeletonLoader style={{ width: "100%", height: 700 }} />
                  ) : (
                    <div className="card customChart">
                      <Bar
                        data={{
                          labels: [
                            "Tất Cả",
                            "Combo",
                            "Cắt Tóc",
                            "Uốn Tóc",
                            "Nhuộm Tóc",
                          ],
                          datasets: [
                            {
                              label: "Lượt Khách",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                              ],
                              data: [byType[0]+byType[1]+byType[2]+byType[3], byType[0], byType[1], byType[2], byType[3]],
                            },
                          ],
                        }}
                        options={{
                          legend: { display: false },
                          title: {
                            display: true,
                            text:
                              "Bảng thống kê lượt khách theo loại dịch vụ của " +
                              this.state.month +
                              "-" +
                              this.state.year,
                          },
                        }}
                      />
                    </div>
                  )):null):null}
                   {
                  filterKey=="all"?(
                  checked=="year"?
                  (isLoading ? (
                    <SkeletonLoader style={{ width: "100%", height: 700 }} />
                  ) : (
                    <div className="card customChart">
                      <Bar
                        data={{
                          labels: [
                            "Tất Cả",
                            "Combo",
                            "Cắt Tóc",
                            "Uốn Tóc",
                            "Nhuộm Tóc",
                          ],
                          datasets: [
                            {
                              label: "Lượt Khách",
                              backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                              ],
                              data: [byType[0]+byType[1]+byType[2]+byType[3], byType[0], byType[1], byType[2], byType[3]],
                            },
                          ],
                        }}
                        options={{
                          legend: { display: false },
                          title: {
                            display: true,
                            text:
                              "Bảng thống kê lượt khách theo loại dịch vụ của năm " +this.state.year,
                          },
                        }}
                      />
                    </div>
                  )):null):null}
                  
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

export default ThongKe;
