import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import * as productActions from "../../store/actions/products";

import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = id => {
    Alert.alert(
      "Delete ",
      "Delete Product",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch(productActions.deleteProduct(id))
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={dataItem => (
        <ProductItem
          imageUrl={dataItem.item.imageUrl}
          title={dataItem.item.title}
          price={dataItem.item.price}
          Onselect={() => editProductHandler(dataItem.item.id)}
        >
          <Button
            title="Edit"
            onPress={() => editProductHandler(dataItem.item.id)}
          />
          <Button
            title="Delete"
            onPress={() => deleteHandler(dataItem.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
