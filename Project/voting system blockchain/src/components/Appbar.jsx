// // src/components/Appbar.jsx

// import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// import { Divider, Drawer, Paper } from "@mui/material";
// import { Assessment, CreateTwoTone, HowToVote } from "@mui/icons-material";
// import { NavLink } from "react-router-dom";

// export default function Appbar() {
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

//   const links = [
//     {
//       text: "Create Election",
//       link: "/election",
//       Icon: <CreateTwoTone />,
//     },
//     {
//       text: "Voting",
//       link: "/voting",
//       Icon: <HowToVote />,
//     },
//     {
//       text: "Results",
//       link: "/results",
//       Icon: <Assessment />,
//     },
//   ];

//   // Styled NavLink for menu items
//   const StyledNavLink = styled(NavLink)(({ theme }) => ({
//     textDecoration: "none",
//     color: "black",
//     width: "100%",
//     display: "block",
//     borderRadius: "8px",
//     padding: "8px 16px",
//     transition: "background-color 0.3s, box-shadow 0.3s",
//   }));

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="relative" sx={{ backgroundColor: "green" }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2, cursor: "pointer" }}
//             onClick={() => setOpen(!open)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <NavLink to="/" style={{ textDecoration: "none" }}>
//             <Typography
//               variant="h6"
//               sx={{ display: { xs: "none", sm: "block" } }}
//               color="white"
//             >
//               DeCentralized Election System
//             </Typography>
//           </NavLink>
//           <Box sx={{ flexGrow: 1 }} />
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: "300px", marginTop: "2rem", padding: "0 1rem" }}>
//           <Box mb={3}>
//             <NavLink
//               to="/"
//               onClick={() => setOpen(false)}
//               style={{ textDecoration: "none" }}
//             >
//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//                 textAlign="center"
//                 color="black"
//               >
//                 DeCentralized Election System
//               </Typography>
//             </NavLink>
//           </Box>
//           <Divider />
//           <Box mt={2}>
//             {links.map((val, ind) => (
//               <Paper
//                 key={ind}
//                 elevation={0}
//                 sx={{
//                   marginBottom: "1rem",
//                   borderRadius: "12px",
//                   transition: "transform 0.2s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                   },
//                 }}
//               >
//                 <StyledNavLink to={val.link} onClick={() => setOpen(false)}>
//                   <Box display="flex" alignItems="center">
//                     <Box
//                       mr={2}
//                       display="flex"
//                       alignItems="center"
//                       color="black"
//                     >
//                       {val.Icon}
//                     </Box>
//                     <Typography variant="h6" fontWeight="bold">
//                       {val.text}
//                     </Typography>
//                   </Box>
//                 </StyledNavLink>
//               </Paper>
//             ))}
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }


// src/components/Appbar.jsx

import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Divider, Drawer, Paper, Button, Tooltip } from "@mui/material";
import { Assessment, CreateTwoTone, HowToVote } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify

export default function Appbar({ setAccount, setContract }) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      text: "Create Election",
      link: "/election",
      Icon: <CreateTwoTone />,
    },
    {
      text: "Voting",
      link: "/voting",
      Icon: <HowToVote />,
    },
    {
      text: "Results",
      link: "/results",
      Icon: <Assessment />,
    },
  ];

  // Styled NavLink for menu items
  const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: "black",
    width: "100%",
    display: "block",
    borderRadius: "8px",
    padding: "8px 16px",
    transition: "background-color 0.3s, box-shadow 0.3s",
  }));

  const logout = () => {
    setAccount(""); // Clear the account state
    setContract(""); // Clear the contract state
    toast.success("Logged out successfully!"); // Trigger success toast
    
    setTimeout(() => {
        window.location.href = "/"; // Redirect after delay
    }, 1000); // Wait for 1 second before redirecting
};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ backgroundColor: "green" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
              color="white"
            >
              DeCentralized Election System
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          {/* Logout Button */}
          <Tooltip title="Logout">
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "300px", marginTop: "2rem", padding: "0 1rem" }}>
          <Box mb={3}>
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                color="black"
              >
                DeCentralized Election System
              </Typography>
            </NavLink>
          </Box>
          <Divider />
          <Box mt={2}>
            {links.map((val, ind) => (
              <Paper
                key={ind}
                elevation={0}
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "12px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <StyledNavLink to={val.link} onClick={() => setOpen(false)}>
                  <Box display="flex" alignItems="center">
                    <Box
                      mr={2}
                      display="flex"
                      alignItems="center"
                      color="black"
                    >
                      {val.Icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {val.text}
                    </Typography>
                  </Box>
                </StyledNavLink>
              </Paper>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
