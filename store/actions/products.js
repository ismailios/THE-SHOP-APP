export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId: productId
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      imageUrl,
      description,
      price
    }
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productId: productId,
    productData: {
      title,
      imageUrl,
      description
    }
  };
};
