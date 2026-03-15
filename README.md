# 飞书每日推送 Skill

向飞书（Lark）群组发送定时推送消息的 OpenClaw 技能。

---

## 🚀 快速开始

### 方法一：作为 OpenClaw Skill 使用（推荐）

适合已经在使用 OpenClaw 的用户，可通过自然语言或定时任务调用。

#### 1. 安装到 OpenClaw

```bash
# 方式 A：从 GitHub 直接安装（推荐）
openclaw skill install https://github.com/Kennyuy/feishu-daily-push-skill

# 方式 B：克隆后本地安装
git clone https://github.com/Kennyuy/feishu-daily-push-skill
cd feishu-daily-push-skill
openclaw skill link .
```

#### 2. 配置环境变量

在 `~/.bashrc` 或 OpenClaw 环境变量中配置：

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxx"
export FEISHU_CHAT_IDS="oc_xxx1,oc_xxx2,oc_xxx3"
export FEISHU_WEBHOOK_URL="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx"
```

#### 3. 使用方式

**自然语言调用：**
```
对 OpenClaw 说：
"执行飞书每日推送"
"发送今天的 AI 新闻到飞书群"
```

**命令行调用：**
```bash
openclaw skill run feishu-daily-push
```

**定时任务（Cron）：**
```cron
# 每天早上 9 点自动推送
0 9 * * * openclaw skill run feishu-daily-push
```

---

### 方法二：独立 Node.js 脚本运行

适合不使用 OpenClaw，直接运行脚本的场景。

#### 1. 安装依赖

```bash
git clone https://github.com/Kennyuy/feishu-daily-push-skill
cd feishu-daily-push-skill
npm install
```

#### 2. 配置环境变量

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxx"
export FEISHU_CHAT_IDS="oc_xxx1,oc_xxx2,oc_xxx3"
export FEISHU_WEBHOOK_URL="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx"
```

#### 3. 运行推送

```bash
# 运行全部预设任务（5 个推送任务）
node src/push-all.js

# 单次自定义推送
node src/index.js --content "推送内容" --groups "oc_xxx1,oc_xxx2"
```

---

## 📋 功能特性

| 功能 | 说明 |
|------|------|
| ✅ 多群推送 | 支持向多个飞书群组同时发送消息 |
| ✅ 双通道 | 支持内部群（机器人）+ 外部群（Webhook） |
| ✅ Token 自动刷新 | 动态获取 Access Token，避免过期问题 |
| ✅ 预设任务 | 5 种推送模板（AI 新闻、GitHub 学习等） |
| ✅ 日志记录 | 完整的推送状态和错误日志 |
| ✅ OpenClaw 集成 | 支持自然语言调用和定时任务 |

---

## 📦 预设推送任务

| 任务名 | 目标群组 | 推送内容 |
|--------|----------|----------|
| daily-ai-news | 内部群 + 外部群 | AI 每日新闻摘要 |
| daily-github-learning | GitHub 学习群 | 热门 AI 项目推荐 |
| weibo-bloggers-daily | GitHub 学习群 | 微博博主推荐项目 |
| daily-openclaw-learning | OpenClaw 学习群 | OpenClaw 动态更新 |
| daily-agent-learning | Agent 学习群 | Agent 学习资源 |

---

## 🔧 配置参数说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `FEISHU_APP_ID` | 飞书应用 App ID | `cli_a9203066c3229bca` |
| `FEISHU_APP_SECRET` | 飞书应用 App Secret | `JK5k0zNVjlI7nxBsGb8ATbTcBhVkFhNL` |
| `FEISHU_CHAT_IDS` | 目标群组 ID 列表（逗号分隔） | `oc_xxx1,oc_xxx2,oc_xxx3` |
| `FEISHU_WEBHOOK_URL` | 外部群 Webhook URL（可选） | `https://open.feishu.cn/open-apis/bot/v2/hook/xxx` |

### 如何获取飞书应用凭证？

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 App ID 和 App Secret
4. 配置应用权限（消息发送权限）
5. 将应用添加到目标群组

---

## 📂 文件结构

```
feishu-daily-push-skill/
├── README.md           # 本说明文档
├── SKILL.md            # OpenClaw 技能描述文件
├── package.json        # Node.js 依赖配置
└── src/
    ├── index.js        # 主入口（单次自定义推送）
    └── push-all.js     # 全部预设任务推送入口
```

---

## 🔗 相关资源

### OpenClaw 官方
- 官网：https://openclaw.ai
- 技能市场 (ClawHub)：https://clawhub.com
- 文档：https://docs.openclaw.ai
- GitHub：https://github.com/openclaw/openclaw

### 飞书开放平台
- 开放平台：https://open.feishu.cn/
- API 文档：https://open.feishu.cn/document/
- 机器人开发：https://open.feishu.cn/document/ukTMzTM4TMzk3ESN04yM0UyNnMDO

---

## 📄 许可证

MIT License
