import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const displayProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.product}>
      <View style={styles.image}>
        <Image
          style={styles.imageUrl}
          source={{ uri: displayProduct.imageUrl }}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => dispatch(cartActions.addToCart(displayProduct))}
          />
        </View>
        <View>
          <Text style={styles.description}>{displayProduct.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
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
    )
  };
};

const styles = StyleSheet.create({
  imageUrl: {
    width: "100%",
    height: 300
  },
  details: {
    alignItems: "center",
    marginVertical: 15
  },
  description: {
    margin: 15
  }
});

export default ProductDetailScreen;
