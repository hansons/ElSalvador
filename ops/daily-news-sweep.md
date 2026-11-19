# Daily news sweep: the liberation effort in Haiti

You are running the daily update of the Haiti intervention map (`index.html`, data in `data/events.js`). Find what happened since the last sweep, add it to the data, check it, commit and push. Pushing to `main` publishes the site, so everything you add is public within minutes. Accuracy beats volume: a day with nothing verifiable is a valid result.

## 1. Know where you are

- Read the header comment of `data/events.js` for the data format, and look at a few recent events as examples.
- `meta.end` in `data/events.js` is the last day covered. Search from two days before `meta.end` up to today, so stories reported late are caught.
- Read the last entry of `ops/sweep-log.md` and `ops/review-queue.md` to see what is pending.

## 2. Search

Search in English, French, Haitian Creole and Spanish. Run at least these searches, adding today's month and year:

- Salvadoran troops Haiti · Bukele Haiti · Gang Suppression Force Haiti · GSF Haiti operation
- forces salvadoriennes Haïti · opération PNH gangs · Viv Ansanm · Port-au-Prince gangs
- sòlda salvadoryen · PNH operasyon
- tropas salvadoreñas Haití · Fuerza Armada El Salvador Haití
- Each live area by name: Croix-des-Bouquets, Santo, Canaan, Cité Soleil, downtown Port-au-Prince (centre-ville), Martissant, Carrefour, Kenscoff, Gressier, Arcahaie, Cabaret, Mirebalais, Artibonite
- Each gang leader by name: Chérizier, Wilson Joseph (Lanmò San Jou), Jeff Larose, Izo, Krisla, Ti Lapli, Luckson Elan
- The four missing Salvadoran technicians

