import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-1d043.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();

      let products = [];

      for (const key in resData) {
        products.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: FETCH_PRODUCTS, products: products });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-1d043.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok){
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const addProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const ownerId = "u1";
    const response = await fetch(
      "https://shop-1d043.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
          ownerId,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
        ownerId,
      },
    });
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-1d043.firebaseio.com/products/${productId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );
    if (!response.ok){
      throw new Error('Something went wrong!');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        productId,
        title,
        imageUrl,
        description
      },
    });
  };
};
