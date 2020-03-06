import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputvalues,
      [action.input]: action.value
    };
    // console.log(state.inputvalues);

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    //console.log(state.inputValidities);
    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    // console.log(state.formIsValid);

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

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
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

    if (productId) {
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputvalues.title,
          formState.inputvalues.imageUrl,
          formState.inputvalues.description
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputvalues.title,
          formState.inputvalues.imageUrl,
          formState.inputvalues.description,
          +formState.inputvalues.price
        )
      );
    }

    props.navigation.goBack();
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

  return (
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
  form: { width: "100%", backgroundColor: "#fff" }
});

export default EditProductScreen;
