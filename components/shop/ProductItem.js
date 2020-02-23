import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={styles.image}>
        <Image style={styles.imageUrl} source={{ uri: props.imageUrl }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.action}>
        <Button title="view details" onPress={props.onViewDetails} />
        <Button title="Add To Cart" onPress={props.onAddcart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
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
  image: { borderRadius: 10, overflow: "hidden" },
  imageUrl: {
    width: "100%",
    height: 300
  },
  details: {
    alignItems: "center",
    margin: 10
  },
  title: {
    fontSize: 16,
    marginVertical: 4
  },
  price: {
    fontSize: 16,
    fontWeight: "bold"
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
  }
});
export default ProductItem;
