import Link from "@wren-js/core/link";

import Glass from "#/components/glass.js";
import Icon from "#/components/icon";

export const BREADCRUMB = [
  {
    name: "Projects",
  },
];
export default function LayoutSubpages({ children }: { children: JSX.Children }) {
  return (
    <>
      <Glass
        as="nav"
        class=":uno: m-4.3 px-2 inline-flex gap-2 items-center bottom-7.3 right-0 absolute z-2 view-transition-breadcrumb [&>wren-link,&>span]:(p-2 flex) dsk:(bottom-initial top-0)"
      >
        <Link href="/">Home</Link>
        <Icon icon="i-lucide:chevron-right" />
        <span>{BREADCRUMB.map((crumb) => crumb.name)}</span>
      </Glass>
      {children}
    </>
  );
}
