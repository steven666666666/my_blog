import { useMemo } from 'react';
import { RAW_POSTS } from '../data/posts.js';

function parseReadingTime(content) {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} 分钟阅读`;
}

function processPost(raw) {
  return {
    slug: raw.slug,
    content: raw.content.trim(),
    readingTime: parseReadingTime(raw.content),
    ...raw.frontmatter,
    tags: raw.frontmatter.tags || [],
  };
}

const ALL_POSTS = RAW_POSTS.map(processPost).sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export function usePosts() {
  return useMemo(() => ALL_POSTS, []);
}

export function usePost(slug) {
  return useMemo(() => ALL_POSTS.find(p => p.slug === slug) ?? null, [slug]);
}

export function useAllTags() {
  return useMemo(() => {
    const map = {};
    ALL_POSTS.forEach(p => {
      p.tags.forEach(t => { map[t] = (map[t] || 0) + 1; });
    });
    return Object.entries(map)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, []);
}

export function usePostsByTag(tag) {
  return useMemo(
    () => ALL_POSTS.filter(p => p.tags.includes(tag)),
    [tag]
  );
}

export { ALL_POSTS };
