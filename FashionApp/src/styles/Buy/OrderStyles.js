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
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        paddingTop: 60,
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
    },
    itemBox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6342E8',
    },
    price: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#6342E8',
    },
});
