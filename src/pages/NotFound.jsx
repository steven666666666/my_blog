import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{
      paddingTop: '3.5rem', paddingBottom: '6rem',
      minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
        color: 'var(--muted)', marginBottom: '1rem', letterSpacing: '0.08em',
      }}>
        404
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 400,
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        color: 'var(--ink)', marginBottom: '1rem',
      }}>
        页面不存在
      </h1>
      <p style={{
        fontSize: '0.9rem', color: 'var(--body)', fontWeight: 300,
        marginBottom: '2rem', lineHeight: 1.7,
      }}>
        你访问的页面已被移除，或地址有误。
      </p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={{
          fontSize: '0.875rem', color: 'var(--ink)',
          borderBottom: '1px solid var(--ink)', paddingBottom: '1px',
        }}>
          返回首页
        </Link>
        <Link to="/blog" style={{
          fontSize: '0.875rem', color: 'var(--muted)',
          borderBottom: '1px solid var(--border)', paddingBottom: '1px',
        }}>
          浏览文章
        </Link>
      </div>
    </div>
  );
}
