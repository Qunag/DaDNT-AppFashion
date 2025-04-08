import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = ({ count }) => {
    if (!count || count <= 0) return null;

    return (
        <View style={styles.badge}>
            <Text style={styles.text}>
                {count > 9 ? '9+' : count}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        minWidth: 18,
        zIndex: 10,
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default Notification;
