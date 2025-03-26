import React from 'react';
import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function CheckboxField({ label, value, onValueChange }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox value={value} onValueChange={onValueChange} color={value ? '#7F00FF' : undefined} />
            <Text style={{ marginLeft: 5 }}>{label || 'No label'}</Text>
        </View>
    );
}

