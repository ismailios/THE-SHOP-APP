import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        style={styles.gradient_wrapper}
        colors={["#38ef7d", "#11998e"]}
      >
        <Card style={styles.wrapper_card}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              errorText="Please Enter a valid E-mail"
              keyboardType="email-address"
              email
              required
              initialValue=""
              onInputChange={() => {}}
            />
            <Input
              id="password"
              label="Password"
              secureTextEntry
              errorText="Please Enter a valid Password"
              keyboardType="default"
              minLength={5}
              required
              initialValue=""
              onInputChange={() => {}}
            />
            <View style={styles.btn_container}>
              <Button title="Login" onPress={() => {}} />
            </View>
            <View style={styles.btn_container}>
              <Button title="Switch To signUp" onPress={() => {}} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  btn_container: {
    marginVertical: 10
  },
  wrapper_card: {
    width: "90%"
  }
});

export default AuthScreen;
