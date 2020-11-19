import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedInfo } from "actions";

import Navigation from "./navigation/Navigation";
import Calendar from "./calendar/Calendar";
import DefLand from "./landing/DefLand";
import LandingPage from "./landing/LandingPage";
import Todo from "./todo/Todo";
import history from "../history";
import RegisterPage from "./Auth/RegisterPage";
import Login from "./Auth/Login";
import storage from "lib/storage";
import MyPage from "./Auth/MyPage";
import MyAccountDelete from "./Auth/MyAccountDelete";
import Daily from "./daily/Main";
import Redirecting from "./redirectingPage/RedirectBody";
import NewSearch from "./serach/NewSearch";
import FindIdPage from "./Auth/FindIdPage";
import FindPwPage from "./Auth/FindPwPage";
import AdminPage from "./Admin/AdminPage";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Viga', 'Godo', 'sans-serif'",
  },
});


class App extends React.Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    if (!loggedInfo) return;
    this.props.setLoggedInfo(loggedInfo);
  };
  componentDidMount() {
    this.initializeUserInfo();
  }

  stopDashBoard = () => {
    alert("글 쓰기 권한이 없습니다.");
  };

  drawRouter() {
    if (!this.props.members.mem_info) {
      return (
        <LandingPage>
          <>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/find-id" exact component={FindIdPage} />
              <Route path="/find-pw" exact component={FindPwPage} />
              <Route path="/" component={DefLand} />
            </Switch>
          </>
        </LandingPage>
      );
    } else {
      // 로그인했을 때

      return (
        <Navigation mem_info={this.props.members.mem_info}>
          <div>
            <Switch>
              <Route path="/" exact component={Daily} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/dashboard" exact component={Todo} />
              <Route path="/dashboard/:date" component={Todo} />
              <Route path="/login" exact component={Login} />
              <Route path="/mypage" exact component={MyPage} />
              <Route path="/mypage/delete" exact component={MyAccountDelete} />
              <Route path="/daily" exact component={Daily}></Route>
              <Route path="/daily/:user_id" exact component={Daily}></Route>
              <Route
                path="/daily/:user_id/:date"
                exact
                component={Daily}
              ></Route>
              <Route path="/search" exact component={NewSearch}></Route>
              {this.props.members.mem_info.mem_id === "admin" ? (
                <Route path="/admin" component={AdminPage}></Route>
              ) : null}

              <Route component={Redirecting} />
            </Switch>
          </div>
        </Navigation>
      );
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>{this.drawRouter()}</Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    members: state.members
  };
};

export default connect(mapStatetoProps, { setLoggedInfo })(App);
// export {App, withTitle};
