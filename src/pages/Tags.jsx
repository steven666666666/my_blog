import { Link } from 'react-router-dom';
import { useAllTags } from '../hooks/usePosts';

export default function Tags() {
  const tags = useAllTags();

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link> / 标签
      </p>

      <div style={{
        borderBottom: '1px solid var(--ink)', paddingBottom: '0.6rem', marginBottom: '2.5rem',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>标签</h1>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          {tags.length} 个
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '1px',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        {tags.map(({ tag, count }, i) => (
          <Link key={tag} to={`/tags/${tag}`}
            className={`fade-up delay-${Math.min(i + 1, 6)}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.1rem',
              background: 'var(--white)',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--subtle)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
          >
            <span style={{ fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 300 }}>
              {tag}
            </span>
            <span style={{
              fontSize: '0.72rem', color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              background: 'var(--subtle)',
              padding: '0.1rem 0.4rem',
              borderRadius: '2px',
            }}>
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
