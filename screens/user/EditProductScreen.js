import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProductScreen = props => {
  const productId = props.navigation.getParam("productId");
  const products = useSelector(state => state.products.availableProducts);
  const editedProduct = products.find(prod => prod.id === productId);

  const [title, setTitle] = useState(productId ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    productId ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(productId ? editedProduct.price : "");
  const [description, setDescription] = useState(
    productId ? editedProduct.description : ""
  );

  const submitHandler = () => {
    console.log("submit");
  };

  useEffect(() => {
    props.navigation.setParams({
      submit: submitHandler
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title : </Text>
          <TextInput
            style={styles.formInput}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url : </Text>
          <TextInput
            style={styles.formInput}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {!productId && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price : </Text>
            <TextInput
              style={styles.formInput}
              value={price.toString()}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description : </Text>
          <TextInput
            style={styles.formInput}
            value={description}
            onChangeText={text => setDescription(text)}
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
