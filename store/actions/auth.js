import { AsyncStorage } from "react-native";

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
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId
    });

    expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expireIn * 1000)
    );
    saveDataToStorage(resData.token, resData.localId, expirationDate);
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
      type: SIGNIN,
      token: resData.idToken,
      userId: resData.localId
    });

    expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expireIn * 1000)
    );
    saveDataToStorage(resData.token, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
