import React from 'react';
import { Button } from "@mui/material";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin() {
    return (
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#dadce0",
            borderWidth: "2px",
            color: "#3c4043",
            fontWeight: 500,
            fontSize: "16px",
            padding: "10px 20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "50%" }, // Full width on small screens, half on large
            maxWidth: "400px"
            
          }}
          startIcon={
            <FcGoogle />
          }
        >
          Continue with Google
        </Button>
      );
}

export default GoogleLogin
