# eufy Headless SEO MVP

基于 Next.js 15 + Shopify Storefront API 的 headless 站点，模仿 eufy.com 首页风格，作为全面 SEO/GEO 测试平台。

## 技术栈

- **Next.js 16** (App Router, Server Components, Turbopack)
- **Tailwind CSS 4**
- **Shopify Storefront API** (GraphQL)
- **Framer Motion** (动画)
- **TypeScript**

## 快速开始

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入 Shopify 凭据

# 开发
pnpm dev

# 构建
pnpm build

# 预览生产版本
pnpm start
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Shopify 商店域名 (xxx.myshopify.com) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API 公有令牌 |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL (部署后的域名) |

## SEO 功能

### Schema.org / JSON-LD
- Organization (品牌信息、logo、社交链接)
- WebSite (SearchAction for Sitelinks)
- Product (自动从 Shopify 生成)
- FAQPage (首页 FAQ 区块)
- VideoObject (视频区)
- BreadcrumbList
- ItemList (产品列表)

### Meta / Open Graph
- Next.js Metadata API 自动管理
- 动态 OG 图片 (`/opengraph-image`)
- Twitter Card (summary_large_image)
- Canonical URL

### 爬虫友好
- 动态 `robots.txt` (允许 GPTBot, Google-Extended, CCBot)
- 动态 `sitemap.xml` (自动从 Shopify 拉取产品/集合 URL)
- Web App Manifest

### Core Web Vitals
- Next/Image 自动 WebP/AVIF
- Hero 图片 priority preload
- 字体预加载 (next/font)
- 语义化 HTML (nav, section, article, h1-h3)

### GEO / AI 引用优化
- 可引用品牌声明段落
- FAQ 结构化区块 (FAQPage Schema)
- 精确统计数据
- 清晰的 H1-H3 层级

## 首页区块

1. 顶部 Promo Bar
2. 导航栏 (桌面 + 移动端)
3. Hero 轮播 (自动播放)
4. 产品轮播 (Shopify 数据驱动)
5. 分类横滚
6. 安防系统卡片
7. 系列选择 Tab
8. 技术亮点
9. 品牌承诺图标行
10. 会员积分
11. 博客预览
12. 视频展示
13. FAQ
14. 页脚

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局 + 全局 Schema
│   ├── page.tsx            # 首页 (SSR)
│   ├── robots.ts           # 动态 robots.txt
│   ├── sitemap.ts          # 动态 sitemap.xml
│   ├── manifest.ts         # Web App Manifest
│   └── opengraph-image.tsx # OG 图片生成
├── components/
│   ├── layout/             # Header, Footer
│   ├── home/               # 首页区块组件
│   └── seo/                # JsonLd 组件
└── lib/
    ├── shopify/            # API 客户端、查询、类型
    └── seo/                # 元数据和 Schema 构建器
```

## 部署

推荐部署到 Vercel：

```bash
vercel
```

或连接 GitHub 仓库自动部署。
