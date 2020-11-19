import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import MyProfile from "./MyProfile";
import Typography from "@material-ui/core/Typography";
import EditPasswordPage from "./EditPasswordPage";
import EditEmailPage from "./EditEmailPage";

const styles = theme => ({
  paper: {
    flexGrow: 1,
    position: "relative",
    zIndex: 1
  },
  typography: {
    backgroundColor: "white",
    padding: "20px 0"
  },
  update: {
    display: "none",
    backgroundColor: "blue",
    cursor: "pointer",
    padding: "0.75rem 1.25rem",
    color: "white"
  }
});

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };
  setComponent() {
    let component;

    switch (this.state.value) {
      case 0:
        component = (
          <MyProfile update={this.update} close={this.close}></MyProfile>
        );
        break;
      case 1:
        component = (
          <EditEmailPage
            update={this.update}
            close={this.close}
          ></EditEmailPage>
        );
        break;
      case 2:
        component = (
          <EditPasswordPage
            update={this.update}
            close={this.close}
          ></EditPasswordPage>
        );
        break;
    }

    return component;
  }
  update(e, color) {
    document.getElementById("update").style.display = "block";

    switch (e) {
      case "profile":
        document.getElementById("update").style.backgroundColor = color;
        document.getElementById("update").innerHTML =
          "프로필이 변경되었습니다.";
        break;
      case "email":
        document.getElementById("update").innerHTML =
          "이메일이 변경되었습니다.";
        break;
      case "password":
        document.getElementById("update").innerHTML =
          "비밀번호가 변경되었습니다.";
        break;
      default:
        this.close();
        break;
    }
  }
  close() {
    document.getElementById("update").style.display = "none";
  }
  render() {
    const { classes } = this.props;

    return (
      <>
        <Paper className={classes.paper}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Profile" />
            <Tab label="Email" />
            <Tab label="Password" />
          </Tabs>
        </Paper>
        <Typography
          component="div"
          id="update"
          className={classes.update}
          onClick={this.close}
        ></Typography>
        <Typography component="div" className={classes.typography}>
          {this.setComponent()}
        </Typography>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyPage);
