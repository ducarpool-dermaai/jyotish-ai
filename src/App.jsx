import { useState, useRef, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf6ec;--surface:#fffef8;--card:#ffffff;
  --border:rgba(155,100,12,0.16);--border2:rgba(155,100,12,0.09);
  --gold:#a0720a;--gold2:#c9921c;--amber:#d4780a;
  --deep:#241408;--text:#3a1e08;--muted:#7a5830;
  --light:#f3e8cc;--lightgold:#f7edcc;--cream:#fdf8ee;
  --red:#b02020;--redbg:rgba(160,40,40,.06);--redborder:rgba(160,40,40,.22);
  --green:#1a6e30;--greenbg:rgba(26,110,48,.06);--greenborder:rgba(26,110,48,.22);
  --ff-h:'Cinzel',serif;--ff-b:'EB Garamond',serif;--ff-l:'Cormorant Garamond',serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--ff-b);font-size:16px}
.app{min-height:100vh;background:var(--bg);position:relative}
.bg-tex{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.03;
  background-image:linear-gradient(var(--gold) 1px,transparent 1px),linear-gradient(90deg,var(--gold) 1px,transparent 1px);
  background-size:48px 48px}
.wrap{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:0 20px 72px}

.hdr{text-align:center;padding:48px 0 32px;animation:fadeD .9s ease both}
@keyframes fadeD{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
.hdr-om{font-size:38px;color:var(--gold2);margin-bottom:8px;display:block;animation:glow 4s ease infinite}
@keyframes glow{0%,100%{text-shadow:0 0 20px rgba(201,146,28,.3)}50%{text-shadow:0 0 40px rgba(201,146,28,.6)}}
.hdr-title{font-family:var(--ff-h);font-size:clamp(24px,4.5vw,40px);font-weight:500;letter-spacing:.16em;color:var(--gold);margin-bottom:6px}
.hdr-sub{font-family:var(--ff-l);font-size:13.5px;color:var(--muted);font-style:italic;letter-spacing:.2em}
.hdr-orn{color:var(--amber);font-size:11px;letter-spacing:10px;margin:12px 0 0}

.card{background:var(--card);border:1px solid var(--border);border-radius:14px;
  padding:28px 30px;box-shadow:0 2px 28px rgba(160,100,10,.07),inset 0 1px 0 rgba(255,255,255,.9);
  animation:fadeU .6s ease both}
@keyframes fadeU{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.card+.card{margin-top:16px}
@media(max-width:600px){.card{padding:18px 16px}}
.card-ttl{font-family:var(--ff-h);font-size:10px;letter-spacing:.28em;color:var(--amber);
  text-transform:uppercase;padding-bottom:12px;margin-bottom:18px;border-bottom:1px solid var(--border)}

.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:560px){.fgrid{grid-template-columns:1fr}}
.fg{display:flex;flex-direction:column;gap:5px}
.fg.full{grid-column:1/-1}
.flbl{font-family:var(--ff-h);font-size:9px;letter-spacing:.22em;color:var(--gold);text-transform:uppercase}
.finp{background:var(--bg);border:1px solid var(--border);border-radius:7px;color:var(--text);
  font-family:var(--ff-b);font-size:15px;padding:9px 12px;outline:none;width:100%;
  transition:border-color .2s,box-shadow .2s}
.finp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.1)}
.finp::placeholder{color:var(--muted);font-style:italic}
.frow{display:flex;gap:8px}
.fhelp{font-size:11px;color:var(--muted);font-style:italic;margin-top:2px}
.loc-row{display:flex;gap:8px;align-items:flex-end}
.loc-row .fg{flex:1}

.btn-p{background:linear-gradient(135deg,#c07a10,var(--gold));color:white;border:none;
  border-radius:8px;font-family:var(--ff-h);font-size:10.5px;letter-spacing:.22em;
  padding:11px 22px;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s;
  box-shadow:0 3px 18px rgba(160,100,10,.22);text-transform:uppercase}
.btn-p:hover:not(:disabled){opacity:.9;transform:translateY(-1px)}
.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-s{background:transparent;border:1.5px solid var(--gold);color:var(--gold);
  border-radius:8px;font-family:var(--ff-h);font-size:9.5px;letter-spacing:.18em;
  padding:8px 14px;cursor:pointer;transition:all .2s;text-transform:uppercase;white-space:nowrap}
.btn-s:hover:not(:disabled){background:rgba(160,100,10,.08)}
.btn-s:disabled{opacity:.4;cursor:not-allowed}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted);
  border-radius:7px;font-family:var(--ff-h);font-size:9px;letter-spacing:.18em;
  padding:7px 13px;cursor:pointer;transition:all .2s;text-transform:uppercase}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.acts{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px}

.tabs{display:flex;gap:2px;background:var(--light);border-radius:10px;padding:3px;margin-bottom:20px;flex-wrap:wrap}
.tab{flex:1;min-width:52px;padding:7px 2px;text-align:center;border-radius:7px;cursor:pointer;
  font-family:var(--ff-h);font-size:7.5px;letter-spacing:.08em;color:var(--muted);
  transition:all .2s;text-transform:uppercase;white-space:nowrap}
.tab.on{background:var(--card);color:var(--amber);box-shadow:0 1px 8px rgba(0,0,0,.09)}

.snaps{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:10px}
.snap{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:12px 10px;text-align:center;position:relative}
.snap-v{font-family:var(--ff-h);color:var(--amber);font-size:11px;letter-spacing:.08em;margin-bottom:3px;word-break:break-word;line-height:1.3}
.snap-k{font-size:10px;color:var(--muted)}
.snap-badge{position:absolute;top:-5px;right:-5px;color:white;font-family:var(--ff-h);font-size:7.5px;padding:2px 5px;border-radius:8px}
.snap-badge.warn{background:var(--red)}.snap-badge.ok{background:var(--green)}

.ptbl{width:100%;border-collapse:collapse;font-size:13.5px}
.ptbl th{font-family:var(--ff-h);font-size:8.5px;letter-spacing:.18em;color:var(--amber);text-transform:uppercase;padding:7px 9px;border-bottom:1.5px solid var(--border);text-align:left}
.ptbl td{padding:7px 9px;border-bottom:1px solid var(--border2);vertical-align:middle}
.ptbl tr:last-child td{border-bottom:none}
.ptbl tr:hover td{background:rgba(160,100,10,.03)}
.pgl{font-size:13px;margin-right:4px}.pnm{font-family:var(--ff-h);font-size:10.5px;letter-spacing:.1em;color:var(--deep)}
.psign{color:var(--amber);font-size:13px}.pdeg{color:var(--muted);font-size:11.5px;font-family:monospace}
.phs{background:var(--lightgold);color:var(--gold);border-radius:4px;padding:1px 6px;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.1em;display:inline-block}

.dasha-now{background:var(--lightgold);border:1px solid var(--gold);border-radius:10px;padding:14px 18px;margin-bottom:14px}
.dasha-label{font-family:var(--ff-h);font-size:9px;letter-spacing:.22em;color:var(--gold);margin-bottom:5px}
.dasha-main{font-family:var(--ff-h);font-size:19px;color:var(--deep)}
.dasha-sub{font-size:13px;color:var(--muted);margin-top:3px}
.dasha-seq{display:flex;gap:7px;flex-wrap:wrap}
.dchip{padding:5px 11px;border-radius:20px;font-family:var(--ff-h);font-size:9px;letter-spacing:.12em;
  border:1px solid var(--border);color:var(--muted);text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:2px}
.dchip.curr{background:var(--lightgold);color:var(--gold);border-color:var(--gold)}.dchip.past{opacity:.4}
.dchip-yr{font-size:8px;letter-spacing:.05em}

.ld{text-align:center;padding:40px}
.ld-ring{width:40px;height:40px;border-radius:50%;border:2.5px solid var(--light);border-top-color:var(--gold);animation:spin 1.1s linear infinite;margin:0 auto 14px}
@keyframes spin{to{transform:rotate(360deg)}}
.ld-t{font-family:var(--ff-h);color:var(--gold);font-size:10.5px;letter-spacing:.25em}
.ld-s{font-size:13.5px;color:var(--muted);font-style:italic;margin-top:5px}

.reading h3{font-family:var(--ff-h);color:var(--amber);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;margin:24px 0 9px;padding-bottom:7px;border-bottom:1px solid var(--border)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:16px;line-height:1.88;margin-bottom:9px;color:var(--text)}
.reading ul{list-style:none;padding:0;margin-bottom:9px}
.reading li{font-size:15px;line-height:1.82;padding-left:16px;position:relative;margin-bottom:3px;color:var(--text)}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--amber);font-size:7px;top:7px}
.hlbox{background:rgba(160,100,10,.06);border-left:3px solid var(--amber);border-radius:0 7px 7px 0;padding:12px 16px;margin:12px 0;font-style:italic;font-size:15.5px;color:var(--muted);line-height:1.8}
.err{background:var(--redbg);border:1px solid var(--redborder);border-radius:8px;padding:12px 15px;color:var(--red);font-size:13.5px;margin-top:10px}

