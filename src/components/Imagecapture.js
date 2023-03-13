import { Button, Dialog, DialogTitle, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Codecontext } from "../App";
import { Camera } from "react-camera-pro";
import CloseIcon from "@mui/icons-material/Close";

const Imagecapture = ({ picture, setPicture }) => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(Codecontext);

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.takePhoto();
    setPicture(pictureSrc);
    dispatch({ type: "SET_IMAGE_DATA", payload: pictureSrc });
  });

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        className="fakeButton"
        onClick={() => setOpen(true)}
      >
        <CameraAltIcon></CameraAltIcon>
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        PaperProps={{
          sx: {
            padding: "0px 20px 20px 20px",
          },
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className="imageCaptureStyle">
          {picture === "" ? (
            <Camera ref={webcamRef} aspectRatio={4 / 3} />
          ) : (
            <img className="capturedPic" src={picture} alt="pic" />
          )}
        </div>
        <div className="imageCaptureStyle">
          {picture !== "" ? (
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setPicture("");
              }}
              className="btn btn-primary"
            >
              Retake
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="btn btn-danger"
            >
              Capture
            </Button>
          )}
        </div>
      </Dialog>
    </div>
  );
};
export default Imagecapture;
