import React, { useContext } from "react";
import AppContext from "../AppContext";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products, addToCart } = useContext(AppContext);

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
