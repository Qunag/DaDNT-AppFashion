import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topSection: { flex: 1.5, justifyContent: 'center', alignItems: 'center' },
    overlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)' },
    welcomeText: { fontSize: 28, color: 'white', fontWeight: 'bold', marginTop: 20 },
    bottomSection: { flex: 2, padding: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    forgotText: { color: '#7F00FF', fontWeight: '600' },
    signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    signupText: { color: '#7F00FF', fontWeight: 'bold' },
});
