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
const ListCard = ({list}) => {
    const classes = useStyles();
    
    return (
        <div>
          <Card className={classes.card} style={{backgroundColor : "#94C9A9", maxWidth : 500}}>
              <CardContent>
                  <Typography variant="h4" component="h1" style={{textAlign:"center", color:"white"}} >
                      {list.cardlist_name}
                  </Typography>
                  <br/>
                  <Typography className={classes.pos} color="textSecondary" style={{textAlign:"right", color:"white"}}>
                      {/* {list.tags.map(tag => <a>{'#'+tag.name+' '}</a>)} */}
                  </Typography>
              </CardContent>
          </Card>
          <br/>
        </div>
    )
}

export default ListCard