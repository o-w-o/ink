# 基础镜像
FROM registry-vpc.cn-beijing.aliyuncs.com/o-w-o/app-starter:latest

ARG DIST_DIR
ARG PORT

WORKDIR /app

# 复制打包完成后的文件到 /app 目录下
COPY ${DIST_DIR} .

COPY package.json .
COPY package-lock.json .

RUN npm ci --no-optional

# 使用端口 3000 [默认]
EXPOSE ${PORT}

# 启动容器时执行
ENTRYPOINT NODE_ENV=production npm run start
