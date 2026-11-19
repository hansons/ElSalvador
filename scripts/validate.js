#!/usr/bin/env node
/* Checks the map's data files before they are committed or published.
   Usage: node scripts/validate.js        exit 0 = fine, 1 = errors (listed). Warnings never fail the run.
   The daily news sweep (ops/daily-news-sweep.md) must pass this before it commits. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(where + ': ' + msg);
const warn = (where, msg) => warnings.push(where + ': ' + msg);

function load(file) {
  const ctx = { window: {} };
  try {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  } catch (e) {
    err(file, 'does not parse: ' + e.message);
  }
  return ctx.window;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
function validDate(s) { return ISO.test(s || '') && !isNaN(Date.parse(s + 'T00:00:00Z')); }
const LOC = ['landmark', 'neighbourhood', 'commune', 'city', 'unknown', 'offmap'];
const CONF = ['high', 'medium', 'low'];
const SRC_TYPES = ['article', 'x', 'video', 'report'];
const TERR = ['gang-held', 'contested', 'retaken'];
const CTRL = ['gang-controlled', 'no-go', 'liberated', 'ended'];
// Generous box: Hispaniola plus the Dominican side of the border and nearby sea.
const HISPANIOLA = { lat: [17.5, 20.2], lon: [-74.6, -68.2] };

function checkDataset(file, key, cats, opts) {
  const w = load(file);
  const d = w[key];
  if (!d) { err(file, 'window.' + key + ' is missing'); return; }
  const meta = d.meta || {};
  if (!validDate(meta.end)) err(file, 'meta.end is not a valid date');
  const ids = new Set();
  (d.events || []).forEach((e, i) => {
    const at = file + ' event ' + (e && e.id ? e.id : '#' + i);
    if (!e || typeof e !== 'object') return err(at, 'not an object');
    ['id', 'date', 'category', 'title', 'summary', 'sources', 'confidence'].forEach(k => { if (e[k] === undefined || e[k] === '') err(at, 'missing ' + k); });
    if (ids.has(e.id)) err(at, 'duplicate id'); ids.add(e.id);
    if (!validDate(e.date)) err(at, 'bad date ' + e.date);
    else if (meta.end && e.date > meta.end) err(at, 'dated after meta.end (' + meta.end + '): raise meta.end or fix the date');
    if (cats.indexOf(e.category) < 0) err(at, 'unknown category ' + e.category + ' (use ' + cats.join(', ') + ')');
    if (CONF.indexOf(e.confidence) < 0) err(at, 'confidence must be high, medium or low');
    if (e.location_precision && LOC.indexOf(e.location_precision) < 0) err(at, 'unknown location_precision ' + e.location_precision);
    const hasLat = typeof e.lat === 'number', hasLon = typeof e.lon === 'number';
    if (hasLat !== hasLon) err(at, 'lat and lon must both be numbers or both be absent');
    if (hasLat && opts.box && e.location_precision !== 'offmap' &&
        (e.lat < opts.box.lat[0] || e.lat > opts.box.lat[1] || e.lon < opts.box.lon[0] || e.lon > opts.box.lon[1])) {
      warn(at, 'coordinates ' + e.lat + ', ' + e.lon + ' are outside Hispaniola: check, or set location_precision "offmap"');
    }
    if (hasLat && e.lon > 0) err(at, 'longitude is positive: Haiti is west (negative)');
    if (!Array.isArray(e.sources) || !e.sources.length) err(at, 'needs at least one source');
    else e.sources.forEach((s, j) => {
      if (!/^https?:\/\//.test(s.url || '')) err(at, 'source ' + j + ' has no http(s) url');
      if (!s.publisher) err(at, 'source ' + j + ' has no publisher');
      if (s.type && SRC_TYPES.indexOf(s.type) < 0) err(at, 'source ' + j + ' type must be ' + SRC_TYPES.join(', '));
      if (s.date && !validDate(s.date)) err(at, 'source ' + j + ' bad date');
    });
    if (e.title && e.title.length > 90) warn(at, 'title is long (' + e.title.length + ' chars)');
    if (e.casualties && typeof e.casualties !== 'object') err(at, 'casualties must be an object or null');
    if (e.movement) {
      const m = e.movement;
      if (!Array.isArray(m.from) || !Array.isArray(m.to)) err(at, 'movement needs from and to as [lat, lon]');
    }
  });
  (d.territory || []).forEach((z, i) => {
    const at = file + ' territory ' + (z.name || '#' + i) + ' ' + (z.as_of || '');
    if (!z.name) err(at, 'missing name');
    if (TERR.indexOf(z.status) < 0) err(at, 'status must be ' + TERR.join(', '));
    if (z.as_of && !validDate(z.as_of)) err(at, 'bad as_of');
    if (typeof z.lat !== 'number' || typeof z.lon !== 'number') err(at, 'needs lat and lon');
    if (typeof z.radius_km !== 'number' || z.radius_km <= 0 || z.radius_km > 30) err(at, 'radius_km must be a number between 0 and 30');
  });
  const SIDES = ['el-salvador', 'security-forces', 'haiti-government', 'gang', 'international', 'civil-society'];
  const PLATFORMS = ['x', 'tiktok', 'youtube', 'video', 'speech', 'press-conference', 'statement', 'interview', 'letter'];
  const mids = new Set();
  (d.messages || []).forEach((m, i) => {
    const at = file + ' message ' + (m && m.id ? m.id : '#' + i);
    if (!m || typeof m !== 'object') return err(at, 'not an object');
    ['id', 'date', 'speaker', 'side', 'platform', 'url', 'confidence'].forEach(k => { if (!m[k]) err(at, 'missing ' + k); });
    if (mids.has(m.id)) err(at, 'duplicate id'); mids.add(m.id);
    if (!validDate(m.date)) err(at, 'bad date ' + m.date);
    else if (meta.end && m.date > meta.end) err(at, 'dated after meta.end (' + meta.end + ')');
    if (!m.text && !m.translation) err(at, 'needs text (verbatim) or, failing that, a reported translation');
    else if (!m.text) warn(at, 'only a reported translation: shown with a note that the original was not published');
    if (m.side && SIDES.indexOf(m.side) < 0) err(at, 'side must be ' + SIDES.join(', '));
    if (m.platform && PLATFORMS.indexOf(m.platform) < 0) err(at, 'platform must be ' + PLATFORMS.join(', '));
    if (m.url && !/^https?:\/\//.test(m.url)) err(at, 'url must be http(s)');
    if (m.confidence && CONF.indexOf(m.confidence) < 0) err(at, 'confidence must be high, medium or low');
    if (m.event_id && !ids.has(m.event_id)) err(at, 'event_id ' + m.event_id + ' is not an event in this file');
    if (m.lang && m.lang !== 'en' && m.text && !m.translation) warn(at, 'not in English and has no translation');
  });
  (d.control_areas || []).forEach((a, i) => {
    const at = file + ' control_area ' + (a.name || '#' + i) + ' ' + (a.as_of || '');
    if (!a.name) err(at, 'missing name');
    if (!validDate(a.as_of)) err(at, 'bad as_of');
    if (CTRL.indexOf(a.status) < 0) err(at, 'status must be ' + CTRL.join(', '));
    if (a.status === 'ended') return;
    if (!Array.isArray(a.polygon) || !a.polygon.length) return err(at, 'needs polygon: a list of rings of [lat, lon]');
    a.polygon.forEach((ring, r) => {
      if (!Array.isArray(ring) || ring.length < 3) return err(at, 'ring ' + r + ' needs at least 3 points');
      ring.forEach(p => {
        if (!Array.isArray(p) || typeof p[0] !== 'number' || typeof p[1] !== 'number') err(at, 'ring ' + r + ' has a bad point');
        else if (opts.box && (p[0] < opts.box.lat[0] || p[0] > opts.box.lat[1] || p[1] < opts.box.lon[0] || p[1] > opts.box.lon[1])) err(at, 'point ' + p + ' is outside Hispaniola (lat first, then lon)');
      });
    });
    if (!Array.isArray(a.sources) || !a.sources.length) err(at, 'needs at least one source');
    if (a.status === 'liberated' && (a.sources || []).length < 2) warn(at, 'liberated on a single source: corroborate when possible');
  });
  return d;
}

checkDataset('data/events.js', 'HAITI_TRACKER', ['gang', 'military', 'people', 'politics', 'humanitarian'], { box: HISPANIOLA });
checkDataset('data/haiti-before.js', 'HAITI_BEFORE', ['gang', 'traffick', 'state', 'intl', 'money', 'people'], { box: HISPANIOLA });

try { new vm.Script(fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8'), { filename: 'js/app.js' }); }
catch (e) { err('js/app.js', 'syntax error: ' + e.message); }

warnings.forEach(w => console.log('warning  ' + w));
errors.forEach(e => console.log('ERROR    ' + e));
console.log(errors.length ? '\n' + errors.length + ' error(s): fix before committing.' : '\nData OK (' + warnings.length + ' warning(s)).');
process.exit(errors.length ? 1 : 0);
