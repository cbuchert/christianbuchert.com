import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
  const entries = await getCollection("til")
  const sorted = entries.sort((a, b) =>
    new Date(b.id).getTime() - new Date(a.id).getTime()
  )
  return rss({
    title: "Chris Buchert | TIL",
    description: "Things I learn. One a day, more or less.",
    site: context.site,
    items: sorted.map(entry => ({
      title: new Date(entry.id).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }),
      pubDate: new Date(entry.id),
      description: entry.body,
      link: "/",
    })),
  })
}
