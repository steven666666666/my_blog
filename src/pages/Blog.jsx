import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = usePosts();

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <div style={{ marginBottom: '0' }}>
        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: '0.5rem' }}>
          <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link> / 文章
        </p>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--ink)', paddingBottom: '0.6rem',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>所有文章</h1>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {posts.length} 篇
          </span>
        </div>
      </div>

      <div>
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} delay={Math.min(i, 6)} />
        ))}
      </div>
    </div>
  );
}
