FROM wechaty/wechaty:latest

# 设置工作目录
WORKDIR /bot

# 将 package.json 和 package-lock.json 文件复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目源码复制到工作目录
COPY . .

# 运行你的应用程序
CMD [ "npm", "start" ]