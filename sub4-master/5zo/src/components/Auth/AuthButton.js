import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import storage from '../../lib/storage'

const useStyles = makeStyles(() => ({
  button: {
    color : 'white',
    textAlign : 'center',
    fontSize : '1.25rem',
    fontWeight : '500',
    width: '100%',
    '& + &': {
      marginTop: '1rem'
    },
    '&:focus' : {
      
    }
  }
}))

function AuthButton({ children, onClick, onSubmit, type, backgroundColor }){
  const classes = useStyles();
  return(
    <Button variant="contained" style={{background : backgroundColor ? backgroundColor : storage.get('loggedInfo') ? storage.get('loggedInfo').mem_color : '#0C797D'}} onClick={onClick} className={classes.button}>
      {children}
    </Button>
  );
}

export default AuthButton;
