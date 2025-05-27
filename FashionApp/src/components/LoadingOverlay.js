// import React from "react";
// import { View, Modal, ActivityIndicator, Text, StyleSheet } from "react-native";

// const LoadingOverlay = ({ visible, text = "Đang tải..." }) => {
//     return (
//         <Modal transparent={true} animationType="fade" visible={visible}>
//             <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <ActivityIndicator size="large" color="#fff" />
//                     <Text style={styles.loadingText}>{text}</Text>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0,0,0,0.5)", // Làm mờ nền
//     },
//     modalContainer: {
//         width: 120,
//         height: 120,
//         backgroundColor: "#333",
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     loadingText: {
//         marginTop: 10,
//         color: "#fff",
//         fontSize: 14,
//     },
// });

// export default LoadingOverlay;
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

export default LoadingOverlay;
