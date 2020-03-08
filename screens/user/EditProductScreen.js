import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import { Colors } from "react-native/Libraries/NewAppScreen";

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = props.navigation.getParam("productId");
  const products = useSelector(state => state.products.availableProducts);
  const editedProduct = products.find(prod => prod.id === productId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputvalues: {
      title: productId ? editedProduct.title : "",
      imageUrl: productId ? editedProduct.imageUrl : "",
      description: productId ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: productId ? true : false,
      imageUrl: productId ? true : false,
      description: productId ? true : false,
      price: productId ? true : false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error Occured !!", error, [
        {
          text: "OK"
        }
      ]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Error ",
        "Fill The Inputs",
        [
          {
            text: "Cancel",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (productId) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputvalues.title,
            formState.inputvalues.imageUrl,
            formState.inputvalues.description
          )
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputvalues.title,
            formState.inputvalues.imageUrl,
            formState.inputvalues.description,
            +formState.inputvalues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      //console.log(error);
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler
    });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please fill the title"
            keyboardType="default"
            autoCapitalize="characters"
            onInputChange={inputChangeHandler}
            initialValue={productId ? editedProduct.title : ""}
            initialyValid={!!productId}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please fill the Image Url"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialValue={productId ? editedProduct.imageUrl : ""}
            initialyValid={!!productId}
            required
          />
          {!productId && (
            <Input
              id="price"
              label="Price"
              errorText="Please fill the price"
              keyboardType="default"
              keyboardType="decimal-pad"
              dataDetectorTypes="phoneNumber"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please fill the Description"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={productId ? editedProduct.description : ""}
            initialyValid={!!productId}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submit = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
          onPress={submit}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: { width: "100%", backgroundColor: "#fff" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProductScreen;
