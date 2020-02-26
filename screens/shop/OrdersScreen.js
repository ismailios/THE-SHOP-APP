import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={dataItem => <Text>{dataItem.item.totalAmount}</Text>}
    />
  );
};

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders"
};

export default OrdersScreen;
