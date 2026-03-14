import { useParams, Link } from 'react-router-dom';
import { usePostsByTag } from '../hooks/usePosts';
import PostCard from '../components/PostCard';

export default function TagPosts() {
  const { tag } = useParams();
  const posts = usePostsByTag(decodeURIComponent(tag));

  return (
    <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '6rem' }}>
      <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: '0.5rem' }}>
        <Link to="/" style={{ color: 'var(--muted)' }}>首页</Link>
        {' / '}
        <Link to="/tags" style={{ color: 'var(--muted)' }}>标签</Link>
        {' / '}
        {tag}
      </p>

      <div style={{
        borderBottom: '1px solid var(--ink)', paddingBottom: '0.6rem', marginBottom: '0',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {tag}
        </h1>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          {posts.length} 篇
        </span>
      </div>

      {posts.length === 0 ? (
        <p style={{ paddingTop: '2rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          该标签下暂无文章。
        </p>
      ) : (
        posts.map((post, i) => (
          <PostCard key={post.slug} post={post} delay={Math.min(i + 1, 6)} />
        ))
      )}
    </div>
  );
}
