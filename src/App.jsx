import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#faf6ec;--card:#fff;
  --gold:#a0720a;--gold2:#c9921c;--amber:#d4780a;
  --text:#3a1e08;--muted:#7a5830;--deep:#1e0e04;
  --light:#f3e8cc;--lgold:#f7edcc;--cream:#fdf8ee;
  --border:rgba(155,100,12,.18);--b2:rgba(155,100,12,.09);
  --red:#b02020;--rbg:rgba(160,40,40,.06);--rbc:rgba(160,40,40,.22);
  --green:#1a6e30;--gbg:rgba(26,110,48,.05);--gbc:rgba(26,110,48,.2);
  --fh:'Cinzel',serif;--fb:'EB Garamond',serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:16px}
.app{min-height:100vh}
.wrap{max-width:900px;margin:0 auto;padding:0 16px 60px}

/* HEADER */
.hdr{text-align:center;padding:28px 0 18px}
.hom{font-size:30px;color:var(--gold2);display:block;margin-bottom:5px;
  animation:glow 4s ease infinite}
@keyframes glow{0%,100%{text-shadow:0 0 12px rgba(201,146,28,.3)}
  50%{text-shadow:0 0 28px rgba(201,146,28,.6)}}
.htitle{font-family:var(--fh);font-size:clamp(18px,4vw,34px);font-weight:500;
  letter-spacing:.15em;color:var(--gold)}
.hsub{font-size:12px;color:var(--muted);font-style:italic;margin-top:3px;letter-spacing:.13em}

/* MAIN BOX */
.box{background:var(--card);border:1px solid var(--border);border-radius:13px;
  box-shadow:0 2px 18px rgba(160,100,10,.08),inset 0 1px 0 rgba(255,255,255,.8)}

/* ═══════════════════════════════════════
   TAB BAR  — FIRST CHILD OF .box
   ALWAYS VISIBLE, NO CONDITIONS
═══════════════════════════════════════ */
.tbar{
  display:flex;flex-wrap:wrap;gap:2px;
  background:var(--light);padding:4px;
  border-radius:13px 13px 0 0;
  border-bottom:1px solid var(--border);
}
.ti{
  flex:1;min-width:46px;padding:8px 2px;
  text-align:center;cursor:pointer;
  font-family:var(--fh);font-size:7px;letter-spacing:.06em;
  color:var(--muted);border-radius:8px;
  transition:all .18s;text-transform:uppercase;
  user-select:none;white-space:nowrap;
}
.ti:hover{color:var(--amber)}
.ti.on{background:var(--card);color:var(--amber);
  box-shadow:0 1px 5px rgba(0,0,0,.1);font-weight:500}

/* SNAPSHOT (only when chart exists) */
.snaps{display:flex;flex-wrap:wrap;gap:7px;padding:11px 20px 12px;
  border-bottom:1px solid var(--border);background:var(--cream)}
.sn{background:var(--card);border:1px solid var(--border);border-radius:8px;
  padding:8px 10px;text-align:center;flex:1;min-width:80px;position:relative}
.snv{font-family:var(--fh);font-size:10px;letter-spacing:.06em;color:var(--amber);
  margin-bottom:2px;line-height:1.3;word-break:break-word}
.snk{font-size:9px;color:var(--muted)}
.sbdg{position:absolute;top:-4px;right:-4px;font-size:7px;padding:2px 4px;
  border-radius:6px;color:#fff;font-family:var(--fh)}
.sbdg.r{background:var(--red)}.sbdg.g{background:var(--green)}

/* TAB CONTENT */
.tc{padding:22px 24px}
@media(max-width:520px){.tc{padding:14px 12px}}

/* EMPTY STATE */
.emp{text-align:center;padding:48px 16px;color:var(--muted)}
.emp-i{font-size:36px;display:block;margin-bottom:12px;opacity:.28}
.emp-t{font-family:var(--fh);font-size:10px;letter-spacing:.2em;color:var(--gold);
  text-transform:uppercase;margin-bottom:8px}
.emp-s{font-style:italic;font-size:14.5px;line-height:1.8}
.emp-a{display:inline-block;margin-top:14px;font-family:var(--fh);font-size:9px;
  letter-spacing:.15em;color:var(--amber);text-transform:uppercase;cursor:pointer}

/* FORM */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:11px}
@media(max-width:480px){.g2{grid-template-columns:1fr}}
.fg{display:flex;flex-direction:column;gap:4px}
.fg.full{grid-column:1/-1}
.lbl{font-family:var(--fh);font-size:7.5px;letter-spacing:.2em;color:var(--gold);
  text-transform:uppercase}
.fi{background:var(--bg);border:1px solid var(--border);border-radius:6px;
  color:var(--text);font-family:var(--fb);font-size:14.5px;padding:8px 10px;
  outline:none;width:100%;transition:border-color .18s}
.fi:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.1)}
.fi::placeholder{color:var(--muted);font-style:italic;font-size:13.5px}
.frow{display:flex;gap:6px}
.fh{font-size:10px;color:var(--muted);font-style:italic;margin-top:2px}
.lrow{display:flex;gap:6px;align-items:flex-end}
.lrow .fg{flex:1}
.ferr{background:var(--rbg);border:1px solid var(--rbc);border-radius:6px;
  padding:9px 12px;color:var(--red);font-size:13px;margin-top:10px}

/* BUTTONS */
.bg{background:linear-gradient(135deg,#c07a10,var(--gold));color:#fff;border:none;
  border-radius:8px;font-family:var(--fh);font-size:9.5px;letter-spacing:.18em;
  padding:10px 20px;cursor:pointer;transition:opacity .18s,transform .15s;
  box-shadow:0 3px 12px rgba(160,100,10,.22);text-transform:uppercase}
.bg:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
.bg:disabled{opacity:.33;cursor:not-allowed}
.bo{background:transparent;border:1.5px solid var(--gold);color:var(--gold);
  border-radius:6px;font-family:var(--fh);font-size:8px;letter-spacing:.15em;
  padding:7px 12px;cursor:pointer;transition:all .18s;text-transform:uppercase;
  white-space:nowrap}
.bo:hover:not(:disabled){background:rgba(160,100,10,.07)}
.bo:disabled{opacity:.33;cursor:not-allowed}
.bgh{background:transparent;border:1px solid var(--border);color:var(--muted);
  border-radius:6px;font-family:var(--fh);font-size:7.5px;letter-spacing:.14em;
  padding:6px 11px;cursor:pointer;transition:all .18s;text-transform:uppercase}
.bgh:hover{border-color:var(--gold);color:var(--gold)}
.acts{display:flex;gap:7px;justify-content:flex-end;flex-wrap:wrap;margin-top:14px}

/* SECTION TITLE */
.stitle{font-family:var(--fh);font-size:9px;letter-spacing:.25em;color:var(--amber);
  text-transform:uppercase;padding-bottom:10px;margin-bottom:13px;
  border-bottom:1px solid var(--border)}

/* PLANET TABLE */
.pt{width:100%;border-collapse:collapse;font-size:12.5px}
.pt th{font-family:var(--fh);font-size:7px;letter-spacing:.17em;color:var(--amber);
  text-transform:uppercase;padding:6px 7px;border-bottom:1.5px solid var(--border);text-align:left}
.pt td{padding:6px 7px;border-bottom:1px solid var(--b2);vertical-align:middle}
.pt tr:last-child td{border-bottom:none}
.pt tr:hover td{background:rgba(160,100,10,.025)}
.pn{font-family:var(--fh);font-size:9px;letter-spacing:.07em;color:var(--deep)}
.ps2{color:var(--amber);font-size:12px}
.pd{color:var(--muted);font-size:10.5px;font-family:monospace}
.ph{background:var(--lgold);color:var(--gold);border-radius:3px;padding:1px 5px;
  font-family:var(--fh);font-size:7px;letter-spacing:.07em;display:inline-block}

/* DASHA */
.dnow{background:var(--lgold);border:1px solid var(--gold);border-radius:8px;
  padding:13px 15px;margin-bottom:11px}
.dlbl{font-family:var(--fh);font-size:7.5px;letter-spacing:.22em;color:var(--gold);margin-bottom:3px}
.dmain{font-family:var(--fh);font-size:17px;color:var(--deep)}
.dsub{font-size:12px;color:var(--muted);margin-top:2px}
.dseq{display:flex;gap:5px;flex-wrap:wrap}
.dchip{padding:4px 9px;border-radius:14px;font-family:var(--fh);font-size:7.5px;
  letter-spacing:.08em;border:1px solid var(--border);color:var(--muted);
  text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:1px}
.dchip.on{background:var(--lgold);color:var(--gold);border-color:var(--gold)}
.dchip.done{opacity:.3}
.dyr{font-size:6.5px}

/* PANCHANG */
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:8px}
.pc{background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:10px 11px}
.pl{font-family:var(--fh);font-size:7px;letter-spacing:.2em;color:var(--gold);
  text-transform:uppercase;margin-bottom:4px}
.pv{font-family:var(--fh);font-size:12px;color:var(--deep);margin-bottom:2px;line-height:1.3}
.psb{font-size:10px;color:var(--muted)}
.pak{display:inline-block;padding:1px 7px;border-radius:12px;font-family:var(--fh);
  font-size:7px;letter-spacing:.07em;margin-left:3px;vertical-align:middle}
