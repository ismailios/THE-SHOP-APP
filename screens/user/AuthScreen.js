import React, { useReducer, useEffect, useState, useCallback } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputvalues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      ...state,
      inputvalues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

const AuthScreen = props => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputvalues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  // Function To handle inputs validities , Values ...

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const loginHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputvalues.email,
        formState.inputvalues.password
      );
    } else {
      action = authActions.signIn(
        formState.inputvalues.email,
        formState.inputvalues.password
      );
    }

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("shop");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error Occured !!", error, [{ text: "okey" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        style={styles.gradient_wrapper}
        colors={["#38ef7d", "#11998e"]}
      >
        <Card style={styles.wrapper_card}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              errorText="Please Enter a valid E-mail"
              keyboardType="email-address"
              email
              required
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <Input
              id="password"
              label="Password"
              secureTextEntry
              errorText="Please Enter a valid Password"
              keyboardType="default"
              minLength={5}
              required
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <View style={styles.btn_container}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? "Enregistrer" : "Connexion"}
                  onPress={loginHandler}
                  color={Colors.primary}
                />
              )}
            </View>
            <View style={styles.btn_container}>
              <Button
                title={`Swith To ${isSignUp ? "Connexion" : "Enregistrer"}`}
                color={Colors.primary}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  btn_container: {
    marginVertical: 10
  },
  wrapper_card: {
    width: "90%"
  }
});

export default AuthScreen;
