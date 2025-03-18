// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/LoginStyles';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Hello, Welcome to Home!</Text>
            <Text style={{ fontSize: 18, marginVertical: 20 }}>
                You have successfully logged in.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TestLoginScreen')}
            >
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}