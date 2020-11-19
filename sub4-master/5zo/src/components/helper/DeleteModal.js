import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = event => {
    setOpen(false);
  };

  const handleDelete = event => {
    event.stopPropagation();
    props.onDelete();
    handleClose();
  };

  const handleClickOpen = event => {
    event.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <span onClick={handleClickOpen}>{props.children}</span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={event => event.stopPropagation()}
      >
        <DialogTitle id="alert-dialog-title">
          정말로 {props.type} : {props.title}을 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말로 삭제하시겠습니까? 삭제시 복구 할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            삭제
          </Button>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteModal;
