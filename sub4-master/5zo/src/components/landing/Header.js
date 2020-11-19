
import React from 'react';
import {
    Relative, Flex, NavLink, Button
} from 'rebass'
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};
class Header extends React.Component {
    render() {
        return (
            <Relative pb={5} >
                <CssBaseline />
                <ElevationScroll {...this.props}>
                    <AppBar style={{ background: '#0C797D' }}>
                        <Flex is="header" p={3} bg="#0C797D" color="white">
                            <NavLink href="/" fontSize={3} style={{flexGrow: 1}}>Today I learned</NavLink>
                            <Button bg="#0C797D" style={{border: window.location.href.indexOf("login") !== -1 ? "1px solid #e7e7e7" : "0px", borderRadius: "5px"}}>
                              <NavLink href="/login" ml='auto'>Sign in</NavLink>
                            </Button>
                            <Button bg="#0C797D" style={{border: window.location.href.indexOf("login") !== -1 ? "0px" : "1px solid #e7e7e7", borderRadius: "5px"}}>
                              <NavLink href="/register" ml='auto'>Sign up</NavLink>
                            </Button>
                        </Flex>
                    </AppBar>
                </ElevationScroll>
            </Relative>
        )
    }
}

export default Header