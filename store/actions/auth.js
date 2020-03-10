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
      throw new Error("Wrong !!");
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
      const errorResData = await response.json();
      console.log(errorResData);
      let message = "SomeThing is wrong !!";
      if (errorResData.error.message === "INVALID_EMAIL") {
        message = "Enter a valid Email";
      }
      if (errorResData.error.message === "MISSING_PASSWORD") {
        message = "Enter a valid Password";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNIN
    });
  };
};
