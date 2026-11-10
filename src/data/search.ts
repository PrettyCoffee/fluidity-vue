export const searchQueryToken = "{{query}}"

export const searchEngines = {
  Brave: `https://search.brave.com/search?q=${searchQueryToken}`,
  DuckDuckGo: `https://noai.duckduckgo.com/?q=${searchQueryToken}`,
  Google: `https://www.google.com/search?q=${searchQueryToken}`,
  Ecosia: `https://ecosia.org/search/?q=${searchQueryToken}`,
}

export interface Search {
  engine: string
  placeholder: string
  forwards: Record<string, string>
}

export const defaultSearch: Search = {
  engine: "Brave",
  placeholder: "Search the web",
  forwards: {
    deepl: "https://www.deepl.com/en/translator",
    maps: "https://duckduckgo.com/?iaxm=maps&q=duckduckgo",
    reddit: "https://reddit.com/",
    github: "https://github.com/",
    youtube: "https://youtube.com/",
    [`r/${searchQueryToken}`]: `https://reddit.com/r/${searchQueryToken}`,
    [`en:${searchQueryToken}`]: `https://www.deepl.com/translator?share=generic#en/de-de/${searchQueryToken}`,
    [`de:${searchQueryToken}`]: `https://www.deepl.com/translator?share=generic#de/en-us/${searchQueryToken}`,
    [`maps:${searchQueryToken}`]: `https://duckduckgo.com/?iaxm=maps&q=${searchQueryToken}`,
    [`reddit:${searchQueryToken}`]: `https://www.reddit.com/search/?q=${searchQueryToken}`,
  },
}
