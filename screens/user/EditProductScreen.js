import React, { useState, useEffect, useCallback, useReducer } from "react";
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

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputvalues,
      [action.input]: action.value
    };
    console.log(state.inputvalues);

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    console.log(state.inputValidities);
    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    console.log(state.formIsValid);

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

  // const [title, setTitle] = useState(productId ? editedProduct.title : "");
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   productId ? editedProduct.imageUrl : ""
  // );
  // const [price, setPrice] = useState(productId ? editedProduct.price : "");
  // const [description, setDescription] = useState(
  //   productId ? editedProduct.description : ""
  // );

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

  const textChangeHandler = (text, inputIdentifier) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title : </Text>
          <TextInput
            style={styles.formInput}
            value={formState.inputvalues.title}
            onChangeText={text => textChangeHandler(text, "title")}
            keyboardType="default"
            autoCapitalize="characters"
          />
          {!formState.inputValidities.title && (
            <Text>Please fill the title</Text>
          )}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url : </Text>
          <TextInput
            style={styles.formInput}
            value={formState.inputvalues.imageUrl}
            onChangeText={text => textChangeHandler(text, "imageUrl")}
            keyboardType="default"
          />
        </View>
        {!productId && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price : </Text>
            <TextInput
              style={styles.formInput}
              value={formState.inputvalues.price.toString()}
              onChangeText={text => textChangeHandler(text, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description : </Text>
          <TextInput
            style={styles.formInput}
            value={formState.inputvalues.description}
            onChangeText={text => textChangeHandler(text, "description")}
            keyboardType="default"
          />
        </View>
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
  form: { width: "80%", backgroundColor: "#fff" },
  formControl: { margin: 20 },
  formInput: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomColor: "#222",
    borderBottomWidth: 1
  },
  label: { fontWeight: "bold" },
  form: {}
});

export default EditProductScreen;
