import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-1d043.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }

      const resData = await response.json();

      let orders = [];

      for (const key in resData) {
        orders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: FETCH_ORDERS, orders: orders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (items, totalAmount) => {
  return async dispatch => {
    const ownerId = "u1";
    const date = new Date().toISOString();
    const response = await fetch(
      "https://shop-1d043.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalAmount,
          date: date
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      order: {
        id: resData.name,
        items: items,
        totalAmount: totalAmount,
        date: date
      }
    });
  }
  };
