import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={dataItem => (
        <OrderItem
          totalAmount={dataItem.item.totalAmount}
          date={dataItem.item.date}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders"
};

export default OrdersScreen;
