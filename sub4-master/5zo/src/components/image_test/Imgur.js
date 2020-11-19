import React from "react";
import dotenv from "dotenv";

import "suneditor/dist/css/suneditor.min.css";
import suneditor from "suneditor";
import plugins from "suneditor/src/plugins";
import lang from "suneditor/src/lang";

import "./Imgur.css";

dotenv.config();

class Imgur extends React.Component {
  componentDidMount() {
    const editor = suneditor.create("sample", {
      plugins: plugins,
      height: 400,
      buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["paragraphStyle"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor", "textStyle"],
        ["removeFormat"],
        "/", // Line break
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        ["table", "link", "image", "video"],
        ["fullScreen", "showBlocks", "codeView"],
        ["preview", "print"],
        ["save", "template"]
      ],
      lang: lang.ko
    });

    editor.onChange = function(contents) {};

    var that = this;

    editor.onImageUpload = function(
      targetImgElement,
      index,
      state,
      imageInfo,
      remainingFilesCount
    ) {
      if (state === "create") {
        that.uploadImage(imageInfo.src.split("base64,")[1], function(
          imgur_src
        ) {
          targetImgElement.src = imgur_src;
        });
      }
    };

    editor.onImageUploadError = function(errorMessage, result) {};
  }
  constructor(props) {
    super(props);

    this.state = {
      editor: null
    };

    this.uploadImage = this.uploadImage.bind(this);
  }
  uploadImage(data, callback) {
    const r = new XMLHttpRequest();
    var u;

    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader(
      "Authorization",
      `Client-ID ${process.env.REACT_APP_CLIENT_ID}`
    );
    r.onreadystatechange = function() {
      if (r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText);
        u = `https://i.imgur.com/${res.data.id}.png`;

        callback.apply(this, [u]);
      }
    };
    r.send(data);
  }
  render() {
    return (
      <div>
        <div className="image"></div>
        <form>
          <input
            type="file"
            className="input-image"
            onChange={this.uploadImage}
          />
        </form>
        <textarea id="sample"></textarea>
        <textarea id="example"></textarea>
      </div>
    );
  }
}

export default Imgur;
