# Feishu Daily Push Skill

## Description
飞书每日推送技能。支持向多个飞书群组发送定时推送消息，包括 AI 新闻、GitHub 学习、OpenClaw 动态等内容。

## Activation
当用户提到以下关键词时激活此技能：
- 飞书推送
- 每日推送
- 定时推送
- 群消息推送
- feishu push
- daily push

## Capabilities
- 向多个飞书群组发送消息
- 支持内部群（机器人）和外部群（Webhook）
- 支持自定义推送内容和群组配置
- 动态获取 Feishu Access Token（避免过期）
- 日志记录推送状态

## Configuration
需要在 TOOLS.md 或环境变量中配置：
- FEISHU_APP_ID: 飞书应用 App ID
- FEISHU_APP_SECRET: 飞书应用 App Secret
- FEISHU_CHAT_IDS: 目标群组 ID 列表（JSON 数组）
- FEISHU_WEBHOOK_URL: 外部群 Webhook URL（可选）

## Usage
```bash
# 执行推送
openclaw skill run feishu-daily-push --content "推送内容" --groups "群 ID1,群 ID2"

# 或通过 cron 定时执行
0 9 * * * openclaw skill run feishu-daily-push
```

## Files
- `src/index.js` - 主要推送逻辑
- `src/push-all.js` - 全部群组推送入口
- `package.json` - 依赖配置

## Notes
- 推送前会自动获取最新的 Access Token
- 支持失败重试和日志记录
- 推送内容支持 Markdown 格式
