import "./___root.css";
import "virtual:uno.css";

export default function RootLayout({ children }: { children: JSX.Children }) {
  return (
    <html class=":uno: text-black antialiased overflow-hidden h-dvh dark:text-white/90" lang="en">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="light dark" name="color-scheme" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/sitemap-index.xml" rel="sitemap" />
        <link as="image" href="/bg.avif" rel="preload" type="image/avif" />
        <link as="image" href="/texture.avif" rel="preload" type="image/avif" />
        <link as="image" href="/pfp.avif" rel="preload" type="image/avif" />

        <link
          as="font"
          crossorigin="anonymous"
          href="/sans.woff2"
          rel="preload"
          type="font/woff2"
        />
      </head>
      <body class=":uno: grid antialiased place-items-center-safe overflow-hidden h-dvh touch-manipulation">
        {children}
      </body>
    </html>
  );
}