/* ── PANCHANG ── */
.panch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:12px}
.panch-cell{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:14px 13px 12px}
.panch-lbl{font-family:var(--ff-h);font-size:8.5px;letter-spacing:.22em;color:var(--gold);text-transform:uppercase;margin-bottom:6px}
.panch-val{font-family:var(--ff-h);font-size:13.5px;color:var(--deep);letter-spacing:.06em;margin-bottom:3px;line-height:1.35}
.panch-sub{font-size:11.5px;color:var(--muted)}
.paksha{display:inline-block;padding:2px 9px;border-radius:20px;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.1em;margin-left:5px;vertical-align:middle}
.paksha-s{background:#fff8e8;color:#8a6a00;border:1px solid #d4aa40}
.paksha-k{background:#f0eef8;color:#4a3a8a;border:1px solid #8a80c0}
.rahu-slot{display:inline-block;background:#fff0f0;color:var(--red);border:1px solid var(--redborder);border-radius:7px;font-family:var(--ff-h);font-size:11px;padding:5px 12px;letter-spacing:.08em}

/* ── CHOGHADIYA ── */
.chog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px;margin-top:14px}
.chog-slot{border-radius:9px;padding:10px 13px;border:1px solid}
.chog-slot.good{background:rgba(26,110,48,.05);border-color:rgba(26,110,48,.18)}
.chog-slot.bad{background:rgba(160,40,40,.04);border-color:rgba(160,40,40,.15)}
.chog-slot.neutral{background:var(--cream);border-color:var(--border)}
.chog-name{font-family:var(--ff-h);font-size:11px;letter-spacing:.1em;color:var(--deep);margin-bottom:2px}
.chog-time{font-size:12px;color:var(--muted);font-family:monospace}
.chog-tag{font-family:var(--ff-h);font-size:8px;letter-spacing:.15em;text-transform:uppercase;margin-top:4px;display:inline-block;padding:1px 7px;border-radius:10px}
.chog-tag.good{background:rgba(26,110,48,.1);color:var(--green)}
.chog-tag.bad{background:rgba(160,40,40,.08);color:var(--red)}
.chog-tag.neutral{background:var(--lightgold);color:var(--gold)}

/* ── DOSHAS ── */
.dblock{margin-bottom:22px}.dblock:last-child{margin-bottom:0}
.dhdr{display:flex;align-items:center;gap:12px;margin-bottom:11px}
.dicon{font-size:22px;line-height:1}
.dtitle{font-family:var(--ff-h);font-size:12.5px;letter-spacing:.1em;color:var(--deep)}
.dsub{font-size:12px;color:var(--muted);font-style:italic;margin-top:2px}
.dcard{border-radius:10px;padding:16px 18px;border:1px solid}
.dcard.present{background:var(--redbg);border-color:var(--redborder)}
.dcard.absent{background:var(--greenbg);border-color:var(--greenborder)}
.dcard.warn{background:#fff8e8;border-color:#d4aa40}
.dstatus{font-family:var(--ff-h);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:7px}
.dcard.present .dstatus{color:var(--red)}.dcard.absent .dstatus{color:var(--green)}.dcard.warn .dstatus{color:#8a6a00}
.ddesc{font-size:14.5px;line-height:1.75;color:var(--text)}
.ddetail{margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,.07)}
.drow{display:flex;gap:8px;margin-bottom:5px;font-size:13px;align-items:baseline}
.dlbl{font-family:var(--ff-h);font-size:8.5px;letter-spacing:.14em;color:var(--muted);text-transform:uppercase;min-width:78px}
.dval{color:var(--deep);flex:1}
.dsep{border:none;border-top:1px solid var(--border);margin:18px 0}
.ksd-chip{display:inline-block;background:var(--lightgold);color:var(--gold);border:1px solid var(--gold);border-radius:6px;font-family:var(--ff-h);font-size:9.5px;letter-spacing:.1em;padding:3px 10px;margin-top:8px}
.sati-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}
.sphase{padding:5px 11px;border-radius:20px;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.1em;border:1px solid var(--border);color:var(--muted);text-transform:uppercase;text-align:center;line-height:1.6}
.sphase.on{background:var(--redbg);color:var(--red);border-color:var(--redborder)}.sphase.off{opacity:.4}

/* ── REMEDIES ── */
.rem-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:14px}
.rem-card{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:14px 16px}
.rem-icon{font-size:20px;margin-bottom:6px}
.rem-type{font-family:var(--ff-h);font-size:9px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:5px}
.rem-txt{font-size:14px;line-height:1.7;color:var(--text)}

/* ── AI CHAT ── */
.chat-wrap{display:flex;flex-direction:column;height:480px}
.chat-msgs{flex:1;overflow-y:auto;padding:4px 0 12px;display:flex;flex-direction:column;gap:12px}
.chat-msgs::-webkit-scrollbar{width:4px}
.chat-msgs::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.msg{max-width:85%;animation:fadeU .3s ease both}
.msg.user{align-self:flex-end}
.msg.ai{align-self:flex-start}
.msg-bubble{padding:11px 15px;border-radius:14px;font-size:14.5px;line-height:1.75}
.msg.user .msg-bubble{background:linear-gradient(135deg,#c07a10,var(--gold));color:white;border-radius:14px 14px 3px 14px}
.msg.ai .msg-bubble{background:var(--cream);border:1px solid var(--border);color:var(--text);border-radius:14px 14px 14px 3px}
.msg-label{font-family:var(--ff-h);font-size:8px;letter-spacing:.18em;color:var(--muted);text-transform:uppercase;margin-bottom:4px}
.chat-input-row{display:flex;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}
.chat-input{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:var(--ff-b);font-size:15px;padding:10px 14px;outline:none;resize:none;transition:border-color .2s}
.chat-input:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.08)}
.chat-empty{text-align:center;padding:40px 20px;font-family:var(--ff-l);font-size:16px;color:var(--muted);font-style:italic;line-height:1.8}
.chat-typing{display:flex;align-items:center;gap:5px;padding:11px 15px;background:var(--cream);border:1px solid var(--border);border-radius:14px 14px 14px 3px;align-self:flex-start}
.dot{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:dotpulse 1.4s ease infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes dotpulse{0%,60%,100%{transform:scale(1);opacity:.5}30%{transform:scale(1.3);opacity:1}}
.chat-suggestions{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.sugg{background:var(--cream);border:1px solid var(--border);border-radius:20px;padding:6px 12px;font-size:12px;color:var(--muted);cursor:pointer;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;transition:all .2s;white-space:nowrap}
.sugg:hover{border-color:var(--gold);color:var(--gold);background:var(--lightgold)}

/* ── KUNDALI MATCHING ── */
.score-circle{width:100px;height:100px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 18px;border:3px solid}
.score-num{font-family:var(--ff-h);font-size:28px;line-height:1}
.score-den{font-family:var(--ff-h);font-size:12px;opacity:.6}
.kuta-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kuta{background:var(--cream);border:1px solid var(--border);border-radius:9px;padding:10px 12px}
.kuta-name{font-family:var(--ff-h);font-size:8.5px;letter-spacing:.15em;color:var(--muted);text-transform:uppercase;margin-bottom:4px}
.kuta-score{font-family:var(--ff-h);font-size:13px;color:var(--deep)}
.kuta-max{font-size:10.5px;color:var(--muted)}
.kuta-bar{height:4px;border-radius:2px;background:var(--light);margin-top:6px;overflow:hidden}
.kuta-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--gold2),var(--amber))}
.match-verdict{text-align:center;padding:20px;border-radius:12px;margin-bottom:20px}
.verdict-title{font-family:var(--ff-h);font-size:13px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:6px}
.verdict-desc{font-size:14.5px;line-height:1.75;color:var(--text)}

/* ── DAILY TRANSITS ── */
.transit-row{display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--border2)}
.transit-row:last-child{border-bottom:none}
.tr-planet{font-family:var(--ff-h);font-size:10px;letter-spacing:.1em;color:var(--deep);width:70px;flex-shrink:0}
.tr-arrow{color:var(--muted);font-size:12px}
.tr-sign{color:var(--amber);font-size:13px;flex:1}
.tr-house{background:var(--lightgold);color:var(--gold);border-radius:4px;padding:1px 6px;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.1em}
.tr-aspect{font-size:11px;color:var(--muted)}

