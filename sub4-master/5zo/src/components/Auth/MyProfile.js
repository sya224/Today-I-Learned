import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editMyinfoErrReset,
  memInfoChangeReset,
  editMyProfile,
  setLoggedInfo
} from "actions";
import { InputWithLabel, AuthButton, ColorPicker } from ".";
import storage from "lib/storage";
import history from "../../history";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import oc from "open-color";
import { withStyles } from "@material-ui/core/styles";

const Label = styled.div`
  font-size: 1rem;
  color: ${oc.gray[6]};
  margin-bottom: 0.25rem;
  text-align: left;
`;

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: this.props.mem_info.mem_nick,
      intro: this.props.mem_info.mem_self_intro,
      checked: this.props.mem_info.mem_post_def_secret,
      color: this.props.mem_info.mem_color,
      croppedImageUrl: this.props.mem_info.mem_thumb,
      src: null,
      crop: {
        unit: "%",
        width: 70,
        height: 70,
        aspect: 1 / 1
      },
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.editMyinfo = this.editMyinfo.bind(this);
    this.cancelEditMyinfo = this.cancelEditMyinfo.bind(this);
  }
  componentDidMount() {
    this.props.close();
  }
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      // 여기에 다이얼로그 여는거.
      this.handleClickOpen();
      e.target.value = null;
    }
  };
  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL("image/jpeg");
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "nick":
        this.setState({
          nick: value
        });
        break;
      case "intro":
        this.setState({
          intro: value
        });
        break
      default:

    }
  }
  keyDown(e) {
    if (e.keyCode === 13) this.editMyinfo();
  }
  handleChangeChecked(e) {
    this.setState({
      checked: !e.target.checked
    });
  }
  handleChangeColor = color => {
    // document.getElementById('myColor').style.backgroundColor = color.hex
    this.setState({
      color: color.hex
    });
  };
  editMyinfo() {
    if (!this.state.nick) {
      document.getElementById("nick_msg").value = "닉네임을 입력해주세요";
      document.getElementById("nick_msg").classList.add("error");
      document.getElementById("nick").focus();
      return;
    }

    document.getElementById("nick_msg").classList.remove("error");
    this.props.editMyProfile(
      this.props.mem_info.mem_id,
      this.state.nick,
      this.state.intro,
      this.state.checked,
      this.state.color,
      this.state.croppedImageUrl
    );
  }
  cancelEditMyinfo = () => {
    history.push("/mypage");
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  setProfileImg = () => {
    document.getElementById("profile_image").src = this.state.croppedImageUrl;
    this.handleClose();
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  update() {}
  render() {
    const { crop, src } = this.state;

    let UserSwitch = withStyles({
      switchBase: {
        "&$checked": {
          color: storage.get("loggedInfo").mem_color
        },
        "&$checked + $track": {
          backgroundColor: storage.get("loggedInfo").mem_color
        }
      },
      checked: {},
      track: {}
    })(Switch);

    if (this.props.mem_info_change) {
      const loggedInfo = this.props.mem_info_change;
      storage.set("loggedInfo", loggedInfo);
      this.props.setLoggedInfo(loggedInfo);

      this.props.editMyinfoErrReset();
      this.props.memInfoChangeReset();
      this.props.update("profile", this.state.color);

      UserSwitch = withStyles({
        switchBase: {
          "&$checked": {
            color: storage.get("loggedInfo").mem_color
          },
          "&$checked + $track": {
            backgroundColor: storage.get("loggedInfo").mem_color
          }
        },
        checked: {},
        track: {}
      })(Switch);
    }

    let image;
    if (this.props.mem_info.mem_thumb) image = this.props.mem_info.mem_thumb;
    else
      image =
        "https://www.gravatar.com/avatar/bc05615a975020a24c81da899a113e23?d=mm&s=90";
    image = image.replace("blob:", "");

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", width: 500 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <img
                id="profile_image"
                src={image}
                alt="image"
                style={{ width: "90px", height: "90px", borderRadius: "50%" }}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload_btn"
                type="file"
                onChange={this.onSelectFile}
              />
              <label
                htmlFor="upload_btn"
                style={{ position: "relative", top: "-40px", left: "10px" }}
              >
                <Button variant="outlined" component="span">
                  Upload
                </Button>
              </label>
            </div>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={this.state.open}
            >
              <div>
                <IconButton aria-label="clear" onClick={this.handleClose}>
                  <ClearIcon />
                </IconButton>
                <Button
                  color="primary"
                  style={{ float: "right", height: "48px" }}
                  onClick={this.setProfileImg}
                >
                  확인
                </Button>
              </div>
              {src && (
                <ReactCrop
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              )}
            </Dialog>
          </div>
          <InputWithLabel
            label="닉네임"
            id="nick"
            name="nick"
            value={this.state.nick}
            onChange={this.handleChange}
            onKeyDown={this.keyDown}
          />
          <InputWithLabel
            label="소개글"
            name="intro"
            value={this.state.intro}
            onChange={this.handleChange}
            onKeyDown={this.keyDown}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Label> 기본 카드리스트 공개 여부 </Label>
            <Grid
              component="label"
              container
              alignItems="center"
              spacing={1}
              style={{ width: "163px" }}
            >
              <Grid item>비공개</Grid>
              <Grid item>
                <UserSwitch
                  checked={!this.state.checked}
                  onChange={this.handleChangeChecked}
                />
              </Grid>
              <Grid item>공개</Grid>
            </Grid>
          </div>
          <Label>테마 색</Label>
          <ColorPicker
            value={this.state.color}
            handleChangeColor={this.handleChangeColor}
          ></ColorPicker>
          <br />
          <br />
          <AuthButton onClick={this.editMyinfo}> Update My Profile </AuthButton>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    mem_info_change: state.members.mem_info_change,
    edit_myinfo_err: state.members.edit_myinfo_err
  };
};

export default connect(mapStatetoProps, {
  editMyProfile,
  editMyinfoErrReset,
  memInfoChangeReset,
  setLoggedInfo
})(MyProfile);
