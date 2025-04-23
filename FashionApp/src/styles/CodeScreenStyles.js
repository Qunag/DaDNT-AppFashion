import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    otpContainer: {
        width: '80%',
        flexDirection: 'row',  // Đặt các ô OTP theo chiều ngang
        justifyContent: 'space-between',  // Căn đều các ô
        height: 100,
    },
    otpBox: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    otpBoxActive: {
        borderColor: '#6342E8',
    },
    resendText: {
        color: '#6342E8',
        fontSize: 16,
        marginTop: 20,
    },
    resendDisabled: {
        color: 'black',
    },
    timerText: {
        color: 'gray',
        fontSize: 14,
    }
});

