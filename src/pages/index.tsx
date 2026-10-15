const SPECIALIZATIONS = ["Frontend", "Full-Stack", "DevOps"];
const PROFICIENCIES = [
  "JavaScript",
  "TypeScript",
  "JS Frameworks",
  "Meta Frameworks",
  "Node.js",
  "Docker",
  "CI / CD",
  "GraphQL",
  "CMS Specialist",
  "SEO",
  "Accessibility",
];
export const SOCIALS = [
  {
    alt: "Austin's GitHub profile",
    icon: "i-simple-icons-github",
    name: "austin-raey",
    url: "https://github.com/austin-raey",
  },
  {
    alt: "Austin's LinkedIn profile",
    icon: "i-simple-icons-linkedin",
    name: "austin-raey",
    url: "https://www.linkedin.com/in/austin-raey/",
  },
  {
    alt: "Austin's Threads profile",
    icon: "i-simple-icons-threads",
    name: "austin.raey",
    url: "https://www.threads.net/@austin.raey",
  },
  {
    alt: "Austin's Instagram profile",
    icon: "i-simple-icons-instagram",
    name: "austin.raey",
    url: "https://www.instagram.com/austin.raey",
  },
];
export default function IndexPage() {
  return (
    <div class=":uno: text-4 flex flex-col gap-2 h-full relative">
      <header>
        <figure>
          <img
            alt="Austin's profile picture"
            class=":uno: rounded-6 opacity-75 size-28 right-0 top-0 absolute z-0 mix-blend-color-burn -mr-2 dark:mix-blend-overlay"
            fetchpriority="high"
            src="./pfp-bw.svg"
          />
          <figcaption class=":uno: mix-blend-luminosity">
            <h1 class=":uno: text-9 flex flex-col">
              <span class=":uno: text-7 leading-none tracking-tight font-normal">Austin</span>
              <span class=":uno: leading-none tracking-tight font-extrabold">Raey</span>
            </h1>
          </figcaption>
        </figure>
      </header>

      <main class=":uno: flex grow basis-full flex-col gap-2 mix-blend-luminosity">
        <section class=":uno: font-semibold flex flex-col gap-2">
          <p>
            <i class=":uno: i-lucide-map-pin" inert="true" />
            <span class=":uno: sr-only">Located in:</span> United States
          </p>
          <p>
            <i class=":uno: i-lucide-briefcase" inert="true" />
            <span class=":uno: sr-only">Occupation:</span> Software Engineer
          </p>
        </section>
        <section class=":uno: flex flex-col gap-2">
          <dl class=":uno: flex flex-wrap gap-1">
            <dt class=":uno: sr-only">Specializing in:</dt>
            {SPECIALIZATIONS.map((specialization) => (
              <dd
                class=":uno: text-3 leading-tight px-1.5 py-1 border border-black/20 rounded-2.5 border-solid bg-white/30 inline-block backdrop-blur-1 dark:border-white/30 dark:bg-black/30"
                key={specialization}
              >
                {specialization}
              </dd>
            ))}
            <dt class=":uno: sr-only">Proficient in:</dt>
            {PROFICIENCIES.map((proficiency) => (
              <dd
                class=":uno: text-3 leading-tight px-1.5 py-1 border border-black/20 rounded-2.5 border-solid bg-white/30 inline-block backdrop-blur-1 dark:border-white/30 dark:bg-black/30"
                key={proficiency}
              >
                {proficiency}
              </dd>
            ))}
          </dl>
        </section>
      </main>

      <footer class=":uno: mb-8 flex grow basis-full items-end mix-blend-luminosity dark:mix-blend-luminosity">
        <nav class=":uno: flex flex-wrap gap-2">
          <h2 class=":uno: sr-only">Social Links</h2>
          {SOCIALS.map((social) => (
            <a
              class=":uno: leading-none font-semibold px-2.5 py-1.75 border-[1.5px] border-white/50 rounded-3 border-solid bg-white/40 inline-block backdrop-blur-2 dark:border-black/30 dark:bg-black/40"
              href={social.url}
              rel="noopener noreferrer"
              target="_blank"
              title={social.alt}
            >
              <i class={social.icon} inert="true" /> {social.name}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
