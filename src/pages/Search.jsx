import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { usePosts } from '../hooks/usePosts';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function Search() {
  const posts = usePosts();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fuse = useMemo(() => new Fuse(posts, {
    keys: [
      { name: 'title',   weight: 3 },
      { name: 'excerpt', weight: 2 },
      { name: 'tags',    weight: 2 },
      { name: 'content', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
  }), [posts]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map(r => r.item);
  }, [query, fuse]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: '0.5rem' }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link> / 搜索
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--ink)', marginBottom: '1.75rem',
        }}>
          搜索文章
        </h1>

        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--muted)', pointerEvents: 'none',
          }}>
            <SearchIcon />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索标题、内容、标签..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              color: 'var(--ink)',
              background: 'var(--white)',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--muted)',
                fontSize: '1.1rem', lineHeight: 1, padding: '0.2rem',
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {hasQuery && (
        <div>
          <div style={{
            borderBottom: '1px solid var(--ink)', paddingBottom: '0.6rem', marginBottom: '0',
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400, color: 'var(--ink)' }}>
              搜索结果
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              {results.length} 篇匹配
            </span>
          </div>

          {results.length === 0 ? (
            <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                没有找到与 "<strong style={{ color: 'var(--ink)' }}>{query}</strong>" 相关的文章
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                试试其他关键词
              </p>
            </div>
          ) : (
            results.map((post, i) => (
              <SearchResultCard key={post.slug} post={post} query={query} delay={Math.min(i, 5)} />
            ))
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasQuery && (
        <div style={{ paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '2rem', fontWeight: 300 }}>
            在 {posts.length} 篇文章中搜索
          </p>
          <div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem', fontWeight: 400 }}>
              所有文章
            </p>
            {posts.slice(0, 8).map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                padding: '0.6rem 0', borderBottom: '1px solid var(--border)',
                fontSize: '0.88rem', color: 'var(--body)', fontWeight: 300,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--body)'}
              >
                <span>{post.title}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginLeft: '1rem' }}>
                  {format(new Date(post.date), 'yyyy-MM-dd')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchResultCard({ post, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`fade-up delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{tag}</span>
          ))}
        </div>
      )}
      <h3 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 400,
        fontSize: '1.1rem', color: hovered ? 'var(--muted)' : 'var(--ink)',
        marginBottom: '0.35rem', transition: 'color 0.15s', lineHeight: 1.35,
      }}>
        {post.title}
      </h3>
      <p style={{
        fontSize: '0.85rem', color: 'var(--body)', fontWeight: 300,
        lineHeight: 1.6, marginBottom: '0.5rem',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>
      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
        {format(new Date(post.date), 'yyyy年M月d日', { locale: zhCN })}
      </span>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
