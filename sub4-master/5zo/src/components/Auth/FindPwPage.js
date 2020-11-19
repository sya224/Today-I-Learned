import React, { Component } from 'react';
import { connect } from "react-redux";
import { matchIdEmail, matchIdEmailSuccessReset, findPwFailReset, findPwSuccessReset, findPw } from "actions";
import { InputWithLabel, AuthButton } from '.';
import history from '../../history'
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { isEmail } from "validator";


const styles = theme => ({
    paper: {
      position: 'absolute',
      padding : 40,
      top: '50%',
      left: '50%',
      width : '25%',
      minWidth : 400,
      transform: 'translate(-50%, -50%)'
    }
  });
  


class FindPwPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          mem_id: '',
            email: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.check = this.check.bind(this)
    }
    componentDidMount(){
      document.getElementById("mem_id").focus();
    }
    handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'mem_id':
                this.setState({
                    mem_id: value
                })
                break;
            case 'email':
                this.setState({
                    email: value
                })
                break;
        }
    }
    check() {
        this.props.findPwFailReset()
        this.props.matchIdEmailSuccessReset()
        
        if (!this.state.mem_id.value) {
            document.getElementById("mem_id_msg").value = '아이디를 입력해주세요.';
            document.getElementById("mem_id_msg").classList.add("error");
        }
        if (!this.state.email) {
          document.getElementById("email_msg").value = '이메일을 입력해주세요.';
          document.getElementById("mem_id_msg").classList.remove("error");
          document.getElementById("email_msg").classList.add("error");
          document.getElementById("email").focus();
          return;
        }
    
        if (!isEmail(this.state.email)) {
          document.getElementById("email_msg").value = '잘못된 이메일 형식입니다.';
          document.getElementById("mem_id_msg").classList.remove("error");
          document.getElementById("email_msg").classList.add("error");
          document.getElementById("email").focus();
          return;
        }
        document.getElementById("email_msg").classList.remove("error");
        this.props.matchIdEmail(this.state.mem_id, this.state.email)
    }
    cancel = () => {
        history.push("/login")
    }
    render() {
        if (this.props.match_id_email_success) {
            this.props.findPwFailReset()
            this.props.matchIdEmailSuccessReset()
            alert(`입력하신 ${this.state.email} 로 임시 비밀번호를 전송하였습니다.`)
            history.push("/login")
            this.props.findPw(this.state.mem_id, this.state.email)
        }

        if (this.props.find_pw_success) {
            this.props.findPwSuccessReset()
            this.props.findPwFailReset()
        }
        const {classes} = this.props;
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-block', width: 500 }}>
                    <Paper className={classes.paper}>
                            <InputWithLabel label="아이디" id="mem_id" name="mem_id" placeholder={"아이디를 입력하세요"} value={this.state.mem_id} onChange={this.handleChange} />
                            <InputWithLabel label="이메일" id="email" name="email" type="email" placeholder={"이메일을 입력하세요"} value={this.state.email} onChange={this.handleChange} />
                            <input type="text" className={this.props.find_pw_fail ? "error" : "none"} readOnly value={this.props.find_pw_fail} />
                            <AuthButton onClick={this.check}> 비밀번호 찾기 </AuthButton>
                            <AuthButton onClick={this.cancel}> 취소 </AuthButton>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        find_pw_fail: state.members.find_pw_fail,
        find_pw_success: state.members.find_pw_success,
        match_id_email_fail: state.members.match_id_email_fail,
        match_id_email_success: state.members.match_id_email_success
    };
};

export default withStyles(styles, {withTheme : true})(connect(mapStatetoProps, { findPw, findPwFailReset, findPwSuccessReset, matchIdEmail, matchIdEmailSuccessReset })(FindPwPage));
