import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const amountPrice = useSelector(state => state.cart.totalAmount);

  useEffect(() => {
    props.navigation.setParams({
      amountPrice: amountPrice
    });
  }, [amountPrice]);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onAddcart={() => dispatch(cartActions.addToCart(itemData.item))}
          onViewDetails={() =>
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title
              }
            })
          }
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  let amountPrice = navData.navigation.getParam("amountPrice");
  let formattedPrice = 0;
  if (amountPrice) {
    formattedPrice = amountPrice.toFixed(2);
  }
  return {
    headerTitle: "All Products",
    headerRight: (
      <View>
        <Text>${formattedPrice}</Text>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {}}
          />
        </HeaderButtons>
      </View>
    )
  };
};

export default ProductsOverviewScreen;
