import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Paper, styled, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "10px",
  margin: "10px",
  textAlign: "center",
  width: "25vw",
  height: "10vw",
  alignItems: "center",
  color: theme.palette.text.secondary,
}));

function Mainpage() {
  return (
    <div className="gridAlignment">
      <Grid
        container
        spacing={8}
        margin="auto"
        style={{ transform: "translate(-32px, 10px)" }}
      >
        <Grid xs={10}>
          <Typography>Explore</Typography>
        </Grid>
        <Grid xs={6} style={{ alignItems: "center" }}>
          <Link to="/codeCompletion">
            <Item
              className="griditemStyle"
              style={{
                backgroundImage:
                  "url(https://cdn.openai.com/API/images/gradient_card_1.webp)",
              }}
            >
              Code Completion
            </Item>
          </Link>
        </Grid>
        <Grid xs={6}>
          <Item
            className="griditemStyle"
            style={{
              backgroundImage:
                "url( https://cdn.openai.com/API/images/gradient_card_2.webp)",
            }}
          >
            Image Generation
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item
            className="griditemStyle"
            style={{
              backgroundImage:
                "url(https://wallpaperaccess.com/full/1155052.jpg)",
            }}
          >
            Templates
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item
            className="griditemStyle"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-4197.jpg?w=996&t=st=1677572427~exp=1677573027~hmac=81bf5373daf7738a8c216f9be32a32198b090e30e5c87d41eda3dd090a2e8507",
            }}
          >
            Extras
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default Mainpage;
