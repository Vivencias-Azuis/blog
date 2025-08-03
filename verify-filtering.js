// Simple verification script for date filtering
const fs = require('fs')
const path = require('path')

console.log('Verifying date filtering functionality...\n')

// Simulate the date filtering logic
const postsDirectory = path.join(process.cwd(), 'src/content/posts')
const today = new Date()
today.setHours(23, 59, 59, 999)

console.log(`Today's date: ${today.toISOString()}`)
console.log('')

const fileNames = fs.readdirSync(postsDirectory)
const allPostsData = fileNames
  .filter((fileName) => fileName.endsWith('.mdx'))
  .map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Simple matter parsing
    const content = fileContents.split('---')[2] || ''
    const frontMatter = fileContents.split('---')[1] || ''
    
    // Extract date from frontmatter
    const dateMatch = frontMatter.match(/date:\s*"([^"]+)"/)
    const titleMatch = frontMatter.match(/title:\s*"([^"]+)"/)
    
    const date = dateMatch ? dateMatch[1] : new Date().toISOString()
    const title = titleMatch ? titleMatch[1] : slug
    
    return { slug, title, date }
  })
  .filter((post) => {
    const postDate = new Date(post.date)
    const isPublished = postDate <= today
    console.log(`- "${post.title}" (${post.date}) - ${isPublished ? '✅ Published' : '❌ Future date'}`)
    return isPublished
  })

console.log(`\nTotal posts found: ${fileNames.filter(f => f.endsWith('.mdx')).length}`)
console.log(`Published posts: ${allPostsData.length}`)
console.log(`Filtered out future posts: ${fileNames.filter(f => f.endsWith('.mdx')).length - allPostsData.length}`)

console.log('\n✅ Date filtering verification completed!') 