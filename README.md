# I18n Translation API

一个基于 Fastify 构建的多语言翻译 API 服务，提供完整的国际化解决方案。

## 🚀 功能特性

- **多语言支持**: 支持多种语言的翻译管理
- **业务标签管理**: 按业务模块组织翻译内容
- **用户认证**: JWT 身份验证和授权
- **API 日志**: 完整的 API 调用日志记录
- **Swagger 文档**: 自动生成的 API 文档
- **数据库支持**: 基于 Drizzle ORM 的 MySQL 数据库
- **类型安全**: 完整的 TypeScript 类型支持

## 📁 项目结构

```
src/
├── api-log/           # API 日志模块
├── auth/              # 用户认证模块
├── business-tag/      # 业务标签管理
├── lang-tag/          # 语言标签管理
├── translations/      # 翻译内容管理
├── db/                # 数据库配置和模式
├── plugins/           # Fastify 插件
├── env_config/        # 环境配置
└── index.ts           # 应用入口
```

## 🛠️ 技术栈

- **框架**: Fastify 5.x
- **数据库**: MySQL + Drizzle ORM
- **认证**: JWT
- **文档**: Swagger/OpenAPI
- **语言**: TypeScript
- **包管理**: pnpm

## 📦 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## ⚙️ 环境配置

创建环境配置文件：

```bash
# 开发环境
cp .env.example .env.development

# 生产环境
cp .env.example .env.production
```

环境变量配置：

```env
# 数据库配置
DATABASE_URL=mysql://username:password@localhost:3306/database_name

# JWT 配置
JWT_SECRET=your_jwt_secret_key

# 服务器配置
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
```

## 🗄️ 数据库设置

### 1. 生成数据库迁移文件

```bash
pnpm run db:generate
```

### 2. 推送数据库模式（开发环境）

```bash
pnpm run db:push
```

### 3. 执行数据库迁移（生产环境）

```bash
pnpm run db:migrate
```

## 🚀 运行项目

### 开发模式

```bash
# 启动开发服务器（自动重启）
pnpm run dev
```

### 生产模式

```bash
# 构建项目
pnpm run build

# 启动生产服务器
pnpm run start
```

## 📚 API 文档

启动服务后，访问 Swagger 文档：

- **开发环境**: http://localhost:3000/docs
- **生产环境**: http://your-domain/docs

## 🔗 API 端点

### 认证模块 (`/api/auth`)
- `POST /register` - 用户注册
- `POST /login` - 用户登录

### 业务标签 (`/api/business-tags`)
- `GET /` - 获取业务标签列表（分页）
- `POST /` - 创建业务标签
- `GET /:id` - 获取单个业务标签
- `PUT /:id` - 更新业务标签
- `DELETE /:id` - 删除业务标签

### 语言标签 (`/api/lang-tags`)
- `GET /` - 获取语言标签列表
- `POST /` - 创建语言标签
- `GET /:id` - 获取单个语言标签
- `PUT /:id` - 更新语言标签
- `DELETE /:id` - 删除语言标签

### 翻译内容 (`/api/translations`)
- `GET /` - 获取翻译列表
- `POST /` - 创建翻译
- `GET /:id` - 获取单个翻译
- `PUT /:id` - 更新翻译
- `DELETE /:id` - 删除翻译

### API 日志 (`/api/logs`)
- `GET /` - 获取 API 调用日志

## 🔐 认证说明

大部分 API 需要 JWT 认证。在请求头中添加：

```
Authorization: Bearer <your_jwt_token>
```

## 📊 数据库模式

### 用户表 (users)
- `id`: 主键
- `name`: 用户名
- `email`: 邮箱
- `password`: 密码（加密）
- `createdAt`: 创建时间

### 业务标签表 (business_tags)
- `id`: 主键
- `name`: 标签名称
- `description`: 描述
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### 语言标签表 (lang_tags)
- `id`: 主键
- `name`: 语言名称
- `description`: 描述
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### 翻译表 (translation)
- `id`: 主键
- `name`: 翻译名称
- `description`: 描述
- `business_tag_id`: 业务标签ID（外键）
- `translations`: 翻译内容（JSON格式）

### API日志表 (api_logs)
- `id`: 主键
- `path`: API路径
- `method`: HTTP方法
- `operator`: 操作者
- `operatedAt`: 操作时间

## 🔧 开发说明

### 添加新的 API 模块

1. 在 `src/` 下创建新的模块目录
2. 创建 `routes.ts`、`service.ts`、`types.ts`、`schema.ts` 文件
3. 在 `src/index.ts` 中注册路由

### 数据库操作

使用 Drizzle ORM 进行数据库操作：

```typescript
import db from './db'
import { userTable } from './db/schema'
import { eq } from 'drizzle-orm'

// 查询用户
const user = await db.select().from(userTable).where(eq(userTable.id, 1))
```

### 插件开发

创建自定义 Fastify 插件：

```typescript
import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  // 插件逻辑
})
```

## 🚀 部署

### 环境变量

确保在生产环境中设置正确的环境变量：

- `DATABASE_URL`: 生产数据库连接字符串
- `JWT_SECRET`: 强密钥
- `NODE_ENV=production`

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 UNLICENSED 许可证。

## 📞 支持

如有问题或建议，请创建 Issue 或联系维护者。