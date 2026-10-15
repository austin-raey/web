import "./__layout.css";

export default function Layout({ children }: { children: JSX.Children }) {
  return (
    <>
      <wren-card class=":uno: rounded-6 w-[326px] aspect-[54/86] block perspective-[85dvw] isolate touch-manipulation dsk:w-[520px] dsk:aspect-[86/54]">
        <div class=":uno: rotate border border-black/20 rounded-inherit border-solid bg-white h-full shadow-lg relative overflow-hidden dark:border-white/20 dark:bg-black">
          <div class=":uno: rounded-inherit size-full inset-0 absolute" inert="true">
            <img
              alt=""
              class=":uno: rounded-inherit opacity-40 size-full inset-0 absolute bg-cover blur-4 dark:blur-5"
              decoding="async"
              fetchpriority="high"
              src="/bg.avif"
            />
            <img
              alt=""
              class=":uno: rounded-inherit opacity-25 size-full inset-0 absolute bg-cover mix-blend-luminosity"
              decoding="async"
              fetchpriority="high"
              src="/texture.avif"
            />
          </div>
          <div class=":uno: shine inset-0 absolute mix-blend-hard-light" inert="true" />
          <div class=":uno: p-4.3 rounded-inherit h-full relative">{children}</div>
        </div>
      </wren-card>
      <script async src="./__layout.script.ts" type="module" />
    </>
  );
}
