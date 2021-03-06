import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "../UI/Card";
const ProductItem = props => {
  let TouchableCmpt = TouchableOpacity;

  if (Platform.OS == "android" && Platform.Version >= 21) {
    TouchableCmpt = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <TouchableCmpt onPress={props.Onselect}>
        <View>
          <View style={styles.image}>
            <Image style={styles.imageUrl} source={{ uri: props.imageUrl }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableCmpt>
      <View style={styles.action}>{props.children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center"
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
    marginVertical: 4,
    fontFamily: "Karla-Regular"
  },
  price: {
    fontSize: 16,
    fontFamily: "Karla-Bold"
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
  }
});
export default ProductItem;
