import React, { Component } from "react";
import "./pageNotFound.css"
export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h3>Trang không tìm thấy trang này</h3>
              <h1>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
            </div>
            <h2>Xin lỗi, đường dẫn không tồn tại</h2>
          </div>
        </div>
      </div>
    );
  }
}
