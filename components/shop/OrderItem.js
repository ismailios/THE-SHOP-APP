import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "../shop/CartItem";
import Card from "../UI/Card";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>
          ${props.totalAmount ? props.totalAmount.toFixed(2) : null}
        </Text>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center",
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
