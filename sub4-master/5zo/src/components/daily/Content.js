import React from "react";
import suneditor from 'suneditor'
import lang from 'suneditor/src/lang'
import { connect } from "react-redux";
import "./content.css"

class Content extends React.Component{
  componentDidMount(){
    const editor = suneditor.create(`${this.props.card_id}`,  {
      lang: lang.ko,
      mode: 'inline',
      height: 'auto'
    });

    editor.disabled()

    if(this.props.cards[this.props.card_id].card_contents){
      editor.setContents(this.props.cards[this.props.card_id].card_contents)
    }
    else{
      document.getElementById("suneditor_" + this.props.card_id).style.display = 'none';
    }
  }

  render(){
    return(
      <textarea id={this.props.card_id}></textarea>
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

export default connect(mapStateToProps)(Content);