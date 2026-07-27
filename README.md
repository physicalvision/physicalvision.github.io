# Physical Vision Group Website

The official website of the **Physical Vision Group (PVG)** at Nanyang
Technological University (NTU), Singapore.

PVG conducts research in computer vision and machine learning, with a focus on
reconstructing, understanding, and creating the physical world. The group
studies appearance, geometry, motion, occlusion, interaction, gravity, mass,
sound, and other properties needed to build realistic digital twins.

**Website:** [physicalvision.github.io](https://physicalvision.github.io/)

## What the Website Contains

- An overview of the group and its research directions
- Current members, visiting researchers, collaborators, and alumni
- Research projects and dedicated project pages
- A searchable and filterable publication list
- Group news, awards, events, and announcements
- Open research positions and application information
- The PVG Seminar Series, including upcoming and archived talks

## Technology Stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Static export hosted on [GitHub Pages](https://pages.github.com/)

## Getting Started

### Prerequisites

- [Node.js 20](https://nodejs.org/) (the version used by the deployment workflow)
- npm

### Install and Run

```bash
git clone https://github.com/physicalvision/physicalvision.github.io.git
cd physicalvision.github.io
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The development
server uses Turbopack and reloads the site when source files change.

### Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production-ready static export in `out/` |
| `npm run start` | Start the Next.js production server |
| `npm run lint` | Run the configured Next.js lint command |

## Project Structure

```text
.
├── .github/workflows/nextjs.yml    # GitHub Pages build and deployment
├── public/
│   ├── images/                     # Logos, team photos, and project images
│   ├── videos/                     # Homepage and project teaser videos
│   └── research/                   # Assets for dedicated research pages
├── src/
│   ├── app/
│   │   ├── page.tsx                # Homepage
│   │   ├── people/                 # People and profile pages
│   │   ├── projects/               # Project listing and project pages
│   │   ├── publications/           # Publication browser
│   │   ├── news/                   # News archive
│   │   ├── position/               # Open positions
│   │   ├── seminars/               # Seminar series
│   │   └── research/               # Standalone research project pages
│   ├── components/                 # Shared layout and UI components
│   ├── lib/                        # Shared utilities
│   └── pvg_db/                     # JSON content used throughout the site
├── next.config.ts                  # Static export configuration
├── package.json
└── tsconfig.json
```

## Updating Website Content

Most site content is maintained in JSON files under `src/pvg_db/`.

| Content | File |
| --- | --- |
| Homepage video carousel | `src/pvg_db/home_video.json` |
| News and announcements | `src/pvg_db/news.json` |
| People and affiliations | `src/pvg_db/people.json` |
| Research projects and grants | `src/pvg_db/projects.json` |
| Publications | `src/pvg_db/publications.json` |
| Seminar schedule and archive | `src/pvg_db/seminars.json` |

When updating content:

1. Keep the existing JSON structure and field names.
2. Store images in `public/images/`, videos in `public/videos/`, and
   research-page assets in `public/research/`.
3. Reference public assets with root-relative paths, such as
   `/images/team/example.jpg`.
4. Use `DD/MM/YYYY` for news and publication dates.
5. Set a news item's `id` to `"selected"` when it should appear on the
   homepage.
6. Run the checks below before submitting the change.

```bash
npm run lint
npm run build
```

Some content is implemented directly in page components rather than JSON. For
example, position details are maintained in `src/app/position/page.tsx`, while
standalone research pages live under `src/app/research/`.

## Adding a Page

This project follows the Next.js App Router convention. Add a `page.tsx` file
inside a new directory under `src/app/`:

```text
src/app/example/page.tsx
```

The page will be available at `/example/` after the next build. Add the route to
`src/components/header.tsx` if it should appear in the main navigation.

Pages under `/research/` are treated as standalone project websites and do not
use the shared PVG header or footer.

## Deployment

The site is configured as a static export in `next.config.ts`. Every push to the
`main` branch triggers `.github/workflows/nextjs.yml`, which:

1. Installs dependencies with `npm ci`.
2. Builds the site with Node.js 20.
3. Uploads the generated `out/` directory.
4. Deploys the artifact to GitHub Pages.

The workflow can also be started manually from the **Actions** tab in GitHub.

## Contributing

1. Create a branch for the update.
2. Make the content or code changes.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a concise description of the change.

All website content and media are maintained by the Physical Vision Group.
