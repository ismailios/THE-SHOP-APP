import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const CartScreen = () => {
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
    return tranformedItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <View style={styles.summeryText}>
          <Text>
            <Text style={styles.amount}>${totalAmount}</Text>
          </Text>
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
  summary: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#EEE",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    backgroundColor: "#FFF",
    shadowOpacity: 0.9
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
