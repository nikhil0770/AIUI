import React from "react";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import SignIn from "../components/Signin";

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <div style={{ fontWeight: "bold" }}>AIUI</div>
          <div>
            <img height="100" width="100" src="/loader.gif" alt="animation" />
          </div>
          <LinearProgress />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Home;
