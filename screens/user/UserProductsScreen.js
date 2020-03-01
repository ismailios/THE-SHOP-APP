import React from "react";
import { FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import * as productActions from "../../store/actions/products";

import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = () => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      renderItem={dataItem => (
        <ProductItem
          imageUrl={dataItem.item.imageUrl}
          title={dataItem.item.title}
          price={dataItem.item.price}
          onViewDetails={() => {}}
          onAddcart={() => {}}
        >
          <Button title="Edit" onPress={() => {}} />
          <Button
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(dataItem.item.id));
            }}
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
    )
  };
};

export default UserProductsScreen;
