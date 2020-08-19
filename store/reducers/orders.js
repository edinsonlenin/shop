import {ADD_ORDER} from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

const ordersReducer = (state=initialState, action) => {
  switch(action.type){
    case(ADD_ORDER):
      const newOrder = new Order(new Date().toDateString(), action.items, action.totalAmount, new Date());
      return { ...state, orders: { ...state.orders.concat(newOrder) } };
  }
  return state;
};