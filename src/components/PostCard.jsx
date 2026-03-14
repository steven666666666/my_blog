import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useState } from 'react';

export default function PostCard({ post, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`fade-up delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '1.5rem 0',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
      }}
    >
      {/* Tags row */}
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: '0.72rem',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.03em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
        fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
        color: hovered ? 'var(--muted)' : 'var(--ink)',
        marginBottom: '0.45rem',
        transition: 'color 0.2s',
        lineHeight: 1.35,
      }}>
        {post.title}
      </h2>

      {/* Excerpt */}
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--body)',
        fontWeight: 300,
        lineHeight: 1.65,
        marginBottom: '0.75rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Meta */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        fontSize: '0.78rem',
        color: 'var(--muted)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 300,
      }}>
        <time>{format(new Date(post.date), 'yyyy年M月d日', { locale: zhCN })}</time>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