.pak.s{background:#fff8e8;color:#8a6a00;border:1px solid #d4aa40}
.pak.k{background:#f0eef8;color:#4a3a8a;border:1px solid #8a80c0}

/* CHOGHADIYA */
.cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:6px;margin-top:11px}
.cs{border-radius:7px;padding:8px 10px;border:1px solid}
.cs.good{background:rgba(26,110,48,.05);border-color:rgba(26,110,48,.16)}
.cs.bad{background:rgba(160,40,40,.04);border-color:rgba(160,40,40,.14)}
.cs.neutral{background:var(--cream);border-color:var(--border)}
.cn{font-family:var(--fh);font-size:9.5px;letter-spacing:.07em;color:var(--deep);margin-bottom:1px}
.ct{font-size:10.5px;color:var(--muted);font-family:monospace}
.ctg{font-family:var(--fh);font-size:6.5px;letter-spacing:.1em;text-transform:uppercase;
  margin-top:3px;display:inline-block;padding:1px 5px;border-radius:7px}
.ctg.good{background:rgba(26,110,48,.1);color:var(--green)}
.ctg.bad{background:rgba(160,40,40,.08);color:var(--red)}
.ctg.neutral{background:var(--lgold);color:var(--gold)}

/* DOSHAS */
.db{margin-bottom:16px}.db:last-child{margin-bottom:0}
.dh{display:flex;align-items:center;gap:8px;margin-bottom:7px}
.di{font-size:18px;line-height:1}
.dt{font-family:var(--fh);font-size:11px;letter-spacing:.07em;color:var(--deep)}
.ds2{font-size:10px;color:var(--muted);font-style:italic;margin-top:1px}
.dc{border-radius:8px;padding:12px 14px;border:1px solid}
.dc.yes{background:var(--rbg);border-color:var(--rbc)}
.dc.no{background:var(--gbg);border-color:var(--gbc)}
.dc.maybe{background:#fff8e8;border-color:#d4aa40}
.dstat{font-family:var(--fh);font-size:10px;letter-spacing:.12em;
  text-transform:uppercase;margin-bottom:5px}
.dc.yes .dstat{color:var(--red)}.dc.no .dstat{color:var(--green)}.dc.maybe .dstat{color:#8a6a00}
.ddesc{font-size:13px;line-height:1.7;color:var(--text)}
.ddet{margin-top:7px;padding-top:7px;border-top:1px solid rgba(0,0,0,.06)}
.dr{display:flex;gap:5px;margin-bottom:3px;font-size:11.5px;align-items:baseline}
.drl{font-family:var(--fh);font-size:7px;letter-spacing:.1em;color:var(--muted);
  text-transform:uppercase;min-width:60px;flex-shrink:0}
.drv{color:var(--deep);flex:1}
.sph-row{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}
.sph{padding:4px 8px;border-radius:12px;font-family:var(--fh);font-size:7px;
  letter-spacing:.07em;border:1px solid var(--border);color:var(--muted);
  text-transform:uppercase;text-align:center;line-height:1.5}
.sph.on{background:var(--rbg);color:var(--red);border-color:var(--rbc)}.sph.off{opacity:.3}

/* TRANSITS */
.tr{display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid var(--b2)}
.tr:last-child{border-bottom:none}
.trp{font-family:var(--fh);font-size:8.5px;letter-spacing:.06em;color:var(--deep);
  width:60px;flex-shrink:0}
.trs{color:var(--amber);font-size:12px;flex:1}
.trh{background:var(--lgold);color:var(--gold);border-radius:3px;padding:1px 5px;
  font-family:var(--fh);font-size:7px}

/* CHAT */
.chat{display:flex;flex-direction:column;height:430px}
.chatmsgs{flex:1;overflow-y:auto;padding:2px 0 7px;display:flex;flex-direction:column;gap:8px}
.chatmsgs::-webkit-scrollbar{width:3px}
.chatmsgs::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.cm{max-width:84%}.cm.u{align-self:flex-end}.cm.a{align-self:flex-start}
.cml{font-family:var(--fh);font-size:6.5px;letter-spacing:.14em;color:var(--muted);
  text-transform:uppercase;margin-bottom:2px}
.cmb{padding:9px 12px;border-radius:11px;font-size:13.5px;line-height:1.7}
.cm.u .cmb{background:linear-gradient(135deg,#c07a10,var(--gold));color:#fff;
  border-radius:11px 11px 3px 11px}
.cm.a .cmb{background:var(--cream);border:1px solid var(--border);color:var(--text);
  border-radius:11px 11px 11px 3px}
.typing2{display:flex;align-items:center;gap:4px;padding:9px 12px;background:var(--cream);
  border:1px solid var(--border);border-radius:11px 11px 11px 3px;align-self:flex-start}
.dot{width:5px;height:5px;border-radius:50%;background:var(--muted);
  animation:dp 1.4s ease infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes dp{0%,60%,100%{opacity:.35;transform:scale(1)}30%{opacity:1;transform:scale(1.3)}}
.csuggs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:7px}
.sg{background:var(--cream);border:1px solid var(--border);border-radius:14px;
  padding:4px 9px;font-family:var(--fh);font-size:7px;letter-spacing:.07em;
  text-transform:uppercase;cursor:pointer;transition:all .17s;color:var(--muted);
  white-space:nowrap}
.sg:hover{border-color:var(--gold);color:var(--gold);background:var(--lgold)}
.cir{display:flex;gap:6px;margin-top:7px;padding-top:7px;border-top:1px solid var(--border)}
.cinp{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:8px;
  color:var(--text);font-family:var(--fb);font-size:13.5px;padding:8px 10px;
  outline:none;resize:none;transition:border-color .18s}
.cinp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.08)}

/* MATCH */
.sring{width:84px;height:84px;border-radius:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;margin:0 auto 12px;border:3px solid}
.snum{font-family:var(--fh);font-size:24px;line-height:1}
.sden{font-family:var(--fh);font-size:9.5px;opacity:.5}
.kgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:5px}
.kut{background:var(--cream);border:1px solid var(--border);border-radius:7px;padding:7px 9px}
.kn{font-family:var(--fh);font-size:7px;letter-spacing:.12em;color:var(--muted);
  text-transform:uppercase;margin-bottom:2px}
.ks{font-family:var(--fh);font-size:11.5px;color:var(--deep)}
.km{font-size:9px;color:var(--muted)}
.kbar{height:3px;border-radius:2px;background:var(--light);margin-top:4px;overflow:hidden}
.kfill{height:100%;border-radius:2px}
.mv{text-align:center;padding:14px 16px;border-radius:9px;margin-bottom:14px}
.mvt{font-family:var(--fh);font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;margin-bottom:4px}
.mvd{font-size:13.5px;line-height:1.7;color:var(--text)}

/* READING */
.reading h3{font-family:var(--fh);color:var(--amber);font-size:9px;letter-spacing:.2em;
  text-transform:uppercase;margin:18px 0 6px;padding-bottom:5px;border-bottom:1px solid var(--border)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:14.5px;line-height:1.84;margin-bottom:7px;color:var(--text)}
.reading ul{list-style:none;padding:0;margin-bottom:7px}
.reading li{font-size:14px;line-height:1.76;padding-left:13px;position:relative;margin-bottom:2px}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--amber);font-size:6px;top:6px}
.hlb{background:rgba(160,100,10,.05);border-left:3px solid var(--amber);border-radius:0 5px 5px 0;
  padding:9px 13px;margin:9px 0;font-style:italic;font-size:14px;color:var(--muted);line-height:1.72}

/* LOADER */
.ld{text-align:center;padding:34px}
.lr{width:34px;height:34px;border-radius:50%;border:2.5px solid var(--light);
  border-top-color:var(--gold);animation:spin 1s linear infinite;margin:0 auto 9px}
