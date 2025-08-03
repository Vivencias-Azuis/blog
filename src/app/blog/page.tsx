import { getAllPosts } from '@/lib/posts'
import BlogClient from './BlogClient'

export default function BlogPage() {
  const allPosts = getAllPosts()
  
  return <BlogClient initialPosts={allPosts} />
}