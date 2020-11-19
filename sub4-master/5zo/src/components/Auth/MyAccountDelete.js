import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteAccountErrReset, deleteAccount, logout, deleteAccountSuccessReset } from "actions";
import { AuthWrapper, AuthContent, PasswordWithLabel, AuthButton } from '.';
import storage from 'lib/storage';
import history from '../../history'
class MyAccountDelete extends Component {
    componentDidMount() {
        this.props.deleteAccountErrReset();
        this.props.deleteAccountSuccessReset()
    }
    constructor(props) {
        super(props);

        this.state = {
            loginPw: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'loginPw':
                this.setState({
                    loginPw: value
                })
                break;
        }
    }
    deleteAccount() {
        if (!document.getElementById("loginPw").value) {
            document.getElementById("loginPw").focus();
            return;
        }

        this.props.deleteAccount(this.props.mem_info.mem_id, this.state.loginPw)

    }
    cancel = () => {
        history.push("/mypage")
    }
    render() {
        if (this.props.delete_account_success) {
            storage.remove('loggedInfo');
            this.props.logout();
            this.props.deleteAccountSuccessReset()
            this.props.deleteAccountErrReset()
            alert('왜탈퇴하뮤ㅠㅠㅠㅠㅠ')
            history.push("/")
        }

        return (

            <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: 500 }}>
                    <AuthWrapper>
                        <AuthContent title="회원 탈퇴">
                            <PasswordWithLabel label="비밀번호" id="loginPw" name="loginPw" placeholder={"탈퇴하려면 현재 비밀번호를 입력하세요"} value={this.state.loginPw} onChange={this.handleChange} />
                            {this.props.delete_account_err}
                            <AuthButton onClick={this.deleteAccount}> 탈퇴 </AuthButton>
                            <AuthButton onClick={this.cancel}> 취소 </AuthButton>
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
        delete_account_err: state.members.delete_account_err,
        delete_account_success: state.members.delete_account_success,
    };
};

export default connect(mapStatetoProps, { deleteAccountErrReset, deleteAccount, deleteAccountSuccessReset, logout })(MyAccountDelete);