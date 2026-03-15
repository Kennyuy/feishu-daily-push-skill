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

## 🔧 配置参数详解 - 如何获取飞书凭证

### 📌 步骤 1：获取 FEISHU_APP_ID 和 FEISHU_APP_SECRET

这两个参数需要创建飞书自建应用来获取。

#### 1.1 访问飞书开放平台

打开浏览器访问：**https://open.feishu.cn/**

使用你的飞书账号登录（需要是企业管理员或有应用创建权限）。

#### 1.2 进入「企业自建应用」管理后台

1. 登录后，点击顶部导航栏的 **「应用开发」**
2. 选择左侧菜单的 **「企业自建应用」**
3. 点击 **「创建应用」** 按钮

#### 1.3 填写应用基本信息

- **应用名称**：例如「每日推送机器人」
- **应用图标**：可上传自定义图标（可选）
- **应用描述**：例如「用于向群组发送定时推送消息」
- 点击 **「创建」**

#### 1.4 获取 App ID 和 App Secret

创建成功后，会自动跳转到应用管理页面：

1. 在 **「应用凭证」** 或 **「基础信息」** 页面
2. 找到以下两个值：
   - **App ID**：格式类似 `cli_a9203066c3229bca`
   - **App Secret**：格式类似 `JK5k0zNVjlI7nxBsGb8ATbTcBhVkFhNL`
3. 点击 App Secret 旁边的 **「查看」** 或 **「复制」** 按钮（可能需要验证）

#### 1.5 配置应用权限

在应用管理页面，找到 **「权限管理」** 或 **「应用权限」**：

1. 点击 **「添加权限」**
2. 搜索并添加以下权限：
   - **发送消息**（`im:message` 或 `im:message:send_as_bot`）
   - **获取用户信息**（可选，`contact:user`）
3. 点击 **「申请」** 或 **「保存」**
4. 如果是企业应用，可能需要管理员审批

#### 1.6 发布应用

1. 在应用管理页面，找到 **「版本管理」** 或 **「发布」**
2. 点击 **「发布」** 或 **「启用」**
3. 确认发布后，应用正式生效

---

### 📌 步骤 2：获取 FEISHU_CHAT_IDS（群组 ID）

群组 ID 是飞书群聊的唯一标识，用于向指定群组发送消息。

#### 方法 A：从群聊链接获取（推荐）

1. 在飞书客户端中，打开目标群聊
2. 点击右上角的 **「群设置」**（齿轮图标）
3. 找到 **「群链接」** 或 **「分享群聊」**
4. 群链接格式类似：
   ```
   https://app.feishu.cn/chat/oc_1188b59c0aa1db54921e2d041712fce2
   ```
5. 链接最后的 `oc_xxxxxxxxxxxxxxxxxxxxx` 就是 **Chat ID**

#### 方法 B：从群设置页面获取

1. 打开目标群聊
2. 点击右上角的 **「群设置」**
3. 在设置页面中查找 **「群 ID」** 或 **「Chat ID」**
4. 复制该 ID（格式：`oc_xxxxxxxxxxxxxxxxxxxxx`）

#### 方法 C：通过 API 获取（高级）

如果你有多个群组，可以使用飞书 API 批量获取：

