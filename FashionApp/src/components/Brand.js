import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Brand() {
  return (
    <View style={styles.container}>
      {/* Nike Button */}
      <TouchableOpacity>
        <Text style={styles.text}>Nike</Text>
      </TouchableOpacity>

      {/* Adidas Button */}
      <TouchableOpacity>
        <Text style={styles.text}>Adidas</Text>
      </TouchableOpacity>

      {/* Puma Button */}
      <TouchableOpacity>
        <Text style={styles.text}>Puma</Text>
      </TouchableOpacity>

      {/* Balenciaga Button */}
      <TouchableOpacity>
        <Text style={styles.text}>Balenciaga</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 25,
  },
    text: {
    color: "black",
    fontSize: 10,
  },

});