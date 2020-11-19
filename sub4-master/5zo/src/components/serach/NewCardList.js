import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Card from './안쓰는거_킵/Card';

class NewCardList extends Component {
  render(){
      return (
        <div>
          <ExpansionPanel >
            <ExpansionPanelSummary style={{background : '#94C9A9'}}>
              <Typography>Collapsible Group Item #1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                {this.props.cardLists.map(card => <Card card = {card}/>)}

                </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
  }
}

export default NewCardList