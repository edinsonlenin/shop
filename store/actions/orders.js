export const ADD_ORDER = "ADD_ORDER";

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
