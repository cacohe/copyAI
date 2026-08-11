# 文案生成器

基于 AI 的文案生成工具，使用 LLM 为多个平台生成营销内容。

## 功能特性

- **多平台支持**：为小红书、微信公众号、抖音、微博等平台生成内容
- **AI 驱动**：使用 LLM API（OpenAI、Gemini、DeepSeek 等）进行智能内容生成
- **用户认证**：使用 Supabase 进行安全的登录/注册
- **历史管理**：保存和管理生成的内容历史
- **多语言支持**：支持英语和中文
- **主题支持**：深色和浅色模式

## 技术栈

- **框架**：Next.js 16 (App Router)
- **UI**：React 19, Radix UI, Tailwind CSS 4
- **数据库**：Supabase (PostgreSQL)
- **认证**：Supabase Auth
- **AI**：OpenAI 兼容 API（可配置）

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 配置环境变量：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key

# LLM API
AI_API_KEY=your_api_key
AI_API_ENDPOINT=your_endpoint
AI_MODEL_NAME=your_model_name
AI_API_FORMAT=openai  # 或 gemini
```

3. 设置 Supabase 数据库：

在 Supabase 仪表板中运行 `supabase.sql` 中的 SQL 命令。

4. 运行开发服务器：

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
├── app/                    # Next.js app router 页面
│   ├── api/               # API 路由
│   │   ├── (auth)/        # 认证 API（登录、注册、登出）
│   │   └── (dashboard)/   # 仪表板 API（生成、历史）
│   ├── dashboard/         # 仪表板页面
│   └── page.tsx           # 落地页
├── components/            # React 组件
│   ├── common/            # 共享组件
│   ├── dashboard/         # 仪表板组件
│   ├── login/             # 登录页面组件
│   ├── ui/                # UI 组件（基于 Radix）
│   └── welcome/           # 落地页组件
├── contexts/              # React 上下文
├── hooks/                 # 自定义 React Hooks
├── lib/                   # 工具库
│   ├── supabase/          # Supabase 客户端
│   └── llm-client.ts      # LLM API 客户端
├── services/              # 业务逻辑服务
└── types/                 # TypeScript 类型定义
```

## 许可证

MIT
