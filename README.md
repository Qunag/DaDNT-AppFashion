# Đồ án Đa nền tảng - Cửa hàng bán giày online

[![Build Status](https://travis-ci.org/hagopj13/node-express-boilerplate.svg?branch=master)](https://travis-ci.org/hagopj13/node-express-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/hagopj13/node-express-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/hagopj13/node-express-boilerplate?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
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
  - Redux Toolkit
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
- Backend NodeJS phục vụ API RESTful cho React Native App.

### 4.2 Sơ đồ kiến trúc

React Native (Mobile App) ---> API Server (NodeJS + Express) ---> MongoDB (Database)

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
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

Để xem danh sách các API có sẵn và thông số kỹ thuật của chúng, hãy chạy máy chủ và truy cập `http://localhost:3000/v1/docs` trong trình duyệt của bạn. Trang tài liệu này được tạo tự động bằng cách sử dụng các định nghĩa swagger được viết dưới dạng nhận xét trong các tệp định tuyến.

### API Endpoints

Danh sách các tuyến đường có sẵn:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - send verification email\
`POST /v1/auth/verify-email` - verify email
``

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

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

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('manageUsers'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

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

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```javascript
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```javascript
const options = {
  sortBy: 'name:desc', // sort order
  limit: 5, // maximum results per page
  page: 2, // page number
};
```

The plugin also supports sorting by multiple criteria (separated by a comma): `sortBy: name:desc,role:asc`

The `paginate` method returns a Promise, which fulfills with an object having the following properties:

```json
{
  "results": [],
  "page": 2,
  "limit": 5,
  "totalPages": 10,
  "totalResults": 48
}
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
