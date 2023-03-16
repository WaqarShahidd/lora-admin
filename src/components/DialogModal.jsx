import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const DialogModal = ({ value, setValue, onClick, title, subtitle }) => {
  return (
    <Dialog
      open={value}
      onClose={() => setValue(false)}
      PaperProps={{
        sx: {
          width: "22.5%",
          height: "60%",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          paddingBottom: "5px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          {subtitle}
        </DialogContentText>
        <div
          style={{
            margin: "15px 0px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75%",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid",
              borderColor: "green",
              height: "85px",
              width: "85px",
              borderRadius: "360px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DoneIcon sx={{ color: "green", height: "55px", width: "55px" }} />
          </div>
        </div>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "green",
            color: "white",
            "&:hover": {
              backgroundColor: "#329932",
            },
            width: "50%",
            borderRadius: "18px",
            marginBottom: "15px",
          }}
          onClick={onClick}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