/* ── PDF PRINT ── */
@media print{
  .no-print{display:none!important}
  .app{background:white}
  .bg-tex{display:none}
  .card{box-shadow:none;border:1px solid #ddd;break-inside:avoid;margin-bottom:12px}
  .tabs,.acts,.chat-wrap,.chat-input-row,.sugg,.btn-p,.btn-s,.btn-ghost{display:none!important}
  .hdr{padding:20px 0 16px}
  .wrap{padding:0 10px}
  body{font-size:13px}
  .reading h3{font-size:9px}
  .reading p{font-size:13px;line-height:1.7}
}
`;

// ─── EPHEMERIS ENGINE ─────────────────────────────────────────────────────────
const R=Math.PI/180, D=180/Math.PI;
const n360=x=>((x%360)+360)%360;
function JD(y,mo,d,utH){if(mo<=2){y--;mo+=12;}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+utH/24+B-1524.5;}
const TC=jde=>(jde-2451545.0)/36525;
const eps=jde=>{const t=TC(jde);return 23.439291111-0.013004167*t-1.639e-7*t*t+5.036e-7*t*t*t;};
const GMST=jde=>{const t=TC(jde);return n360(280.46061837+360.98564736629*(jde-2451545)+3.87933e-4*t*t-t*t*t/38710000);};
const ayanamsa=jde=>23.8500+(jde-2451545.0)*50.29/(3600*365.25);
function sunLon(jde){const t=TC(jde);const L0=n360(280.46646+36000.76983*t+3.032e-4*t*t);const M=n360(357.52911+35999.05029*t-1.537e-4*t*t),Mr=M*R;const C=(1.914602-0.004817*t-0.000014*t*t)*Math.sin(Mr)+(0.019993-1.01e-4*t)*Math.sin(2*Mr)+2.89e-4*Math.sin(3*Mr);return n360(L0+C-0.00569-0.00478*Math.sin((125.04-1934.136*t)*R));}
function moonLon(jde){const t=TC(jde),t2=t*t,t3=t2*t,t4=t3*t;const Lp=n360(218.3164477+481267.88123421*t-1.5786e-3*t2+t3/538841-t4/65194000);const Dv=n360(297.8501921+445267.1114034*t-1.8819e-3*t2+t3/545868-t4/113065000);const Mv=n360(357.5291092+35999.0502909*t-1.536e-4*t2+t3/24490000);const Mp=n360(134.9633964+477198.8675055*t+8.7414e-3*t2+t3/69699-t4/14712000);const Fv=n360(93.2720950+483202.0175233*t-3.6539e-3*t2-t3/3526000+t4/863310000);const E=1-2.516e-3*t-7.4e-6*t2,E2=E*E;const T=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110]];let s=0;for(const[d,m,mp,f,c]of T){const a=(d*Dv+m*Mv+mp*Mp+f*Fv)*R;let cf=c;if(Math.abs(m)===1)cf*=E;if(Math.abs(m)===2)cf*=E2;s+=cf*Math.sin(a);}return n360(Lp+s/1e6);}
const rahuLon=jde=>{const t=TC(jde);return n360(125.0445479-1934.1362608*t+2.0754e-3*t*t+t*t*t/467441);};
const EL={Mercury:[0.38709927,3.7e-5,0.20563593,1.906e-5,7.00497902,-5.9475e-3,252.25032350,149472.67411175,77.45779628,0.16047689,48.33076593,-0.12534081],Venus:[0.72333566,3.9e-5,0.00677672,-4.107e-5,3.39467605,-7.889e-4,181.97909950,58517.81538729,131.60246718,2.6833e-3,76.67984255,-0.27769418],Earth:[1.00000261,5.62e-5,0.01671123,-4.392e-5,-1.531e-5,-0.01294668,100.46457166,35999.37244981,102.93768193,0.32327364,0.0,0.0],Mars:[1.52371034,1.847e-5,0.09339410,7.882e-5,1.84969142,-8.1313e-3,-4.55343205,19140.30268499,-23.94362959,0.44441088,49.55953891,-0.29257343],Jupiter:[5.20288700,-1.1607e-4,0.04838624,-1.3253e-4,1.30439695,-1.8371e-3,34.39644051,3034.74612775,14.72847983,0.21252668,100.47390909,0.20469106],Saturn:[9.53667594,-1.2506e-3,0.05386179,-5.0991e-4,2.48599187,1.9361e-3,49.95424423,1222.49362201,92.59887831,-0.41897216,113.66242448,-0.28867794]};
function keplSolve(M,e){let E=M;for(let i=0;i<60;i++){const dE=(M-E+e*Math.sin(E))/(1-e*Math.cos(E));E+=dE;if(Math.abs(dE)<1e-12)break;}return E;}
function helioXYZ(t,el){const[a0,da,e0,de,i0,di,L0,dL,w0,dw,N0,dN]=el;const a=a0+da*t,e=e0+de*t,I=(i0+di*t)*R,L=n360(L0+dL*t)*R,w=n360(w0+dw*t)*R,N=n360(N0+dN*t)*R,om=w-N,M=n360((L-w)*D)*R,E=keplSolve(M,e),xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E);const[cN,sN,cI,sI,cO,sO]=[Math.cos(N),Math.sin(N),Math.cos(I),Math.sin(I),Math.cos(om),Math.sin(om)];return{x:(cN*cO-sN*sO*cI)*xp+(-cN*sO-sN*cO*cI)*yp,y:(sN*cO+cN*sO*cI)*xp+(-sN*sO+cN*cO*cI)*yp,z:sO*sI*xp+cO*sI*yp};}
function planetLon(jde,name){const t=TC(jde),p=helioXYZ(t,EL[name]),e=helioXYZ(t,EL.Earth);return n360(Math.atan2(p.y-e.y,p.x-e.x)*D);}
function calcLagna(jde,lat,lon){const LST=n360(GMST(jde)+lon)*R,e=eps(jde)*R,phi=lat*R;return n360(Math.atan2(Math.cos(LST),-(Math.sin(LST)*Math.cos(e)+Math.sin(e)*Math.tan(phi)))*D);}
function computeChart(year,month,day,hour,min,tz,lat,lon){const utH=hour+min/60-tz,jde=JD(year,month,day,utH),ay=ayanamsa(jde);const trop={Sun:sunLon(jde),Moon:moonLon(jde),Mercury:planetLon(jde,'Mercury'),Venus:planetLon(jde,'Venus'),Mars:planetLon(jde,'Mars'),Jupiter:planetLon(jde,'Jupiter'),Saturn:planetLon(jde,'Saturn'),Rahu:rahuLon(jde),Ketu:n360(rahuLon(jde)+180)};const sid={};for(const[k,v]of Object.entries(trop))sid[k]=n360(v-ay);return{trop,sid,lagna:n360(calcLagna(jde,lat,lon)-ay),jde,ay};}

// ─── VEDIC CONSTANTS ─────────────────────────────────────────────────────────
const RASHI=['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
const RASHI_EN=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RASHI_SH=['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];
const NAK=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const NAK_LORD=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const DASHA_YR={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
const DASHA_SEQ=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const FULL_NAME={Ke:'Ketu',Ve:'Venus',Su:'Sun',Mo:'Moon',Ma:'Mars',Ra:'Rahu',Ju:'Jupiter',Sa:'Saturn',Me:'Mercury'};
const GLYPH={Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const PCOL={Sun:'#b07000',Moon:'#3b6faa',Mercury:'#1f7a45',Venus:'#aa2a7a',Mars:'#b02020',Jupiter:'#886000',Saturn:'#6040a0',Rahu:'#444',Ketu:'#666'};
const TITHI_N=['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima','Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Amavasya'];
const YOGA_N=['Vishkumbha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];
const YOGA_BAD=new Set(['Vishkumbha','Atiganda','Shula','Ganda','Vyaghata','Vajra','Vyatipata','Parigha','Vaidhriti']);
const KARAN_REP=['Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti'];
const VARA_N=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const VARA_S=['Ravi','Soma','Mangala','Budha','Guru','Shukra','Shani'];
const VARA_L=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const RAHU_SLOT=[8,2,7,5,6,4,3];
const KSD_N=['Ananta','Kulika','Vasuki','Shankhapala','Padma','Mahapadma','Takshaka','Karkotaka','Shankhachuda','Ghatak','Vishdhar','Sheshanaga'];
const signOf=lon=>Math.floor(n360(lon)/30);
const degIn=lon=>n360(lon)%30;
const nakOf=lon=>Math.floor(n360(lon)/(360/27));
const padaOf=lon=>Math.floor((n360(lon)%(360/27))/(360/108))+1;

// ─── PANCHANG ─────────────────────────────────────────────────────────────────
function computePanchang(jde,ay){
  const sunS=n360(sunLon(jde)-ay),moonS=n360(moonLon(jde)-ay);
  const diff=n360(moonS-sunS);
  const tithiIdx=Math.floor(diff/12);
  const paksha=tithiIdx<15?'Shukla Paksha':'Krishna Paksha';
  const vara=Math.floor(jde+1.5)%7;
  const nak=nakOf(moonS);
  const yogaIdx=Math.floor(n360(sunS+moonS)/(360/27))%27;
  const karIdx=Math.floor(diff/6)%60;
  const karana=karIdx===0?'Kimstughna':karIdx<=56?KARAN_REP[(karIdx-1)%7]:['Shakuni','Chatushpada','Naga'][karIdx-57]||'Naga';
  const slot=RAHU_SLOT[vara]-1;
  const rhs=6+slot*1.5, rhe=rhs+1.5;
  const fmtH=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return`${hh}:${mm.toString().padStart(2,'0')} ${hh<12?'AM':'PM'}`;};
  return{tithi:TITHI_N[tithiIdx],tithiNum:tithiIdx<15?tithiIdx+1:tithiIdx-14,paksha,vara,varaName:VARA_N[vara],varaLord:VARA_L[vara],varaLordS:VARA_S[vara],nakName:NAK[nak],nak,yogaName:YOGA_N[yogaIdx],yogaBad:YOGA_BAD.has(YOGA_N[yogaIdx]),karana,rahuKala:`${fmtH(rhs)} – ${fmtH(rhe)}`,sunSign:signOf(sunS),moonSign:signOf(moonS)};
}

// ─── CHOGHADIYA ───────────────────────────────────────────────────────────────
// Choghadiya slots for each vara (day of week), day period
const CHOG_DAY = [
  ['Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg'],
  ['Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit'],
  ['Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog'],
  ['Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh'],
  ['Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh'],
  ['Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char'],
  ['Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal'],
];
const CHOG_QUAL={Amrit:'good',Shubh:'good',Labh:'good',Char:'good',Kaal:'bad',Rog:'bad',Udveg:'bad',Vishti:'bad'};
const CHOG_MEANING={Amrit:'Nectar — Highly Auspicious',Shubh:'Auspicious — Good for all work',Labh:'Profit — Business, Investments',Char:'Movement — Travel, Social',Kaal:'Death — Avoid new starts',Rog:'Disease — Avoid health matters',Udveg:'Anxiety — Avoid big decisions',Vishti:'Bhadra — Inauspicious'};
function computeChoghadiya(vara, sunriseH=6){
  const slotLen=1.5;
  return CHOG_DAY[vara].map((name,i)=>{
    const start=sunriseH+i*slotLen, end=start+slotLen;
    const fmtH=h=>{const hh=Math.floor(h%24),mm=Math.round((h-Math.floor(h))*60);return`${hh}:${mm.toString().padStart(2,'0')}`;};
    return{name,qual:CHOG_QUAL[name]||'neutral',meaning:CHOG_MEANING[name],time:`${fmtH(start)} – ${fmtH(end)}`};
  });
}

// ─── DOSHA CALCULATIONS ───────────────────────────────────────────────────────
function checkMangal(sid,lagna){const ls=signOf(lagna),ms=signOf(sid.Mars),mh=((ms-ls+12)%12)+1;const dosha=[1,2,4,7,8,12].includes(mh);const exc=[];if([0,7].includes(ms))exc.push('Mars in own sign — neutralised');if(ms===9)exc.push('Mars exalted in Capricorn');if(signOf(sid.Jupiter)===ms)exc.push('Jupiter conjunct Mars');if([3,4].includes(ls))exc.push('Cancer/Leo Lagna exception');return{dosha,effective:dosha&&exc.length===0,marsHouse:mh,marsSign:ms,exc};}
function checkKSD(sid){const rahu=sid.Rahu;const planets=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];const inR2K=p=>n360(sid[p]-rahu)<180;const inK2R=p=>n360(sid[p]-rahu)>180;const allR2K=planets.every(inR2K),allK2R=planets.every(inK2R);const hasKSD=allR2K||allK2R;const rahuSign=signOf(rahu);return{hasKSD,ksdType:KSD_N[rahuSign],direction:allR2K?'All planets between Rahu and Ketu':allK2R?'All planets between Ketu and Rahu':null,rahuSign,partial:planets.filter(inR2K).length};}
function checkSati(sid){const todayJDE=JD(2026,4,2,6),todayAy=ayanamsa(todayJDE);const satNow=n360(planetLon(todayJDE,'Saturn')-todayAy);const satSign=signOf(satNow),moonSign=signOf(sid.Moon);const diff=(satSign-moonSign+12)%12;const inSati=diff===0||diff===1||diff===11;const inDhaiya=diff===3||diff===7;const phase=diff===11?'Rising Phase':diff===0?'Peak Phase':diff===1?'Setting Phase':null;const phases=[{name:'Rising',sign:RASHI[(moonSign+11)%12],active:diff===11},{name:'Peak',sign:RASHI[moonSign],active:diff===0},{name:'Setting',sign:RASHI[(moonSign+1)%12],active:diff===1}];return{inSati,inDhaiya,phase,satSign,satSignName:RASHI[satSign],moonSign,moonSignName:RASHI[moonSign],phases};}

// ─── DASHA ────────────────────────────────────────────────────────────────────
function getDasha(mlon,yr,mo,dy){const nak=nakOf(mlon),lord=NAK_LORD[nak],nakLen=360/27;const frac=(n360(mlon)%nakLen)/nakLen,yrsUsed=frac*DASHA_YR[lord];const bd=yr+(mo-1)/12+(dy-1)/365.25,fs=bd-yrsUsed;const idx=DASHA_SEQ.indexOf(lord),seq=[];let cur=fs;for(let i=0;i<9;i++){const d=DASHA_SEQ[(idx+i)%9];seq.push({lord:d,start:cur,end:cur+DASHA_YR[d]});cur+=DASHA_YR[d];}const NOW=2026.25;return{nak,lord,seq,curr:seq.find(s=>s.start<=NOW&&s.end>NOW)};}

// ─── TODAY'S TRANSITS (April 2026) ───────────────────────────────────────────
function computeTransits(natalLagna) {
  const jde = JD(2026,4,2,6), ay = ayanamsa(jde);
  const ls = signOf(natalLagna);
  const planets = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu'];
  const today = {};
  today.Sun = n360(sunLon(jde)-ay);
  today.Moon = n360(moonLon(jde)-ay);
  today.Rahu = n360(rahuLon(jde)-ay);
  ['Mercury','Venus','Mars','Jupiter','Saturn'].forEach(p=>{today[p]=n360(planetLon(jde,p)-ay);});
  return planets.map(p=>{
    const lon=today[p], sign=signOf(lon), house=((sign-ls+12)%12)+1;
    return{planet:p, lon, sign, signName:RASHI[sign], signEn:RASHI_EN[sign], house, deg:degIn(lon).toFixed(1)};
  });
}

// ─── KUNDALI MATCHING (36 Guna / Ashta Kuta) ─────────────────────────────────
// Nakshatra-level data
const NAK_GANA=[0,1,2,0,0,1,0,0,2,1,0,0,0,1,0,0,0,2,2,0,0,0,2,1,0,0,0]; // 0=Dev,1=Manushya,2=Rakshasa
const NAK_NADI=[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2]; // 0=Adi,1=Madhya,2=Antya
const NAK_YONI=[0,1,2,3,4,5,6,7,8,9,10,10,11,12,6,12,13,14,3,1,0,7,9,2,11,4,13]; // animal index
// Yoni pairs: 0=Horse,1=Elephant,2=Sheep,3=Snake,4=Dog,5=Cat,6=Rat,7=Cow,8=Buffalo,9=Tiger,10=Hare,11=Monkey,12=Mongoose,13=Lion,14=Horse(female)
const YONI_ENEMY={0:[4],1:[9],2:[13],3:[14],4:[0],5:[6],6:[5],7:[9],8:[9],9:[0,1,7,8],10:[12],11:[3],12:[10],13:[2]};
const VARNA={0:2,1:1,2:0,3:3,4:2,5:1,6:0,7:3,8:2,9:1,10:0,11:3}; // per sign 0=Shudra,1=Vaishya,2=Kshatriya,3=Brahmin
const SIGN_LORD={0:'Mars',1:'Venus',2:'Mercury',3:'Moon',4:'Sun',5:'Mercury',6:'Venus',7:'Mars',8:'Jupiter',9:'Saturn',10:'Saturn',11:'Jupiter'};
const PL_FRIEND={Sun:['Moon','Mars','Jupiter'],Moon:['Sun','Mercury'],Mars:['Sun','Moon','Jupiter'],Mercury:['Sun','Venus'],Jupiter:['Sun','Moon','Mars'],Venus:['Mercury','Saturn'],Saturn:['Mercury','Venus']};
const PL_ENEMY={Sun:['Venus','Saturn'],Moon:['Rahu'],Mars:['Mercury'],Mercury:['Moon'],Jupiter:['Mercury','Venus'],Venus:['Sun','Moon'],Saturn:['Sun','Moon','Mars']};
function plRelation(a,b){if((PL_FRIEND[a]||[]).includes(b))return 'friend';if((PL_ENEMY[a]||[]).includes(b))return 'enemy';return 'neutral';}

function computeKutas(boy, girl) {
  // boy/girl = {moonSign, moonNak} 
  const {moonSign:bs,moonNak:bn} = boy;
  const {moonSign:gs,moonNak:gn} = girl;

  // 1. Varna (1 pt): boy varna >= girl varna
  const varna = VARNA[bs]>=VARNA[gs] ? 1 : 0;

  // 2. Vashya (2 pts): simplified compatibility
  // Groups: 0=chatushpad(Ar,Ta,Le,Cp), 1=nara(Ge,Vi,Li,Sg,Aq), 2=jalachara(Ca,Pi), 3=keeta(Sc), 4=vanachara(Le)
  const VASHYA_G={0:0,1:0,2:1,3:2,4:0,5:1,6:1,7:3,8:1,9:0,10:1,11:2};
  const bg=VASHYA_G[bs],gg=VASHYA_G[gs];
  let vashya=0;
  if(bg===gg)vashya=2;
  else if((bg===0&&gg===1)||(bg===1&&gg===0))vashya=1;
  else if(bg===2&&gg!==3)vashya=1;

  // 3. Tara (3 pts): count from boy's nak to girl's and vice versa
  const b2g=((gn-bn+27)%27)+1;
  const g2b=((bn-gn+27)%27)+1;
  const taraGood=r=>[1,3,5,7].includes(r%9||9);
  const tara=(taraGood(b2g)?1.5:0)+(taraGood(g2b)?1.5:0);

  // 4. Yoni (4 pts): nakshatra animal compatibility
  const by=NAK_YONI[bn],gy=NAK_YONI[gn];
  let yoni=4;
  if(by===gy)yoni=4;
  else if((YONI_ENEMY[by]||[]).includes(gy))yoni=0;
  else yoni=2;

  // 5. Graha Maitri (5 pts): moon sign lord friendship
  const bl=SIGN_LORD[bs],gl=SIGN_LORD[gs];
  const br=plRelation(bl,gl),gr=plRelation(gl,bl);
  let graha=0;
  if(br==='friend'&&gr==='friend')graha=5;
  else if(br==='friend'&&gr==='neutral')graha=4;
  else if(br==='neutral'&&gr==='friend')graha=4;
  else if(br==='neutral'&&gr==='neutral')graha=3;
  else if(br==='friend'&&gr==='enemy')graha=1;
  else if(br==='enemy'&&gr==='friend')graha=1;
  else graha=0;

  // 6. Gana (6 pts)
  const bg2=NAK_GANA[bn],gg2=NAK_GANA[gn]; // 0=Dev,1=Man,2=Rak
  let gana=0;
  if(bg2===gg2)gana=6;
  else if(bg2===0&&gg2===1)gana=5;
  else if(bg2===1&&gg2===0)gana=5;
  else if(bg2===0&&gg2===2)gana=1;
  else if(bg2===2&&gg2===0)gana=1;
  else if(bg2===1&&gg2===2)gana=0;
  else if(bg2===2&&gg2===1)gana=0;

  // 7. Bhakuta (7 pts): based on relative sign positions
  const rel=(gs-bs+12)%12+1;
  const relRev=(bs-gs+12)%12+1;
  const bad67=[[6,8],[8,6],[5,9],[9,5],[3,11],[11,3],[1,2],[2,1],[12,2],[2,12]];
  const isBad=bad67.some(([a,b])=>a===rel&&b===relRev);
  const bhakuta=isBad?0:7;

  // 8. Nadi (8 pts): must be different
  const bn_=NAK_NADI[bn],gn_=NAK_NADI[gn];
  const nadi=bn_===gn_?0:8;
  const nadiNames=['Adi','Madhya','Antya'];

  const total=varna+vashya+tara+yoni+graha+gana+bhakuta+nadi;
  return{
    total:Math.round(total*10)/10,
    kutas:[
      {name:'Varna',score:varna,max:1,desc:'Spiritual compatibility'},
      {name:'Vashya',score:vashya,max:2,desc:'Mutual dominance & attraction'},
      {name:'Tara',score:tara,max:3,desc:'Health & longevity'},
      {name:'Yoni',score:yoni,max:4,desc:'Physical & intimate compatibility'},
      {name:'Graha Maitri',score:graha,max:5,desc:'Mental compatibility'},
      {name:'Gana',score:gana,max:6,desc:'Temperament match'},
      {name:'Bhakuta',score:bhakuta,max:7,desc:'Emotional & financial harmony'},
      {name:'Nadi',score:nadi,max:8,desc:'Health & progeny (critical)'},
    ],
    nadiDosha: nadi===0,
    ganaDosha: gana===0,
    nadiStr: `${nadiNames[bn_]} × ${nadiNames[gn_]}`,
    ganaStr: `${['Dev','Manushya','Rakshasa'][bg2]} × ${['Dev','Manushya','Rakshasa'][gg2]}`,
  };
}

// ─── KUNDALI SVG ──────────────────────────────────────────────────────────────
const SI_POS=[[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];
function KundaliChart({chart}){
  if(!chart)return null;
  const{sid,lagna}=chart,ls=signOf(lagna);
  const bySign=Array.from({length:12},()=>[]);
  const abbr={Sun:'Su',Moon:'Mo',Mercury:'Me',Venus:'Ve',Mars:'Ma',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};
  const col={Su:'#b07000',Mo:'#3b6faa',Me:'#1a7a40',Ve:'#aa2a7a',Ma:'#b02020',Ju:'#886000',Sa:'#6040a0',Ra:'#444',Ke:'#666'};
  for(const[n,l]of Object.entries(sid))bySign[signOf(l)].push(abbr[n]);
  return(
    <svg viewBox="0 0 400 400" style={{width:'100%',maxWidth:400,display:'block',margin:'0 auto'}}>
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffef8"/><stop offset="100%" stopColor="#fdf5e2"/></linearGradient>
        <linearGradient id="cgL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffaec"/><stop offset="100%" stopColor="#f9e9b8"/></linearGradient>
        <linearGradient id="cgC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fdf9ee"/><stop offset="100%" stopColor="#faf1d8"/></linearGradient>
      </defs>
      {SI_POS.map(([c,r],sign)=>{
        const x=c*100,y=r*100,isL=sign===ls,house=((sign-ls+12)%12)+1,pl=bySign[sign];
        return(<g key={sign}>
          <rect x={x+.5} y={y+.5} width={99} height={99} fill={isL?'url(#cgL)':'url(#cg1)'} stroke={isL?'#a0720a':'#d4b060'} strokeWidth={isL?1.6:.7}/>
          {isL&&<><line x1={x+1.5} y1={y+1.5} x2={x+22} y2={y+1.5} stroke="#a0720a" strokeWidth="2"/><line x1={x+1.5} y1={y+1.5} x2={x+1.5} y2={y+22} stroke="#a0720a" strokeWidth="2"/></>}
          <text x={x+50} y={y+12.5} textAnchor="middle" fontSize="8.5" fill="#8a6020" fontFamily="Cinzel,serif" fontWeight="500">{RASHI_SH[sign]}</text>
          <text x={x+96} y={y+12.5} textAnchor="end" fontSize="8" fill="#b09060" fontFamily="serif">{house}</text>
          {pl.map((ab,i)=><text key={i} x={x+7+(i%2)*42} y={y+28+Math.floor(i/2)*15} fontSize="10.5" fill={col[ab]||'#3a1e08'} fontFamily="Cinzel,serif" fontWeight="500">{ab}</text>)}
        </g>);
      })}
      <rect x={100.5} y={100.5} width={199} height={199} fill="url(#cgC)" stroke="#d4b060" strokeWidth=".6"/>
      <line x1={100} y1={100} x2={300} y2={300} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <line x1={300} y1={100} x2={100} y2={300} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <text x={200} y={194} textAnchor="middle" fontSize="24" fill="#c9a84c" fontFamily="serif" opacity=".9">ॐ</text>
      <text x={200} y={212} textAnchor="middle" fontSize="7.5" fill="#b8860b" fontFamily="Cinzel,serif" letterSpacing="2.5">KUNDALI</text>
    </svg>);
}

function ReadingText({text}){const secs=[];let cur=null;text.split('\n').forEach(line=>{const t=line.trim();if(!t)return;if(t.startsWith('## ')){if(cur)secs.push(cur);cur={title:t.slice(3),items:[]};}else if(t.startsWith('# ')){}else{if(!cur)cur={title:null,items:[]};cur.items.push(t);}});if(cur)secs.push(cur);return(<div className="reading">{secs.map((s,i)=>(<div key={i}>{s.title&&<h3>{s.title}</h3>}{s.items.map((it,j)=>{if(it.startsWith('- ')||it.startsWith('• '))return<ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;if(it.startsWith('"')||it.startsWith('\u201c'))return<div key={j} className="hlbox">{it}</div>;return<p key={j}>{it}</p>;})}</div>))}</div>);}

// ─── CITY LOOKUP ─────────────────────────────────────────────────────────────
const CITIES={'delhi':[28.6517,77.2219],'new delhi':[28.6517,77.2219],'mumbai':[19.0760,72.8777],'bombay':[19.0760,72.8777],'bangalore':[12.9716,77.5946],'bengaluru':[12.9716,77.5946],'chennai':[13.0827,80.2707],'kolkata':[22.5726,88.3639],'hyderabad':[17.3850,78.4867],'pune':[18.5204,73.8567],'ahmedabad':[23.0225,72.5714],'jaipur':[26.9124,75.7873],'lucknow':[26.8467,80.9462],'kanpur':[26.4499,80.3319],'nagpur':[21.1458,79.0882],'surat':[21.1702,72.8311],'patna':[25.5941,85.1376],'bhopal':[23.2599,77.4126],'indore':[22.7196,75.8577],'kochi':[9.9312,76.2673],'thiruvananthapuram':[8.5241,76.9366],'trivandrum':[8.5241,76.9366],'visakhapatnam':[17.6868,83.2185],'vizag':[17.6868,83.2185],'agra':[27.1767,78.0081],'varanasi':[25.3176,82.9739],'srinagar':[34.0837,74.7973],'chandigarh':[30.7333,76.7794],'gurgaon':[28.4595,77.0266],'gurugram':[28.4595,77.0266],'noida':[28.5355,77.3910],'amritsar':[31.6340,74.8723],'jodhpur':[26.2389,73.0243],'udaipur':[24.5854,73.7125],'mysore':[12.2958,76.6394],'nashik':[19.9975,73.7898],'dehradun':[30.3165,78.0322],'haridwar':[29.9457,78.1642],'rishikesh':[30.0869,78.2676],'varanasi':[25.3176,82.9739],'prayagraj':[25.4358,81.8463],'goa':[15.2993,74.1240],'tirupati':[13.6288,79.4192],'madurai':[9.9252,78.1198],'coimbatore':[11.0168,76.9558],'leh':[34.1526,77.5770],'jammu':[32.7266,74.8570],'kathmandu':[27.7172,85.3240],'dhaka':[23.8103,90.4125],'islamabad':[33.6844,73.0479],'karachi':[24.8607,67.0011],'lahore':[31.5497,74.3436],'colombo':[6.9271,79.8612],'dubai':[25.2048,55.2708],'abu dhabi':[24.4539,54.3773],'riyadh':[24.7136,46.6753],'doha':[25.2854,51.5310],'singapore':[1.3521,103.8198],'kuala lumpur':[3.1390,101.6869],'bangkok':[13.7563,100.5018],'tokyo':[35.6762,139.6503],'beijing':[39.9042,116.4074],'hong kong':[22.3193,114.1694],'london':[51.5074,-0.1278],'new york':[40.7128,-74.0060],'los angeles':[34.0522,-118.2437],'toronto':[43.6532,-79.3832],'sydney':[-33.8688,151.2093],'paris':[48.8566,2.3522],'berlin':[52.5200,13.4050],'dubai':[25.2048,55.2708],'moscow':[55.7558,37.6173],'istanbul':[41.0082,28.9784],'cape town':[-33.9249,18.4241],'nairobi':[-1.2921,36.8219]};
function cityLookup(q){const s=q.toLowerCase().trim();if(CITIES[s])return CITIES[s];for(const[k,v]of Object.entries(CITIES))if(k.includes(s)||s.includes(k))return v;return null;}

// ─── API CALL ─────────────────────────────────────────────────────────────────
async function callClaude(messages, max_tokens=1000){
  const res=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens,messages})});
  const data=await res.json();
  if(data.error)throw new Error(data.error.message);
  return data.content?.map(b=>b.text||'').join('')||'';
}

function buildChartContext(chart, f, dasha, doshas, panch) {
  if(!chart)return'';
  const{sid,lagna}=chart,ls=signOf(lagna);
  const pi=Object.entries(sid).map(([nm,l])=>`${nm}: ${RASHI[signOf(l)]} ${degIn(l).toFixed(1)}° H${((signOf(l)-ls+12)%12)+1}`).join(', ');
  return `CHART: ${f.name||'Native'} | ${f.day}/${f.month}/${f.year} ${f.hour||'12'}:${f.min||'00'} UTC+${f.tz} | ${f.place}
Lagna: ${RASHI[ls]} | Moon: ${RASHI[signOf(sid.Moon)]} | Nakshatra: ${NAK[nakOf(sid.Moon)]} Pada ${padaOf(sid.Moon)}
Planets: ${pi}
${dasha?.curr?`Mahadasha: ${FULL_NAME[dasha.curr.lord]} (${dasha.curr.start.toFixed(1)}–${dasha.curr.end.toFixed(1)})`:''}
${panch?`Birth Panchang: ${panch.tithi} ${panch.paksha}, ${panch.varaName}, ${panch.nakName} Nakshatra, ${panch.yogaName} Yoga`:''}
${doshas?`Doshas: Mangal ${doshas.mangal.effective?'Present H'+doshas.mangal.marsHouse:'Absent'} | KSD: ${doshas.ksd.hasKSD?doshas.ksd.ksdType:'Absent'} | Sade Sati: ${doshas.sati.inSati?doshas.sati.phase:'Absent'}`:''}`;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function JyotishAI() {
  const [f,setF]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'5.5',place:'',lat:'',lon:''});
  const [chart,setChart]=useState(null);
  const [dasha,setDasha]=useState(null);
  const [panch,setPanch]=useState(null);
  const [doshas,setDoshas]=useState(null);
  const [tab,setTab]=useState('chart');
  const [analysis,setAnalysis]=useState('');
  const [err,setErr]=useState('');
  const [geoLoad,setGeoLoad]=useState(false);
  const [geoErr,setGeoErr]=useState('');
  const [aiLoad,setAiLoad]=useState(false);
  const [aiErr,setAiErr]=useState('');

  // AI Chat
  const [chatMsgs,setChatMsgs]=useState([]);
  const [chatInput,setChatInput]=useState('');
  const [chatLoading,setChatLoading]=useState(false);
  const chatEndRef=useRef(null);

  // Kundali Matching
  const [partner,setPartner]=useState({name:'',day:'',month:'',year:'',hour:'12',min:'00',tz:'5.5',place:'',lat:'',lon:''});
  const [matchResult,setMatchResult]=useState(null);
  const [matchLoad,setMatchLoad]=useState(false);
  const [pGeoLoad,setPGeoLoad]=useState(false);
  const [pGeoErr,setPGeoErr]=useState('');

  // Transits
  const [transits,setTransits]=useState(null);
  const [transitReading,setTransitReading]=useState('');
  const [transitLoad,setTransitLoad]=useState(false);

  // Remedies
  const [remedies,setRemedies]=useState('');
  const [remLoad,setRemLoad]=useState(false);

  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const setP=(k,v)=>setPartner(p=>({...p,[k]:v}));

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:'smooth'});},[chatMsgs,chatLoading]);

  const geocode=async()=>{if(!f.place)return;setGeoLoad(true);setGeoErr('');const local=cityLookup(f.place);if(local){setF(p=>({...p,lat:local[0].toFixed(4),lon:local[1].toFixed(4)}));setGeoLoad(false);return;}try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(f.place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0]){const g=d.results[0];setF(p=>({...p,lat:g.latitude.toFixed(4),lon:g.longitude.toFixed(4)}));}else setGeoErr(`"${f.place}" not found. Enter lat/lon manually.`);}catch{setGeoErr('Network unavailable. Enter lat/lon manually.');}setGeoLoad(false);};

  const geocodePartner=async()=>{if(!partner.place)return;setPGeoLoad(true);setPGeoErr('');const local=cityLookup(partner.place);if(local){setPartner(p=>({...p,lat:local[0].toFixed(4),lon:local[1].toFixed(4)}));setPGeoLoad(false);return;}try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(partner.place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0]){const g=d.results[0];setPartner(p=>({...p,lat:g.latitude.toFixed(4),lon:g.longitude.toFixed(4)}));}else setPGeoErr(`Not found.`);}catch{setPGeoErr('Network error.');}setPGeoLoad(false);};

  const castChart=()=>{
    setErr('');
    const{year,month,day,hour,min,tz,lat,lon}=f;
    if(!year||!month||!day)return setErr('Please enter date of birth.');
    if(!lat||!lon)return setErr('Please locate your birth place or enter lat/lon manually.');
    try{
      const c=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);
      setChart(c);setDasha(getDasha(c.sid.Moon,+year,+month,+day));
      setPanch(computePanchang(c.jde,c.ay));
      setDoshas({mangal:checkMangal(c.sid,c.lagna),ksd:checkKSD(c.sid),sati:checkSati(c.sid)});
      setTransits(computeTransits(c.lagna));
      setAnalysis('');setChatMsgs([]);setMatchResult(null);setTransitReading('');setRemedies('');setTab('chart');
    }catch(e){setErr('Calculation error: '+e.message);}
  };

  const getReading=async()=>{
    if(!chart)return;setAiLoad(true);setAiErr('');
    const ctx=buildChartContext(chart,f,dasha,doshas,panch);
    const prompt=`You are a master Vedic astrologer. Based on this precisely computed chart, write a deep personalised Jyotish reading.\n\n${ctx}\n\nUse ## headings:\n## Lagna & Personality\n## Moon, Nakshatra & Inner Self\n## Key Yogas\n## Doshas & Their Influence\n## Career & Dharma\n## Wealth & Artha\n## Relationships & Marriage\n## Current Dasha — 2026 Outlook\n## Remedies & Upaya\n## Divine Insight\n\nReference exact degrees. Include Sanskrit terms with meanings. Make it specific to this chart.`;
    try{setAnalysis(await callClaude([{role:'user',content:prompt}]));setTab('reading');}catch(e){setAiErr(e.message);}
    setAiLoad(false);
  };

  const sendChat=async(inputText)=>{
    const text=inputText||chatInput;
    if(!text.trim()||chatLoading)return;
    setChatInput('');
    const userMsg={role:'user',content:text};
    const newMsgs=[...chatMsgs,userMsg];
    setChatMsgs(newMsgs);
    setChatLoading(true);
    const ctx=buildChartContext(chart,f,dasha,doshas,panch);
    const sysPreamble={role:'user',content:`You are a Vedic astrologer (Jyotish Acharya). Answer questions about this person's chart. Be specific, reference actual planets and degrees. Keep answers concise (150-250 words).\n\n${ctx}`};
    const assistantAck={role:'assistant',content:'Understood. I have your complete chart details and will answer all questions based on your precise Jyotish positions.'};
    const history=[sysPreamble,assistantAck,...newMsgs];
    try{
      const reply=await callClaude(history,600);
      setChatMsgs(p=>[...p,{role:'assistant',content:reply}]);
    }catch(e){setChatMsgs(p=>[...p,{role:'assistant',content:'I apologize — could not connect to the astrological consultation service. Please try again.'}]);}
    setChatLoading(false);
  };

  const doMatch=async()=>{
    if(!chart)return;
    const{year,month,day,hour,min,tz,lat,lon}=partner;
    if(!year||!month||!day||!lat||!lon)return;
    setMatchLoad(true);
    try{
      const pc=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);
      const boy={moonSign:signOf(chart.sid.Moon),moonNak:nakOf(chart.sid.Moon)};
      const girl={moonSign:signOf(pc.sid.Moon),moonNak:nakOf(pc.sid.Moon)};
      setMatchResult({kutas:computeKutas(boy,girl),boyMoon:{sign:signOf(chart.sid.Moon),nak:nakOf(chart.sid.Moon)},girlMoon:{sign:signOf(pc.sid.Moon),nak:nakOf(pc.sid.Moon)}});
    }catch(e){console.error(e);}
    setMatchLoad(false);
  };

  const getTransitReading=async()=>{
    if(!transits||!chart)return;setTransitLoad(true);
    const ctx=buildChartContext(chart,f,dasha,doshas,panch);
    const tStr=transits.map(t=>`${t.planet} in ${t.signName} (${t.signEn}) → House ${t.house} (${t.deg}° in sign)`).join('\n');
    const prompt=`You are a Vedic astrologer. Analyze today's planetary transits (April 2026) against this natal chart:\n\n${ctx}\n\nToday's Transits (April 2026):\n${tStr}\n\nWrite a concise transit reading (use ## sections):\n## Most Significant Transit Influences Right Now\n## Career & Money — April 2026\n## Relationships — April 2026\n## Health & Energy\n## What to Focus on This Month`;
    try{setTransitReading(await callClaude([{role:'user',content:prompt}]));}catch(e){}
    setTransitLoad(false);
  };

  const getRemedies=async()=>{
    if(!doshas||!chart)return;setRemLoad(true);
    const ctx=buildChartContext(chart,f,dasha,doshas,panch);
    const prompt=`You are a Vedic astrologer specialising in remedies (Upaya). Based on this chart, give specific practical remedies.\n\n${ctx}\n\nProvide remedies using ## headings:\n## Mantras — Daily Japa Practice\n## Gemstone Recommendations\n## Fasting & Vrat Schedule\n## Charity & Dana\n## Puja & Rituals\n## Lifestyle Adjustments\n## For Active Doshas Specifically\n\nBe very specific — which mantra, how many times, which day, which gemstone with metal, which finger.`;
    try{setRemedies(await callClaude([{role:'user',content:prompt}],800));}catch(e){}
    setRemLoad(false);
  };

  const ls=chart?signOf(chart.lagna):null;
  const nak=chart?nakOf(chart.sid.Moon):null;
  const anyDosha=doshas&&(doshas.mangal.effective||doshas.ksd.hasKSD||doshas.sati.inSati);
  const chog=panch?computeChoghadiya(panch.vara):null;

  const SUGGESTIONS=['Is 2026–27 good for marriage?','What career suits my chart?','When is my financial peak?','Which gemstone should I wear?','Explain my 7th house','What does my current dasha mean?'];

  return(<>
    <style>{GFONTS}{CSS}</style>
    <div className="app">
      <div className="bg-tex"/>
      <div className="wrap">

        <div className="hdr">
          <span className="hdr-om">ॐ</span>
          <h1 className="hdr-title">Jyotish AI</h1>
          <p className="hdr-sub">Swiss Ephemeris · Panchang · Doshas · Chat · Kundali Matching · Transits · Remedies</p>
          <p className="hdr-orn">◆ ◇ ◆</p>
        </div>

        {/* Birth Form */}
        <div className="card no-print" id="birth-form">
          <div className="card-ttl">✦ Birth Details</div>
          <div className="fgrid">
            <div className="fg"><label className="flbl">Full Name</label><input className="finp" placeholder="e.g. Aditya Sharma" value={f.name} onChange={e=>set('name',e.target.value)}/></div>
            <div className="fg"><label className="flbl">Date of Birth (DD / MM / YYYY)</label><div className="frow"><input className="finp" placeholder="DD" maxLength={2} value={f.day} onChange={e=>set('day',e.target.value)} style={{width:54}}/><input className="finp" placeholder="MM" maxLength={2} value={f.month} onChange={e=>set('month',e.target.value)} style={{width:54}}/><input className="finp" placeholder="YYYY" maxLength={4} value={f.year} onChange={e=>set('year',e.target.value)} style={{width:80}}/></div></div>
            <div className="fg"><label className="flbl">Time (HH:MM, 24h)</label><div className="frow"><input className="finp" placeholder="HH" maxLength={2} value={f.hour} onChange={e=>set('hour',e.target.value)} style={{width:66}}/><input className="finp" placeholder="MM" maxLength={2} value={f.min} onChange={e=>set('min',e.target.value)} style={{width:66}}/></div></div>
            <div className="fg"><label className="flbl">UTC Offset (IST = 5.5)</label><input className="finp" placeholder="5.5" value={f.tz} onChange={e=>set('tz',e.target.value)}/></div>
            <div className="fg full"><label className="flbl">Place of Birth</label>
              <div className="loc-row"><div className="fg"><input className="finp" placeholder="e.g. New Delhi, India" value={f.place} onChange={e=>set('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&geocode()}/></div>
              <button className="btn-s" onClick={geocode} disabled={geoLoad||!f.place}>{geoLoad?'Finding…':'🌐 Locate'}</button></div>
              {geoErr?<p className="fhelp" style={{color:'#b02020'}}>⚠ {geoErr}</p>:<p className="fhelp">150+ cities built-in · Or enter lat/lon below</p>}
              {f.lat&&f.lon&&<p className="fhelp" style={{color:'var(--gold)'}}>✓ {f.lat}°N, {f.lon}°E</p>}
            </div>
            <div className="fg"><label className="flbl">Latitude</label><input className="finp" placeholder="28.6517" value={f.lat} onChange={e=>set('lat',e.target.value)}/></div>
            <div className="fg"><label className="flbl">Longitude</label><input className="finp" placeholder="77.2219" value={f.lon} onChange={e=>set('lon',e.target.value)}/></div>
          </div>
          {err&&<div className="err">⚠ {err}</div>}
          <div className="acts">
            <button className="btn-p" onClick={castChart}>✦ Cast Kundali</button>
          </div>
        </div>

        {chart&&<>
          {/* Snapshot */}
          <div className="card" style={{padding:'16px 22px'}}>
            <div className="snaps">
              <div className="snap"><div className="snap-v">{RASHI[ls]}</div><div className="snap-k">Lagna · {RASHI_EN[ls]}</div></div>
              <div className="snap"><div className="snap-v">{RASHI[signOf(chart.sid.Moon)]}</div><div className="snap-k">Rashi · Moon Sign</div></div>
              <div className="snap"><div className="snap-v" style={{fontSize:10.5}}>{NAK[nak]}</div><div className="snap-k">Nakshatra · Pada {padaOf(chart.sid.Moon)}</div></div>
              {panch&&<div className="snap"><div className="snap-v" style={{fontSize:10.5}}>{panch.tithi}</div><div className="snap-k">Birth Tithi</div></div>}
              {dasha?.curr&&<div className="snap"><div className="snap-v">{FULL_NAME[dasha.curr.lord]}</div><div className="snap-k">Mahadasha 2026</div></div>}
              <div className="snap">
                <div className="snap-v" style={{color:anyDosha?'var(--red)':'var(--green)',fontSize:11}}>{anyDosha?'⚠ Present':'✓ Clear'}</div>
                <div className="snap-k">Doshas</div>
                {anyDosha?<span className="snap-badge warn">!</span>:<span className="snap-badge ok">✓</span>}
              </div>
              <div className="snap"><div className="snap-v">{chart.ay.toFixed(2)}°</div><div className="snap-k">Ayanamsa</div></div>
            </div>
          </div>

          {/* Main tabs */}
          <div className="card">
            <div className="tabs no-print">
              {[['chart','⬡ Kundali'],['planets','☉ Planets'],['panchang','📅 Panchang'],['dasha','⌛ Dasha'],['doshas','⚠ Doshas'],['transits','🔭 Transits'],['chat','💬 Chat'],['match','💍 Match'],['remedies','🙏 Remedies'],['reading','✦ Reading']].map(([id,lb])=>(
                <div key={id} className={`tab${tab===id?' on':''}`} onClick={()=>setTab(id)}>{lb}</div>
              ))}
            </div>

            {/* ── Kundali ── */}
            {tab==='chart'&&<KundaliChart chart={chart}/>}

            {/* ── Planets ── */}
            {tab==='planets'&&(
              <table className="ptbl">
                <thead><tr><th>Planet</th><th>Sidereal Lon.</th><th>Sign</th><th>House</th><th>Deg in Sign</th></tr></thead>
                <tbody>
                  {['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu','Ketu'].map(nm=>{const l=chart.sid[nm],s=signOf(l),h=((s-ls+12)%12)+1;return(<tr key={nm}><td><span className="pgl" style={{color:PCOL[nm]}}>{GLYPH[nm]}</span><span className="pnm">{nm}</span></td><td><span className="pdeg">{l.toFixed(3)}°</span></td><td><span className="psign">{RASHI[s]}</span> <span style={{fontSize:11,color:'var(--muted)'}}>({RASHI_EN[s]})</span></td><td><span className="phs">{h}</span></td><td><span className="pdeg">{degIn(l).toFixed(2)}°</span></td></tr>);})}
                  <tr><td><span className="pgl" style={{color:'var(--amber)'}}>⬡</span><span className="pnm">Lagna</span></td><td><span className="pdeg">{chart.lagna.toFixed(3)}°</span></td><td><span className="psign">{RASHI[ls]}</span></td><td><span className="phs">1</span></td><td><span className="pdeg">{degIn(chart.lagna).toFixed(2)}°</span></td></tr>
                </tbody>
              </table>
            )}

            {/* ── Panchang ── */}
            {tab==='panchang'&&panch&&(
              <div>
                <div className="panch-grid">
                  <div className="panch-cell"><div className="panch-lbl">Tithi · Lunar Day</div><div className="panch-val">{panch.tithi} <span className={`paksha ${panch.paksha.includes('Shukla')?'paksha-s':'paksha-k'}`}>{panch.paksha.split(' ')[0]}</span></div><div className="panch-sub">Lunar day {panch.tithiNum} of 30</div></div>
                  <div className="panch-cell"><div className="panch-lbl">Vara · Day Lord</div><div className="panch-val">{panch.varaLordS}vara</div><div className="panch-sub">{panch.varaName} · {panch.varaLord}</div></div>
                  <div className="panch-cell"><div className="panch-lbl">Nakshatra · Birth Star</div><div className="panch-val">{panch.nakName}</div><div className="panch-sub">Pada {padaOf(chart.sid.Moon)} · Lord: {FULL_NAME[NAK_LORD[panch.nak]]}</div></div>
                  <div className="panch-cell"><div className="panch-lbl">Yoga · Sun+Moon</div><div className="panch-val" style={{color:panch.yogaBad?'var(--red)':'var(--deep)'}}>{panch.yogaName}</div><div className="panch-sub">{panch.yogaBad?'⚠ Inauspicious yoga':'Auspicious yoga'}</div></div>
                  <div className="panch-cell"><div className="panch-lbl">Karana · Half Tithi</div><div className="panch-val">{panch.karana}</div><div className="panch-sub">{panch.karana==='Vishti'?'⚠ Bhadra — avoid new work':'Half-tithi unit'}</div></div>
                  <div className="panch-cell"><div className="panch-lbl">Rahu Kala at Birth</div><div className="rahu-slot">{panch.rahuKala}</div><div className="panch-sub" style={{marginTop:6}}>Based on 6am sunrise · IST</div></div>
                </div>
                {/* Choghadiya */}
                <div style={{marginTop:22}}>
                  <div className="card-ttl" style={{fontSize:'9px',letterSpacing:'.22em',color:'var(--amber)',textTransform:'uppercase',marginBottom:12}}>✦ Choghadiya — Birth Day Auspicious Slots</div>
                  <div className="chog-grid">
                    {chog&&chog.map((s,i)=>(
                      <div key={i} className={`chog-slot ${s.qual}`}>
                        <div className="chog-name">{s.name}</div>
                        <div className="chog-time">{s.time}</div>
                        <div><span className={`chog-tag ${s.qual}`}>{s.qual==='good'?'Auspicious':s.qual==='bad'?'Inauspicious':'Neutral'}</span></div>
                        <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{s.meaning.split('—')[1]?.trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Dasha ── */}
            {tab==='dasha'&&dasha&&(
              <div>
                <p style={{fontSize:14,color:'var(--muted)',fontStyle:'italic',marginBottom:14}}>Janma Nakshatra: <strong style={{color:'var(--deep)'}}>{NAK[dasha.nak]}</strong> · Birth Lord: <strong style={{color:'var(--deep)'}}>{FULL_NAME[dasha.lord]}</strong></p>
                {dasha.curr&&<div className="dasha-now"><div className="dasha-label">CURRENTLY RUNNING · APRIL 2026</div><div className="dasha-main">{FULL_NAME[dasha.curr.lord]} Mahadasha</div><div className="dasha-sub">{dasha.curr.start.toFixed(1)} — {dasha.curr.end.toFixed(1)} · {DASHA_YR[dasha.curr.lord]} year period</div></div>}
                <div className="dasha-seq">{dasha.seq.map((d,i)=>{const iC=dasha.curr?.lord===d.lord&&Math.abs(dasha.curr?.start-d.start)<.01,iP=d.end<2026.25;return(<div key={i} className={`dchip${iC?' curr':iP?' past':''}`}><span>{FULL_NAME[d.lord]}</span><span className="dchip-yr">{DASHA_YR[d.lord]}y · {Math.round(d.start)}–{Math.round(d.end)}</span></div>);})}</div>
              </div>
            )}

            {/* ── Doshas ── */}
            {tab==='doshas'&&doshas&&(
              <div>
                <div className="dblock">
                  <div className="dhdr"><span className="dicon">♂</span><div><div className="dtitle">Mangal Dosha</div><div className="dsub">Kuja Dosha · Bhauma Dosha</div></div></div>
                  <div className={`dcard ${doshas.mangal.effective?'present':doshas.mangal.dosha&&doshas.mangal.exc.length?'warn':'absent'}`}>
                    <div className="dstatus">{doshas.mangal.effective?'⚠ Mangal Dosha Present':doshas.mangal.dosha&&doshas.mangal.exc.length?'◑ Dosha Cancelled':'✓ No Mangal Dosha'}</div>
                    <div className="ddesc">{doshas.mangal.effective?`Mars in House ${doshas.mangal.marsHouse} — Mangal Dosha present. Marriage matching advised.`:doshas.mangal.dosha?`Mars in House ${doshas.mangal.marsHouse} but a cancellation applies.`:`Mars in House ${doshas.mangal.marsHouse} — not a dosha house.`}</div>
                    {doshas.mangal.exc.length>0&&<div className="ddetail">{doshas.mangal.exc.map((ex,i)=><div key={i} className="drow"><span className="dlbl">Exception</span><span className="dval">{ex}</span></div>)}</div>}
                    <div className="ddetail"><div className="drow"><span className="dlbl">Mars</span><span className="dval">{RASHI[doshas.mangal.marsSign]} · House {doshas.mangal.marsHouse} · {degIn(chart.sid.Mars).toFixed(1)}°</span></div></div>
                  </div>
                </div>
                <hr className="dsep"/>
                <div className="dblock">
                  <div className="dhdr"><span className="dicon">🐍</span><div><div className="dtitle">Kala Sarpa Dosha</div><div className="dsub">All planets between Rahu–Ketu axis</div></div></div>
                  <div className={`dcard ${doshas.ksd.hasKSD?'present':'absent'}`}>
                    <div className="dstatus">{doshas.ksd.hasKSD?'⚠ Kala Sarpa Dosha Present':'✓ No Kala Sarpa Dosha'}</div>
                    <div className="ddesc">{doshas.ksd.hasKSD?`${doshas.ksd.direction}. ${doshas.ksd.ksdType} Kala Sarpa Yoga — karmic intensity with spiritual depth.`:`Planets distributed on both sides of the Rahu–Ketu axis. KSD absent.`}</div>
                    {doshas.ksd.hasKSD&&<div className="ddetail"><div className="drow"><span className="dlbl">Type</span><span className="dval">{doshas.ksd.ksdType}</span></div><div className="drow"><span className="dlbl">Rahu in</span><span className="dval">{RASHI[doshas.ksd.rahuSign]}</span></div><div style={{marginTop:8}}><span className="ksd-chip">{doshas.ksd.ksdType} Yoga</span></div></div>}
                  </div>
                </div>
                <hr className="dsep"/>
                <div className="dblock">
                  <div className="dhdr"><span className="dicon">♄</span><div><div className="dtitle">Shani Sade Sati</div><div className="dsub">Saturn transit · Status April 2026</div></div></div>
                  <div className={`dcard ${doshas.sati.inSati?'present':doshas.sati.inDhaiya?'warn':'absent'}`}>
                    <div className="dstatus">{doshas.sati.inSati?`⚠ Sade Sati — ${doshas.sati.phase}`:doshas.sati.inDhaiya?'◑ Dhaiya Active':'✓ Sade Sati Not Active'}</div>
                    <div className="ddesc">{doshas.sati.inSati?`Saturn in ${doshas.sati.satSignName} — ${doshas.sati.phase.toLowerCase()} for Moon in ${doshas.sati.moonSignName}.`:doshas.sati.inDhaiya?`Saturn in ${doshas.sati.satSignName} — Dhaiya active for Moon in ${doshas.sati.moonSignName}.`:`Saturn in ${doshas.sati.satSignName}. Moon in ${doshas.sati.moonSignName}. Clear period.`}</div>
                    <div className="ddetail"><div className="drow"><span className="dlbl">Moon Sign</span><span className="dval">{doshas.sati.moonSignName}</span></div><div className="drow"><span className="dlbl">Saturn Now</span><span className="dval">{doshas.sati.satSignName} · April 2026</span></div></div>
                    <div className="sati-row">{doshas.sati.phases.map((ph,i)=><div key={i} className={`sphase ${ph.active?'on':!doshas.sati.inSati?'off':''}`}>{ph.name}<br/><span style={{fontSize:8,opacity:.7}}>{ph.sign}</span></div>)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Today's Transits ── */}
            {tab==='transits'&&transits&&(
              <div>
                <p style={{fontFamily:'var(--ff-l)',fontSize:15,color:'var(--muted)',fontStyle:'italic',marginBottom:16}}>Today's planetary positions (April 2, 2026) mapped to your natal houses.</p>
                <div style={{marginBottom:18}}>
                  {transits.map((t,i)=>(
                    <div key={i} className="transit-row">
                      <span className="tr-planet"><span style={{color:PCOL[t.planet]||'var(--amber)',marginRight:4}}>{GLYPH[t.planet]||''}</span>{t.planet}</span>
                      <span className="tr-arrow">→</span>
                      <span className="tr-sign">{t.signName} <span style={{fontSize:12,color:'var(--muted)'}}>({t.signEn})</span></span>
                      <span className="tr-house">H{t.house}</span>
                    </div>
                  ))}
                </div>
                {!transitReading&&!transitLoad&&(
                  <div style={{textAlign:'center',padding:'20px 0'}}>
                    <button className="btn-p" onClick={getTransitReading}>🔭 Get April 2026 Transit Reading</button>
                  </div>
                )}
                {transitLoad&&<div className="ld"><div className="ld-ring"/><div className="ld-t">Analysing Current Transits</div></div>}
                {transitReading&&<><ReadingText text={transitReading}/><div className="acts no-print"><button className="btn-ghost" onClick={()=>setTransitReading('')}>↺ Refresh</button></div></>}
              </div>
            )}

            {/* ── AI Chat ── */}
            {tab==='chat'&&(
              <div className="chat-wrap">
                {chatMsgs.length===0&&(
                  <div className="chat-empty">
                    Ask me anything about your chart.<br/>
                    <span style={{fontSize:13}}>Your planetary positions are already loaded.</span>
                  </div>
                )}
                {chatMsgs.length>0&&(
                  <div className="chat-msgs">
                    {chatMsgs.map((m,i)=>(
                      <div key={i} className={`msg ${m.role==='user'?'user':'ai'}`}>
                        <div className="msg-label">{m.role==='user'?'You':'Jyotish AI'}</div>
                        <div className="msg-bubble">{m.content}</div>
                      </div>
                    ))}
                    {chatLoading&&<div className="chat-typing"><div className="dot"/><div className="dot"/><div className="dot"/></div>}
                    <div ref={chatEndRef}/>
                  </div>
                )}
                <div className="chat-suggestions no-print">
                  {SUGGESTIONS.map((s,i)=><span key={i} className="sugg" onClick={()=>sendChat(s)}>{s}</span>)}
                </div>
                <div className="chat-input-row no-print">
                  <textarea className="chat-input" rows={2} placeholder="Ask about your chart..." value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}}}/>
                  <button className="btn-p" onClick={()=>sendChat()} disabled={chatLoading||!chatInput.trim()} style={{alignSelf:'flex-end'}}>Send</button>
                </div>
              </div>
            )}

            {/* ── Kundali Matching ── */}
            {tab==='match'&&(
              <div>
                <p style={{fontFamily:'var(--ff-l)',fontSize:15,color:'var(--muted)',fontStyle:'italic',marginBottom:18,lineHeight:1.75}}>Enter your partner's birth details for Ashta Kuta (36 Guna) compatibility analysis.</p>
                <div className="fgrid" style={{marginBottom:14}}>
                  <div className="fg"><label className="flbl">Partner Name</label><input className="finp" placeholder="Partner's name" value={partner.name} onChange={e=>setP('name',e.target.value)}/></div>
                  <div className="fg"><label className="flbl">Date of Birth</label><div className="frow"><input className="finp" placeholder="DD" maxLength={2} value={partner.day} onChange={e=>setP('day',e.target.value)} style={{width:54}}/><input className="finp" placeholder="MM" maxLength={2} value={partner.month} onChange={e=>setP('month',e.target.value)} style={{width:54}}/><input className="finp" placeholder="YYYY" maxLength={4} value={partner.year} onChange={e=>setP('year',e.target.value)} style={{width:80}}/></div></div>
                  <div className="fg"><label className="flbl">Time (HH:MM)</label><div className="frow"><input className="finp" placeholder="HH" maxLength={2} value={partner.hour} onChange={e=>setP('hour',e.target.value)} style={{width:66}}/><input className="finp" placeholder="MM" maxLength={2} value={partner.min} onChange={e=>setP('min',e.target.value)} style={{width:66}}/></div></div>
                  <div className="fg"><label className="flbl">UTC Offset</label><input className="finp" placeholder="5.5" value={partner.tz} onChange={e=>setP('tz',e.target.value)}/></div>
                  <div className="fg full"><label className="flbl">Place of Birth</label>
                    <div className="loc-row"><div className="fg"><input className="finp" placeholder="Partner's birth place" value={partner.place} onChange={e=>setP('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&geocodePartner()}/></div>
                    <button className="btn-s" onClick={geocodePartner} disabled={pGeoLoad||!partner.place}>{pGeoLoad?'Finding…':'🌐 Locate'}</button></div>
                    {pGeoErr&&<p className="fhelp" style={{color:'#b02020'}}>⚠ {pGeoErr}</p>}
                    {partner.lat&&partner.lon&&<p className="fhelp" style={{color:'var(--gold)'}}>✓ {partner.lat}°N, {partner.lon}°E</p>}
                  </div>
                  <div className="fg"><label className="flbl">Latitude</label><input className="finp" placeholder="28.6517" value={partner.lat} onChange={e=>setP('lat',e.target.value)}/></div>
                  <div className="fg"><label className="flbl">Longitude</label><input className="finp" placeholder="77.2219" value={partner.lon} onChange={e=>setP('lon',e.target.value)}/></div>
                </div>
                <div className="acts no-print"><button className="btn-p" onClick={doMatch} disabled={matchLoad||!partner.year||!partner.lat}>💍 {matchLoad?'Calculating…':'Calculate Compatibility'}</button></div>

                {matchResult&&(()=>{
                  const{total,kutas,nadiDosha,ganaDosha,nadiStr,ganaStr}=matchResult;
                  const verdict=total>=31?{label:'Excellent Match',col:'var(--green)',bg:'var(--greenbg)',bc:'var(--greenborder)',desc:'Highly auspicious — a divinely aligned union.'}:total>=21?{label:'Good Match',col:'var(--gold)',bg:' #fffbe8',bc:'#d4aa40',desc:'A compatible and harmonious alliance.'}:total>=17?{label:'Average Match',col:'var(--amber)',bg:'var(--cream)',bc:'var(--border)',desc:'Acceptable with awareness of challenges.'}:{label:'Needs Consideration',col:'var(--red)',bg:'var(--redbg)',bc:'var(--redborder)',desc:'Careful deliberation advised before proceeding.'};
                  return(
                    <div style={{marginTop:20}}>
                      <div className="match-verdict" style={{background:verdict.bg,border:`1.5px solid ${verdict.bc}`}}>
                        <div className="score-circle" style={{borderColor:verdict.col}}>
                          <span className="score-num" style={{color:verdict.col}}>{total}</span>
                          <span className="score-den">/36</span>
                        </div>
                        <div className="verdict-title" style={{color:verdict.col}}>{verdict.label}</div>
                        <div className="verdict-desc">{verdict.desc}</div>
                        {nadiDosha&&<div style={{marginTop:10,padding:'6px 14px',background:'var(--redbg)',border:'1px solid var(--redborder)',borderRadius:7,fontSize:13,color:'var(--red)'}}>⚠ Nadi Dosha present ({nadiStr}) — consult a qualified astrologer</div>}
                        {ganaDosha&&<div style={{marginTop:8,padding:'6px 14px',background:'rgba(160,100,0,.06)',border:'1px solid rgba(160,100,0,.2)',borderRadius:7,fontSize:13,color:'#8a6000'}}>⚠ Gana Dosha present ({ganaStr}) — temperament differences noted</div>}
                        <div style={{marginTop:12,fontSize:12,color:'var(--muted)',fontFamily:'var(--ff-h)',letterSpacing:'.1em'}}>
                          {f.name||'Person 1'}: {NAK[matchResult.boyMoon.nak]} ({RASHI[matchResult.boyMoon.sign]}) &nbsp;·&nbsp; {partner.name||'Person 2'}: {NAK[matchResult.girlMoon.nak]} ({RASHI[matchResult.girlMoon.sign]})
                        </div>
                      </div>
                      <div className="kuta-grid">
                        {kutas.map((k,i)=>(
                          <div key={i} className="kuta">
                            <div className="kuta-name">{k.name}</div>
                            <div><span className="kuta-score" style={{color:k.score/k.max>0.5?'var(--green)':k.score===0?'var(--red)':'var(--amber)'}}>{k.score}</span><span className="kuta-max"> / {k.max}</span></div>
                            <div className="kuta-bar"><div className="kuta-fill" style={{width:`${(k.score/k.max)*100}%`,background:k.score/k.max>0.5?'var(--green)':k.score===0?'var(--red)':'var(--gold2)'}}/></div>
                            <div style={{fontSize:10.5,color:'var(--muted)',marginTop:4}}>{k.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ── Remedies ── */}
            {tab==='remedies'&&(
              <div>
                {!remedies&&!remLoad&&(
                  <div style={{textAlign:'center',padding:'30px 0'}}>
                    <p style={{fontFamily:'var(--ff-l)',fontSize:16,color:'var(--muted)',fontStyle:'italic',marginBottom:22,lineHeight:1.85}}>
                      Get personalised Vedic remedies based on your chart — mantras, gemstones, fasting days, puja recommendations, and lifestyle guidance.
                    </p>
                    <button className="btn-p" onClick={getRemedies}>🙏 Generate My Remedies</button>
                  </div>
                )}
                {remLoad&&<div className="ld"><div className="ld-ring"/><div className="ld-t">Consulting Classical Texts</div><p className="ld-s">Preparing your personalised Upaya…</p></div>}
                {remedies&&<><ReadingText text={remedies}/><div className="acts no-print"><button className="btn-ghost" onClick={()=>setRemedies('')}>↺ Regenerate</button></div></>}
              </div>
            )}

            {/* ── AI Reading ── */}
            {tab==='reading'&&(
              <div>
                {!analysis&&!aiLoad&&<div style={{textAlign:'center',padding:'34px 0'}}>
                  <p style={{fontFamily:'var(--ff-l)',fontSize:16,color:'var(--muted)',fontStyle:'italic',marginBottom:22,lineHeight:1.85}}>Your chart, Panchang, and Dosha analysis are ready.<br/>Generate your personalised full Jyotish reading.</p>
                  <div className="acts no-print" style={{justifyContent:'center',marginTop:0}}>
                    <button className="btn-p" onClick={getReading}>✦ Generate Full Reading</button>
                    <button className="btn-ghost" onClick={()=>window.print()}>⎙ Print / Save PDF</button>
                  </div>
                  {aiErr&&<div className="err" style={{marginTop:14}}>{aiErr}</div>}
                </div>}
                {aiLoad&&<div className="ld"><div className="ld-ring"/><div className="ld-t">Consulting the Grahas</div><p className="ld-s">Reading Brihat Parashara Hora Shastra…</p></div>}
                {analysis&&<>
                  <ReadingText text={analysis}/>
                  <div className="acts no-print" style={{marginTop:20}}>
                    <button className="btn-ghost" onClick={()=>setAnalysis('')}>↺ Regenerate</button>
                    <button className="btn-ghost" onClick={()=>window.print()}>⎙ Print / Save PDF</button>
                  </div>
                </>}
              </div>
            )}
          </div>

          <p className="no-print" style={{textAlign:'center',fontSize:11,color:'var(--muted)',fontStyle:'italic',marginTop:14,letterSpacing:'.07em'}}>
            Meeus (Sun/Moon) · JPL Keplerian · Lahiri Ayanamsa · Whole Sign houses · v4
          </p>
        </>}
      </div>
    </div>
  </>);
}
