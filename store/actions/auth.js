export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJxKkDScl1xzInbDrIKxovev2JYLmJ14Q",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      console.log("error occured !!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNUP
    });
  };
};

export const signIn = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJxKkDScl1xzInbDrIKxovev2JYLmJ14Q",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      console.log("error occured !!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNIN
    });
  };
};
