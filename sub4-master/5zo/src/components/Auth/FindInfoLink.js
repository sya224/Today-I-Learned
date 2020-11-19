import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    color : #8e8e8e;
    $:hover {
        color : ${oc.gray[7]};
    }
    text-decoration: none;
`;

const FindInfoLink = ({to, children}) => (
    <StyledLink to = {to} > {children} </StyledLink>
);

export default FindInfoLink;