Sources to prefer, roughly in this order: AP, Reuters, AFP (France 24, Barron's, etc.), EFE; The Haitian Times, Le Nouvelliste, AyiboPost, Juno7, Gazette Haïti, Alterpresse; Miami Herald (Jacqueline Charles); UN News, BINUH/OHCHR, OCHA, IOM, ReliefWeb; ACLED; InSight Crime; RNDDH; Salvadoran outlets (La Prensa Gráfica, El Mundo, Diario El Salvador, El Faro); official accounts (PNH, GSF, Primature, Bukele, Salvadoran Defence Ministry) **as claims, attributed**.

Open every page you cite if you can. If you only saw a search-result snippet, say so in `notes`.

## 3. What to record

**Events** (one per incident), category:

- `military`: operations, strikes, arrests, patrols, bases, troop arrivals, by PNH, GSF, Salvadoran or other forces
- `gang`: attacks, killings, kidnappings, threats, videos and statements by gangs
- `people`: marches, vigilante action, displacement, public reaction
- `politics`: governments, UN, diplomacy, agreements, statements of policy
- `humanitarian`: aid, health, rights reports, allegations of abuse (including by Salvadoran or Haitian forces)

Rules:

- Attribute every claim in `summary` ("according to AP", "the PNH said"). Official claims of kills or captures are claims, not facts.
- Casualty figures: use the lowest well-sourced figure in `killed` / `injured` and put every figure with who gave it in `casualties.note`.
- `confidence`: `high` = two independent reliable sources or one primary document; `medium` = one reliable source; `low` = a single partisan or social-media source, or details that conflict.
- Coordinates: use coordinates already in the data for the same place when they exist (search `data/events.js` and `data/haiti-before.js`). Set `location_precision` honestly. No location → `"location_precision": "unknown"`, put the pin on Port-au-Prince (18.5425, -72.3386).
- `id`: `YYYY-MM-DD-short-slug`, unique.
- Graphic video sources get `"graphic": true`.
- Do not add an event that is already in the data. If a new report adds to an existing event (higher toll, new source), use `updates` instead.
- Abuses alleged against the intervention forces are recorded exactly like gang abuses. Do not soften or omit them.

**Territory.** Each named area's status is the latest dated entry for that name. Use the existing names. Add a new dated entry only when a source reports a change.

- `contested`: security forces operating, raids, clashes, searches, or a gang leader killed, with no report that the state holds the ground.
- `retaken` (a blue circle, `territory`) **and** `liberated` (a blue outline, `control_areas`): **only** when a source says security forces retook the area **and are holding it**, or are based there. Examples: a base set up inside it, police posts reopened, residents returning under a security presence. A raid, a drive-through, "no resistance met" or an official saying an area "will be" retaken is not enough. Two independent sources are needed, or one primary source plus one independent report. Otherwise record the event, keep the area `contested`, and add a line to `ops/review-queue.md`.
- A `liberated` outline goes in `control_areas`: `{ "name", "as_of", "status": "liberated", "polygon": [[[lat, lon], ...]], "sources", "confidence", "notes" }`. Draw it around what the sources name: a stadium and its blocks, a neighbourhood, a road. Never draw a whole commune because one site in it was retaken. To grow an existing liberated area, add a new outline with the same `name` and a later `as_of`.
- If gangs retake an area, record it: a `territory` entry `gang-held` or `contested`, and for a liberated outline a new entry with the same name, a later `as_of` and status `ended`.

**Salvadoran operations under way.** The map draws a blue-striped "operations under way" zone automatically around every `military` event whose `actor` or `title` names El Salvador and whose `location_precision` is landmark, neighbourhood or commune. A no-go zone it falls in is drawn as breaking. So: name the Salvadorans in `actor` (e.g. "El Salvador" or "El Salvador, PNH") when they took part, and pin the event where it happened. Add `"operation": false` to an event that names El Salvador but is not an operation on the ground (e.g. a speech held at a base), or `"operation": { "radius_km": 2 }` to widen a large operation. This is not liberation: that still needs the rule below.

**The marches and the public response:** when a march or celebration happens, note in `notes` whether it took place in a liberated, contested, gang-held or never-held area, from the territory data.

**Messages: what the key voices said.** Readers see these as cards that slide in on the map on the day they were said. Record them in the sweep file's `messages` list:

```
{ "id": "YYYY-MM-DD-speaker-slug", "date": "YYYY-MM-DD", "speaker": "Nayib Bukele", "role": "President of El Salvador",
  "side": "el-salvador | security-forces | haiti-government | gang | international | civil-society",
  "platform": "x | tiktok | youtube | video | speech | press-conference | statement | interview | letter",
  "media": "text | video", "lang": "es | en | fr | ht", "text": "the speaker's own words",
  "translation": "English, or null if the original is English", "translation_by": "the source, or 'map editors'",
  "url": "the post or video itself if known, else the best article", "event_id": "matching event id, or null",
  "sources": [ ... ], "confidence": "high | medium | low", "notes": "where you saw the wording" }
```

- **Every Bukele post, video or statement about Haiti** goes in. He is the reason this map exists.
- Others only when the message moved events or answers the campaign directly. Examples: Haiti's PM, the PNH or GSF command, Salvadoran ministers, the UN Secretary-General or BINUH, the US, gang leaders' videos (Lanmò San Jou, Chérizier, Jeff Larose), RNDDH or Amnesty responding to the operations.
- `text` must be the speaker's **verbatim** words, an excerpt marked with … if cut, in the original language. If you have only a reporter's paraphrase, do not add a message: put the paraphrase in the event's summary instead. Translations you make yourself are labelled `"translation_by": "map editors"`.
- Link the message to its event with `event_id` when there is one. Gang videos are recorded as what they claim, not as fact.

**Withdrawal watch (standing order from the founder).** If any source reports that El Salvador has withdrawn its forces from Haiti, announced a withdrawal or an end date, or substantially drawn down, record it as an event as usual **and** put this at the very top of `ops/review-queue.md`, above everything else:

```
## FOUNDER DECISION NEEDED: El Salvador leaving Haiti (YYYY-MM-DD)
<what was reported, by whom, with links>. The founder asked to be told: decide whether the Haiti feature
closes as a finished chapter or stays open (charter action A-10).
```

Say so in your final summary too. Do this even when the report is a single source or an unconfirmed claim, and label it as such.

## 4. Write, merge, check

1. Write what you found to `ops/sweeps/YYYY-MM-DD.json` (format at the top of `scripts/merge-sweep.js`).
2. `node scripts/merge-sweep.js ops/sweeps/YYYY-MM-DD.json --date YYYY-MM-DD`
3. `node scripts/validate.js`. It must print "Data OK". Fix every error and run it again. Never commit while it fails.
4. Append an entry to `ops/sweep-log.md`:
   ```
   ## YYYY-MM-DD
   Searched: <period covered>. Added N events (list: date, title). Updated: <ids>. Territory: <changes or "none">.
   Not added: <items you saw but could not verify, and why>.
   ```
5. Anything that needs a human decision goes to `ops/review-queue.md` as a dated bullet. Examples: a liberation claim with only one source, figures that contradict the existing data, a possible error in an earlier entry, a source you think is fabricated. Add the item to the data at the cautious level (contested, low confidence) unless it is too doubtful to publish at all.

## 5. Commit and push

`git add data/events.js ops/` then commit with the message `News sweep YYYY-MM-DD: N events` and push to `main`. If nothing new was found, still commit the log entry (`News sweep YYYY-MM-DD: no new events`).

## Never

- Never invent or extrapolate a figure, place, date, name or quote.
- Never edit `data/haiti-before.js` (the pre-intervention record), `js/`, `css/` or `index.html`.
- Never delete an existing event. Correct it with `updates` and explain in `notes`.
- Never push if `scripts/validate.js` fails.
