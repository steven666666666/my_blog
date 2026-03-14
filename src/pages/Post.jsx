import { useParams, Link, Navigate } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useEffect } from 'react';

export default function Post() {
  const { slug } = useParams();
  const post = usePost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>

      {/* Breadcrumb */}
      <p className="fade-up" style={{
        fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
        color: 'var(--muted)', marginBottom: '2.5rem',
      }}>
        <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link>
        {' / '}
        <Link to="/blog" style={{ color: 'var(--muted)' }}>文章</Link>
        {' / '}
        <span>{post.title}</span>
      </p>

      {/* Header */}
      <header style={{ marginBottom: '3rem' }}>
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="fade-up delay-1" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {post.tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`} style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.5rem',
                borderRadius: '2px',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--ink)';
                e.currentTarget.style.borderColor = 'var(--ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}>
                {tag}
              </Link>
            ))}
          </div>
        )}

        <h1 className="fade-up delay-2" style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'var(--ink)',
          lineHeight: 1.25,
          marginBottom: '1.25rem',
        }}>
          {post.title}
        </h1>

        <div className="fade-up delay-3" style={{
          display: 'flex', gap: '1.25rem', flexWrap: 'wrap',
          fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
          color: 'var(--muted)', fontWeight: 300,
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <time>{format(new Date(post.date), 'yyyy年M月d日', { locale: zhCN })}</time>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose fade-up delay-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '4rem', paddingTop: '2rem',
        borderTop: '1px solid var(--border)',
      }}>
        <Link to="/blog" style={{
          fontSize: '0.875rem',
          color: 'var(--muted)',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
          ← 返回文章列表
        </Link>
      </div>
    </div>
  );
}
