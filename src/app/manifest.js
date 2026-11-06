export default function manifest() {
  return {
    name:             "Arunrg-portfolio",
    short_name:       "Arunrg-portfolio",
    description:      "AI Engineer and Full-Stack Developer turning ideas into practical software by combining AI, engineering, and thoughtful design.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#080808",
    theme_color:      "#F26A21",
    lang:             "en",
    icons: [
      { src: "/avatar.png", sizes: "192x192", type: "image/png" },
      { src: "/avatar.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
