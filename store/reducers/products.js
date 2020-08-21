import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

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
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    case ADD_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts.concat(newProduct)],
        userProducts: [...state.userProducts.concat(newProduct)],
      };
    case UPDATE_PRODUCT:
      let indexToUpdate = state.userProducts.findIndex(
        (product) => product.id === action.productData.productId
      );
      const updateProduct = new Product(
        action.productData.productId,
        state.userProducts[indexToUpdate].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[indexToUpdate].price
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[indexToUpdate] = updateProduct;
      indexToUpdate = state.availableProducts.findIndex(
        (product) => product.id === action.productData.productId
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[indexToUpdate] = updateProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updateUserProducts,
      };
  }
  return state;
};
