

# Đồ án Đa nền tảng - Cửa hàng bán giày online


# I. Khái quát về đề tài 
## 1. Giới thiệu đề tài

Ứng dụng bán giày online được phát triển nhằm hỗ trợ người dùng mua sắm giày dễ dàng thông qua thiết bị di động. Ứng dụng cho phép:
- Xem danh sách sản phẩm
- Tìm kiếm, lọc sản phẩm theo thương hiệu, giá, màu sắc, size
- Thêm vào giỏ hàng, đặt hàng
- Quản lý thông tin cá nhân, đơn hàng

## 2. Công nghệ sử dụng

- **Frontend**: React Native
- **Backend**: NodeJS + Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Token)
- **Các thư viện hỗ trợ**:
  - React Navigation
  - Axios
  - Mongoose
  - bcryptjs
  - dotenv
  - cors

## 3. Phân tích hệ thống

### 3.1 Đối tượng sử dụng
- Người mua giày (end-users)

### 3.2 Các chức năng chính
- Đăng ký, đăng nhập
- Xem danh sách sản phẩm
- Xem chi tiết sản phẩm
- Thêm sản phẩm vào giỏ hàng
- Đặt hàng
- Theo dõi đơn hàng

## 4. Thiết kế hệ thống

### 4.1 Kiến trúc tổng thể
- Ứng dụng theo mô hình **Client-Server**.
- **Backend NodeJS** phục vụ **API RESTful** cho **React Native App**.

### 4.2 Sơ đồ kiến trúc

```bash 
React Native (Mobile App) ---> API Server (NodeJS + Express) ---> MongoDB (Database) 
```

### 4.3 Thiết kế cơ sở dữ liệu
Các bảng (collection) chính:
- `users`
- `products`
- `carts`
- `orders`
- `tokens`

Ví dụ: 
```javascript
// Schema Product (product.model.js)
const sizeSchema = new mongoose.Schema({
  size: Number,      
  quantity: Number,
});

const colorSchema = new mongoose.Schema({
  color_name: String,    
  image_url: String,
  sizes: [sizeSchema],
});

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  colors: [colorSchema],
  discription: String,

});
```

### 4.4 Thiết kế giao diện
- Màn hình đăng nhập/đăng ký

- Màn hình danh sách sản phẩm

- Màn hình chi tiết sản phẩm

- Màn hình giỏ hàng

- Màn hình đặt hàng


## 5. Triển khai hệ thống
### 5.1 Backend (NodeJS + Express)

- Tạo các API cơ bản :
  - `/api/auth/` : Đăng ký, đăng nhập , Xác thực , ...

  - `/api/users/` : Chỉnh sửa , cập nhật thông tin người dùng , ...

  - `/api/products/` : Xem danh sách sản phẩm , chi tiết sản phẩm , ...

  - `/api/carts/` : Xem giỏ hàng , thêm sản phẩm vào giỏ hàng , ...

  - `/api/orders/` : Đặt hàng , theo dõi đơn hàng , ...

- Bảo mật **API* bằng **JWT*

- Sử dụng middleware `auth.js` để xác thực

- 



### 5.2 Frontend (React Native)

- Thiết kế các màn hình với ReactNative

- Gọi API bằng `Axios`

- Lưu token vào `AsyncStorage` để duy trì đăng nhập.

Ví dụ đoạn code gọi API lấy sản phẩm:
```javascript
import axios from 'axios';

const fetchProducts = async () => {
  const res = await axios.get('https://yourserver.com/api/products');
  return res.data;
};

```

# II. Triển khai hệ thống FrontEnd



## 1. Mục tiêu , Kiến trúc tổng quan
- Mục tiêu của phần frontend là xây dựng một ứng dụng bán giày thân thiện với người dùng, chạy mượt trên cả Android và iOS, cung cấp đầy đủ tính năng như:

  - Xem danh sách sản phẩm

  - Xem chi tiết sản phẩm

  - Tìm kiếm và lọc sản phẩm

  - Thêm vào giỏ hàng

  - Thanh toán (checkout)

  - Xem lịch sử đơn hàng

  - Đăng ký, đăng nhập, đăng xuất


- Frontend được xây dựng bằng **ReactNative** sử dụng kiến trúc component-based phân chia theo tính năng :
  - `screens/` : Chứa các tệp phân loại các màn hình như (Auth , Buy , Home , v.v.)

  - `component/` : Các component dùng chung như Header , Button , v.v

  - `services/` : Chứa các hàm gọi API (axios)

  - `constant/` : Chứa các hàm không thường xuyên thay đổi như API_ENDPOINT , themes , v.v.

  - `assets/` : ảnh hệ thống


- Cấu trúc thư mục :
``` bash
├── App.js\
├── assets\
├── components\
├── screens\
├── services\
├── styles\
├── package-lock.json\
└── ...
```
- Quick Start




## 2. Các thư viện chính 

| Thư viện | Mục đích |
|----------|----------|
| `react-navigation` | Điều hướng giữa các màn hình |
| `axios` | Gửi yêu cầu HTTP tới server backend |
| `react-native-vector-icons` | Icon |
| `formik`, `yup` | Quản lý form và xác thực dữ liệu |
| `@react-native-async-storage/async-storage` | Lưu trữ dữ liệu cục bộ |
| `react-native-dotenv` | Quản lý biến môi trường |

## 3. Thiết kế UI
- Thiết kế sử dụng `Flexbox` , `ScrollView` , `TouchableOpacity` , `FlatList` để hiển thị danh sách động

- Áp dụng `theme` nhất quán (màu sắc , cỡ chữ )

- `Responsive` cho các kích thước màn hình

***MỘT SỐ MÀN HÌNH CHÍNH*** :

  - *Auth* :  
    - `LoginScreen` : Màn hình đăng nhập 
    - `RegisterScreen` : Màn hình đăng kí tài khoản
    - `ForgotPassWordScreen` : Màn hình quên mật khẩu
    - v.v.
  - *Home* :
    - `HomeScreen` :  Hiển thị danh sách giày
    - `ProductDetailScreen` : Chi tiết sản phẩm (thông tin , màu sắc , giá bán , ... )
    - v.v.
  - *Buy* :
    - `CartScreen` : danh sách sản phẩm
    - `CheckoutScreen` : thông tin giao hàng và đặt hàng
    - `OrderScreen` : Chứa các đơn hàng mà người dùng đã đặt
    - v.v.
  - *Profile* : 
    - `ProfileScreen` : Thông tin của người dùng
    - `EditProfileScreen` : Sửa thông tin của người dùng
    - v.v
## 4. Navigation

Sử dụng **React NAvigation v6** với `Stack.Navigator` và `BottomTab.Navigator`

Ví dụ : 
``` javascript
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 5. Giao tiếp với BackEnd 

Tạo các API_ENDPOINTS là định dạng các đường dẫn của các route backend . Ví Dụ :

```javascript
const API_URL = "http://localhost:3000/v1";

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: `${API_URL}/auth/register`,
        LOGIN: `${API_URL}/auth/login`,
        LOGOUT: `${API_URL}/auth/logout`,
        REFRESH_TOKENS: `${API_URL}/auth/refresh-tokens`,
        FORGOT_PASSWORD: `${API_URL}/auth/forgot-password`,
    },
    USERS: {
        BASE: `${API_URL}/users`,
        DETAIL: (userId) => `${API_URL}/users/${userId}`,
        UPDATE: (userId) => `${API_URL}/users/${userId}`,
        DELETE: (userId) => `${API_URL}/users/${userId}`,
    },
    PRODUCTS: {
        BASE: `${API_URL}/products`,
        DETAIL: (productId) => `${API_URL}/products/${productId}`,
        SEARCH: `${API_URL}/products/search`,
    },
    CARTS: {
        BASE: `${API_URL}/carts`,
        DETAIL: (userId) => `${API_URL}/carts/${userId}`,
        CREATE: `${API_URL}/carts`,
        ADD_ITEM: `${API_URL}/carts/add`,
        UPDATE_ITEM: (productId) => `${API_URL}/carts/item/${productId}`,
    },
    ORDERS: {
        BASE: `${API_URL}/orders`,
        DETAIL: (orderId) => `${API_URL}/orders/${orderId}`,
        CREATE: `${API_URL}/orders/create`,
        UPDATE_STATUS: (orderId) => `${API_URL}/orders/update-status/${orderId}`,
        CANCEL: (orderId) => `${API_URL}/orders/cancel/${orderId}`,
        CONFIRM: (orderId) => `${API_URL}/orders/confirm/${orderId}`,
    },
};
```

và ta có thể gọi từng services bằng cách tạo các file `cartService.js` , `productService.js` , `authService` , ... dùng Axios gọi API backend NodeJS .

Ví dụ thêm sản phẩm vào giỏ hàng :

``` javascript
//services/authService.js
export const registerUser = async (name, email, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed.';
        throw new Error(message);
    }

};

```

## 6. Xử lý xác thực

- Lưu token vào `AsyncStorage` sau khi login

- Dùng token để gọi các API yêu cầu xác thực như (giỏ hàng , đơn hàng)

Ví dụ
```javascript 

// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  const res = await axios.post('/auth/login', { email, password });
  await AsyncStorage.setItem('refreshToken', res.data.token);
  return res.data;
};

