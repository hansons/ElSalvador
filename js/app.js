/* Haiti campaign tracker — one clock (state.t, in days) drives the map, feed, legend counts and timeline. */
(function () {
  'use strict';

  // Two maps share this code: ?map=haiti (default) and ?map=sv. Each has its own data file, categories and views.
  // Colour + shape per category. Shape repeats the colour so it never carries meaning alone.
  var THEATRES = {
    before: {
      label: 'Haiti before',
      data: window.HAITI_BEFORE,
      mapLabel: 'Map of gang violence in Haiti before the Salvadoran intervention',
      offmap: 'Decided outside Haiti; not pinned on the map',
      territoryTimed: true,   // zones appear on their as_of date, so the red spreads as the clock runs
      speed: 120,
      cats: {
        gang:   { label: 'Gang violence',            color: '#E5484D', shape: 'diamond'  },
        state:  { label: 'Haitian state',            color: '#A9B4C2', shape: 'triangle' },
        intl:   { label: 'UN & foreign missions',    color: '#4C8DF6', shape: 'square'   },
        money:  { label: 'UN & aid money',           color: '#3CC4B0', shape: 'cross'    },
        people: { label: 'People: flight & revolt',  color: '#F5B83D', shape: 'circle'   },
        traffick: { label: 'Trafficking & exploitation', color: '#B78CF2', shape: 'hex'  }
      },
      order: ['gang', 'traffick', 'state', 'intl', 'money', 'people'],
      views: [
        { label: 'Port-au-Prince', bounds: [[18.47, -72.44], [18.68, -72.17]] },
        { label: 'West & Artibonite', bounds: [[18.3, -72.95], [19.3, -71.9]] },
        { label: 'All Haiti', bounds: [[18.0, -74.5], [20.1, -71.6]] }
      ]
    },
    haiti: {
      label: 'Haiti: intervention',
      data: window.HAITI_TRACKER,
      mapLabel: 'Map of events in Haiti',
      offmap: 'Took place outside Haiti; not pinned on the map',
      cats: {
        gang:         { label: 'Gangs',                 color: '#E5484D', shape: 'diamond'  },
        military:     { label: 'Military & police',     color: '#4C8DF6', shape: 'square'   },
        people:       { label: "People's response",     color: '#F5B83D', shape: 'circle'   },
        politics:     { label: 'Politics',              color: '#A9B4C2', shape: 'triangle' },
        humanitarian: { label: 'Humanitarian & rights', color: '#3CC4B0', shape: 'cross'    }
      },
      order: ['gang', 'military', 'people', 'politics', 'humanitarian'],
      views: [
        { label: 'Port-au-Prince', bounds: [[18.47, -72.44], [18.68, -72.17]] },
        { label: 'All Haiti', bounds: [[18.0, -74.5], [20.1, -71.6]] }
      ]
    },
    sv: {
      label: 'El Salvador',
      data: window.SV_TRACKER,
      mapLabel: 'Map of events in El Salvador',
      offmap: 'Took place outside El Salvador; not pinned on the map',
      cats: {
        speech:   { label: 'Bukele speeches',  color: '#F5B83D', shape: 'triangle' },
        surf:     { label: 'Surf City 1 & 2',  color: '#3CC4B0', shape: 'circle'   },
        infra:    { label: 'Roads & fiber',    color: '#4C8DF6', shape: 'square'   },
        school:   { label: 'Schools',          color: '#B78CF2', shape: 'cross'    },
        security: { label: 'Gang clearance',   color: '#E5484D', shape: 'diamond'  }
      },
      order: ['speech', 'surf', 'infra', 'school', 'security'],
      views: [
        { label: 'All El Salvador', bounds: [[13.1, -90.15], [14.46, -87.68]] },
        { label: 'San Salvador', bounds: [[13.655, -89.27], [13.745, -89.15]] },
        { label: 'Surf City', bounds: [[13.44, -89.52], [13.56, -89.27]] },
        { label: 'Surf City 2', bounds: [[13.12, -88.5], [13.36, -87.85]] }
      ]
    }
  };
  var Q0 = new URLSearchParams(location.search);
  var THEATRE_ID = THEATRES[Q0.get('map')] ? Q0.get('map') : 'haiti';
  var TH = THEATRES[THEATRE_ID];
  var DATA = TH.data || { meta: {}, events: [], territory: [] };
  var META = DATA.meta || {};
  var CATS = TH.cats;
  var CAT_ORDER = TH.order;
  var TERRITORY_STYLE = {
    'gang-held': { color: '#E5484D', fillOpacity: 0.09, dashArray: null },
    'contested': { color: '#F5B83D', fillOpacity: 0.035, dashArray: '4 7' },
    'retaken':   { color: '#4C8DF6', fillOpacity: 0.12, dashArray: '2 6' }
  };
  var PRECISION_NOTE = {
    landmark: null,
    neighbourhood: 'Placed at neighbourhood level',
    commune: 'Placed at commune level; exact site not reported',
    city: 'Placed at city level; exact site not reported',
    unknown: 'Location not reported; marker is a placeholder',
    offmap: TH.offmap
  };
  var DAY_MS = 86400000;
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- helpers ----------
  function dayNum(iso) {
    var p = String(iso).split('-');
    return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / DAY_MS);
  }
  function isoOf(day) { return new Date(day * DAY_MS).toISOString().slice(0, 10); }
  var fmtLong = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  var fmtShort = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  var fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' });
  function longDate(day) { return fmtLong.format(new Date(day * DAY_MS)); }
  function shortDate(day) { return fmtShort.format(new Date(day * DAY_MS)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function $(id) { return document.getElementById(id); }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    if (props) Object.keys(props).forEach(function (k) {
      if (k === 'class') n.className = props[k];
      else if (k === 'text') n.textContent = props[k];
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), props[k]);
      else if (props[k] !== null && props[k] !== undefined) n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : null; }

  var SHAPES = {
    circle: '<circle cx="11" cy="11" r="7.5"/>',
    diamond: '<polygon points="11,1.5 20.5,11 11,20.5 1.5,11"/>',
    square: '<rect x="3.5" y="3.5" width="15" height="15" rx="2"/>',
    triangle: '<polygon points="11,2.5 20.5,19 1.5,19"/>',
    cross: '<path d="M8 2.5h6v5.5h5.5v6H14v5.5H8V14H2.5V8H8z"/>',
    hex: '<polygon points="6,2.5 16,2.5 21,11 16,19.5 6,19.5 1,11"/>'
  };
  function glyph(cat, size, fuzzy) {
    var c = CATS[cat] || CATS[CAT_ORDER[0]];
    var style = fuzzy
      ? 'fill:' + c.color + ';fill-opacity:.6;stroke:#fff;stroke-width:1.4;stroke-dasharray:2.5 2'
      : 'fill:' + c.color + ';stroke:#0e1621;stroke-width:1.6';
    return '<svg viewBox="0 0 22 22" width="' + size + '" height="' + size + '" aria-hidden="true"><g style="' + style + '">' + SHAPES[c.shape] + '</g></svg>';
  }
  function glyphEl(cat, size) { var s = el('span'); s.innerHTML = glyph(cat, size, false); return s.firstChild; }

  // ---------- data prep ----------
  // The intervention map also shows the gang violence of the months before it (from the "Haiti before" file,
  // the single source for that period), so a rewound map shows what the intervention walked into.
  var priorViolence = [];
  if (THEATRE_ID === 'haiti' && window.HAITI_BEFORE && window.HAITI_BEFORE.events) {
    var yearStart = (META.ranges || []).reduce(function (m, r) { return r.start < m ? r.start : m; }, META.anchor_date || '9999');
    var own = {};
    (DATA.events || []).forEach(function (e) { own[e.id] = true; });
    priorViolence = window.HAITI_BEFORE.events.filter(function (e) {
      return (e.category === 'gang' || e.category === 'traffick') && !own[e.id] &&
        e.date >= yearStart && (!META.anchor_date || e.date < META.anchor_date);
    }).map(function (e) { return Object.assign({}, e, { category: 'gang' }); });
  }

  var events = (DATA.events || []).concat(priorViolence).filter(function (e) { return e && e.date && CATS[e.category]; }).map(function (e) {
    var o = Object.assign({}, e);
    o.day = dayNum(e.date);
    o.hasLoc = typeof e.lat === 'number' && typeof e.lon === 'number';
    return o;
  }).sort(function (a, b) { return a.day - b.day; });

  // Events that share a coordinate are fanned out on a small spiral so each stays clickable.
  (function spread() {
    var seen = {};
    events.forEach(function (e) {
      if (!e.hasLoc) return;
      var key = e.lat.toFixed(3) + ',' + e.lon.toFixed(3);
      var k = seen[key] = (seen[key] || 0) + 1;
      var i = k - 1, r = 0.007 * Math.sqrt(i), a = i * 2.39996;
      e.mlat = e.lat + r * Math.sin(a);
      e.mlon = e.lon + r * Math.cos(a) / Math.cos(e.lat * Math.PI / 180);
    });
  })();

  var firstDay = events.length ? events[0].day : dayNum('2026-10-18');
  var lastDay = META.end ? dayNum(META.end) : (events.length ? events[events.length - 1].day : firstDay);
  var anchorDay = META.anchor_date ? dayNum(META.anchor_date) : null;
  var RANGES = (META.ranges && META.ranges.length ? META.ranges : [{ id: 'all', label: 'All events', start: isoOf(firstDay) }])
    .map(function (r) { return { id: r.id, label: r.label, start: dayNum(r.start) }; });

  var state = {
    range: RANGES[0],
    t: RANGES[0].start,          // fractional day number
    playing: false,
    speed: 1,
    window: 'all',
    filters: {},
    territory: true,
    messages: true,
    selected: null
  };
  CAT_ORDER.forEach(function (c) { state.filters[c] = true; });

  // ---------- map ----------
  var map = L.map('map', { zoomControl: false, minZoom: 6, maxZoom: 17, worldCopyJump: false });
  L.control.zoom({ position: 'topright' }).addTo(map);
  var ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
  var darkBase = L.layerGroup([
    L.tileLayer(ESRI + 'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 16, maxZoom: 17, attribution: 'Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors' }),
    L.tileLayer(ESRI + 'Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 16, maxZoom: 17 })
  ]).addTo(map);
  var satBase = L.layerGroup([
    L.tileLayer(ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 18, maxZoom: 17, attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics' }),
    L.tileLayer(ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 18, maxZoom: 17 })
  ]);
  L.control.layers({ 'Map': darkBase, 'Satellite': satBase }, null, { position: 'topright', collapsed: false }).addTo(map);
  map.fitBounds(TH.views[0].bounds);

  // Control areas sit under the territory circles: the broad gang-controlled shading first, no-go zones above it.
  map.createPane('control').style.zIndex = 350;
  map.createPane('nogo').style.zIndex = 360;
  map.createPane('ops').style.zIndex = 365;
  map.createPane('liberated').style.zIndex = 370;
  var controlLayer = L.layerGroup().addTo(map);
  var territoryLayer = L.layerGroup().addTo(map);
  var pathLayer = L.layerGroup().addTo(map);
  var moveLayer = L.layerGroup().addTo(map);
  var markerLayer = L.layerGroup().addTo(map);

  events.forEach(function (e) {
    if (!e.hasLoc) return;
    var fuzzy = e.location_precision === 'city' || e.location_precision === 'unknown';
    var icon = L.divIcon({
      className: 'ev-icon',
      html: '<span class="pulse" style="--c:' + CATS[e.category].color + '"></span>' + glyph(e.category, 22, fuzzy),
      iconSize: [22, 22], iconAnchor: [11, 11]
    });
    e.marker = L.marker([e.mlat, e.mlon], { icon: icon, title: e.title, alt: e.title, keyboard: true, riseOnHover: true });
    e.marker.bindTooltip(shortDate(e.day) + ' · ' + e.title, { direction: 'top', offset: [0, -10] });
    e.marker.on('click', function () { select(e.id, false); });
    if (e.movement && e.movement.from && e.movement.to) {
      e.line = L.polyline([e.movement.from, e.movement.from], {
        color: CATS[e.category].color, weight: 2.5, opacity: 0.9, dashArray: '8 6', interactive: false
      });
    }
    // "path": [[lat, lon], ...] draws a route (a road, a fiber run) that appears on the event's day.
    if (Array.isArray(e.path) && e.path.length > 1) {
      e.pathLine = L.polyline(e.path, { color: CATS[e.category].color, weight: 4, opacity: 0.85, lineCap: 'round' });
      e.pathLine.bindTooltip(shortDate(e.day) + ' · ' + e.title, { sticky: true });
      e.pathLine.on('click', function () { select(e.id, false); });
    }
  });

  // The intervention map starts from the pre-intervention picture: for each zone in the "Haiti before" index,
  // its last reported status on the eve (meta.end). The map's own zones then appear on their as_of dates and,
  // where the name matches, replace the baseline zone (the renderer keeps the latest status per name).
  var baseline = [];
  if (THEATRE_ID === 'haiti' && window.HAITI_BEFORE && window.HAITI_BEFORE.territory) {
    var eve = window.HAITI_BEFORE.meta && window.HAITI_BEFORE.meta.end ? dayNum(window.HAITI_BEFORE.meta.end) : Infinity;
    var last = {};
    window.HAITI_BEFORE.territory.forEach(function (z) {
      if (!z.as_of || dayNum(z.as_of) > eve) return;
      if (!last[z.name] || dayNum(z.as_of) >= dayNum(last[z.name].as_of)) last[z.name] = z;
    });
    baseline = Object.keys(last).map(function (k) { return Object.assign({}, last[k], { baseline: true }); })
      .filter(function (z) { return z.status !== 'retaken'; });
  }

  var territory = baseline.concat(DATA.territory || []).filter(function (z) { return typeof z.lat === 'number' && typeof z.lon === 'number'; }).map(function (z) {
    var st = TERRITORY_STYLE[z.status] || TERRITORY_STYLE['contested'];
    var o = Object.assign({}, z);
    // Without a baseline, gang-held and contested zones are standing conditions shown from the start of the
    // timeline (the tooltip gives the report date) and only a recapture is tied to its date. With a baseline
    // (or territoryTimed), the map's own zones are dated so the pre-intervention picture shows when rewound.
    o.day = z.baseline ? -Infinity
      : z.as_of && (z.status === 'retaken' || TH.territoryTimed || baseline.length) ? dayNum(z.as_of) : -Infinity;
    o.asOf = z.as_of ? dayNum(z.as_of) : null;
    o.circle = L.circle([z.lat, z.lon], {
      radius: (z.radius_km || 1) * 1000, color: st.color, weight: 1, opacity: 0.5,
      fillColor: st.color, fillOpacity: st.fillOpacity, dashArray: st.dashArray
    });
    o.circle.bindTooltip(
      z.name + (z.gang ? ' · ' + z.gang : '') + ' · ' + z.status + (o.asOf !== null ? ' (reported ' + (z.baseline ? longDate(o.asOf) + ', pre-intervention index' : shortDate(o.asOf)) + ')' : ''),
      { sticky: true }
    );
    return o;
  });

  // Gang-control areas and no-go zones: dated outlines; for each name the latest one at or before the day shows.
  // On the intervention map they come from the "Haiti before" file, so the pre-intervention picture carries over.
  var CONTROL_STYLE = {
    'gang-controlled': { pane: 'control', color: '#E5484D', weight: 1.2, opacity: 0.7, fillColor: '#E5484D', fillOpacity: 0.2 },
    'no-go':           { pane: 'nogo', color: '#FF9A9D', weight: 2, opacity: 0.95, fillColor: '#C1272D', fillOpacity: 0.5 },
    'liberated':       { pane: 'liberated', color: '#8FB8FF', weight: 2, opacity: 0.95, fillColor: '#4C8DF6', fillOpacity: 0.45 }
  };
  var CONTROL_LABEL = { 'gang-controlled': 'Gang-controlled area', 'no-go': 'No-go zone', 'liberated': 'Liberated area' };
  var controlSrc = (DATA.control_areas || []).concat(
    THEATRE_ID === 'haiti' && window.HAITI_BEFORE ? (window.HAITI_BEFORE.control_areas || []) : []);
  var controlAreas = controlSrc.filter(function (a) { return a && a.name && a.as_of; }).map(function (a) {
    var o = Object.assign({}, a);
    o.day = dayNum(a.as_of);
    var st = CONTROL_STYLE[a.status];
    if (st && Array.isArray(a.polygon)) {
      o.shape = L.polygon(a.polygon, Object.assign({ interactive: true }, st));
      var label = CONTROL_LABEL[a.status];
      o.shape.bindTooltip(label + ': ' + a.name + (a.share ? ' · ' + a.share + ' of the capital (UN)' : '') +
        ' · outline as of ' + longDate(o.day) + ' (approximate)', { sticky: true });
      var box = el('div', { class: 'control-pop' }, [
        el('strong', { text: label + ': ' + a.name }),
        el('div', { text: 'Outline as of ' + longDate(o.day) + (a.share ? ' · ' + a.share + ' of the capital (UN estimate)' : '') }),
        a.notes ? el('p', { text: a.notes }) : null,
        el('div', null, (a.sources || []).map(function (s) {
          var u = safeUrl(s.url);
          return u ? el('div', null, [el('a', { href: u, target: '_blank', rel: 'noopener', text: s.publisher + ': ' + s.title })]) : null;
        }))
      ]);
      o.shape.bindPopup(box, { maxWidth: 340 });
    }
    return o;
  });

  // ---------- Salvadoran operations: the gang shading starts to give way where they have gone in ----------
  // Derived from events, not drawn by hand: a military event whose actor or title names El Salvador and whose place
  // is known to neighbourhood level or better. An event can opt in or out with "operation": { "radius_km": n } | false.
  // The zone shows from the first operation, and the red under it fades further with each operation recorded there.
  // It never means liberated: that stays a sourced control_areas outline.
  var OP_RADIUS = { landmark: 0.7, neighbourhood: 1.2, commune: 2 };
  function isSalvadoranOp(e) {
    if (e.operation === false || !e.hasLoc) return false;
    if (e.operation) return true;
    return e.category === 'military' && /salvador/i.test((e.actor || '') + ' ' + e.title) && OP_RADIUS[e.location_precision] !== undefined;
  }
  function kmBetween(a, b) {
    var dy = (a[0] - b[0]) * 111.2, dx = (a[1] - b[1]) * 111.2 * Math.cos(a[0] * Math.PI / 180);
    return Math.sqrt(dx * dx + dy * dy);
  }
  var opZones = [];
  if (THEATRE_ID === 'haiti') {
    events.filter(isSalvadoranOp).forEach(function (e) {
      var r = (e.operation && e.operation.radius_km) || OP_RADIUS[e.location_precision] || 1;
      var c = [e.lat, e.lon];
      var z = opZones.filter(function (z) { return kmBetween(z.center, c) < Math.max(z.radius, r) * 0.8; })[0];
      if (z) { z.ops.push(e); z.radius = Math.max(z.radius, r); }
      else opZones.push({ center: c, radius: r, ops: [e] });
    });
    opZones.forEach(function (z) {
      z.day = z.ops[0].day;
      z.knock = L.circle(z.center, { pane: 'ops', radius: z.radius * 1000, stroke: false, fillColor: '#0b121b', fillOpacity: 0.4, interactive: false });
      z.hatch = L.circle(z.center, { pane: 'ops', radius: z.radius * 1000, color: '#8FB8FF', weight: 1.5, opacity: 0.9, dashArray: '5 4', fillOpacity: 1, className: 'op-zone' });
      z.hatch.on('click', function () { select(z.lastShown ? z.lastShown.id : z.ops[0].id, false); });
      z.layer = L.layerGroup([z.knock, z.hatch]);
    });
  }
  function pointInRing(p, ring) {
    var inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var yi = ring[i][0], xi = ring[i][1], yj = ring[j][0], xj = ring[j][1];
      if (((yi > p[0]) !== (yj > p[0])) && (p[1] < (xj - xi) * (p[0] - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  function areaHasOpBy(a, day) {
    return opZones.some(function (z) {
      return z.day <= day && a.polygon && a.polygon.some(function (ring) { return pointInRing(z.center, ring); });
    });
  }
  function renderOps(day) {
    opZones.forEach(function (z) {
      var done = z.ops.filter(function (e) { return e.day <= day; });
      var show = state.territory && done.length > 0;
      var on = controlLayer.hasLayer(z.layer);
      if (show && !on) controlLayer.addLayer(z.layer);
      if (!show && on) controlLayer.removeLayer(z.layer);
      if (!show) return;
      if (z.lastShown === done[done.length - 1]) return;
      z.lastShown = done[done.length - 1];
      z.knock.setStyle({ fillOpacity: Math.min(0.7, 0.35 + 0.1 * (done.length - 1)) });
      z.hatch.unbindTooltip().bindTooltip(
        'Salvadoran operations under way since ' + longDate(z.day) + ' · ' + done.length + ' recorded' +
        ' (latest: ' + z.lastShown.title + '). Not yet liberated: no source says the area is held.', { sticky: true });
    });
    // A no-go zone that Salvadoran forces have gone into is drawn as breaking: lighter fill, dashed edge.
    controlAreas.forEach(function (a) {
      if (!a.shape || a.status !== 'no-go') return;
      var hit = areaHasOpBy(a, day);
      if (a._breaking === hit) return;
      a._breaking = hit;
      a.shape.setStyle(hit ? { fillOpacity: 0.25, dashArray: '6 5' } : { fillOpacity: CONTROL_STYLE['no-go'].fillOpacity, dashArray: null });
    });
  }

  // ---------- messages: what the key voices said, as cards that slide in when the clock reaches them ----------
  // DATA.messages: [{ id, date, speaker, role, side, platform, media, lang, text (verbatim), translation,
  //   translation_by, url, event_id, sources, confidence, notes }]. Only entries with verbatim text are shown.
  var SIDE = {
    'el-salvador':      { label: 'El Salvador',          color: '#4C8DF6' },
    'security-forces':  { label: 'Security forces',      color: '#7FA7E8' },
    'haiti-government': { label: 'Haitian government',   color: '#A9B4C2' },
    'gang':             { label: 'Gang',                 color: '#E5484D' },
    'international':    { label: 'International',        color: '#3CC4B0' },
    'civil-society':    { label: 'Civil society',        color: '#F5B83D' }
  };
  var PLATFORM = { x: 'X post', tiktok: 'TikTok', youtube: 'YouTube', video: 'Video', speech: 'Speech', 'press-conference': 'Press conference', statement: 'Statement', interview: 'Interview', letter: 'Letter' };
  var messages = (DATA.messages || []).filter(function (m) { return m && m.date && (m.text || m.translation) && m.speaker; }).map(function (m) {
    var o = Object.assign({}, m);
    o.day = dayNum(m.date);
    return o;
  }).sort(function (a, b) { return a.day - b.day; });
  var msgDismissed = {};
  var msgShown = '';

  function initials(name) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function messageCard(m, compact) {
    var side = SIDE[m.side] || { label: '', color: '#8fa0b5' };
    var url = safeUrl(m.url);
    var meta = [PLATFORM[m.platform] || m.platform, longDate(m.day)].filter(Boolean).join(' · ');
    var card = el('article', { class: 'msg' + (compact ? ' msg-compact' : ''), style: '--side:' + side.color }, [
      el('header', null, [
        el('span', { class: 'msg-av', 'aria-hidden': 'true', text: initials(m.speaker) }),
        el('div', { class: 'msg-who' }, [
          el('strong', { text: m.speaker }),
          el('span', { text: m.role || side.label })
        ]),
        m.media === 'video' ? el('span', { class: 'msg-badge', text: '▶ Video' }) : null
      ]),
      m.text ? el('blockquote', { lang: m.lang || null, text: m.text }) : el('blockquote', { lang: 'en', text: m.translation }),
      m.text && m.translation ? el('p', { class: 'msg-tr', text: m.translation }) : null,
      m.text ? null : el('p', { class: 'msg-tr', text: 'Original wording not published; English as reported by ' + (m.translation_by || 'the press') + '.' }),
      el('footer', null, [
        el('span', { text: meta + (m.text && m.translation && m.translation_by ? ' · translation: ' + m.translation_by : '') + (m.confidence === 'low' ? ' · wording not confirmed' : '') }),
        url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: 'Open ↗' }) : null
      ])
    ]);
    return card;
  }

  // While playing, a card stays up for about six seconds of real time; paused, the last three days' messages show.
  function renderMessages(day) {
    var box = $('messages');
    if (!box) return;
    var hold = state.playing ? Math.max(1, Math.round(6 * state.speed)) : 3;
    var live = state.messages ? messages.filter(function (m) {
      return m.day <= day && day - m.day < hold && !msgDismissed[m.id];
    }).slice(-2).reverse() : [];
    var key = live.map(function (m) { return m.id; }).join('|');
    if (key === msgShown) return;
    msgShown = key;
    box.textContent = '';
    live.forEach(function (m) {
      var card = messageCard(m, false);
      var close = el('button', { type: 'button', class: 'msg-x', 'aria-label': 'Dismiss', text: '×' });
      close.addEventListener('click', function (ev) { ev.stopPropagation(); msgDismissed[m.id] = true; msgShown = ''; renderMessages(Math.floor(state.t)); });
      card.insertBefore(close, card.firstChild);
      if (m.event_id && events.some(function (e) { return e.id === m.event_id; })) {
        var go = el('button', { type: 'button', class: 'msg-go', text: 'See the event' });
        go.addEventListener('click', function () { select(m.event_id, true); });
        card.querySelector('footer').appendChild(go);
      }
      box.appendChild(card);
    });
  }

  // ---------- visibility ----------
  function rangeEnd() { return lastDay + 0.999; }
  function isVisible(e, day) {
    if (!state.filters[e.category] || e.day > day) return false;
    if (state.window !== 'all' && day - e.day >= +state.window) return false;
    return true;
  }
  function opacityFor(age) { return age < 1 ? 1 : clamp(1 - (age - 1) * 0.04, 0.6, 1); }

  var lastRenderedDay = null;

  function renderDay(force) {
    var day = Math.floor(state.t);
    if (!force && day === lastRenderedDay) return;
    lastRenderedDay = day;

    $('clock-date').textContent = longDate(day);
    var dayLabel = '';
    if (anchorDay !== null && day >= anchorDay) dayLabel = 'Day ' + (day - anchorDay + 1) + (META.anchor_label ? ' ' + META.anchor_label : '');
    $('clock-day').textContent = dayLabel;

    var counts = {};
    CAT_ORDER.forEach(function (c) { counts[c] = 0; });

    events.forEach(function (e) {
      if (e.day <= day) counts[e.category]++;
      if (!e.marker) return;
      var show = isVisible(e, day);
      var on = markerLayer.hasLayer(e.marker);
      if (show && !on) markerLayer.addLayer(e.marker);
      if (!show && on) markerLayer.removeLayer(e.marker);
      if (e.line) {
        var lon = moveLayer.hasLayer(e.line);
        if (show && !lon) moveLayer.addLayer(e.line);
        if (!show && lon) moveLayer.removeLayer(e.line);
      }
      if (e.pathLine) {
        var pon = pathLayer.hasLayer(e.pathLine);
        if (show && !pon) pathLayer.addLayer(e.pathLine);
        if (!show && pon) pathLayer.removeLayer(e.pathLine);
        if (show) e.pathLine.setStyle({ weight: state.selected === e.id ? 7 : 4, opacity: state.selected === e.id ? 1 : 0.85 });
      }
      if (show) {
        // At high playback speeds a single day flashes by, so "live" stretches to about 1.5 s of screen time.
        var live = day - e.day < (state.playing ? Math.max(1, state.speed * 1.5) : 1);
        e.marker.setOpacity(opacityFor(day - e.day));
        e.marker.setZIndexOffset(live ? 1000 : (state.selected === e.id ? 2000 : 0));
        var node = e.marker.getElement();
        if (node) {
          node.classList.toggle('is-live', live);
          node.classList.toggle('is-selected', state.selected === e.id);
        }
      }
    });

    CAT_ORDER.forEach(function (c) {
      var n = document.querySelector('.chip[data-cat="' + c + '"] .n');
      if (n) n.textContent = counts[c];
    });

    // Territory: for each named zone show the most recent status at or before this day.
    var latest = {};
    territory.forEach(function (z) { if (z.day <= day && (!latest[z.name] || z.day >= latest[z.name].day)) latest[z.name] = z; });
    territory.forEach(function (z) {
      var show = state.territory && latest[z.name] === z;
      var on = territoryLayer.hasLayer(z.circle);
      if (show && !on) territoryLayer.addLayer(z.circle);
      if (!show && on) territoryLayer.removeLayer(z.circle);
    });

    var latestArea = {};
    controlAreas.forEach(function (a) { if (a.day <= day && (!latestArea[a.name] || a.day >= latestArea[a.name].day)) latestArea[a.name] = a; });
    controlAreas.forEach(function (a) {
      if (!a.shape) return;
      var show = state.territory && latestArea[a.name] === a;
      var on = controlLayer.hasLayer(a.shape);
      if (show && !on) controlLayer.addLayer(a.shape);
      if (!show && on) controlLayer.removeLayer(a.shape);
    });

    renderOps(day);
    renderMessages(day);
    renderFactsCount(day);
    if (!state.selected) renderFeed(day);
  }

  // Runs every frame: playhead position and the growing movement lines.
  function renderFrame() {
    var rel = state.t - state.range.start;
    var n = lastDay - state.range.start + 1;
    $('scrub').value = rel;
    $('future').style.width = clamp(100 - ((Math.floor(rel) + 1) / n) * 100, 0, 100) + '%';
    events.forEach(function (e) {
      if (!e.line || !moveLayer.hasLayer(e.line)) return;
      var p = REDUCED ? 1 : clamp((state.t - e.day) / 0.85, 0, 1);
      if (e._p === p) return;
      e._p = p;
      var f = e.movement.from, to = e.movement.to;
      e.line.setLatLngs([f, [f[0] + (to[0] - f[0]) * p, f[1] + (to[1] - f[1]) * p]]);
      e.line.setStyle({ opacity: 0.9 * opacityFor(state.t - e.day) });
    });
    renderCounters();
    renderDay(false);
  }

  // ---------- counters (running totals driven by the same clock) ----------
  // meta.counters: [{ id, label, kind: 'sum' | 'level', unit: 'usd' | 'people', note, rows: [...] }]
  //   sum   rows: { label, start, end, amount, count (false = listed but not added), basis, source: {title, url}, notes }
  //         each amount accrues evenly between its start and end dates.
  //   level rows: { date, value, source } — a stock (e.g. people displaced), interpolated between reports.
  function prepCounter(c) {
    var o = Object.assign({}, c);
    o.rows = (c.rows || []).map(function (r) {
      var x = Object.assign({}, r);
      if (c.kind === 'level') x.d = dayNum(r.date);
      else { x.s = dayNum(r.start); x.e = dayNum(r.end) + 1; }
      return x;
    });
    if (c.kind === 'level') o.rows.sort(function (a, b) { return a.d - b.d; });
    return o;
  }
  var counters = (META.counters || []).map(prepCounter);
  // meta.counters_extra: further series, listed under "Key figures" instead of on the masthead.
  var extraCounters = (META.counters_extra || []).map(prepCounter);
  function counterValue(c, t) {
    if (c.kind === 'level') {
      var r = c.rows;
      if (!r.length || t < r[0].d) return null;
      for (var i = r.length - 1; i >= 0; i--) {
        if (t >= r[i].d) {
          if (i === r.length - 1) return r[i].value;
          return r[i].value + (r[i + 1].value - r[i].value) * (t - r[i].d) / (r[i + 1].d - r[i].d);
        }
      }
      return null;
    }
    // Before the first counted period there is no figure at all, which is not the same as zero.
    var sum = 0, first = Infinity;
    c.rows.forEach(function (x) { if (x.count !== false) { first = Math.min(first, x.s); sum += x.amount * clamp((t - x.s) / (x.e - x.s), 0, 1); } });
    return t < first ? null : sum;
  }
  function fmtValue(unit, v) {
    if (v === null) return '—';
    if (unit === 'usd') {
      if (v >= 1e9) return '$' + (v / 1e9).toFixed(2) + ' bn';
      if (v >= 1e6) return '$' + (v / 1e6).toFixed(0) + ' m';
      return '$' + Math.round(v).toLocaleString('en-GB');
    }
    return Math.round(v).toLocaleString('en-GB');
  }
  function fmtAmount(unit, v) { return unit === 'usd' ? fmtValue('usd', v) : Math.round(v).toLocaleString('en-GB'); }
  function renderCounters() {
    counters.forEach(function (c) {
      var v = counterValue(c, state.t);
      // A level between two reports is an interpolation, so it is shown rounded rather than to the last person.
      if (c.kind === 'level' && v !== null) v = Math.round(v / 1000) * 1000;
      if (c.node) c.node.textContent = fmtValue(c.unit, v);
    });
  }
  function buildCounters() {
    if (!counters.length) return;
    var box = el('div', { class: 'counters', role: 'group', 'aria-label': 'Running totals' });
    counters.forEach(function (c) {
      c.node = el('span', { class: 'v' });
      box.appendChild(el('button', { type: 'button', class: 'counter', title: 'Show what is counted', onclick: function () { openLedger(c); } }, [
        c.node, el('span', { class: 'k', text: c.label })
      ]));
    });
    $('legend').parentNode.insertBefore(box, $('legend'));
  }
  // A small chart of the counter's own rows: bars for yearly flows (part-year rows are scaled to a
  // yearly rate, and drawn hatched so they are not mistaken for a full year), a line for stocks.
  function ledgerChart(c) {
    var rows = c.rows.filter(function (x) { return x.count !== false; });
    if (rows.length < 3) return null;
    var W = 320, H = 120, PAD = 2, isLevel = c.kind === 'level';
    var x0 = Infinity, x1 = -Infinity, max = 0;
    rows.forEach(function (x) {
      x.rate = isLevel ? x.value : x.amount / ((x.e - x.s) / 365.25);
      x0 = Math.min(x0, isLevel ? x.d : x.s); x1 = Math.max(x1, isLevel ? x.d : x.e);
      if (x.rate > max) max = x.rate;
    });
    if (!(max > 0) || x1 <= x0) return null;
    function px(day) { return PAD + (day - x0) / (x1 - x0) * (W - PAD * 2); }
    function py(v) { return H - v / max * (H - 8); }
    var color = c.unit === 'usd' ? '#3CC4B0' : '#E5484D', out = '', partial = false;
    if (isLevel) {
      var pts = rows.map(function (x) { return px(x.d).toFixed(1) + ',' + py(x.value).toFixed(1); });
      out += '<polygon points="' + px(rows[0].d).toFixed(1) + ',' + H + ' ' + pts.join(' ') + ' ' + px(rows[rows.length - 1].d).toFixed(1) + ',' + H + '" fill="' + color + '" fill-opacity=".18"/>';
      out += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + color + '" stroke-width="1.6"/>';
      rows.forEach(function (x) { out += '<circle cx="' + px(x.d).toFixed(1) + '" cy="' + py(x.value).toFixed(1) + '" r="2" fill="' + color + '"><title>' + isoOf(x.d) + ': ' + fmtAmount(c.unit, x.value) + '</title></circle>'; });
    } else {
      rows.forEach(function (x) {
        var part = x.e - x.s < 360; if (part) partial = true;
        var a = px(x.s), w = Math.max(1.5, px(x.e) - a - 0.8);
        out += '<rect x="' + a.toFixed(1) + '" y="' + py(x.rate).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (H - py(x.rate)).toFixed(1) + '" fill="' + color + '" fill-opacity="' + (part ? 0.45 : 0.9) + '"><title>' +
          x.start + ' to ' + x.end + ': ' + fmtAmount(c.unit, x.amount) + (part ? ' (part year; bar scaled to a yearly rate)' : '') + '</title></rect>';
      });
    }
    var now = clamp(state.t, x0, x1);
    out += '<line x1="' + px(now).toFixed(1) + '" x2="' + px(now).toFixed(1) + '" y1="0" y2="' + H + '" stroke="#e6ecf3" stroke-width="1" stroke-dasharray="3 3"/>';
    var fig = el('figure', { class: 'ledger-chart' });
    fig.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="' + c.label.replace(/"/g, '') + ' over time"></svg>';
    fig.firstChild.innerHTML = out;
    fig.appendChild(el('div', { class: 'ledger-axis' }, [
      el('span', { text: isoOf(x0).slice(0, 4) }),
      el('span', { text: 'peak ' + fmtAmount(c.unit, max) + (isLevel ? '' : ' a year') }),
      el('span', { text: isoOf(x1 - 1).slice(0, 4) })
    ]));
    fig.appendChild(el('figcaption', { text: (isLevel ? 'Each dot is a reported figure; the line joins them.' : 'One bar per reporting period' + (partial ? '; paler bars are part-years scaled to a yearly rate.' : '.')) + ' Dashed line: the date on the clock. Gaps mean no figure, not zero.' }));
    return fig;
  }
  // ---------- key figures (meta.facts) ----------
  // meta.facts: [{ topic, date, statement, source: {publisher, title, url}, verified }]. Point-in-time figures that do not
  // fit a running counter (share of the capital under gang control, prisons, firearms...). Only those dated on or
  // before the clock are listed, newest first within each topic.
  var facts = (META.facts || []).map(function (f) { var o = Object.assign({}, f); o.d = dayNum(f.date); return o; });
  var factsNode = null;
  function buildFacts() {
    if (!facts.length && !extraCounters.length) return;
    var box = document.querySelector('.counters');
    if (!box) {
      box = el('div', { class: 'counters', role: 'group', 'aria-label': 'Running totals' });
      $('legend').parentNode.insertBefore(box, $('legend'));
    }
    factsNode = el('span', { class: 'v' });
    box.appendChild(el('button', { type: 'button', class: 'counter', title: 'Show the figures', onclick: openFacts }, [
      factsNode, el('span', { class: 'k', text: 'Key figures on record' })
    ]));
  }
  function renderFactsCount(day) {
    if (!factsNode) return;
    var n = 0; facts.forEach(function (f) { if (f.d <= day) n++; });
    factsNode.textContent = n;
  }
  function openFacts() {
    setPlaying(false);
    state.selected = 'counter:facts';
    var day = Math.floor(state.t), d = $('detail');
    d.textContent = '';
    $('feed').hidden = true;
    d.hidden = false;
    d.appendChild(el('button', { type: 'button', class: 'back', text: '‹ All events', onclick: deselect }));
    d.appendChild(el('div', { class: 'kicker' }, [el('b', { text: 'Key figures' }), el('span', { text: 'published up to ' + longDate(day) })]));
    d.appendChild(el('h2', { text: 'The numbers on record' }));
    d.appendChild(el('p', { class: 'summary', text: 'Each line is one figure from one named source, with its date. They are not added together: sources use different definitions, and almost all are minimums.' }));
    if (extraCounters.length) {
      d.appendChild(el('h3', { text: 'More running series (' + extraCounters.length + ')' }));
      extraCounters.forEach(function (c) {
        d.appendChild(el('button', { type: 'button', class: 'item series', onclick: function () { openLedger(c); } }, [
          el('span', { class: 'sv', text: fmtValue(c.unit, counterValue(c, state.t)) }),
          el('span', null, [el('span', { class: 't', text: c.label })])
        ]));
      });
    }
    var shown = facts.filter(function (f) { return f.d <= day; }).sort(function (a, b) { return b.d - a.d; });
    if (!shown.length) d.appendChild(el('p', { class: 'empty', text: 'No figures dated this early. Move the clock forward.' }));
    var topics = [];
    shown.forEach(function (f) { if (topics.indexOf(f.topic) < 0) topics.push(f.topic); });
    (META.fact_topics || []).slice().reverse().forEach(function (t) { var i = topics.indexOf(t); if (i >= 0) { topics.splice(i, 1); topics.unshift(t); } });
    topics.forEach(function (t) {
      var list = shown.filter(function (f) { return f.topic === t; });
      d.appendChild(el('h3', { text: t.charAt(0).toUpperCase() + t.slice(1) + ' (' + list.length + ')' }));
      list.forEach(function (f) {
        var src = f.source && safeUrl(f.source.url);
        d.appendChild(el('div', { class: 'src' }, [
          el('div', { class: 'pub' }, [el('span', { text: longDate(f.d) }), el('span', { text: f.verified === false ? 'Not checked at source' : '' })]),
          el('p', { class: 'fact', text: f.statement }),
          src ? el('a', { href: src, target: '_blank', rel: 'noopener noreferrer', text: (f.source.publisher ? f.source.publisher + ': ' : '') + (f.source.title || src) }) : null
        ]));
      });
    });
    document.querySelector('.panel').scrollTop = 0;
  }
  function openLedger(c) {
    setPlaying(false);
    state.selected = 'counter:' + c.id;
    var d = $('detail');
    d.textContent = '';
    $('feed').hidden = true;
    d.hidden = false;
    d.appendChild(el('button', { type: 'button', class: 'back', text: '‹ All events', onclick: deselect }));
    d.appendChild(el('div', { class: 'kicker' }, [el('b', { text: 'Running total' }), el('span', { text: 'at ' + longDate(Math.floor(state.t)) })]));
    d.appendChild(el('h2', { text: fmtValue(c.unit, counterValue(c, state.t)) + ' — ' + c.label }));
    if (c.note) d.appendChild(el('p', { class: 'summary', text: c.note }));
    var chart = ledgerChart(c);
    if (chart) d.appendChild(chart);
    function rowCard(x) {
      var when = c.kind === 'level' ? longDate(x.d) : x.start.slice(0, 4) === x.end.slice(0, 4) && x.start.slice(5) === '01-01' && x.end.slice(5) === '12-31'
        ? x.start.slice(0, 4) : shortDate(x.s) + ' ' + x.start.slice(0, 4) + ' – ' + shortDate(x.e - 1) + ' ' + x.end.slice(0, 4);
      var src = x.source && safeUrl(x.source.url);
      return el('div', { class: 'src' }, [
        el('div', { class: 'pub' }, [el('span', { text: when }), el('span', { text: x.basis || '' })]),
        el('div', { class: 'amt', text: fmtAmount(c.unit, c.kind === 'level' ? x.value : x.amount) + (x.label ? ' · ' + x.label : '') }),
        x.notes ? el('p', { class: 'warn', text: x.notes }) : null,
        src ? el('a', { href: src, target: '_blank', rel: 'noopener noreferrer', text: (x.source.publisher ? x.source.publisher + ': ' : '') + (x.source.title || src) }) : null
      ]);
    }
    var counted = c.rows.filter(function (x) { return x.count !== false; });
    var extra = c.rows.filter(function (x) { return x.count === false; });
    d.appendChild(el('h3', { text: c.kind === 'level' ? 'Reported figures' : 'Counted in the total (' + counted.length + ')' }));
    counted.forEach(function (x) { d.appendChild(rowCard(x)); });
    if (extra.length) {
      d.appendChild(el('h3', { text: 'Listed for context, not added (' + extra.length + ')' }));
      extra.forEach(function (x) { d.appendChild(rowCard(x)); });
    }
    document.querySelector('.panel').scrollTop = 0;
  }

  // ---------- feed + detail ----------
  function renderFeed(day) {
    var feed = $('feed');
    feed.textContent = '';
    var list = events.filter(function (e) { return isVisible(e, day); }).reverse();
    feed.appendChild(el('h2', { text: 'Events up to ' + longDate(day) }));
    feed.appendChild(el('p', { class: 'sub', text: list.length + (list.length === 1 ? ' event' : ' events') + ' shown. Select one for its summary, sources and posts.' }));
    if (!events.length) {
      feed.appendChild(el('p', { class: 'empty', text: 'No events loaded. Add entries to data/events.js.' }));
      return;
    }
    if (!list.length) {
      feed.appendChild(el('p', { class: 'empty', text: 'Nothing yet at this date. Press play or drag the timeline.' }));
      return;
    }
    var cur = null;
    list.forEach(function (e) {
      if (e.day !== cur) {
        cur = e.day;
        feed.appendChild(el('div', { class: 'day-head' + (e.day === day ? ' is-today' : ''), text: longDate(e.day) }));
      }
      var meta = [e.actor, e.place].filter(Boolean).join(' · ');
      var b = el('button', { type: 'button', class: 'item', onclick: function () { select(e.id, true); } }, [
        glyphEl(e.category, 18),
        el('span', null, [el('span', { class: 't', text: e.title }), el('br'), el('span', { class: 'm', text: meta })])
      ]);
      feed.appendChild(b);
    });
  }

  function select(id, pan) {
    var e = events.filter(function (x) { return x.id === id; })[0];
    if (!e) return;
    setPlaying(false);
    state.selected = id;
    if (e.day > Math.floor(state.t)) state.t = e.day;
    renderDay(true);
    renderFrame();
    if (pan && e.marker) map.panTo(e.marker.getLatLng());
    renderDetail(e);
    writeUrl();
  }
  function deselect() {
    state.selected = null;
    $('detail').hidden = true;
    $('feed').hidden = false;
    renderDay(true);
    writeUrl();
  }

  function renderDetail(e) {
    var d = $('detail');
    d.textContent = '';
    $('feed').hidden = true;
    d.hidden = false;
    d.appendChild(el('button', { type: 'button', class: 'back', text: '‹ All events', onclick: deselect }));
    d.appendChild(el('div', { class: 'kicker' }, [glyphEl(e.category, 16), el('b', { text: CATS[e.category].label }), el('span', { text: longDate(e.day) + (e.date_precision === 'approx' ? ' (approximate date)' : '') })]));
    d.appendChild(el('h2', { text: e.title }));
    var note = PRECISION_NOTE[e.location_precision];
    d.appendChild(el('div', { class: 'where', text: [e.place, note].filter(Boolean).join(' — ') }));
    if (e.summary) d.appendChild(el('p', { class: 'summary', text: e.summary }));

    var facts = el('ul', { class: 'facts' });
    function fact(k, v) { if (v) facts.appendChild(el('li', null, [el('span', { text: k }), el('span', { text: v })])); }
    fact('Actor', e.actor);
    if (e.casualties) {
      var c = e.casualties, bits = [];
      if (typeof c.killed === 'number') bits.push(c.killed + ' killed');
      if (typeof c.injured === 'number') bits.push(c.injured + ' injured');
      fact('Reported toll', bits.join(', ') + (c.note ? (bits.length ? ' — ' : '') + c.note : ''));
    }
    if (e.movement) fact('Movement', (e.movement.from_place || '?') + ' → ' + (e.movement.to_place || '?'));
    fact('Confidence', e.confidence);
    fact('Notes', e.notes);
    if (facts.children.length) d.appendChild(facts);

    var said = messages.filter(function (m) { return m.event_id === e.id; });
    if (said.length) {
      d.appendChild(el('h3', { text: 'What was said' }));
      said.forEach(function (m) { d.appendChild(messageCard(m, true)); });
    }

    var srcs = (e.sources || []).filter(function (s) { return safeUrl(s.url); });
    d.appendChild(el('h3', { text: srcs.length ? 'Sources and posts' : 'No sources attached yet' }));
    srcs.forEach(function (s) { d.appendChild(sourceCard(s, e)); });
    d.scrollTop = 0;
    document.querySelector('.panel').scrollTop = 0;
  }

  var TYPE_LABEL = { article: 'Article', x: 'X post', video: 'Video', report: 'Report' };
  function tweetId(u) { var m = /(?:twitter|x)\.com\/[^/]+\/status(?:es)?\/(\d+)/i.exec(u); return m ? m[1] : null; }
  function youtubeId(u) { var m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i.exec(u); return m ? m[1] : null; }

  function sourceCard(s, e) {
    var url = safeUrl(s.url);
    var card = el('div', { class: 'src' }, [
      el('div', { class: 'pub' }, [el('span', { text: s.publisher || '' }), el('span', { text: (TYPE_LABEL[s.type] || 'Link') + (s.date ? ' · ' + shortDate(dayNum(s.date)) + ' ' + s.date.slice(0, 4) : '') + (s.verified === false ? ' · not checked at source' : '') })]),
      el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: s.title || url })
    ]);
    var tid = tweetId(url), yid = youtubeId(url);
    if (tid || yid) {
      // Embeds load only on request: nothing is fetched from X or YouTube, and no footage plays, until asked.
      var graphic = e.category === 'gang' || s.graphic;
      var holder = el('div', { class: 'embed' });
      var btn = el('button', { type: 'button', class: 'load', text: tid ? 'Show post here' : 'Play video here' });
      btn.addEventListener('click', function () {
        btn.remove();
        if (warn) warn.remove();
        if (tid) embedTweet(tid, holder); else embedYoutube(yid, holder);
      });
      var warn = graphic ? el('p', { class: 'warn', text: 'May contain violent or disturbing footage.' }) : null;
      card.appendChild(btn);
      if (warn) card.appendChild(warn);
      card.appendChild(holder);
    }
    return card;
  }

  var twitterReady = null;
  function loadTwitter() {
    if (twitterReady) return twitterReady;
    twitterReady = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://platform.twitter.com/widgets.js';
      s.async = true;
      s.onload = function () { window.twttr && window.twttr.ready ? window.twttr.ready(resolve) : reject(new Error('unavailable')); };
      s.onerror = function () { reject(new Error('blocked')); };
      document.head.appendChild(s);
    });
    return twitterReady;
  }
  function embedTweet(id, holder) {
    holder.textContent = 'Loading post…';
    loadTwitter().then(function (twttr) {
      holder.textContent = '';
      return twttr.widgets.createTweet(id, holder, { theme: 'dark', dnt: true, align: 'center' });
    }).then(function (node) {
      if (!node) holder.textContent = 'This post could not be embedded (deleted, private or restricted). Use the link above.';
    }).catch(function () {
      holder.textContent = 'X embeds are blocked in this browser. Use the link above.';
    });
  }
  function embedYoutube(id, holder) {
    holder.appendChild(el('iframe', {
      src: 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1',
      title: 'Video', allow: 'autoplay; encrypted-media; picture-in-picture', allowfullscreen: ''
    }));
  }

  // ---------- timeline ----------
  function buildTimeline() {
    var start = state.range.start, n = lastDay - start + 1;
    // Long periods are binned (weeks, then 30-day blocks) so the bars stay wide enough to see.
    var bin = n > 2500 ? 30 : n > 800 ? 7 : 1;
    var per = [], max = 1;
    for (var i = 0; i < Math.ceil(n / bin); i++) per.push({});
    events.forEach(function (e) {
      var i = e.day - start;
      if (i < 0 || i >= n || !state.filters[e.category]) return;
      i = Math.floor(i / bin);
      per[i][e.category] = (per[i][e.category] || 0) + 1;
    });
    per.forEach(function (p) { var s = 0; CAT_ORDER.forEach(function (c) { s += p[c] || 0; }); if (s > max) max = s; });
    var H = Math.max(max, 3), gap = n > 90 ? 0.08 : 0.14, out = '';
    per.forEach(function (p, i) {
      var y = H;
      CAT_ORDER.forEach(function (c) {
        var k = p[c] || 0; if (!k) return;
        y -= k;
        out += '<rect x="' + ((i + gap) * bin) + '" y="' + (y + 0.06) + '" width="' + ((1 - gap * 2) * bin) + '" height="' + (k - 0.06) + '" fill="' + CATS[c].color + '"/>';
      });
    });
    if (anchorDay !== null && anchorDay >= start && anchorDay <= lastDay) {
      out += '<rect x="' + (anchorDay - start) + '" y="0" width="0.06" height="' + H + '" fill="#8fa0b5"/>';
    }
    var svg = $('bars');
    svg.setAttribute('viewBox', '0 0 ' + n + ' ' + H);
    svg.innerHTML = out;

    var axis = $('axis');
    axis.textContent = '';
    for (var j = 0; j < n; j++) {
      var d = new Date((start + j) * DAY_MS), label = null;
      if (n <= 75) { if (j % 7 === 0) label = shortDate(start + j); }
      else if (n > 800) { if (d.getUTCDate() === 1 && d.getUTCMonth() === 0 && (n < 5000 || d.getUTCFullYear() % (n > 15000 ? 5 : 2) === 0)) label = String(d.getUTCFullYear()); }
      else if (d.getUTCDate() === 1) label = fmtMonth.format(d);
      if (label) { var s = el('span', { text: label }); s.style.left = (j / n * 100) + '%'; axis.appendChild(s); }
    }
    var scrub = $('scrub');
    scrub.max = n - 0.001;
    scrub.setAttribute('aria-valuetext', longDate(Math.floor(state.t)));
  }

  // ---------- transport ----------
  var lastTs = null;
  function setPlaying(on) {
    if (on === state.playing) return;
    state.playing = on;
    $('play').setAttribute('aria-label', on ? 'Pause' : 'Play');
    $('play-icon').setAttribute('d', on ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'M7 4l14 8-14 8z');
    if (on) {
      if (state.t >= rangeEnd() - 0.01) state.t = state.range.start;
      if (state.selected) deselect();
      lastTs = null;
      requestAnimationFrame(tick);
    } else {
      writeUrl();
    }
    msgShown = '';
    renderMessages(Math.floor(state.t));
  }
  function tick(ts) {
    if (!state.playing) return;
    if (lastTs !== null) state.t += Math.min(0.25, (ts - lastTs) / 1000) * state.speed;
    lastTs = ts;
    if (state.t >= rangeEnd()) { state.t = rangeEnd(); renderFrame(); setPlaying(false); return; }
    renderFrame();
    requestAnimationFrame(tick);
  }
  function seek(t) {
    state.t = clamp(t, state.range.start, rangeEnd());
    $('scrub').setAttribute('aria-valuetext', longDate(Math.floor(state.t)));
    renderFrame();
  }
  function setRange(id) {
    state.range = RANGES.filter(function (r) { return r.id === id; })[0] || RANGES[0];
    $('range').value = state.range.id;
    buildTimeline();
    seek(Math.max(state.t, state.range.start));
  }

  function writeUrl() {
    if (!window.history || !history.replaceState || location.protocol === 'about:') return;
    var q = '?' + (THEATRE_ID !== 'haiti' ? 'map=' + THEATRE_ID + '&' : '') + 'date=' + isoOf(Math.floor(state.t)) + (state.range !== RANGES[0] ? '&range=' + state.range.id : '') + (state.selected && state.selected.indexOf('counter:') !== 0 ? '&event=' + encodeURIComponent(state.selected) : '');
    try { history.replaceState(null, '', q); } catch (err) { /* file:// in some browsers */ }
  }

  // ---------- wiring ----------
  function init() {
    if (META.title) { $('title').textContent = META.title; document.title = META.title; }
    $('subtitle').textContent = META.subtitle || '';
    Object.keys(CATS).forEach(function (c) { document.documentElement.style.setProperty('--cat-' + c, CATS[c].color); });

    var legend = $('legend');
    CAT_ORDER.forEach(function (c) {
      var chip = el('button', { type: 'button', class: 'chip', 'data-cat': c, 'aria-pressed': 'true', title: CATS[c].label }, [
        glyphEl(c, 14), el('span', { class: 'lbl', text: CATS[c].label }), el('span', { class: 'n', text: '0' })
      ]);
      chip.addEventListener('click', function () {
        state.filters[c] = !state.filters[c];
        chip.setAttribute('aria-pressed', String(state.filters[c]));
        buildTimeline();
        renderDay(true);
      });
      legend.appendChild(chip);
    });

    var rangeSel = $('range');
    RANGES.forEach(function (r) { rangeSel.appendChild(el('option', { value: r.id, text: r.label })); });
    rangeSel.addEventListener('change', function () { setRange(rangeSel.value); });
    if (RANGES.length < 2) rangeSel.parentNode.hidden = true;

    $('play').addEventListener('click', function () { setPlaying(!state.playing); });
    $('speed').addEventListener('change', function (ev) { state.speed = +ev.target.value; });
    $('window').addEventListener('change', function (ev) { state.window = ev.target.value; renderDay(true); });
    $('territory').addEventListener('change', function (ev) { state.territory = ev.target.checked; renderDay(true); });
    if (!territory.length && !controlAreas.length) $('territory').parentNode.hidden = true;
    $('show-messages').addEventListener('change', function (ev) { state.messages = ev.target.checked; msgShown = ''; renderMessages(Math.floor(state.t)); });
    if (!messages.length) $('show-messages').parentNode.hidden = true;
    if (!controlAreas.length) document.querySelector('.zone-key').hidden = true;
    if (!controlAreas.some(function (a) { return a.status === 'liberated'; })) document.querySelector('.sw-lib').parentNode.hidden = true;
    if (!opZones.length) document.querySelector('.sw-ops').parentNode.hidden = true;
    $('scrub').addEventListener('input', function (ev) { setPlaying(false); seek(state.range.start + (+ev.target.value)); });
    $('scrub').addEventListener('change', writeUrl);

    buildCounters();
    buildFacts();
    if (TH.speed) { state.speed = TH.speed; $('speed').value = String(TH.speed); }
    $('map').setAttribute('aria-label', TH.mapLabel);
    var tabs = $('theatres');
    Object.keys(THEATRES).forEach(function (id) {
      tabs.appendChild(el('a', { href: id === 'haiti' ? '?' : '?map=' + id, text: THEATRES[id].label, 'aria-current': id === THEATRE_ID ? 'page' : null }));
    });
    var views = $('viewbtns');
    TH.views.forEach(function (v) {
      views.appendChild(el('button', { type: 'button', text: v.label, onclick: function () { map.flyToBounds(v.bounds, { duration: REDUCED ? 0 : 0.8 }); } }));
    });

    document.addEventListener('keydown', function (ev) {
      var tag = (ev.target.tagName || '').toLowerCase();
      if (ev.key === ' ' && tag !== 'button' && tag !== 'select' && tag !== 'a') { ev.preventDefault(); setPlaying(!state.playing); }
      else if ((ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') && tag !== 'select') {
        ev.preventDefault(); setPlaying(false);
        seek(Math.floor(state.t) + (ev.key === 'ArrowRight' ? 1 : -1)); writeUrl();
      } else if (ev.key === 'Escape' && state.selected) deselect();
    });

    // Deep link: ?date=YYYY-MM-DD&range=id&event=id
    var q = new URLSearchParams(location.search);
    if (q.get('range')) state.range = RANGES.filter(function (r) { return r.id === q.get('range'); })[0] || RANGES[0];
    rangeSel.value = state.range.id;
    state.t = state.range.start;
    if (/^\d{4}-\d{2}-\d{2}$/.test(q.get('date') || '')) state.t = clamp(dayNum(q.get('date')), state.range.start, lastDay);
    else state.t = lastDay; // open on the latest day; Play restarts from the beginning of the period

    buildTimeline();
    renderDay(true);
    renderFrame();
    if (q.get('event')) select(q.get('event'), true);
    // ?counter=id opens a counter's ledger; ?counter=facts opens the key figures.
    else if (q.get('counter') === 'facts' && facts.length) openFacts();
    else if (q.get('counter')) counters.concat(extraCounters).forEach(function (c) { if (c.id === q.get('counter')) openLedger(c); });
  }

  init();
})();
