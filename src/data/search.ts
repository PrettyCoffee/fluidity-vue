export const searchQueryToken = "{{query}}"

export const searchEngines = {
  Brave: `https://search.brave.com/search?q=${searchQueryToken}`,
  DuckDuckGo: `https://duckduckgo.com/?q=${searchQueryToken}`,
  Google: `https://www.google.com/search?q=${searchQueryToken}`,
  Ecosia: `https://ecosia.org/search/?q=${searchQueryToken}`,
}

export interface Search {
  engine: string
  forwards: Record<string, string>
}

export const defaultSearch: Search = {
  engine: searchEngines.Brave,
  forwards: {
    deepl: "https://deepl.com/",
    maps: "https://google.de/maps/",
    reddit: "https://reddit.com/",
    github: "https://github.com/",
    youtube: "https://youtube.com/",
    [`r/${searchQueryToken}`]: `https://reddit.com/r/${searchQueryToken}`,
    [`deepl:${searchQueryToken}`]: `https://www.deepl.com/translator?share=generic#${searchQueryToken}`,
  },
}
