import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import "../styles/HeadNav.scss";

import { makeStyles, createMuiTheme, fade } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SideMenu from "./SideMenu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a5d6a7",
    },
    secondary: {
      main: "#64b5f6",
    },
  },
});

export default function HeadNav() {
  const { user, cart, logout } = useContext(AppContext);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const classes = useStyles();

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleSideMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Shop 4 Things
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Link to="/products" className="text">
              Products
            </Link>
            {user && user.accessLevel < 1 && (
              <Link to="/add-product" className="text">
                Add Product
              </Link>
            )}
            <Link to="/cart" className="text cartCard">
              <IconButton edge="start" aria-label="cart">
                <ShoppingCartOutlinedIcon style={{ color: "white" }} />
              </IconButton>
              <span className="cartNumber">{Object.keys(cart).length}</span>
            </Link>
            {!user ? (
              <Link to="/login" className="text">
                Login
              </Link>
            ) : (
              <Link to="/" className="text" onClick={logout}>
                Logout
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <SideMenu open={sideMenuOpen} toggle={toggleSideMenu} />
      </ThemeProvider>
    </div>
  );
}
