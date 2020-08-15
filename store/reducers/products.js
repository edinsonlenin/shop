import PRODUCTS from '../../data/dummy-data';

const products = PRODUCTS;
const userProducts = PRODUCTS.filter(product => product.ownerId === 'u1');
console.log(products);
console.log('adsfasd');
console.log(userProducts);
const initialState = {
    availableProducts: products,
    userProducts: userProducts
};

console.log(initialState);

export default (state=initialState, action) => {
    return state;
}; 