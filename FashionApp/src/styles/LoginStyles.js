import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topSection: { flex: 1.1, justifyContent: 'center', alignItems: 'center', width: '100%' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
    backButton: { position: 'absolute', top: 40, left: 10, zIndex: 10, padding: 10 },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    bottomSection: { flex: 1, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, alignItems: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
    forgotText: { color: '#7F00FF', fontWeight: 'bold' },
    signupContainer: { flexDirection: 'row', justifyContent: 'center' },
    signupText: { color: '#7F00FF', fontWeight: 'bold' },
});
