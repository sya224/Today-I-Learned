import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';


// 두개가 함께 있을 땐 상단 (그 사이) 에 여백을 준다.
const Wrapper = styled.div`
    & + & {
        margin-tip : 1rem;
    }
    margin-bottom: 15px;
`;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  label: {
    backgroundColor: 'white',
    marginRight: '3px'
  }
}))

function PasswordWithLabel({ id, label, maxLength, ...rest }) {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <Wrapper>
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel htmlFor={id} className={classes.label}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          type={values.showPassword ? 'text' : 'password'}
          inputProps={{maxLength:maxLength}} 
          {...rest}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <input type="text" id={`${rest.name}_msg`} className="none" readOnly disabled />
    </Wrapper>
  )
}
export default PasswordWithLabel;