```

## 7. Trải nghiệm người dùng (User Experience - UX)

Ứng dụng đặc biệt chú trọng đến trải nghiệm người dùng trong toàn bộ quá trình sử dụng từ việc truy cập, xem sản phẩm, chọn hàng cho đến thanh toán. Một số yếu tố được chú ý:

###  Phản hồi tức thì

- Sử dụng **ActivityIndicator** (spinner) để hiển thị trong lúc tải dữ liệu từ API, giúp người dùng biết hệ thống đang xử lý.
- Khi người dùng thực hiện hành động như "thêm vào giỏ hàng", "đặt hàng", hoặc "đăng nhập thành công", ứng dụng hiển thị thông báo (`Toast`, `Alert`) để phản hồi nhanh.

###  Quản lý lỗi thân thiện

- Các lỗi như mất mạng, sai thông tin đăng nhập hoặc lỗi từ server đều được xử lý gọn gàng với thông báo dễ hiểu.
- Tránh tình trạng crash app hoặc hiện lỗi thô từ server ra giao diện.

###  Tối ưu thao tác

- Tự động focus vào ô tiếp theo khi điền thông tin đăng ký/đăng nhập.
- Nút "Đăng nhập" và "Thêm vào giỏ hàng" sẽ tự động vô hiệu hóa trong lúc đang xử lý để tránh click nhiều lần.

###  Tương thích với nhiều thiết bị

- Dùng `ScrollView` bọc các form để đảm bảo không bị che bởi bàn phím trên iOS/Android.
- Thiết kế phản hồi tốt với các kích thước màn hình khác nhau (responsive).

###  Cảm nhận thị giác (UI friendly)

- Sử dụng màu sắc nổi bật cho hành động chính (primary action), ví dụ: nút “Mua ngay” màu cam, “Thêm vào giỏ” màu xanh.
- Font chữ rõ ràng, kích thước phù hợp, hình ảnh sản phẩm được crop gọn đẹp.
- Hiển thị rating, brand, size, màu sắc dễ nhìn.

###  Giao diện hiện đại

- Sử dụng các biểu tượng (`react-native-vector-icons`) cho trải nghiệm trực quan (ví dụ: giỏ hàng, mắt xem mật khẩu, lọc,...)
- Các hiệu ứng nhỏ như khi nhấn nút (opacity, scale) làm cảm giác mượt mà hơn.

---

## 8. Hạn chế hiện tại và đề xuất cải tiến

| **Hạn chế** | **Mô tả chi tiết** | **Đề xuất cải tiến** |
|------------|---------------------|------------------------|
|  Thiếu chế độ Dark Mode | Người dùng sử dụng buổi tối có thể bị chói mắt do nền trắng sáng | Áp dụng dynamic theme sử dụng context/theme provider |
|  Chưa có xác thực 2 bước (2FA) | Tài khoản có thể bị truy cập nếu rò rỉ token | Bổ sung xác minh OTP qua email hoặc SMS khi đăng nhập |
|  Bộ lọc còn cơ bản | Người dùng chỉ có thể tìm kiếm sản phẩm theo tên | Thêm tính năng lọc nâng cao: theo giá, màu sắc, size, thương hiệu |
|  Chưa có gợi ý sản phẩm liên quan | Không có phần “Bạn có thể thích” ở cuối trang sản phẩm | Dùng ML hoặc đơn giản lọc theo brand, category |
|  Không có push notification | Người dùng không được báo khi đơn hàng thay đổi hoặc có ưu đãi | Tích hợp Firebase Cloud Messaging để gửi thông báo |
|  Lịch sử tìm kiếm không được lưu | Người dùng không thể xem lại các từ khóa đã từng tìm | Lưu vào AsyncStorage hoặc backend để gợi ý lại |
|  Không có hình thức thanh toán đa dạng | Chỉ có hình thức “thanh toán khi nhận hàng” | Thêm cổng thanh toán như Momo, VNPay, Stripe,... |
|  Thiếu đa ngôn ngữ | Ứng dụng chỉ hỗ trợ tiếng Việt | Thêm i18n để hỗ trợ nhiều ngôn ngữ khác như English |
|  Giỏ hàng chưa đồng bộ đa thiết bị | Nếu đăng nhập trên nhiều máy, giỏ hàng không đồng bộ | Lưu giỏ hàng trên backend, đồng bộ theo userId/token |

---





 




















# III. Triển khai hệ thống Backend 

## 1. Quick Start

Để tạo một dự án, chỉ cần chạy:

```bash
npx create-nodejs-express-app <project-name>
```

hoặc

```bash
npm init nodejs-express-app <project-name>
```

## 2. Cài đặt thủ công

Nếu bạn vẫn muốn tự cài đặt thủ công, hãy làm theo các bước sau:

Clone repo:

```bash
git clone --depth 1 https://github.com/Qunag/DaDNT-AppFashion.git
cd DaDNT-AppFashion
npx rimraf ./.git
```

Cài đặt các phụ thuộc ( dependencies ):

```bash
yarn install
```
or
```bash
npm install 
```

cài đặt biến môi trường :

```bash
cp .env.example .env

# mở .env và sửa biến môi trường (nếu cần)
```

## 3. Table of Contents

- [Features](#4features)
- [Commands](#5commands)
- [Environment Variables](#6-biến-môi-trường)
- [Project Structure](#7-project-structure)
- [API Documentation](#8-api-documentation)
- [Error Handling](#9-error-handling)
- [Validation](#10-validation)
- [Authentication](#11-authentication)
- [Authorization](#12-authorization)
- [Logging](#13-logging)
- [Custom Mongoose Plugins](#14-custom-mongoose-plugins)


## 4.Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) mô hình hóa dữ liệu đối tượng sử dụng [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: Sử dụng [passport](http://www.passportjs.org)
- **Validation**: xác thực dữ liệu yêu cầu bằng [Joi](https://github.com/hapijs/joi)
- **Logging**: sử dụng [winston](https://github.com/winstonjs/winston) và [morgan](https://github.com/expressjs/morgan)
- **Testing**: kiểm thử đơn vị và tích hợp sử dụng [Jest](https://jestjs.io)
- **Error handling**: cơ chế xử lý lỗi tập trung
- **API documentation**: với [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) và  [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: quản lý quy trình sản xuất nâng cao sử dụng [PM2](https://pm2.keymetrics.io)
- **Dependency management**: với [npm](https://www.npmjs.com/)
- **Environment variables**: sử dụng [dotenv](https://github.com/motdotla/dotenv) và [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: thiết lập các header HTTP bảo mật bằng [helmet](https://helmetjs.github.io)
- **Santizing**: lọc dữ liệu yêu cầu để chống lại xss và tấn công injection query
- **CORS**: Chia sẻ tài nguyên khác nguồn (Cross-Origin Resource-Sharing) được kích hoạt bằng [cors](https://github.com/expressjs/cors)


## 5.Commands

Chạy cục bộ:

```bash
npm run dev
```

Chạy trong môi trường production:

```bash
npm start
```

Testing:

```bash
# chạy tất cả test
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:prod

# run all tests in a docker container
npm run docker:test
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## 6. Biến môi trường

Các biến môi trường có thể được tìm thấy và sửa đổi trong tệp `.env`. Chúng đi kèm với các giá trị mặc định sau:

```bash
NODE_ENV =  development
#port number
port = 3000

#JWT
#Khóa bảo mật JWT
JWT_SECRET = 123456
# Số phút sau khi accesstoken hết hạn 
JWT_ACCESS_EXPIRATION_MINUTES=30
# Số ngày sau đó refresh token hết hạn
JWT_REFRESH_EXPIRATION_DAYS=30
# Số phút sau đó token đặt lại mật khẩu hết hạn
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Số phút sau đó token xác minh email hết hạn
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

#URL of MongoDBAtlas
MONGODB_URL=

# Các tùy chọn cấu hình SMTP cho dịch vụ email
# Để thử nghiệm, bạn có thể sử dụng một dịch vụ SMTP giả lập như Ethereal: https://ethereal.email/create
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=mqunagsk1510@gmail.com
SMTP_PASSWORD=123456
EMAIL_FROM=mqunagsk1510@gmail.com
```

## 7. Project Structure

```
src\
 |--config\         # Biến môi trường và những cài liên quan đến cấu hình
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger 
 |--middlewares\    # Các middleware express tùy chỉnh
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Các lớp và hàm tiện ích
 |--validations\    # Các lược đồ xác thực dữ liệu yêu cầu
 |--app.js          # Express app
 |--index.js        # App entry point
```

## 8. API Documentation

Để xem danh sách các API có sẵn và thông số kỹ thuật của chúng, hãy chạy máy chủ và truy cập `http://localhost:3000/v1/docs` trong trình duyệt của bạn. Trang tài liệu này được tạo tự động bằng cách sử dụng các định nghĩa swagger được viết dưới dạng nhận xét trong các tệp định tuyến.

### 8.1 API Endpoints

Danh sách các tuyến đường có sẵn:

**Auth routes**:\

`POST /v1/auth/register` - đăng kí\
`POST /v1/auth/login` - dăng nhập\
`POST /v1/auth/refresh-tokens` - refresh tokens xác thực\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - gửi verification email\
`POST /v1/auth/verify-email` - verify email\
`POST /v1/auth/send-otp` - gửi otp\
`POST /v1/auth/verify-otp` - verify otp\


**User routes**:\

`POST /v1/users` - tạo user mới\
`GET /v1/users` - lấy tất cả users\
`GET /v1/users/:userId` - lấy 1 user\
`PATCH /v1/users/:userId` - cập nhật user\
`DELETE /v1/users/:userId` - xóa user

**Product routes**\

- manageProducts\
`POST /v1/products/create ` - tạo sản phẩm mới\
`PATCH /v1/products/:productId` - cập nhật thông tin sản phẩm\
`DELETE /v1/products/:productId` - Xóa sản phẩm\


- user\
`GET /v1/products/` - lấy tất cả sản phẩm\
`GET /v1/products/filter` - Lọc sản phẩm theo thuộc tính\
`GET /v1/products/search` - Tìm kiếm theo tên sản phẩm\

**Cart routes**\

`POST /v1/carts/` - tạo giỏ hàng\
`GET /v1/carts/` - Lấy giỏ hàng của user\
`PATCH /v1/carts/` - cập nhật giỏ hàng\
`DELETE /v1/carts/` -Xóa giỏ hàng\

`GET-PATCH-DELETE /v1/carts/item/:productId` - quản lý sản phẩm trong giỏ hàng (lấy , sửa, xóa sản phẩm)\

`POST /v1/carts/ádd` - thêm sản phẩm và giỏ hàng\


**Order routes**\

- user

`GET /v1/orders/` - Lấy tất cả orders của người dùng\
`POST /v1/orders/create` - Tạo orders mới cho từng người dùng\
`GET /v1/orders/:orderId` - Lấy thông tin của từng orders\
`PATCH /v1/orders/cancel/:orderId` - Hủy đơn hàng 

- admin

`PATCH v1/orders/update-status/:orderId` - Cập nhật trạng thái orders\



## 9. Error Handling

Ứng dụng có một cơ chế xử lý lỗi tập trung.

Các controller cố gắng bắt lỗi và chuyển chúng đến middleware xử lý lỗi (bằng cách gọi next(error)). Để thuận tiện, bạn cũng có thể bọc controller bên trong trình bao bọc tiện ích catchAsync, trình này sẽ chuyển tiếp lỗi.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

