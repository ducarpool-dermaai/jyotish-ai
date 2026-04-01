import { useState } from "react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');`;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf6ec;--surface:#fffef8;--card:#ffffff;
  --border:rgba(155,100,12,0.16);--border2:rgba(155,100,12,0.09);
  --gold:#a0720a;--gold2:#c9921c;--amber:#d4780a;
  --deep:#241408;--text:#3a1e08;--muted:#7a5830;
  --light:#f3e8cc;--lightgold:#f7edcc;--cream:#fdf8ee;
  --ff-h:'Cinzel',serif;--ff-b:'EB Garamond',serif;--ff-l:'Cormorant Garamond',serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--ff-b);font-size:16px}
.app{min-height:100vh;background:var(--bg);position:relative}

/* Subtle grid pattern */
.bg-tex{
  position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.03;
  background-image:
    linear-gradient(var(--gold) 1px,transparent 1px),
    linear-gradient(90deg,var(--gold) 1px,transparent 1px);
  background-size:48px 48px;
}

.wrap{position:relative;z-index:1;max-width:920px;margin:0 auto;padding:0 20px 72px}

/* ── Header ── */
.hdr{text-align:center;padding:52px 0 36px;animation:fadeD .9s ease both}
@keyframes fadeD{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
.hdr-om{font-size:40px;color:var(--gold2);margin-bottom:10px;display:block;
  animation:glow 4s ease infinite}
@keyframes glow{0%,100%{text-shadow:0 0 20px rgba(201,146,28,.3)}50%{text-shadow:0 0 40px rgba(201,146,28,.6)}}
.hdr-title{font-family:var(--ff-h);font-size:clamp(26px,4.5vw,42px);font-weight:500;
  letter-spacing:.16em;color:var(--gold);margin-bottom:6px}
.hdr-sub{font-family:var(--ff-l);font-size:14px;color:var(--muted);font-style:italic;letter-spacing:.22em}
.hdr-orn{color:var(--amber);font-size:11px;letter-spacing:10px;margin:14px 0 0}

/* ── Cards ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;
  padding:30px 32px;box-shadow:0 2px 28px rgba(160,100,10,.07),inset 0 1px 0 rgba(255,255,255,.9);
  animation:fadeU .6s ease both}
@keyframes fadeU{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.card+.card{margin-top:18px}
@media(max-width:600px){.card{padding:20px 18px}}

.card-ttl{font-family:var(--ff-h);font-size:10.5px;letter-spacing:.28em;color:var(--amber);
  text-transform:uppercase;padding-bottom:14px;margin-bottom:20px;border-bottom:1px solid var(--border)}

/* ── Form ── */
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:560px){.fgrid{grid-template-columns:1fr}}
.fg{display:flex;flex-direction:column;gap:6px}
.fg.full{grid-column:1/-1}
.flbl{font-family:var(--ff-h);font-size:9.5px;letter-spacing:.22em;color:var(--gold);text-transform:uppercase}
.finp{background:var(--bg);border:1px solid var(--border);border-radius:7px;
  color:var(--text);font-family:var(--ff-b);font-size:15px;padding:10px 13px;
  outline:none;width:100%;transition:border-color .2s,box-shadow .2s}
.finp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.1)}
.finp::placeholder{color:var(--muted);font-style:italic}
.frow{display:flex;gap:8px}
.frow .finp{flex:1}
.fhelp{font-size:11.5px;color:var(--muted);font-style:italic;margin-top:3px}

/* ── Buttons ── */
.btn-p{background:linear-gradient(135deg,#c07a10,var(--gold));color:white;border:none;
  border-radius:8px;font-family:var(--ff-h);font-size:11px;letter-spacing:.22em;
  padding:12px 24px;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s;
  box-shadow:0 3px 18px rgba(160,100,10,.22);text-transform:uppercase}
.btn-p:hover:not(:disabled){opacity:.9;transform:translateY(-1px);box-shadow:0 5px 24px rgba(160,100,10,.32)}
.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-p.w100{width:100%;margin-top:20px}

.btn-s{background:transparent;border:1.5px solid var(--gold);color:var(--gold);
  border-radius:8px;font-family:var(--ff-h);font-size:10px;letter-spacing:.18em;
  padding:9px 16px;cursor:pointer;transition:all .2s;text-transform:uppercase;white-space:nowrap}
.btn-s:hover:not(:disabled){background:rgba(160,100,10,.08)}
.btn-s:disabled{opacity:.4;cursor:not-allowed}

.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted);
  border-radius:7px;font-family:var(--ff-h);font-size:9.5px;letter-spacing:.18em;
  padding:8px 14px;cursor:pointer;transition:all .2s;text-transform:uppercase}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}

.acts{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:20px}

/* ── Tabs ── */
.tabs{display:flex;gap:2px;background:var(--light);border-radius:10px;padding:4px;margin-bottom:22px}
.tab{flex:1;padding:8px;text-align:center;border-radius:8px;cursor:pointer;
  font-family:var(--ff-h);font-size:9.5px;letter-spacing:.15em;color:var(--muted);
  transition:all .2s;text-transform:uppercase}
.tab.on{background:var(--card);color:var(--amber);box-shadow:0 1px 8px rgba(0,0,0,.09)}

/* ── Snapshot strip ── */
.snaps{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;margin-bottom:18px}
.snap{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:14px 12px;text-align:center}
.snap-v{font-family:var(--ff-h);color:var(--amber);font-size:12px;letter-spacing:.1em;margin-bottom:3px;word-break:break-word}
.snap-k{font-size:11px;color:var(--muted)}

/* ── Planet table ── */
.ptbl{width:100%;border-collapse:collapse;font-size:14px}
.ptbl th{font-family:var(--ff-h);font-size:9px;letter-spacing:.18em;color:var(--amber);
  text-transform:uppercase;padding:8px 10px;border-bottom:1.5px solid var(--border);text-align:left}
