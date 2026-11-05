import { defineStore } from "pinia"

import { defaultLinks, type LinkGroup } from "@/data/links"
import { defaultSearch, type Search } from "@/data/search"
import { defaultTheme, type Theme } from "@/data/themes"
import { LocalStorage } from "@/utils/local-storage"

const storage = {
  theme: new LocalStorage("theme", defaultTheme),
  search: new LocalStorage("search", defaultSearch),
  links: new LocalStorage("links", defaultLinks),
}

export const useUserConfigStore = defineStore("user-config", {
  state: () => ({
    theme: storage.theme.get(),
    search: storage.search.get(),
    links: storage.links.get(),
  }),

  actions: {
    setTheme(theme: Partial<Theme>) {
      this.theme = { ...this.theme, ...theme }
      storage.theme.set(this.theme)
    },
    setSearch(search: Partial<Search>) {
      this.search = { ...this.search, ...search }
      storage.search.set(this.search)
    },
    setLinks(linkGroups: LinkGroup[]) {
      this.links = linkGroups
      storage.links.set(this.links)
    },
  },
})
