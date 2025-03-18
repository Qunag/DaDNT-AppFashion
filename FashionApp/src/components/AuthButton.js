import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AuthButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7F00FF',
        padding: 15,
        borderRadius: 56,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
