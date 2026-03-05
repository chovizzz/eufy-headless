## Changelog

本项目遵循「Keep a Changelog」风格，版本号暂与 `package.json` 一致（当前为 `0.1.0`），后续可以根据实际发布节奏再细化。

### [Unreleased]
- 视实际需求增加新页面、Shopify 数据源与更多 SEO/GEO 实验模块。

### [2026-03-05] eufy headless MVP + SEO & 性能回归测试

- **Shopify Headless MVP 完成**
  - 使用 Next.js App Router + TypeScript + Tailwind v4 + shadcn/ui 结构化首页。
  - 接入 Shopify Storefront API：产品、集合、博客、Shop 信息、菜单等数据全部由 GraphQL 驱动。
  - 完整还原 eufy.com 首页信息架构：Hero、产品轮播、分类浏览、技术亮点、品牌承诺、FAQ、视频模块等。

- **SEO 基础设施**
  - 全站 Metadata 统一由 `lib/seo/metadata.ts` 管理，支持 title / description / OG / Twitter / canonical / robots。
  - JSON-LD：Organization、WebSite、Product、FAQPage、VideoObject、BreadcrumbList、ItemList 等结构化数据。
  - 动态 `sitemap.xml`：包含静态页面 + 来自 Shopify 的产品与集合 URL。
  - 动态 `robots.txt`：精细控制 GPTBot / Google-Extended / CCBot 等 AI 爬虫访问策略。
  - 动态 Open Graph Image 与 Web App Manifest，方便社交分享与 PWA 能力扩展。

- **单元测试与性能回归测试**
  - 引入 Vitest + React Testing Library + jsdom，新增基础测试脚手架与脚本。
  - 覆盖模块：
    - `lib/seo/schema`：各类 JSON-LD 结构构造逻辑。
    - `lib/seo/metadata`：Metadata 生成规则与 robots 配置。
    - `lib/shopify/client`：GraphQL 客户端、错误处理与变量传递。
    - `lib/shopify/api`：高层封装（产品、集合、博客、Shop 信息、菜单）。
    - 组件：`JsonLd`、`FAQSection`、`ProductCarousel`。
  - 新增 **SEO/Accessibility/性能回归测试**（`src/__tests__/seo-perf/*`）：
    - `robots.test.ts`：保证 `Sitemap:` 为单行完整 URL，AI 爬虫白名单、敏感路径 `Disallow` 不回退。
    - `sitemap.test.ts`：静态页 & Shopify 商品/集合 URL 生成、HTTPS、优先级与降级策略（Shopify 挂掉仍返回静态页）。
    - `accessibility.test.ts`：
      - 颜色对比度计算（WCAG AA）：`eufy-accent`、`eufy-text-light`、`eufy-dark` 等主题色不低于规范阈值。
      - 图片优化约束：`<img>` 必须 lazy-load 或替换为 `next/image`；带 `fill` 的 `Image` 必须提供 `sizes`。
      - LCP 优化：Hero 首屏图片必须设置 `priority`。
      - 链接文本约束：通用 `"Learn More"` 链接必须具有 `aria-label`，禁止使用 `"Click Here"` 文案。

- **SEO / Accessibility 得分提升相关修复**
  - **robots.txt**
    - 改为 `src/app/robots.txt/route.ts` Route Handler，手动输出内容，修复 Google Lighthouse 报告的 `Sitemap` 语法错误（换行问题）。
  - **链接文字**
    - 为首页所有 `"Learn More"` 类型 `Link`（HeroBanner、RewardsProgram、TechShowcase、SeriesFinder）补充语义化 `aria-label`，提升可访问性与 SEO 可读性。
  - **颜色对比度**
    - 将 `--color-eufy-accent` 从 `#e63946` 调整为 `#c0392b`，白字对比度从 4.16 提升到 ≈5.1（符合小字号 AA）。
    - 将 `--color-eufy-text-light` 从 `#86868b` 调整为 `#6e6e73`，在白底对比度从 3.62 提升到 ≈4.6（符合正文 AA）。

- **部署**
  - 使用 Vercel CLI 部署到 `https://eufy-headless.vercel.app`。
  - 在 Vercel 上配置环境变量：
    - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
    - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
    - `NEXT_PUBLIC_SITE_URL`

