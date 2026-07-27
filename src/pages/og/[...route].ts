import { getCollection } from "astro:content"
import { OGImageRoute } from "astro-og-canvas"

// Static pages get hand-written card copy; blog posts pull title/description
// from their frontmatter. Keys match each route's pathname (see base-head.astro),
// so a new page needs an entry here or it falls back to the site default card.
const staticPages = {
  index: { title: "Chris Buchert", description: "Product engineer. I build things on the web." },
  about: { title: "About Me", description: "I hike rivers, carve wooden geometries, and build products on the web." },
  projects: { title: "Side Projects", description: "Things I build for fun." },
  blog: { title: "Technical Blog", description: "Because I like to write about technical stuff." },
  links: { title: "Links", description: "Things worth reading, watching, or using." },
}

const posts = await getCollection("blog")
const blogPages = Object.fromEntries(
  posts.map(post => [`blog/${post.id}`, { title: post.data.title, description: post.data.description }]),
)

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...blogPages },
  getImageOptions: (_path, page: { title: string, description: string }) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: "./public/images/chris-glyph-voxels.png",
      size: [180],
    },
    bgGradient: [[247, 248, 250], [255, 255, 255]],
    border: { color: [35, 55, 255], width: 24, side: "inline-start" },
    padding: 80,
    font: {
      title: {
        color: [15, 18, 25],
        size: 72,
        weight: "Bold",
        families: ["Atkinson Hyperlegible"],
      },
      description: {
        color: [96, 115, 159],
        size: 32,
        lineHeight: 1.4,
        families: ["Atkinson Hyperlegible"],
      },
    },
    fonts: [
      "./public/fonts/atkinson-regular.woff",
      "./public/fonts/atkinson-bold.woff",
    ],
  }),
})
