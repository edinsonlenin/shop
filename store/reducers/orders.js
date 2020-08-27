import { ADD_ORDER, FETCH_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.orders
      }
    case ADD_ORDER:
      const newOrder = new Order(
        action.order.id,
        action.order.items,
        action.order.totalAmount,
        action.order.date
      );
      return { ...state, orders: [...state.orders.concat(newOrder)] };
  }
  return state;
};

export default ordersReducer;
