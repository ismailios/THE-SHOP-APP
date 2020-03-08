import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import Card from "../../components/UI/Card";

import { FlatList } from "react-native-gesture-handler";

const CartScreen = () => {
  const [isDeletable, setIsDeletable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const tranformedItems = [];
    for (const key in state.cart.items) {
      tranformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return tranformedItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();

  const orderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <View style={styles.summeryText}>
          <Text>
            <Text style={styles.amount}>Total :${totalAmount.toFixed(2)}</Text>
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              color={Colors.accent}
              title="Order Now"
              disabled={cartItems.length === 0}
              onPress={orderHandler}
            />
          )}
        </View>
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            price={itemData.item.productPrice}
            isDeletable
            Ondelete={() =>
              dispatch(cartActions.deleteFromCart(itemData.item.productId))
            }
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
  screen: {},
  summary: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center"
  },
  summeryText: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default CartScreen;
