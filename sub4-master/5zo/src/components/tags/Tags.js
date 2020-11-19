import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { fetchStatisticsData } from 'actions';
import MyCloud from "./MyCloud";

class TagPage extends Component {
  componentDidMount(){
    // this.props.memTag(this.props.mem_info.mem_id, '20000101','20200203')
  }
  setCloud(){
    if(this.props.info){
      var tag_data = this.props.info.tag_data;

      return <MyCloud tags={tag_data ? tag_data : []}></MyCloud>
    }
  }
  render(){
    return (
      <>
        <h1> {this.props.mem_info.mem_nick}님의  Tag Cloud</h1>
        {this.setCloud()}
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info: state.members.mem_info,
    info: state.statistics.info
  };
};

export default connect(mapStatetoProps, {fetchStatisticsData} )(TagPage)