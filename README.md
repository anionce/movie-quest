# Movie Quest

A movie guessing game. You get the release year, the genres and the title as blanks; ask for hints (a few letters, the tagline, a cast member, a still) and guess before you run out of clues. Each clue left is a point, and your best scores are kept on the device. Available in Spanish and English.

**Stack:** Vite + React 19 + TypeScript · React Router · MUI · i18next · Sass · TMDB API · Vitest + Testing Library.

## How it works

- **Easy** picks a movie among the most popular TMDB pages; **hard** picks from the rest.
- Recently played movies are skipped, and a movie is only used if TMDB has a tagline for it.
- Each round starts with 3 clues plus one per bonus letter (a, e, m) in the title. Hints reveal those letters first, then the tagline, an actor and a still. Wrong guesses also cost a clue.

## Structure

```
src/
  components/  game board, clues, input, footer, modals, result
  hooks/       useMovieRound: loads rounds and cancels stale requests
  lib/         pure logic: game rules (reducer), random picks, local storage
  models/      TMDB response types
  pages/       Home and ErrorPage
  routes/      routes and their paths
  services/    TMDB client, round loading and i18n
  test/        test setup, factories and render helpers
```

## Getting started

```bash
npm install
echo "VITE_REACT_APP_TOKEN=<your TMDB read access token>" > .env
npm run dev
```

When deploying, set `VITE_REACT_APP_TOKEN` in the hosting provider's environment settings.

## Scripts

| Script               | What it does                        |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Start the dev server                |
| `npm test`           | Run the test suite once             |
| `npm run test:watch` | Run tests in watch mode             |
| `npm run typecheck`  | Type-check the project              |
| `npm run lint`       | Lint with ESLint                    |
| `npm run format`     | Format with Prettier                |
| `npm run build`      | Type-check and build to `dist/`     |
| `npm run preview`    | Serve the production build locally  |

## Tests

Vitest + Testing Library on jsdom. Unit tests cover the game rules, random picks, clue building and local storage; service tests cover loading a round with the TMDB client mocked; component tests play a round, check the result screen and the home page from the user's point of view. Tests never call TMDB or read `.env`.
