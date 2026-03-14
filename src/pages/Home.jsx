import { Link } from 'react-router-dom';
import { usePosts, useAllTags } from '../hooks/usePosts';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = usePosts().slice(0, 5);
  const tags = useAllTags().slice(0, 8);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>

      {/* Intro */}
      <section style={{ marginBottom: '5rem' }}>
        <h1 className="fade-up" style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--ink)',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
        }}>
          你好，我在这里<br />
          <em style={{ fontStyle: 'italic', color: 'var(--body)' }}>写作与思考</em>
        </h1>
        <p className="fade-up delay-1" style={{
          fontSize: '1rem',
          color: 'var(--body)',
          fontWeight: 300,
          lineHeight: 1.75,
          maxWidth: 480,
          marginBottom: '2rem',
        }}>
          这是我的个人博客，记录关于 Web 开发、工程实践和日常思考的文章。
          偶尔也会有一些不那么技术性的内容。
        </p>
        <div className="fade-up delay-2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/blog" style={{
            fontSize: '0.875rem',
            color: 'var(--ink)',
            borderBottom: '1px solid var(--ink)',
            paddingBottom: '1px',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            全部文章 →
          </Link>
          <Link to="/about" style={{
            fontSize: '0.875rem',
            color: 'var(--muted)',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '1px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
            关于我
          </Link>
        </div>
      </section>

      {/* Latest posts */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between', marginBottom: '0',
          borderBottom: '1px solid var(--ink)', paddingBottom: '0.6rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}>最新文章</h2>
          <Link to="/blog" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            全部 ({usePosts().length})
          </Link>
        </div>

        <div>
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} delay={Math.min(i + 1, 6)} />
          ))}
        </div>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            borderBottom: '1px solid var(--ink)',
            paddingBottom: '0.6rem',
            marginBottom: '1.25rem',
          }}>标签</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map(({ tag, count }) => (
              <Link key={tag} to={`/tags/${tag}`} style={{
                fontSize: '0.82rem',
                fontWeight: 300,
                color: 'var(--body)',
                padding: '0.3rem 0.7rem',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.color = 'var(--ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--body)';
              }}>
                {tag} <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
