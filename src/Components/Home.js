import React, { useEffect, useState } from "react";
import { getProductById, getRandomInt } from "../Shared/sharedFunctions.js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Home.scss";

export default function Home() {
  const [picOne, setPicOne] = useState();
  const [productOne, setProductOne] = useState();
  const [picTwo, setPicTwo] = useState();
  const [productTwo, setProductTwo] = useState();
  const [picThree, setPicThree] = useState();
  const [productThree, setProductThree] = useState();
  const [picFour, setPicFour] = useState();
  const [productFour, setProductFour] = useState();

  useEffect(() => {
    const selectRandomProducts = () => {
      let productMax;
      let randomProducts = [];
      let usedProductIndexes = [];
      import("../Products/all.js")
        .then(({ default: products }) => {
          productMax = products.length;
          for (let i = 0; randomProducts.length < 4; i++) {
            let randomInt = getRandomInt(productMax);
            if (!usedProductIndexes.includes(randomInt)) {
              usedProductIndexes.push(randomInt);
              const p = getProductById(randomInt.toString());
              indexForStateChange(i, p);
              // console.log(picOne);
              randomProducts.push(p);
            }
          }
          // console.log(randomProducts);
          const finalProducts = randomProducts.map(p => {
            return { original: `../${p.photo}` };
          });
          console.log(finalProducts);
        })
        .catch(error => console.log(error));
    };
    selectRandomProducts();
  }, []);

  const indexForStateChange = (index, product) => {
    switch (index) {
      case 0:
        import(`../${product.photo}`).then(photo => {
          console.log(photo);
          setPicOne(photo.default);
          setProductOne(product);
        });
        break;
      case 1:
        import(`../${product.photo}`).then(photo => {
          console.log(photo);
          setPicTwo(photo.default);
          setProductTwo(product);
        });
        break;
      case 2:
        import(`../${product.photo}`).then(photo => {
          console.log(photo);
          setPicThree(photo.default);
          setProductThree(product);
        });
        break;
      case 3:
        import(`../${product.photo}`).then(photo => {
          console.log(photo);
          setPicFour(photo.default);
          setProductFour(product);
        });
        break;
      default:
    }
  };

  return (
    <div className="homeCarousel">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        width={"80%"}
        centerMode
        centerSlidePercentage={90}
      >
        <div className="carouselItem">
          <img src={picOne} />
          <p className="legend">Pic 1</p>
        </div>
        <div className="carouselItem">
          <img src={picTwo} />
          <p className="legend">Pic 2</p>
        </div>
        <div className="carouselItem">
          <img src={picThree} />
          <p className="legend">Pic 3</p>
        </div>
        <div className="carouselItem">
          <img src={picFour} />
          <p className="legend">Pic 4</p>
        </div>
      </Carousel>
    </div>
  );
}
