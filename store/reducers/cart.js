import { ADD_TO_CART } from "../actions/cart";
import { DELETE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";

import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let updatedOrNewCartItem;
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };

    case DELETE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQte = selectedCartItem.quantity;

      let updatedCartItems;
      if (currentQte > 1) {
        //Reduce Quantity
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );

        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }

      updatedItems = { ...state.items };
      const total = state.items[action.productId].sum;
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - total
      };

    default:
      return state;
  }
};
