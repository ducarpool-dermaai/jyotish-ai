import { useState } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf6ec;--card:#ffffff;
  --border:rgba(155,100,12,0.16);--border2:rgba(155,100,12,0.09);
  --gold:#a0720a;--gold2:#c9921c;--amber:#d4780a;
  --deep:#241408;--text:#3a1e08;--muted:#7a5830;
  --light:#f3e8cc;--lightgold:#f7edcc;--cream:#fdf8ee;
  --red:#b02020;--green:#1a6b2e;
  --ff-h:'Cinzel',serif;--ff-b:'EB Garamond',serif;--ff-l:'Cormorant Garamond',serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--ff-b);font-size:16px}
.app{min-height:100vh;position:relative}
.bg-tex{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.03;
  background-image:linear-gradient(var(--gold) 1px,transparent 1px),linear-gradient(90deg,var(--gold) 1px,transparent 1px);
  background-size:48px 48px}
.wrap{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:0 20px 72px}

.hdr{text-align:center;padding:48px 0 32px;animation:fadeD .9s ease both}
@keyframes fadeD{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
.hdr-om{font-size:40px;color:var(--gold2);margin-bottom:10px;display:block;animation:glow 4s ease infinite}
@keyframes glow{0%,100%{text-shadow:0 0 20px rgba(201,146,28,.3)}50%{text-shadow:0 0 40px rgba(201,146,28,.6)}}
.hdr-title{font-family:var(--ff-h);font-size:clamp(24px,4.5vw,42px);font-weight:500;letter-spacing:.16em;color:var(--gold);margin-bottom:6px}
.hdr-sub{font-family:var(--ff-l);font-size:13px;color:var(--muted);font-style:italic;letter-spacing:.18em}
.hdr-orn{color:var(--amber);font-size:11px;letter-spacing:10px;margin:12px 0 0}

.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:28px 30px;
  box-shadow:0 2px 28px rgba(160,100,10,.07),inset 0 1px 0 rgba(255,255,255,.9);animation:fadeU .6s ease both}
@keyframes fadeU{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.card+.card{margin-top:16px}
@media(max-width:600px){.card{padding:18px 16px}}
.card-ttl{font-family:var(--ff-h);font-size:10.5px;letter-spacing:.28em;color:var(--amber);text-transform:uppercase;
  padding-bottom:14px;margin-bottom:20px;border-bottom:1px solid var(--border)}

.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:560px){.fgrid{grid-template-columns:1fr}}
.fg{display:flex;flex-direction:column;gap:5px}
.fg.full{grid-column:1/-1}
.flbl{font-family:var(--ff-h);font-size:9.5px;letter-spacing:.22em;color:var(--gold);text-transform:uppercase}
.finp{background:var(--bg);border:1px solid var(--border);border-radius:7px;color:var(--text);
  font-family:var(--ff-b);font-size:15px;padding:9px 12px;outline:none;width:100%;transition:border-color .2s,box-shadow .2s}
.finp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.1)}
.finp::placeholder{color:var(--muted);font-style:italic}
.frow{display:flex;gap:8px}
.fhelp{font-size:11.5px;color:var(--muted);font-style:italic;margin-top:3px}
.loc-row{display:flex;gap:8px;align-items:flex-end}
.loc-row .fg{flex:1}

.btn-p{background:linear-gradient(135deg,#c07a10,var(--gold));color:white;border:none;border-radius:8px;
  font-family:var(--ff-h);font-size:11px;letter-spacing:.22em;padding:12px 24px;cursor:pointer;
  transition:opacity .2s,transform .15s,box-shadow .2s;box-shadow:0 3px 18px rgba(160,100,10,.22);text-transform:uppercase}
.btn-p:hover:not(:disabled){opacity:.9;transform:translateY(-1px);box-shadow:0 5px 24px rgba(160,100,10,.32)}
.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-s{background:transparent;border:1.5px solid var(--gold);color:var(--gold);border-radius:8px;
  font-family:var(--ff-h);font-size:10px;letter-spacing:.18em;padding:9px 16px;cursor:pointer;
  transition:all .2s;text-transform:uppercase;white-space:nowrap}
.btn-s:hover:not(:disabled){background:rgba(160,100,10,.08)}
.btn-s:disabled{opacity:.4;cursor:not-allowed}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:7px;
  font-family:var(--ff-h);font-size:9.5px;letter-spacing:.18em;padding:8px 14px;cursor:pointer;transition:all .2s;text-transform:uppercase}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.acts{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:20px}

.tabs{display:flex;gap:2px;background:var(--light);border-radius:10px;padding:4px;margin-bottom:22px;flex-wrap:wrap}
.tab{flex:1;min-width:60px;padding:7px 4px;text-align:center;border-radius:8px;cursor:pointer;
  font-family:var(--ff-h);font-size:8px;letter-spacing:.1em;color:var(--muted);transition:all .2s;text-transform:uppercase}
.tab.on{background:var(--card);color:var(--amber);box-shadow:0 1px 8px rgba(0,0,0,.09)}

.snaps{display:grid;grid-template-columns:repeat(auto-fill,minmax(115px,1fr));gap:10px}
.snap{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:12px 10px;text-align:center}
.snap-v{font-family:var(--ff-h);color:var(--amber);font-size:11px;letter-spacing:.08em;margin-bottom:3px;word-break:break-word;line-height:1.3}
.snap-k{font-size:10.5px;color:var(--muted)}
.snap.alert{border-color:rgba(176,32,32,.25);background:rgba(176,32,32,.04)}
.snap.alert .snap-v{color:var(--red)}
.snap.ok{border-color:rgba(26,107,46,.25);background:rgba(26,107,46,.04)}
.snap.ok .snap-v{color:var(--green)}

.ptbl{width:100%;border-collapse:collapse;font-size:14px}
.ptbl th{font-family:var(--ff-h);font-size:9px;letter-spacing:.18em;color:var(--amber);text-transform:uppercase;
  padding:8px 10px;border-bottom:1.5px solid var(--border);text-align:left}
.ptbl td{padding:7px 10px;border-bottom:1px solid var(--border2);vertical-align:middle}
.ptbl tr:last-child td{border-bottom:none}
.ptbl tr:hover td{background:rgba(160,100,10,.03)}
.pgl{font-size:13px;margin-right:5px}
.pnm{font-family:var(--ff-h);font-size:11px;letter-spacing:.1em;color:var(--deep)}
.psign{color:var(--amber)}
.pdeg{color:var(--muted);font-size:12px;font-family:monospace}
.phs{background:var(--lightgold);color:var(--gold);border-radius:4px;padding:1px 7px;
  font-family:var(--ff-h);font-size:9px;letter-spacing:.1em;display:inline-block}

.dasha-now{background:var(--lightgold);border:1px solid var(--gold);border-radius:10px;padding:16px 20px;margin-bottom:16px}
.dasha-label{font-family:var(--ff-h);font-size:9px;letter-spacing:.22em;color:var(--gold);margin-bottom:6px;text-transform:uppercase}
.dasha-main{font-family:var(--ff-h);font-size:19px;color:var(--deep)}
.dasha-sub{font-size:13px;color:var(--muted);margin-top:4px}
.dasha-seq{display:flex;gap:7px;flex-wrap:wrap;margin-top:16px}
.dchip{padding:6px 11px;border-radius:20px;font-family:var(--ff-h);font-size:9px;letter-spacing:.1em;
  border:1px solid var(--border);color:var(--muted);text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:2px}
