import React, { Component } from 'react';
import { connect } from "react-redux";
import { checkPassword, checkPasswordReset, editEmail, editEmailReset, setLoggedInfo, memInfoChangeReset } from "actions";
import { AuthButton } from '.';
import PasswordWithLabel from './PasswordWithLabel';
import InputWithLabel from './InputWithLabel';
import { isEmail } from "validator";
import storage from 'lib/storage';
import history from '../../history';

class EditEmailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pw: '',
      email: this.props.mem_info.mem_email
    }

    this.checkPassWord = this.checkPassWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.editEmail = this.editEmail.bind(this);
  }
  componentDidMount(){
    document.getElementById("pw").focus();
    this.props.close();
  }
  componentWillUnmount(){
    this.props.checkPasswordReset();
    this.props.editEmailReset();
  }
  keyDown(e) {
    if (e.keyCode === 13) {
      if(e.target.name === 'email') this.editEmail();
      else this.checkPassWord();
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        this.setState({
          email: value
        })
        break;
      case 'pw':
        this.setState({
          pw: value
        })
        break;
    }
  }
  editEmail() {
    if (!this.state.email) {
      document.getElementById("email_msg").value = '이메일을 입력해주세요.';
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }

    if (!isEmail(this.state.email)) {
      document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }

    document.getElementById("email_msg").classList.remove("error");
    this.props.editEmailReset();
    if(this.state.email !== this.props.mem_info.mem_email) this.props.editEmail(this.props.mem_info.mem_id, this.state.email)
  }
  checkPassWord() {
    if (!document.getElementById("pw").value) {
      document.getElementById("pw_msg").value = '패스워드를 입력해주세요.';
      document.getElementById("pw_msg").classList.add("error");
      document.getElementById("pw").focus();
      return;
    }
    else {
      document.getElementById("pw_msg").classList.remove("error");
      this.props.checkPassword(this.props.mem_info.mem_id, document.getElementById("pw").value);
    }
  }
  setContent() {
    let content;

    if (this.props.check_password === true) {
      content = <div>
        <InputWithLabel label="이메일" id="email" name="email" value={this.state.email} onChange={this.handleChange} onKeyDown={this.keyDown}/>
        <AuthButton onClick={this.editEmail}> 이메일 변경 </AuthButton>
      </div>
    }
    else {
      content = <div>
        <PasswordWithLabel label="패스워드" id="pw" name="pw" onKeyDown={this.keyDown}/>
        <AuthButton onClick={this.checkPassWord}> 확인 </AuthButton>
      </div>
    }

    return content;
  }
  render() {
    if (this.props.mem_info_change) {
      const loggedInfo = this.props.mem_info_change;
      storage.set('loggedInfo', loggedInfo);
      this.props.setLoggedInfo(loggedInfo);

      this.props.memInfoChangeReset();
      alert(`이메일 변경이 완료되었습니다.`)
      history.push("/")
    }

    if(document.getElementById("pw")){
      document.getElementById("pw").focus();
      if(this.props.check_password === false){
        document.getElementById("pw_msg").value = "비밀번호가 다릅니다.";
        document.getElementById("pw_msg").classList.add("error");
        document.getElementById("pw").focus();
      }
      else{
        document.getElementById("pw_msg").classList.remove("error");
      }
    }
    else if(document.getElementById("email")){
      document.getElementById("email").focus();
      if(this.props.edit_email === false){
        document.getElementById("email_msg").value = "다른 사용자가 사용중인 이메일입니다.";
        document.getElementById("email_msg").classList.add("error");
        document.getElementById("email").focus();
      }
      else{
        document.getElementById("email_msg").classList.remove("error");
      }
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', minWidth: 500 }}>
          {this.setContent()}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    mem_info_change: state.members.mem_info_change,
    check_password: state.members.check_password,
    edit_email: state.members.edit_email
  };
};

export default connect(mapStatetoProps, { checkPassword, checkPasswordReset, editEmail, editEmailReset, setLoggedInfo, memInfoChangeReset })(EditEmailPage);
