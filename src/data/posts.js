// All posts are stored here as raw markdown.
// To add a new post, add an entry to this array.
// In a real workflow you'd use import.meta.glob to load .md files,
// but for maximum Vercel compatibility we keep it self-contained.

export const RAW_POSTS = [
  {
    slug: 'why-i-started-this-blog',
    frontmatter: {
      title: '为什么我开始写这个博客',
      date: '2024-11-20',
      excerpt: '记录、思考、沉淀。三个词概括了我开始写博客的原因。',
      tags: ['随笔', '博客'],
    },
    content: `
写这篇文章的时候，窗外正在下雨。

我已经在草稿箱里攒了几十篇"打算写"的文章，但从未真正发出去。总觉得写得不够好，或者时机不对。

直到最近，我意识到**写作本身就是价值**，而不是某个完美文章的副产品。

## 为什么写

三个原因：

1. **记录**：大脑的存储很不可靠。把思考写下来，是对抗遗忘最好的方式。
2. **澄清**：你以为自己理解了某件事，直到你试图把它写清楚。写作会暴露你认知的漏洞。
3. **分享**：也许有人正在为同样的问题挣扎。一篇诚实的文章，能节省别人很多时间。

## 写什么

主要是技术内容——Web 开发、工程实践、工具使用。偶尔也会有些不那么技术性的思考。

没有固定的发布计划。想写就写，写完就发。

---

如果你也有类似的想法，现在就开始吧。完美的时机永远不会来。
`,
  },
  {
    slug: 'react-hooks-mental-model',
    frontmatter: {
      title: '重新理解 React Hooks 的心智模型',
      date: '2024-12-05',
      excerpt: '很多 Hooks 的困惑，根源在于用错了心智模型。从"生命周期"到"同步"，一次思维方式的转变。',
      tags: ['React', '前端', '教程'],
    },
    content: `
学 React Hooks 的人，大多都踩过这个坑：

\`\`\`js
useEffect(() => {
  console.log(count); // 为什么拿到的是旧值？
}, []);
\`\`\`

问题不在代码，在于**心智模型用错了**。

## 旧模型：生命周期

Class 组件时代，我们这样思考：

- \`componentDidMount\` → 挂载后执行一次
- \`componentDidUpdate\` → 更新后执行
- \`componentWillUnmount\` → 卸载前清理

这个模型以"时间"为轴，问的是"什么时候运行"。

## 新模型：同步

Hooks 时代应该这样思考：

> **useEffect 用来将组件与外部系统同步。**

不要问"什么时候运行"，要问"与什么同步，依赖什么"。

\`\`\`js
// 错误问法：这个 effect 什么时候跑？
// 正确问法：这个 effect 依赖哪些值？

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // 每当 count 变化，标题就同步更新
\`\`\`

## 闭包陷阱

回到开头的问题。空依赖数组 \`[]\` 意味着"不依赖任何东西"，所以 effect 只运行一次，捕获的是初始 \`count = 0\`。

解法：诚实地声明依赖。

\`\`\`js
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1); // 用函数式更新，不依赖外部 count
  }, 1000);
  return () => clearInterval(id);
}, []); // 现在 [] 是诚实的
\`\`\`

## 一句话总结

把 \`useEffect\` 想成 **"当这些值变化时，让外部世界与组件保持一致"**，而不是"在某个生命周期钩子里执行代码"。

这个转变让很多 Hooks 的行为都变得直觉上合理了。
`,
  },
  {
    slug: 'css-layout-techniques-2024',
    frontmatter: {
      title: '2024 年的 CSS 布局：你可能不需要那个框架',
      date: '2024-12-18',
      excerpt: 'Grid、Flexbox、Container Queries——现代 CSS 的布局能力已经远超你的想象。',
      tags: ['CSS', '前端'],
    },
    content: `
每隔一段时间，就会有人问"CSS 框架该用哪个"。

我的回答越来越多地变成：**你可能不需要 CSS 框架**。

## 今天的 CSS 能做什么

### Flexbox 一行居中

曾经的噩梦，现在是三行代码：

\`\`\`css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

### Grid 的真正威力

Flexbox 是一维的，Grid 是二维的。

\`\`\`css
/* 自动填充，最小 250px，自动伸缩 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
\`\`\`

不需要 Bootstrap 的 12 列系统了。

### Container Queries

这是真正的游戏改变者。组件可以根据**自身容器**的大小响应变化，而不是视口大小：

\`\`\`css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
\`\`\`

## 那什么时候用框架？

- 团队协作需要统一规范
- 设计系统有大量组件
- 你的项目确实很复杂

如果是个人项目或小团队，花几天真正学好 CSS，比学会某个框架的 API 更有价值。

---

CSS 2024 年的状态比大多数人想象的要好得多。
`,
  },
  {
    slug: 'building-in-public',
    frontmatter: {
      title: '公开构建的第 30 天',
      date: '2025-01-08',
      excerpt: '一个月前我开始公开记录自己的项目进展。这 30 天里我学到了什么？',
      tags: ['随笔', '创作'],
    },
    content: `
30 天前，我决定把正在做的项目公开记录下来。

起因很简单——我读到一篇文章，作者说"公开构建让我的进展加快了三倍"。我不信，所以去试了。

## 发生了什么

**好的方面：**

迫使自己每天做出一点可以展示的进展。有人看，就有羞耻心驱动。这听起来很庸俗，但确实有效。

收到了几条真诚的反馈。有人指出了一个我完全没想到的用户场景。

**不那么好的方面：**

前两周非常别扭。觉得自己在表演，而不是在做事。

有几天没有进展可以展示，然后开始焦虑"今天发什么"，而不是"今天做什么"。

## 调整

到了第三周，我改变了策略：

不要求每天都有进展，改为每周一次"周记"。包括做了什么、卡在哪里、下周计划。

这让压力小了很多，同时保留了公开记录的好处。

## 值得吗

值得。

但不是因为"流量"或"曝光"，而是**写作本身让思考更清晰**。

强迫自己用文字描述进展，会发现很多模糊的地方。"差不多完成了"和"完成了 API 设计，还差数据库 schema"是完全不同的两种状态。

---

如果你也在做什么，不妨试着写下来。
`,
  },
  {
    slug: 'typescript-tips-i-wish-i-knew',
    frontmatter: {
      title: '我希望早点知道的 TypeScript 技巧',
      date: '2025-01-22',
      excerpt: '不是类型体操，而是实际工作中真正有用的那些。',
      tags: ['TypeScript', '前端', '教程'],
    },
    content: `
这篇文章不讲类型体操。

讲的是实际工作中，让我少踩了很多坑的 TypeScript 用法。

## 1. 用 \`satisfies\` 代替类型断言

\`\`\`ts
// 危险：绕过了类型检查
const config = {
  port: "3000", // 字符串，但你想要数字
} as Config;

// 更好：让 TS 验证，同时保留字面量类型
const config = {
  port: 3000,
} satisfies Config;
\`\`\`

## 2. 辨别联合类型的最佳实践

\`\`\`ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function handle(result: Result<User>) {
  if (result.ok) {
    // TS 知道这里 result.data 存在
    console.log(result.data.name);
  } else {
    console.error(result.error);
  }
}
\`\`\`

用一个"判别字段"（这里是 \`ok\`）代替可选属性，类型更安全，代码更清晰。

## 3. \`const\` 断言冻结字面量

\`\`\`ts
const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = typeof ROLES[number]; // 'admin' | 'editor' | 'viewer'
\`\`\`

不用手动写 union type 了。

## 4. 用 \`Awaited\` 提取 Promise 的类型

\`\`\`ts
async function fetchUser() {
  return { id: 1, name: 'Alice' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }
\`\`\`

## 5. 函数重载的替代方案

比函数重载更清晰的写法：

\`\`\`ts
type FormatOptions =
  | { type: 'date'; value: Date }
  | { type: 'number'; value: number; decimals?: number }
  | { type: 'currency'; value: number; currency: string };

function format(opts: FormatOptions): string {
  switch (opts.type) {
    case 'date': return opts.value.toLocaleDateString();
    case 'number': return opts.value.toFixed(opts.decimals ?? 2);
    case 'currency': return \`\${opts.currency}\${opts.value}\`;
  }
}
\`\`\`

---

TypeScript 的价值不在于把所有类型都写出来，而在于**在正确的地方放置正确的约束**。
`,
  },
];
