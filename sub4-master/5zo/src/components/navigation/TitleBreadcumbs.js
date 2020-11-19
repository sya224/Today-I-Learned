import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import storage from "lib/storage";
import { fetchAlarm } from "../../actions";
import { connect } from "react-redux";

const StyledLink = styled(Link)`
  text-decoration: inherit;
  color: white;
  text-transform: none;
`;

const breadcumbspliter = props => {
  return props.location.pathname.split("/").map((bread, index) => {
    if (bread) {
      return (
        <StyledLink
          key={index}
          to={props.location.pathname
            .split("/")
            .slice(0, index + 1)
            .join("/")}
        >
          {bread}
        </StyledLink>
      );
    }
  });
};

function TitleBreadcumbs(props) {
  const mem_info = storage.get("loggedInfo");
  React.useEffect(() => {
    if (mem_info) {
      props.fetchAlarm(mem_info.mem_id);
    }
  });
  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <StyledLink to={"/"}>TIL the end</StyledLink>
        {breadcumbspliter(props)}
      </Breadcrumbs>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, { fetchAlarm })(TitleBreadcumbs)
);
