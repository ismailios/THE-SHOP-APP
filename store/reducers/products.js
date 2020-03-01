import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          prod => prod.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          prod => prod.id !== action.productId
        )
      };

    case UPDATE_PRODUCT:

    default:
      return state;
  }
};
