# 使用Node.js作为基础镜像
FROM node:18-alpine AS builder
# 设置工作目录
WORKDIR /app
# 将项目文件复制到工作目录中
COPY package*.json ./
# 设置淘宝镜像源并且安装依赖项
RUN yarn install --registry=https://registry.npm.taobao.org/ --frozen-lockfile
COPY . .
# 构建项目
RUN yarn build && ls /app

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env.production ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
#ENV TZ=Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 暴露Next.js应用程序的默认端口
EXPOSE 5042
# 启动Next.js应用程序
CMD ["yarn", "start"]
