import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const displayProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

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
          <Button color={Colors.primary} title="Add To Cart" />
        </View>
        <View>
          <Text style={styles.description}>{displayProduct.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navdata => {
  const productTitle = navdata.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle
  };
};

const styles = StyleSheet.create({
  imageUrl: {
    width: "100%",
    height: 300
  },
  details: {
    alignItems: "center"
  },
  description: {
    marginHorizontal: 15
  }
});

export default ProductDetailScreen;
