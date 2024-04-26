# 第一阶段：安装依赖并构建项目
# 使用带有Node.js的官方Node镜像
FROM node:16-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制项目中的package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：设置生产环境
# 使用Nginx来提供静态文件服务
FROM nginx:stable-alpine as production-stage

# 从构建阶段复制构建出的文件到Nginx的服务目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 当容器启动时运行Nginx
CMD ["nginx", "-g", "daemon off;"]
