import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../../actions/LoginActions"

// MUI IMPORTS
import DrawerComp from "./DrawerComp";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { Grid, Tabs, Tab, useTheme, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";

const Navbar = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginStatus = useSelector((state) =>
    state.login
  );

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logout())
  }

  return (

    <React.Fragment>
      <Toolbar sx={{ backgroundColor: "#A60201", color: "#FFFFFF" }}>
        {isMatch ? <>
          <Typography>
            <SportsSoccerIcon />
          </Typography>
          <DrawerComp />
        </>
          :
          <>
            <Grid sx={{ placeItems: "center" }} container>
              <Grid item xs={1}>
                <Typography>
                  <SportsSoccerIcon />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                  <Tab label="Ajankohtaista" component={Link} to={"/news"} />
                  <Tab label="Pelaajat" component={Link} to={"/players"} />
                  <Tab label="Kauden pelit" component={Link} to={"/seasongames"} />
                  {loginStatus.admin && (
                    <Tab label="Lisää käyttäjä" component={Link} to={"/register"} />
                  )}
                </Tabs>
              </Grid>
            </Grid>

            {loginStatus.admin ?
              <Grid justifyContent={"end"}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleAvatar}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{

                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logOut}>Kirjaudu ulos</MenuItem>
                </Menu>
              </Grid>
              :
              <Grid justifyContent={"end"}>
                <IconButton component={Link} to={"/login"} color="inherit">
                  <LoginIcon
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleClose}
                  ></LoginIcon>
                </IconButton>
              </Grid>
            }
          </>
        }
      </Toolbar>
    </React.Fragment>
  )
}
export default Navbar;