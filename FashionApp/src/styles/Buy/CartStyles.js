import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    scrollView: {
        width: '100%',
        marginBottom: 80,
    },
    header: {
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',
    },
    itemBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        width: "95%",
        position: "relative",
        marginTop: 30,
        alignSelf: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    content: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between",
    },
    colorBox: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6342E8",
    },
    collection: {
        fontSize: 12,
        color: "gray",
        marginBottom: 8,
    },
    colorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
    },
    quantityContainer: {
        position: "absolute",
        bottom: 10,
        right: 5,
    },
    checkoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6342E8",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        position: "absolute",
        bottom: 20,
        width: "90%",
        alignSelf: "center",
    },
    checkoutText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    priceContainer: {
        backgroundColor: "#4b0082",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    checkoutPrice: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
    },
});
