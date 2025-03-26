import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ label, icon, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <Ionicons name={icon} size={25} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder || ''}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 15 },
    label: { fontWeight: 'bold', marginBottom: 5 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
        width: '100%',
    },
    icon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16 },
});

export default InputField;
