interface Colors {
  bg: string
  fg: string
  accent1: string
  accent2: string
}

export interface Theme {
  name: string
  image: string
  colors: Colors
}

export const defaultTheme: Theme = {
  name: "DeathAndMilk",
  image: "./death-and-milk.png",
  colors: {
    bg: "#2E2E2E",
    fg: "#E6E6E6",
    accent1: "#FFB4E6",
    accent2: "#B4FFE6",
  },
}

export const themes: Theme[] = [
  defaultTheme,
  {
    name: "Dark Souls",
    image:
      "https://i.pinimg.com/originals/16/74/db/1674dbae45cd38f3d3b4c00dc8616bd7.gif",
    colors: {
      bg: "#32323C",
      fg: "#A0A08C",
      accent1: "#9A6650",
      accent2: "#461E28",
    },
  },
  {
    name: "S.E.Lain",
    image:
      "https://64.media.tumblr.com/54a945edd2641e20859d6f6537cd7423/tumblr_pwa4bogz4N1qze3hdo2_r1_500.gifv",
    colors: {
      bg: "#0a1a25",
      fg: "#a6b7ab",
      accent1: "#94656b",
      accent2: "#57182e",
    },
  },
]
