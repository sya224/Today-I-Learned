import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

// 두개가 함께 있을 땐 상단 (그 사이) 에 여백을 준다.
const Wrapper = styled.div`
    & + & {
        margin-tip : 1rem;
    }
    margin-bottom: 15px;
`;

const useStyles = makeStyles(() => ({
  textField: {
    width : '100%'
  }
}))

function InputWithLabel({ id, label, maxLength, ...rest }) {
  const classes = useStyles();

  return (
    <Wrapper>
      <TextField id={id} label={label} variant="outlined" className={classes.textField} inputProps={{maxLength:maxLength}} {...rest} />
      <input type="text" id={`${rest.name}_msg`} className="none" readOnly disabled />
    </Wrapper>
  );
}

export default InputWithLabel;