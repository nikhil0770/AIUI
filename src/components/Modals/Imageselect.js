import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import Imagecapture from "../Imagecapture";
import CloseIcon from "@mui/icons-material/Close";

export default function Imageselect(props) {
  const [open, setOpen] = React.useState(false);
  const [fileValue, setFileValue] = React.useState(null);
  const [picture, setPicture] = React.useState("");

  const handleFileValue = (event) => {
    const fileType = event.target.files[0].type;
    console.log(fileValue, fileType);
    if (fileType === "image/jpeg") {
      setFileValue(event.target.files[0]);
      console.log("Correct Format");
    }
  };

  React.useEffect(() => {
    //upload to cloud and update url in db
  }, [picture, fileValue]);

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        className="fakeButton"
        onClick={() => setOpen(true)}
      >
        <CloudUploadIcon></CloudUploadIcon>
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        PaperProps={{
          sx: {
            width: "50%",
            padding: "20px",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography
            sx={{
              padding: "0px 0px 20px 0px",
              fontSize: "smaller",
              textAlign: "center",
            }}
          >
            Select file to upload or capture
          </Typography>
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

        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" component="label" className="fakeButton">
            <CloudUploadIcon></CloudUploadIcon>
            <input type="file" value={""} onChange={handleFileValue} hidden />
          </Button>
          <Imagecapture
            picture={picture}
            setPicture={(val) => setPicture(val)}
          />
        </Box>
      </Dialog>
    </div>
  );
}
