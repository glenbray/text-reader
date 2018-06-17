import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorMessage = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    color: "red"
  }
});

export default ErrorMessage;