.dchip.curr{background:var(--lightgold);color:var(--gold);border-color:var(--gold)}
.dchip.past{opacity:.35}
.dchip-yr{font-size:7.5px}
.antar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px;margin-top:12px}
.antar-chip{background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:10px 12px}
.antar-chip.curr{background:var(--lightgold);border-color:var(--gold)}
.antar-name{font-family:var(--ff-h);font-size:10px;letter-spacing:.1em;color:var(--deep);margin-bottom:3px}
.antar-yr{font-size:11.5px;color:var(--muted)}
.antar-chip.curr .antar-name{color:var(--amber)}

.ld{text-align:center;padding:44px}
.ld-ring{width:44px;height:44px;border-radius:50%;border:2.5px solid var(--light);
  border-top-color:var(--gold);animation:spin 1.1s linear infinite;margin:0 auto 16px}
@keyframes spin{to{transform:rotate(360deg)}}
.ld-t{font-family:var(--ff-h);color:var(--gold);font-size:11px;letter-spacing:.25em}
.ld-s{font-size:14px;color:var(--muted);font-style:italic;margin-top:6px}

.reading h3{font-family:var(--ff-h);color:var(--amber);font-size:11px;letter-spacing:.22em;text-transform:uppercase;
  margin:26px 0 10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:16px;line-height:1.88;margin-bottom:10px}
.reading ul{list-style:none;padding:0;margin-bottom:10px}
.reading li{font-size:15.5px;line-height:1.82;padding-left:18px;position:relative;margin-bottom:4px}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--amber);font-size:7px;top:7px}
.hlbox{background:rgba(160,100,10,.06);border-left:3px solid var(--amber);border-radius:0 7px 7px 0;
  padding:13px 18px;margin:14px 0;font-style:italic;font-size:15.5px;color:var(--muted);line-height:1.8}

.panch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:12px}
.panch-cell{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:14px 16px}
.panch-lbl{font-family:var(--ff-h);font-size:8.5px;letter-spacing:.22em;color:var(--amber);text-transform:uppercase;margin-bottom:7px}
.panch-val{font-family:var(--ff-h);font-size:13.5px;color:var(--deep);margin-bottom:3px}
.panch-sub{font-size:12.5px;color:var(--muted)}
.panch-bad .panch-val{color:var(--red)}
.panch-good .panch-val{color:var(--green)}

.rk-row{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}
.rk-slot{flex:1;min-width:68px;padding:8px 5px;border-radius:8px;text-align:center;border:1px solid var(--border)}
.rk-slot.bad{background:rgba(176,32,32,.07);border-color:rgba(176,32,32,.28);color:var(--red)}
.rk-slot.warn{background:rgba(212,120,10,.07);border-color:rgba(212,120,10,.25);color:var(--amber)}
.rk-slot.ok{background:rgba(26,107,46,.05);border-color:rgba(26,107,46,.18);color:var(--green)}

.dosha-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:14px}
.dosha-card{border-radius:12px;padding:18px 20px;border:1px solid}
.dosha-card.present{background:rgba(176,32,32,.04);border-color:rgba(176,32,32,.2)}
.dosha-card.absent{background:rgba(26,107,46,.04);border-color:rgba(26,107,46,.16)}
.dosha-card.partial{background:rgba(212,120,10,.04);border-color:rgba(212,120,10,.22)}
.dosha-head{display:flex;align-items:center;gap:9px;margin-bottom:8px}
.dosha-icon{font-size:20px}
.dosha-name{font-family:var(--ff-h);font-size:11px;letter-spacing:.13em;text-transform:uppercase}
.dosha-card.present .dosha-name{color:var(--red)}
.dosha-card.absent .dosha-name{color:var(--green)}
.dosha-card.partial .dosha-name{color:var(--amber)}
.dosha-badge{font-family:var(--ff-h);font-size:9px;letter-spacing:.1em;padding:2px 9px;border-radius:10px;margin-left:auto;white-space:nowrap}
.dosha-card.present .dosha-badge{background:rgba(176,32,32,.11);color:var(--red)}
.dosha-card.absent .dosha-badge{background:rgba(26,107,46,.11);color:var(--green)}
.dosha-card.partial .dosha-badge{background:rgba(212,120,10,.11);color:var(--amber)}
.dosha-desc{font-size:14px;color:var(--muted);line-height:1.72}
.dosha-detail{font-size:13px;color:var(--text);margin-top:7px;font-style:italic;padding-top:7px;border-top:1px solid rgba(0,0,0,.06)}

