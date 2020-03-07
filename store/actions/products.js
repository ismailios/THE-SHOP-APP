import axios from "axios";

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
  return async dispatch => {
    //any async code You want , thanks for Thunk middelware

    // const response = await fetch(
    //   "https://rn-shop-b6d42.firebaseio.com/products.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       title,
    //       imageUrl,
    //       description,
    //       price
    //     })
    //   }
    // );

    axios
      .post("https://rn-shop-b6d42.firebaseio.com/products.json", {
        title,
        imageUrl,
        description,
        price
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        imageUrl,
        description,
        price
      }
    });
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
