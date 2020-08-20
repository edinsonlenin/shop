import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const products = PRODUCTS;
const userProducts = PRODUCTS.filter((product) => product.ownerId === "u1");
const initialState = {
  availableProducts: products,
  userProducts: userProducts,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.pid),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pid),
      };
  }
  return state;
};
