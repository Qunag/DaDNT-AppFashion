import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';

const ProductName = ({ name, style, containerWidth = 180 }) => {
    const [shouldScroll, setShouldScroll] = useState(false);
    const textRef = useRef(null);

    const handleTextLayout = (e) => {
        const { width } = e.nativeEvent.layout;
        if (width > containerWidth) {
            setShouldScroll(true);
        }
    };

    return (
        <View style={{ width: containerWidth }}>
            {shouldScroll ? (
                <TextTicker
                    style={style}
                    duration={4000}
                    loop
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={500}
                >
                    {name}
                </TextTicker>
            ) : (
                <Text
                    style={style}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    onLayout={handleTextLayout}
                    ref={textRef}
                >
                    {name}
                </Text>
            )}
        </View>
    );
};

export default ProductName;