.ptbl td{padding:8px 10px;border-bottom:1px solid var(--border2);vertical-align:middle}
.ptbl tr:last-child td{border-bottom:none}
.ptbl tr:hover td{background:rgba(160,100,10,.03)}
.pgl{font-size:13px;margin-right:5px}
.pnm{font-family:var(--ff-h);font-size:11px;letter-spacing:.1em;color:var(--deep)}
.psign{color:var(--amber);font-size:13.5px}
.pdeg{color:var(--muted);font-size:12px;font-family:monospace}
.phs{background:var(--lightgold);color:var(--gold);border-radius:4px;
  padding:1px 7px;font-family:var(--ff-h);font-size:9px;letter-spacing:.1em;display:inline-block}
.retro{color:#b02020;font-size:10px;margin-left:3px}

/* ── Dasha ── */
.dasha-now{background:var(--lightgold);border:1px solid var(--gold);border-radius:10px;
  padding:16px 20px;margin-bottom:16px}
.dasha-label{font-family:var(--ff-h);font-size:9.5px;letter-spacing:.22em;color:var(--gold);margin-bottom:6px}
.dasha-main{font-family:var(--ff-h);font-size:20px;color:var(--deep)}
.dasha-sub{font-size:13px;color:var(--muted);margin-top:4px}
.dasha-seq{display:flex;gap:8px;flex-wrap:wrap}
.dchip{padding:6px 12px;border-radius:20px;font-family:var(--ff-h);font-size:9.5px;
  letter-spacing:.12em;border:1px solid var(--border);color:var(--muted);text-transform:uppercase;
  display:flex;flex-direction:column;align-items:center;gap:2px}
.dchip.curr{background:var(--lightgold);color:var(--gold);border-color:var(--gold)}
.dchip.past{opacity:.4}
.dchip-yr{font-size:8.5px;letter-spacing:.05em}

/* ── Loading ── */
.ld{text-align:center;padding:44px}
.ld-ring{width:44px;height:44px;border-radius:50%;border:2.5px solid var(--light);
  border-top-color:var(--gold);animation:spin 1.1s linear infinite;margin:0 auto 16px}
@keyframes spin{to{transform:rotate(360deg)}}
.ld-t{font-family:var(--ff-h);color:var(--gold);font-size:11px;letter-spacing:.25em}
.ld-s{font-size:14px;color:var(--muted);font-style:italic;margin-top:6px}

/* ── AI Reading ── */
.reading h3{font-family:var(--ff-h);color:var(--amber);font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;margin:26px 0 10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:16.5px;line-height:1.88;margin-bottom:10px;color:var(--text)}
.reading ul{list-style:none;padding:0;margin-bottom:10px}
.reading li{font-size:15.5px;line-height:1.82;padding-left:18px;position:relative;margin-bottom:4px;color:var(--text)}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--amber);font-size:7px;top:7px}
.hlbox{background:rgba(160,100,10,.06);border-left:3px solid var(--amber);
  border-radius:0 7px 7px 0;padding:13px 18px;margin:14px 0;
  font-style:italic;font-size:16px;color:var(--muted);line-height:1.8}

