# Personal Blog

极简个人博客，基于 React + Vite 构建，可一键部署到 Vercel。

## 技术栈

- **React 18** + **React Router v6**
- **Vite** 构建工具
- **react-markdown** 渲染 Markdown 内容
- **Fuse.js** 全文模糊搜索
- **date-fns** 日期格式化
- 纯 CSS，无 UI 框架依赖

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 添加文章

打开 `src/data/posts.js`，在 `RAW_POSTS` 数组中添加新条目：

```js
{
  slug: 'my-new-post',          // URL 路径，唯一标识
  frontmatter: {
    title: '文章标题',
    date: '2025-02-01',         // YYYY-MM-DD 格式
    excerpt: '文章摘要...',
    tags: ['标签1', '标签2'],
  },
  content: `
  # 正文

  支持标准 **Markdown** 语法，包括：
  - 代码块
  - 表格
  - 引用
  `,
},
```

## 个人信息修改

- **导航栏 Logo**：修改 `src/components/Layout.jsx` 中的 `Blog` 文字
- **关于页面**：修改 `src/pages/About.jsx` 中的个人信息、技术栈和联系方式
- **首页简介**：修改 `src/pages/Home.jsx` 中的介绍文字
- **网站标题**：修改 `index.html` 中的 `<title>` 标签

## 部署到 Vercel

### 方法一：通过 GitHub（推荐）

1. 将项目推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 并登录
3. 点击 **New Project** → 导入你的 GitHub 仓库
4. Framework Preset 选择 **Vite**
5. 点击 **Deploy** — 完成！

Vercel 会自动检测 Vite 配置，后续每次推送到 main 分支都会自动重新部署。

### 方法二：Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### 方法三：拖拽部署

```bash
npm run build
```

将生成的 `dist/` 文件夹拖拽到 [vercel.com/new](https://vercel.com/new) 即可。

## 项目结构

```
blog/
├── index.html
├── vite.config.js
├── vercel.json          # SPA 路由配置
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── index.css
    ├── data/
    │   └── posts.js     # ← 在这里添加文章
    ├── hooks/
    │   └── usePosts.js
    ├── components/
    │   ├── Layout.jsx
    │   └── PostCard.jsx
    └── pages/
        ├── Home.jsx
        ├── Blog.jsx
        ├── Post.jsx
        ├── Tags.jsx
        ├── TagPosts.jsx
        ├── Search.jsx
        ├── About.jsx
        └── NotFound.jsx
```
# my_blog
