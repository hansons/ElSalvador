# Haiti and El Salvador on a map

An interactive timeline map. Open `index.html`; three maps share one page:

- **Haiti before** (`?map=before`): 1957 to 17 October 2026, gang territory spreading as the clock runs.
- **Haiti: intervention** (default): the Salvadoran-backed campaign against the gangs from the Santo ambush on 18 October 2026, with liberated areas.
- **El Salvador** (`?map=sv`).

Every entry carries its sources and a confidence level; coordinates and outlines are approximate.

## Data

- `data/events.js`: the intervention period. Updated daily by a news sweep (`ops/daily-news-sweep.md`); the log is in `ops/sweep-log.md`, open questions in `ops/review-queue.md`.
- `data/haiti-before.js`: the pre-intervention record.
- `node scripts/validate.js` checks the data; run it before every commit.