.ss-phases{display:flex;margin-top:10px;border-radius:8px;overflow:hidden;border:1px solid var(--border)}
.ss-phase{flex:1;padding:9px 5px;text-align:center;font-family:var(--ff-h);font-size:8.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
.ss-phase.active{background:rgba(212,120,10,.14);color:var(--amber)}

.err{background:rgba(160,40,40,.06);border:1px solid rgba(160,40,40,.2);border-radius:8px;padding:12px 16px;color:#a02020;font-size:14px;margin-top:12px}
.note{text-align:center;font-size:12px;color:var(--muted);font-style:italic;margin-top:16px;letter-spacing:.07em}
`;

// ─── EPHEMERIS ENGINE ─────────────────────────────────────────────────────────
const Rd = Math.PI/180, Dr = 180/Math.PI;
const n360 = x => ((x%360)+360)%360;

function JD(y,mo,d,utH=12){
  if(mo<=2){y--;mo+=12;}
  const A=Math.floor(y/100),B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+utH/24+B-1524.5;
}
const TC = j=>(j-2451545)/36525;
const eps = j=>{const t=TC(j);return 23.439291111-0.013004167*t-1.639e-7*t*t+5.036e-7*t*t*t;};
const GMST = j=>{const t=TC(j);return n360(280.46061837+360.98564736629*(j-2451545)+3.87933e-4*t*t-t*t*t/38710000);};
const ayanamsa = j=>23.85+(j-2451545)*50.29/(3600*365.25);

function sunLon(j){
  const t=TC(j),L0=n360(280.46646+36000.76983*t+3.032e-4*t*t);
  const M=n360(357.52911+35999.05029*t-1.537e-4*t*t),Mr=M*Rd;
  const C=(1.914602-0.004817*t-1.4e-5*t*t)*Math.sin(Mr)+(0.019993-1.01e-4*t)*Math.sin(2*Mr)+2.89e-4*Math.sin(3*Mr);
  return n360(L0+C-0.00569-0.00478*Math.sin((125.04-1934.136*t)*Rd));
}

function moonLon(j){
  const t=TC(j),t2=t*t,t3=t2*t,t4=t3*t;
  const Lp=n360(218.3164477+481267.88123421*t-1.5786e-3*t2+t3/538841-t4/65194000);
  const Dv=n360(297.8501921+445267.1114034*t-1.8819e-3*t2+t3/545868-t4/113065000);
  const Mv=n360(357.5291092+35999.0502909*t-1.536e-4*t2+t3/24490000);
  const Mp=n360(134.9633964+477198.8675055*t+8.7414e-3*t2+t3/69699-t4/14712000);
  const Fv=n360(93.2720950+483202.0175233*t-3.6539e-3*t2-t3/3526000+t4/863310000);
  const E=1-2.516e-3*t-7.4e-6*t2,E2=E*E;
  const T=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110]];
  let s=0;
  for(const[d,m,mp,f,c] of T){const a=(d*Dv+m*Mv+mp*Mp+f*Fv)*Rd;let cf=c;if(Math.abs(m)===1)cf*=E;if(Math.abs(m)===2)cf*=E2;s+=cf*Math.sin(a);}
  return n360(Lp+s/1e6);
}

const rahuLon=j=>{const t=TC(j);return n360(125.0445479-1934.1362608*t+2.0754e-3*t*t+t*t*t/467441);};

const EL={
  Mercury:[0.38709927,3.7e-5,0.20563593,1.906e-5,7.00497902,-5.9475e-3,252.25032350,149472.67411175,77.45779628,0.16047689,48.33076593,-0.12534081],
  Venus:[0.72333566,3.9e-5,0.00677672,-4.107e-5,3.39467605,-7.889e-4,181.97909950,58517.81538729,131.60246718,2.6833e-3,76.67984255,-0.27769418],
  Earth:[1.00000261,5.62e-5,0.01671123,-4.392e-5,-1.531e-5,-0.01294668,100.46457166,35999.37244981,102.93768193,0.32327364,0,0],
  Mars:[1.52371034,1.847e-5,0.09339410,7.882e-5,1.84969142,-8.1313e-3,-4.55343205,19140.30268499,-23.94362959,0.44441088,49.55953891,-0.29257343],
  Jupiter:[5.20288700,-1.1607e-4,0.04838624,-1.3253e-4,1.30439695,-1.8371e-3,34.39644051,3034.74612775,14.72847983,0.21252668,100.47390909,0.20469106],
  Saturn:[9.53667594,-1.2506e-3,0.05386179,-5.0991e-4,2.48599187,1.9361e-3,49.95424423,1222.49362201,92.59887831,-0.41897216,113.66242448,-0.28867794],
};

function keplSolve(M,e){let E=M;for(let i=0;i<60;i++){const d=(M-E+e*Math.sin(E))/(1-e*Math.cos(E));E+=d;if(Math.abs(d)<1e-12)break;}return E;}
function helioXYZ(t,el){
  const[a0,da,e0,de,i0,di,L0,dL,w0,dw,N0,dN]=el;
  const a=a0+da*t,e=e0+de*t,I=(i0+di*t)*Rd,L=n360(L0+dL*t)*Rd,w=n360(w0+dw*t)*Rd,N=n360(N0+dN*t)*Rd,om=w-N;
  const M=n360((L-w)*Dr)*Rd,E=keplSolve(M,e),xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E);
  const[cN,sN,cI,sI,cO,sO]=[Math.cos(N),Math.sin(N),Math.cos(I),Math.sin(I),Math.cos(om),Math.sin(om)];
  return{x:(cN*cO-sN*sO*cI)*xp+(-cN*sO-sN*cO*cI)*yp,y:(sN*cO+cN*sO*cI)*xp+(-sN*sO+cN*cO*cI)*yp,z:sO*sI*xp+cO*sI*yp};
}
function planetLon(j,name){const t=TC(j),p=helioXYZ(t,EL[name]),e=helioXYZ(t,EL.Earth);return n360(Math.atan2(p.y-e.y,p.x-e.x)*Dr);}
function calcLagna(j,lat,lon){
  const LST=n360(GMST(j)+lon)*Rd,e=eps(j)*Rd,phi=lat*Rd;
  return n360(Math.atan2(Math.cos(LST),-(Math.sin(LST)*Math.cos(e)+Math.sin(e)*Math.tan(phi)))*Dr);
}

function computeChart(year,month,day,hour,min,tz,lat,lon){
  const utH=hour+min/60-tz,j=JD(year,month,day,utH),ay=ayanamsa(j);
  const trop={Sun:sunLon(j),Moon:moonLon(j),Mercury:planetLon(j,'Mercury'),Venus:planetLon(j,'Venus'),
    Mars:planetLon(j,'Mars'),Jupiter:planetLon(j,'Jupiter'),Saturn:planetLon(j,'Saturn'),
    Rahu:rahuLon(j),Ketu:n360(rahuLon(j)+180)};
  const sid={};
  for(const[k,v] of Object.entries(trop))sid[k]=n360(v-ay);
  return{sid,lagna:n360(calcLagna(j,lat,lon)-ay),jde:j,ay};
}

// ─── VEDIC DATA ───────────────────────────────────────────────────────────────
const RASHI=['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
const RASHI_EN=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RASHI_SH=['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];
const NAK=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const NAK_LORD=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const DASHA_YR={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
const DASHA_SEQ=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const FULL_NAME={Ke:'Ketu',Ve:'Venus',Su:'Sun',Mo:'Moon',Ma:'Mars',Ra:'Rahu',Ju:'Jupiter',Sa:'Saturn',Me:'Mercury'};
const GLYPH={Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const PCOL={Sun:'#b07000',Moon:'#3b6faa',Mercury:'#1f7a45',Venus:'#aa2a7a',Mars:'#b02020',Jupiter:'#886000',Saturn:'#6040a0',Rahu:'#555',Ketu:'#777'};

const signOf = l=>Math.floor(n360(l)/30);
const degIn  = l=>n360(l)%30;
const nakOf  = l=>Math.floor(n360(l)/(360/27));
const padaOf = l=>Math.floor((n360(l)%(360/27))/(360/108))+1;

// ─── PANCHANG ─────────────────────────────────────────────────────────────────
const TITHI=['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima'];
const YOGA=['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];
const KARANA=['Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti'];
const VARA=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const VARA_LORD=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const BAD_YOGA=new Set([0,5,8,9,16,26]);
// Rahu Kala slot (0=first 1.5h from sunrise): Sun=7,Mon=1,Tue=6,Wed=4,Thu=5,Fri=3,Sat=2
const RAHU_SLOT=[7,1,6,4,5,3,2];
const GULIKA_SLOT=[6,5,4,3,2,1,0];

function calcPanchang(jde,moonSid){
  const sLon=sunLon(jde),mLon=moonLon(jde);
  const diff=n360(mLon-sLon);
  const tIdx=Math.floor(diff/12);
  const yIdx=Math.floor(n360(sLon+mLon)/(360/27))%27;
  const kIdx=Math.floor(diff/6)%7;
  const vara=Math.floor(((jde+1.5)%7+7)%7);
  return{tithiName:TITHI[tIdx%15],tIdx,paksha:tIdx<15?'Shukla (Waxing)':'Krishna (Waning)',
    yogaName:YOGA[yIdx],yogaBad:BAD_YOGA.has(yIdx),
    karanaName:KARANA[kIdx],vara,varaName:VARA[vara],varaLord:VARA_LORD[vara],
    rahuSlot:RAHU_SLOT[vara],gulikaSlot:GULIKA_SLOT[vara]};
}

const slotTime=i=>{const s=6+i*1.5,e=s+1.5;const f=h=>`${Math.floor(h)}:${(h%1)?'30':'00'} ${Math.floor(h)<12?'AM':'PM'}`;return `${f(s)}–${f(e)}`;};

// ─── DOSHAS ───────────────────────────────────────────────────────────────────
function calcDoshas(chart){
  const{sid,lagna}=chart,ls=signOf(lagna);
  const house=p=>((signOf(sid[p])-ls+12)%12)+1;

  // Mangal Dosha
  const marsH=house('Mars');
  const mangal=[1,2,4,7,8,12].includes(marsH);
  const marsSign=signOf(sid.Mars);
  const marsCancel=[0,7,9].includes(marsSign); // own/exalt: Aries,Scorpio,Capricorn
  const juNearMars=Math.min(n360(sid.Jupiter-sid.Mars),n360(sid.Mars-sid.Jupiter))<10;

  // Kala Sarpa Dosha
  const rahu=sid.Rahu,ketu=sid.Ketu;
  const inArc=(lon,from,to)=>{const f=n360(from),t=n360(to),l=n360(lon);return f<=t?l>=f&&l<=t:l>=f||l<=t;};
  const p7=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  const ks=p7.every(p=>inArc(sid[p],rahu,ketu))||p7.every(p=>inArc(sid[p],ketu,rahu));
  const KS_TYPE=['Ananta','Kulika','Vasuki','Shankhapala','Padma','Mahapadma','Takshaka','Karkotaka','Shankhanaad','Patak','Vishadhar','Sheshnag'];
  const ksName=ks?KS_TYPE[(house('Rahu')-1)%12]:null;

  // Guru Chandal
  const gc=Math.min(n360(sid.Jupiter-sid.Rahu),n360(sid.Rahu-sid.Jupiter))<10||
            Math.min(n360(sid.Jupiter-sid.Ketu),n360(sid.Ketu-sid.Jupiter))<10;

  // Sade Sati — current Saturn (April 2 2026)
  const todayJ=JD(2026,4,2,12);
  const satNow=n360(planetLon(todayJ,'Saturn')-ayanamsa(todayJ));
  const moonS=signOf(sid.Moon),satS=signOf(satNow);
  const rel=(satS-moonS+12)%12;
  const ssPhase=rel===11?'Rising (Udaya)':rel===0?'Peak (Madhya)':rel===1?'Setting (Asta)':null;

  return{mangal,marsH,marsCancel,juNearMars,ks,ksName,gc,
    ss:ssPhase!==null,ssPhase,satSign:RASHI[satS],moonSign:RASHI[moonS]};
}

// ─── DASHA + ANTARDASHA ───────────────────────────────────────────────────────
const TODAY=2026+(31+28+31+1)/365.25;

function getDasha(moonL,yr,mo,dy){
  const nak=nakOf(moonL),lord=NAK_LORD[nak];
  const nakLen=360/27,frac=(n360(moonL)%nakLen)/nakLen;
  const birth=yr+(mo-1)/12+(dy-1)/365.25;
  const fs=birth-frac*DASHA_YR[lord];
  const idx=DASHA_SEQ.indexOf(lord);
  const seq=[];let c=fs;
  for(let i=0;i<9;i++){const d=DASHA_SEQ[(idx+i)%9];seq.push({lord:d,start:c,end:c+DASHA_YR[d]});c+=DASHA_YR[d];}
  const curr=seq.find(s=>s.start<=TODAY&&s.end>TODAY);
  let antars=[];
  if(curr){
    const mLen=curr.end-curr.start,mIdx=DASHA_SEQ.indexOf(curr.lord);
    let ac=curr.start;
    for(let i=0;i<9;i++){const d=DASHA_SEQ[(mIdx+i)%9];const al=mLen*DASHA_YR[d]/120;antars.push({lord:d,start:ac,end:ac+al});ac+=al;}
  }
  const currAntar=antars.find(a=>a.start<=TODAY&&a.end>TODAY);
  return{nak,lord,seq,curr,antars,currAntar};
}

// ─── KUNDALI CHART ────────────────────────────────────────────────────────────
const SI=[[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];
function KundaliChart({chart}){
  if(!chart)return null;
  const{sid,lagna}=chart,ls=signOf(lagna);
  const bySign=Array.from({length:12},()=>[]);
  const ab={Sun:'Su',Moon:'Mo',Mercury:'Me',Venus:'Ve',Mars:'Ma',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};
  const cl={Su:'#b07000',Mo:'#3b6faa',Me:'#1a7a40',Ve:'#aa2a7a',Ma:'#b02020',Ju:'#886000',Sa:'#6040a0',Ra:'#444',Ke:'#666'};
  for(const[n,l] of Object.entries(sid))bySign[signOf(l)].push(ab[n]);
  const W=400,H=400,CW=100,CH=100;
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxWidth:400,display:'block',margin:'0 auto'}}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffef8"/><stop offset="100%" stopColor="#fdf5e2"/></linearGradient>
        <linearGradient id="gL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffaec"/><stop offset="100%" stopColor="#f9e9b8"/></linearGradient>
        <linearGradient id="gC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fdf9ee"/><stop offset="100%" stopColor="#faf1d8"/></linearGradient>
      </defs>
      {SI.map(([cx,cy],sign)=>{
        const x=cx*CW,y=cy*CH,isL=sign===ls,h=((sign-ls+12)%12)+1,pl=bySign[sign];
        return(
          <g key={sign}>
            <rect x={x+.5} y={y+.5} width={CW-1} height={CH-1} fill={isL?'url(#gL)':'url(#g1)'} stroke={isL?'#a0720a':'#d4b060'} strokeWidth={isL?1.6:.7}/>
            {isL&&<><line x1={x+1.5} y1={y+1.5} x2={x+22} y2={y+1.5} stroke="#a0720a" strokeWidth="2"/><line x1={x+1.5} y1={y+1.5} x2={x+1.5} y2={y+22} stroke="#a0720a" strokeWidth="2"/></>}
            <text x={x+CW/2} y={y+12.5} textAnchor="middle" fontSize="8.5" fill="#8a6020" fontFamily="Cinzel,serif" fontWeight="500">{RASHI_SH[sign]}</text>
            <text x={x+CW-4} y={y+12.5} textAnchor="end" fontSize="7.5" fill="#b09060" fontFamily="serif">{h}</text>
            {pl.map((a,i)=><text key={i} x={x+7+(i%2)*42} y={y+28+Math.floor(i/2)*15} fontSize="10.5" fill={cl[a]||'#3a1e08'} fontFamily="Cinzel,serif" fontWeight="500">{a}</text>)}
          </g>
        );
      })}
      <rect x={CW+.5} y={CH+.5} width={CW*2-1} height={CH*2-1} fill="url(#gC)" stroke="#d4b060" strokeWidth=".6"/>
      <line x1={CW} y1={CH} x2={CW*3} y2={CH*3} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <line x1={CW*3} y1={CH} x2={CW} y2={CH*3} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/>
      <text x={W/2} y={H/2-6} textAnchor="middle" fontSize="24" fill="#c9a84c" fontFamily="serif" opacity=".9">ॐ</text>
      <text x={W/2} y={H/2+12} textAnchor="middle" fontSize="7.5" fill="#b8860b" fontFamily="Cinzel,serif" letterSpacing="2.5">KUNDALI</text>
    </svg>
  );
}

// ─── READING RENDERER ─────────────────────────────────────────────────────────
function ReadingText({text}){
  const secs=[];let cur=null;
  text.split('\n').forEach(line=>{
    const t=line.trim();if(!t)return;
    if(t.startsWith('## ')){if(cur)secs.push(cur);cur={title:t.slice(3),items:[]};}
    else{if(!cur)cur={title:null,items:[]};cur.items.push(t);}
  });
  if(cur)secs.push(cur);
  return(
    <div className="reading">
      {secs.map((s,i)=>(
        <div key={i}>
          {s.title&&<h3>{s.title}</h3>}
          {s.items.map((it,j)=>{
            if(it.startsWith('- ')||it.startsWith('• '))return<ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;
            if(it.startsWith('"')||it.startsWith('\u201c'))return<div key={j} className="hlbox">{it}</div>;
            return<p key={j}>{it}</p>;
          })}
        </div>
      ))}
    </div>
  );
}

// ─── CITY DB ─────────────────────────────────────────────────────────────────
const CITIES={'delhi':[28.6517,77.2219],'new delhi':[28.6517,77.2219],'mumbai':[19.076,72.8777],'bombay':[19.076,72.8777],'bangalore':[12.9716,77.5946],'bengaluru':[12.9716,77.5946],'chennai':[13.0827,80.2707],'madras':[13.0827,80.2707],'kolkata':[22.5726,88.3639],'calcutta':[22.5726,88.3639],'hyderabad':[17.385,78.4867],'pune':[18.5204,73.8567],'ahmedabad':[23.0225,72.5714],'jaipur':[26.9124,75.7873],'lucknow':[26.8467,80.9462],'kanpur':[26.4499,80.3319],'nagpur':[21.1458,79.0882],'surat':[21.1702,72.8311],'patna':[25.5941,85.1376],'bhopal':[23.2599,77.4126],'indore':[22.7196,75.8577],'vadodara':[22.3072,73.1812],'coimbatore':[11.0168,76.9558],'kochi':[9.9312,76.2673],'cochin':[9.9312,76.2673],'trivandrum':[8.5241,76.9366],'thiruvananthapuram':[8.5241,76.9366],'vizag':[17.6868,83.2185],'visakhapatnam':[17.6868,83.2185],'agra':[27.1767,78.0081],'varanasi':[25.3176,82.9739],'kashi':[25.3176,82.9739],'srinagar':[34.0837,74.7973],'chandigarh':[30.7333,76.7794],'gurgaon':[28.4595,77.0266],'gurugram':[28.4595,77.0266],'noida':[28.5355,77.391],'faridabad':[28.4089,77.3178],'ghaziabad':[28.6692,77.4538],'meerut':[28.9845,77.7064],'amritsar':[31.634,74.8723],'ludhiana':[30.901,75.8573],'jodhpur':[26.2389,73.0243],'udaipur':[24.5854,73.7125],'rajkot':[22.3039,70.8022],'mysore':[12.2958,76.6394],'mysuru':[12.2958,76.6394],'nashik':[19.9975,73.7898],'dehradun':[30.3165,78.0322],'haridwar':[29.9457,78.1642],'rishikesh':[30.0869,78.2676],'mathura':[27.4924,77.6737],'vrindavan':[27.5794,77.7009],'allahabad':[25.4358,81.8463],'prayagraj':[25.4358,81.8463],'gwalior':[26.2183,78.1828],'raipur':[21.2514,81.6296],'ranchi':[23.3441,85.3096],'bhubaneswar':[20.2961,85.8245],'guwahati':[26.1445,91.7362],'shimla':[31.1048,77.1734],'manali':[32.2432,77.1892],'goa':[15.2993,74.124],'panaji':[15.4909,73.8278],'tirupati':[13.6288,79.4192],'madurai':[9.9252,78.1198],'kathmandu':[27.7172,85.324],'dhaka':[23.8103,90.4125],'islamabad':[33.6844,73.0479],'karachi':[24.8607,67.0011],'lahore':[31.5497,74.3436],'colombo':[6.9271,79.8612],'london':[51.5074,-0.1278],'manchester':[53.4808,-2.2426],'new york':[40.7128,-74.006],'los angeles':[34.0522,-118.2437],'chicago':[41.8781,-87.6298],'houston':[29.7604,-95.3698],'san francisco':[37.7749,-122.4194],'washington dc':[38.9072,-77.0369],'toronto':[43.6532,-79.3832],'vancouver':[49.2827,-123.1207],'dubai':[25.2048,55.2708],'abu dhabi':[24.4539,54.3773],'riyadh':[24.7136,46.6753],'doha':[25.2854,51.531],'singapore':[1.3521,103.8198],'kuala lumpur':[3.139,101.6869],'bangkok':[13.7563,100.5018],'jakarta':[-6.2088,106.8456],'tokyo':[35.6762,139.6503],'osaka':[34.6937,135.5023],'beijing':[39.9042,116.4074],'shanghai':[31.2304,121.4737],'hong kong':[22.3193,114.1694],'seoul':[37.5665,126.978],'sydney':[-33.8688,151.2093],'melbourne':[-37.8136,144.9631],'paris':[48.8566,2.3522],'berlin':[52.52,13.405],'amsterdam':[52.3676,4.9041],'rome':[41.9028,12.4964],'madrid':[40.4168,-3.7038],'moscow':[55.7558,37.6173],'istanbul':[41.0082,28.9784],'cairo':[30.0444,31.2357],'nairobi':[-1.2921,36.8219],'johannesburg':[-26.2041,28.0473],'mexico city':[19.4326,-99.1332],'sao paulo':[-23.5505,-46.6333]};
function cityLookup(q){const s=q.toLowerCase().trim();if(CITIES[s])return CITIES[s];for(const[k,v] of Object.entries(CITIES))if(k.includes(s)||s.includes(k))return v;return null;}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function JyotishAI(){
  const[f,setF]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'5.5',place:'',lat:'',lon:''});
  const[chart,setChart]=useState(null);
  const[panch,setPanch]=useState(null);
  const[doshas,setDoshas]=useState(null);
  const[dasha,setDasha]=useState(null);
  const[tab,setTab]=useState('chart');
  const[analysis,setAnalysis]=useState('');
  const[err,setErr]=useState('');
  const[geoLoad,setGeoLoad]=useState(false);
  const[geoErr,setGeoErr]=useState('');
  const[aiLoad,setAiLoad]=useState(false);
  const[aiErr,setAiErr]=useState('');

  const set=(k,v)=>setF(p=>({...p,[k]:v}));

  const geocode=async()=>{
    if(!f.place)return;setGeoLoad(true);setGeoErr('');
    const loc=cityLookup(f.place);
    if(loc){setF(p=>({...p,lat:loc[0].toFixed(4),lon:loc[1].toFixed(4)}));setGeoLoad(false);return;}
    try{
      const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(f.place)}&count=1&language=en&format=json`);
      const d=await r.json();
      if(d.results?.[0]){const g=d.results[0];setF(p=>({...p,lat:g.latitude.toFixed(4),lon:g.longitude.toFixed(4)}));}
      else setGeoErr(`"${f.place}" not found. Please enter lat/lon manually.`);
    }catch{setGeoErr('Network unavailable. Enter lat/lon manually.');}
    setGeoLoad(false);
  };

  const castChart=()=>{
    setErr('');
    const{year,month,day,hour,min,tz,lat,lon}=f;
    if(!year||!month||!day)return setErr('Please enter a complete date of birth.');
    if(!lat||!lon)return setErr('Please click Locate or enter lat/lon manually.');
    try{
      const c=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);
      setChart(c);
      setPanch(calcPanchang(c.jde,c.sid.Moon));
      setDoshas(calcDoshas(c));
      setDasha(getDasha(c.sid.Moon,+year,+month,+day));
      setAnalysis('');setTab('chart');
    }catch(e){setErr('Calculation error: '+e.message);}
  };

  const getReading=async()=>{
    if(!chart)return;
    setAiLoad(true);setAiErr('');
    const{sid,lagna}=chart,ls=signOf(lagna);
    const pInfo=Object.entries(sid).map(([n,l])=>{const s=signOf(l),h=((s-ls+12)%12)+1;return`${n}: ${RASHI[s]} ${degIn(l).toFixed(2)}° H${h}`;}).join('\n');
    const dInfo=dasha?.curr?`Mahadasha: ${FULL_NAME[dasha.curr.lord]} (until ${dasha.curr.end.toFixed(1)})\nAntardasha: ${dasha.currAntar?FULL_NAME[dasha.currAntar.lord]+` until ${dasha.currAntar.end.toFixed(2)}`:'—'}`:'';
    const doInfo=doshas?[
      doshas.mangal?`Mangal Dosha PRESENT — Mars H${doshas.marsH}${doshas.marsCancel?' (cancellation factors present)':''}`:' No Mangal Dosha',
      doshas.ks?`Kala Sarpa Dosha PRESENT — ${doshas.ksName} type`:'No Kala Sarpa Dosha',
      doshas.ss?`Shani Sade Sati ACTIVE — ${doshas.ssPhase}, Saturn in ${doshas.satSign}`:'No Sade Sati active',
      doshas.gc?'Guru Chandal Yoga PRESENT — Jupiter conjunct Rahu/Ketu':'No Guru Chandal Yoga',
    ].join('\n'):'';
    const prompt=`You are a master Vedic astrologer. Analyze this precisely computed birth chart:

Name: ${f.name||'Native'}, Born: ${f.day}/${f.month}/${f.year} ${f.hour||'?'}:${f.min||'00'} UTC+${f.tz}, ${f.place}
Lahiri Ayanamsa: ${chart.ay.toFixed(4)}°
Lagna: ${RASHI[ls]} at ${degIn(lagna).toFixed(2)}°

Planetary Positions (sidereal):
${pInfo}

Janma Nakshatra: ${NAK[nakOf(sid.Moon)]} Pada ${padaOf(sid.Moon)}
${dInfo}

Doshas:
${doInfo}

Write a DEEP, PERSONALIZED reading using ## headings:
## Lagna & Core Personality
## Moon Sign & Nakshatra
## Key Planetary Strengths
## Important Yogas
## Career & Wealth
## Relationships & Marriage
## Doshas — Real Impact & Remedies
## Current Dasha-Antardasha — What 2026 Brings
## Spiritual Path & Soul Purpose
## Remedies — Mantras, Gems & Upaya

Use Sanskrit terms with translations. Reference actual degrees and houses. Be specific and personal.`;

    try{
      const res=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})});
      const data=await res.json();
      if(data.error)throw new Error(data.error.message);
      setAnalysis(data.content?.map(b=>b.text||'').join('')||'');
      setTab('reading');
    }catch(e){setAiErr(e.message||'Failed to generate reading');}
    setAiLoad(false);
  };

  const ls=chart?signOf(chart.lagna):null;
  const nak=chart?nakOf(chart.sid.Moon):null;
  const doshaCount=doshas?[doshas.mangal,doshas.ks,doshas.ss,doshas.gc].filter(Boolean).length:0;

  return(
    <>
      <style>{GFONTS}{CSS}</style>
      <div className="app">
        <div className="bg-tex"/>
        <div className="wrap">

          {/* Header */}
          <div className="hdr">
            <span className="hdr-om">ॐ</span>
            <h1 className="hdr-title">Jyotish AI</h1>
            <p className="hdr-sub">Vedic Astrology · Swiss Ephemeris · Panchang · Doshas · Kundali</p>
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
                  <input className="finp" placeholder="YYYY" maxLength={4} value={f.year} onChange={e=>set('year',e.target.value)}/>
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
                <input className="finp" placeholder="5.5 for IST" value={f.tz} onChange={e=>set('tz',e.target.value)}/>
              </div>
              <div className="fg full">
                <label className="flbl">Place of Birth</label>
                <div className="loc-row">
                  <div className="fg">
                    <input className="finp" placeholder="e.g. New Delhi, India" value={f.place}
                      onChange={e=>set('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&geocode()}/>
                  </div>
                  <button className="btn-s" onClick={geocode} disabled={geoLoad||!f.place}>{geoLoad?'Searching…':'🌐 Locate'}</button>
                </div>
                {geoErr?<p className="fhelp" style={{color:'#b02020'}}>⚠ {geoErr}</p>
                  :<p className="fhelp">150+ cities built-in (instant) · Or enter lat/lon manually below</p>}
                {f.lat&&f.lon&&<p className="fhelp" style={{color:'var(--gold)'}}>✓ {f.lat}°N, {f.lon}°E</p>}
              </div>
              <div className="fg">
                <label className="flbl">Latitude (°N)</label>
                <input className="finp" placeholder="28.6517" value={f.lat} onChange={e=>set('lat',e.target.value)}/>
              </div>
              <div className="fg">
                <label className="flbl">Longitude (°E)</label>
                <input className="finp" placeholder="77.2219" value={f.lon} onChange={e=>set('lon',e.target.value)}/>
              </div>
            </div>
            {err&&<div className="err">⚠ {err}</div>}
            <div className="acts">
              <button className="btn-p" onClick={castChart}>✦ Cast Kundali</button>
            </div>
          </div>

          {chart&&<>
            {/* Snapshot */}
            <div className="card" style={{padding:'20px 24px'}}>
              <div className="snaps">
                <div className="snap"><div className="snap-v">{RASHI[ls]}</div><div className="snap-k">Lagna · {RASHI_EN[ls]}</div></div>
                <div className="snap"><div className="snap-v">{RASHI[signOf(chart.sid.Moon)]}</div><div className="snap-k">Rashi · Moon Sign</div></div>
                <div className="snap"><div className="snap-v" style={{fontSize:10}}>{NAK[nak]}</div><div className="snap-k">Nakshatra · Pada {padaOf(chart.sid.Moon)}</div></div>
                <div className="snap"><div className="snap-v">{RASHI[signOf(chart.sid.Sun)]}</div><div className="snap-k">Surya Rashi</div></div>
                {panch&&<div className="snap"><div className="snap-v" style={{fontSize:10}}>{panch.tithiName}</div><div className="snap-k">Tithi · {panch.paksha.split(' ')[0]}</div></div>}
                {dasha?.curr&&<div className="snap"><div className="snap-v">{FULL_NAME[dasha.curr.lord]}</div><div className="snap-k">Mahadasha</div></div>}
                {dasha?.currAntar&&<div className="snap"><div className="snap-v">{FULL_NAME[dasha.currAntar.lord]}</div><div className="snap-k">Antardasha</div></div>}
                <div className={`snap ${doshaCount>0?'alert':'ok'}`}>
                  <div className="snap-v">{doshaCount>0?`${doshaCount} Found`:'None'}</div>
                  <div className="snap-k">Doshas</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="tabs">
                {[['chart','⬡ Kundali'],['planets','☉ Planets'],['panchang','📅 Panchang'],['doshas','⚠ Doshas'],['dasha','⌛ Dasha'],['reading','✦ AI Reading']].map(([id,lbl])=>(
                  <div key={id} className={`tab${tab===id?' on':''}`} onClick={()=>setTab(id)}>{lbl}</div>
                ))}
              </div>

              {/* Kundali Chart */}
              {tab==='chart'&&<KundaliChart chart={chart}/>}

              {/* Planets */}
              {tab==='planets'&&(
                <table className="ptbl">
                  <thead><tr><th>Planet</th><th>Sidereal Long.</th><th>Rashi</th><th>H</th><th>Deg in Sign</th></tr></thead>
                  <tbody>
                    {['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu','Ketu'].map(nm=>{
                      const l=chart.sid[nm],s=signOf(l),h=((s-ls+12)%12)+1;
                      return(
                        <tr key={nm}>
                          <td><span className="pgl" style={{color:PCOL[nm]}}>{GLYPH[nm]}</span><span className="pnm">{nm}</span></td>
                          <td><span className="pdeg">{l.toFixed(3)}°</span></td>
                          <td><span className="psign">{RASHI[s]}</span> <span style={{fontSize:11.5,color:'var(--muted)'}}>({RASHI_EN[s]})</span></td>
                          <td><span className="phs">{h}</span></td>
                          <td><span className="pdeg">{degIn(l).toFixed(2)}°</span></td>
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

              {/* Panchang */}
              {tab==='panchang'&&panch&&(
                <div>
                  <p style={{fontSize:14,color:'var(--muted)',fontStyle:'italic',marginBottom:18,lineHeight:1.7}}>
                    पञ्चाङ्ग — the five limbs of your birth day, computed from the exact Julian Day of your birth.
                  </p>
                  <div className="panch-grid">
                    <div className="panch-cell">
                      <div className="panch-lbl">Tithi · तिथि</div>
                      <div className="panch-val">{panch.tithiName}</div>
                      <div className="panch-sub">{panch.paksha}</div>
                    </div>
                    <div className="panch-cell">
                      <div className="panch-lbl">Vara · वार</div>
                      <div className="panch-val">{panch.varaName}</div>
                      <div className="panch-sub">Ruled by {panch.varaLord}</div>
                    </div>
                    <div className="panch-cell">
                      <div className="panch-lbl">Nakshatra · नक्षत्र</div>
                      <div className="panch-val" style={{fontSize:12}}>{NAK[nak]}</div>
                      <div className="panch-sub">Pada {padaOf(chart.sid.Moon)} · Lord: {FULL_NAME[NAK_LORD[nak]]}</div>
                    </div>
                    <div className={`panch-cell ${panch.yogaBad?'panch-bad':'panch-good'}`}>
                      <div className="panch-lbl">Yoga · योग</div>
                      <div className="panch-val">{panch.yogaName}</div>
                      <div className="panch-sub">{panch.yogaBad?'⚠ Inauspicious':'✓ Auspicious'}</div>
                    </div>
                    <div className="panch-cell">
                      <div className="panch-lbl">Karana · करण</div>
                      <div className="panch-val">{panch.karanaName}</div>
                      <div className="panch-sub">Half of Tithi {panch.tIdx+1}</div>
                    </div>
                    <div className="panch-cell">
                      <div className="panch-lbl">Ayanamsa</div>
                      <div className="panch-val">{chart.ay.toFixed(4)}°</div>
                      <div className="panch-sub">Lahiri · Sidereal</div>
                    </div>
                  </div>

                  <div style={{marginTop:22}}>
                    <p className="panch-lbl" style={{marginBottom:8}}>Rahu Kala & Time Slots on Birth Day (6am–6pm baseline, 8 × 1.5h)</p>
                    <div className="rk-row">
                      {Array.from({length:8},(_,i)=>{
                        const isRahu=i===panch.rahuSlot,isGul=i===panch.gulikaSlot;
                        return(
                          <div key={i} className={`rk-slot ${isRahu?'bad':isGul?'warn':'ok'}`}>
                            <div style={{fontSize:9,marginBottom:3}}>{slotTime(i).split('–')[0]}</div>
                            <div style={{fontSize:9.5,fontFamily:'var(--ff-h)',fontWeight:isRahu||isGul?600:400}}>
                              {isRahu?'Rahu Kala':isGul?'Gulika':'Shubha'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="fhelp" style={{marginTop:8}}>
                      Rahu Kala: {slotTime(panch.rahuSlot)} · Gulika: {slotTime(panch.gulikaSlot)} · Avoid starting new endeavours during inauspicious slots
                    </p>
                  </div>
                </div>
              )}

              {/* Doshas */}
              {tab==='doshas'&&doshas&&(
                <div>
                  <p style={{fontSize:14,color:'var(--muted)',fontStyle:'italic',marginBottom:18,lineHeight:1.7}}>
                    Computed from exact sidereal positions. Sade Sati uses Saturn's live position as of April 2, 2026.
                  </p>
                  <div className="dosha-row">

                    {/* Mangal Dosha */}
                    <div className={`dosha-card ${doshas.mangal?(doshas.marsCancel||doshas.juNearMars?'partial':'present'):'absent'}`}>
                      <div className="dosha-head">
                        <span className="dosha-icon">♂</span>
                        <span className="dosha-name">Mangal Dosha</span>
                        <span className="dosha-badge">{doshas.mangal?(doshas.marsCancel||doshas.juNearMars?'Partial':'Present'):'Absent'}</span>
                      </div>
                      <div className="dosha-desc">
                        {doshas.mangal
                          ?`Mars (Mangal) occupies House ${doshas.marsH} from Lagna, forming Mangal Dosha. This brings intensity and possible friction in partnerships and marriage.`
                          :`Mars occupies House ${doshas.marsH}. No Mangal Dosha is formed from the Lagna.`}
                      </div>
                      {doshas.mangal&&(doshas.marsCancel||doshas.juNearMars)&&(
                        <div className="dosha-detail">
                          Cancellation: {doshas.marsCancel?`Mars in ${RASHI[signOf(chart.sid.Mars)]} (own/exalted sign). `:''}
                          {doshas.juNearMars?'Jupiter conjunct Mars — Guru aspect neutralises the Dosha.':''}
                        </div>
                      )}
                    </div>

                    {/* Kala Sarpa */}
                    <div className={`dosha-card ${doshas.ks?'present':'absent'}`}>
                      <div className="dosha-head">
                        <span className="dosha-icon">🐍</span>
                        <span className="dosha-name">Kala Sarpa Dosha</span>
                        <span className="dosha-badge">{doshas.ks?'Present':'Absent'}</span>
                      </div>
                      <div className="dosha-desc">
                        {doshas.ks
                          ?`All seven planets fall within the Rahu–Ketu axis — ${doshas.ksName} Kala Sarpa Dosha. Creates obstacles and delays but also intense karmic focus and eventual spiritual awakening.`
                          :'Planets are spread on both sides of the Rahu–Ketu axis. No Kala Sarpa Dosha present in this chart.'}
                      </div>
                    </div>

                    {/* Sade Sati */}
                    <div className={`dosha-card ${doshas.ss?'partial':'absent'}`}>
                      <div className="dosha-head">
                        <span className="dosha-icon">♄</span>
                        <span className="dosha-name">Shani Sade Sati</span>
                        <span className="dosha-badge">{doshas.ss?'Active Now':'Not Active'}</span>
                      </div>
                      <div className="dosha-desc">
                        {doshas.ss
                          ?`Saturn is currently in ${doshas.satSign} — the ${doshas.ssPhase} of your 7.5-year Sade Sati relative to natal Moon in ${doshas.moonSign}. A period of karmic restructuring, discipline and eventual liberation.`
                          :`Saturn (currently in ${doshas.satSign}) is not transiting in the Sade Sati zone of your natal Moon (${doshas.moonSign}). You are in a stable Saturn period.`}
                      </div>
                      {doshas.ss&&(
                        <div className="ss-phases">
                          {['Rising (Udaya)','Peak (Madhya)','Setting (Asta)'].map(ph=>(
                            <div key={ph} className={`ss-phase${doshas.ssPhase===ph?' active':''}`}>{ph}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Guru Chandal */}
                    <div className={`dosha-card ${doshas.gc?'partial':'absent'}`}>
                      <div className="dosha-head">
                        <span className="dosha-icon">♃</span>
                        <span className="dosha-name">Guru Chandal Yoga</span>
                        <span className="dosha-badge">{doshas.gc?'Present':'Absent'}</span>
                      </div>
                      <div className="dosha-desc">
                        {doshas.gc
                          ?'Jupiter is conjunct Rahu or Ketu (within 10°). Wisdom may be unconventional or distorted; however this also gives sharp intelligence, spiritual intensity and out-of-box thinking.'
                          :'Jupiter is free from Rahu/Ketu influence. Wisdom (Brihaspati) flows without shadow-planet distortion.'}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Dasha */}
              {tab==='dasha'&&dasha&&(
                <div>
                  <p style={{fontSize:15,color:'var(--muted)',fontStyle:'italic',marginBottom:14}}>
                    Janma Nakshatra: <strong style={{color:'var(--deep)'}}>{NAK[dasha.nak]}</strong> · Birth Dasha Lord: <strong style={{color:'var(--deep)'}}>{FULL_NAME[dasha.lord]}</strong>
                  </p>
                  {dasha.curr&&(
                    <div className="dasha-now">
                      <div className="dasha-label">Mahadasha · Currently Running</div>
                      <div className="dasha-main">{FULL_NAME[dasha.curr.lord]} Mahadasha</div>
                      <div className="dasha-sub">{dasha.curr.start.toFixed(1)} — {dasha.curr.end.toFixed(1)} · {DASHA_YR[dasha.curr.lord]} years</div>
                      {dasha.currAntar&&(
                        <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid rgba(160,114,10,.18)'}}>
                          <div className="dasha-label" style={{marginBottom:4}}>Antardasha (Bhukti) · Currently Running</div>
                          <div style={{fontFamily:'var(--ff-h)',fontSize:15,color:'var(--deep)'}}>{FULL_NAME[dasha.currAntar.lord]} Antardasha</div>
                          <div className="dasha-sub">{dasha.currAntar.start.toFixed(2)} — {dasha.currAntar.end.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {dasha.antars.length>0&&(
                    <>
                      <p style={{fontFamily:'var(--ff-h)',fontSize:9,letterSpacing:'.2em',color:'var(--amber)',textTransform:'uppercase',marginBottom:8}}>
                        All Antardashas within {FULL_NAME[dasha.curr?.lord]} Mahadasha
                      </p>
                      <div className="antar-grid">
                        {dasha.antars.map((a,i)=>{
                          const isCurr=dasha.currAntar?.lord===a.lord&&Math.abs(dasha.currAntar.start-a.start)<0.01;
                          return(
                            <div key={i} className={`antar-chip${isCurr?' curr':''}`} style={{opacity:a.end<TODAY?.45:1}}>
                              <div className="antar-name">{FULL_NAME[a.lord]}</div>
                              <div className="antar-yr">{a.start.toFixed(1)} – {a.end.toFixed(1)}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <div className="dasha-seq">
                    {dasha.seq.map((d,i)=>{
                      const isCurr=dasha.curr?.lord===d.lord&&Math.abs(dasha.curr.start-d.start)<0.01;
                      return(
                        <div key={i} className={`dchip${isCurr?' curr':d.end<TODAY?' past':''}`}>
                          <span>{FULL_NAME[d.lord]}</span>
                          <span className="dchip-yr">{DASHA_YR[d.lord]}y · {Math.round(d.start)}–{Math.round(d.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AI Reading */}
              {tab==='reading'&&(
                <div>
                  {!analysis&&!aiLoad&&(
                    <div style={{textAlign:'center',padding:'36px 0'}}>
                      <p style={{fontFamily:'var(--ff-l)',fontSize:16.5,color:'var(--muted)',fontStyle:'italic',marginBottom:24,lineHeight:1.85}}>
                        Your chart, panchang, doshas and dasha–antardasha have all been computed.<br/>
                        Receive a deep, personalised reading grounded in your exact planetary positions.
                      </p>
                      <button className="btn-p" onClick={getReading}>✦ Generate My Jyotish Reading</button>
                      {aiErr&&<div className="err" style={{marginTop:14}}>{aiErr}</div>}
                    </div>
                  )}
                  {aiLoad&&(
                    <div className="ld">
                      <div className="ld-ring"/>
                      <div className="ld-t">Consulting the Grahas</div>
                      <p className="ld-s">Studying Brihat Parashara Hora Shastra…</p>
                    </div>
                  )}
                  {analysis&&(
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

            <p className="note">Meeus algorithms (Sun/Moon) · JPL Keplerian elements (planets) · Lahiri Ayanamsa · Whole Sign houses</p>
          </>}
        </div>
      </div>
    </>
  );
}
