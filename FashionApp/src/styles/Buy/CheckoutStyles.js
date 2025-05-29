import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    infoText: {
        fontSize: 14,
        color: "#000",
        marginLeft: 10,
    },
    errorText: {
        fontSize: 14,
        color: "red",
        marginTop: 10,
    },
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "#ecf0f1",
    },
    view: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        width: "100%",
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 50,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    placeholderText: {
        fontSize: 14,
        color: "gray",
    },
    itemBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6342E8",
    },
    collection: {
        fontSize: 12,
        color: "gray",
        marginVertical: 2,
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 14,
        color: "gray",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#6342E8",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        alignItems: "center",
    },
    selectedOption: {
        backgroundColor: "#EDE7FF",
        borderColor: "#6342E8",
    },
    optionText: {
        fontSize: 16,
        flex: 1,
    },
    optionCost: {
        fontSize: 14,
        color: "#6342E8",
        marginRight: 10,
    },
    totalCostContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    totalCost: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6342E8",
    },
    costBreakdown: {
        marginTop: 10,
    },
    costDetail: {
        fontSize: 14,
        color: "gray",
    },
    terms: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
        marginTop: 10,
    },
    placeOrderButton: {
        backgroundColor: "#6342E8",
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: "#cccccc",
    },
    placeOrderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
});
