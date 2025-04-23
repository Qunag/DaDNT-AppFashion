FROM node:alpine

# Tạo thư mục và phân quyền
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app
WORKDIR /usr/src/node-app

# Copy file với quyền user node
COPY --chown=node:node package.json package-lock.json ./

# Dùng user node để cài npm
USER node
RUN npm install

# Copy phần còn lại
COPY --chown=node:node . .

# Expose và chạy app
EXPOSE 3000
CMD ["npm", "start"]