```bash
curl -X GET "https://open.feishu.cn/open-apis/im/v1/chats" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### 配置多个群组

将获取到的 Chat ID 用逗号分隔：

```bash
export FEISHU_CHAT_IDS="oc_1188b59c0aa1db54921e2d041712fce2,oc_4f816f483edeab44f12368ea7ffe2555,oc_7233f554f833013621590d54f6f5668a"
```

---

### 📌 步骤 3：将应用添加到群组

获取 App ID 和 Chat ID 后，需要将应用添加到目标群组才能发送消息。

#### 方法 A：在群组中添加机器人

1. 打开目标群聊
2. 点击右上角的 **「群设置」**
3. 找到 **「群机器人」** 或 **「添加机器人」**
4. 点击 **「添加」**
5. 在机器人列表中找到你创建的应用（例如「每日推送机器人」）
6. 点击 **「添加」** 确认

#### 方法 B：通过应用管理后台添加

1. 回到飞书开放平台的应用管理页面
2. 找到 **「应用功能」** → **「机器人」** 或 **「群组」**
3. 点击 **「添加群组」**
4. 选择或搜索目标群组
5. 确认添加

---

### 📌 步骤 4：获取 FEISHU_WEBHOOK_URL（外部群推送，可选）

Webhook 用于向外部群（非企业自建应用所在组织的群）发送消息。

#### 4.1 在群组中添加自定义机器人

1. 打开目标群聊
2. 点击右上角的 **「群设置」**
3. 找到 **「群机器人」**
4. 点击 **「添加机器人」**
5. 选择 **「自定义机器人」**（不是自建应用）
6. 填写机器人名称（例如「推送助手」）
7. 点击 **「添加」**

#### 4.2 获取 Webhook URL

1. 添加成功后，会显示一个 Webhook URL
2. 格式类似：
   ```
   https://open.feishu.cn/open-apis/bot/v2/hook/929362f9-c86c-4e9d-9bdf-8d81feeb6733
   ```
3. 点击 **「复制」** 按钮保存

#### 4.3 安全设置（可选但推荐）

添加 Webhook 时，可以设置安全验证：

- **关键词过滤**：消息必须包含特定关键词才能发送
- **IP 白名单**：只允许指定 IP 地址发送消息
- **签名验证**：使用 HMAC-SHA256 签名（需要代码支持）

如果设置了关键词过滤，确保你的推送内容包含该关键词。

---

### 📌 步骤 5：验证配置

配置完成后，可以测试是否正常工作。

#### 测试命令

```bash
# 加载环境变量
source ~/.bashrc

# 测试发送一条消息
node src/index.js --content "测试消息" --groups "你的 Chat ID"
```

#### 预期输出

```
========== 开始执行飞书推送任务 ==========
推送内容长度：6 字符
目标群组数：1
✅ 获取 Feishu Token 成功
✅ 发送到 oc_xxxxxxxxxxxxx 成功
========== 推送任务完成 ==========
成功：1/1 群组
```

如果收到消息，说明配置正确！

---

## 🔧 配置参数说明

| 变量名 | 说明 | 示例 | 获取方式 |
|--------|------|------|----------|
| `FEISHU_APP_ID` | 飞书自建应用的 App ID | `cli_a9203066c3229bca` | 飞书开放平台 → 企业自建应用 → 基础信息 |
| `FEISHU_APP_SECRET` | 飞书自建应用的 App Secret | `JK5k0zNVjlI7nxBsGb8ATbTcBhVkFhNL` | 飞书开放平台 → 企业自建应用 → 应用凭证 |
| `FEISHU_CHAT_IDS` | 目标群组 ID 列表（逗号分隔） | `oc_xxx1,oc_xxx2,oc_xxx3` | 群聊设置 → 群链接/群 ID |
| `FEISHU_WEBHOOK_URL` | 外部群 Webhook URL（可选） | `https://open.feishu.cn/open-apis/bot/v2/hook/xxx` | 群机器人 → 自定义机器人 |

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
- 消息发送 API：https://open.feishu.cn/document/ukTMukTMukTM/ucjM14i17MjL0SMN

---

## ❓ 常见问题

### Q: App Secret 无法查看/复制？
A: 确保你是应用创建者或管理员，可能需要重新登录或联系企业管理员。

### Q: 发送消息失败，提示权限不足？
A: 检查应用是否已添加目标权限（`im:message:send_as_bot`），并确保应用已发布。

### Q: 群组 ID 找不到？
A: 尝试从群聊链接中获取，或联系群管理员查看群设置。

### Q: Webhook 发送失败？
A: 检查 Webhook URL 是否正确，以及是否设置了关键词过滤（消息需包含关键词）。

---

## 📄 许可证

MIT License
