import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const customHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={25}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default customHeaderButton;
