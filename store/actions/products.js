import Product from "../../models/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId: productId
  };
};

export const fetchData = () => {
  return async dispatch => {
    const response = await fetch(
      "https://rn-shop-b6d42.firebaseio.com/products.json"
    );

    const resData = await response.json();
    //console.log(resData);

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
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async dispatch => {
    //any async code You want , thanks for Thunk middelware

    const response = await fetch(
      "https://rn-shop-b6d42.firebaseio.com/products.json",
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
    console.log(resData);

    // axios
    //   .post("https://rn-shop-b6d42.firebaseio.com/products.json", {
    //     title,
    //     imageUrl,
    //     description,
    //     price
    //   })
    //   .then(resp => {
    //     console.log(resp);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

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
