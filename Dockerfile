# 基础镜像
FROM registry.cn-beijing.aliyuncs.com/o-w-o/app-daemon:latest

# 对应 pom.xml 文件中的 dockerfile-maven-plugin 插件 buildArgs 配置项 JAR_FILE 的值
ARG DIST_DIR
ARG PORT

WORKDIR /app

# 复制打包完成后的文件到 /app 目录下
COPY ${DIST_DIR} .

RUN npm ci -g nodemone
RUN npm ci -production

# 使用端口 3000 [默认]
EXPOSE ${PORT}

# 启动容器时执行
ENTRYPOINT npm run start


