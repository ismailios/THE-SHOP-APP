import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import CartItem from "../shop/CartItem";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>${props.totalAmount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      <View>
        {showDetails && (
          <View>
            {props.items.map(cartItem => (
              <CartItem
                key={cartItem.productId}
                quantity={cartItem.quantity}
                title={cartItem.productTitle}
                price={cartItem.productPrice}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#EEE",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    backgroundColor: "#FFF",
    shadowOpacity: 0.9,
    padding: 15
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  total: {},
  date: {}
});

export default OrderItem;
