# el-bot

[![api](https://github.com/YunYouJun/el-bot/workflows/api/badge.svg)](https://www.yunyoujun.cn/el-bot/)
[![npm](https://img.shields.io/npm/v/el-bot?logo=npm)](https://www.npmjs.com/package/el-bot)
[![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/YunYouJun/el-bot/mirai-ts?filename=packages%2Fel-bot%2Fpackage.json&logo=typescript)](https://github.com/YunYouJun/mirai-ts)
[![QQ Group](https://img.shields.io/badge/QQ%20Group-707408530-12B7F5?logo=tencent-qq)](https://shang.qq.com/wpa/qunwpa?idkey=5b0eef3e3256ce23981f3b0aa2457175c66ca9194efd266fd0e9a7dbe43ed653)
[![Telegram](https://img.shields.io/badge/Telegram-elpsy__cn-blue?logo=telegram)](https://t.me/elpsy_cn)
[![GitHub](https://img.shields.io/github/license/YunYouJun/el-bot)](https://github.com/YunYouJun/el-bot/blob/master/LICENSE)
![node-current](https://img.shields.io/node/v/el-bot)

一个基于 Bun，使用 TS 编写，快速、可配置、可自定义插件的 QQ 机器人框架。

> el-bot 是一个非盈利的开源项目，仅供交流学习使用。请勿用于商业或非法用途。
> 本项目为个人学习项目，与腾讯公司并无关联。

- 使用文档：<https://docs.bot.elpsy.cn>
- API 文档：<https://www.yunyoujun.cn/el-bot/>

## ⚠️ BREAKING CHANGES (REFACTORING)

**正在重构开发中，因此它的很多代码可能已经失效，并将被移除。**

- QQ
  - 迁移 [mirai](https://github.com/mamoe/mirai) 至 [NapCatQQ](https://github.com/NapNeko/NapCatQQ)
  - 迁移 [mirai-ts](https://github.com/YunYouJun/mirai-ts) 至 [node-napcat-ts](https://github.com/huankong-team/node-napcat-ts)
- 使用 TypeScript 作为一等公民，使用 Bun 作为默认运行时，不再支持 JS（如需要，可自行编译）
- 使用 [bun](https://bun.sh/) 替代 pnpm

## 开始

参考以下文档，启动 QQ 协议端。

- [NapCatQQ](https://github.com/NapNeko/NapCatQQ)

### 安装 Bun

```bash
# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
# Linux/macOS
curl -fsSL https://bun.sh/install | bash
```

```sh
npm install el-bot
# pnpm i el-bot
```

### 初始化文件

> 你也可以直接参考 [el-bot-template](https://github.com/ElpsyCN/el-bot-template)。

```ts
import { Bot } from 'el-bot'

const bot = new Bot({
  qq: 114514,
  setting: {
    host: 'localhost',
    port: 4859,
    authKey: 'el-psy-congroo',
    enableWebsocket: true,
  },
  // bot: ...
})
bot.start()
```

So easy! Right?

详细使用说明请参见 [el-bot 文档](https://docs.bot.elpsy.cn/)。

### 编写插件

- [node-napcat-ts](https://github.com/huankong-team/node-napcat-ts)

### 启动

```bash
npx el-bot
```

### 升级

```sh
npm install el-bot@latest
```

相关变动请参见 [Releases](https://github.com/YunYouJun/el-bot/releases)。

## 反馈

有问题和建议欢迎提 Issue，谢谢！（在此之前，请确保您已仔细阅读文档。）

## 说明

### [与 koishi 的区别](https://docs.bot.elpsy.cn/about.html#与-koishi-的区别)

## 相关项目

- [el-bot](https://github.com/YunYouJun/el-bot)：机器人主体
- [el-bot-api](https://github.com/ElpsyCN/el-bot-api): 提供一些插件的默认 API
- [el-bot-plugins](https://github.com/ElpsyCN/el-bot-plugins): el-bot 的官方插件集中地（你也可以提交 PR 或一些自己的插件链接到 README 里打广告）
- [el-bot-docs](https://github.com/ElpsyCN/el-bot-docs): el-bot 使用文档
- [el-bot-template](https://github.com/ElpsyCN/el-bot-template)：机器人模版（你可以直接使用它来生成你的机器人）
- [el-bot-web](https://github.com/ElpsyCN/el-bot-web)：机器人前端（通过网页监控与控制你的机器人）（但是还在咕咕咕）

## Thanks

- [NapCatQQ](https://github.com/NapNeko/NapCatQQ)
- [node-napcat-ts](https://github.com/huankong-team/node-napcat-ts)
- [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
- [mirai](https://github.com/mamoe/mirai)
- [mirai-console](https://github.com/mamoe/mirai-console)
- [mirai-api-http](https://github.com/mamoe/mirai-api-http)
- [mirai-ts](https://github.com/YunYouJun/mirai-ts)
- [koishi](https://github.com/koishijs/koishi)

## 启动

配置测试机器人（看情况配置吧）

```sh
cp bot/.env.example .env
```

## 参与开发

开发测试（运行起来吧）

```sh
git clone https://github.com/YunYouJun/el-bot
cd el-bot
pnpm i
```

```sh
# 启动 demo
pnpm demo

npm run dev:bot
```

开发 el-bot 库

```sh
npm run dev:lib
```

## CHANGELOG

See [CHANGELOG.md](./CHANGELOG.md).
