import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import "../styles/HeadNav.scss";

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SideMenu from "./SideMenu";

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
