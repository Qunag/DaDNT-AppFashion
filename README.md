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

```bash React Native (Mobile App) ---> API Server (NodeJS + Express) ---> MongoDB (Database) 
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

## 1. Kiến trúc tổng quan

Frontend được xây dựng bằng **ReactNative** sử dụng kiến trúc component-based phân chia theo tính năng :
- `screens/` : Chứa các tệp phân loại các màn hình như (Auth , Buy , Home , v.v.)
- `component/` : Các component dùng chung như Header , Button , v.v
- `services/` : Chứa các hàm gọi API (axios)
- `constant/` : Chứa các hàm không thường xuyên thay đổi như API_ENDPOINT , themes , v.v.
- `assets/` : ảnh hệ thống


Cấu trúc thư mục :

├── App.js
├── assets/
├── components/
├── screens/
├── services/
├── styles/
├── package-lock.json/
└── ...

## 2. Các thư viện chính 

- `react-native`: khung chính để phát triển ứng dụng mobile
- `react-navigation`: điều hướng giữa các màn hình
- `axios`: gửi yêu cầu HTTP đến backend
- `react-native-vector-icons`: icon giao diện
- `@react-native-async-storage/async-storage`: lưu token/giỏ hàng local


# III. Triển khai hệ thống Backend 

## Quick Start

Để tạo một dự án, chỉ cần chạy:

```bash
npx create-nodejs-express-app <project-name>
```

hoặc

```bash
npm init nodejs-express-app <project-name>
```

## Cài đặt thủ công

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

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

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


## Commands

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

## Biến môi trường

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

## Project Structure

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

## API Documentation

Để xem danh sách các API có sẵn và thông số kỹ thuật của chúng, hãy chạy máy chủ và truy cập `http://localhost:3000/v1/docs` trong trình duyệt của bạn. Trang tài liệu này được tạo tự động bằng cách sử dụng các định nghĩa swagger được viết dưới dạng nhận xét trong các tệp định tuyến.

### API Endpoints

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



## Error Handling

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

## Validation

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

## Authentication

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

## Authorization

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

## Logging

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

## Custom Mongoose Plugins

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

### toJSON

Plugin toJSON áp dụng các thay đổi sau trong lệnh gọi chuyển đổi toJSON:

- xóa \_\_v, createdAt, updatedAt, và bất kỳ đường dẫn lược đồ nào có private: true
- thay thế \_id với id

### paginate

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
