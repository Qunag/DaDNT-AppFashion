import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    Alert,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { fetchOrders, cancelOrder, confirmOrder, createOrder } from '../../services/orderService';

const NoticeOrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

    // Lấy thông tin người dùng và đơn hàng
    const loadData = async () => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('accessToken');
            const decodedToken = jwtDecode(accessToken);
            const id = decodedToken.sub || decodedToken.userId || decodedToken.id || decodedToken.user;
            if (!id) {
                throw new Error('Không tìm thấy userId trong token');
            }
            setUserId(id);

            // Tải danh sách đơn hàng
            const ordersData = await fetchOrders(id);
            setOrders(ordersData);
            setError(null);
        } catch (err) {
            if (err.message.includes('không có quyền')) {
                setError('Bạn không có quyền truy cập danh sách đơn hàng.');
            } else if (err.message.includes('đăng nhập') || err.message.includes('token')) {
                setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            } else {
                setError(err.message || 'Không thể tải danh sách đơn hàng. Vui lòng thử lại.');
            }
            console.error('Error in loadData:', err);
        } finally {
            setLoading(false);
        }
    };

    // Tải dữ liệu khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [navigation])
    );

    // Hủy đơn hàng
    const handleCancelOrder = async (orderId) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn hủy đơn hàng này?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            setCancelLoading(true);
                            await cancelOrder(orderId);
                            Alert.alert('Thành công', 'Đơn hàng đã được hủy!');
                            loadData();
                        } catch (err) {
                            Alert.alert('Lỗi', err.message || 'Không thể hủy đơn hàng.');
                        } finally {
                            setCancelLoading(false);
                        }
                    },
                },
            ]
        );
    };

    // Xác nhận nhận hàng
    const handleConfirmOrder = async (orderId) => {
        Alert.alert(
            'Xác nhận',
            'Bạn đã nhận được hàng?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            setConfirmLoading(true);
                            await confirmOrder(orderId);
                            Alert.alert('Thành công', 'Xác nhận nhận hàng thành công!');
                            loadData();
                        } catch (err) {
                            Alert.alert('Lỗi', err.message || 'Không thể xác nhận.');
                        } finally {
                            setConfirmLoading(false);
                        }
                    },
                },
            ]
        );
    };

    // Component hiển thị mỗi đơn hàng
    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
        >
            <Text style={styles.orderText}>Mã đơn: {item._id}</Text>
            <Text style={styles.orderText}>Ngày đặt: {new Date(item.createdAt).toLocaleDateString('vi-VN')}</Text>
            <Text style={styles.orderText}>Tổng tiền: {item.totalAmount?.toLocaleString('vi-VN')} VND</Text>
            <Text style={styles.orderText}>Trạng thái: {getStatusText(item.status)}</Text>
            <View style={styles.buttonContainer}>
                {item.status === 'pending' && (
                    <Button
                        title="Hủy đơn"
                        color="red"
                        onPress={() => handleCancelOrder(item._id)}
                        disabled={cancelLoading}
                    />
                )}
                {item.status === 'shipped' && (
                    <Button
                        title="Xác nhận nhận hàng"
                        color="green"
                        onPress={() => handleConfirmOrder(item._id)}
                        disabled={confirmLoading}
                    />
                )}
            </View>
        </TouchableOpacity>
    );

    // Hàm chuyển trạng thái sang tiếng Việt
    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Đang chờ xử lý',
            shipped: 'Đang giao hàng',
            delivered: 'Đã giao hàng',
            cancelled: 'Đã hủy',
        };
        return statusMap[status] || status;
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Thử lại" onPress={loadData} />
                {error.includes('đăng nhập') && (
                    <Button
                        title="Đăng nhập"
                        onPress={() => navigation.replace('LoginScreen')}
                    />
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Danh sách đơn hàng</Text>
            {orders.length === 0 ? (
                <Text style={styles.emptyText}>Chưa có đơn hàng nào!</Text>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    list: {
        paddingBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default NoticeOrderScreen;