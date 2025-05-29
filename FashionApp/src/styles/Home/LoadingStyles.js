import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 150,
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});