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
      tag: "",
      title: "",
      content: "",
      description: "",
      linkEdit: "",
      idEdit: "",
      imagePreviews: [],
    };
  }

  componentDidMount() {
    this.setState({
      idEdit: this.props.idEdit,
      typeEdit:this.props.typeEdit,
      imagePreviews: [this.props.imageEdit],
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let token = JSON.parse(localStorage.getItem("data")).token;
    fetch(
      "http://127.0.0.1:9091/api/v1/service/" +
        token +
        "/update/" +
        this.props.idEdit,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: event.target.price.value,
          name: event.target.name.value,
          description: event.target.description.value,
          image: this.state.imagePreviews[0],
          type: this.state.typeEdit,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        alert(JSON.stringify(result.status));
        this.props.refreshList();
        this.props.onHide();
      });
  };
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
          <Form.Group controlId="price">
            <Form.Control
              type="text"
              placeholder="Nhập Giá"
              required
              onChange={(e) => this.setState({ price: e.target.value })}
              defaultValue={this.props.priceEdit}
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
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="Tên Dịch Vụ"
              required
              onChange={(e) => this.setState({ name: e.target.value })}
              defaultValue={this.props.nameEdit}
            />
          </Form.Group>

          <Form.Group controlID="type">
            <Form.Label>Kiểu Dịch Vụ</Form.Label>
            <Form.Control
              as="select"
              name="type"
              onChange={(e) => this.setState({ typeEdit: e.target.value })}
              defaultValue={this.props.typeEdit}
              required
            >
              {/* "combo","cat","uon","nhuom" */}
              <option value="combo">Combo</option>
              <option value="cat">Cắt Tóc</option>
              <option value="uon">Uốn Tóc</option>
              <option value="nhuom">Nhuộm Tóc</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Control
              type="text"
              name="description"
              onChange={(e) => this.setState({ description: e.target.value })}
              placeholder="Nhập Mô Tả"
              defaultValue={this.props.descriptionEdit}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <br />
          <br />
          <br />
          <Form.Group>
            <Button variant="primary" type="submit">
              Cập Nhật
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default ReviewForm;
