import PRODUCTS from '../../data/dummy-data';

const userProducts = PRODUCTS.filter(product => product.ownerId === 'u1');

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: userProducts
};

export default (state=initialState, action) => {
    return state;
}; 