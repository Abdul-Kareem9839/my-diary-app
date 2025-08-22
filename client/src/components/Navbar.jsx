import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ margin: "0" }}>
      <AppBar
        position="sticky"
        color="white"
        width="100%"
        sx={{
          boxShadow: "none",
          background: "rgba(57, 21, 78, 0.9)",
        }}
      >
        <Toolbar>
          <div
            style={{
              marginRight: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="/src/assets/logo3.png" alt="logo" height={50} />
            <Typography
              component="div"
              sx={{
                fontSize: "1.5rem",
                color: "#E1306C",
                fontFamily: "Pacifico",
                display: "inline-block",
              }}
            >
              ZenDiary
            </Typography>
          </div>

          <Box>
            <Button
              component={RouterLink}
              to="/signin"
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#030303ff",
                borderRadius: "2rem",
                padding: "5px 10px",
                "&:hover": {
                  boxShadow: "2 2px 8px rgba(0, 0, 0, 0.1)",
                  color: "white",
                  backgroundColor: "rgba(8, 8, 8, 0.05)",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#030303ff",
                fontWeight: "bold",
                color: "white",
                borderRadius: "2rem",
                padding: "5px 16px",
                marginLeft: "8px",
                "&:hover": {
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                  color: "white",
                  backgroundColor: "rgba(7, 6, 6, 0.05)",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
