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

  useEffect(() => {
    const selectRandomProducts = () => {
      import("../../Products/all.js")
        .then(({ default: products }) => {
          let productMax = products.length;
          let carouselProducts = [];
          do {
            let randomInt = getRandomInt(productMax);
            if (!usedProductIndexes.includes(randomInt)) {
              let currentIndexes = usedProductIndexes;
              currentIndexes.push(randomInt);
              setUsedProductIndexes(currentIndexes);
              let p = getProductById(randomInt.toString());
              carouselProducts.push(p);
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
              cardProducts.push(p);
            }
          } while (cardProducts.length < 4);
          console.log(cardProducts);
          setFeaturedCardProducts(cardProducts);
        })
        .catch(error => console.log(error));
    };
    selectRandomProducts();
  }, [usedProductIndexes]);

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
              <CarouselItem
                key={item.product_id}
                item={item}
                image={item.photo}
                index={i}
              />
            ))}
          </Carousel>
        </Grid>
        <Grid
          container
          xl={12}
          spacing={4}
          // alignItems="center"
          justify="space-evenly"
          className="homeCards"
        >
          {featuredCardProducts.map((item, i) => (
            <FeaturedItem
              key={item.product_id}
              item={item}
              image={item.photo}
              index={i + 4}
            ></FeaturedItem>
          ))}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

function CarouselItem({ item, image, index }) {
  return (
    <div className="itemStyle">
      <div className="carouselItemHeader">{featuredHeaders[index]}</div>
      <img
        className="carouselImage"
        src={require(`../../${image}`).default}
        alt={item.name}
      />
    </div>
  );
}

function FeaturedItem({ item, image, index }) {
  return (
    <Grid item xs={3} className="homeCard">
      <div className="homeCardContent">
        <div className="homeCardHeader">{featuredHeaders[index]}</div>
        <img
          className="homeCardImage"
          src={require(`../../${image}`).default}
          alt={item.name}
        />
      </div>
    </Grid>
  );
}
