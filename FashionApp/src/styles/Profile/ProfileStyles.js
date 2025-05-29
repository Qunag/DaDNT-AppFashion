import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  profilePanel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#6342E8",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 },
    elevation: 10,
    zIndex: 100,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 55,
    paddingVertical:10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 9,
    color: "white",
  },
  button: {
    padding: 10,
    backgroundColor: "#6342E8",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 8,
  },
});
