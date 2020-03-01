export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId: productId
  };
};

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product: product
  };
};
