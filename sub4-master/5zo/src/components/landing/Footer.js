import React from 'react';
import {
   Relative, Absolute, Flex, NavLink, Small
} from 'rebass'

class Header extends React.Component {
    render() {
        return (
            <Relative pb={5}>
                <Absolute zIndex={1} left={0} right={0} top={0}>
                    <Flex is="footer" alignItems="center" p={3}>
                        <NavLink children="TIL" href="#" />
                        <Small color="grey" ml="auto">© 1zo SSAFY, 2020</Small>
                    </Flex>
                </Absolute>
            </Relative>
        )
    }
}

export default Header