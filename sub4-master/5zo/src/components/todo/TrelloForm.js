import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import TrelloButton from "./TrelloButton";

const Container = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const StyledCard = styled.div`
  min-height: 60px;
  padding: 6px 8px 2px;
`;

const StyledTextArea = styled(Input)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
`;

const TrelloForm = React.memo(
  ({ board_id, text = "", onChange, closeForm, children, submit }) => {
    const placeholder = board_id
      ? "Enter post title..."
      : "Enter a title for this learning...";

    return (
      <Container>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          <StyledCard>
            <StyledTextArea
              placeholder={placeholder}
              autoFocus
              value={text}
              onChange={e => onChange(e)}
              onBlur={closeForm}
            />
          </StyledCard>
          <ButtonContainer>
            <TrelloButton onClick={submit}>
            {children}</TrelloButton>
            <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
          </ButtonContainer>
        </form>
      </Container>
    );
  }
);

export default TrelloForm;
