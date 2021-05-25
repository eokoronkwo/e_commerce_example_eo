import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import "./HeadNav.scss";

import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SideMenu from "../SideMenu/SideMenu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
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

export default function HeadNav() {
  const { user, cart, logout } = useContext(AppContext);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const classes = useStyles();

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSideMenu}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="titleText">
            <Link className="text whiteText" to="/">
              Shop 4 Things
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Link to="/products" className="text whiteText">
            Products
          </Link>
          {user && user.accessLevel < 1 && (
            <Link to="/add-product" className="text whiteText">
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
            <Link to="/login" className="text whiteText">
              Login
            </Link>
          ) : (
            <Link to="/" className="text whiteText" onClick={logout}>
              Logout
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <SideMenu open={sideMenuOpen} toggle={toggleSideMenu} />
    </div>
  );
}
