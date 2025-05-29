import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10, // nut này luon lên trên cùng

  },
  anh2: {
    flex: 1,
    resizeMode: 'contain',//Ảnh sẽ được co giãn hoặc co lại để vừa khít trong khung hiển thị mà vẫn giữ nguyên tỉ lệ chiều rộng và chiều cao ban đầu.
  },
  anh4: {
    flex: 1,
    width: 414,
    height: 875,
    position: 'absolute', // Đặt ảnh này lên trên anh 1
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    top: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    top: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});