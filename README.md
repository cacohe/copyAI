# 基于 Next.js 的【AI 文案生成】系统

- **状态：** 功能冻结，只接受文档与保活修复；已实现功能见下一节
- **Live：** [copy-ai-seven.vercel.app](https://copy-ai-seven.vercel.app)
- **记录：** [笔记](docs/NOTES.md)
- **License：** [MIT](LICENSE.md)

## 已实现功能

- 打开首页，可切换中/英界面和浅色/深色主题
- 使用 Clerk 注册或登录；成功后进入工作台 `/dashboard`
- 未登录访问工作台会被要求登录；已登录再打开首页或登录/注册页会回到工作台
- 选择平台（通用 / 小红书 / 微信公众号 / 抖音 / 微博），填写主题和可选关键词，生成文案
- 生成结果可复制；记录写入当前用户的历史列表，可点开查看、单条删除或清空全部

未实现：设置页、编辑已生成内容、流式输出、计费与限流。

## 技术栈

| 技术 | 在本项目中的应用 |
| --- | --- |
| [TypeScript](https://www.typescriptlang.org/) | 基础编程语言 |
| [Next.js](https://nextjs.org/) 16 | 全栈框架（App Router、`proxy.ts`、Server Actions） |
| [React](https://react.dev/) 19 | 落地页与工作台 UI |
| [Clerk](https://clerk.com/) | 托管认证（登录 / 注册 / OAuth / 会话） |
| [Prisma](https://www.prisma.io/) | ORM；仓库内保留 migration |
| [Neon](https://neon.tech/) | Serverless PostgreSQL，持久化保存生成历史 |
| OpenAI 兼容 API / Gemini | 文案生成；由 `AI_API_FORMAT` 切换 |
| Tailwind CSS 4、Radix UI | 页面样式与基础组件 |
| ESLint、Vitest | 静态检查与单元测试 |
| [GitHub Actions](https://github.com/features/actions) | CI：类型检查、Lint、测试与构建 |
| [Vercel](https://vercel.com/) | 线上部署 |
| pnpm 9 | 包管理 |

## 项目结构

```
copyAI/
├── .github/workflows/ci.yml       # CI 流水线
├── docs/
│   └── NOTES.md                   # 学习笔记
├── prisma/
│   ├── schema.prisma              # GeneratedContent
│   └── migrations/                # 初始化迁移
├── src/
│   ├── app/                       # 路由：落地页、登录注册、工作台
│   │   ├── (auth)/                # Clerk SignIn / SignUp
│   │   ├── (dashboard)/           # 工作台
│   │   ├── actions/               # Server Actions（薄层，先鉴权再调 services）
│   │   └── page.tsx               # 落地页
│   ├── components/                # 落地页与工作台 UI
│   ├── hooks/                     # 生成与历史的客户端状态
│   ├── lib/
│   │   ├── auth/                  # Clerk session
│   │   ├── llm-client.ts          # OpenAI / Gemini HTTP 适配（server-only）
│   │   └── prisma.ts              # Prisma Client（server-only）
│   ├── messages/                  # 中英文字典
│   ├── services/dashboard/        # 生成、写入、历史查询（server-only）
│   └── proxy.ts                   # 未登录保护工作台；已登录离开落地页/认证页
├── .env.example
├── LICENSE.md
└── package.json
```

## 快速开始

需要 **Node.js 20+** 和 **pnpm 9**。若未安装 pnpm，可先执行 `corepack enable`。

### 1. 克隆仓库并准备环境变量

Prisma CLI 读取项目根目录的 **`.env`**。Next.js 也会加载 `.env`。本项目统一使用 `.env`。

```bash
git clone https://github.com/cacohe/ai-llm-copyapp.git
cd ai-llm-copyapp
cp .env.example .env
```

Windows PowerShell 可用 `Copy-Item .env.example .env`。

需要三份外部配置：

1. [Clerk](https://dashboard.clerk.com)：创建应用，复制 Publishable Key 与 Secret Key。
2. [Neon](https://console.neon.tech/)：创建项目，复制连接串（含 `sslmode=require`）。
3. LLM：OpenAI 兼容端点（含 DeepSeek 等）或 Gemini。填写 `AI_API_KEY`、`AI_API_ENDPOINT`、`AI_MODEL_NAME`，`AI_API_FORMAT` 为 `openai` 或 `gemini`。

### 2. 安装依赖

```bash
pnpm install
```

`postinstall` 会执行 `prisma generate`。`.env` 里需要有 `DATABASE_URL` 键（上一步复制模板即可）。

### 3. 初始化 / 迁移数据库

本仓库用 Prisma Migrate，迁移文件在 `prisma/migrations/`。

**没有本地 PostgreSQL 也可以。** 把 Neon 的 **Direct** 连接串（主机名不含 `-pooler`）写入项目根目录 `.env` 的 `DATABASE_URL`，然后：

```bash
pnpm db:migrate:deploy
```

这会把尚未应用的 SQL（包括删除 `user_profiles` 和 `title` 的那条）打到线上库。不要用 `pnpm db:migrate`（那是 `migrate dev`，会交互、适合本机空库）。不要用 `db push` 替代已有迁移历史。

应用运行可以用 Neon 的 pooled 连接；**只有 migrate 必须用 Direct**。

### 4. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。未登录时从工作台会进入 Clerk 登录；登录后可生成一条文案，确认历史列表出现记录。

## 常用命令

```bash
pnpm dev            # 开发
pnpm build          # 生产构建
pnpm start          # 启动生产服务
pnpm db:generate         # 生成 Prisma Client
pnpm db:push             # 无迁移历史时把 schema 推到库（本仓库不作为常规手段）
pnpm db:migrate          # 本地开发：创建/应用迁移（需要可写的数据库）
pnpm db:migrate:deploy   # 把已有迁移应用到 DATABASE_URL 指向的库（线上用这个）
pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm test           # Vitest
```

## CI（GitHub Actions）

配置文件：`.github/workflows/ci.yml`

**触发条件**：向 `main` 分支 push 或发起 Pull Request。

| 步骤 | 命令 | 说明 |
| --- | --- | --- |
| 安装依赖 | `pnpm install --frozen-lockfile` | 锁定版本安装 |
| 生成 Client | `pnpm db:generate` | 生成 Prisma 类型 |
| 类型检查 | `pnpm typecheck` | TypeScript |
| 静态检查 | `pnpm lint` | ESLint |
| 单元测试 | `pnpm test` | Vitest |
| 构建 | `pnpm build` | Next.js 生产构建 |

CI 使用占位 Clerk / 数据库环境变量，**不会**连接 Neon，也**不会**执行迁移。质量检查和改线上 schema 必须分开。

## 部署（Vercel）

1. 推送代码到 GitHub
2. 在 Vercel 导入仓库
3. 配置环境变量（见 `.env.example`）：Clerk 公钥/私钥与跳转 URL、`DATABASE_URL`、LLM 四项
4. 部署前（或与生产部署串行）对 Neon 执行 `pnpm db:migrate:deploy`，`DATABASE_URL` 用 Direct 连接串

## License

[MIT](LICENSE.md)
