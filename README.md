This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, start the database as a docker container:
```bash
docker run -p 5433:5432 -e POSTGRES_PASSWORD=mysecretpassword --name quiz-postgres -d postgres
```

After that, prepare the database schema:

```bash
npx prisma db push
# or
yarn prisma db push
# or
pnpx prisma db push
# or
bun x prisma db push
```

Then, generate the Prisma client:

```bash
npx prisma generate
# or
yarn prisma generate
# or
pnpx prisma generate
# or
bun x prisma generate
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

If you want to see the database, run:

```bash
npx prisma studio
# or
yarn prisma studio
# or
pnpx prisma studio
# or
bun x prisma studio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[//]: # (<a href="https://next-quiz.davidemarcoli.dev">)

[//]: # (  <img alt="Precedent – Building blocks for your Next project" src="https://next-quiz.davidemarcoli.dev/opengraph-image">)

[//]: # (  <h1 align="center">Precedent</h1>)

[//]: # (</a>)

[//]: # ()
[//]: # (<p align="center">)

[//]: # (  Building blocks for your Next project)

[//]: # (</p>)

[//]: # ()
[//]: # (<p align="center">)

[//]: # (  <a href="https://twitter.com/steventey">)

[//]: # (    <img src="https://img.shields.io/twitter/follow/steventey?style=flat&label=steventey&logo=twitter&color=0bf&logoColor=fff" alt="Steven Tey Twitter follower count" />)

[//]: # (  </a>)

[//]: # (  <a href="https://github.com/steven-tey/precedent">)

[//]: # (    <img src="https://img.shields.io/github/stars/steven-tey/precedent?label=steven-tey%2Fprecedent" alt="Precedent repo star count" />)

[//]: # (  </a>)

[//]: # (</p>)

[//]: # ()
[//]: # (<p align="center">)

[//]: # (  <a href="#introduction"><strong>Introduction</strong></a> ·)

[//]: # (  <a href="#one-click-deploy"><strong>One-click Deploy</strong></a> ·)

[//]: # (  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·)

[//]: # (  <a href="#author"><strong>Author</strong></a>)

[//]: # (</p>)

[//]: # (<br/>)

[//]: # ()
[//]: # (## Introduction)

[//]: # ()
[//]: # (Precedent is an opinionated collection of components, hooks, and utilities for your Next.js project.)

[//]: # ()
[//]: # (## One-click Deploy)

[//]: # ()
[//]: # (You can deploy this template to Vercel with the button below:)

[//]: # ()
[//]: # ([![Deploy with Vercel]&#40;https://vercel.com/button&#41;]&#40;https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fnext-quiz.davidemarcoli.dev&demo-image=https%3A%2F%2Fnext-quiz.davidemarcoli.dev%2Fopengraph-image&env=GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example&stores=%5B%7B"type"%3A"postgres"%7D%5D&#41;)

[//]: # ()
[//]: # (You can also clone & create this repo locally with the following command:)

[//]: # ()
[//]: # (```bash)

[//]: # (npx create-next-app precedent --example "https://github.com/steven-tey/precedent")

[//]: # (```)

[//]: # ()
[//]: # (## Tech Stack + Features)

[//]: # ()
[//]: # (https://user-images.githubusercontent.com/28986134/212368288-12f41e37-aa8c-4e0a-a542-cf6d23410a65.mp4)

[//]: # ()
[//]: # (### Frameworks)

[//]: # ()
[//]: # (- [Next.js]&#40;https://nextjs.org/&#41; – React framework for building performant apps with the best developer experience)

[//]: # (- [Auth.js]&#40;https://authjs.dev/&#41; – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.)

[//]: # (- [Prisma]&#40;https://www.prisma.io/&#41; – Typescript-first ORM for Node.js)

[//]: # ()
[//]: # (### Platforms)

[//]: # ()
[//]: # (- [Vercel]&#40;https://vercel.com/&#41; – Easily preview & deploy changes with git)

[//]: # (- [Vercel Postgres]&#40;https://vercel.com/postgres&#41; – Serverless Postgres at the Edge)

[//]: # ()
[//]: # (### UI)

[//]: # ()
[//]: # (- [Tailwind CSS]&#40;https://tailwindcss.com/&#41; – Utility-first CSS framework for rapid UI development)

[//]: # (- [Radix]&#40;https://www.radix-ui.com/&#41; – Primitives like modal, popover, etc. to build a stellar user experience)

[//]: # (- [Framer Motion]&#40;https://framer.com/motion&#41; – Motion library for React to animate components with ease)

[//]: # (- [Lucide]&#40;https://lucide.dev/&#41; – Beautifully simple, pixel-perfect icons)

[//]: # (- [`next/font`]&#40;https://nextjs.org/docs/basic-features/font-optimization&#41; – Optimize custom fonts and remove external network requests for improved performance)

[//]: # (- [`ImageResponse`]&#40;https://beta.nextjs.org/docs/api-reference/image-response&#41; – Generate dynamic Open Graph images at the edge)

[//]: # (- [`react-wrap-balancer`]&#40;https://github.com/shuding/react-wrap-balancer&#41; – Simple React component that makes titles more readable)

[//]: # ()
[//]: # (### Hooks and Utilities)

[//]: # ()
[//]: # (- `useIntersectionObserver` –  React hook to observe when an element enters or leaves the viewport)

[//]: # (- `useLocalStorage` – Persist data in the browser's local storage)

[//]: # (- `useScroll` – React hook to observe scroll position &#40;[example]&#40;https://github.com/steven-tey/precedent/blob/main/components/layout/navbar.tsx#L12&#41;&#41;)

[//]: # (- `nFormatter` – Format numbers with suffixes like `1.2k` or `1.2M`)

[//]: # (- `capitalize` – Capitalize the first letter of a string)

[//]: # (- `truncate` – Truncate a string to a specified length)

[//]: # (- [`use-debounce`]&#40;https://www.npmjs.com/package/use-debounce&#41; – Debounce a function call / state update)

[//]: # ()
[//]: # (### Code Quality)

[//]: # ()
[//]: # (- [TypeScript]&#40;https://www.typescriptlang.org/&#41; – Static type checker for end-to-end typesafety)

[//]: # (- [Prettier]&#40;https://prettier.io/&#41; – Opinionated code formatter for consistent code style)

[//]: # (- [ESLint]&#40;https://eslint.org/&#41; – Pluggable linter for Next.js and TypeScript)

[//]: # ()
[//]: # (### Miscellaneous)

[//]: # ()
[//]: # (- [Vercel Analytics]&#40;https://vercel.com/analytics&#41; – Track unique visitors, pageviews, and more in a privacy-friendly way)

[//]: # ()
[//]: # (## Author)

[//]: # ()
[//]: # (- Steven Tey &#40;[@steventey]&#40;https://twitter.com/steventey&#41;&#41;)
