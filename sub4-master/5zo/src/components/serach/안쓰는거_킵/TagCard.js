import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const CardCard = ({tag}) => {
    const classes = useStyles();
    
    return (
        <div>
          <Card className={classes.card} style={{maxWidth : 500}} >
              <CardContent>
                  <Typography variant="h4" component="h1" style={{textAlign:"center"}}>
                      {'#' + tag.tag_name}
                  </Typography>
              </CardContent>
          </Card>
          <br/>
        </div>
    )
}

export default CardCard