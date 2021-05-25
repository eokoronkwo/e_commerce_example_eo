import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { CircularProgress, Grid, IconButton } from "@material-ui/core";
import "./ProductItem.scss";
import AppContext from "../../AppContext";

export default function ProductItem({ product }) {
  const { user } = useContext(AppContext);
  const [photo, setPhoto] = useState();
  const [photoLoading, setPhotoLoading] = useState(true);

  useEffect(() => {
    import(`../../${product.photo}`).then(photo => {
      setPhoto(photo.default);
      setTimeout(function () {
        setPhotoLoading(false);
      }, 200);
    });
  });

  return (
    <>
      {photoLoading ? (
        <CircularProgress />
      ) : (
        <Grid item>
          <div className="imageAndIcon">
            <img className="productListImage" src={photo} alt={product.name} />
            <div>
              {user.favorites && user.favorites.includes(product._id) ? (
                <IconButton aria-label="unfavorite" className="favoriteIcon">
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton aria-label="favorite" className="favoriteIcon">
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </div>
          </div>
          <div>{product.name}</div>
          <div>${product.price}</div>
        </Grid>
      )}
    </>
  );
  //   <div className="">
  //     <div className="">
  //       <div className="">
  //         <div className="">
  //           <figure className="">
  //             <img
  //               src={require(`../../${product.photo}`).default}
  //               alt={product.name}
  //             />
  //           </figure>
  //         </div>
  //         <div className="">
  //           <b>
  //             {product.name} <span className="">${product.price}</span>
  //           </b>
  //           <div>{product.shortDesc}</div>
  //           {product.stock > 0 ? (
  //             <small>{product.stock + " Available"}</small>
  //           ) : (
  //             <small className="">Out Of Stock</small>
  //           )}
  //           <div className="">
  //             <button
  //               className=""
  //               onClick={() =>
  //                 addToCart({
  //                   id: product.name,
  //                   product,
  //                   amount: 1,
  //                 })
  //               }
  //             >
  //               Add to Cart
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
