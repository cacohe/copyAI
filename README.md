# 文案生成器

基于 AI 的文案生成工具，使用 LLM 为多个平台生成营销内容。

## 功能特性

- **多平台支持**：为小红书、微信公众号、抖音、微博等平台生成内容
- **AI 驱动**：使用 LLM API（OpenAI、Gemini、DeepSeek 等）进行智能内容生成
- **用户认证**：使用 Clerk 进行安全的登录/注册
- **历史管理**：保存和管理生成的内容历史
- **多语言支持**：支持英语和中文
- **主题支持**：深色和浅色模式

## 技术栈

- **框架**：Next.js 16 (App Router)
- **UI**：React 19, Radix UI, Tailwind CSS 4
- **数据库**：Neon (PostgreSQL) + Prisma
- **认证**：Clerk
- **AI**：OpenAI 兼容 API（可配置）

## 快速开始

1. 安装依赖：

```bash
pnpm install
```

2. 配置环境变量：

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Neon（PostgreSQL）
DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require

# LLM API
AI_API_KEY=your_api_key
AI_API_ENDPOINT=your_endpoint
AI_MODEL_NAME=your_model_name
AI_API_FORMAT=openai  # 或 gemini
```

3. 初始化数据库：

```bash
pnpm db:migrate
```

首次本地开发也可使用：

```bash
pnpm db:push
```

4. 运行开发服务器：

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
├── src/                        # 应用程序代码
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 登录、注册（Clerk）
│   │   ├── (dashboard)/        # 仪表板路由组
│   │   ├── actions/            # Server Actions
│   │   └── page.tsx            # 落地页
│   ├── components/             # React 组件
│   ├── hooks/                  # 客户端 Hooks
│   ├── lib/                    # 工具、常量、基础设施
│   │   ├── auth/               # Clerk
│   │   ├── constants/          # 平台、落地页配置
│   │   ├── prisma.ts           # server-only
│   │   └── llm-client.ts       # server-only
│   ├── messages/               # 多语言文案
│   ├── services/dashboard/     # 业务逻辑（server-only）
│   │   ├── ai.ts
│   │   ├── contents.ts
│   │   └── history.ts
│   ├── types/dashboard/        # 类型定义
│   └── proxy.ts                # 路由鉴权（Clerk）
├── prisma/                     # Prisma schema 与迁移
├── public/                     # 静态资源
└── package.json 等配置文件     # 保留在根目录
```

## 许可证

MIT
