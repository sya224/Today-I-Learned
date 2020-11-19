import React, { Component } from 'react';
import { connect } from "react-redux";
import { login, loginErrReset, editMyinfo, editMyinfoErrReset, memInfoChangeReset } from "actions";
import { AuthWrapper, AuthContent, InputWithLabel, AuthButton, RightAlignedLink, TextWithLabel } from '.';
import storage from 'lib/storage';
import PasswordWithLabel from './PasswordWithLabel';
import history from '../../history'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class MyPageEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPw: '',
      email: this.props.mem_info ? this.props.mem_info.mem_email : '',
      nick: this.props.mem_info ? this.props.mem_info.mem_nick : '',
      intro : this.props.mem_info ? this.props.mem_info.mem_self_intro : '',
      croppedImageUrl: this.props.mem_info ? this.props.mem_info.mem_thumb : null,
      src: null,
      crop: {
        unit: '%',
        width: 70,
        height: 70,
        aspect: 1 / 1,
      },
      open: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.editMyinfo = this.editMyinfo.bind(this)
    this.cancelEditMyinfo = this.cancelEditMyinfo.bind(this)
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      // 여기에 다이얼로그 여는거.
      this.handleClickOpen()
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

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

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
    return canvas.toDataURL('image/jpeg')
  }

  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'nowPw':
        this.setState({
          nowPw: value
        })
        break;
      case 'email':
        this.setState({
          email: value
        })
        break;
      case 'nick':
        this.setState({
          nick: value
        })
        break;
      case 'intro':
        this.setState({
          intro: value
        })
    }
  }
  editMyinfo() {
    if (!document.getElementById("nowPw").value) {
      document.getElementById("nowPw").focus();

      return;
    }

    this.props.editMyinfo(this.props.mem_info.mem_id, this.state.nowPw, this.state.email, this.state.nick, this.props.mem_info.mem_color, this.state.croppedImageUrl, this.state.intro)
  }
  cancelEditMyinfo = () => {
    history.push("/mypage")
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };
  setProfileImg = () => {
    document.getElementById("profile_image").src = this.state.croppedImageUrl;
    this.handleClose();

  }
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
    const { crop, croppedImageUrl, src } = this.state
    if (this.props.mem_info_change) {
      const loggedInfo = this.props.mem_info_change;
      storage.set('loggedInfo', loggedInfo);

      this.props.editMyinfoErrReset();
      this.props.memInfoChangeReset();
      alert('회원정보 수정 완료')
      history.push("/mypage")
    }

    let image;
    if (this.props.mem_info.mem_thumb) image = this.props.mem_info.mem_thumb;
    else image = "https://www.gravatar.com/avatar/bc05615a975020a24c81da899a113e23?d=mm&s=90"
    image = image.replace("blob:", "");

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: 500 }}>
          <AuthWrapper>
            <AuthContent title="내 정보 수정">
              <div>
                <input accept="image/*" style={{display: 'none'}} id="upload_btn" type="file" onChange={this.onSelectFile}/>
                <label htmlFor="upload_btn">
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </div>
              <Dialog aria-labelledby="simple-dialog-title" open={this.state.open}>
                <div>
                  <IconButton aria-label="clear" onClick={this.handleClose}>
                    <ClearIcon />
                  </IconButton>
                  <Button color="primary" style={{float: 'right', height: '48px'}} onClick={this.setProfileImg}>확인</Button>
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

              <img id="profile_image" src={image} alt="image" style={{ width: '90px', height: '90px', borderRadius: '50%' }} />

              {/* 로그인한 member 의 데이터를 아래 TextWithLabel 들의 value 에 줘야함. */}
              <TextWithLabel label="아이디" name="id" value={this.props.mem_info ? this.props.mem_info.mem_id : ''} />
              <InputWithLabel label="이메일" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
              <InputWithLabel label="닉네임" name="nick" value={this.state.nick} onChange={this.handleChange} />
              <InputWithLabel label="소개글" name="intro" value={this.state.intro} onChange={this.handleChange} />
              <br /><br />
              <PasswordWithLabel label="현재 비밀번호" id="nowPw" name="nowPw" placeholder={"수정하려면 현재 비밀번호를 입력하세요"} value={this.state.nowPw} onChange={this.handleChange} />
              {this.props.edit_myinfo_err}
              <RightAlignedLink to="/mypage/edit-password"> 비밀번호 변경 </RightAlignedLink>
              <AuthButton onClick={this.editMyinfo}> 수정 </AuthButton>
              <AuthButton onClick={this.cancelEditMyinfo}> 취소 </AuthButton>
            </AuthContent>
          </AuthWrapper>
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

export default connect(mapStatetoProps, { editMyinfo, editMyinfoErrReset, memInfoChangeReset })(MyPageEdit);