import "./App.scss";
import React, { lazy, Suspense } from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { CircularProgress, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const Home = lazy(() => import("./Components/Home/Home"));
const ProductList = lazy(() => import("./Components/ProductList/ProductList"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const AddProduct = lazy(() => import("./Components/AddProduct/AddProduct"));
const Login = lazy(() => import("./Components/Login/Login"));
const HeadNav = lazy(() => import("./Components/HeadNav/HeadNav"));

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Josefin Sans", sans-serif`,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#a5d6a7",
    },
    secondary: {
      main: "#64b5f6",
    },
  },
});

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<CircularProgress />}>
            <ThemeProvider theme={theme}>
              <HeadNav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/add-product" component={AddProduct} />
                <Route exact path="/products" component={ProductList} />
                <Route exact path="/product" component={ProductList} />
              </Switch>
            </ThemeProvider>
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
