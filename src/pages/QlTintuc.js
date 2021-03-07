import React, { Component } from "react";
import axios from "axios";
import SkeletonLoader from "tiny-skeleton-loader-react";
import AddNewModal from '../components/AddNewModal/AddNewModal';
import EditNewModal from '../components/EditNewModal/EditNewModal';
import { Link } from "react-router-dom";
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export default class QlTintuc extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], isLoading: true,addModalShow : false, editModalShow : false };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList=()=> {
    this.setState({ isLoading: true })
    axios
      .get(
        "http://127.0.0.1:9091/api/v1/post"
      )
      .then((res) => this.setState({ news: res.data, isLoading: false }))
      .catch(function (error) {
        alert(error.message);
      });
  }
  deleteBlog=(id)=>{
    let token = JSON.parse(localStorage.getItem("data")).token

    this.setState({ isLoading: true })
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "__cfduid=da615458fc4e1c5298a7af3e001f850441605104174");
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:9091/api/v1/post/delete/"+id+"/"+token, requestOptions)
      .then(response => response.json())
      .then(result => alert(result.status))
      .then(this.refreshList)
      .catch(error => console.log('error', error));
  
  }
  render() {
    const {isLoading,news ,idModal,titleModal,tagModal,descriptionModal,thumbnailModal,linkModal,contentModal} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});

    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Quản lý tin tức</h1>
                </div>
            
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Danh sách tin tức </h3>
                      <div class="float-right">
                        {" "}
                        <button type="button" onClick={()=> this.setState({addModalShow: true})} class="btn btn-danger">
                          {" "}
                          <a class="text-light">
                            Thêm tin tức
                          </a>
                        </button>
                        <AddNewModal
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            refreshList= {this.refreshList}

                            />
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    {isLoading ? <SkeletonLoader style={{ width: "100%", height: 700 }} /> :  <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Tag</th>
                            <th>Description</th>
                            <th>Thumbnail</th>
                            {/* <th>Content</th> */}
                            <th>Link</th>
                            <th>Create By</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>

                        <tbody>
                        {news.map((item) => (
                            <tr key={item.blogID}>
                              <td>{item.blogID}</td>
                              <td>{item.title}</td>
                              <td>{item.tag}</td>
                              <td>{item.description}</td>
                              <td> <img style={{ width: "360px", height: "180px" }} src={item.thumbnail} /></td>
                              {/* <td>{item.content}</td> */}
                              <td>{item.link}</td>
                              <td>{item.by}</td>
                              <td>
                                <Link 
                                onClick={()=> this.setState({editModalShow:true, idModal:item.blogID,titleModal:item.title,contentModal:item.content, tagModal:item.tag, descriptionModal:item.description,thumbnailModal:item.thumbnail,linkModal:item.link})}
                                > 
                                 <i className="fas fa-edit"> </i>
                                
                                 </Link>
                                 
                            
                              </td>
                            
                              <td>
                                <Link 
                                onClick={()=> this.deleteBlog(item.blogID)} 
                                >
                                  <i className="fas fa-trash-alt"  />
                                </Link>
                              </td>
                              <EditNewModal style={{diskplay: "none"}}
                            show = {this.state.editModalShow}
                            onHide={editModalClose}
                            idEdit = {idModal}
                            titleEdit = {titleModal}
                            tagEdit = {tagModal}
                            contentEdit={contentModal}
                            descriptionEdit = {descriptionModal}
                            thumbnailEdit={thumbnailModal}
                            linkEdit={linkModal}
                            refreshList= {this.refreshList}
                            />
                            </tr>
                            
                          ))}
                        </tbody>
                       
                      </table>
                      
                      }
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                  {/* /.card */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
        <Footer/>

      </div>
    );
  }
}
