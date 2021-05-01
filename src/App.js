import "./App.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import React, { useState, createRef, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AppContext from "./AppContext";
import { CircularProgress } from "@material-ui/core";

const Home = lazy(() => import("./Components/Home"));
const ProductList = lazy(() => import("./Components/ProductList"));
const Cart = lazy(() => import("./Components/Cart"));
const AddProduct = lazy(() => import("./Components/AddProduct"));
const Login = lazy(() => import("./Components/Login"));
const HeadNav = lazy(() => import("./Components/HeadNav"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user === null) {
      let localUser = localStorage.getItem("user");
      localUser = localUser ? JSON.parse(localUser) : null;
      setUser(localUser);

      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : {};
      setCart(cart);
    }
  }, [user]);

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:3001/products")
      .then(response => {
        // console.log(response.data);
        setProducts(response.data);
      })
      .catch(response => {
        console.error(response);
      });
  };

  const addProduct = (product, callback) => {
    let currentProducts = products.slice();
    currentProducts.push(product);
    // setProducts(currentProducts);
    setProducts(currentProducts, () => callback && callback());
  };

  // TODO
  // Clean up this method
  const addToCart = cartItem => {
    let modifiedCart = Object.assign({}, cart);
    console.log(modifiedCart === cart);
    if (modifiedCart[cartItem.id]) {
      modifiedCart[cartItem.id].amount += cartItem.amount;
    } else {
      modifiedCart[cartItem.id] = cartItem;
    }
    if (
      modifiedCart[cartItem.id].amount > modifiedCart[cartItem.id].product.stock
    ) {
      modifiedCart[cartItem.id].amount =
        modifiedCart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(modifiedCart));
    setCart(modifiedCart);
    console.log(modifiedCart);
  };

  const removeFromCart = cartItemId => {
    let modifiedCart = Object.assign({}, cart);
    delete modifiedCart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(modifiedCart));
    setCart(modifiedCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
  };

  // TODO
  // Clean up this meethod
  const login = async (email, password) => {
    const response = await axios
      .post("http://localhost:3001/login", { email, password })
      .catch(response => {
        return { status: 401, message: "Unauthorized", response: response };
      });

    if (response.status === 200) {
      const { email } = jwt_decode(response.data.accessToken);
      const user = {
        email,
        token: response.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const logout = e => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("user");
  };

  //clean up this method
  const checkout = () => {
    if (!user) {
      routerRef.current.history.push("/login");
      return;
    }

    const currentProducts = products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(`http://localhost:3001/products/${p.id}`, { ...p });
      }
      return p;
    });

    setProducts(currentProducts);
    clearCart();
  };

  const routerRef = createRef();

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        products,
        setProducts,
        addProduct,
        login,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
      }}
    >
      <Router ref={routerRef}>
        <div className="App">
          <Suspense
            fallback={
              <div>
                <CircularProgress />
              </div>
            }
          >
            <HeadNav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
