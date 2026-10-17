export default function Glass({
  as,
  children,
  class: className,
  ...props
}: {
  [key: string]: any;
  as?: keyof JSX.IntrinsicElements & string;
  children: JSX.Children;
  class?: string;
}) {
  const Component = as || "div";
  return (
    <Component
      class={`:uno: border border-white/30 rounded-5 bg-white/10 gap-2 shadow-[0_12px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.15)] from-white/30 to-white/5 bg-gradient-to-br backdrop-blur-16 backdrop-saturate-200 focus-visible:(outline-2 outline-current outline-offset-4) dark:(border-white/10 bg-black/30 from-white/15 to-white/5) ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
