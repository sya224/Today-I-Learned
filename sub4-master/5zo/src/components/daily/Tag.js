import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import history from '../../history'
const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(0.5),
    cursor : "pointer"
  }
}));

const Tag = props => {
  const classes = useStyles();
  const label = `#${props.name}`
  return (
    <Chip className={classes.chip} variant="outlined" color="primary" label={label} 
      onClick={function(){
        history.push(`/search?tag=${label.replace('#','')}`)
      }}
    />
  );
};

export default Tag;