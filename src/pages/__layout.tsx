import "./__layout.css";

export default function Layout({ children }: { children: JSX.Children }) {
  return (
    <>
      <wren-card class=":uno: dsk:aspect-[86/54] dsk:w-[520px] rounded-6 w-[326px] aspect-[54/86] block perspective-[85dvw] isolate">
        <div class=":uno: rotate border border-black/20 rounded-inherit border-solid bg-white h-full shadow-lg relative overflow-hidden">
          <div class=":uno: rounded-inherit size-full inset-0 absolute" inert="true">
            <img
              alt=""
              class=":uno: rounded-inherit opacity-20 size-full inset-0 absolute blur-4"
              src="/bg.avif"
            />
            <img
              alt=""
              class=":uno: rounded-inherit opacity-25 size-full inset-0 absolute z-2 mix-blend-luminosity"
              src="/texture.avif"
            />
          </div>
          <div class=":uno: p-4.3 rounded-inherit h-full relative z-1">{children}</div>
        </div>
      </wren-card>
      <script async src="./__layout.script.ts" type="module" />
    </>
  );
}
