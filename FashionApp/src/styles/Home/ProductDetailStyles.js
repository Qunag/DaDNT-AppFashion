import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  sizeQuantity: {
    fontSize: 12,
    color: "#8A8A8A",
    marginTop: 5,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "relative",
  },
  productImage: {
    width: 200,
    height: 220,
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  brand: {
    fontSize: 16,
    color: "#8A8A8A",
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E74C3C",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  descriptionScroll: {
    maxHeight: 130, // Approximately 7 lines of text
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  quantityButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: "#333",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  colorButton: {
    margin: 8,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  sizeScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 10,
  },
  sizeButtonHorizontal: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    alignItems: "center",
    minWidth: 80,
  },
  selectedSize: {
    backgroundColor: "#6342E8",
  },
  sizeText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSizeText: {
    color: "white",
  },
  disabledSizeButton: {
    backgroundColor: "#e0e0e0",
  },
  disabledSizeText: {
    color: "#B0B0B0",
  },
  addToCartButton: {
    backgroundColor: "#6342E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 30,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  overlayTopRight: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  overlayText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  iconPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: 200,
    height: 220,
    borderColor: "#ddd",
  },
  selectedColorCircle: {
    borderWidth: 4,
    borderColor: "#6342E8", // Màu viền nổi bật
    shadowColor: "#6342E8",  // Thêm hiệu ứng shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Thêm shadow trên Android
  },
});