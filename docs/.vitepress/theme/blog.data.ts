import { createContentLoader } from 'vitepress'

export interface BlogPost {
  title: string
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
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        description: frontmatter.description,
        image: frontmatter.image,
        status: frontmatter.status,
        date: frontmatter.date,
        tags: Array.isArray(frontmatter.tags) 
          ? frontmatter.tags 
          : typeof frontmatter.tags === 'string' 
          ? frontmatter.tags.split(',').map((tag: string) => tag.trim())
          : [],
        url,
        excerpt
      }))
      .filter((post) => post.status === 'published')
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }
})
