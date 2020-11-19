import React, { Component } from 'react';
import { connect } from "react-redux";
import { register, registerReset } from "../../actions";
import { InputWithLabel, AuthButton } from '../Auth';
import PasswordWithLabel from './PasswordWithLabel';
import { isEmail, matches } from "validator";
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import history from '../../history'


const styles = theme => ({
  render: {
    padding : 40,
    width : '100%',
    minWidth : 400,
  },
  regist : {
    position: 'absolute',
    padding : 40,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width : '25%',
    minWidth : 400,
  }

});

class Register extends Component {
  componentDidMount(){
    document.getElementById("loginId").focus();
  }
  constructor(props) {
    super(props);

    this.state = {
      loginId: '',
      loginPw: '',
      email: '',
      nick: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.register = this.register.bind(this)
    this.keyDown = this.keyDown.bind(this)
  }
  handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'loginId':
        this.setState({
          loginId: value
        })
        break;
      case 'loginPw':
        this.setState({
          loginPw: value
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
    }
  }
  register() {
    if (!this.state.loginId) {
      document.getElementById("loginId_msg").value = '아이디를 입력해주세요.';
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!matches(this.state.loginId, /^[a-z0-9_-]{5,20}$/)) {
      document.getElementById("loginId_msg").value = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
      document.getElementById("loginId_msg").classList.add("error");
      document.getElementById("loginId").focus();
      return;
    }

    if (!this.state.loginPw) {
      document.getElementById("loginPw_msg").value = '비밀번호를 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }

    if (!matches(this.state.loginPw, /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/)) {
      document.getElementById("loginPw_msg").value = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.add("error");
      document.getElementById("loginPw").focus();
      return;
    }
  
    if (!this.state.email) {
      document.getElementById("email_msg").value = '이메일을 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
  
    if (!isEmail(this.state.email)) {
      document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.add("error");
      document.getElementById("email").focus();
      return;
    }
  
    if (!this.state.nick) {
      document.getElementById("nick_msg").value = '닉네임을 입력해주세요.';
      document.getElementById("loginId_msg").classList.remove("error");
      document.getElementById("loginPw_msg").classList.remove("error");
      document.getElementById("email_msg").classList.remove("error");
      document.getElementById("nick_msg").classList.add("error");
      document.getElementById("nick").focus();
      return;
    }

    document.getElementById("loginId_msg").classList.remove("error");
    document.getElementById("loginPw_msg").classList.remove("error");
    document.getElementById("email_msg").classList.remove("error");
    document.getElementById("nick_msg").classList.remove("error");

    this.props.register(this.state.loginId, this.state.loginPw, this.state.email, this.state.nick)
  }
  cancelRegister() {
    history.push("/")
  }
  keyDown(e){
    if(e.keyCode === 13) this.register();
    if(e.target.id === "loginPw" && e.keyCode === 9) {
      document.getElementById("email").focus();
      e.preventDefault();
    }
  }
  render() {
    const {classes} = this.props;

    if (this.props.register_id && this.props.register_id !== "") {
      this.props.registerReset();
      alert('회원가입 완료')
      history.push("/login")
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <Paper className={ this.props.regist ? classes.regist : classes.render }>
            <InputWithLabel label="아이디" id="loginId" name="loginId" onChange={this.handleChange} onKeyDown={this.keyDown}/>
            <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" onChange={this.handleChange}  onKeyDown={this.keyDown}/>
            <InputWithLabel label="이메일" id="email" name="email" type="email" onChange={this.handleChange} onKeyDown={this.keyDown}/>
            <InputWithLabel label="닉네임" id="nick" name="nick" onChange={this.handleChange} onKeyDown={this.keyDown}/>
            <input type="text" className={this.props.register_err? "error_" : "none"} readOnly disabled value={this.props.register_err}/>
            <AuthButton onClick={this.register}> 회원가입 </AuthButton>

            {this.props.regist ? <AuthButton onClick={this.cancelRegister}> 취소 </AuthButton> : null }
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    register_id: state.members.register_id,
    register_err: state.members.register_err
  };
};

export default withStyles(styles, { withTheme: true })(connect(mapStatetoProps, { register, registerReset })(Register));