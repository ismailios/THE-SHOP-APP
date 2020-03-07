import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProductsOverviewScreen = props => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  //DATA LOADED

  const loadedProduct = useCallback(async () => {
    console.log("yes loadedProduct");
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(productActions.fetchData());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  //Because Drawer capt in memory don't recreate them
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadedProduct
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadedProduct]);

  useEffect(() => {
    console.log("yes useEffect");
    loadedProduct();
  }, [dispatch, loadedProduct]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title
      }
    });
  };

  if (error) {
    return (
      <View style={styles.spinner}>
        <Text>An error occured !</Text>
        <Button title="Try Again !!" onPress={loadedProduct} />
      </View>
    );
  }

  if (isloading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isloading && products.length === 0) {
    return (
      <View style={styles.spinner}>
        <Text>No Products Found ....</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          Onselect={() =>
            selectItemHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            title="View Details"
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            title="Add To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
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

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
