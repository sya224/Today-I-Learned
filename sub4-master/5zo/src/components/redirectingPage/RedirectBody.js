import React from 'react';
import { connect } from "react-redux";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import { getLoggedInfo } from "../../actions";
import { NavLink } from 'react-router-dom'

class Redirecting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        }
    }
    handleClick = () => {
        this.setState({ navigate: true });
    }
    render() {
        return (
            <div className='Landing' align = "center">
                <MuiThemeProvider>
                    <Container maxWidth="sm" alignItem ="center">
                        <h1>Page Not Found 😬</h1>
                        <NavLink to="/"> To Daily Page </NavLink>
                    </Container>
                </MuiThemeProvider>

            </div>
        );
    }
}
const mapStatetoProps = state => {
    return {
        mem_info: state.members.mem_info
    };
};

export default connect(mapStatetoProps, { getLoggedInfo })(Redirecting);
