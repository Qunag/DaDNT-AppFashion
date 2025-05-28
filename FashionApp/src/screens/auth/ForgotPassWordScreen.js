// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import InputField from '../../components/InputField';
// import AuthButton from '../../components/AuthButton';
// import { forgotPassword } from '../../services/authService';
// // import styles from '../../styles/ForgotPasswordStyles';
// import { StyleSheet } from 'react-native';
// import { COLORS, SIZES, FONTS } from '../../constants/theme';
// import BackButton from '../../components/BackButton';

// export default function ForgotPasswordScreen() {
//     const [email, setEmail] = useState('');
//     const navigation = useNavigation();

//     const handleForgotPassword = async () => {
//         if (!email.trim()) {
//             Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ.');
//             return;
//         }

//         try {
//             await forgotPassword(email);
//             Alert.alert('Thành công', 'Một mật khẩu mới đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến của bạn');
//             navigation.navigate('Login');
//         } catch (error) {
//             Alert.alert('Lỗi', error.message || 'Không đặt lại được mật khẩu. Vui lòng thử lại.');
//         }
//     };

//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//         <View style={styles.container}>
//             <ImageBackground source={require('../../assets/anh2.png')} style={styles.topSection}>
//                 <BackButton/>
//                 <View style={styles.overlay} />
//                 <Text style={styles.welcomeText}>Quên mật khẩu</Text>
//             </ImageBackground>

//             <View style={styles.bottomSection}>
//                 <Text style={styles.instructionText}>
//                     Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
//                 </Text>
//                 <InputField
//                     label="Địa chỉ Email"
//                     icon="mail-outline"
//                     placeholder="Enter email"
//                     keyboardType="email-address"
//                     value={email}
//                     onChangeText={setEmail}
//                     autoCapitalize="none"
//                 />
//                 <AuthButton title="GỬI LIÊN KẾT ĐẶT LẠI" onPress={handleForgotPassword} />
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                     <Text style={styles.signupText}>Quay lại đăng nhập</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//         </TouchableWithoutFeedback>
//     );
// }


// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: COLORS.white },
//     topSection: { flex: 1.2, justifyContent: 'center', alignItems: 'center', width: '100%' },
//     overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
//     backButton: { position: 'absolute', top: 40, left: 10, zIndex: 10, padding: 10 },
//     welcomeText: { fontSize: 24, fontWeight: 'bold', color: COLORS.white, textAlign: 'center' },
//     bottomSection: {
//         flex: 1.8,
//         backgroundColor: COLORS.white,
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         padding: SIZES.padding,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: -3 },
//         shadowRadius: 10,
//     },
//     instructionText: { fontSize: SIZES.font, marginBottom: 20, textAlign: 'center' },
//     signupText: { color: COLORS.primary, fontWeight: 'bold', marginTop: 15 },
// });



import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import { forgotPassword } from '../../services/authService';
import { COLORS, SIZES } from '../../constants/theme';
import BackButton from '../../components/BackButton';
import Toast from 'react-native-toast-message';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Vui lòng nhập email hợp lệ.',
            });
            return;
        }

        try {
            await forgotPassword(email);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Mật khẩu mới đã được gửi đến email của bạn.',
            });
            navigation.navigate('Login');
        } catch (error) {
            const isNetworkError =
                error.message?.includes('Network') ||
                error.message?.includes('network');

            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: isNetworkError
                    ? 'Không có kết nối mạng. Vui lòng kiểm tra lại Internet.'
                    : error.message || 'Không đặt lại được mật khẩu. Vui lòng thử lại.',
            });
        }
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../../assets/anh2.png')}
                        style={styles.topSection}
                    >
                        <BackButton />
                        <View style={styles.overlay} />
                        <Text style={styles.welcomeText}>Quên mật khẩu</Text>
                    </ImageBackground>

                    <View style={styles.bottomSection}>
                        <Text style={styles.instructionText}>
                            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
                        </Text>
                        <InputField
                            label="Địa chỉ Email"
                            icon="mail-outline"
                            placeholder="Enter email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                        <AuthButton
                            title="GỬI LIÊN KẾT ĐẶT LẠI"
                            onPress={handleForgotPassword}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signupText}>Quay lại đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {/* Toast phải được hiển thị ở cuối màn hình */}
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
    },
    bottomSection: {
        flex: 1.8,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: SIZES.padding,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 10,
    },
    instructionText: {
        fontSize: SIZES.font,
        marginBottom: 20,
        textAlign: 'center',
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 15,
    },
});

