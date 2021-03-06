import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_PRODUCTS
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      }
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
        action.productData.id,
        action.productData.ownerId,
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
