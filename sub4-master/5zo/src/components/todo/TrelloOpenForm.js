import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const TrelloOpenForm = ({ board_id, children, onClick }) => {
  const buttonTextOpacity = board_id ? 1 : 0.5;
  const buttonTextColor = board_id ? "white" : "inherit";
  const buttonTextBackground = board_id ? "rgba(0,0,0,.15)" : "inherit";

  const OpenFormButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 36px;
    margin-left: 8px;
    width: 95%;
    padding-left: 10px;
    padding-right: 10px;
    opacity: ${buttonTextOpacity};
    color: ${buttonTextColor};
    background-color: ${buttonTextBackground};
  `;

  return (
    <OpenFormButton onClick={onClick}>
      <Icon>add</Icon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

export default TrelloOpenForm;
