import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const response = await fetch(
      `https://rn-shop-b6d42.firebaseio.com/orders/${userId}.json?auth=${token}`
    );

    const resData = await response.json();
    // console.log(resData);
    let loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].items,
          resData[key].totalAmount,
          new Date(resData[key].date).toDateString()
        )
      );
    }
    // console.log(loadedOrders);

    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders
    });
  };
};

export const addOrder = (items, totalAmount) => {
  const date = new Date().toDateString();

  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-b6d42.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items,
          totalAmount,
          date
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: items,
        totalAmount: totalAmount,
        date: date
      }
    });
  };
};
