import React, {useState, useCallback, Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import queryString from "query-string";

class SearchBar extends Component {  
    state = {
        searchText:''
    }
    handleChange = (e) => {
        this.setState({
            searchText : e.target.value
        })
    }
    render(){
        let type = this.props.type
        if(type === undefined){
            type = 'card' 
        }
        return (
            <div style={{position:"relative", textAlign:"center"}}>
                <TextField 
                    value={this.state.searchText} 
                    onChange={this.handleChange} 
                    id = "standard-basic" 
                    style ={{width : 400}}
                    />
                <Button 
                    variant="contained" 
                    color="primary" 
                    href={'/search/' + this.state.searchText+'?type='+type}
                    style={{position:"absolute", bottom:"0px"}}
                    >Search</Button>
            </div>
        );
    }
};

export default SearchBar;