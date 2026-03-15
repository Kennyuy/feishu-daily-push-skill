# 飞书每日推送 Skill

向飞书（Lark）群组发送定时推送消息的技能。

## 功能

- ✅ 向多个飞书群组发送消息
- ✅ 支持内部群（机器人）和外部群（Webhook）
- ✅ 动态获取 Access Token（避免过期）
- ✅ 预设 5 种推送任务（AI 新闻、GitHub 学习、OpenClaw 动态等）
- ✅ 日志记录和失败重试

## 安装

```bash
cd /path/to/skill
npm install
```

## 配置

在环境变量或 `.env` 文件中配置：

```bash
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxx
FEISHU_CHAT_IDS=oc_xxx1,oc_xxx2,oc_xxx3
FEISHU_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx
```

## 使用

### 单次推送

```bash
node src/index.js --content "推送内容" --groups "oc_xxx1,oc_xxx2"
```

### 全部预设任务推送

```bash
node src/push-all.js
```

### 通过 OpenClaw 调用

```bash
openclaw skill run feishu-daily-push
```

## 预设推送任务

| 任务名 | 目标群组 | 内容 |
|--------|----------|------|
| daily-ai-news | 内部群 + 外部群 | AI 每日新闻摘要 |
| daily-github-learning | GitHub 学习群 | 热门 AI 项目推荐 |
| weibo-bloggers-daily | GitHub 学习群 | 微博博主推荐项目 |
| daily-openclaw-learning | OpenClaw 学习群 | OpenClaw 动态更新 |
| daily-agent-learning | Agent 学习群 | Agent 学习资源 |

## Cron 定时任务示例

```cron
# 每天早上 9 点执行全部推送
0 9 * * * cd /path/to/feishu-daily-push && node src/push-all.js
```

## 许可证

MIT
