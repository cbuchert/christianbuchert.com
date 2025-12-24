import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection("blog")
  return rss({
    title: "Chris Buchert | RSS Feed",
    description: "Because I like to write about technical stuff",
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  })
}
