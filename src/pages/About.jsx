import { Link } from 'react-router-dom';

const SKILLS = [
  { label: 'Frontend',  items: ['React', 'TypeScript', 'CSS', 'Vite'] },
  { label: 'Backend',   items: ['Node.js', 'Python', 'PostgreSQL'] },
  { label: 'Tooling',   items: ['Git', 'Docker', 'Linux', 'Figma'] },
];

const LINKS = [
  { label: 'GitHub',  href: 'https://github.com/steven666666666' },
  { label: 'Twitter', href: 'https://twitter.com/yourusername' },
  { label: 'Email',   href: 'mailto:you@example.com' },
];

export default function About() {
  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <p className="fade-up" style={{
        fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
        color: 'var(--muted)', marginBottom: '0.5rem',
      }}>
        <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link> / 关于
      </p>

      {/* Bio */}
      <section style={{ marginBottom: '4rem' }}>
        <h1 className="fade-up delay-1" style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--ink)', lineHeight: 1.2,
          marginBottom: '2rem',
        }}>
          你的名字
        </h1>

        <div className="fade-up delay-2" style={{
          fontSize: '1rem', color: 'var(--body)',
          fontWeight: 300, lineHeight: 1.8,
          maxWidth: 560,
        }}>
          <p style={{ marginBottom: '1.25em' }}>
            我是一名全栈开发者，对构建优雅的 Web 应用充满热情。
            工作之外喜欢写作、读书，偶尔骑自行车。
          </p>
          <p style={{ marginBottom: '1.25em' }}>
            目前在 ______ 工作，专注于 ______。
            有时候也做一些开源项目。
          </p>
          <p>
            如果你想聊聊技术、合作，或者只是打个招呼，
            随时通过下面的方式联系我。
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="fade-up delay-3" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink)', borderBottom: '1px solid var(--ink)',
          paddingBottom: '0.6rem', marginBottom: '1.5rem',
        }}>
          技术栈
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
          {SKILLS.map(({ label, items }) => (
            <div key={label}>
              <p style={{
                fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                color: 'var(--muted)', marginBottom: '0.6rem',
                letterSpacing: '0.05em',
              }}>
                {label}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {items.map(item => (
                  <li key={item} style={{
                    fontSize: '0.88rem', color: 'var(--body)',
                    fontWeight: 300, padding: '0.2rem 0',
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="fade-up delay-4">
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--ink)', borderBottom: '1px solid var(--ink)',
          paddingBottom: '0.6rem', marginBottom: '1.5rem',
        }}>
          联系方式
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                fontSize: '0.9rem', color: 'var(--ink)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '1px', transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
