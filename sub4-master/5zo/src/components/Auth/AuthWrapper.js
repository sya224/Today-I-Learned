import React from "react";
import styled from 'styled-components';
import {shadow} from 'lib/styleUtil';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다.
const Positioner = styled.div`
    // position : relative;
    // top : 50%;
    // left : 50%;
    // transform : translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width : auto;
    
    ${shadow(2)}
`;

// 로고
const LogoWrapper = styled.div`
    background : #94C9A9;
    height : 5rem;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const Contents = styled.div`
    background : white;
    padding : 2rem;
    height : auto;
`

const AuthWrapper = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <logo to="/"> TIL the end </logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
)

export default AuthWrapper;