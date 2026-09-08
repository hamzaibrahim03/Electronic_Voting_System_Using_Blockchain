// src/components/Home.jsx

import React from "react";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import votingAnimation from "../assets/voting_system_home.json"; // Adjust the path if necessary

const Home = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Adjust as needed
            width="100%"
            bgcolor="#f5f5f5" // Optional: background color
        >
            <Box
                width={{ xs: "300px", sm: "400px", md: "500px" }} // Responsive sizing
                height={{ xs: "300px", sm: "400px", md: "500px" }}
            >
                <Lottie 
                    animationData={votingAnimation} 
                    loop={true} 
                    autoplay={true} 
                />
            </Box>
        </Box>
    );
};

export default Home;
