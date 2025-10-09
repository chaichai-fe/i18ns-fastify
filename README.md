# 国际化翻译管理系统 API

一个基于 Fastify 构建的国际化翻译管理系统，提供业务标签、语言标签和翻译内容的完整管理功能。

## 📋 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [项目架构](#项目架构)
- [数据库设计](#数据库设计)
- [快速开始](#快速开始)
- [本地开发](#本地开发)
- [生产部署](#生产部署)
- [API 接口文档](#api-接口文档)
- [开发脚本](#开发脚本)

## 项目简介

本项目是一个功能完整的国际化（i18n）翻译管理系统后端 API，支持：

- 🔐 **用户认证**：基于 JWT 的用户注册和登录
- 🏷️ **业务标签管理**：对翻译内容进行业务分类
- 🌍 **语言标签管理**：管理系统支持的多语言
- 📝 **翻译内容管理**：创建、查询、更新和删除翻译内容
- 📤 **翻译导出**：支持将翻译内容导出为 JSON 格式
- 📚 **API 文档**：集成 Swagger UI，访问 `/docs` 查看完整 API 文档

## 技术栈

| 技术 | 说明 |
|------|------|
| **框架** | [Fastify](https://fastify.dev/) - 高性能的 Node.js Web 框架 |
| **语言** | [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript |
| **数据库** | [MySQL](https://www.mysql.com/) - 关系型数据库 |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) - 轻量级的 TypeScript ORM |
| **认证** | [JWT](https://jwt.io/) - JSON Web Token 认证 |
| **API 文档** | [Swagger/OpenAPI](https://swagger.io/) - 自动生成的 API 文档 |
| **包管理器** | [pnpm](https://pnpm.io/) - 高效的包管理工具 |

## 项目架构

### 目录结构

```
i18ns-fastify/
├── src/                          # 源代码目录
│   ├── auth/                     # 认证模块
│   │   ├── routes.ts            # 认证路由（注册、登录）
│   │   ├── service.ts           # 认证服务逻辑
│   │   └── types.ts             # 认证相关类型定义
│   ├── business-tag/            # 业务标签模块
│   │   ├── routes.ts            # 业务标签路由（CRUD）
│   │   ├── service.ts           # 业务标签服务逻辑
│   │   └── types.ts             # 业务标签类型定义
│   ├── lang-tag/                # 语言标签模块
│   │   ├── routes.ts            # 语言标签路由（CRUD）
│   │   ├── service.ts           # 语言标签服务逻辑
│   │   └── types.ts             # 语言标签类型定义
│   ├── translations/            # 翻译管理模块
│   │   ├── routes.ts            # 翻译路由（CRUD + 导出）
│   │   ├── service.ts           # 翻译服务逻辑
│   │   └── types.ts             # 翻译类型定义
│   ├── db/                      # 数据库配置
│   │   ├── connection.ts        # 数据库连接配置
│   │   ├── index.ts             # 数据库实例导出
│   │   └── schema.ts            # 数据库表结构定义
│   └── index.ts                 # 应用入口文件
├── drizzle/                      # 数据库迁移文件
│   ├── meta/                     # 迁移元数据
│   └── *.sql                     # SQL 迁移文件
├── drizzle.config.ts            # Drizzle ORM 配置
├── package.json                 # 项目依赖配置
├── tsconfig.json                # TypeScript 配置
├── env.example                  # 环境变量示例
└── README.md                    # 项目说明文档
```

### 模块设计

项目采用**模块化架构**设计，每个功能模块独立封装：

```
┌─────────────────────────────────────────────────────────┐
│                      Fastify 应用                        │
├─────────────────────────────────────────────────────────┤
│  Middleware 层                                          │
│  ├─ CORS (跨域处理)                                     │
│  ├─ JWT 认证                                            │
│  └─ Swagger 文档                                        │
├─────────────────────────────────────────────────────────┤
│  Routes 层 (路由)                                       │
│  ├─ /api/auth          (认证路由)                       │
│  ├─ /api/business-tags (业务标签路由)                   │
│  ├─ /api/lang-tags     (语言标签路由)                   │
│  └─ /api/translations  (翻译管理路由)                   │
├─────────────────────────────────────────────────────────┤
│  Service 层 (业务逻辑)                                  │
│  ├─ AuthService         (认证服务)                      │
│  ├─ BusinessTagService  (业务标签服务)                  │
│  ├─ LangTagService      (语言标签服务)                  │
│  └─ TranslationService  (翻译服务)                      │
├─────────────────────────────────────────────────────────┤
│  Database 层 (数据访问)                                │
│  └─ Drizzle ORM + MySQL                                │
└─────────────────────────────────────────────────────────┘
```

## 数据库设计

### 数据表结构

#### 1. users（用户表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AI) | 用户 ID |
| name | VARCHAR(255) | 用户名 |
| email | VARCHAR(255) | 邮箱（用于登录） |
| password | VARCHAR(255) | 加密后的密码 |
| created_at | TIMESTAMP | 创建时间 |

#### 2. business_tags（业务标签表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AI) | 标签 ID |
| name | VARCHAR(255) | 标签名称 |
| description | VARCHAR(255) | 标签描述 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### 3. lang_tags（语言标签表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AI) | 语言 ID |
| name | VARCHAR(255) | 语言名称（如 en, zh） |
| description | VARCHAR(255) | 语言描述 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### 4. translation（翻译表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT (PK, AI) | 翻译 ID |
| name | VARCHAR(255) | 翻译项名称 |
| description | VARCHAR(255) | 翻译项描述 |
| business_tag_id | INT (FK) | 关联的业务标签 ID |
| translations | JSON | 翻译内容（多语言） |

**translations 字段示例：**
```json
{
  "title": {
    "en": "Hello World",
    "zh": "你好世界",
    "ja": "こんにちは世界"
  },
  "description": {
    "en": "Welcome to our app",
    "zh": "欢迎使用我们的应用"
  }
}
```

### 数据库关系图

```
┌─────────────────┐
│     users       │
│  用户表          │
└─────────────────┘

┌─────────────────┐         ┌─────────────────┐
│ business_tags   │ 1     N │  translation    │
│  业务标签表      │◄────────│  翻译表          │
└─────────────────┘         └─────────────────┘

┌─────────────────┐
│   lang_tags     │
│  语言标签表      │
└─────────────────┘
```

## 快速开始

### 环境要求

- **Node.js**: 18+ 或更高版本
- **pnpm**: 8.15.0 或更高版本
- **MySQL**: 5.7+ 或 8.0+

### 安装步骤

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd i18ns-fastify
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **配置环境变量**

   复制环境变量示例文件并修改配置：

   ```bash
   cp env.example .env
   ```

   编辑 `.env` 文件，填入你的配置：

   ```env
   # 数据库配置
   DATABASE_URL=mysql://用户名:密码@数据库地址:3306/数据库名

   # JWT 密钥（请使用强密码）
   JWT_SECRET=your-super-secret-jwt-key-here

   # 服务器配置
   PORT=3000
   HOST=0.0.0.0
   ```

4. **初始化数据库**

   运行数据库迁移，创建所需的表结构：

   ```bash
   pnpm run db:push
   ```

5. **启动开发服务器**

   ```bash
   pnpm run dev
   ```

6. **访问应用**

   - API 地址: http://localhost:3000
   - API 文档: http://localhost:3000/docs

## 本地开发

### 开发流程

1. **启动开发服务器**（支持热重载）

   ```bash
   pnpm run dev
   ```

2. **查看数据库**（使用 Drizzle Studio）

   ```bash
   pnpm run db:studio
   ```

   在浏览器中打开 Drizzle Studio 可视化界面查看和管理数据。

3. **修改数据库结构**

   - 编辑 `src/db/schema.ts` 文件
   - 生成迁移文件：
     ```bash
     pnpm run db:generate
     ```
   - 应用迁移：
     ```bash
     pnpm run db:migrate
     ```

   或直接推送到数据库（开发环境推荐）：
   ```bash
   pnpm run db:push
   ```

### 调试技巧

- 应用使用 `pino-pretty` 进行日志美化输出
- 所有 API 请求和响应都会在控制台显示
- 使用 Swagger UI (`/docs`) 测试 API 接口

## 生产部署

### 部署前准备

1. **准备生产数据库**

   在生产环境创建 MySQL 数据库：

   ```sql
   CREATE DATABASE i18n_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **配置生产环境变量**

   创建 `.env.production` 文件：

   ```env
   DATABASE_URL=mysql://生产用户名:生产密码@生产数据库地址:3306/i18n_production
   JWT_SECRET=生产环境超强密钥（至少32位随机字符）
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=production
   ```

### 部署步骤

#### 方式一：传统服务器部署（推荐）

1. **构建应用**

   ```bash
   pnpm run build
   ```

   编译后的文件将生成在 `dist/` 目录。

2. **运行数据库迁移**

   ```bash
   export DATABASE_URL="mysql://生产用户名:生产密码@生产数据库地址:3306/i18n_production"
   pnpm run db:push
   ```

   或使用迁移方式：
   ```bash
   pnpm run db:migrate
   ```

3. **启动生产服务器**

   ```bash
   NODE_ENV=production pnpm start
   ```

4. **使用 PM2 进行进程管理**（推荐）

   安装 PM2：
   ```bash
   npm install -g pm2
   ```

   创建 `ecosystem.config.js` 配置文件：
   ```javascript
   module.exports = {
     apps: [{
       name: 'i18n-api',
       script: './dist/index.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   ```

   启动应用：
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

#### 方式二：Docker 部署

1. **创建 Dockerfile**

   ```dockerfile
   FROM node:18-alpine

   # 安装 pnpm
   RUN npm install -g pnpm

   WORKDIR /app

   # 复制依赖文件
   COPY package.json pnpm-lock.yaml ./

   # 安装依赖
   RUN pnpm install --frozen-lockfile

   # 复制源代码
   COPY . .

   # 构建应用
   RUN pnpm run build

   # 暴露端口
   EXPOSE 3000

   # 启动应用
   CMD ["pnpm", "start"]
   ```

2. **创建 docker-compose.yml**

   ```yaml
   version: '3.8'

   services:
     mysql:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: rootpassword
         MYSQL_DATABASE: i18n_production
         MYSQL_USER: i18nuser
         MYSQL_PASSWORD: i18npassword
       volumes:
         - mysql_data:/var/lib/mysql
       ports:
         - "3306:3306"
       healthcheck:
         test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
         timeout: 20s
         retries: 10

     api:
       build: .
       ports:
         - "3000:3000"
       environment:
         DATABASE_URL: mysql://i18nuser:i18npassword@mysql:3306/i18n_production
         JWT_SECRET: your-production-jwt-secret
         PORT: 3000
         HOST: 0.0.0.0
       depends_on:
         mysql:
           condition: service_healthy
       command: >
         sh -c "
           pnpm run db:push &&
           pnpm start
         "

   volumes:
     mysql_data:
   ```

3. **启动容器**

   ```bash
   docker-compose up -d
   ```

#### 方式三：云平台部署

##### Vercel / Railway / Render

这些平台通常需要：

1. 连接 Git 仓库
2. 配置环境变量（在平台控制台）
3. 设置构建命令：`pnpm run build`
4. 设置启动命令：`pnpm start`

**注意：** 需要单独准备 MySQL 数据库（如使用 PlanetScale、AWS RDS 等）。

### 数据库迁移最佳实践

1. **开发环境**：使用 `pnpm run db:push` 快速同步
2. **生产环境**：使用迁移文件方式：
   ```bash
   # 1. 在本地生成迁移文件
   pnpm run db:generate
   
   # 2. 提交迁移文件到代码仓库
   git add drizzle/
   git commit -m "Add database migration"
   
   # 3. 在生产服务器上运行迁移
   pnpm run db:migrate
   ```

### 安全建议

- ✅ 使用强随机字符串作为 `JWT_SECRET`
- ✅ 不要将 `.env` 文件提交到代码仓库
- ✅ 生产数据库使用独立的用户和密码
- ✅ 启用数据库 SSL 连接
- ✅ 配置防火墙只允许必要的端口访问
- ✅ 定期备份数据库
- ✅ 使用反向代理（如 Nginx）并启用 HTTPS

### 反向代理配置（Nginx 示例）

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## API 接口文档

启动服务后访问 http://localhost:3000/docs 查看完整的 Swagger API 文档。

### 主要接口概览

#### 认证接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 注册新用户 | ❌ |
| POST | `/api/auth/login` | 用户登录 | ❌ |

#### 业务标签接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/business-tags` | 获取业务标签列表（分页） | ✅ |
| POST | `/api/business-tags` | 创建业务标签 | ✅ |
| GET | `/api/business-tags/:id` | 获取单个业务标签 | ✅ |
| PUT | `/api/business-tags/:id` | 更新业务标签 | ✅ |
| DELETE | `/api/business-tags/:id` | 删除业务标签 | ✅ |

#### 语言标签接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/lang-tags` | 获取语言标签列表（分页） | ✅ |
| POST | `/api/lang-tags` | 创建语言标签 | ✅ |
| GET | `/api/lang-tags/:id` | 获取单个语言标签 | ✅ |
| PUT | `/api/lang-tags/:id` | 更新语言标签 | ✅ |
| DELETE | `/api/lang-tags/:id` | 删除语言标签 | ✅ |

#### 翻译管理接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/translations` | 获取翻译列表 | ✅ |
| POST | `/api/translations` | 创建翻译 | ✅ |
| GET | `/api/translations/:id` | 获取单个翻译 | ✅ |
| PUT | `/api/translations/:id` | 更新翻译 | ✅ |
| DELETE | `/api/translations/:id` | 删除翻译 | ✅ |
| GET | `/api/translations/export/json` | 导出翻译为 JSON | ✅ |

### 使用示例

**1. 注册用户**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com",
    "password": "securepassword123"
  }'
```

**2. 登录获取 Token**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "zhangsan@example.com",
    "password": "securepassword123"
  }'
```

**3. 创建业务标签（需要认证）**
```bash
curl -X POST http://localhost:3000/api/business-tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "homepage",
    "description": "首页相关翻译"
  }'
```

**4. 创建翻译内容**
```bash
curl -X POST http://localhost:3000/api/translations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "welcome",
    "description": "欢迎语",
    "business_tag_id": 1,
    "translations": {
      "title": {
        "en": "Welcome",
        "zh": "欢迎"
      }
    }
  }'
```

**5. 导出翻译**
```bash
curl -X GET "http://localhost:3000/api/translations/export/json?business_tag_id=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 开发脚本

### 可用命令

| 命令 | 说明 |
|------|------|
| `pnpm run dev` | 启动开发服务器（热重载） |
| `pnpm run build` | 构建生产版本 |
| `pnpm start` | 启动生产服务器 |
| `pnpm run db:generate` | 生成数据库迁移文件 |
| `pnpm run db:migrate` | 运行数据库迁移 |
| `pnpm run db:push` | 直接推送 schema 到数据库 |
| `pnpm run db:studio` | 打开 Drizzle Studio 可视化界面 |

### 开发流程建议

```bash
# 1. 拉取最新代码
git pull

# 2. 安装/更新依赖
pnpm install

# 3. 同步数据库结构（开发环境）
pnpm run db:push

# 4. 启动开发服务器
pnpm run dev

# 5. 修改代码后，服务器会自动重启

# 6. 需要查看数据时，打开 Drizzle Studio
pnpm run db:studio
```

## 常见问题

### 1. 数据库连接失败

**问题：** 启动时提示 "Database connection validation failed"

**解决方案：**
- 检查 `.env` 文件中的 `DATABASE_URL` 配置是否正确
- 确认 MySQL 服务是否正常运行
- 检查数据库用户是否有足够的权限
- 验证数据库名称是否已创建

### 2. 端口被占用

**问题：** 端口 3000 已被占用

**解决方案：**
- 修改 `.env` 文件中的 `PORT` 配置
- 或者手动停止占用 3000 端口的进程：
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### 3. JWT Token 无效

**问题：** API 请求返回 401 Unauthorized

**解决方案：**
- 确认 `Authorization` 头格式为：`Bearer YOUR_TOKEN`
- Token 可能已过期，需要重新登录
- 检查生产环境和开发环境的 `JWT_SECRET` 是否一致

## 项目迁移说明

本项目是从 ElysiaJS 迁移到 Fastify 的版本，保持了：
- ✅ 相同的数据库 schema 和配置
- ✅ 完全一致的 API 接口和功能
- ✅ 相同的业务逻辑和数据验证
- ✅ Fastify 的最佳实践和性能优化

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

UNLICENSED - 私有项目

---

如有问题，请联系项目维护者。
