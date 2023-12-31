import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sidebar, Search } from "..";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { fetchToken, createSessionId, moviesApi } from "../../Utilis/Index";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../Features/Auth";
import { ColorModeContext } from "../../Utilis/ToggleColorMode"

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext);

  // const isAuthenticated = false;

  // console.log(user);
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton} >
              <Menu />
            </IconButton>
          )}

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWvXdcjNuTkrkDCYKZRtWwZ-emiiDJdP6sUb7VRshRA&s"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;

// import React,{useState,useEffect} from 'react';
// import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
// import { Menu, AccountCircle, Brightness4, Brightness7  } from "@mui/icons-material";
// import { Link } from 'react-router-dom';
// import useStyles from './styles';
// import {useTheme} from '@mui/material/styles';
// import { Sidebar, Search } from '..';
// import { fetchToken, createSessionId, moviesApi } from '../../Utilis/Index';
// import {useDispatch,useSelector } from 'react-redux';
// import { setUser,userSelector } from '../../Features/Auth';

// const  Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const dispatch  = useDispatch()
//   const classes = useStyles()
//   const isMobile = useMediaQuery('(max-width:600px)')
//   const theme = useTheme()
//   const isAuthenticated = false

//   const token = localStorage.getItem('request_token')
//   const sessionIdFromLocalStorage = sessionStorage.getItem('session_id')

//   useEffect(() => {
//     const loginUser = async () => {
//       if (token) {
//         if (sessionIdFromLocalStorage) {
//           const { data: userData } = await moviesApi.get(
//             `/account?session_id=${sessionIdFromLocalStorage}`
//           );
//           dispatch(setUser(userData));
//         }
//       } else {
//         const sessionId = await createSessionId();
//         const { data: userData } = await moviesApi.get(
//           `/account?session_id=${sessionId}`
//         );
//         dispatch(setUser(userData));
//       }
//     };
//     loginUser();
//   }, [token]);

//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar className={classes.toolbar}>
//           {isMobile && (
//             <IconButton
//               color="inherit"
//               edge="start"
//               style={{ outline: "none" }}
//               onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
//               className={classes.menuButton}
//             >
//               <Menu />
//             </IconButton>
//           )}
//           <IconButton
//             color="inherit"
//             sx={{ ml: 1 }}
//             onClick={() => {}}
//           >
//             {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
//           </IconButton>
//           {!isMobile && <Search />}
//           <div>
//             {!isAuthenticated ? (
//               <Button color="inherit" onClick={ fetchToken}>
//                 Login &nbsp; <AccountCircle />
//               </Button>
//             ) : (
//               <Button
//                 color="inherit"
//                 componenet={Link}
//                 to="/profile/:id"
//                 className={classes.linkButton}
//                 onClick={() => {}}
//               >
//                 {!isMobile && <> My Movie &nbsp;</>}
//                 <Avatar
//                   style={{ width: 30, height: 30 }}
//                   alt="profile"
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWvXdcjNuTkrkDCYKZRtWwZ-emiiDJdP6sUb7VRshRA&s"
//                 />
//               </Button>
//             )}
//           </div>
//           {isMobile && <Search />}
//         </Toolbar>
//       </AppBar>
//       <div>
//         <nav className={classes.drawer}>
//           {isMobile ? (
//             <Drawer
//               variant="temporary"
//               anchor="left"
//               open={mobileOpen}
//               className={classes.drawerBackground}
//               classes={{ paper: classes.drawPaper }}
//               modalProps={{ keepMounted: true }}
//               onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
//             >
//               <Sidebar setMobileOpen={setMobileOpen} />
//             </Drawer>
//           ) : (
//             <Drawer
//               classes={{ paper: classes.drawerPaper }}
//               variant="permanent"
//               open
//             >
//               <Sidebar setMobileOpen={setMobileOpen} />
//             </Drawer>
//           )}
//         </nav>
//       </div>
//     </>
//   );
// }

// export default Navbar;