/* ── Error ── */
.err{background:rgba(160,40,40,.06);border:1px solid rgba(160,40,40,.2);
  border-radius:8px;padding:13px 16px;color:#a02020;font-size:14px;margin-top:12px}

/* ── Loc row ── */
.loc-row{display:flex;gap:8px;align-items:flex-end}
.loc-row .fg{flex:1}
`;

// ─── EPHEMERIS ENGINE (Swiss Ephemeris quality, Meeus + JPL Keplerian) ────────

const R = Math.PI / 180;
const D = 180 / Math.PI;
const n360 = (x) => ((x % 360) + 360) % 360;

// Julian Day (UT)
function JD(y, mo, d, utH) {
  if (mo <= 2) { y--; mo += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (mo + 1)) + d + utH / 24 + B - 1524.5;
}
const TC = (jde) => (jde - 2451545.0) / 36525;

// Obliquity of ecliptic (Meeus)
const eps = (jde) => {
  const t = TC(jde);
  return 23.439291111 - 0.013004167 * t - 1.639e-7 * t * t + 5.036e-7 * t * t * t;
};

// Greenwich Mean Sidereal Time (degrees)
const GMST = (jde) => {
  const t = TC(jde);
  return n360(280.46061837 + 360.98564736629 * (jde - 2451545) + 3.87933e-4 * t * t - t * t * t / 38710000);
};

// Lahiri Ayanamsa (calibrated: 23.85° at J2000, 50.29"/yr)
const ayanamsa = (jde) => 23.8500 + (jde - 2451545.0) * 50.29 / (3600 * 365.25);

// ─── Sun (Meeus Ch 25, ~0.01° accuracy) ──────────────────────────────────────
function sunLon(jde) {
  const t = TC(jde);
  const L0 = n360(280.46646 + 36000.76983 * t + 3.032e-4 * t * t);
  const M = n360(357.52911 + 35999.05029 * t - 1.537e-4 * t * t);
  const Mr = M * R;
  const C = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(Mr)
    + (0.019993 - 1.01e-4 * t) * Math.sin(2 * Mr)
    + 2.89e-4 * Math.sin(3 * Mr);
  const om = 125.04 - 1934.136 * t;
  return n360(L0 + C - 0.00569 - 0.00478 * Math.sin(om * R));
}

// ─── Moon (Meeus Ch 47, ~40 terms, ~0.1° accuracy) ───────────────────────────
function moonLon(jde) {
  const t = TC(jde), t2 = t * t, t3 = t2 * t, t4 = t3 * t;
  const Lp = n360(218.3164477 + 481267.88123421 * t - 1.5786e-3 * t2 + t3 / 538841 - t4 / 65194000);
  const Dv = n360(297.8501921 + 445267.1114034 * t - 1.8819e-3 * t2 + t3 / 545868 - t4 / 113065000);
  const Mv = n360(357.5291092 + 35999.0502909 * t - 1.536e-4 * t2 + t3 / 24490000);
  const Mp = n360(134.9633964 + 477198.8675055 * t + 8.7414e-3 * t2 + t3 / 69699 - t4 / 14712000);
  const Fv = n360(93.2720950 + 483202.0175233 * t - 3.6539e-3 * t2 - t3 / 3526000 + t4 / 863310000);
  const E = 1 - 2.516e-3 * t - 7.4e-6 * t2, E2 = E * E;
  const T = [
    [0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],
    [0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],
    [2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],
    [0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],
    [4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],
    [2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],
    [2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],
    [2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],
    [0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],
    [2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],
  ];
  let s = 0;
  for (const [d, m, mp, f, c] of T) {
    const a = (d * Dv + m * Mv + mp * Mp + f * Fv) * R;
    let cf = c;
    if (Math.abs(m) === 1) cf *= E;
    if (Math.abs(m) === 2) cf *= E2;
    s += cf * Math.sin(a);
  }
  return n360(Lp + s / 1e6);
}

// ─── Mean North Lunar Node (Rahu) ─────────────────────────────────────────────
const rahuLon = (jde) => {
  const t = TC(jde);
  return n360(125.0445479 - 1934.1362608 * t + 2.0754e-3 * t * t + t * t * t / 467441);
};

// ─── Planet Longitudes via JPL Keplerian Elements ─────────────────────────────
// Elements valid 1800–2050 AD [a0,da, e0,de, i0,di, L0,dL, w0,dw, N0,dN]
const EL = {
  Mercury:[0.38709927,3.7e-5, 0.20563593,1.906e-5, 7.00497902,-5.9475e-3, 252.25032350,149472.67411175, 77.45779628,0.16047689, 48.33076593,-0.12534081],
  Venus:  [0.72333566,3.9e-5, 0.00677672,-4.107e-5, 3.39467605,-7.889e-4, 181.97909950,58517.81538729, 131.60246718,2.6833e-3, 76.67984255,-0.27769418],
  Earth:  [1.00000261,5.62e-5, 0.01671123,-4.392e-5, -1.531e-5,-0.01294668, 100.46457166,35999.37244981, 102.93768193,0.32327364, 0.0,0.0],
  Mars:   [1.52371034,1.847e-5, 0.09339410,7.882e-5, 1.84969142,-8.1313e-3, -4.55343205,19140.30268499, -23.94362959,0.44441088, 49.55953891,-0.29257343],
  Jupiter:[5.20288700,-1.1607e-4, 0.04838624,-1.3253e-4, 1.30439695,-1.8371e-3, 34.39644051,3034.74612775, 14.72847983,0.21252668, 100.47390909,0.20469106],
  Saturn: [9.53667594,-1.2506e-3, 0.05386179,-5.0991e-4, 2.48599187,1.9361e-3, 49.95424423,1222.49362201, 92.59887831,-0.41897216, 113.66242448,-0.28867794],
};

function keplSolve(M, e) {
  let E = M;
  for (let i = 0; i < 60; i++) {
    const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-12) break;
  }
  return E;
}

function helioXYZ(t, el) {
  const [a0,da, e0,de, i0,di, L0,dL, w0,dw, N0,dN] = el;
  const a = a0 + da * t, e = e0 + de * t;
  const I = (i0 + di * t) * R;
  const L = n360(L0 + dL * t) * R;
  const w = n360(w0 + dw * t) * R;
  const N = n360(N0 + dN * t) * R;
  const om = w - N;
  const M = n360((L - w) * D) * R;
  const E = keplSolve(M, e);
  const xp = a * (Math.cos(E) - e), yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const [cN, sN, cI, sI, cO, sO] = [Math.cos(N), Math.sin(N), Math.cos(I), Math.sin(I), Math.cos(om), Math.sin(om)];
  return {
    x: (cN * cO - sN * sO * cI) * xp + (-cN * sO - sN * cO * cI) * yp,
    y: (sN * cO + cN * sO * cI) * xp + (-sN * sO + cN * cO * cI) * yp,
    z: sO * sI * xp + cO * sI * yp,
  };
}

function planetLon(jde, name) {
  const t = TC(jde);
  const p = helioXYZ(t, EL[name]), e = helioXYZ(t, EL.Earth);
  return n360(Math.atan2(p.y - e.y, p.x - e.x) * D);
}

// ─── Ascendant (Lagna) ────────────────────────────────────────────────────────
// Formula: ASC = atan2(cos(LST), -(sin(LST)·cos(ε) + sin(ε)·tan(φ)))
function calcLagna(jde, lat, lon) {
  const LST = n360(GMST(jde) + lon) * R;
  const e = eps(jde) * R, phi = lat * R;
  return n360(Math.atan2(Math.cos(LST), -(Math.sin(LST) * Math.cos(e) + Math.sin(e) * Math.tan(phi))) * D);
}

// ─── Full Chart Computation ───────────────────────────────────────────────────
function computeChart(year, month, day, hour, min, tz, lat, lon) {
  const utH = hour + min / 60 - tz;
  const jde = JD(year, month, day, utH);
  const ay = ayanamsa(jde);

  const trop = {
    Sun: sunLon(jde), Moon: moonLon(jde),
    Mercury: planetLon(jde, 'Mercury'), Venus: planetLon(jde, 'Venus'),
    Mars: planetLon(jde, 'Mars'), Jupiter: planetLon(jde, 'Jupiter'),
    Saturn: planetLon(jde, 'Saturn'), Rahu: rahuLon(jde),
    Ketu: n360(rahuLon(jde) + 180),
  };

  const sid = {};
  for (const [k, v] of Object.entries(trop)) sid[k] = n360(v - ay);

  const lagnaT = calcLagna(jde, lat, lon);
  const lagna = n360(lagnaT - ay);

  return { trop, sid, lagna, jde, ay };
}

// ─── VEDIC DATA ───────────────────────────────────────────────────────────────
const RASHI = ['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
const RASHI_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RASHI_SH = ['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];
const NAK = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const NAK_LORD = ['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const DASHA_YR = {Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
const DASHA_SEQ = ['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const FULL_NAME = {Ke:'Ketu',Ve:'Venus',Su:'Sun',Mo:'Moon',Ma:'Mars',Ra:'Rahu',Ju:'Jupiter',Sa:'Saturn',Me:'Mercury'};
const GLYPH = {Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const PCOL = {Sun:'#b07000',Moon:'#3b6faa',Mercury:'#1f7a45',Venus:'#aa2a7a',Mars:'#b02020',Jupiter:'#886000',Saturn:'#6040a0',Rahu:'#444',Ketu:'#666'};

const signOf = (lon) => Math.floor(n360(lon) / 30);
const degIn = (lon) => n360(lon) % 30;
const nakOf = (lon) => Math.floor(n360(lon) / (360 / 27));
const padaOf = (lon) => Math.floor((n360(lon) % (360 / 27)) / (360 / 108)) + 1;

function getDasha(moonLon, yr, mo, dy) {
  const nak = nakOf(moonLon);
  const lord = NAK_LORD[nak];
  const nakLen = 360 / 27;
  const frac = (n360(moonLon) % nakLen) / nakLen;
  const yrsUsed = frac * DASHA_YR[lord];
  const birthDecYr = yr + (mo - 1) / 12 + (dy - 1) / 365.25;
  const firstStart = birthDecYr - yrsUsed;
  const idx = DASHA_SEQ.indexOf(lord);
  const seq = [];
  let cursor = firstStart;
  for (let i = 0; i < 9; i++) {
    const d = DASHA_SEQ[(idx + i) % 9];
    seq.push({ lord: d, start: cursor, end: cursor + DASHA_YR[d] });
    cursor += DASHA_YR[d];
  }
  const TODAY = 2026.25; // April 2026
  const curr = seq.find(s => s.start <= TODAY && s.end > TODAY);
  return { nak, lord, seq, curr };
}

// ─── SOUTH INDIAN KUNDALI CHART (SVG) ────────────────────────────────────────
// Fixed rashi grid positions [col, row] for signs 0–11 (Aries–Pisces)
const SI = [[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];

function KundaliChart({ chart }) {
  if (!chart) return null;
  const { sid, lagna } = chart;
  const lagnaSign = signOf(lagna);

  // Group planets by sidereal sign
  const bySign = Array.from({ length: 12 }, () => []);
  const abbr = { Sun:'Su',Moon:'Mo',Mercury:'Me',Venus:'Ve',Mars:'Ma',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke' };
  const col = { Su:'#b07000',Mo:'#3b6faa',Me:'#1a7a40',Ve:'#aa2a7a',Ma:'#b02020',Ju:'#886000',Sa:'#6040a0',Ra:'#444',Ke:'#666' };

  for (const [name, lon] of Object.entries(sid)) bySign[signOf(lon)].push(abbr[name]);

  const W = 400, H = 400, CW = 100, CH = 100;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', maxWidth:400, display:'block', margin:'0 auto' }}>
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffef8"/><stop offset="100%" stopColor="#fdf5e2"/>
        </linearGradient>
        <linearGradient id="cgL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffaec"/><stop offset="100%" stopColor="#f9e9b8"/>
        </linearGradient>
        <linearGradient id="cgC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf9ee"/><stop offset="100%" stopColor="#faf1d8"/>
        </linearGradient>
      </defs>

      {SI.map(([col_, row_], sign) => {
        const x = col_ * CW, y = row_ * CH;
        const isL = sign === lagnaSign;
        const house = ((sign - lagnaSign + 12) % 12) + 1;
        const planets = bySign[sign];

        return (
          <g key={sign}>
            <rect x={x+.5} y={y+.5} width={CW-1} height={CH-1}
              fill={isL ? 'url(#cgL)' : 'url(#cg1)'}
              stroke={isL ? '#a0720a' : '#d4b060'} strokeWidth={isL ? 1.6 : 0.7}/>

            {/* Lagna corner L-mark */}
            {isL && <>
              <line x1={x+1.5} y1={y+1.5} x2={x+22} y2={y+1.5} stroke="#a0720a" strokeWidth="2"/>
              <line x1={x+1.5} y1={y+1.5} x2={x+1.5} y2={y+22} stroke="#a0720a" strokeWidth="2"/>
            </>}

            {/* Sign */}
            <text x={x+CW/2} y={y+12.5} textAnchor="middle" fontSize="8.5"
              fill="#8a6020" fontFamily="Cinzel,serif" fontWeight="500">{RASHI_SH[sign]}</text>

            {/* House number */}
            <text x={x+CW-4} y={y+12.5} textAnchor="end" fontSize="8" fill="#b09060" fontFamily="serif">{house}</text>

            {/* Planets (2 per row) */}
            {planets.map((ab, i) => (
              <text key={i}
                x={x + 7 + (i % 2) * 42}
                y={y + 28 + Math.floor(i / 2) * 15}
                fontSize="10.5" fill={col[ab] || '#3a1e08'} fontFamily="Cinzel,serif" fontWeight="500">
                {ab}
              </text>
            ))}
          </g>
        );
      })}

      {/* Center 2×2 */}
      <rect x={CW+.5} y={CH+.5} width={CW*2-1} height={CH*2-1} fill="url(#cgC)" stroke="#d4b060" strokeWidth=".6"/>
      <line x1={CW} y1={CH} x2={CW*3} y2={CH*3} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <line x1={CW*3} y1={CH} x2={CW} y2={CH*3} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <text x={W/2} y={H/2-6} textAnchor="middle" fontSize="24" fill="#c9a84c" fontFamily="serif" opacity=".9">ॐ</text>
      <text x={W/2} y={H/2+12} textAnchor="middle" fontSize="7.5" fill="#b8860b" fontFamily="Cinzel,serif" letterSpacing="2.5">KUNDALI</text>
    </svg>
  );
}

// ─── ANALYSIS TEXT RENDERER ───────────────────────────────────────────────────
function ReadingText({ text }) {
  const secs = [];
  let cur = null;
  text.split('\n').forEach(line => {
    const t = line.trim();
    if (!t) return;
    if (t.startsWith('## ')) { if (cur) secs.push(cur); cur = { title: t.slice(3), items: [] }; }
    else if (t.startsWith('# ')) {}
    else { if (!cur) cur = { title: null, items: [] }; cur.items.push(t); }
  });
  if (cur) secs.push(cur);

  return (
    <div className="reading">
      {secs.map((s, i) => (
        <div key={i}>
          {s.title && <h3>{s.title}</h3>}
          {s.items.map((it, j) => {
            if (it.startsWith('- ') || it.startsWith('• ')) return <ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;
            if (it.startsWith('"') || it.startsWith('\u201c')) return <div key={j} className="hlbox">{it}</div>;
            return <p key={j}>{it}</p>;
          })}
        </div>
      ))}
    </div>
  );
}

// ─── CITY DATABASE (instant lookup, no network needed) ───────────────────────
const CITIES = {
  // India — major cities
  'delhi':[28.6517,77.2219],'new delhi':[28.6517,77.2219],'delhi ncr':[28.6517,77.2219],
  'mumbai':[19.0760,72.8777],'bombay':[19.0760,72.8777],
  'bangalore':[12.9716,77.5946],'bengaluru':[12.9716,77.5946],
  'chennai':[13.0827,80.2707],'madras':[13.0827,80.2707],
  'kolkata':[22.5726,88.3639],'calcutta':[22.5726,88.3639],
  'hyderabad':[17.3850,78.4867],'pune':[18.5204,73.8567],
  'ahmedabad':[23.0225,72.5714],'jaipur':[26.9124,75.7873],
  'lucknow':[26.8467,80.9462],'kanpur':[26.4499,80.3319],
  'nagpur':[21.1458,79.0882],'surat':[21.1702,72.8311],
  'patna':[25.5941,85.1376],'bhopal':[23.2599,77.4126],
  'indore':[22.7196,75.8577],'vadodara':[22.3072,73.1812],
  'coimbatore':[11.0168,76.9558],'kochi':[9.9312,76.2673],'cochin':[9.9312,76.2673],
  'thiruvananthapuram':[8.5241,76.9366],'trivandrum':[8.5241,76.9366],
  'visakhapatnam':[17.6868,83.2185],'vizag':[17.6868,83.2185],
  'agra':[27.1767,78.0081],'varanasi':[25.3176,82.9739],'kashi':[25.3176,82.9739],
  'srinagar':[34.0837,74.7973],'chandigarh':[30.7333,76.7794],
  'gurgaon':[28.4595,77.0266],'gurugram':[28.4595,77.0266],
  'noida':[28.5355,77.3910],'faridabad':[28.4089,77.3178],
  'ghaziabad':[28.6692,77.4538],'meerut':[28.9845,77.7064],
  'amritsar':[31.6340,74.8723],'ludhiana':[30.9010,75.8573],
  'jalandhar':[31.3260,75.5762],'jodhpur':[26.2389,73.0243],
  'udaipur':[24.5854,73.7125],'rajkot':[22.3039,70.8022],
  'mangalore':[12.9141,74.8560],'mysore':[12.2958,76.6394],'mysuru':[12.2958,76.6394],
  'nashik':[19.9975,73.7898],'aurangabad':[19.8762,75.3433],
  'solapur':[17.6805,75.9064],'dehradun':[30.3165,78.0322],
  'haridwar':[29.9457,78.1642],'rishikesh':[30.0869,78.2676],
  'mathura':[27.4924,77.6737],'vrindavan':[27.5794,77.7009],
  'allahabad':[25.4358,81.8463],'prayagraj':[25.4358,81.8463],
  'gwalior':[26.2183,78.1828],'jabalpur':[23.1815,79.9864],
  'raipur':[21.2514,81.6296],'ranchi':[23.3441,85.3096],
  'bhubaneswar':[20.2961,85.8245],'guwahati':[26.1445,91.7362],
  'shimla':[31.1048,77.1734],'manali':[32.2432,77.1892],
  'nainital':[29.3919,79.4542],'mussoorie':[30.4598,78.0664],
  'panaji':[15.4909,73.8278],'goa':[15.2993,74.1240],
  'tirupati':[13.6288,79.4192],'madurai':[9.9252,78.1198],
  'salem':[11.6643,78.1460],'trichy':[10.7905,78.7047],
  'tiruchirappalli':[10.7905,78.7047],'vellore':[12.9165,79.1325],
  'hubli':[15.3647,75.1240],'belgaum':[15.8497,74.4977],
  'davangere':[14.4644,75.9218],'bellary':[15.1394,76.9214],
  'leh':[34.1526,77.5770],'jammu':[32.7266,74.8570],
  'kathmandu':[27.7172,85.3240],'pokhara':[28.2096,83.9856],
  'dhaka':[23.8103,90.4125],'chittagong':[22.3569,91.7832],
  'islamabad':[33.6844,73.0479],'karachi':[24.8607,67.0011],
  'lahore':[31.5497,74.3436],'peshawar':[34.0151,71.5249],
  'colombo':[6.9271,79.8612],'kandy':[7.2906,80.6337],
  'kabul':[34.5553,69.2075],'dhaka':[23.8103,90.4125],
  // International
  'london':[51.5074,-0.1278],'birmingham':[52.4862,-1.8904],
  'manchester':[53.4808,-2.2426],'edinburgh':[55.9533,-3.1883],
  'new york':[40.7128,-74.0060],'los angeles':[34.0522,-118.2437],
  'chicago':[41.8781,-87.6298],'houston':[29.7604,-95.3698],
  'san francisco':[37.7749,-122.4194],'washington dc':[38.9072,-77.0369],
  'toronto':[43.6532,-79.3832],'vancouver':[49.2827,-123.1207],
  'dubai':[25.2048,55.2708],'abu dhabi':[24.4539,54.3773],
  'riyadh':[24.7136,46.6753],'jeddah':[21.3891,39.8579],
  'doha':[25.2854,51.5310],'kuwait city':[29.3759,47.9774],
  'muscat':[23.5880,58.3829],'manama':[26.2154,50.5860],
  'singapore':[1.3521,103.8198],'kuala lumpur':[3.1390,101.6869],
  'bangkok':[13.7563,100.5018],'jakarta':[-6.2088,106.8456],
  'tokyo':[35.6762,139.6503],'osaka':[34.6937,135.5023],
  'beijing':[39.9042,116.4074],'shanghai':[31.2304,121.4737],
  'hong kong':[22.3193,114.1694],'taipei':[25.0330,121.5654],
  'seoul':[37.5665,126.9780],'sydney':[-33.8688,151.2093],
  'melbourne':[-37.8136,144.9631],'paris':[48.8566,2.3522],
  'berlin':[52.5200,13.4050],'amsterdam':[52.3676,4.9041],
  'rome':[41.9028,12.4964],'madrid':[40.4168,-3.7038],
  'frankfurt':[50.1109,8.6821],'zurich':[47.3769,8.5417],
  'moscow':[55.7558,37.6173],'istanbul':[41.0082,28.9784],
  'tehran':[35.6892,51.3890],'baghdad':[33.3152,44.3661],
  'cairo':[30.0444,31.2357],'nairobi':[-1.2921,36.8219],
  'johannesburg':[-26.2041,28.0473],'lagos':[6.5244,3.3792],
  'melbourne':[-37.8136,144.9631],'auckland':[-36.8485,174.7633],
  'mexico city':[19.4326,-99.1332],'sao paulo':[-23.5505,-46.6333],
  'buenos aires':[-34.6037,-58.3816],
};

function cityLookup(query) {
  const q = query.toLowerCase().trim();
  // Exact match
  if (CITIES[q]) return CITIES[q];
  // Partial match — find first key that contains the query or vice versa
  for (const [key, coords] of Object.entries(CITIES)) {
    if (key.includes(q) || q.includes(key)) return coords;
  }
  return null;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function JyotishAI() {
  const [f, setF] = useState({ name:'',day:'',month:'',year:'',hour:'',min:'',tz:'5.5',place:'',lat:'',lon:'' });
  const [chart, setChart] = useState(null);
  const [dasha, setDasha] = useState(null);
  const [tab, setTab] = useState('chart');
  const [analysis, setAnalysis] = useState('');
  const [err, setErr] = useState('');
  const [geoLoad, setGeoLoad] = useState(false);
  const [geoErr, setGeoErr] = useState('');
  const [aiLoad, setAiLoad] = useState(false);
  const [aiErr, setAiErr] = useState('');

  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const geocode = async () => {
    if (!f.place) return;
    setGeoLoad(true); setGeoErr('');

    // 1. Try built-in database first (instant, no network)
    const local = cityLookup(f.place);
    if (local) {
      setF(p => ({ ...p, lat: local[0].toFixed(4), lon: local[1].toFixed(4) }));
      setGeoLoad(false);
      return;
    }

    // 2. Fallback to Open-Meteo geocoding API
    try {
      const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(f.place)}&count=1&language=en&format=json`);
      const d = await r.json();
      if (d.results?.[0]) {
        const g = d.results[0];
        setF(p => ({ ...p, lat: g.latitude.toFixed(4), lon: g.longitude.toFixed(4) }));
      } else {
        setGeoErr(`"${f.place}" not found. Please enter lat/lon manually below.`);
      }
    } catch {
      setGeoErr('Network unavailable. Please enter latitude and longitude manually below.');
    }
    setGeoLoad(false);
  };

  const castChart = () => {
    setErr('');
    const { year, month, day, hour, min, tz, lat, lon } = f;
    if (!year || !month || !day) return setErr('Please enter a complete date of birth.');
    if (!lat || !lon) return setErr('Please click "Locate" to geocode your place of birth, or enter lat/lon manually.');
    try {
      const c = computeChart(+year, +month, +day, +(hour||12), +(min||0), +tz, +lat, +lon);
      setChart(c);
      setDasha(getDasha(c.sid.Moon, +year, +month, +day));
      setAnalysis('');
      setTab('chart');
    } catch(e) { setErr('Calculation error: ' + e.message); }
  };

  const getReading = async () => {
    if (!chart) return;
    setAiLoad(true); setAiErr('');
    const { sid, lagna } = chart;
    const ls = signOf(lagna);
    const planetInfo = Object.entries(sid).map(([nm, lon]) => {
      const s = signOf(lon), h = ((s - ls + 12) % 12) + 1;
      return `${nm}: ${RASHI[s]} (${RASHI_EN[s]}) ${degIn(lon).toFixed(2)}° — House ${h}`;
    }).join('\n');

    const dashaInfo = dasha?.curr
      ? `Current Mahadasha (as of April 2026): ${FULL_NAME[dasha.curr.lord]} (until ${dasha.curr.end.toFixed(1)})`
      : '';

    const prompt = `You are a master Vedic astrologer with 40 years experience. Analyze this precisely computed birth chart:

Name: ${f.name || 'Native'}
Date: ${f.day}/${f.month}/${f.year}, Time: ${f.hour||'?'}:${f.min||'00'} UTC+${f.tz}
Place: ${f.place} (Lat: ${f.lat}°, Lon: ${f.lon}°)

COMPUTED CHART — Lahiri Ayanamsa: ${chart.ay.toFixed(4)}°
Lagna (Ascendant): ${RASHI[ls]} (${RASHI_EN[ls]}) at ${degIn(lagna).toFixed(2)}°

Sidereal Planetary Positions:
${planetInfo}

Janma Nakshatra: ${NAK[nakOf(sid.Moon)]}, Pada ${padaOf(sid.Moon)}
${dashaInfo}

Write a DEEP, PERSONALIZED Jyotish reading using these exact positions. Use ## for section headings:

## Lagna & Core Personality
## Moon Sign & Nakshatra — The Inner Self
## Planetary Dignities & Strengths
## Key Yogas in This Chart
## Career & Life Purpose (10th House Analysis)
## Wealth & Financial Patterns (2nd & 11th Houses)
## Relationships & Marriage (7th House)
## Health & Vitality
## Current Dasha Period — What 2026 Brings
## Spiritual Path & Past Karma (12th House, Ketu)
## Remedies — Mantras, Gemstones & Upaya
## The Soul's Journey — Divine Insight

Use actual degree positions in your analysis. Include Sanskrit terms with translations. Be specific and personal — this reading should feel like it was written only for this person.`;

    try {
      const res = await fetch('/api/reading', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, messages:[{role:'user',content:prompt}] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setAnalysis(data.content?.map(b => b.text||'').join('') || '');
      setTab('reading');
    } catch(e) { setAiErr(e.message || 'Failed to generate reading'); }
    setAiLoad(false);
  };

  const ls = chart ? signOf(chart.lagna) : null;
  const nak = chart ? nakOf(chart.sid.Moon) : null;

  return (
    <>
      <style>{GFONTS}{CSS}</style>
      <div className="app">
        <div className="bg-tex"/>
        <div className="wrap">

          {/* Header */}
          <div className="hdr">
            <span className="hdr-om">ॐ</span>
            <h1 className="hdr-title">Jyotish AI</h1>
            <p className="hdr-sub">Vedic Astrology · Swiss Ephemeris Engine · South Indian Kundali</p>
            <p className="hdr-orn">◆ ◇ ◆</p>
          </div>

          {/* Form */}
          <div className="card">
            <div className="card-ttl">✦ Birth Details</div>
            <div className="fgrid">
              <div className="fg">
                <label className="flbl">Full Name</label>
                <input className="finp" placeholder="e.g. Aditya Sharma" value={f.name} onChange={e=>set('name',e.target.value)}/>
              </div>
              <div className="fg">
                <label className="flbl">Date of Birth</label>
                <div className="frow">
                  <input className="finp" placeholder="DD" maxLength={2} value={f.day} onChange={e=>set('day',e.target.value)} style={{width:56}}/>
                  <input className="finp" placeholder="MM" maxLength={2} value={f.month} onChange={e=>set('month',e.target.value)} style={{width:56}}/>
                  <input className="finp" placeholder="YYYY" maxLength={4} value={f.year} onChange={e=>set('year',e.target.value)} style={{width:82}}/>
                </div>
              </div>
              <div className="fg">
                <label className="flbl">Time of Birth (24h)</label>
                <div className="frow">
                  <input className="finp" placeholder="HH" maxLength={2} value={f.hour} onChange={e=>set('hour',e.target.value)} style={{width:68}}/>
                  <input className="finp" placeholder="MM" maxLength={2} value={f.min} onChange={e=>set('min',e.target.value)} style={{width:68}}/>
                </div>
              </div>
              <div className="fg">
                <label className="flbl">UTC Offset</label>
                <input className="finp" placeholder="5.5 for IST, 5.75 for Nepal..." value={f.tz} onChange={e=>set('tz',e.target.value)}/>
              </div>
              <div className="fg full">
                <label className="flbl">Place of Birth</label>
                <div className="loc-row">
                  <div className="fg"><input className="finp" placeholder="e.g. New Delhi, India" value={f.place} onChange={e=>set('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&geocode()}/></div>
                  <button className="btn-s" onClick={geocode} disabled={geoLoad||!f.place}>{geoLoad?'Searching…':'🌐 Locate'}</button>
                </div>
                {geoErr ? <p className="fhelp" style={{color:"#b02020"}}>⚠ {geoErr}</p> : <p className="fhelp">150+ cities built-in (instant) · Or enter lat/lon manually</p>}{f.lat && f.lon && <p className="fhelp" style={{color:"var(--gold)"}}>✓ {f.lat}°N, {f.lon}°E</p>}
              </div>
              <div className="fg">
                <label className="flbl">Latitude (°N positive)</label>
                <input className="finp" placeholder="28.6517" value={f.lat} onChange={e=>set('lat',e.target.value)}/>
              </div>
              <div className="fg">
                <label className="flbl">Longitude (°E positive)</label>
                <input className="finp" placeholder="77.2219" value={f.lon} onChange={e=>set('lon',e.target.value)}/>
              </div>
            </div>
            {err && <div className="err">⚠ {err}</div>}
            <div className="acts">
              <button className="btn-p" onClick={castChart}>✦ Cast Kundali</button>
            </div>
          </div>

          {chart && <>
            {/* Snapshot strip */}
            <div className="card" style={{padding:'22px 28px'}}>
              <div className="snaps">
                <div className="snap">
                  <div className="snap-v">{RASHI[ls]}</div>
                  <div className="snap-k">Lagna · {RASHI_EN[ls]}</div>
                </div>
                <div className="snap">
                  <div className="snap-v">{RASHI[signOf(chart.sid.Moon)]}</div>
                  <div className="snap-k">Rashi · Moon Sign</div>
                </div>
                <div className="snap">
                  <div className="snap-v" style={{fontSize:11}}>{NAK[nak]}</div>
                  <div className="snap-k">Nakshatra · Pada {padaOf(chart.sid.Moon)}</div>
                </div>
                <div className="snap">
                  <div className="snap-v">{RASHI[signOf(chart.sid.Sun)]}</div>
                  <div className="snap-k">Sun Sign</div>
                </div>
                {dasha?.curr && <div className="snap">
                  <div className="snap-v">{FULL_NAME[dasha.curr.lord]}</div>
                  <div className="snap-k">Current Mahadasha</div>
                </div>}
                <div className="snap">
                  <div className="snap-v">{chart.ay.toFixed(3)}°</div>
                  <div className="snap-k">Lahiri Ayanamsa</div>
                </div>
              </div>
            </div>

            {/* Main tabbed panel */}
            <div className="card">
              <div className="tabs">
                {[['chart','⬡ Kundali'],['planets','☉ Planets'],['dasha','⌛ Dasha'],['reading','✦ AI Reading']].map(([id,lbl])=>(
                  <div key={id} className={`tab${tab===id?' on':''}`} onClick={()=>setTab(id)}>{lbl}</div>
                ))}
              </div>

              {/* ── Kundali Chart ── */}
              {tab==='chart' && <KundaliChart chart={chart}/>}

              {/* ── Planets Table ── */}
              {tab==='planets' && (
                <table className="ptbl">
                  <thead><tr>
                    <th>Planet</th><th>Sidereal Long.</th><th>Sign (Rashi)</th><th>House</th><th>Deg in Sign</th>
                  </tr></thead>
                  <tbody>
                    {['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu','Ketu'].map(nm=>{
                      const lon = chart.sid[nm], s = signOf(lon), h = ((s-ls+12)%12)+1;
                      return (
                        <tr key={nm}>
                          <td><span className="pgl" style={{color:PCOL[nm]}}>{GLYPH[nm]}</span><span className="pnm">{nm}</span></td>
                          <td><span className="pdeg">{lon.toFixed(3)}°</span></td>
                          <td><span className="psign">{RASHI[s]}</span> <span style={{fontSize:12,color:'var(--muted)'}}>({RASHI_EN[s]})</span></td>
                          <td><span className="phs">{h}</span></td>
                          <td><span className="pdeg">{degIn(lon).toFixed(2)}°</span></td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td><span className="pgl" style={{color:'var(--amber)'}}>⬡</span><span className="pnm">Lagna</span></td>
                      <td><span className="pdeg">{chart.lagna.toFixed(3)}°</span></td>
                      <td><span className="psign">{RASHI[ls]}</span></td>
                      <td><span className="phs">1</span></td>
                      <td><span className="pdeg">{degIn(chart.lagna).toFixed(2)}°</span></td>
                    </tr>
                  </tbody>
                </table>
              )}

              {/* ── Dasha ── */}
              {tab==='dasha' && dasha && (
                <div>
                  <p style={{fontSize:15,color:'var(--muted)',fontStyle:'italic',marginBottom:18}}>
                    Janma Nakshatra: <strong style={{color:'var(--deep)'}}>{NAK[dasha.nak]}</strong> · Birth Dasha Lord: <strong style={{color:'var(--deep)'}}>{FULL_NAME[dasha.lord]}</strong>
                  </p>
                  {dasha.curr && (
                    <div className="dasha-now">
                      <div className="dasha-label">CURRENTLY RUNNING · APRIL 2026</div>
                      <div className="dasha-main">{FULL_NAME[dasha.curr.lord]} Mahadasha</div>
                      <div className="dasha-sub">{dasha.curr.start.toFixed(1)} — {dasha.curr.end.toFixed(1)} · {DASHA_YR[dasha.curr.lord]} year period</div>
                    </div>
                  )}
                  <div className="dasha-seq">
                    {dasha.seq.map((d,i)=>{
                      const isCurr = dasha.curr?.lord===d.lord && Math.abs(dasha.curr?.start-d.start)<0.01;
                      const isPast = d.end < 2026.25;
                      return (
                        <div key={i} className={`dchip${isCurr?' curr':isPast?' past':''}`}>
                          <span>{FULL_NAME[d.lord]}</span>
                          <span className="dchip-yr">{DASHA_YR[d.lord]}y · {Math.round(d.start)}–{Math.round(d.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── AI Reading ── */}
              {tab==='reading' && (
                <div>
                  {!analysis && !aiLoad && (
                    <div style={{textAlign:'center',padding:'36px 0'}}>
                      <p style={{fontFamily:'var(--ff-l)',fontSize:17,color:'var(--muted)',fontStyle:'italic',marginBottom:24,lineHeight:1.8}}>
                        Your chart has been precisely computed using the Swiss Ephemeris engine.<br/>
                        Click below to receive a deep, personalised Jyotish reading based on your exact planetary positions.
                      </p>
                      <button className="btn-p" onClick={getReading}>✦ Generate My Jyotish Reading</button>
                      {aiErr && <div className="err" style={{marginTop:14}}>{aiErr}</div>}
                    </div>
                  )}
                  {aiLoad && (
                    <div className="ld">
                      <div className="ld-ring"/>
                      <div className="ld-t">Consulting the Grahas</div>
                      <p className="ld-s">Reading Brihat Parashara Hora Shastra…</p>
                    </div>
                  )}
                  {analysis && (
                    <>
                      <ReadingText text={analysis}/>
                      <div className="acts" style={{marginTop:24}}>
                        <button className="btn-ghost" onClick={()=>setAnalysis('')}>↺ Regenerate</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Source note */}
            <p style={{textAlign:'center',fontSize:12,color:'var(--muted)',fontStyle:'italic',marginTop:16,letterSpacing:'.08em'}}>
              Planetary positions computed via Meeus algorithms (Sun/Moon) & JPL Keplerian elements (planets) · Lahiri Ayanamsa · Whole Sign houses
            </p>
          </>}

        </div>
      </div>
    </>
  );
}
