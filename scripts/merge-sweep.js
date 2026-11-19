#!/usr/bin/env node
/* Merges a news-sweep file into data/events.js.
   Usage: node scripts/merge-sweep.js ops/sweeps/2026-11-20.json [--date 2026-11-20]

   The sweep file is JSON:
   {
     "events":        [ ...new events in the events.js format... ],
     "updates":       [ { "id": "existing-event-id", "set": { "casualties": {...}, "notes": "..." },
                          "add_sources": [ {...} ] } ],
     "territory":     [ ...new dated territory entries (circles)... ],
     "control_areas": [ ...new dated outlines, e.g. status "liberated"... ]
   }
   Events whose id already exists are skipped (use "updates" to change them). meta.end and meta.compiled move to
   --date (default: today, UTC). Run scripts/validate.js afterwards. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'data/events.js');
const args = process.argv.slice(2);
const sweepPath = args.find(a => !a.startsWith('--'));
const di = args.indexOf('--date');
const today = di >= 0 ? args[di + 1] : new Date().toISOString().slice(0, 10);
if (!sweepPath) { console.error('usage: node scripts/merge-sweep.js <sweep.json> [--date YYYY-MM-DD]'); process.exit(2); }

const sweep = JSON.parse(fs.readFileSync(path.resolve(sweepPath), 'utf8'));
const src = fs.readFileSync(FILE, 'utf8');

// Split the file into: header comment, the data object, and anything after it.
const startMarker = 'window.HAITI_TRACKER = ';
const start = src.indexOf(startMarker);
if (start < 0) throw new Error('window.HAITI_TRACKER not found');
const header = src.slice(0, start);
const ctx = { window: {} };
vm.runInNewContext(src, ctx);
const data = ctx.window.HAITI_TRACKER;

const have = new Set(data.events.map(e => e.id));
let added = 0, skipped = 0, updated = 0;
(sweep.events || []).forEach(e => {
  if (have.has(e.id)) { skipped++; return; }
  data.events.push(e); have.add(e.id); added++;
});
(sweep.updates || []).forEach(u => {
  const e = data.events.find(x => x.id === u.id);
  if (!e) { console.warn('update skipped, no event with id ' + u.id); return; }
  Object.assign(e, u.set || {});
  if (u.add_sources) {
    const urls = new Set((e.sources || []).map(s => s.url));
    e.sources = (e.sources || []).concat(u.add_sources.filter(s => !urls.has(s.url)));
  }
  updated++;
});
const key = z => z.name + '|' + z.as_of + '|' + z.status;
const tHave = new Set((data.territory || []).map(key));
const tNew = (sweep.territory || []).filter(z => !tHave.has(key(z)));
data.territory = (data.territory || []).concat(tNew);
const cHave = new Set((data.control_areas || []).map(key));
const cNew = (sweep.control_areas || []).filter(a => !cHave.has(key(a)));
data.control_areas = (data.control_areas || []).concat(cNew);

data.events.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
const latest = data.events.reduce((m, e) => (e.date > m ? e.date : m), data.meta.end || today);
data.meta.end = latest > today ? latest : today;
data.meta.compiled = today;

// Keep the key order: meta, events, control_areas, territory, then anything else.
const ordered = { meta: data.meta, events: data.events };
if (data.control_areas.length) ordered.control_areas = data.control_areas;
ordered.territory = data.territory;
Object.keys(data).forEach(k => { if (!(k in ordered)) ordered[k] = data[k]; });
fs.writeFileSync(FILE, header + startMarker + JSON.stringify(ordered, null, 2) + ';\n');
console.log('events added ' + added + ', already present ' + skipped + ', updated ' + updated +
  '; territory added ' + tNew.length + '; control areas added ' + cNew.length + '; meta.end ' + data.meta.end);
