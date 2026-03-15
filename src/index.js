#!/usr/bin/env node
/**
 * 飞书每日推送技能 - 主入口
 * 支持向多个飞书群组发送推送消息
 */

const fetch = require('node-fetch');

// 配置（可从环境变量或参数获取）
const CONFIG = {
  APP_ID: process.env.FEISHU_APP_ID || 'cli_a9203066c3229bca',
  APP_SECRET: process.env.FEISHU_APP_SECRET || 'JK5k0zNVjlI7nxBsGb8ATbTcBhVkFhNL',
  WORKSPACE: process.env.WORKSPACE || '/home/ubuntu/.openclaw/workspace',
};

/**
 * 获取 Feishu Access Token
 */
async function getFeishuToken() {
  try {
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
  } catch (error) {
    console.error('❌ 获取 Feishu Token 失败:', error.message);
    throw error;
  }
}

/**
 * 发送飞书消息到指定群组
 * @param {string} chatId - 群组 ID
 * @param {string} message - 消息内容
 * @param {string} token - Access Token
 */
async function sendFeishuMessage(chatId, message, token) {
  try {
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
  } catch (error) {
    console.error(`❌ 发送到 ${chatId} 失败:`, error.message);
    return false;
  }
}

/**
 * 发送 Webhook 消息（外部群）
 * @param {string} message - 消息内容
 * @param {string} webhookUrl - Webhook URL
 */
async function sendWebhookMessage(message, webhookUrl) {
  if (!webhookUrl) {
    console.log('⚠️ 未配置 Webhook URL，跳过外部群推送');
    return false;
  }
  try {
    const response = await fetch(webhookUrl, {
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
  } catch (error) {
    console.error('❌ Webhook 发送失败:', error.message);
    return false;
  }
}

/**
 * 主函数 - 执行推送
 */
async function main() {
  const args = process.argv.slice(2);
  
  // 解析参数
  let content = null;
  let groups = [];
  let webhookUrl = process.env.FEISHU_WEBHOOK_URL || null;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--content' && args[i + 1]) {
      content = args[++i];
    } else if (args[i] === '--groups' && args[i + 1]) {
      groups = args[++i].split(',').map(g => g.trim());
    } else if (args[i] === '--webhook' && args[i + 1]) {
      webhookUrl = args[++i];
    }
  }
  
  // 默认推送内容（AI 每日新闻）
  if (!content) {
    content = `🤖 AI 每日新闻 - ${new Date().toISOString().split('T')[0]}

📰 今日 AI 新闻摘要：

1️⃣ OpenClaw 创业扶持政策
   多地提供免费算力支持

2️⃣ AI 智能体技术进展
   上海英矽智能完成升级

3️⃣ AI 与人类认知关系讨论
   深度评论发布

✅ 推送完成`;
  }
  
  // 默认群组
  if (groups.length === 0) {
    groups = process.env.FEISHU_CHAT_IDS 
      ? process.env.FEISHU_CHAT_IDS.split(',') 
      : ['oc_1188b59c0aa1db54921e2d041712fce2'];
  }
  
  console.log('========== 开始执行飞书推送任务 ==========');
  console.log(`推送内容长度：${content.length} 字符`);
  console.log(`目标群组数：${groups.length}`);
  
  // 获取 Token
  const token = await getFeishuToken();
  console.log('✅ 获取 Feishu Token 成功');
  
  // 发送到各群组
  let successCount = 0;
  for (const chatId of groups) {
    const success = await sendFeishuMessage(chatId, content, token);
    if (success) successCount++;
  }
  
  // 发送 Webhook（外部群）
  if (webhookUrl) {
    await sendWebhookMessage(content, webhookUrl);
  }
  
  console.log('========== 推送任务完成 ==========');
  console.log(`成功：${successCount}/${groups.length} 群组`);
  
  return successCount === groups.length ? 0 : 1;
}

// 执行
main().then(code => process.exit(code)).catch(err => {
  console.error('推送失败:', err);
  process.exit(1);
});
