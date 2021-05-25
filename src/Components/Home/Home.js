import React, { useEffect, useState } from "react";
import { getProductById, getRandomInt } from "../../Shared/sharedFunctions.js";
import "./Home.scss";
import Carousel from "react-material-ui-carousel";
import Grid from "@material-ui/core/Grid";
import Footer from "../Footer/Footer.js";

const featuredHeaders = [
  "Treat yourself",
  "Find it here first",
  "Great for gifts",
  "Superb deal",
  "Going fast",
  "Just arrived",
  "Popular",
  "Highly rated",
];

export default function Home() {
  const [featuredCarouselProducts, setFeaturedCarouselProducts] = useState([]);
  const [featuredCardProducts, setFeaturedCardProducts] = useState([]);
  const [usedProductIndexes, setUsedProductIndexes] = useState([]);

  const [picOne, setPicOne] = useState();
  const [picTwo, setPicTwo] = useState();
  const [picThree, setPicThree] = useState();
  const [picFour, setPicFour] = useState();
  const [picFive, setPicFive] = useState();
  const [picSix, setPicSix] = useState();
  const [picSeven, setPicSeven] = useState();
  const [picEight, setPicEight] = useState();

  useEffect(() => {
    const selectRandomProducts = () => {
      import("../../Products/all.js")
        .then(({ default: products }) => {
          let productMax = products.length;
          let carouselProducts = [];
          let index = 0;
          do {
            let randomInt = getRandomInt(productMax);
            if (!usedProductIndexes.includes(randomInt)) {
              let currentIndexes = usedProductIndexes;
              currentIndexes.push(randomInt);
              setUsedProductIndexes(currentIndexes);
              let p = getProductById(randomInt.toString());
              indexForStateChange(index, p);
              carouselProducts.push(p);
              index++;
            }
          } while (carouselProducts.length < 4);
          setFeaturedCarouselProducts(carouselProducts);
          let cardProducts = [];
          do {
            let randomInt = getRandomInt(productMax);
            if (!usedProductIndexes.includes(randomInt)) {
              let currentIndexes = usedProductIndexes;
              currentIndexes.push(randomInt);
              setUsedProductIndexes(currentIndexes);
              let p = getProductById(randomInt.toString());
              indexForStateChange(index, p);
              cardProducts.push(p);
              index++;
            }
          } while (cardProducts.length < 4);
          console.log(cardProducts);
          setFeaturedCardProducts(cardProducts);
        })
        .catch(error => console.log(error));
    };
    selectRandomProducts();
  }, [usedProductIndexes]);

  const indexForStateChange = (index, product) => {
    switch (index) {
      case 0:
        import(`../../${product.photo}`).then(photo => {
          setPicOne(photo.default);
        });
        break;
      case 1:
        import(`../../${product.photo}`).then(photo => {
          setPicTwo(photo.default);
        });
        break;
      case 2:
        import(`../../${product.photo}`).then(photo => {
          setPicThree(photo.default);
        });
        break;
      case 3:
        import(`../../${product.photo}`).then(photo => {
          setPicFour(photo.default);
        });
        break;
      case 4:
        import(`../../${product.photo}`).then(photo => {
          setPicFive(photo.default);
        });
        break;
      case 5:
        import(`../../${product.photo}`).then(photo => {
          setPicSix(photo.default);
        });
        break;
      case 6:
        import(`../../${product.photo}`).then(photo => {
          setPicSeven(photo.default);
        });
        break;
      case 7:
        import(`../../${product.photo}`).then(photo => {
          setPicEight(photo.default);
        });
        break;
      default:
    }
  };

  const getImage = index => {
    switch (index) {
      case 0:
        return picOne;
      case 1:
        return picTwo;
      case 2:
        return picThree;
      case 3:
        return picFour;
      case 4:
        return picFive;
      case 5:
        return picSix;
      case 6:
        return picSeven;
      case 7:
        return picEight;
      default:
    }
  };

  function CarouselItem({ item, index }) {
    return (
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        className="itemStyle"
        spacing={3}
      >
        <Grid item xs={3} className="carouselItemHeader">
          {featuredHeaders[index]}
        </Grid>
        <Grid item xs={3}>
          <img
            className="carouselImage"
            src={getImage(index)}
            alt={item.name}
          />
        </Grid>
      </Grid>
    );
  }

  function FeaturedItem({ item, index }) {
    return (
      <Grid item xs={6} sm={3} className="homeCard">
        <Grid container justify="center" alignItems="center">
          <div className="homeCardContent">
            <div className="homeCardHeader">{featuredHeaders[index]}</div>
            <img
              className="homeCardImage"
              src={getImage(index)}
              alt={item.name}
            />
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="allContent">
      <Grid
        container
        className="homeContent"
        direction="column"
        alignItems="center"
      >
        <Grid item xl={12} className="carousel">
          <Carousel
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
              style: {
                backgroundColor: "transparent",
                color: "black",
                borderRadius: 0,
              },
            }}
            indicators={false}
          >
            {featuredCarouselProducts.map((item, i) => (
              <CarouselItem key={item.product_id} item={item} index={i} />
            ))}
          </Carousel>
        </Grid>
        <Grid
          container
          xl={12}
          spacing={3}
          justify="center"
          className="homeCards"
        >
          {featuredCardProducts.map((item, i) => (
            <FeaturedItem
              key={item.product_id}
              item={item}
              index={i + 4}
            ></FeaturedItem>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