@keyframes spin{to{transform:rotate(360deg)}}
.lt{font-family:var(--fh);color:var(--gold);font-size:9px;letter-spacing:.22em}
.ls2{font-size:12px;color:var(--muted);font-style:italic;margin-top:3px}
`;

// ─── EPHEMERIS (Meeus + JPL) ──────────────────────────────────────────────────
const R=Math.PI/180,D=180/Math.PI,n360=x=>((x%360)+360)%360;
function JD(y,mo,d,h){if(mo<=2){y--;mo+=12;}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+h/24+B-1524.5;}
const TC=j=>(j-2451545)/36525;
const eps=j=>{const t=TC(j);return 23.4393-0.013004*t;};
const GMST=j=>{const t=TC(j);return n360(280.46061837+360.98564736629*(j-2451545)+3.87933e-4*t*t);};
const ayanamsa=j=>23.85+(j-2451545)*50.29/1314900;
function sunLon(j){const t=TC(j),L0=n360(280.46646+36000.76983*t),M=n360(357.52911+35999.05029*t),Mr=M*R,C=(1.914602-0.004817*t)*Math.sin(Mr)+(0.019993-1.01e-4*t)*Math.sin(2*Mr);return n360(L0+C-0.00569-0.00478*Math.sin((125.04-1934.136*t)*R));}
function moonLon(j){const t=TC(j),t2=t*t,t3=t2*t,t4=t3*t,Lp=n360(218.3164477+481267.88123421*t-1.5786e-3*t2+t3/538841-t4/65194000),Dv=n360(297.8501921+445267.1114034*t-1.8819e-3*t2),Mv=n360(357.5291092+35999.0502909*t),Mp=n360(134.9633964+477198.8675055*t+8.7414e-3*t2),Fv=n360(93.2720950+483202.0175233*t),E=1-2.516e-3*t,E2=E*E;const T=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861]];let s=0;for(const[dv,m,mp,fv,c]of T){const a=(dv*Dv+m*Mv+mp*Mp+fv*Fv)*R;let cf=c;if(Math.abs(m)===1)cf*=E;if(Math.abs(m)===2)cf*=E2;s+=cf*Math.sin(a);}return n360(Lp+s/1e6);}
const rahuLon=j=>{const t=TC(j);return n360(125.0445479-1934.1362608*t+2.0754e-3*t*t);};
const EL={Mercury:[.38709927,3.7e-5,.20563593,1.906e-5,7.00497902,-5.9475e-3,252.25032350,149472.67411175,77.45779628,.16047689,48.33076593,-.12534081],Venus:[.72333566,3.9e-5,.00677672,-4.107e-5,3.39467605,-7.889e-4,181.97909950,58517.81538729,131.60246718,2.6833e-3,76.67984255,-.27769418],Earth:[1.00000261,5.62e-5,.01671123,-4.392e-5,-1.531e-5,-.01294668,100.46457166,35999.37244981,102.93768193,.32327364,0,0],Mars:[1.52371034,1.847e-5,.09339410,7.882e-5,1.84969142,-8.1313e-3,-4.55343205,19140.30268499,-23.94362959,.44441088,49.55953891,-.29257343],Jupiter:[5.20288700,-1.1607e-4,.04838624,-1.3253e-4,1.30439695,-1.8371e-3,34.39644051,3034.74612775,14.72847983,.21252668,100.47390909,.20469106],Saturn:[9.53667594,-1.2506e-3,.05386179,-5.0991e-4,2.48599187,1.9361e-3,49.95424423,1222.49362201,92.59887831,-.41897216,113.66242448,-.28867794]};
function keplSolve(M,e){let E=M;for(let i=0;i<50;i++){const dE=(M-E+e*Math.sin(E))/(1-e*Math.cos(E));E+=dE;if(Math.abs(dE)<1e-11)break;}return E;}
function helioXYZ(t,el){const[a0,da,e0,de,i0,di,L0,dL,w0,dw,N0,dN]=el,a=a0+da*t,e=e0+de*t,I=(i0+di*t)*R,L=n360(L0+dL*t)*R,w=n360(w0+dw*t)*R,N=n360(N0+dN*t)*R,om=w-N,M=n360((L-w)*D)*R,Ev=keplSolve(M,e),xp=a*(Math.cos(Ev)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(Ev);const[cN,sN,cI,sI,cO,sO]=[Math.cos(N),Math.sin(N),Math.cos(I),Math.sin(I),Math.cos(om),Math.sin(om)];return{x:(cN*cO-sN*sO*cI)*xp+(-cN*sO-sN*cO*cI)*yp,y:(sN*cO+cN*sO*cI)*xp+(-sN*sO+cN*cO*cI)*yp,z:sO*sI*xp+cO*sI*yp};}
function planetLon(j,nm){const t=TC(j),p=helioXYZ(t,EL[nm]),e=helioXYZ(t,EL.Earth);return n360(Math.atan2(p.y-e.y,p.x-e.x)*D);}
function calcLagna(j,lat,lon){const LST=n360(GMST(j)+lon)*R,e=eps(j)*R,phi=lat*R;return n360(Math.atan2(Math.cos(LST),-(Math.sin(LST)*Math.cos(e)+Math.sin(e)*Math.tan(phi)))*D);}
function computeChart(y,mo,d,h,mi,tz,lat,lon){const utH=h+mi/60-tz,j=JD(y,mo,d,utH),ay=ayanamsa(j);const trop={Sun:sunLon(j),Moon:moonLon(j),Mercury:planetLon(j,'Mercury'),Venus:planetLon(j,'Venus'),Mars:planetLon(j,'Mars'),Jupiter:planetLon(j,'Jupiter'),Saturn:planetLon(j,'Saturn'),Rahu:rahuLon(j),Ketu:n360(rahuLon(j)+180)};const sid={};for(const[k,v]of Object.entries(trop))sid[k]=n360(v-ay);return{sid,lagna:n360(calcLagna(j,lat,lon)-ay),jde:j,ay};}

// ─── VEDIC DATA ───────────────────────────────────────────────────────────────
const RS=['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
const RE=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RSH=['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];
const NK=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const NL=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const DY={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
const DS=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const FN={Ke:'Ketu',Ve:'Venus',Su:'Sun',Mo:'Moon',Ma:'Mars',Ra:'Rahu',Ju:'Jupiter',Sa:'Saturn',Me:'Mercury'};
const GL={Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const PC={Sun:'#b07000',Moon:'#3b6faa',Mercury:'#1f7a45',Venus:'#aa2a7a',Mars:'#b02020',Jupiter:'#886000',Saturn:'#6040a0',Rahu:'#555',Ketu:'#777'};
const TN=['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima','Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Amavasya'];
const YN=['Vishkumbha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];
const YB=new Set(['Vishkumbha','Atiganda','Shula','Ganda','Vyaghata','Vajra','Vyatipata','Parigha','Vaidhriti']);
const KR=['Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti'];
const VN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const VL=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const VS=['Ravi','Soma','Mangala','Budha','Guru','Shukra','Shani'];
const RKS=[8,2,7,5,6,4,3];
const KN=['Ananta','Kulika','Vasuki','Shankhapala','Padma','Mahapadma','Takshaka','Karkotaka','Shankhachuda','Ghatak','Vishdhar','Sheshanaga'];
const so=l=>Math.floor(n360(l)/30),di=l=>n360(l)%30,no=l=>Math.floor(n360(l)/(360/27)),po=l=>Math.floor((n360(l)%(360/27))/(360/108))+1;

function getPanchang(j,ay){const sS=n360(sunLon(j)-ay),mS=n360(moonLon(j)-ay),diff=n360(mS-sS),ti=Math.floor(diff/12),vara=Math.floor(j+1.5)%7,nak=no(mS),yi=Math.floor(n360(sS+mS)/(360/27))%27,ki=Math.floor(diff/6)%60,kar=ki===0?'Kimstughna':ki<=56?KR[(ki-1)%7]:['Shakuni','Chatushpada','Naga'][ki-57]||'Naga',sl=RKS[vara]-1,rhs=6+sl*1.5,rhe=rhs+1.5;const fh=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return`${hh}:${mm.toString().padStart(2,'0')} ${hh<12?'AM':'PM'}`;};return{tithi:TN[ti],tnum:ti<15?ti+1:ti-14,paksha:ti<15?'Shukla':'Krishna',vara,varaName:VN[vara],varaLord:VL[vara],varaS:VS[vara],nakName:NK[nak],nak,yogaName:YN[yi],yogaBad:YB.has(YN[yi]),karana:kar,rahuKala:`${fh(rhs)} – ${fh(rhe)}`,moonSign:so(mS)};}
function getChog(vara){const sl=[['Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg'],['Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit'],['Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog'],['Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh'],['Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh'],['Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char'],['Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal']];const q={Amrit:'good',Shubh:'good',Labh:'good',Char:'good',Kaal:'bad',Rog:'bad',Udveg:'bad'};const dc={Amrit:'Highly auspicious',Shubh:'Good for all',Labh:'Business & gains',Char:'Travel & social',Kaal:'Avoid new starts',Rog:'Avoid health work',Udveg:'Avoid big decisions'};const fh=h=>{const hh=Math.floor(h%24),mm=Math.round((h-Math.floor(h))*60);return`${hh}:${mm.toString().padStart(2,'0')}`;};return sl[vara].map((n,i)=>{const s=6+i*1.5;return{name:n,qual:q[n]||'neutral',desc:dc[n]||'',time:`${fh(s)}–${fh(s+1.5)}`};});}
function getMangal(sid,lagna){const ls=so(lagna),ms=so(sid.Mars),mh=((ms-ls+12)%12)+1,d=[1,2,4,7,8,12].includes(mh),exc=[];if([0,7].includes(ms))exc.push('Mars in own sign');if(ms===9)exc.push('Mars exalted in Makara');if(so(sid.Jupiter)===ms)exc.push('Jupiter conjunct Mars');if([3,4].includes(ls))exc.push('Cancer/Leo Lagna exception');return{dosha:d,effective:d&&!exc.length,marsHouse:mh,marsSign:ms,exc};}
function getKSD(sid){const rahu=sid.Rahu,pl=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'],inR=p=>n360(sid[p]-rahu)<180,allR=pl.every(inR),allK=pl.every(p=>n360(sid[p]-rahu)>180);return{hasKSD:allR||allK,ksdType:KN[so(rahu)],direction:allR?'All planets between Rahu and Ketu':'All planets between Ketu and Rahu',rahuSign:so(rahu)};}
function getSati(sid){const tj=JD(2026,4,2,6),ta=ayanamsa(tj),sn=n360(planetLon(tj,'Saturn')-ta),ss=so(sn),ms=so(sid.Moon),df=(ss-ms+12)%12,inSati=df===0||df===1||df===11,inDh=df===3||df===7;return{inSati,inDh,phase:df===11?'Rising':df===0?'Peak':df===1?'Setting':null,satSign:ss,satSignName:RS[ss],moonSign:ms,moonSignName:RS[ms],phases:[{name:'Rising',sign:RS[(ms+11)%12],active:df===11},{name:'Peak',sign:RS[ms],active:df===0},{name:'Setting',sign:RS[(ms+1)%12],active:df===1}]};}
function getDasha(ml,y,mo,d){const nak=no(ml),lord=NL[nak],nakLen=360/27,frac=(n360(ml)%nakLen)/nakLen,bd=y+(mo-1)/12+(d-1)/365.25,fs=bd-frac*DY[lord],idx=DS.indexOf(lord),seq=[];let c=fs;for(let i=0;i<9;i++){const dk=DS[(idx+i)%9];seq.push({lord:dk,start:c,end:c+DY[dk]});c+=DY[dk];}const NOW=2026.25;return{nak,lord,seq,curr:seq.find(s=>s.start<=NOW&&s.end>NOW)};}
function getTransits(lagna){const j=JD(2026,4,2,6),ay=ayanamsa(j),ls=so(lagna),t={Sun:n360(sunLon(j)-ay),Moon:n360(moonLon(j)-ay),Rahu:n360(rahuLon(j)-ay)};['Mercury','Venus','Mars','Jupiter','Saturn'].forEach(p=>{t[p]=n360(planetLon(j,p)-ay);});return['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu'].map(p=>{const l=t[p],s=so(l),h=((s-ls+12)%12)+1;return{planet:p,lon:l,sign:s,signName:RS[s],signEn:RE[s],house:h,deg:di(l).toFixed(1)};});}

// Kundali matching
const NG=[0,1,2,0,0,1,0,0,2,1,0,0,0,1,0,0,0,2,2,0,0,0,2,1,0,0,0];
const NN=[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2];
const NY=[0,1,2,3,4,5,6,7,8,9,10,10,11,12,6,12,13,14,3,1,0,7,9,2,11,4,13];
const YE={0:[4],1:[9],2:[13],3:[14],4:[0],5:[6],6:[5],7:[9],8:[9],9:[0,1,7,8],10:[12],11:[3],12:[10],13:[2]};
const VR={0:2,1:1,2:0,3:3,4:2,5:1,6:0,7:3,8:2,9:1,10:0,11:3};
const SL={0:'Mars',1:'Venus',2:'Mercury',3:'Moon',4:'Sun',5:'Mercury',6:'Venus',7:'Mars',8:'Jupiter',9:'Saturn',10:'Saturn',11:'Jupiter'};
const PF={Sun:['Moon','Mars','Jupiter'],Moon:['Sun','Mercury'],Mars:['Sun','Moon','Jupiter'],Mercury:['Sun','Venus'],Jupiter:['Sun','Moon','Mars'],Venus:['Mercury','Saturn'],Saturn:['Mercury','Venus']};
const PE={Sun:['Venus','Saturn'],Moon:['Rahu'],Mars:['Mercury'],Mercury:['Moon'],Jupiter:['Mercury','Venus'],Venus:['Sun','Moon'],Saturn:['Sun','Moon','Mars']};
const pr=(a,b)=>(PF[a]||[]).includes(b)?'f':(PE[a]||[]).includes(b)?'e':'n';
function matchKutas(bn,bs,gn,gs){const varna=VR[bs]>=VR[gs]?1:0;const VG={0:0,1:0,2:1,3:2,4:0,5:1,6:1,7:3,8:1,9:0,10:1,11:2},bv=VG[bs],gv=VG[gs];const vashya=bv===gv?2:(bv===0&&gv===1)||(bv===1&&gv===0)?1:0;const b2g=((gn-bn+27)%27)+1,g2b=((bn-gn+27)%27)+1,tg=r=>[1,3,5,7].includes(r%9||9);const tara=(tg(b2g)?1.5:0)+(tg(g2b)?1.5:0);const by=NY[bn],gy=NY[gn],yoni=(YE[by]||[]).includes(gy)?0:by===gy?4:2;const bl=SL[bs],gl=SL[gs],br=pr(bl,gl),gr=pr(gl,bl);const graha=br==='f'&&gr==='f'?5:br==='f'&&gr==='n'?4:br==='n'&&gr==='f'?4:br==='n'&&gr==='n'?3:1;const bg=NG[bn],gg=NG[gn],gana=bg===gg?6:(bg===0&&gg===1)||(bg===1&&gg===0)?5:(bg===0&&gg===2)||(bg===2&&gg===0)?1:0;const rel=((gs-bs+12)%12)+1,relR=((bs-gs+12)%12)+1;const bhakuta=[[6,8],[8,6],[5,9],[9,5],[3,11],[11,3]].some(([a,b])=>a===rel&&b===relR)?0:7;const nadiScore=NN[bn]===NN[gn]?0:8;const total=Math.round((varna+vashya+tara+yoni+graha+gana+bhakuta+nadiScore)*10)/10;return{total,nadiDosha:nadiScore===0,ganaDosha:gana===0,nadiStr:['Adi','Madhya','Antya'][NN[bn]]+' × '+['Adi','Madhya','Antya'][NN[gn]],ganaStr:['Dev','Manushya','Rakshasa'][bg]+' × '+['Dev','Manushya','Rakshasa'][gg],kutas:[{n:'Varna',s:varna,m:1,d:'Spiritual'},{n:'Vashya',s:vashya,m:2,d:'Attraction'},{n:'Tara',s:tara,m:3,d:'Health'},{n:'Yoni',s:yoni,m:4,d:'Intimacy'},{n:'Graha Maitri',s:graha,m:5,d:'Mental bond'},{n:'Gana',s:gana,m:6,d:'Temperament'},{n:'Bhakuta',s:bhakuta,m:7,d:'Harmony'},{n:'Nadi',s:nadiScore,m:8,d:'Progeny'}]};}

// SVG Kundali
const SIP=[[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];
function KSvg({sid,lagna}){const ls=so(lagna),by=Array.from({length:12},()=>[]);const ab={Sun:'Su',Moon:'Mo',Mercury:'Me',Venus:'Ve',Mars:'Ma',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};const cl={Su:'#b07000',Mo:'#3b6faa',Me:'#1a7a40',Ve:'#aa2a7a',Ma:'#b02020',Ju:'#886000',Sa:'#6040a0',Ra:'#444',Ke:'#666'};for(const[n,l]of Object.entries(sid))by[so(l)].push(ab[n]);return(<svg viewBox="0 0 400 400" style={{width:'100%',maxWidth:370,display:'block',margin:'0 auto'}}><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffef8"/><stop offset="100%" stopColor="#fdf5e2"/></linearGradient><linearGradient id="gL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffaec"/><stop offset="100%" stopColor="#f9e9b8"/></linearGradient><linearGradient id="gC" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fdf9ee"/><stop offset="100%" stopColor="#faf1d8"/></linearGradient></defs>{SIP.map(([c,r],sign)=>{const x=c*100,y=r*100,isL=sign===ls,h=((sign-ls+12)%12)+1,pl=by[sign];return(<g key={sign}><rect x={x+.5} y={y+.5} width={99} height={99} fill={isL?'url(#gL)':'url(#g1)'} stroke={isL?'#a0720a':'#d4b060'} strokeWidth={isL?1.6:.7}/>{isL&&<><line x1={x+1.5} y1={y+1.5} x2={x+22} y2={y+1.5} stroke="#a0720a" strokeWidth="2.5"/><line x1={x+1.5} y1={y+1.5} x2={x+1.5} y2={y+22} stroke="#a0720a" strokeWidth="2.5"/></>}<text x={x+50} y={y+13} textAnchor="middle" fontSize="8.5" fill="#8a6020" fontFamily="Cinzel,serif" fontWeight="500">{RSH[sign]}</text><text x={x+96} y={y+13} textAnchor="end" fontSize="7.5" fill="#b09060" fontFamily="serif">{h}</text>{pl.map((a,i)=><text key={i} x={x+7+(i%2)*42} y={y+29+Math.floor(i/2)*15} fontSize="10.5" fill={cl[a]||'#3a1e08'} fontFamily="Cinzel,serif" fontWeight="500">{a}</text>)}</g>);})}<rect x={100.5} y={100.5} width={199} height={199} fill="url(#gC)" stroke="#d4b060" strokeWidth=".6"/><line x1={100} y1={100} x2={300} y2={300} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/><line x1={300} y1={100} x2={100} y2={300} stroke="#e8c86a" strokeWidth=".6" strokeDasharray="5,4"/><text x={200} y={194} textAnchor="middle" fontSize="26" fill="#c9a84c" fontFamily="serif" opacity=".9">ॐ</text><text x={200} y={213} textAnchor="middle" fontSize="7.5" fill="#b8860b" fontFamily="Cinzel,serif" letterSpacing="3">KUNDALI</text></svg>);}

function RText({text}){const secs=[];let cur=null;text.split('\n').forEach(line=>{const t=line.trim();if(!t)return;if(t.startsWith('## ')){if(cur)secs.push(cur);cur={title:t.slice(3),items:[]};}else{if(!cur)cur={title:null,items:[]};cur.items.push(t);}});if(cur)secs.push(cur);return(<div className="reading">{secs.map((s,i)=>(<div key={i}>{s.title&&<h3>{s.title}</h3>}{s.items.map((it,j)=>{if(it.startsWith('- ')||it.startsWith('• '))return<ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;if(it.startsWith('"'))return<div key={j} className="hlb">{it}</div>;return<p key={j}>{it}</p>;})}</div>))}</div>);}

const CITIES={delhi:[28.6517,77.2219],'new delhi':[28.6517,77.2219],mumbai:[19.076,72.8777],bombay:[19.076,72.8777],bangalore:[12.9716,77.5946],bengaluru:[12.9716,77.5946],chennai:[13.0827,80.2707],kolkata:[22.5726,88.3639],hyderabad:[17.385,78.4867],pune:[18.5204,73.8567],ahmedabad:[23.0225,72.5714],jaipur:[26.9124,75.7873],lucknow:[26.8467,80.9462],nagpur:[21.1458,79.0882],surat:[21.1702,72.8311],patna:[25.5941,85.1376],bhopal:[23.2599,77.4126],indore:[22.7196,75.8577],kochi:[9.9312,76.2673],trivandrum:[8.5241,76.9366],thiruvananthapuram:[8.5241,76.9366],visakhapatnam:[17.6868,83.2185],vizag:[17.6868,83.2185],agra:[27.1767,78.0081],varanasi:[25.3176,82.9739],srinagar:[34.0837,74.7973],chandigarh:[30.7333,76.7794],gurgaon:[28.4595,77.0266],gurugram:[28.4595,77.0266],noida:[28.5355,77.391],amritsar:[31.634,74.8723],jodhpur:[26.2389,73.0243],udaipur:[24.5854,73.7125],mysore:[12.2958,76.6394],mysuru:[12.2958,76.6394],nashik:[19.9975,73.7898],dehradun:[30.3165,78.0322],haridwar:[29.9457,78.1642],rishikesh:[30.0869,78.2676],prayagraj:[25.4358,81.8463],allahabad:[25.4358,81.8463],goa:[15.2993,74.124],tirupati:[13.6288,79.4192],madurai:[9.9252,78.1198],coimbatore:[11.0168,76.9558],leh:[34.1526,77.577],jammu:[32.7266,74.857],kathmandu:[27.7172,85.324],dhaka:[23.8103,90.4125],islamabad:[33.6844,73.0479],karachi:[24.8607,67.0011],lahore:[31.5497,74.3436],colombo:[6.9271,79.8612],dubai:[25.2048,55.2708],'abu dhabi':[24.4539,54.3773],riyadh:[24.7136,46.6753],doha:[25.2854,51.531],singapore:[1.3521,103.8198],'kuala lumpur':[3.139,101.6869],bangkok:[13.7563,100.5018],tokyo:[35.6762,139.6503],beijing:[39.9042,116.4074],'hong kong':[22.3193,114.1694],london:[51.5074,-0.1278],'new york':[40.7128,-74.006],'los angeles':[34.0522,-118.2437],toronto:[43.6532,-79.3832],sydney:[-33.8688,151.2093],paris:[48.8566,2.3522],berlin:[52.52,13.405],moscow:[55.7558,37.6173],istanbul:[41.0082,28.9784]};
function cityLookup(q){const s=q.toLowerCase().trim();if(CITIES[s])return CITIES[s];for(const[k,v]of Object.entries(CITIES))if(k.includes(s)||s.includes(k))return v;return null;}

async function callAI(messages,max_tokens=1000){const res=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens,messages})});const d=await res.json();if(d.error)throw new Error(d.error.message);return d.content?.map(b=>b.text||'').join('')||'';}

const SUGGS=['Is 2026-27 good for marriage?','Best career for my chart?','When is my financial peak?','Which gemstone to wear?','Explain my 7th house','What does my dasha mean?'];

// ─── ALL TABS ─────────────────────────────────────────────────────────────────
const TABS=[
  {id:'form',    label:'📋 Form'},
  {id:'chart',   label:'⬡ Kundali'},
  {id:'planets', label:'☉ Planets'},
  {id:'panchang',label:'📅 Panchang'},
  {id:'dasha',   label:'⌛ Dasha'},
  {id:'doshas',  label:'⚠ Doshas'},
  {id:'transits',label:'🔭 Transits'},
  {id:'chat',    label:'💬 Chat'},
  {id:'match',   label:'💍 Match'},
  {id:'remedies',label:'🙏 Remedies'},
  {id:'reading', label:'✦ Reading'},
];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [f,sf]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'5.5',place:'',lat:'',lon:''});
  const set=(k,v)=>sf(p=>({...p,[k]:v}));
  const [chart,setChart]=useState(null);
  const [dasha,setDasha]=useState(null);
  const [panch,setPanch]=useState(null);
  const [doshas,setDoshas]=useState(null);
  const [transits,setTransits]=useState(null);
  const [tab,setTab]=useState('form');  // ← FORM IS DEFAULT
  const [err,setErr]=useState('');
  const [geoLoad,setGeoLoad]=useState(false);
  const [geoErr,setGeoErr]=useState('');
  const [reading,setReading]=useState('');
  const [aiLoad,setAiLoad]=useState(false);
  const [aiErr,setAiErr]=useState('');
  const [remedies,setRemedies]=useState('');
  const [remLoad,setRemLoad]=useState(false);
  const [transitR,setTransitR]=useState('');
  const [trLoad,setTrLoad]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [cinput,setCinput]=useState('');
  const [cload,setCload]=useState(false);
  const chatEnd=useRef(null);
  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:'smooth'});},[msgs,cload]);
  const [p2,setP2]=useState({name:'',day:'',month:'',year:'',hour:'12',min:'00',tz:'5.5',place:'',lat:'',lon:''});
  const sp2=(k,v)=>setP2(p=>({...p,[k]:v}));
  const [matchR,setMatchR]=useState(null);
  const [mload,setMload]=useState(false);
  const [p2geo,setP2geo]=useState(false);
  const [p2err,setP2err]=useState('');

  const locate=async(place,onResult,setLoad,setE)=>{if(!place)return;setLoad(true);setE('');const loc=cityLookup(place);if(loc){onResult(loc[0].toFixed(4),loc[1].toFixed(4));setLoad(false);return;}try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0])onResult(d.results[0].latitude.toFixed(4),d.results[0].longitude.toFixed(4));else setE(`"${place}" not found — enter lat/lon manually`);}catch{setE('Network error — enter lat/lon manually');}setLoad(false);};

  const castChart=()=>{setErr('');const{year,month,day,hour,min,tz,lat,lon}=f;if(!year||!month||!day)return setErr('Please enter date of birth.');if(!lat||!lon)return setErr('Please locate your city or enter lat/lon manually.');try{const c=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);setChart(c);setDasha(getDasha(c.sid.Moon,+year,+month,+day));setPanch(getPanchang(c.jde,c.ay));setDoshas({mangal:getMangal(c.sid,c.lagna),ksd:getKSD(c.sid),sati:getSati(c.sid)});setTransits(getTransits(c.lagna));setReading('');setMsgs([]);setMatchR(null);setTransitR('');setRemedies('');setTab('chart');}catch(e){setErr('Error: '+e.message);}};

  const buildCtx=()=>{if(!chart)return'';const{sid,lagna}=chart,ls=so(lagna);return`${f.name||'Native'} | ${f.day}/${f.month}/${f.year} ${f.hour||12}:${(f.min||'0').padStart(2,'0')} UTC+${f.tz} | ${f.place}\nLagna:${RS[ls]} | Moon:${RS[so(sid.Moon)]} | Nak:${NK[no(sid.Moon)]} Pada${po(sid.Moon)}\n${Object.entries(sid).map(([n,l])=>`${n}:${RS[so(l)]} H${((so(l)-ls+12)%12)+1}`).join(', ')}\n${dasha?.curr?`Mahadasha:${FN[dasha.curr.lord]} until ${dasha.curr.end.toFixed(1)}`:''}`;};

  const doReading=async()=>{setAiLoad(true);setAiErr('');try{setReading(await callAI([{role:'user',content:`Master Vedic astrologer. Deep personalised Jyotish reading for:\n${buildCtx()}\n\nUse ## sections: Lagna & Personality, Moon & Nakshatra, Key Yogas, Doshas, Career, Wealth, Relationships, Dasha 2026, Remedies, Divine Insight. Reference degrees and Sanskrit terms.`}]));setTab('reading');}catch(e){setAiErr(e.message);}setAiLoad(false);};

  const sendChat=async(text)=>{const t=text||cinput;if(!t.trim()||cload)return;setCinput('');const nm=[...msgs,{role:'user',content:t}];setMsgs(nm);setCload(true);try{const reply=await callAI([{role:'user',content:`Jyotish Acharya. Answer concisely (150-200 words) about this chart:\n${buildCtx()}`},{role:'assistant',content:'Ready to answer.'}, ...nm],600);setMsgs(p=>[...p,{role:'assistant',content:reply}]);}catch{setMsgs(p=>[...p,{role:'assistant',content:'Connection error. Try again.'}]);}setCload(false);};

  const doRemedies=async()=>{setRemLoad(true);try{setRemedies(await callAI([{role:'user',content:`Vedic Upaya specialist. Personalised remedies for:\n${buildCtx()}\n\nUse ## sections: Daily Mantras, Gemstone, Fasting Schedule, Dana/Charity, Puja & Rituals, Lifestyle. Be specific — which mantra, how many times, which day, which stone, which metal, which finger.`}],900));}catch(e){}setRemLoad(false);};

  const doTransitR=async()=>{setTrLoad(true);const ts=(transits||[]).map(t=>`${t.planet}→${t.signName} H${t.house}`).join(', ');try{setTransitR(await callAI([{role:'user',content:`Vedic astrologer. April 2026 transits vs natal:\n${buildCtx()}\nTransits: ${ts}\n\nUse ## sections: Key Influences Now, Career April 2026, Relationships, Health, Action Steps.`}]));}catch(e){}setTrLoad(false);};

  const doMatch=async()=>{const{year,month,day,hour,min,tz,lat,lon}=p2;if(!year||!month||!day||!lat||!lon)return;setMload(true);try{const c2=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);setMatchR({res:matchKutas(no(chart.sid.Moon),so(chart.sid.Moon),no(c2.sid.Moon),so(c2.sid.Moon)),p1nak:no(chart.sid.Moon),p1sign:so(chart.sid.Moon),p2nak:no(c2.sid.Moon),p2sign:so(c2.sid.Moon)});}catch(e){}setMload(false);};

  const ls=chart?so(chart.lagna):null;
  const anyDosha=doshas&&(doshas.mangal.effective||doshas.ksd.hasKSD||doshas.sati.inSati);
  const cg=panch?getChog(panch.vara):null;

  // Empty state component
  const Emp=({icon})=>(
    <div className="emp">
      <span className="emp-i">{icon}</span>
      <div className="emp-t">No chart cast yet</div>
      <div className="emp-s">Go to the <strong>📋 Form</strong> tab, enter your birth details, then tap <strong>Cast Kundali</strong>.</div>
      <span className="emp-a" onClick={()=>setTab('form')}>→ Go to Form</span>
    </div>
  );

  return(
    <>
      <style>{FONTS}{CSS}</style>
      <div className="app">
        <div className="wrap">

          {/* Small header */}
          <div className="hdr">
            <span className="hom">ॐ</span>
            <h1 className="htitle">Jyotish AI</h1>
            <p className="hsub">Swiss Ephemeris · Panchang · Doshas · AI Chat · Kundali Matching · Transits · Remedies</p>
          </div>

          {/* ╔═══════════════════════════════════════════════════╗
              ║  MAIN BOX                                         ║
              ║  First child = TAB BAR (unconditional)            ║
              ╚═══════════════════════════════════════════════════╝ */}
          <div className="box">

            {/* ████ TAB BAR — ALWAYS RENDERED, NO CONDITION ████ */}
            <div className="tbar">
              {TABS.map(t=>(
                <div
                  key={t.id}
                  className={`ti${tab===t.id?' on':''}`}
                  onClick={()=>setTab(t.id)}
                >
                  {t.label}
                </div>
              ))}
            </div>

            {/* Snapshot strip — only when chart exists */}
            {chart&&(
              <div className="snaps">
                <div className="sn"><div className="snv">{RS[ls]}</div><div className="snk">Lagna · {RE[ls]}</div></div>
                <div className="sn"><div className="snv">{RS[so(chart.sid.Moon)]}</div><div className="snk">Moon Sign</div></div>
                <div className="sn"><div className="snv" style={{fontSize:9.5}}>{NK[no(chart.sid.Moon)]}</div><div className="snk">Nakshatra · Pada {po(chart.sid.Moon)}</div></div>
                {dasha?.curr&&<div className="sn"><div className="snv">{FN[dasha.curr.lord]}</div><div className="snk">Mahadasha</div></div>}
                {panch&&<div className="sn"><div className="snv" style={{fontSize:9.5}}>{panch.tithi}</div><div className="snk">Tithi</div></div>}
                <div className="sn">
                  <div className="snv" style={{color:anyDosha?'var(--red)':'var(--green)',fontSize:10}}>{anyDosha?'⚠ Present':'✓ Clear'}</div>
                  <div className="snk">Doshas</div>
                  {anyDosha?<span className="sbdg r">!</span>:<span className="sbdg g">✓</span>}
                </div>
              </div>
            )}

            {/* Tab content area */}
            <div className="tc">

              {/* 📋 FORM */}
              {tab==='form'&&(
                <div>
                  <div className="stitle">✦ Birth Details</div>
                  <div className="g2">
                    <div className="fg"><label className="lbl">Full Name</label><input className="fi" placeholder="e.g. Aditya Sharma" value={f.name} onChange={e=>set('name',e.target.value)}/></div>
                    <div className="fg"><label className="lbl">Date of Birth (DD / MM / YYYY)</label><div className="frow"><input className="fi" placeholder="DD" maxLength={2} value={f.day} onChange={e=>set('day',e.target.value)} style={{width:52}}/><input className="fi" placeholder="MM" maxLength={2} value={f.month} onChange={e=>set('month',e.target.value)} style={{width:52}}/><input className="fi" placeholder="YYYY" maxLength={4} value={f.year} onChange={e=>set('year',e.target.value)} style={{width:80}}/></div></div>
                    <div className="fg"><label className="lbl">Time of Birth (24h)</label><div className="frow"><input className="fi" placeholder="HH" maxLength={2} value={f.hour} onChange={e=>set('hour',e.target.value)} style={{width:64}}/><input className="fi" placeholder="MM" maxLength={2} value={f.min} onChange={e=>set('min',e.target.value)} style={{width:64}}/></div></div>
                    <div className="fg"><label className="lbl">UTC Offset (IST = 5.5)</label><input className="fi" placeholder="5.5" value={f.tz} onChange={e=>set('tz',e.target.value)}/></div>
                    <div className="fg full"><label className="lbl">Place of Birth</label>
                      <div className="lrow">
                        <div className="fg"><input className="fi" placeholder="e.g. New Delhi, India" value={f.place} onChange={e=>set('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&locate(f.place,(la,lo)=>sf(p=>({...p,lat:la,lon:lo})),setGeoLoad,setGeoErr)}/></div>
                        <button className="bo" disabled={geoLoad||!f.place} onClick={()=>locate(f.place,(la,lo)=>sf(p=>({...p,lat:la,lon:lo})),setGeoLoad,setGeoErr)}>{geoLoad?'…':'🌐 Locate'}</button>
                      </div>
                      {geoErr?<p className="fh" style={{color:'var(--red)'}}>⚠ {geoErr}</p>:<p className="fh">150+ cities built-in · Or enter lat/lon below</p>}
                      {f.lat&&f.lon&&<p className="fh" style={{color:'var(--gold)'}}>✓ {f.lat}°N, {f.lon}°E</p>}
                    </div>
                    <div className="fg"><label className="lbl">Latitude (°N)</label><input className="fi" placeholder="28.6517" value={f.lat} onChange={e=>set('lat',e.target.value)}/></div>
                    <div className="fg"><label className="lbl">Longitude (°E)</label><input className="fi" placeholder="77.2219" value={f.lon} onChange={e=>set('lon',e.target.value)}/></div>
                  </div>
                  {err&&<div className="ferr">⚠ {err}</div>}
                  <div className="acts"><button className="bg" onClick={castChart}>✦ Cast Kundali</button></div>
                </div>
              )}

              {/* ⬡ KUNDALI */}
              {tab==='chart'&&(chart?<div style={{textAlign:'center'}}><KSvg sid={chart.sid} lagna={chart.lagna}/><p style={{fontSize:10.5,color:'var(--muted)',fontStyle:'italic',marginTop:10,letterSpacing:'.06em'}}>Lahiri Ayanamsa {chart.ay.toFixed(3)}° · Whole Sign · South Indian</p></div>:<Emp icon="⬡"/>)}

              {/* ☉ PLANETS */}
              {tab==='planets'&&(chart?(
                <table className="pt">
                  <thead><tr><th>Planet</th><th>Sidereal Lon.</th><th>Rashi</th><th>House</th><th>Deg in Sign</th></tr></thead>
                  <tbody>
                    {['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu','Ketu'].map(nm=>{const l=chart.sid[nm],s=so(l),h=((s-ls+12)%12)+1;return(<tr key={nm}><td><span style={{color:PC[nm],marginRight:3,fontSize:12}}>{GL[nm]}</span><span className="pn">{nm}</span></td><td><span className="pd">{l.toFixed(3)}°</span></td><td><span className="ps2">{RS[s]}</span> <span style={{fontSize:10.5,color:'var(--muted)'}}>({RE[s]})</span></td><td><span className="ph">{h}</span></td><td><span className="pd">{di(l).toFixed(2)}°</span></td></tr>);})}
                    <tr><td><span style={{color:'var(--amber)',marginRight:3,fontSize:12}}>⬡</span><span className="pn">Lagna</span></td><td><span className="pd">{chart.lagna.toFixed(3)}°</span></td><td><span className="ps2">{RS[ls]}</span></td><td><span className="ph">1</span></td><td><span className="pd">{di(chart.lagna).toFixed(2)}°</span></td></tr>
                  </tbody>
                </table>
              ):<Emp icon="☉"/>)}

              {/* 📅 PANCHANG */}
              {tab==='panchang'&&(panch?(
                <div>
                  <div className="pg">
                    <div className="pc"><div className="pl">Tithi</div><div className="pv">{panch.tithi} <span className={`pak ${panch.paksha==='Shukla'?'s':'k'}`}>{panch.paksha}</span></div><div className="psb">Day {panch.tnum}</div></div>
                    <div className="pc"><div className="pl">Vara · Day Lord</div><div className="pv">{panch.varaS}vara</div><div className="psb">{panch.varaName} · {panch.varaLord}</div></div>
                    <div className="pc"><div className="pl">Nakshatra</div><div className="pv">{panch.nakName}</div><div className="psb">Pada {po(chart.sid.Moon)} · {FN[NL[panch.nak]]}</div></div>
                    <div className="pc"><div className="pl">Yoga</div><div className="pv" style={{color:panch.yogaBad?'var(--red)':'var(--deep)'}}>{panch.yogaName}</div><div className="psb">{panch.yogaBad?'⚠ Inauspicious':'Auspicious'}</div></div>
                    <div className="pc"><div className="pl">Karana</div><div className="pv">{panch.karana}</div><div className="psb">{panch.karana==='Vishti'?'⚠ Bhadra':'Half-tithi'}</div></div>
                    <div className="pc"><div className="pl">Rahu Kala</div><div className="pv" style={{color:'var(--red)',fontSize:11.5}}>{panch.rahuKala}</div><div className="psb">From 6am sunrise</div></div>
                  </div>
                  <div style={{marginTop:18}}>
                    <div className="stitle">✦ Choghadiya — Birth Day Time Slots</div>
                    <div className="cg">{cg.map((s,i)=><div key={i} className={`cs ${s.qual}`}><div className="cn">{s.name}</div><div className="ct">{s.time}</div><span className={`ctg ${s.qual}`}>{s.qual==='good'?'Auspicious':s.qual==='bad'?'Inauspicious':'Neutral'}</span><div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{s.desc}</div></div>)}</div>
                  </div>
                </div>
              ):<Emp icon="📅"/>)}

              {/* ⌛ DASHA */}
              {tab==='dasha'&&(dasha?(
                <div>
                  <p style={{fontSize:13,color:'var(--muted)',fontStyle:'italic',marginBottom:11}}>Janma Nakshatra: <strong style={{color:'var(--deep)'}}>{NK[dasha.nak]}</strong> · Birth Lord: <strong style={{color:'var(--deep)'}}>{FN[dasha.lord]}</strong></p>
                  {dasha.curr&&<div className="dnow"><div className="dlbl">CURRENTLY RUNNING · APRIL 2026</div><div className="dmain">{FN[dasha.curr.lord]} Mahadasha</div><div className="dsub">{dasha.curr.start.toFixed(1)} — {dasha.curr.end.toFixed(1)} · {DY[dasha.curr.lord]} years</div></div>}
                  <div className="dseq">{dasha.seq.map((d,i)=>{const iC=dasha.curr?.lord===d.lord&&Math.abs((dasha.curr?.start||0)-d.start)<.01,iP=d.end<2026.25;return(<div key={i} className={`dchip${iC?' on':iP?' done':''}`}><span>{FN[d.lord]}</span><span className="dyr">{DY[d.lord]}y · {Math.round(d.start)}–{Math.round(d.end)}</span></div>);})}</div>
                </div>
              ):<Emp icon="⌛"/>)}

              {/* ⚠ DOSHAS */}
              {tab==='doshas'&&(doshas?(
                <div>
                  <div className="db">
                    <div className="dh"><span className="di">♂</span><div><div className="dt">Mangal Dosha</div><div className="ds2">Kuja Dosha · Bhauma Dosha</div></div></div>
                    <div className={`dc ${doshas.mangal.effective?'yes':doshas.mangal.dosha&&doshas.mangal.exc.length?'maybe':'no'}`}>
                      <div className="dstat">{doshas.mangal.effective?'⚠ Present':doshas.mangal.dosha&&doshas.mangal.exc.length?'◑ Cancelled':'✓ Absent'}</div>
                      <div className="ddesc">{doshas.mangal.effective?`Mars in House ${doshas.mangal.marsHouse} — Mangal Dosha present.`:doshas.mangal.dosha?`Mars in House ${doshas.mangal.marsHouse} — exception applies.`:`Mars in House ${doshas.mangal.marsHouse} — no Mangal Dosha.`}</div>
                      {doshas.mangal.exc.length>0&&<div className="ddet">{doshas.mangal.exc.map((ex,i)=><div key={i} className="dr"><span className="drl">Exception</span><span className="drv">{ex}</span></div>)}</div>}
                      <div className="ddet"><div className="dr"><span className="drl">Mars</span><span className="drv">{RS[doshas.mangal.marsSign]} · H{doshas.mangal.marsHouse} · {di(chart.sid.Mars).toFixed(1)}°</span></div></div>
                    </div>
                  </div>
                  <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'14px 0'}}/>
                  <div className="db">
                    <div className="dh"><span className="di">🐍</span><div><div className="dt">Kala Sarpa Dosha</div><div className="ds2">All planets between Rahu–Ketu axis</div></div></div>
                    <div className={`dc ${doshas.ksd.hasKSD?'yes':'no'}`}>
                      <div className="dstat">{doshas.ksd.hasKSD?'⚠ Present':'✓ Absent'}</div>
                      <div className="ddesc">{doshas.ksd.hasKSD?`${doshas.ksd.direction}. ${doshas.ksd.ksdType} Kala Sarpa Yoga.`:'Planets on both sides of Rahu–Ketu. KSD absent.'}</div>
                      {doshas.ksd.hasKSD&&<div className="ddet"><div className="dr"><span className="drl">Type</span><span className="drv">{doshas.ksd.ksdType}</span></div><div className="dr"><span className="drl">Rahu in</span><span className="drv">{RS[doshas.ksd.rahuSign]}</span></div></div>}
                    </div>
                  </div>
                  <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'14px 0'}}/>
                  <div className="db">
                    <div className="dh"><span className="di">♄</span><div><div className="dt">Shani Sade Sati</div><div className="ds2">Saturn transit · April 2026</div></div></div>
                    <div className={`dc ${doshas.sati.inSati?'yes':doshas.sati.inDh?'maybe':'no'}`}>
                      <div className="dstat">{doshas.sati.inSati?`⚠ Sade Sati — ${doshas.sati.phase}`:doshas.sati.inDh?'◑ Dhaiya Active':'✓ Not Active'}</div>
                      <div className="ddesc">{doshas.sati.inSati?`Saturn in ${doshas.sati.satSignName} — ${doshas.sati.phase} phase. Moon in ${doshas.sati.moonSignName}.`:doshas.sati.inDh?`Dhaiya active. Saturn in ${doshas.sati.satSignName}.`:`Saturn in ${doshas.sati.satSignName}. Moon in ${doshas.sati.moonSignName}. Clear.`}</div>
                      <div className="ddet"><div className="dr"><span className="drl">Moon</span><span className="drv">{doshas.sati.moonSignName}</span></div><div className="dr"><span className="drl">Saturn</span><span className="drv">{doshas.sati.satSignName} · Apr 2026</span></div></div>
                      <div className="sph-row">{doshas.sati.phases.map((ph,i)=><div key={i} className={`sph ${ph.active?'on':'off'}`}>{ph.name}<br/><span style={{fontSize:7,opacity:.7}}>{ph.sign}</span></div>)}</div>
                    </div>
                  </div>
                </div>
              ):<Emp icon="⚠"/>)}

              {/* 🔭 TRANSITS */}
              {tab==='transits'&&(transits?(
                <div>
                  <p style={{fontStyle:'italic',color:'var(--muted)',fontSize:13.5,marginBottom:13}}>Today's planets (April 2, 2026) in your natal houses.</p>
                  <div style={{marginBottom:14}}>{transits.map((t,i)=><div key={i} className="tr"><span className="trp"><span style={{color:PC[t.planet]||'var(--amber)',marginRight:3}}>{GL[t.planet]||'•'}</span>{t.planet}</span><span style={{color:'var(--muted)',fontSize:10}}>→</span><span className="trs">{t.signName} <span style={{fontSize:10.5,color:'var(--muted)'}}>({t.signEn})</span></span><span className="trh">H{t.house}</span></div>)}</div>
                  {!transitR&&!trLoad&&<div style={{textAlign:'center',padding:'10px 0'}}><button className="bg" onClick={doTransitR}>🔭 Get April 2026 Transit Reading</button></div>}
                  {trLoad&&<div className="ld"><div className="lr"/><div className="lt">Analysing Transits</div></div>}
                  {transitR&&<><RText text={transitR}/><div className="acts"><button className="bgh" onClick={()=>setTransitR('')}>↺ Refresh</button></div></>}
                </div>
              ):<Emp icon="🔭"/>)}

              {/* 💬 CHAT */}
              {tab==='chat'&&(chart?(
                <div className="chat">
                  {msgs.length===0&&<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontStyle:'italic',color:'var(--muted)',fontSize:14.5,lineHeight:1.8,padding:'16px'}}>Ask anything about your chart.<br/><span style={{fontSize:12.5}}>Full chart context already loaded.</span></div>}
                  {msgs.length>0&&<div className="chatmsgs">{msgs.map((m,i)=><div key={i} className={`cm ${m.role==='user'?'u':'a'}`}><div className="cml">{m.role==='user'?'You':'Jyotish AI'}</div><div className="cmb">{m.content}</div></div>)}{cload&&<div className="typing2"><div className="dot"/><div className="dot"/><div className="dot"/></div>}<div ref={chatEnd}/></div>}
                  <div className="csuggs">{SUGGS.map((s,i)=><span key={i} className="sg" onClick={()=>sendChat(s)}>{s}</span>)}</div>
                  <div className="cir"><textarea className="cinp" rows={2} placeholder="Ask about your chart…" value={cinput} onChange={e=>setCinput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}}}/><button className="bg" onClick={()=>sendChat()} disabled={cload||!cinput.trim()} style={{alignSelf:'flex-end',padding:'9px 14px'}}>Send</button></div>
                </div>
              ):<Emp icon="💬"/>)}

              {/* 💍 MATCH */}
              {tab==='match'&&(chart?(
                <div>
                  <p style={{fontStyle:'italic',color:'var(--muted)',fontSize:13.5,marginBottom:14}}>Ashta Kuta (36 Guna) compatibility — enter partner's birth details.</p>
                  <div className="g2" style={{marginBottom:11}}>
                    <div className="fg"><label className="lbl">Partner Name</label><input className="fi" placeholder="Partner's name" value={p2.name} onChange={e=>sp2('name',e.target.value)}/></div>
                    <div className="fg"><label className="lbl">Date of Birth</label><div className="frow"><input className="fi" placeholder="DD" maxLength={2} value={p2.day} onChange={e=>sp2('day',e.target.value)} style={{width:52}}/><input className="fi" placeholder="MM" maxLength={2} value={p2.month} onChange={e=>sp2('month',e.target.value)} style={{width:52}}/><input className="fi" placeholder="YYYY" maxLength={4} value={p2.year} onChange={e=>sp2('year',e.target.value)} style={{width:80}}/></div></div>
                    <div className="fg"><label className="lbl">Time (HH MM)</label><div className="frow"><input className="fi" placeholder="HH" maxLength={2} value={p2.hour} onChange={e=>sp2('hour',e.target.value)} style={{width:64}}/><input className="fi" placeholder="MM" maxLength={2} value={p2.min} onChange={e=>sp2('min',e.target.value)} style={{width:64}}/></div></div>
                    <div className="fg"><label className="lbl">UTC Offset</label><input className="fi" placeholder="5.5" value={p2.tz} onChange={e=>sp2('tz',e.target.value)}/></div>
                    <div className="fg full"><label className="lbl">Place of Birth</label>
                      <div className="lrow"><div className="fg"><input className="fi" placeholder="Partner's birth place" value={p2.place} onChange={e=>sp2('place',e.target.value)} onKeyDown={e=>e.key==='Enter'&&locate(p2.place,(la,lo)=>setP2(p=>({...p,lat:la,lon:lo})),setP2geo,setP2err)}/></div><button className="bo" disabled={p2geo||!p2.place} onClick={()=>locate(p2.place,(la,lo)=>setP2(p=>({...p,lat:la,lon:lo})),setP2geo,setP2err)}>{p2geo?'…':'🌐 Locate'}</button></div>
                      {p2err&&<p className="fh" style={{color:'var(--red)'}}>⚠ {p2err}</p>}
                      {p2.lat&&p2.lon&&<p className="fh" style={{color:'var(--gold)'}}>✓ {p2.lat}°N, {p2.lon}°E</p>}
                    </div>
                    <div className="fg"><label className="lbl">Latitude</label><input className="fi" placeholder="28.6517" value={p2.lat} onChange={e=>sp2('lat',e.target.value)}/></div>
                    <div className="fg"><label className="lbl">Longitude</label><input className="fi" placeholder="77.2219" value={p2.lon} onChange={e=>sp2('lon',e.target.value)}/></div>
                  </div>
                  <div className="acts"><button className="bg" onClick={doMatch} disabled={mload||!p2.year||!p2.lat}>💍 {mload?'Calculating…':'Calculate Compatibility'}</button></div>
                  {matchR&&(()=>{const{total,kutas,nadiDosha,ganaDosha,nadiStr,ganaStr}=matchR.res;const v=total>=31?{l:'Excellent Match',c:'var(--green)',bg:'var(--gbg)',bc:'var(--gbc)',d:'Highly auspicious — a divinely aligned union.'}:total>=21?{l:'Good Match',c:'var(--gold)',bg:'#fffbe8',bc:'#d4aa40',d:'Compatible and harmonious alliance.'}:total>=17?{l:'Average Match',c:'var(--amber)',bg:'var(--cream)',bc:'var(--border)',d:'Acceptable with awareness of challenges.'}:{l:'Needs Consideration',c:'var(--red)',bg:'var(--rbg)',bc:'var(--rbc)',d:'Careful deliberation advised.'};return(<div style={{marginTop:16}}><div className="mv" style={{background:v.bg,border:`1.5px solid ${v.bc}`}}><div className="sring" style={{borderColor:v.c}}><span className="snum" style={{color:v.c}}>{total}</span><span className="sden">/36</span></div><div className="mvt" style={{color:v.c}}>{v.l}</div><div className="mvd">{v.d}</div>{nadiDosha&&<div style={{marginTop:8,padding:'4px 11px',background:'var(--rbg)',border:'1px solid var(--rbc)',borderRadius:5,fontSize:12,color:'var(--red)'}}>⚠ Nadi Dosha ({nadiStr}) — consult astrologer</div>}{ganaDosha&&<div style={{marginTop:6,padding:'4px 11px',background:'rgba(160,100,0,.06)',border:'1px solid rgba(160,100,0,.2)',borderRadius:5,fontSize:12,color:'#8a6000'}}>⚠ Gana Dosha ({ganaStr})</div>}<div style={{marginTop:9,fontSize:10.5,color:'var(--muted)',fontFamily:'var(--fh)',letterSpacing:'.07em'}}>{f.name||'P1'}: {NK[matchR.p1nak]} ({RS[matchR.p1sign]}) · {p2.name||'P2'}: {NK[matchR.p2nak]} ({RS[matchR.p2sign]})</div></div><div className="kgrid">{kutas.map((k,i)=><div key={i} className="kut"><div className="kn">{k.n}</div><div><span className="ks" style={{color:k.s/k.m>0.5?'var(--green)':k.s===0?'var(--red)':'var(--amber)'}}>{k.s}</span><span className="km"> / {k.m}</span></div><div className="kbar"><div className="kfill" style={{width:`${(k.s/k.m)*100}%`,background:k.s/k.m>0.5?'var(--green)':k.s===0?'var(--red)':'var(--gold2)'}}/></div><div style={{fontSize:9.5,color:'var(--muted)',marginTop:2}}>{k.d}</div></div>)}</div></div>);})()}
                </div>
              ):<Emp icon="💍"/>)}

              {/* 🙏 REMEDIES */}
              {tab==='remedies'&&(chart?(
                <div>
                  {!remedies&&!remLoad&&<div style={{textAlign:'center',padding:'26px 0'}}><p style={{fontStyle:'italic',color:'var(--muted)',fontSize:14.5,marginBottom:18,lineHeight:1.85}}>Get personalised Vedic remedies — mantras, gemstones, fasting, puja — based on your chart and doshas.</p><button className="bg" onClick={doRemedies}>🙏 Generate My Remedies</button></div>}
                  {remLoad&&<div className="ld"><div className="lr"/><div className="lt">Consulting Classical Texts</div><div className="ls2">Preparing your Upaya…</div></div>}
                  {remedies&&<><RText text={remedies}/><div className="acts"><button className="bgh" onClick={()=>setRemedies('')}>↺ Regenerate</button></div></>}
                </div>
              ):<Emp icon="🙏"/>)}

              {/* ✦ READING */}
              {tab==='reading'&&(chart?(
                <div>
                  {!reading&&!aiLoad&&<div style={{textAlign:'center',padding:'26px 0'}}><p style={{fontStyle:'italic',color:'var(--muted)',fontSize:14.5,marginBottom:18,lineHeight:1.85}}>Chart computed with Swiss Ephemeris precision.<br/>Generate your full personalised Jyotish reading.</p><div className="acts" style={{justifyContent:'center',marginTop:0}}><button className="bg" onClick={doReading}>✦ Generate Full Reading</button><button className="bgh" onClick={()=>window.print()}>⎙ Print PDF</button></div>{aiErr&&<div className="ferr" style={{marginTop:10}}>{aiErr}</div>}</div>}
                  {aiLoad&&<div className="ld"><div className="lr"/><div className="lt">Consulting the Grahas</div><div className="ls2">Reading Brihat Parashara Hora Shastra…</div></div>}
                  {reading&&<><RText text={reading}/><div className="acts" style={{marginTop:14}}><button className="bgh" onClick={()=>setReading('')}>↺ Regenerate</button><button className="bgh" onClick={()=>window.print()}>⎙ Print PDF</button></div></>}
                </div>
              ):<Emp icon="✦"/>)}

            </div>{/* end .tc */}
          </div>{/* end .box */}

          <p style={{textAlign:'center',fontSize:10,color:'var(--muted)',fontStyle:'italic',margin:'12px 0 0',letterSpacing:'.06em'}}>
            Meeus · JPL Keplerian · Lahiri Ayanamsa · Whole Sign houses
          </p>
        </div>
      </div>
    </>
  );
}
