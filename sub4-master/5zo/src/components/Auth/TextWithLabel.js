import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을 땐 상단 (그 사이) 에 여백을 준다.
const Wrapper = styled.div`
    & + & {
        margin-tip : 1rem;
    }
    margin-bottom: 15px;
`;

const Label = styled.div`
    font-size : 1rem;
    color : ${oc.gray[6]};
    margin-bottom : 0.25rem;
    text-align : left
`;

const Input = styled.input`
    width : 100%;
    border : 1px solid ${oc.gray[3]};
    border-radius: 5px;
    outline : none;
    font-size : 1rem;
    padding: 10px;

    background-color: #fafbfc;
    ::placeholder {
        color : ${oc.gray[3]};
    }
`;

const TextWithLabel = ({label, ...rest}) => (
    <Wrapper >
        <Label> {label} </Label>
        <Input {...rest} readOnly/>
    </Wrapper>
)

export default TextWithLabel;