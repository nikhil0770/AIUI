import * as React from "react";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { Box } from "@mui/system";
import Imageselect from "../components/Modals/Imageselect";
import { Codecontext } from "../App";

export default function Codecompletion() {
  const [programmingLanguage, setProgrammingLanguage] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [submit, setSubmit] = React.useState("");
  const { state } = React.useContext(Codecontext);

  React.useEffect(() => {
    fetch(state?.pictureData)
      .then((res) => res.blob())
      .then((result) => {
        // Upload result to Cloud
        if (result.type === "image/jpeg") {
          const data = window.URL.createObjectURL(result);

          const a = document.createElement("a");
          a.setAttribute("href", data);
          a.setAttribute("download", "Mypic.jpg");

          a.click();
        }
      });
  }, [state.pictureData]);

  const handleProgrammingValue = (event) => {
    setProgrammingLanguage(event.target.value);
  };

  const handleInfoValue = (event) => {
    setInfo(event.target.value);
  };

  const handleQueryValue = (event) => {
    setQuery(event.target.value);
  };

  const resetFields = (event) => {
    setInfo("");
    setQuery("");
    setProgrammingLanguage("");
    setCode("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!programmingLanguage || !query) {
      setError("All fields with * are mandatory");
      return;
    }
    setSubmit(true);
    setError(false);

    const res = await fetch("http://localhost:3081/api/textGeneration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, programmingLanguage, info }),
    });

    const data = await res.json();
    // console.log("DATA", data.result.data[0].url);
    setSubmit(false);
    setCode(data.result);
    //call backend api here
  };

  return (
    <div className="codeCompletionMain">
      <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
        <FormControl fullWidth style={{ width: "100%" }}>
          <InputLabel required id="demo-simple-select-label">
            Programming Language
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={programmingLanguage}
            label="Programming Language"
            onChange={handleProgrammingValue}
            required
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="java">Java</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xl={6}
        md={6}
        sm={12}
        xs={12}
        className="gridInput fileUploadQuery"
      >
        <TextField
          required
          label="Your Query"
          name="query"
          fullWidth
          value={query}
          onChange={handleQueryValue}
        />
        <Imageselect />
      </Grid>

      <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
        <TextField
          label="Additional Info"
          name="info"
          fullWidth
          value={info}
          onChange={handleInfoValue}
        />
      </Grid>
      {error ? (
        <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
          <Alert severity="error">{error}</Alert>
        </Grid>
      ) : (
        ""
      )}
      <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
        <Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button variant="outlined" onClick={resetFields}>
          Reset
        </Button>
      </Grid>
      <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
        {submit ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
            Please wait while we process the request...
          </Box>
        ) : code ? (
          <Grid item>
            <Grid item xl={6} md={6} sm={12} xs={12} className="gridInput">
              <Typography style={{ width: "100%" }}>Results</Typography>
            </Grid>
            <Grid
              item
              xl={6}
              md={6}
              sm={12}
              xs={12}
              className=" codeEditor"
              style={{
                border: "1px solid black",
              }}
            >
              <div
                className="editorLayout"
                style={{
                  maxHeight: "30vh",
                  overflow: "auto",
                  userSelect: "text",
                }}
              >
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  className="editorClass"
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    width: "100%",
                  }}
                />
              </div>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}