Middleware xử lý lỗi sẽ gửi một phản hồi lỗi, có định dạng như sau:

```json
{
  "code": 404,
  "message": "Not found"
}
```

Khi chạy ở chế độ phát triển, phản hồi lỗi cũng chứa stack lỗi.

Ứng dụng có một lớp tiện ích ApiError mà bạn có thể gắn mã phản hồi và thông báo, sau đó ném nó từ bất cứ đâu (catchAsync sẽ bắt nó).

Ví dụ: nếu bạn đang cố gắng lấy một người dùng từ DB không tìm thấy và bạn muốn gửi lỗi 404, mã sẽ trông như sau:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## 10. Validation

Dữ liệu yêu cầu được xác thực bằng [Joi](https://joi.dev/). Xem [documentation](https://joi.dev/api/) để biết thêm chi tiết về cách viết lược đồ xác thực Joi..

Các lược đồ xác thực được định nghĩa trong thư mục `src/validations` và được sử dụng trong các tuyến đường bằng cách cung cấp chúng làm tham số cho `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## 11. Authentication

Để yêu cầu xác thực cho một số tuyến nhất định, bạn có thể sử dụng `auth` middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth(), userController.createUser);
```

Các routes này yêu cầu mã thông báo truy cập JWT hợp lệ trong tiêu đề yêu cầu Authorization bằng lược đồ Bearer. Nếu yêu cầu không chứa mã thông báo truy cập hợp lệ, lỗi Unauthorized (401) sẽ được đưa ra.

**Generating Access Tokens**:

Mã truy cập có thể được tạo bằng cách thực hiện thành công lệnh gọi đến các điểm cuối đăng ký (`POST /v1/auth/register`) hoặc đăng nhập (`POST /v1/auth/login`). Phản hồi của các điểm cuối này cũng chứa mã làm mới (được giải thích bên dưới).

Mã thông báo truy cập có giá trị trong 30 phút. Bạn có thể sửa đổi thời gian hết hạn này bằng cách thay đổi biến môi trường `JWT_ACCESS_EXPIRATION_MINUTES` trong tệp `.env`.

**Refreshing Access Tokens**:

Sau khi access token hết hạn, một access token mới có thể được tạo bằng cách gọi đến endpoint refresh token (`POST /v1/auth/refresh-tokens`) và gửi kèm một refresh token hợp lệ trong phần body của request. Lệnh gọi này trả về một access token mới và một refresh token mới.

Mã thông báo làm mới có giá trị trong 30 ngày. Bạn có thể sửa đổi thời gian hết hạn này bằng cách thay đổi biến môi trường `JWT_REFRESH_EXPIRATION_DAYS` trong tệp `.env`.

## 12. Authorization

Middleware `auth` cũng có thể được sử dụng để yêu cầu các quyền/giấy phép nhất định để truy cập một `route`.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('manageUsers'), userController.createUser);
```

Trong ví dụ trên, một người dùng đã được xác thực chỉ có thể truy cập vào đường dẫn này nếu người dùng đó có quyền `manageUsers`.

Các quyền được phân theo vai trò. Bạn có thể xem các quyền/quyền hạn của từng vai trò trong tệp `src/config/roles.js`.

Nếu người dùng đưa ra yêu cầu không có đủ quyền cần thiết để truy cập tuyến đường này, Forbidden (403) error sẽ được trả về.

## 13. Logging

Nhập trình ghi nhật ký từ `src/config/logger.js`. Sử dụng thư viện ghi nhật ký  [Winston](https://github.com/winstonjs/winston).

Việc ghi nhật ký nên được thực hiện theo các mức độ nghiêm trọng sau (thứ tự tăng dần từ quan trọng nhất đến ít quan trọng nhất):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

Trong chế độ phát triển, tin nhắn nhật ký của tất cả các mức độ nghiêm trọng sẽ được in ra bảng điều khiển.

Ở chế độ production, chỉ `info`, `warn`, và `error` mới được in ra bảng điều khiển.\
Việc đọc chúng từ bảng điều khiển và lưu trữ chúng vào các tập tin nhật ký là tùy thuộc vào máy chủ (hoặc trình quản lý tiến trình).\
Ứng dụng này sử dụng pm2 ở chế độ production, đã được cấu hình để lưu trữ nhật ký trong các tập tin nhật ký.

Lưu ý: Thông tin yêu cầu API (request url, response code, timestamp, v.v.) cũng được tự động ghi lại(Sử dụng [morgan](https://github.com/expressjs/morgan)).

## 14. Custom Mongoose Plugins

Ứng dụng này cũng chứa 2 plugin mongoose tùy chỉnh mà bạn có thể gắn vào bất kỳ lược đồ mô hình mongoose nào. Bạn có thể tìm thấy các plugin này trong `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
```

### 14.11 toJSON

Plugin toJSON áp dụng các thay đổi sau trong lệnh gọi chuyển đổi toJSON:

- xóa \_\_v, createdAt, updatedAt, và bất kỳ đường dẫn lược đồ nào có private: true
- thay thế \_id với id

### 14.2 paginate

Plugin paginate thêm phương thức tĩnh `paginate` vào schema của Mongoose.

Việc thêm plugin này vào lược đồ mô hình `User` sẽ cho phép bạn thực hiện những điều sau:

```javascript
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
```

Tham số `filter` là một bộ lọc mongo thông thường.

Tham số `options` có thể có các trường (tùy chọn) sau:

```javascript
const options = {
  sortBy: 'name:desc', // sort order
  limit: 5, // maximum results per page
  page: 2, // page number
};
```

Plugin cũng hỗ trợ sắp xếp theo nhiều tiêu chí (phân tách bằng dấu phẩy): `sortBy: name:desc,role:asc`

Phương thức `paginate` trả về một Promise, giải quyết bằng một đối tượng có các thuộc tính sau:

```json
{
  "results": [],
  "page": 2,
  "limit": 5,
  "totalPages": 10,
  "totalResults": 48
}
```












# IV. Test Cases (Giỏ hàng, Thanh Toán, Đơn Hàng)

## 1. Test Cases Giỏ hàng

| Test Case ID | Mô tả | Điều kiện tiên quyết | Bước thực hiện | Các trường hợp dữ liệu | Kết quả mong đợi | Kết quả thực tế |
|--------------|-------|----------------------|----------------|----------------------|------------------|----------|
| TC_GH_01 | Hiển thị danh sách sản phẩm trong giỏ hàng | - Người dùng đã đăng nhập.<br>- Hệ thống đã được khởi tạo với dữ liệu sản phẩm. | - Mở màn hình GH.<br>- Kiểm tra danh sách sản phẩm. | - TH1: Giỏ hàng có ít nhất 1 sản phẩm.<br>- TH2: Giỏ hàng có nhiều sản phẩm.<br>- TH3: Giỏ hàng không có sản phẩm nào. | - TH1: Giỏ hàng sẽ hiển thị đúng: tên, giá, hình ảnh, màu, size, số lượng khớp với dữ liệu đã thêm. <br>- TH2: Giỏ hàng sẽ hiển thị đúng và cho phép kéo xuống để xem tiếp nếu số lượng sản phẩm nhiều.<br>- TH3: Giỏ hàng sẽ hiển thị: "Giỏ hàng trống". | - TH1: Giỏ hàng đã hiển thị đúng: tên, giá, hình ảnh, màu, size, số lượng khớp với dữ liệu đã thêm. <br>- TH2: Giỏ hàng đã hiển thị đúng và cho phép kéo xuống để xem tiếp nếu số lượng sản phẩm nhiều.<br>- TH3: Giỏ hàng đã hiển thị: "Giỏ hàng trống".|
| TC_GH_02 | Cập nhật số lượng sản phẩm | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm.<br>- Sản phẩm có số lượng tồn kho được xác định. | - Mở màn hình GH.<br>- Nhấn “+” để tăng số lượng lên 1<br>- Nhấn “-” để giảm xuống 1 | - TH1: Thử tăng số lượng lên 3 và giảm số lượng xuống 1.<br>- TH2: Tăng số lượng lên vượt số lượng sản phẩm trong kho.<br>- TH3: Giảm số lượng về 0. | - TH1: Số lượng sản phẩm sẽ tăng lên 3 và giảm xuống 1 tương ứng.<br>- TH2: Hệ thống sẽ hiển thị thông báo số lượng chọn vượt quá số lượng trong kho.<br>- TH3: Hệ thống sẽ hiển thị thông báo có muốn xóa sản phẩm hay không. | - TH1: Số lượng sản phẩm đã tăng lên 3 và giảm xuống 1 tương ứng.<br>- TH2: Hệ thống đã hiển thị thông báo số lượng chọn vượt quá số lượng trong kho.<br>- TH3: Hệ thống đã hiển thị thông báo có muốn xóa sản phẩm hay không. |
| TC_GH_03 | Xóa sản phẩm khỏi giỏ hàng | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm. | - Mở màn hình GH.<br>- Nhấn “X” ở góc phải trên khung chứa thông tin sản phẩm.<br>- Xác nhận xóa. | - TH1: Ấn xác nhận Xóa.<br>- TH2: Ấn Hủy | - TH1: Sản phẩm sẽ bị Xóa.<br>- TH2: Sản phẩm vẫn sẽ còn trong giỏ hàng  | - TH1: Sản phẩm đã bị Xóa.<br>- TH2: Sản phẩm vẫn còn trong giỏ hàng  |
| TC_GH_04 | Nút Checkbox | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm. | - Mở màn hình GH.<br>- Nhấn vào ô checkbox (mặc định là chưa được chọn). | - TH1: Chọn Checkbox cho 1 sản phẩm.<br>- TH2: Chọn Checkbox cho nhiều sản phẩm.<br>- TH3: Hủy chọn Checkbox. | - TH1: Sản phẩm sẽ được chọn, tổng tiền sẽ thay đổi bằng với giá tiền của sản phẩm được chọn.<br>- TH2: Nhiều sản phẩm sẽ được chọn, tổng tiền sẽ thay đổi bằng tổng các giá tiền của các \n- TH3: Sản phẩm sẽ được hủy chọn, tổng tiền sẽ thay đổi bằng tổng các giá tiền của các sản phẩm còn lại được chọn.| - TH1: Sản phẩm đã được chọn, tổng tiền đã thay đổi bằng với giá tiền của sản phẩm được chọn.<br>- TH2: Nhiều sản phẩm đã được chọn, tổng tiền đã thay đổi bằng tổng các giá tiền của các sản phẩm được chọn.<br>- TH3: Sản phẩm đã được hủy chọn, tổng tiền đã thay đổi bằng tổng các giá tiền của các sản phẩm còn lại được chọn. |
| TC_GH_05 | Tính tổng tiền giỏ hàng | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm. | - Mở màn hình GH.<br>- Chọn sản phẩm muốn mua. <br>- Kiểm tra tổng tiền. | - TH1: Chọn mua ít nhất 1 sản phẩm (Ví dụ mua 2 đôi Nike Dunk Low 3.800.000 VND).<br>-TH2: Không chọn sản phẩm nào. | - TH1: Tổng tiền sẽ bằng tổng giá tiền của các sản phẩm được chọn. (7.600.000 VND), định dạng đúng (dấu chấm phân cách).<br>- TH2: Tổng tiền sẽ bằng 0 | - TH1: Tổng tiền đã bằng tổng giá tiền của các sản phẩm được chọn. (7.600.000 VND), định dạng đúng (dấu chấm phân cách).<br>- TH2: Tổng tiền đã bằng 0  |
| TC_GH_06 | Điều hướng đến phần Thanh Toán | - Người dùng đã đăng nhập.<br>- Hệ thống đã được khởi tạo với dữ liệu sản phẩm. | - Mở màn hình GH.<br>- Chọn sản phẩm muốn mua.<br>- Nhấn “Go to TT”. | - TH1: Chọn mua ít nhất 1 sản phẩm.<br>- TH2: Không chọn sản phẩm nào.<br>- TH3: Không có sản phẩm nào trong giỏ hàng. | - TH1: Hệ thống sẽ chuyển hướng đến màn hình Thanh Toán, dữ liệu giỏ hàng sẽ được truyền sang.<br>- TH2: Hệ thống sẽ hiển thị ra thông báo: "Vui lòng chọn sản phẩm để thanh toán".<br>- TH3: Nút "Thanh Toán" sẽ không được hiển thị. | - TH1: Hệ thống đã chuyển hướng đến màn hình Thanh Toán, dữ liệu giỏ hàng đã được truyền sang.<br>- TH2: Hệ thống sẽ hiển thị ra thông báo: "Vui lòng chọn sản phẩm để thanh toán".<br>- TH3: Nút "Thanh Toán" không hiển thị. |

## 2. Test Cases Thanh Toán

| Test Case ID | Mô tả | Điều kiện tiên quyết | Bước thực hiện | Các trường hợp dữ liệu | Kết quả mong đợi | Kết quả thực tế |
|--------------|-------|----------------------|----------------|----------------------|------------------|----------|
| TC_TT_01 | Hiển thị thông tin giỏ hàng trong phần Thanh Toán | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm đã được chọn để thanh toán. | - Từ Giỏ Hàng, nhấn “Thanh toán”.<br>- Kiểm tra danh sách sản phẩm. | Giỏ hàng có ít nhất 1 sản phẩm (Ví dụ mua 2 đôi Nike Dunk Low 3.800.000 VND, tổng tiền 7.600.000 VND) | Hệ thống sẽ hiển thị đúng: tên, giá, số lượng, màu, kích thước, tổng tiền khớp (7.600.000 VND). | Hệ thống đã hiển thị đúng: tên, giá, số lượng, màu, kích thước, tổng tiền khớp (7.600.000 VND). |
| TC_TT_02 | Xác nhận thông tin người nhận | - Người dùng đã đăng nhập.<br>- Thông tin cá nhân của người dùng đã được lưu trong hệ thống. | Kiểm tra thông tin người nhận.| - TH1: Thông tin người nhận đầy đủ.<br>- TH2: Thông tin người nhận không đầy đủ (Thiếu SDT, Địa chỉ) | - TH1: Hệ thống sẽ hiển thị Thông tin giống như trong phần Thông tin cá nhân.<br>- TH2: Hệ thống sẽ hiển thị thông báo Vui lòng nhập đầy đủ thông tin để tiếp tục Thanh Toán. | - TH1: Hệ thống đã hiển thị Thông tin giống như trong phần Thông tin cá nhân.<br>- TH2: Hệ thống đã hiển thị thông báo Vui lòng nhập đầy đủ thông tin để tiếp tục Thanh Toán. |
| TC_TT_03 | Chọn phương thức giao hàng | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm đã được chọn để thanh toán. | - Chọn phương thức Giao hàng.<br>- Kiểm tra tổng tiền. | Chọn 1 trong 3 phương thức: <br>- "Mặc định" (30.000 VND)<br>- "Tiết kiệm" (20.000 VND)<br>- "Hỏa tốc" (50.000 VND).<br> (Mặc định lựa chọn phương thức "Mặc định".) | Hệ thống sẽ hiển thị đúng phí giao hàng: 30.000 VND, 20.000 VND, 50.000 VND, định dạng đúng (dấu chấm phân cách). Tổng tiền cập nhật đúng với phương thức giao hàng đã lựa chọn: (Ví dụ 7.600.000 + 30.000 = 7.630.000 VND.) | Hệ thống đã hiển thị đúng phí giao hàng: 30.000 VND, 20.000 VND, 50.000 VND, định dạng đúng (dấu chấm phân cách). Tổng tiền cập nhật đúng với phương thức giao hàng đã lựa chọn: (Ví dụ 7.600.000 + 30.000 = 7.630.000 VND.) |
| TC_TT_04 | Chọn phương thức thanh toán | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm đã được chọn để thanh toán. | - Chọn phương thức Thanh Toán. | Chọn 1 trong 3 phương thức: <br>- "MoMo"<br>- "Thanh toán khi nhận hàng"<br>- "Thẻ tín dụng".<br> (Mặc định lựa chọn phương thức "Thanh toán khi nhận hàng".) | - Hệ thống sẽ hiển thị phương thức được chọn. | - Hệ thống đã hiển thị phương thức được chọn. |
| TC_TT_05 | Đặt hàng | - Người dùng đã đăng nhập.<br>- Giỏ hàng có ít nhất 1 sản phẩm đã được chọn.<br>- Thông tin người nhận và phương thức thanh toán/giao hàng đã được chọn. | - Nhấn “Đặt hàng”.<br>- Kiểm tra chuyển hướng. | - TH1: Đã có đầy đủ thông tin.<br>- TH2: Chưa có đầy đủ thông tin. | - TH1: Hệ thống sẽ chuyển hướng đến màn hình “Đặt hàng thành công”, giỏ hàng sẽ xóa sản phẩm vừa mua.<br>- TH2: Nút "Đặt hàng" sẽ bị vô hiệu hóa và không thể nhấn. | - TH1: Hệ thống đã chuyển hướng đến màn hình “Đặt hàng thành công”, giỏ hàng đã xóa sản phẩm vừa mua.<br>- TH2: Nút "Đặt hàng" đã bị vô hiệu hóa và không thể nhấn. |


## 3. Test Cases Đặt hàng thành công 
| Test Case ID | Mô tả | Điều kiện tiên quyết | Bước thực hiện | Các trường hợp dữ liệu | Kết quả mong đợi | Kết quả thực tế |
|--------------|-------|----------------------|----------------|----------------------|------------------|----------|
| TC_SC_01 | Hiển thị trang Đặt hàng thành công | - Người dùng đã đăng nhập.<br>- Người dùng đã đặt ít nhất 1 đơn hàng thành công. | - Vào app và chọn món đồ yêu thích.<br>- Kiểm tra thông tin và đặt hàng thành công. | - TH1: Nhấn "Xem đơn hàng".<br>- TH2: Nhấn "Tiếp tục mua hàng".  | - TH1: Hệ thống sẽ hiển thị thông tin đơn hàng bao gồm: Thông tin người nhận, thông tin mặt hàng (mẫu, màu, số lượng, size), phương thức giao hàng và phương thức thanh toán.<br>- TH2: Hệ thống sẽ đưa trở lại màn hình Home để tiếp tục mua sắm. | - TH1: Hệ thống đã hiển thị thông tin đơn hàng bao gồm: Thông tin người nhận, thông tin mặt hàng (mẫu, màu, số lượng, size), phương thức giao hàng và phương thức thanh toán.<br>- TH2: Hệ thống đã đưa trở lại màn hình Home để tiếp tục mua sắm.  |


## 4. Test Cases Đơn Hàng

| Test Case ID | Mô tả | Điều kiện tiên quyết | Bước thực hiện | Các trường hợp dữ liệu | Kết quả mong đợi | Kết quả thực tế |
|--------------|-------|----------------------|----------------|----------------------|------------------|----------|
| TC_DH_01 | Hiển thị thông tin đơn hàng | - Người dùng đã đăng nhập.<br>- Người dùng đã đặt ít nhất 1 đơn hàng thành công. | - Mở màn hình Đơn hàng.<br>- Kiểm tra thông tin. | Đã đặt thành công 2 đôi Nike Dunk Low, Phương thức giao hàng "Mặc định", Phương thức thanh toán "Thanh toán khi nhận hàng". | Hệ thống sẽ hiển thị đúng: thông tin người nhận, sản phẩm, phương thức giao hàng, thanh toán, tổng tiền (7.630.000 VND), định dạng tiền đúng. | Hệ thống đã hiển thị đúng: thông tin người nhận, sản phẩm, phương thức giao hàng, thanh toán, tổng tiền (7.630.000 VND), định dạng tiền đúng. |
| TC_DH_02 | Xem lịch sử đơn hàng | - Người dùng đã đăng nhập. | - Mở trang lịch sử đơn hàng.<br>- Kiểm tra danh sách. | - TH1: Đã đặt ít nhất một đơn.<br>- TH2: Chưa đặt đơn nào. | - TH1: Hệ thống sẽ hiển thị danh sách: mã đơn hàng, ngày đặt, tổng tiền, trạng thái. Nhấn vào đơn hàng hiển thị chi tiết.<br>- TH2: Hệ thống sẽ hiển thị: "Chưa có đơn hàng nào!". | - TH1: Hệ thống đã hiển thị danh sách: mã đơn hàng, ngày đặt, tổng tiền, trạng thái. Nhấn vào đơn hàng hiển thị chi tiết.<br>- TH2: Hệ thống đã hiển thị: "Chưa có đơn hàng nào!". |
| TC_DH_03 | Xem chi tiết lịch sử đơn hàng | - Người dùng đã đăng nhập.<br>- Người dùng đã đặt ít nhất 1 đơn hàng thành công. | - Mở trang lịch sử đơn hàng.<br>- Nhấn vào đơn hàng muốn xem để hiển thị chi tiết.<br>- Xác nhận hủy. | Đã đặt ít nhất một đơn. | Hệ thống sẽ hiển thị danh sách: mã đơn hàng, ngày đặt, tổng tiền, trạng thái, danh sách sản phẩm, số lượng, giá tiền, kích cỡ. | Hệ thống đã hiển thị danh sách: mã đơn hàng, ngày đặt, tổng tiền, trạng thái, danh sách sản phẩm, số lượng, giá tiền, kích cỡ. |
| TC_DH_04 | Hủy đơn hàng | - Người dùng đã đăng nhập.<br>- Người dùng đã đặt ít nhất 1 đơn hàng thành công.<br>- Đơn hàng ở trạng thái cho phép hủy. | - Mở trang lịch sử đơn hàng.<br>- Nhấn “Hủy đơn hàng”. | - TH1: Ấn xác nhận Xóa.<br>- TH2: Ấn Hủy | - TH1: Hệ thống sẽ xóa đơn hàng, số lượng sản phẩm được hoàn trả lại kho.<br>- TH2: Hệ thống sẽ vẫn giữ nguyên đơn hàng. | - TH1: Hệ thống đã xóa đơn hàng, số lượng sản phẩm được hoàn trả lại kho.<br>- TH2: Hệ thống vẫn giữ nguyên đơn hàng. |


## 5. Test Cases Đăng Nhập
| Test Case ID | Mô tả                                 | Điều kiện tiên quyết                    | Bước thực hiện                                                                                                                                 | Dữ liệu                               | Kết quả mong đợi                                                                     | Kết quả thực tế     |
|--------------|----------------------------------------|-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|----------------------------------------------------------------------------------------|---------------------|
| TC_DN_01     | Đăng nhập với thông tin hợp lệ         | - Tài khoản đã được đăng ký <br> - Hệ thống hoạt động | - Mở màn hình Đăng nhập <br> - Nhập email và mật khẩu đúng <br> - Nhấn "Đăng nhập"                            | Email: mesena686@gmail.com <br> Mật khẩu: tu123456   | Hiển thị màn hình chính sau khi đăng nhập thành công.                                |Đã hiển thị: "Đăng nhập thành công! Chào mừng bạn trở lại!"          |
| TC_DN_02     | Đăng nhập với sai mật khẩu             | - Tài khoản đã được đăng ký             | - Mở màn hình Đăng nhập <br> - Nhập email đúng, mật khẩu sai <br> - Nhấn "Đăng nhập"                       | Email: mesena686@gmail.com <br> Mật khẩu: sai123456     | Hiển thị thông báo: "Đăng nhập thất bại. Vui lòng nhập đúng mật khẩu"               | Đã hiển thị: "Đã xảy ra lỗi. Vui lòng thử lại"   |
| TC_DN_03     | Đăng nhập với email không đúng định dạng | - Không yêu cầu tài khoản tồn tại       | - Nhập email sai định dạng <br> - Nhấn "Đăng nhập"                                                         | Email: meme@123gmail.com <br> Mật khẩu: tu123456     | Hiển thị lỗi: "Đăng nhập thất bại. Vui lòng nhập đúng email"                         | Đã hiển thị: "Đã xảy ra lỗi. Vui lòng thử lại"   |
| TC_DN_04     | Đăng nhập với email chưa đăng ký       | - Email chưa tồn tại trong hệ thống     | - Nhập email chưa đăng ký, mật khẩu bất kỳ <br> - Nhấn "Đăng nhập"                                         | Email: notexist@gmail.com <br> Mật khẩu: 123456     | Hiển thị lỗi: "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu."                                              | Đã hiển thị: "Đã xảy ra lỗi. Vui lòng thử lại"    |
| TC_DN_05     | Đăng nhập với mật khẩu trống           | - Tài khoản đã được đăng ký             | - Nhập email đúng, bỏ trống mật khẩu <br> - Nhấn "Đăng nhập"                                               | Email: mesena686@gmail.com <br> Mật khẩu: (trống)     | Hiển thị lỗi: "Vui lòng nhập mật khẩu."                                               | Đã hiển thị: "Vui lòng nhập mật khẩu"   |
| TC_DN_06     | Đăng nhập với email trống              | - Không yêu cầu tài khoản               | - Bỏ trống email, nhập mật khẩu bất kỳ <br> - Nhấn "Đăng nhập"                                             | Email: (trống) <br> Mật khẩu: tu123456               | Hiển thị lỗi: "Vui lòng nhập email."                                                  | Đã hiển thị: "Vui lòng nhập email."   |
| TC_DN_07     | Đăng nhập với cả email và mật khẩu trống | - Không yêu cầu tài khoản               | - Không nhập gì cả <br> - Nhấn "Đăng nhập"                                                                  | Email: (trống) <br> Mật khẩu: (trống)                | Hiển thị lỗi: "Vui lòng nhập đầy đủ cả email và mật khẩu."                            | Đã hiển thị: "Vui lòng nhập đầy đủ cả email và mật khẩu."   |





## 6. Test cases Đăng Ký
| Test Case ID | Mô tả                                            | Điều kiện tiên quyết                | Bước thực hiện                                                                                                          | Dữ liệu                                                                                     | Kết quả mong đợi                                                               | Kết quả thực tế     |
|--------------|--------------------------------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|---------------------|
| TC_DK_01     | Đăng ký với thông tin hợp lệ                     | - Hệ thống hoạt động                | - Mở màn hình đăng ký <br> - Nhập thông tin hợp lệ <br> - Nhấn "Đăng ký"                                                | Họ tên: Hoàng Tú <br> Email: mesena686@gmail.com <br> Mật khẩu: tu123456 <br> Xác nhận mật khẩu: tu123456 | Hiển thị lỗi: "Đăng ký thành công! Vui lòng kiểm tra email để xác minh."| Thành công chuyển đến màn hình nhập mã OTP          |
| TC_DK_02     | Đăng ký với email đã tồn tại                    | - Email đã được đăng ký             | - Nhập email đã tồn tại <br> - Nhấn "Đăng ký"                                                                            | Họ tên: Hoàng Tú <br>Email: mesena686@gmail.com <br> Mật khẩu: 123456 <br> Xác nhận mật khẩu: 123456                            | Hiển thị lỗi: "Email đã được sử dụng. Vui lòng chọn email khác."                                        | Đã hiển thị: "Registration Failed"   |
| TC_DK_03     | Đăng ký với email sai định dạng                 | - Không yêu cầu tài khoản           | - Nhập email sai định dạng <br> - Nhấn "Đăng ký"                                                                         | Họ tên: Hoàng Tú <br>Email: mesena@123 <br> Mật khẩu: tu123456 <br> Xác nhận mật khẩu: tu123456                                                           | Hiển thị lỗi: "Email không hợp lệ."                                            | Đã hiển thị: "Email không hợp lệ"   |
| TC_DK_04     | Đăng ký với mật khẩu quá ngắn                   | - Không yêu cầu tài khoản           | - Nhập mật khẩu dưới 8 ký tự, không đủ số và chữ <br> - Nhấn "Đăng ký"                                                  | Họ tên: Hoàng Tú <br>Email: mesena686@gmail.com <br> Mật khẩu: 123 <br> Xác nhận mật khẩu: 123                                | Hiển thị lỗi: "Mật khẩu phải có ít nhất 8 ký tự bao gồm cả số và chữ."        | Đã hiển thị: "Mật khẩu phải có it nhất 8 ký tự bao gồm cả số và chữ."  |
| TC_DK_05     | Đăng ký khi mật khẩu và xác nhận không khớp     | - Không yêu cầu tài khoản           | - Nhập mật khẩu và xác nhận không khớp <br> - Nhấn "Đăng ký"                                                              | Mật khẩu: 123456 <br> Xác nhận mật khẩu: 654321                                                            | Hiển thị lỗi: "Mật khẩu không khớp."                                            | Đã hiển thị: "Mật khẩu không khớp."   |
| TC_DK_06     | Đăng ký với họ tên trống                         | - Không yêu cầu tài khoản           | - Bỏ trống họ tên <br> - Nhấn "Đăng ký"                                                                                   | Họ tên: (trống) <br> Email: mesena686@gmail.com <br> Mật khẩu: tu123456 <br> Xác nhận mật khẩu: tu123456                               | Hiển thị lỗi: "Vui lòng nhập họ tên."                                          | Đã hiển thị: "Vui lòng nhập họ tên." |
| TC_DK_07     | Đăng ký với email trống                          | - Không yêu cầu tài khoản           | - Bỏ trống email <br> - Nhấn "Đăng ký"                                                                                    | Họ tên: Hoàng Tú <br>Email: (trống) <br> Mật khẩu: tu123456  <br>Xác nhận mật khẩu: tu123456                                                           | Hiển thị lỗi: "Vui lòng nhập email."                                           | Đã hiển thị: "Vui lòng nhập email."   |
| TC_DK_08     | Đăng ký với mật khẩu trống                       | - Không yêu cầu tài khoản           | - Nhập email, bỏ trống mật khẩu <br> - Nhấn "Đăng ký"                                                                     | Họ tên: Hoàng Tú <br>Email: mesena686@gmail.com <br> Mật khẩu: (trống) <br> Xác nhận mật khẩu: (trống)                                                    | Hiển thị lỗi: "Vui lòng nhập mật khẩu."                                       | Đã hiển thị: "Vui lòng nhập mật khẩu"   |
| TC_DK_09     | Đăng ký với xác nhận mật khẩu trống              | - Không yêu cầu tài khoản           | - Nhập mật khẩu, bỏ trống xác nhận <br> - Nhấn "Đăng ký"                                                                  | Họ tên: Hoàng Tú <br>Email: mesena686@gmail.com <br> Mật khẩu: tu123456 <br> Xác nhận mật khẩu: (trống)                                                           | Hiển thị lỗi: "Vui lòng xác nhận mật khẩu."                                   | Đã hiển thị: "Vui lòng xác nhận mật khẩu."   |
| TC_DK_10     | Đăng ký khi bỏ trống toàn bộ thông tin          | - Không yêu cầu tài khoản           | - Không nhập gì cả <br> - Nhấn "Đăng ký"                                                                                  | Họ tên: (trống) <br> Email: (trống) <br> Mật khẩu: (trống) <br> Xác nhận mật khẩu: (trống)                                      | Hiển thị lỗi: "Vui lòng nhập đầy đủ thông tin."                                 | Đã hiển thị: "Vui lòng nhập đầy đủ thông tin."   |



## 7. Test cases Xác Nhận OTP
| **Test Case ID** | **Mô tả**                                                     | **Điều kiện tiên quyết**                                                             | **Bước thực hiện chi tiết**                                                                                                                                                               | **Dữ liệu kiểm thử cụ thể**                                                             | **Kết quả mong đợi**                                                                                                                                                 | **Kết quả thực tế** |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| TC\_OTP\_01      | Nhập mã OTP không hợp lệ                                      | Người dùng đang ở màn hình OTP, chưa nhập đủ 6 chữ số                                | 1. Nhập mã dưới 6 chữ số (vd: “123”)<br>2. Hoặc nhập ký tự không phải số<br>3. Nhấn “Xác minh”                                                                                            | OTP: “123”                                                            | Hiển thị lỗi: "Lỗi. Vui lòng nhập đủ 6 chữ số OTP"                                                                   | Đã hiển thị: "Lỗi. Vui lòng nhập đủ 6 chữ số OTP"   |
| TC\_OTP\_02      | Nhập đúng mã OTP, xác thực thành công và kích hoạt tài khoản  | Server đã gửi OTP hợp lệ (vd: 654321)                                                | 1. Nhập “654321”<br>2. Nhấn “Xác minh”<br>3. Gửi request xác thực OTP<br>4. Server trả về thành công                                                                                      | OTP đúng: “654321”                                                                      | Hiển thị thông báo “Tài khoản đã được xác minh thành công”<br>Chuyển hướng sang màn hình Đăng nhập hoặc Trang chủ                                                    | Đã hiển thị: "Tài khoản đã được xác minh thành công"   |
| TC\_OTP\_03      | Nhập sai mã OTP, xác thực thất bại                            | Có mã OTP hợp lệ nhưng người dùng nhập sai                                           | 1. Nhập “111111” (khác mã thật)<br>2. Nhấn “Xác minh”<br>3. Server trả về lỗi OTP không đúng                                                                                              | OTP sai: “111111”                                                                       | Hiển thị lỗi “Lỗi. Xác minh OTP thất bại. ”<br>Không chuyển hướng                                                                                            | Đã hiển thị: "Lỗi. Xác minh OTP thất bại."  |
| TC\_OTP\_04      | Kiểm tra tính năng gửi lại mã OTP khi hết thời gian đếm ngược | Người dùng chưa xác minh, hết thời gian đếm ngược                                    | 1. Đợi đồng hồ đếm ngược về 0<br>2. Nhấn “Gửi lại mã”<br>3. Gửi request gửi lại mã OTP<br>4. Quan sát giao diện sau khi gửi lại                                                           | Email: mesena686@gmail.com                                          | Hiển thị “Thông báo. Mã OTP đã được gửi lại về email của bạn"<br>Reset đồng hồ đếm ngược 60s<br>Các ô nhập OTP được reset                              | Đã hiển thị: "Thông báo. Mã OTP đã được gửi lại về email của bạn"   |

## 8. Test cases Quên Mật Khẩu
| Test Case ID | Mô tả                                                            | Điều kiện tiên quyết                                  | Bước thực hiện                                                                                           | Dữ liệu                                                | Kết quả mong đợi                                                                                                             | Kết quả thực tế  |
| ------------ | ---------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| TC\_QMK\_01  | Gửi yêu cầu đặt lại mật khẩu với email hợp lệ                    | - Email đã được đăng ký <br> - Kết nối mạng hoạt động | - Mở màn hình Quên mật khẩu <br> - Nhập email đúng định dạng và đã đăng ký <br> - Nhấn "SEND RESET LINK" | Email: [hoangthotu2192004@gmail.com](mailto:hoangthotu2192004@gmail.com)     | Hiển thị thông báo: "Thành công. Một mật khẩu mới đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến của bạn" <br> Chuyển về màn hình Đăng nhập | Đã hiển thị: "Thành công. Một mật khẩu mới đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến của bạn" |
| TC\_QMK\_02  | Gửi yêu cầu đặt lại mật khẩu với email trống                     | - Không yêu cầu tài khoản                             | - Mở màn hình Quên mật khẩu <br> - Bỏ trống ô nhập email <br> - Nhấn "SEND RESET LINK"                   | Email: (trống)                                         | Hiển thị cảnh báo: "Lỗi. Vui lòng nhập email hợp lệ."                                                                             | Đã hiển thị: "Lỗi. Vui lòng nhập email hợp lệ." |
| TC\_QMK\_03  | Gửi yêu cầu với email sai định dạng                              | - Không yêu cầu tài khoản                             | - Nhập email sai định dạng <br> - Nhấn "SEND RESET LINK"                                                 | Email: mesena686@123                                        | Hiển thị lỗi: "Lỗi. Gửi liên kết đặt lại thất bại."           | Đã hiển thị: "Lỗi. Gửi liên kết đặt lại thất bại." |
| TC\_QMK\_04  | Gửi yêu cầu với email chưa đăng ký                               | - Email chưa tồn tại trong hệ thống                   | - Nhập email không tồn tại <br> - Nhấn "SEND RESET LINK"                                                 | Email: [matchanatti@gmail.com](mailto:matchanatti@gmail.com) | Hiển thị cảnh báo từ backend: "Failed to reset password. Please try again." hoặc lỗi cụ thể từ `error.message`               | Đã hiển thị: "Lỗi. Gửi liên kết đặt lại thất bại." |
| TC\_QMK\_05  | Bấm "Back to Login"                                              | - Không yêu cầu dữ liệu                               | - Từ màn hình Quên mật khẩu <br> - Nhấn vào "Back to Login"                                              | (Không áp dụng)                                        | Chuyển về màn hình Đăng nhập                                                                                                 | Đã chuyển về     |
| TC\_QMK\_06  | Bấm "SEND RESET LINK" khi đã nhập email và không có kết nối mạng | - Mất kết nối internet                                | - Nhập email hợp lệ <br> - Ngắt kết nối mạng <br> - Nhấn "SEND RESET LINK"                               | Email: [hoangthotu2192004@gmail.com](mailto:hoangthotu2192004@gmail.com)     | Hiển thị lỗi: "Không có kết nối mạng. Vui lòng kiểm tra kết nối Internet."                                                                  | Đã hiển thị: "Lỗi. Gửi liên kết đặt lại thất bại." |
                                                                | Đã hiển thị: "Lỗi. Gửi liên kết đặt lại thất bại." |



# Test Case: Kiểm Tra Toàn Diện Màn Hình Home Ứng Dụng Panda

## Màn hình Home (Sau khi đăng nhập thành công)

| **Test Case ID** | **Mô Tả**                              | **Điều Kiện Tiên Quyết**            | **Bước Thực Hiện**                          | **Trường Hợp Dữ Liệu**              | **Kết Quả Mong Đợi**                              | **Kết Quả Thực Tế** |
|-----------------|----------------------------------------|-------------------------------------|------------------------------------------------|-------------------------------------|--------------------------------------------------|---------------------|
| TC_Home_01      | Hiển thị banner - Trường hợp bình thường | Đăng nhập thành công | Đăng nhập thành công | Có 3 banner (VD: "Air Jordan", "Nike", "Adidas") | Banner tự động thay đổi sau mỗi 5 giây. Hiển thị hình ảnh rõ (VD: "Air Jordan"). Có chấm tròn (dots). | Banner đã tự động thay đổi sau mỗi 5 giây. Ảnh hiển thị rõ. Đã có chấm tròn để hiện thị ảnh ở vị trí nào. |
| TC_Home_02      | Hiển thị banner - Không có banner | Đăng nhập thành công | Đăng nhập thành công | TH1: Không có bất kỳ dữ liệu banner (null). <br> TH2: Một vài banner có và một vài banner không có dữ liệu. | TH1: Không hiển thị banner. Phần "Thương hiệu" hiển thị ngay dưới logo "Panda.". <br> TH2: banner nào không có dữ liệu (null) thì sẽ bị ẩn đi, banner nào có dữ liệu thì vẫn hiện như bình thường. | TH1: Banner đã không được hiển thị. Thay vào đó phần "Thương hiệu" đã hiển thị ngay dưới logo "Panda." <br> TH2: Những banner không có dữ liệu đã bị ẩn đi, những banner có dữ liệu thì vẫn hiển thị bình thường. |
| TC_Home_03      | Hiển thị banner - Lỗi tải hình ảnh | Đăng nhập thành công | Đăng nhập thành công | Hình ảnh banner bị lỗi (URL không hợp lệ) | Hiển thị placeholder: "Không tải được hình ảnh". | Banner đã hiển thị placeholder: "Không tải được ảnh" khi banner bị lỗi. |
| TC_Home_04      | Hiển thị danh sách Thương hiệu - Bình thường | Đăng nhập thành công | Đăng nhập thành công | Có 4 thương hiệu (Nike, Puma, Adidas, Balenciaga) | Logo thương hiệu (Nike, Puma, Adidas, Balenciaga) hiển thị rõ và có thể nhấn. | Logo các thương hiệu đã hiển thị rõ và có thể ấn. |
| TC_Home_05      | Hiển thị sản phẩm - Bình thường | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | Sản phẩm có đầy đủ dữ liệu: ảnh, tên, giá, thương hiệu(VD: "Men's Hike Sneaker - Balenciaga") | Ảnh, tên, giá, thương hiệu hiển thị đầy đủ (VD: "Men's Hike Sneaker - 2.800.000 VND - Balenciaga"). | Thông tin của sản phẩm đã được hiển thị rõ. |
| TC_Home_06      | Hiển thị sản phẩm - Thiếu ảnh | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | Sản phẩm thiếu URL ảnh (VD: "Men's Monday Shoe") | Sản phẩm hiển thị placeholder: "Không có ảnh". Thông tin khác vẫn hiển thị nếu có. | Ảnh sản phẩm hiện thị placeholder: "Không có ảnh". Còn các thông tin khác vẫn hiển thị. |
| TC_Home_07      | Hiển thị sản phẩm - Thiếu thông tin | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | Sản phẩm thiếu một trong các thông tin: tên, giá, thương hiệu (VD: giá: 2.000.000 VND, hãng: Adidas) | Nếu thiếu tên, giá, thương hiệu → hiển thị "Đang cập nhật". | Đã hiển thị "Đang cập nhật." nếu sản phẩm thiểu một trong các thông tin: tên, giá, thương hiệu. |
| TC_Home_08      | Hiển thị sản phẩm - Sản phẩm hết hàng | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | Sản phẩm hết hàng | Hiển thị: Ảnh sản phẩm kèm dòng chứ hết hàng | Đã hiển thị: Ảnh sản phẩm kèm dòng chữ hết hàng. |
| TC_Home_09      | Hiển thị sản phẩm - Không có sản phẩm | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | 1. Đăng nhập thành công <br> 2. Kéo xuống danh sách | Không có sản phẩm nào trong danh sách | Hiển thị: "Không có sản phẩm nào để hiển thị." | Đã hiển thị: "Không có sản phẩm nào" |
| TC_Home_10      | Lọc sản phẩm theo thương hiệu - Bình thường | 1. Đăng nhập thành công <br> 2. Bấm logo "Puma" | 1. Đăng nhập thành công <br> 2. Bấm logo "Puma" | Có nhiều hơn 1 sản phẩm Puma (VD: "Suede XL Denim", "Palermo"),... | Danh sách sản phẩm lọc theo hãng "Puma" (VD: "Suede XL Denim"). | Danh sách sản phẩm lọc theo thương hiệu Puma đã được hiển thị. |
| TC_Home_11      | Lọc sản phẩm - Không có kết quả | 1. Đăng nhập thành công <br> 2. Bấm logo "Balenciaga" (giả sử không có sản phẩm) | 1. Đăng nhập thành công <br> 2. Bấm logo "Balenciaga" | Không có sản phẩm nào của Balenciaga | Hiển thị: "Không có sản phẩm nào cho hãng này." | Đã hiển thị: "Không có sản phẩm nào cho hãng này." |
| TC_Home_12      | Xem chi tiết sản phẩm - Bình thường | 1. Đăng nhập thành công <br> 2. Bấm "Men's Hike Sneaker" | 1. Đăng nhập thành công <br> 2. Bấm "Men's Hike Sneaker" | Sản phẩm có đầy đủ thông tin (Anh, tên, giá) | Điều hướng đến màn hình chi tiết sản phẩm của sản phẩm tương ứng. | Đã điều hướng đến màn hình chi tiết sản phẩm tương ứng. |
| TC_Home_13      | Xem chi tiết sản phẩm - Đang cập nhật | 1. Đăng nhập thành công <br> 2. Bấm vào sản phẩm "Đang cập nhật" | 1. Đăng nhập thành công <br> 2. Bấm vào sản phẩm "Đang cập nhật" | Sản phẩm thiếu môt trong ba thông tin: tên, giá, thương hiệu. | Không điều hướng và không cho thao tác với sản phẩm đó." | Đã không cho theo tác với sản phẩm không có đủ thông tin. |
| TC_Home_14      | Xem thông báo - Có thông báo | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | Có 6 thông báo (VD: "Khuyến mãi mới", "Đơn hàng") | Chuyển sang màn thông báo và Icon chuông hiển thị số lượng (VD: 6). | Chuyển sang màn thông báo, Icon chuông hiển thị số 6. |
| TC_Home_15      | Xem thông báo - Không có thông báo | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | Không có thông báo | Chuyển sang màn thông báo và Icon chuông không hiển thị số. | Chuyển sang màn thông báo, Icon chuông không có số. |
| TC_Home_16      | Xem thông báo - Nhiều hơn 10 | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | 1. Đăng nhập thành công <br> 2. Bấm icon chuông | Có 12 thông báo | Chuyển sang màn thông báo và Icon chuông hiển thị "9+" nếu có hơn 9 thông báo. | Chuyển sang màn thông báo, Icon chuông hiển thị "9+". |
| TC_Home_17      | Làm mới Home - Bình thường | 1. Đăng nhập thành công <br> 2. Vuốt từ trên xuống | 1. Đăng nhập thành công <br> 2. Vuốt từ trên xuống | Có dữ liệu mới (VD: thêm sản phẩm mới từ server) | Danh sách sản phẩm được reload, hiển thị dữ liệu mới nhất. | Danh sách được reload, thêm sản phẩm mới xuất hiện. |
| TC_Home_18      | Làm mới Home - Không có internet | 1. Đăng nhập thành công <br> 2. Ngắt internet <br> 3. Vuốt từ trên xuống | 1. Đăng nhập thành công <br> 2. Ngắt internet <br> 3. Vuốt từ trên xuống | Không có kết nối internet | Hiển thị: "Không có kết nối internet. Vui lòng thử lại." | |
| TC_Home_19      | Xem giỏ hàng - Giỏ rỗng | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | Không có sản phẩm trong giỏ hàng | Chuyển sang màn hình giỏ hàng. Icon giỏ hàng không hiển thị số. | |
| TC_Home_20      | Xem giỏ hàng - Có sản phẩm | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | Có 1 sản phẩm trong giỏ (VD: "Men's Hike Sneaker") | Chuyển sang màn hình giỏ hàng và Icon giỏ hàng hiển thị số lượng (VD: 1). | |
| TC_Home_21      | Xem giỏ hàng - Nhiều hơn 9 sản phẩm | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | 1. Đăng nhập thành công <br> 2. Bấm icon giỏ hàng | Có 10 sản phẩm trong giỏ hàng | Chuyển sang màn hình giỏ hàng và Icon giỏ hàng hiển thị "9+" nếu có hơn 9 sản phẩm. | |
| TC_Home_22      | Hiển thị menu - Bình thường | 1. Đăng nhập thành công <br> 2. Bấm icon người | 1. Đăng nhập thành công <br> 2. Bấm icon người | Menu có 3 tùy chọn (VD: Hồ sơ, Đơn hàng, Đăng xuất) | Thanh menu hiện từ bên trái với tùy chọn: Hồ sơ, Đăng xuất,... | |
| TC_Home_23      | Hiển thị menu - Mất internet | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet <br> 3. Bấm icon người | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet <br> 3. Bấm icon người | Không có kết nối internet | Không hiện menu. Hiển thị: "Không có kết nối internet. Vui lòng kiểm tra kết nối." | |
| TC_Home_24      | Hiển thị menu - Lỗi server | 1. Đăng nhập thành công <br> 2. Giả lập lỗi server (timeout) <br> 3. Bấm icon người | 1. Đăng nhập thành công <br> 2. Giả lập lỗi server (timeout) <br> 3. Bấm icon người | Server không phản hồi | Không hiện menu. Hiển thị: "Không thể tải menu. Vui lòng thử lại sau." | |
| TC_Home_25      | Hiển thị menu - Lỗi giao diện | 1. Đăng nhập thành công <br> 2. Giả lập lỗi render UI <br> 3. Bấm icon người | 1. Đăng nhập thành công <br> 2. Giả lập lỗi render UI <br> 3. Bấm icon người | Lỗi render (xung đột UI) | Không hiện menu. Hiển thị: "Không thể hiển thị menu. Vui lòng thử lại." | |
| TC_Home_26      | Cuộn về đầu trang | 1. Đăng nhập thành công <br> 2. Bấm nút "Home" | 1. Đăng nhập thành công <br> 2. Bấm nút "Home" | Danh sách sản phẩm đã cuộn xuống giữa trang | Cuộn trang về đầu, hiển thị banner. | |
| TC_Home_27      | Tìm kiếm sản phẩm - Có kết quả | 1. Đăng nhập thành công <br> 2. Bấm thanh tìm kiếm <br> 3. Nhập "Balenciaga" | 1. Đăng nhập thành công <br> 2. Bấm thanh tìm kiếm <br> 3. Nhập "Balenciaga" | Có 2 sản phẩm Balenciaga (VD: "Men's Hike Sneaker") | Chuyển sang màn tìm kiếm. Hiển thị danh sách sản phẩm phù hợp (VD: "Men's Hike Sneaker"). | |
| TC_Home_28      | Tìm kiếm - Không có kết quả | 1. Đăng nhập thành công <br> 2. Bấm thanh tìm kiếm <br> 3. Nhập "XYZ" | 1. Đăng nhập thành công <br> 2. Bấm thanh tìm kiếm <br> 3. Nhập "XYZ" | Không có sản phẩm nào khớp với "XYZ" | Hiển thị: "Không có sản phẩm nào." | |
| TC_Home_29      | Tìm kiếm - Không có internet | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet <br> 3. Bấm thanh tìm kiếm <br> 4. Nhập "Balenciaga" | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet <br> 3. Bấm thanh tìm kiếm <br> 4. Nhập "Balenciaga" | Không có kết nối internet | Hiển thị: "Không có kết nối internet. Vui lòng thử lại." | |
| TC_Home_30      | Kiểm tra logo Panda | Đăng nhập thành công | Đăng nhập thành công | Logo "Panda." được cấu hình đúng | Logo "Panda." hiển thị rõ ở góc trên bên trái. | |
| TC_Home_31      | Mất kết nối internet - Hiển thị chung | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet | 1. Đăng nhập thành công <br> 2. Ngắt kết nối internet | Không có kết nối internet | Toàn màn hình hiển thị: "Không có kết nối internet. Vui lòng kiểm tra kết nối." | |


## Màn hình chi tiết sản phẩm (Sau khi ấn vào một sản phẩm bất kỳ ở màn hình Home)

| **Test Case ID** | **Mô Tả**                              | **Điều Kiện Tiên Quyết**  | **Bước Thực Hiện**              | **Trường Hợp Dữ Liệu**          | **Kết Quả Mong Đợi**                                        | **Kết Quả Thực Tế** |
| ---------------- | -------------------------------------- | ------------------------- | ------------------------------- | ------------------------------- | ----------------------------------------------------------- | ------------------- |
| TC001        | Hiển thị đúng thông tin sản phẩm              | Có sản phẩm hợp lệ        | Ấn vào sản phẩm ở màn hình home | Men's Monday Shoe               | Hiển thị hình ảnh ,tên, giá, mô tả đầy đủ                   |                 |
| TC002        | Hiển thị hình ảnh sản phẩm                    | Sản phẩm có ảnh           | Ấn vào sản phẩm ở màn hình home | Có ảnh                          | Ảnh hiển thị ở đầu trang                                    |                 |
| TC003        | Không hiển thị ảnh nếu ảnh lỗi                | Link ảnh sai              | Ấn vào sản phẩm ở màn hình home | Ảnh bị lỗi                      | Hiển thị ảnh placeholder: Chưa có ảnh                       |                 |
| TC004        | Chọn màu sản phẩm hợp lệ                      | Có nhiều màu              | Nhấn chọn màu                   | Trắng/Đen                       | Màu được highlight                                          |                 |
| TC005        | Chọn màu không hợp lệ (màu hết hàng)          | Màu đó không còn hàng     | Nhấn vào màu đã hết hàng        | Màu xanh                        | Hiển thị hết hàng ở ảnh sản phẩm, nút thêm vào giỏ hàng không thao tác được.  |                 |
| TC006        | Chọn size       sản phẩm hợp lệ               | Size còn hàng             | Nhấn chọn size                  | 38                              | Size được chọn, highlight                                   |                 |
| TC007        | Chọn size hết hàng                            | Size = 0 sản phẩm         | Nhấn vào size xám               | 42                              | Không cho chọn, hiển thị "Hết hàng"                         |                 |
| TC008        | Hiển thị số lượng tồn kho đúng                | Có dữ liệu tồn kho        | Ấn vào sản phẩm ở màn hình home | 38 còn 99, 39 còn 0             | Hiển thị đúng tồn kho                                       |                 |
| TC009        | Tăng số lượng sản phẩm                        | Đã chọn màu + size        | Nhấn "+"                        | Số lượng từ 1 → 2 → ...         | Số lượng tăng                                               |                 |
| TC010        | Tăng số lượng vượt tồn kho                    | Tồn kho = n               | Nhấn "+" đến n + 1              | Số lượng = n + 1 > tồn kho      | Hiển thị thông báo: "Số lượng không hợp lệ                  |                 |
| TC011        | Giảm số lượng sản phẩm                        | Số lượng > 1              | Nhấn "-"                        | Số lượng từ 3 → 2               | Số lượng giảm                                               |                 |
| TC012        | Giảm số lượng sản phẩm dưới 1                 | Số lượng = 1              | Nhấn "-"                        | -                               | Số lượng vẫn là 1                                           |                 |
| TC013        | Nhấn “Thêm vào giỏ hàng” thành công           | Chọn sản phẩm còn hàng    | Nhấn nút                        | Màu: Đen, Size: 38, Số lượng: 1 | Hiển thị thông báo thành công                               |                 |
| TC014        | Mô tả sản phẩm dài vẫn hiển thị tốt           | Mô tả dài nhiều dòng      | Ấn vào sản phẩm ở màn hình home | Mô tả > 7 dòng                  | Có scroll, không tràn                                       |                 |
| TC015        | Lỗi mạng khi thêm vào giỏ hàng                | API lỗi 500               | Nhấn nút                        | Kết nối kém                     | Hiển thị thông báo lỗi từ server                            |                 |
| TC016        | Timeout khi thêm giỏ hàng                     | API mất kết nối           | Nhấn nút                        | Server delay > 30s              | Thông báo lỗi, không treo app                               |                 |
| TC017        | Kiểm tra load lại ảnh khi mất mạng            | Mạng bị ngắt rồi bật lại  | Mở lại màn hình                 | -                               | Ảnh được reload khi có mạng                                 |                 |


## Màn hình menu (Sau khi ấn vào biểu tương menu ở màn hình Home)

| **Test Case ID** | **Mô Tả**                              | **Điều Kiện Tiên Quyết**  | **Bước Thực Hiện**              | **Trường Hợp Dữ Liệu**          | **Kết Quả Mong Đợi**                                        | **Kết Quả Thực Tế** |
| ---------------- | -------------------------------------- | ------------------------- | ------------------------------- | ------------------------------- | ----------------------------------------------------------- | ------------------- |
| TC001           | Kiểm tra điều hướng đến màn hình menu  | Người dùng đang ở màn hình Home, biểu tượng menu hiển thị | 1. Vào màn hình Home.<br>2. Nhấn vào biểu tượng menu (biểu tượng người) ở góc dưới bên phải. | Người dùng đã đăng nhập với tài khoản hợp lệ (Nguyên Phạm, nguyen030904@gmail.com). | Màn hình menu trượt vào từ trái, hiển thị thông tin hồ sơ người dùng (Nguyên Phạm, nguyen030904@gmail.com) và tùy chọn "Đăng Xuất". | [Điền khi test]    |
| TC002           | Kiểm tra hiển thị thông tin hồ sơ      | Người dùng đã đăng nhập với thông tin hồ sơ (Nguyên Phạm, nguyen030904@gmail.com). | 1. Vào màn hình Home.<br>2. Nhấn vào biểu tượng menu.<br>3. Quan sát phần thông tin hồ sơ. | Tài khoản có thông tin đầy đủ (tên, email, hình đại diện). | Màn hình menu hiển thị thông tin hồ sơ với tên "Nguyên Phạm", email "nguyen030904@gmail.com" và hình đại diện. | [Điền khi test]    |
| TC003           | Kiểm tra chức năng đăng xuất           | Người dùng đã đăng nhập và ở màn hình menu. | 1. Vào màn hình Home.<br>2. Nhấn vào biểu tượng menu.<br>3. Nhấn vào nút "Đăng Xuất". | Người dùng đang ở trạng thái đã đăng nhập. | Người dùng được đăng xuất và ứng dụng chuyển hướng đến màn hình đăng nhập. | [Điền khi test] |
| TC004           | Kiểm tra điều hướng đến màn hình hồ sơ | Người dùng đã đăng nhập và ở màn hình menu. | 1. Vào màn hình Home.<br>2. Nhấn vào biểu tượng menu.<br>3. Nhấn vào phần thông tin hồ sơ. | Người dùng đã đăng nhập với tài khoản có thông tin hồ sơ đầy đủ. | Ứng dụng điều hướng đến màn hình hồ sơ người dùng, hiển thị đầy đủ thông tin cá nhân của người dùng. | [Điền khi test] |




## Màn Profile
| **Test Case ID** | **Mô Tả**                              | **Điều Kiện Tiên Quyết**            | **Bước Thực Hiện**                          | **Trường Hợp Dữ Liệu**              | **Kết Quả Mong Đợi**                              | **Kết Quả Thực Tế** |
|-----------------|----------------------------------------|-------------------------------------|------------------------------------------------|-------------------------------------|--------------------------------------------------|---------------------|
| TC_Profile_01   | Kiểm tra hiển thị thông tin hồ sơ - Bình thường | Người dùng đã đăng nhập thành công | 1. Đăng nhập với tài khoản (Nguyen Pham, nguyen030904@gmail.com)<br>2. Vào màn hình "Hồ sơ của tôi" | Thông tin đầy đủ: Tên, Email, Mật khẩu, Số điện thoại, Địa chỉ | - Hiển thị tiêu đề "Hồ sơ của tôi"<br>- Hiển thị avatar<br>- Tên: "Nguyen Pham"<br>- Email: "nguyen030904@gmail.com"<br>- Mật khẩu: "****"<br>- Số điện thoại: "0979836562"<br>- Địa chỉ: "Hà Nội" | [Điền khi test]    |
| TC_Profile_02   | Kiểm tra nút quay lại | Người dùng đã đăng nhập và ở màn hình hồ sơ | 1. Vào màn hình "Hồ sơ của tôi"<br>2. Nhấn vào biểu tượng quay lại (mũi tên trái) | Không yêu cầu dữ liệu cụ thể | Điều hướng trở lại màn hình trước đó (VD: màn hình Home) | [Điền khi test]    |
| TC_Profile_03   | Kiểm tra chức năng cập nhật thông tin | Người dùng đã đăng nhập và ở màn hình hồ sơ | 1. Vào màn hình "Hồ sơ của tôi"<br>2. Nhấn nút "Sửa thông tin" | - Tên: "Nguyen Pham"<br>- Email: "nguyen030904@gmail.com"<br>- Số điện thoại: "0979836562"<br>- Địa chỉ: "Hà Nội" | - Chuyển hướng đến màn hình chỉnh sửa thông tin<br>- Hiển thị các trường thông tin để chỉnh sửa | [Điền khi test]    |
| TC_Profile_04   | Kiểm tra chức năng đổi mật khẩu | Người dùng đã đăng nhập và ở màn hình hồ sơ | 1. Vào màn hình "Hồ sơ của tôi"<br>2. Nhấn nút "Đổi mật khẩu" | Mật khẩu hiện tại: "****" | - Chuyển hướng đến màn hình đổi mật khẩu<br>- Yêu cầu nhập mật khẩu cũ và mật khẩu mới | [Điền khi test]    |
| TC_Profile_05   | Kiểm tra hiển thị khi thiếu thông tin (Số điện thoại) | Người dùng đã đăng nhập với thông tin thiếu Số điện thoại | 1. Đăng nhập với tài khoản thiếu Số điện thoại<br>2. Vào màn hình "Hồ sơ của tôi" | - Tên: "Nguyen Pham"<br>- Email: "nguyen030904@gmail.com"<br>- Mật khẩu: "****"<br>- Số điện thoại: (null)<br>- Địa chỉ: "Hà Nội" | - Hiển thị "Đang cập nhật" | [Điền khi test]    |
| TC_Profile_06   | Kiểm tra hiển thị khi thiếu thông tin (Địa chỉ) | Người dùng đã đăng nhập với thông tin thiếu Địa chỉ | 1. Đăng nhập với tài khoản thiếu Địa chỉ <br> V2. Vào màn hình "Hồ sơ của tôi" | - Tên: "Nguyen Pham"<br>- Email: "nguyen030904@gmail.com"<br>- Mật khẩu: "****"<br>- Số điện thoại: "0979836562"<br>- Địa chỉ: (null) | - Hiển thị "Đang cập nhật" | [Điền khi test]    |
| TC_Profile_07   | Kiểm tra giao diện khi mất kết nối internet | Người dùng đã đăng nhập và ngắt kết nối internet | 1. Đăng nhập thành công<br>2. Ngắt kết nối internet<br>3. Vào màn hình "Hồ sơ của tôi" | Không có kết nối internet | - Hiển thị thông báo: "Không có kết nối internet. Vui lòng kiểm tra kết nối." | [Điền khi test]    |



