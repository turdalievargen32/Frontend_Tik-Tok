import { Typography } from "@mui/material";
import React from "react";
import qr from "../assets/images/qr.png";
const HelpPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={qr}
        style={{ width: "40%", alignSelf: "center", marginTop: "100px" }}
      />

      <Typography
        sx={{ fontSize: "4vmin", color: "black", alignSelf: "center" }}
      >
        Feedback and help
      </Typography>
    </div>
  );
};

export default HelpPage;
