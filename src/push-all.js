#!/usr/bin/env node
/**
 * 飞书每日推送 - 全部群组推送入口
 * 推送 5 个预设任务到对应群组
 */

const fetch = require('node-fetch');

const CONFIG = {
  APP_ID: process.env.FEISHU_APP_ID || 'cli_a9203066c3229bca',
  APP_SECRET: process.env.FEISHU_APP_SECRET || 'JK5k0zNVjlI7nxBsGb8ATbTcBhVkFhNL',
  WEBHOOK_URL: process.env.FEISHU_WEBHOOK_URL || 'https://open.feishu.cn/open-apis/bot/v2/hook/929362f9-c86c-4e9d-9bdf-8d81feeb6733',
};

// 预设推送任务
const PUSH_TASKS = [
  {
    name: 'daily-ai-news',
    groups: ['oc_1188b59c0aa1db54921e2d041712fce2'],
    webhook: true,
    content: () => `🤖 AI 每日新闻 - ${new Date().toISOString().split('T')[0]}

📰 今日 AI 新闻摘要：

1️⃣ 多地推 OpenClaw 创业扶持政策
   合肥、深圳龙岗、无锡等地提供免费算力

2️⃣ 工信部发布 OpenClaw 安全指南
   六要六不要规范，要求权限隔离

3️⃣ AI 智能体接管生物实验室
   上海英矽智能完成升级

4️⃣ AI 与人类认知关系讨论
   上观新闻深度评论

5️⃣ AI 数字家庭医生试点
   京沪区域健康档案系统接入

✅ 推送完成`,
  },
  {
    name: 'daily-github-learning',
    groups: ['oc_4f816f483edeab44f12368ea7ffe2555'],
    webhook: false,
    content: () => `📚 GitHub 学习推送 - ${new Date().toISOString().split('T')[0]}

🔥 热门 AI 项目：

1️⃣ OpenClaw (247k★)
   全球首个登顶 GitHub 星标榜的开源 AI 助手

2️⃣ Shannon (31.5k★)
   AI 渗透测试框架，单月暴涨 21k 星

3️⃣ Flowise (49.9k★)
   低代码 AI Agent 可视化构建平台

4️⃣ Perplexica (30.5k★)
   隐私优先的 AI 问答引擎

5️⃣ AIRI (29.1k★)
   开源 AI 虚拟伴侣容器

✅ 推送完成`,
  },
  {
    name: 'weibo-bloggers-daily',
    groups: ['oc_4f816f483edeab44f12368ea7ffe2555'],
    webhook: false,
    content: () => `🔥 微博博主推荐开源项目 - ${new Date().toISOString().split('T')[0]}

📌 今日优质前沿 AI 开源项目：

1️⃣ OpenClaw (250k★)
   本地 AI 智能体网关，登顶 GitHub 总榜第一

2️⃣ LLMLingua
   微软 Prompt 压缩工具，成本降低 20 倍

3️⃣ BettaFish
   边缘设备多模态推理框架

4️⃣ MiroFish
   Rust 轻量级 Agent 运行时，安全沙箱

5️⃣ Clippy-Core (12k★)
   OpenClaw GUI 前端

✅ 推送完成`,
  },
  {
    name: 'daily-openclaw-learning',
    groups: ['oc_7233f554f833013621590d54f6f5668a'],
    webhook: false,
    content: () => `🦞 OpenClaw 学习推送 - ${new Date().toISOString().split('T')[0]}

📌 今日 OpenClaw 动态：

1️⃣ v2026.3.7 发布
   支持 GPT-5.4 与记忆热插拔

2️⃣ QClaw 正式亮相
   腾讯基于 OpenClaw 打造微信直连 AI 助手

3️⃣ ClawHub 技能市场突破 5705 项
   精选库达 3002 个高质量 Skill

4️⃣ Android 节点全面升级
   新增 photos.latest、system.notify 等 API

5️⃣ WebSocket-First 架构落地
   OpenAI 流式响应 TTFT 降低 42%

✅ 推送完成`,
  },
  {
    name: 'daily-agent-learning',
    groups: ['oc_4868b9d33ee2acb1f223a3844a70399d'],
    webhook: false,
    content: () => `🤖 Agent 学习推送 - ${new Date().toISOString().split('T')[0]}

📚 今日 Agent 学习资源：

1️⃣ 智能体革命：从工具到伙伴
   Agent 演进三阶段与商业化路径

2️⃣ 2026 奇点智能技术大会
   4 月 17-18 日上海举办

3️⃣ OpenClaw 里程碑报告
   GitHub Star 突破 25 万

4️⃣ 谷歌云 2026 AI Agent 白皮书
   企业级 Agent 治理框架

5️⃣ LLM 代理构建最佳实践
   原子智能体 + 编排层实战手册

✅ 推送完成`,
  },
];

async function getFeishuToken() {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: CONFIG.APP_ID,
      app_secret: CONFIG.APP_SECRET,
    }),
  });
  const data = await response.json();
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(`获取 Token 失败：${data.msg || 'unknown error'}`);
  }
  return data.tenant_access_token;
}

async function sendFeishuMessage(chatId, message, token) {
  const response = await fetch('https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      receive_id: chatId,
      msg_type: 'text',
      content: JSON.stringify({ text: message }),
    }),
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`发送失败：${data.msg || 'unknown error'}`);
  }
  console.log(`✅ 发送到 ${chatId} 成功`);
  return true;
}

async function sendWebhookMessage(message) {
  const response = await fetch(CONFIG.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msg_type: 'text',
      content: { text: message },
    }),
  });
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`Webhook 发送失败：${data.msg || 'unknown error'}`);
  }
  console.log('✅ Webhook 发送成功');
  return true;
}

async function main() {
  console.log('========== 开始执行每日推送任务 ==========');
  
  const token = await getFeishuToken();
  console.log('✅ 获取 Feishu Token 成功');
  
  let totalPushes = 0;
  let totalGroups = new Set();
  
  for (const task of PUSH_TASKS) {
    console.log(`推送 ${totalPushes + 1}: ${task.name}...`);
    const content = task.content();
    
    for (const chatId of task.groups) {
      await sendFeishuMessage(chatId, content, token);
      totalGroups.add(chatId);
      totalPushes++;
    }
    
    if (task.webhook) {
      await sendWebhookMessage(content);
      totalPushes++;
    }
  }
  
  console.log('========== 每日推送任务全部完成 ==========');
  console.log(`推送群组数：${totalGroups.size} 个群，${totalPushes} 次推送`);
}

main().catch(err => {
  console.error('推送失败:', err);
  process.exit(1);
});
