import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import AppContext from "../../AppContext";
import ProductItem from "../ProductItem/ProductItem";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { capitalize } from "@material-ui/core";
import "./ProductList.scss";

const validCategories = [
  "premium",
  "essentials",
  "outdoor",
  "clearance",
  "used",
  "vintage",
];

export default function ProductList(props) {
  const location = useLocation();
  const [category, setCategory] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [products, setProducts] = useState();
  const history = useHistory();

  useEffect(() => {
    console.log(location);
    const params = new URLSearchParams(location.search);
    let category = params.get("category");
    console.log(category);
    setCategory(category);
    let pageNum = params.get("page");
    setPageNumber(parseInt(pageNum));
    if (validCategories.includes(category)) {
      import(`../../Products/${category}/${category}.js`)
        .then(({ default: products }) => {
          if (pageNum in products) {
            setProducts(products[pageNum]);
            setTotalPages(Object.keys(products).length);
          } else {
            history.push({
              pathname: "/products",
              search: `?category=${category}&page=1`,
              state: { category: capitalize(category) },
            });
            setProducts(products);
            setTotalPages(Object.keys(products).length);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      history.push("/");
    }
  }, [history, location]);

  const handlePageChange = (event, page) => {
    console.log(event.target.value);
    console.log(page);
    if (page !== pageNumber) {
      setPageNumber(page);
      getProductsByPage(page);
    }
  };

  const getProductsByPage = page => {
    import(`../../Products/${category}/${category}.js`)
      .then(({ default: products }) => {
        setProducts(products[page]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Grid container justify="center" className="pageContent">
      <Grid item xl={1} className="sortAndFilters">
        <div className=""></div>
      </Grid>
      <Grid item xl={8} className="productsAndTitle">
        {category && (
          <h4 className="">{`${capitalize(
            category === "essentials" ? "essential" : category
          )} Things`}</h4>
        )}
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
        >
          <Grid container justify="space-around" xl={10} wrap="wrap">
            {products &&
              products.map((product, index) => (
                <div className="productItem" key={index}>
                  <ProductItem product={product} />
                </div>
              ))}
          </Grid>
          <Grid item>
            <Pagination
              count={totalPages}
              color="primary"
              onChange={handlePageChange}
              page={pageNumber}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
