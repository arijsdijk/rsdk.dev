import { createContentLoader } from 'vitepress'

export interface SessionData {
  title: string
  description: string
  event: string
  location: string
  link: string
  date: string
  url: string
}

export default createContentLoader('sessions/*.md', {
  transform(rawData): SessionData[] {
    return rawData
      .filter((page) => page.frontmatter.status === 'published')
      .map((page) => ({
        title: page.frontmatter.title,
        description: page.frontmatter.description,
        event: page.frontmatter.event,
        location: page.frontmatter.location,
        link: page.frontmatter.link,
        date: page.frontmatter.date,
        url: page.url
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})
