import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: "auto",
        overflow: "hidden",
        color: "#dde4e3ff",
        background: "#fff",
      }}
    >
      {/* SVG Wave Background - Exact as provided */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <path
          fill="#3ff7d8ff"
          fillOpacity="1"
          d="M0,192L48,165.3C96,139,192,85,288,53.3C384,21,480,11,576,16C672,21,768,43,864,90.7C960,139,1056,213,1152,218.7C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          py: 8,
          pt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            mb: 2,
          }}
        >
          <Link
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex" }}
          >
            <FacebookIcon sx={{ fontSize: 27, color: "#1877F2" }} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex" }}
          >
            <InstagramIcon sx={{ fontSize: 27, color: "#E1306C" }} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/zendiary/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex" }}
          >
            <LinkedInIcon sx={{ fontSize: 27, color: "#0A66C2" }} />
          </Link>
        </Box>

        <Typography variant="body2" align="center" className="text-gray-500">
          © {new Date().getFullYear()} ZenScribe | All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, color: "inherit" }}
        >
          <Link href="/privacy" underline="hover" className="!text-gray-600">
            Privacy
          </Link>
          {" | "}
          <Link
            href="/policy"
            target="_blank"
            underline="hover"
            className="!text-gray-600"
          >
            Policy
          </Link>
          {" | "}
          <Link href="/terms" underline="hover" className="!text-gray-600">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
