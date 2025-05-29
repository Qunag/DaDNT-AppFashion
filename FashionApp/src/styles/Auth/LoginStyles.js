import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Phần trên: Ảnh nền + overlay
    topSection: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    // Tiêu đề chính
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },

    // Phần dưới: Form đăng nhập/đăng ký
    bottomSection: {
        flex: 2,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 10,
    },

    // Dòng chứa checkbox & "Quên mật khẩu"
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    forgotText: {
        color: '#7F00FF',
        fontWeight: '600',
    },

    // Phần chuyển hướng đăng ký/đăng nhập
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#7F00FF',
        fontWeight: 'bold',
    },
});
