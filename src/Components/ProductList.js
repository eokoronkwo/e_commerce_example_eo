import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import AppContext from "../AppContext";
import ProductItem from "./ProductItem";

const validCategories = [
  "premium",
  "essentials",
  "outdoor",
  "clearance",
  "used",
  "vintage",
];

export default function ProductList(props) {
  const { addToCart } = useContext(AppContext);
  const location = useLocation();
  const [category, setCategory] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState();

  useEffect(() => {
    console.log(location);
    const params = new URLSearchParams(location.search);
    let category = params.get("category");
    let pageNum = params.get("page");
    // create folder for each category and gput products into different files by page
    // Then you can import by category and page number
    if (checkValidCategory(category)) {
      import(`../Products/${category}/page${pageNum}.js`)
        .then(({ default: products }) => {
          console.log(products);
        })
        .catch(error => {
          console.log("Page doesn't exist");
          import(`../Products/${category}/page1.js`).then(
            ({ default: products }) => {
              console.log(products);
            }
          );
        });
    }
    // setProducts(productsRepo[location.state.category]);
  }, [products, location]);

  const checkValidCategory = category => {
    return validCategories.includes(category);
  };

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">
            {location.state ? location.state.category : "Shop By Category"}
          </h4>
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
