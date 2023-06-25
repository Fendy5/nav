# 使用Node.js作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 将项目文件复制到工作目录中
COPY package.json yarn.lock ./

# 淘宝镜像源
RUN yarn config set registry https://registry.npm.taobao.org/

# 安装依赖项
RUN yarn install --frozen-lockfile

# 将整个项目复制到工作目录中
COPY ./build .

# 构建项目
RUN yarn build

# 暴露Next.js应用程序的默认端口
EXPOSE 5042

# 启动Next.js应用程序
CMD ["yarn", "start"]
