export const getRandomInt = exclusiveMax => {
  return Math.floor(Math.random() * exclusiveMax);
};

export const getProductById = id => {
  let object;
  import("../Products/all.js")
    .then(({ default: products }) => {
      object = products.find(p => p.product_id === id);
    })
    .catch(res => {
      console.error(res);
      return undefined;
    });
};
