import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';
import oc from 'open-color';
import Avatar from '@material-ui/core/Avatar';
import { } from "actions";
import {TextWithLabel} from '../Auth'
import apis from '../../apis/apis'
const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left;
`;

class MemberCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.member ? (props.member.mem_auth === 1 ? false : true ) : false
    }
  }
  handleChange = async e => {
    this.setState({
      checked: e.target.checked
    })
    this.props.member.mem_auth = e.target.checked ? 2 : 1 // checked : 벤

    let response = await apis.get(`/member/auth/${this.props.member ? this.props.member.mem_id : ''}`)
    if(response.data.data === this.props.member_mem_auth){
      // 가만히
    }else{
      response = await apis.patch(`/member/auth/${this.props.member ? this.props.member.mem_id : ''}`)
    }

    // this.props.editPostAuth(this.props.member.mem_id, e.target.checked)
  }
  render() {
    if(this.props.member_){
      this.props.memberUpdate(this.props.member_)
      this.props.memberReset()
    }
    const member = (this.props.member)
    if(member){
      return (
        <ExpansionPanel style={{width : 600, marginBottom : 5}} >
          <ExpansionPanelSummary>
            <Avatar component={'span'} style={{marginRight : 10}} alt="Remy Sharp" src={member.mem_thumb} />
            <Typography style={{fontSize:25}}> {member.mem_id}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display : 'inline-block' , width : '100%'}}>
            <div>
              <div id="image_div">
                <img id="profile_image" src={member.mem_thumb} key={new Date().getTime()} style={{ borderRadius: '50%' }} alt="profile_image"></img>
              </div>
              <TextWithLabel label="아이디" name="ID" value={member.mem_id} />
              <TextWithLabel label="이메일" name="email" value={member.mem_email} type="email" />
              <TextWithLabel label="닉네임" name="nick" value={member.mem_nick} />
              <TextWithLabel label="소개글" name="intro" value={member.mem_self_intro} />
              {this.state.checked ?
                <Label> 글 권한 X </Label>
                :
                <Label> 글 권한 O </Label>
              }
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
  }
}
const mapStatetoProps = state => {
  return {
    member_ : state.members.member
  };
}

export default connect(mapStatetoProps, {})(MemberCard)