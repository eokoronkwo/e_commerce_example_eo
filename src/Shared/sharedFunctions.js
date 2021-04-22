import products from "../Products/all.js"

export const getRandomInt = exclusiveMax => {
  return Math.floor(Math.random() * exclusiveMax);
};

export const getProductById = id => {
  return products.default.find(p => p.product_id === id)
};

export const search = str => {
  const returnedObjects = [];
  products.default.forEach(p => {
    if (p.name.includes(str)) {
      returnedObjects.push(p)
    }
  });
  return returnedObjects;
}