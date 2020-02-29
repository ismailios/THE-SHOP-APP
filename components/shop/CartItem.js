import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CartItem = props => {
  return (
    <ScrollView>
      <View style={styles.cartItem}>
        <View style={styles.leftSide}>
          <Text style={styles.quantity}>{props.quantity}</Text>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.price}>
            <Text style={styles.price}>{props.price}</Text>
          </View>
          {props.isDeletable && (
            <TouchableOpacity onPress={props.Ondelete}>
              <Ionicons name="ios-trash" size={32} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center"
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    color: "#333",
    padding: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    padding: 10
  }
});

export default CartItem;
