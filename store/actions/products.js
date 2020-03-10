import Product from "../../models/product";
import Axios from "axios";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = productId => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    Axios.delete(
      `https://rn-shop-b6d42.firebaseio.com/products/${productId}.json?auth=${token}`
    )
      .then(res => {
        //just for test
        //console.log(res);
      })
      .catch(err => {
        throw new error("Something goes wrong");
      });

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId
    });
  };
};

export const fetchData = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://rn-shop-b6d42.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new error("Something is wrong !!!!");
      }

      const resData = await response.json();

      // console.log(resData);

      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts
      });
    } catch (error) {
      //Traitment
      throw error;
    }
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    //any async code You want , thanks for Thunk middelware
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-b6d42.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price
      }
    });
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await Axios.patch(
      `https://rn-shop-b6d42.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        title,
        imageUrl,
        description
      }
    )
      .then(res => {
        //just for test
        //console.log(res);
      })
      .catch(err => {
        // console.log(err);
        throw new error();
      });

    dispatch({
      type: UPDATE_PRODUCT,
      productId: productId,
      productData: {
        title,
        imageUrl,
        description
      }
    });
  };
};
