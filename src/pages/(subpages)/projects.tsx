import Link from "@wren-js/core/link";

import Glass from "#/components/glass.js";
import Icon from "#/components/icon.js";

export const head = () => {
  return (
    <>
      <title>Austin Raey's Projects</title>
      <link href="https://raey.me/projects" rel="canonical" />
      <meta content="Austin Raey's Projects - Software Engineer, Developer" name="description" />
      <meta
        content="Austin Raey's Projects - Software Engineer, Developer"
        name="twitter:description"
      />
      <meta
        content="Austin Raey's Projects - Software Engineer, Developer"
        property="og:description"
      />
      <meta content="Austin Raey" name="twitter:title" />
      <meta content="Austin Raey" property="og:site_name" />
      <meta content="Austin Raey" property="og:title" />
      <meta content="https://raey.me/projects" property="og:url" />
      <meta content="summary" name="twitter:card" />
      <meta content="website" property="og:type" />
    </>
  );
};

const PROJECTS = [
  {
    class: "col-span-2",
    description: "A fast, minimal JavaScript meta-framework",
    icon: "i-lucide-code",
    name: "wrenjs",
    url: "https://github.com/wrenjs/wrenjs",
  },
];

export default function PageProjects() {
  return (
    <div class=":uno: text-4 flex flex-col gap-2 h-full relative">
      <header>
        <h1 class=":uno: text-9 font-extrabold mb-3 view-transition-heading">Projects</h1>
        <p class="view-transition-description">
          A collection of projects I've worked on or am working on.
        </p>
      </header>

      <main>
        <ul class="mt-3 grid grid-cols-3">
          {PROJECTS.map((project) => (
            <li class={project.class}>
              <Glass
                as={Link}
                class=":uno: px-4 py-2 h-full block [&>i]:(mx-4 my-2)"
                href={project.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon class=":uno: size-5 right-0 top-0 absolute" icon={project.icon} />
                <h2 class="text-6 font-semibold m-0 mb-1">{project.name}</h2>
                <span class="text-3.5 leading-none m-0">{project.description}</span>
              </Glass>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
