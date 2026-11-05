export interface LinkItem {
  label: string
  value: string
}

export interface LinkGroup {
  title: string
  links: LinkItem[]
}

export const defaultLinks: LinkGroup[] = [
  {
    title: "Reddit",
    links: [
      {
        label: "r/startpages",
        value: "https://www.reddit.com/r/startpages/",
      },
      {
        label: "r/unixporn",
        value: "https://www.reddit.com/r/unixporn/",
      },
      {
        label: "r/AnimalsBeingDerps",
        value: "https://www.reddit.com/r/AnimalsBeingDerps/",
      },
    ],
  },
  {
    title: "Design",
    links: [
      {
        label: "PixlrX",
        value: "https://pixlr.com/x/",
      },
      {
        label: "AI Image Enlarger",
        value: "https://bigjpg.com/en",
      },
      {
        label: "Img to Svg Converter",
        value: "https://picsvg.com/",
      },
    ],
  },
  {
    title: "Music",
    links: [
      {
        label: "i wanna be a cowboy",
        value: "https://www.youtube.com/watch?v=8zWz92f_HGs",
      },
      {
        label: "let the bodies hit the floor",
        value: "https://www.youtube.com/watch?v=b--VKaCB9u0",
      },
      {
        label: "Nobody Kanna Cross It",
        value: "https://www.youtube.com/watch?v=2wqTnwJGvtc",
      },
      {
        label: "Smug Dancin",
        value: "https://www.youtube.com/watch?v=eNZ9Od1jQ4Q",
      },
    ],
  },
]
