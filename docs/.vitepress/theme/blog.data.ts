import { createContentLoader } from 'vitepress'

export interface BlogPost {
  title: string
  subtitle: string
  author: string
  description: string
  image: string
  status: 'published' | 'concept'
  date: string
  tags: string[]
  url: string
  excerpt?: string
}

declare const data: BlogPost[]
export { data }

export default createContentLoader('blogs/*/index.md', {
  excerpt: true,
  transform(rawData): BlogPost[] {
    return rawData
      .map(({ url, frontmatter, excerpt }) => {
        // Extract blog folder name from URL (e.g., /blogs/prebuilt-ai-prompts/ -> prebuilt-ai-prompts)
        const blogFolder = url.split('/').filter(Boolean)[1]
        const imagePath = `/blogs/${blogFolder}/assets/banner.png`
        
        return {
          title: frontmatter.title,
          description: frontmatter.description,
          subtitle: frontmatter.subtitle,
          author: frontmatter.author,
          image: imagePath,
          status: frontmatter.status,
          date: frontmatter.date,
          tags: Array.isArray(frontmatter.tags) 
            ? frontmatter.tags 
            : typeof frontmatter.tags === 'string' 
            ? frontmatter.tags.split(',').map((tag: string) => tag.trim())
            : [],
          url,
          excerpt
        }
      })
      .filter((post) => post.status === 'published')
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }
})
