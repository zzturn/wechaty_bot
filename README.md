# 微信机器人

这个项目是一个使用 Node.js 和基于 Wechaty 的微信机器人。它的主要功能是为微信文章生成GitHub快照以备份，并为微信文章生成AI摘要。未来会加入更多的功能。我们期待这个项目能够成为一个大型的开源项目，因此我们希望你能加入我们的开发团队，一起为这个项目贡献你的力量。

## 功能

- 为微信文章生成GitHub快照以备份
- 为微信文章生成AI摘要

## 快速开始

对于一般用户：

1. 在本地创建一个新的目录：

```bash
mkdir wechaty_bot
cd wechaty_bot
```

2. 在新的目录中创建 `.env` 文件，并设置以下环境变量：

```bash
curl -o .env https://raw.githubusercontent.com/zzturn/wechaty_bot/master/.env.example
vim .env
# 编辑 .env 文件
```

3. 使用 Docker Compose 启动：

```bash
docker-compose up
```

4. 扫描二维码登录微信

```bash
docker logs -f wechaty_bot
# 接着会出现一个二维码，使用微信扫描即可登录
```

对于开发者：

1. 克隆本项目：

```bash
git clone https://github.com/zzturn/wechaty_bot.git
cd wechaty_bot
```

2. 启动 Selenium 或修改代码中的Selenium配置。

```bash
# 启动 Selenium
docker run -d --name selenium_chrome -p 4444:4444 --shm-size 2g selenium/standalone-chrome:4.14.1-20231025
# 或者修改代码中的Selenium配置
vim util/get_wechat_article.js # 修改 requestWithSelenium 方法的参数
```

3. 修改 `.env` 文件中的环境变量。

```bash
vim .env
```

4. 安装依赖并启动：

```bash
npm install
npm start
```

## 贡献

我们欢迎所有人为这个项目做出贡献。无论你是想要修复bug，添加新的功能，有新的功能需求，还是改进文档，我们都非常欢迎你的参与。

如果你想要为这个项目做出贡献，你可以遵循以下步骤：

1. Fork这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. Push到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

或者提出你的想法 [issues](https://github.com/zzturn/wechay_bot/issues/new)

## 许可证

这个项目使用MIT许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 联系

如果你有任何问题，欢迎通过以下方式联系我们：

- GitHub [@zzturn](https://github.com/zzturn)


## 鸣谢

- [Node.js](https://nodejs.org/)
- [Wechaty](https://github.com/wechaty/wechaty)
- [Selenium](https://www.selenium.dev/)
- [智谱 AI](https://www.zhipuai.cn/)

我们期待你的参与，一起让这个项目更好！