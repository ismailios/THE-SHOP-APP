import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  updateProduct
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
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
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct]
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.productId
      );
      // console.log(productIndex);

      const updatedProduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );

      // console.log(updatedProduct);

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.productId
      );
      const updatedAvailableProduct = [...state.availableProducts];
      updatedAvailableProduct[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProduct,
        userProducts: updatedUserProducts
      };

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
