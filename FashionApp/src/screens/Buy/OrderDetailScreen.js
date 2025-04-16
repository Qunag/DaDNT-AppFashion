import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    Image
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchOrderDetail } from '../../services/orderService';

const OrderDetailScreen = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { orderId } = route.params;

    const loadOrderDetail = async () => {
        try {
            setLoading(true);
            const data = await fetchOrderDetail(orderId);
            setOrder(data);
            setError(null);
        } catch (err) {
            console.error('Error loading order detail:', err.message);
            if (err.message.includes('đăng nhập')) {
                Alert.alert('Lỗi', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.', [
                    { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
                ]);
            } else {
                setError(err.message || 'Không thể tải chi tiết đơn hàng.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadOrderDetail();
        setRefreshing(false);
    };

    useEffect(() => {
        loadOrderDetail();
    }, [orderId]);

    const getStatusText = (status) => {
        const statusMap = {
            pending: 'Đang chờ xử lý',
            shipped: 'Đang giao hàng',
            delivered: 'Đã giao hàng',
            cancelled: 'Đã hủy',
        };
        return statusMap[status] || status;
    };

    const renderOrderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
                Sản phẩm: {item.productId?.name || 'Không xác định'}
            </Text>
            <Text style={styles.itemText}>Số lượng: {item.quantity}</Text>
            <Text style={styles.itemText}>
                Giá: {item.price?.toLocaleString('vi-VN')} VND
            </Text>
            <Text style={styles.itemText}>Kích cỡ: {item.size}</Text>
            <Image source={{ uri: item.image_url }} style={styles.image} />
        </View>
    );

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
                <TouchableOpacity style={styles.retryButton} onPress={loadOrderDetail}>
                    <Text style={styles.retryButtonText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!order) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Không tìm thấy đơn hàng.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
            <View style={styles.orderInfo}>
                <Text style={styles.infoText}>Mã đơn: {order._id}</Text>
                <Text style={styles.infoText}>
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </Text>
                <Text style={styles.infoText}>
                    Tổng tiền: {order.totalAmount?.toLocaleString('vi-VN')} VND
                </Text>
                <Text style={styles.infoText}>Trạng thái: {getStatusText(order.status)}</Text>
            </View>
            <Text style={styles.subtitle}>Danh sách sản phẩm</Text>
            <FlatList
                data={order.items}
                renderItem={renderOrderItem}
                keyExtractor={(item, index) => `${item.productId?._id}-${index}`}
                contentContainerStyle={styles.itemList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    orderInfo: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemList: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default OrderDetailScreen;