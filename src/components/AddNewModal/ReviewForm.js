import React from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import update from "immutability-helper";
import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "./ImageResize";
import { Video } from "./quill-video-resize";
import "react-quill/dist/quill.snow.css";
import "./index.css";

Quill.register("modules/imageResize", ImageResize);
Quill.register({ "formats/video": Video });

const imageMaxSize = 1000000000; //bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes
  .split(",")
  .map((item) => item.trim());

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      tag:"",
      title:"",
      content:"",
      description:"",
      imagePreviews: [],
    };
  }

  componentDidMount() {
    this.attachQuillRefs(true);
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = (onMount) => {
    if (typeof this.reactQuill.getEditor !== "function") return;
    this.quill = this.reactQuill.getEditor();
    this.quill.root.addEventListener("click", this.handleClick, false);
    this.quill.root.quill = this.quill;
  };

  removeVietnameseFromString(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.toLowerCase();
    str = str
      .replace(/[&]/g, "-and-")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/[-]+/g, "-")
      .replace(/-$/, "");
    return str;
  }

  handleSubmit = (event) => {
        event.preventDefault();

      let token = JSON.parse(localStorage.getItem("data")).token

      fetch('http://127.0.0.1:9091/api/v1/post/'+token,{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(

              {

                  title:this.state.title,
                  tag:this.state.tag,
                  description:this.state.description,
                  thumbnail:this.state.imagePreviews[0],
                  content:this.state.content,
                  link:"/baiviet/"+this.removeVietnameseFromString(this.state.title)
                 
              
              }
          )
      })
      .then(res=> res.json())
      .then((result)=>
      {
          alert(JSON.stringify(result.status));
          this.props.toRefesh()
          this.props.onHide()
          
      },)
  }
  handleChange = (value) => {
    this.setState({
      content: value,
    });
  };

  verifyFiles = (files) => {
    if (files && files.length > 0) {
      let currentFile = files[0];
      let currentFileType = currentFile.type;
      let currentFileSize = currentFile.size;

      if (currentFileSize > imageMaxSize) {
        return false;
      }

      if (!acceptedFileTypesArray.includes(currentFileType)) {
        return false;
      }
    }
    return true;
  };

  onFileDropped = (acceptedFiles, rejectedFiles) => {
    let files = this.state.uploadedFiles;
    let filesPreview = this.state.imagePreviews;
    if (this.verifyFiles(acceptedFiles)) {
      files.push(acceptedFiles[0]);

      let currentFile = acceptedFiles[0];
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        filesPreview.push(reader.result);
        this.setState({
          imagePreviews: filesPreview,
        });
      });
      reader.readAsDataURL(currentFile);

      this.setState({
        uploadedFiles: files || null,
      });
    }
  };

  handleRemove = (index) => {
    let listPreviews = update(this.state.imagePreviews, {});
    let listUpload = update(this.state.uploadedFiles, {});
    if (listPreviews.length > 0 && listUpload.length > 0) {
      listPreviews.splice(index, 1);
      listUpload.splice(index, 1);
      this.setState({
        imagePreviews: listPreviews,
        uploadedFiles: listUpload,
      });
    }
  };

  renderDropZone(fileName) {
    return (
      <Dropzone
        onDrop={this.onFileDropped}
        id="dropzone-upload-component"
        accept={acceptedFileTypes}
        multiple={false}
      >
        <div>{fileName}</div>
      </Dropzone>
    );
  }

  render() {
    let fileName = "Upload Thumbnail";
    const modulesQill = {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: false,
      },
      imageResize: {
        displayStyles: {
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ];
    let imagePreviews = this.state.imagePreviews;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
            <Form.Control
              type="text"
              placeholder="Enter Title "
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="tag">
            <Form.Control
              type="text"
              placeholder="Enter Tag "
              onChange={(e) => this.setState({ tag: e.target.value })}

            />
          </Form.Group>
          <Form.Group controlId="upload-image">
            {this.renderDropZone(fileName)}
            <Container>
              <Row>
                {imagePreviews.length > 0
                  ? imagePreviews.map((imgSrc, index) => {
                      return (
                        <div key={index} className="img-inline">
                          <img src={imgSrc} className="img-preview" />
                          <i onClick={() => this.handleRemove(index)}>✘</i>
                        </div>
                      );
                    })
                  : ""}
              </Row>
            </Container>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Control
              type="text"
              name="description"
              onChange={(e) => this.setState({ description: e.target.value })}
              placeholder="Enter Description"
              // onChange={this.handleInput}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group controlId="editor">
            <ReactQuill
              value={this.state.content}
              onChange={this.handleChange}
              modules={modulesQill}
              formats={formats}
              theme={"snow"}
              placeholder={"Enter new content here..."}
              ref={(el) => {
                this.reactQuill = el;
              }}
              style={{ height: "300px" }}
            />
          </Form.Group>
          <br/>
          <br/>
          <br/>

          <Form.Group>
          <Button variant="primary" type="submit">
              Thêm
            </Button>
            </Form.Group>
        </Form>
       
      </div>
    );
  }
}

export default ReviewForm;
