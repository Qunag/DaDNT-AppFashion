import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SelectionModal = ({ visible, options, onSelect, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Chọn 1 phương thức</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => {
                                onSelect(option);
                                onClose();
                            }}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#6342E8",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    optionButton: {
        width: "100%",
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#6342E8",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        alignItems: "center",
    },
    optionText: {
        fontSize: 16,
        color: "#6342E8",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#6342E8",
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    closeText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});

export default SelectionModal;