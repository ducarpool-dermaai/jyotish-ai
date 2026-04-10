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
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:16px;
  -webkit-text-size-adjust:100%}
.app{min-height:100vh}
.wrap{max-width:900px;margin:0 auto;padding:0 14px 80px}

/* ── HEADER ── */
.hdr{text-align:center;padding:22px 0 16px}
.hom{font-size:32px;color:var(--gold2);display:block;margin-bottom:4px;
  animation:glow 4s ease infinite}
@keyframes glow{0%,100%{text-shadow:0 0 12px rgba(201,146,28,.3)}
  50%{text-shadow:0 0 28px rgba(201,146,28,.6)}}
.htitle{font-family:var(--fh);font-size:clamp(20px,5vw,38px);font-weight:500;
  letter-spacing:.12em;color:var(--gold);line-height:1.2}
.hsub{font-size:11.5px;color:var(--muted);font-style:italic;margin-top:4px;
  letter-spacing:.08em;line-height:1.5}
@media(min-width:600px){.hom{font-size:38px}.hsub{font-size:14px}}

/* ── MAIN BOX ── */
.box{background:var(--card);border:1px solid var(--border);border-radius:13px;
  box-shadow:0 2px 18px rgba(160,100,10,.08),inset 0 1px 0 rgba(255,255,255,.8);
  overflow:hidden}

/* ═══════════════════════════════════════════
   TWO-ROW TAB BAR — always visible, always first
   Row 1: Kundali, Planets, Panchang, Dasha, Doshas
   Row 2: Transits, Chat, Match, Remedies + Reading (gold)
═══════════════════════════════════════════ */
.tbar2{
  display:flex;
  flex-direction:column;
  gap:2px;
  background:var(--light);
  padding:4px;
  border-bottom:1px solid var(--border);
}
.trow{
  display:flex;
  gap:2px;
}
.ti{
  flex:1;
  min-width:0;
  padding:8px 2px;
  text-align:center;
  cursor:pointer;
  border-radius:7px;
  transition:all .18s;
  user-select:none;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:3px;
  -webkit-tap-highlight-color:transparent;
}
.ti:active{transform:scale(.96)}
.ti.on{background:var(--card);box-shadow:0 1px 5px rgba(0,0,0,.1)}
.ti-icon{font-size:16px;line-height:1;display:block}
.ti-label{
  font-family:var(--fh);font-size:8px;letter-spacing:.05em;
  color:var(--muted);text-transform:uppercase;
  white-space:nowrap;overflow:hidden;
  max-width:100%;text-overflow:ellipsis;
  display:block;
}
.ti.on .ti-label{color:var(--amber);font-weight:500}

/* Reading tab — gold gradient, always stands out */
.ti.ti-reading{
  background:linear-gradient(135deg,#b8820e,#a0720a);
  border-radius:7px;
  flex:1.4;
}
.ti.ti-reading .ti-icon{color:#fff;font-size:15px}
.ti.ti-reading .ti-label{color:rgba(255,255,255,.9);font-weight:600;font-size:8.5px}
.ti.ti-reading.on{
  background:linear-gradient(135deg,#d4980f,#c07a10);
  box-shadow:0 2px 10px rgba(160,100,10,.4);
}
.ti.ti-reading:active{transform:scale(.96)}

@media(min-width:600px){
  .ti{padding:9px 4px}
  .ti-icon{font-size:17px}
  .ti-label{font-size:8.5px}
  .ti.ti-reading .ti-label{font-size:9px}
}

/* form card css removed */

/* ── SNAPSHOT BAR ── */
.snaps{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px 11px;
  border-bottom:1px solid var(--border);background:var(--cream)}
.sn{background:var(--card);border:1px solid var(--border);border-radius:7px;
  padding:7px 8px;text-align:center;flex:1;min-width:70px;position:relative}
.snv{font-family:var(--fh);font-size:10.5px;letter-spacing:.05em;color:var(--amber);
  margin-bottom:2px;line-height:1.3;word-break:break-word}
.snk{font-size:9px;color:var(--muted);line-height:1.3}
.sbdg{position:absolute;top:-4px;right:-4px;font-size:7px;padding:2px 4px;
  border-radius:5px;color:#fff;font-family:var(--fh)}
.sbdg.r{background:var(--red)}.sbdg.g{background:var(--green)}
@media(min-width:600px){
  .snv{font-size:12px}.snk{font-size:10.5px}
  .sn{padding:9px 10px}
}

/* ── TAB CONTENT ── */
.tc{padding:18px 16px}
@media(min-width:600px){.tc{padding:22px 26px}}

/* ── EMPTY STATE ── */
.emp{text-align:center;padding:44px 16px;color:var(--muted)}
.emp-i{font-size:32px;display:block;margin-bottom:11px;opacity:.28}
.emp-t{font-family:var(--fh);font-size:11px;letter-spacing:.18em;color:var(--gold);
  text-transform:uppercase;margin-bottom:8px}
.emp-s{font-style:italic;font-size:15px;line-height:1.85}
.emp-a{display:inline-block;margin-top:14px;font-family:var(--fh);font-size:9px;
  letter-spacing:.15em;color:var(--amber);text-transform:uppercase;cursor:pointer;
  padding:8px 16px;border:1px solid var(--amber);border-radius:20px}

/* ── FORM ── */
.g2{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:500px){.g2{grid-template-columns:1fr 1fr}}
.fg{display:flex;flex-direction:column;gap:5px}
.fg.full{grid-column:1/-1}
.lbl{font-family:var(--fh);font-size:9px;letter-spacing:.18em;color:var(--gold);
  text-transform:uppercase}
.fi{background:var(--bg);border:1px solid var(--border);border-radius:7px;
  color:var(--text);font-family:var(--fb);font-size:16px;padding:11px 13px;
  outline:none;width:100%;transition:border-color .18s;
  -webkit-appearance:none;appearance:none;min-height:44px}
.fi:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.1)}
.fi::placeholder{color:var(--muted);font-style:italic;font-size:14px}
.frow{display:flex;gap:6px}
.fh{font-size:11px;color:var(--muted);font-style:italic;margin-top:2px}
.lrow{display:flex;gap:8px;align-items:flex-end}
.lrow .fg{flex:1}
.ferr{background:var(--rbg);border:1px solid var(--rbc);border-radius:7px;
  padding:10px 13px;color:var(--red);font-size:13.5px;margin-top:10px;line-height:1.6}

/* ── BUTTONS ── */
.bg{background:linear-gradient(135deg,#c07a10,var(--gold));color:#fff;border:none;
  border-radius:9px;font-family:var(--fh);font-size:10px;letter-spacing:.18em;
  padding:13px 22px;cursor:pointer;transition:opacity .18s,transform .15s;
  box-shadow:0 3px 12px rgba(160,100,10,.22);text-transform:uppercase;
  min-height:44px;touch-action:manipulation}
.bg:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
.bg:disabled{opacity:.33;cursor:not-allowed}
.bo{background:transparent;border:1.5px solid var(--gold);color:var(--gold);
  border-radius:7px;font-family:var(--fh);font-size:9px;letter-spacing:.14em;
  padding:10px 14px;cursor:pointer;transition:all .18s;text-transform:uppercase;
  white-space:nowrap;min-height:44px;touch-action:manipulation}
.bo:hover:not(:disabled){background:rgba(160,100,10,.07)}
.bo:disabled{opacity:.33;cursor:not-allowed}
.bgh{background:transparent;border:1px solid var(--border);color:var(--muted);
  border-radius:7px;font-family:var(--fh);font-size:8px;letter-spacing:.13em;
  padding:9px 13px;cursor:pointer;transition:all .18s;text-transform:uppercase;
  min-height:44px;touch-action:manipulation}
.bgh:hover{border-color:var(--gold);color:var(--gold)}
.acts{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:16px}
@media(max-width:480px){
  .acts{justify-content:stretch}
  .acts .bg,.acts .bgh{flex:1;justify-content:center}
}

/* ── SECTION TITLE ── */
.stitle{font-family:var(--fh);font-size:9.5px;letter-spacing:.24em;color:var(--amber);
  text-transform:uppercase;padding-bottom:10px;margin-bottom:14px;
  border-bottom:1px solid var(--border)}

/* ── PLANET TABLE ── Mobile: horizontal scroll ── */
.pt-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -4px}
.pt{width:100%;border-collapse:collapse;font-size:13px;min-width:440px}
.pt th{font-family:var(--fh);font-size:8px;letter-spacing:.16em;color:var(--amber);
  text-transform:uppercase;padding:7px 8px;border-bottom:1.5px solid var(--border);
  text-align:left;white-space:nowrap}
.pt td{padding:8px 8px;border-bottom:1px solid var(--b2);vertical-align:middle;
  white-space:nowrap}
.pt tr:last-child td{border-bottom:none}
.pt tr:hover td{background:rgba(160,100,10,.025)}
.pn{font-family:var(--fh);font-size:10px;letter-spacing:.06em;color:var(--deep)}
.ps2{color:var(--amber);font-size:13.5px}
.pd{color:var(--muted);font-size:11.5px;font-family:monospace}
.ph{background:var(--lgold);color:var(--gold);border-radius:3px;padding:2px 6px;
  font-family:var(--fh);font-size:8px;letter-spacing:.06em;display:inline-block}
@media(min-width:600px){
  .pt{font-size:14px;min-width:unset}
  .pt th{font-size:9px;padding:7px 9px}
  .pt td{padding:8px 9px}
  .pn{font-size:11px}.ps2{font-size:14px}.pd{font-size:12.5px}.ph{font-size:8.5px}
}

/* ── DASHA ── */
.dnow{background:var(--lgold);border:1px solid var(--gold);border-radius:9px;
  padding:14px 16px;margin-bottom:12px}
.dlbl{font-family:var(--fh);font-size:8.5px;letter-spacing:.2em;color:var(--gold);margin-bottom:4px}
.dmain{font-family:var(--fh);font-size:19px;color:var(--deep);line-height:1.2}
.dsub{font-size:13px;color:var(--muted);margin-top:3px}
.dseq{display:flex;gap:5px;flex-wrap:wrap}
.dchip{padding:7px 11px;border-radius:16px;font-family:var(--fh);font-size:8.5px;
  letter-spacing:.07em;border:1px solid var(--border);color:var(--muted);
  text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:2px;
  min-height:44px;justify-content:center}
.dchip.on{background:var(--lgold);color:var(--gold);border-color:var(--gold)}
.dchip.done{opacity:.3}
.dyr{font-size:8px}

/* ── PANCHANG ── */
.pg{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(min-width:500px){.pg{grid-template-columns:repeat(auto-fill,minmax(145px,1fr))}}
.pc{background:var(--cream);border:1px solid var(--border);border-radius:9px;padding:12px 13px}
.pl{font-family:var(--fh);font-size:8px;letter-spacing:.18em;color:var(--gold);
  text-transform:uppercase;margin-bottom:5px}
.pv{font-family:var(--fh);font-size:13.5px;color:var(--deep);margin-bottom:2px;line-height:1.3}
.psb{font-size:11.5px;color:var(--muted)}
.pak{display:inline-block;padding:2px 8px;border-radius:12px;font-family:var(--fh);
  font-size:8px;letter-spacing:.07em;margin-left:3px;vertical-align:middle}
.pak.s{background:#fff8e8;color:#8a6a00;border:1px solid #d4aa40}
.pak.k{background:#f0eef8;color:#4a3a8a;border:1px solid #8a80c0}

/* ── CHOGHADIYA ── */
.cg{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}
@media(min-width:500px){.cg{grid-template-columns:repeat(auto-fill,minmax(155px,1fr))}}
.cs{border-radius:8px;padding:10px 12px;border:1px solid}
.cs.good{background:rgba(26,110,48,.05);border-color:rgba(26,110,48,.16)}
.cs.bad{background:rgba(160,40,40,.04);border-color:rgba(160,40,40,.14)}
.cs.neutral{background:var(--cream);border-color:var(--border)}
.cn{font-family:var(--fh);font-size:11px;letter-spacing:.07em;color:var(--deep);margin-bottom:2px}
.ct{font-size:12px;color:var(--muted);font-family:monospace}
.ctg{font-family:var(--fh);font-size:8px;letter-spacing:.09em;text-transform:uppercase;
  margin-top:3px;display:inline-block;padding:2px 6px;border-radius:7px}
.ctg.good{background:rgba(26,110,48,.1);color:var(--green)}
.ctg.bad{background:rgba(160,40,40,.08);color:var(--red)}
.ctg.neutral{background:var(--lgold);color:var(--gold)}

/* ── DOSHAS ── */
.db{margin-bottom:18px}.db:last-child{margin-bottom:0}
.dh{display:flex;align-items:center;gap:9px;margin-bottom:8px}
.di{font-size:20px;line-height:1}
.dt{font-family:var(--fh);font-size:12.5px;letter-spacing:.07em;color:var(--deep)}
.ds2{font-size:11.5px;color:var(--muted);font-style:italic;margin-top:1px}
.dc{border-radius:9px;padding:14px 15px;border:1px solid}
.dc.yes{background:var(--rbg);border-color:var(--rbc)}
.dc.no{background:var(--gbg);border-color:var(--gbc)}
.dc.maybe{background:#fff8e8;border-color:#d4aa40}
.dstat{font-family:var(--fh);font-size:11px;letter-spacing:.12em;
  text-transform:uppercase;margin-bottom:6px}
.dc.yes .dstat{color:var(--red)}.dc.no .dstat{color:var(--green)}.dc.maybe .dstat{color:#8a6a00}
.ddesc{font-size:14.5px;line-height:1.78;color:var(--text)}
.ddet{margin-top:9px;padding-top:9px;border-top:1px solid rgba(0,0,0,.06)}
.dr{display:flex;gap:6px;margin-bottom:4px;font-size:12.5px;align-items:baseline}
.drl{font-family:var(--fh);font-size:8px;letter-spacing:.1em;color:var(--muted);
  text-transform:uppercase;min-width:58px;flex-shrink:0}
.drv{color:var(--deep);flex:1;font-size:13px}
.sph-row{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}
.sph{padding:6px 10px;border-radius:14px;font-family:var(--fh);font-size:8px;
  letter-spacing:.07em;border:1px solid var(--border);color:var(--muted);
  text-transform:uppercase;text-align:center;line-height:1.5}
.sph.on{background:var(--rbg);color:var(--red);border-color:var(--rbc)}.sph.off{opacity:.3}

/* ── TRANSITS ── */
.tr{display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--b2)}
.tr:last-child{border-bottom:none}
.trp{font-family:var(--fh);font-size:10px;letter-spacing:.06em;color:var(--deep);
  width:68px;flex-shrink:0}
.trs{color:var(--amber);font-size:13.5px;flex:1}
.trh{background:var(--lgold);color:var(--gold);border-radius:4px;padding:2px 7px;
  font-family:var(--fh);font-size:8.5px}

/* ── CHAT ── */
.chat{display:flex;flex-direction:column;height:420px}
@media(min-width:600px){.chat{height:460px}}
.chatmsgs{flex:1;overflow-y:auto;padding:2px 0 8px;display:flex;flex-direction:column;gap:9px}
.chatmsgs::-webkit-scrollbar{width:3px}
.chatmsgs::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.cm{max-width:88%}
@media(min-width:600px){.cm{max-width:84%}}
.cm.u{align-self:flex-end}.cm.a{align-self:flex-start}
.cml{font-family:var(--fh);font-size:7px;letter-spacing:.14em;color:var(--muted);
  text-transform:uppercase;margin-bottom:3px}
.cmb{padding:10px 13px;border-radius:12px;font-size:14.5px;line-height:1.72}
.cm.u .cmb{background:linear-gradient(135deg,#c07a10,var(--gold));color:#fff;
  border-radius:12px 12px 3px 12px}
.cm.a .cmb{background:var(--cream);border:1px solid var(--border);color:var(--text);
  border-radius:12px 12px 12px 3px}
.typing2{display:flex;align-items:center;gap:4px;padding:10px 13px;background:var(--cream);
  border:1px solid var(--border);border-radius:12px 12px 12px 3px;align-self:flex-start}
.dot{width:5px;height:5px;border-radius:50%;background:var(--muted);
  animation:dp 1.4s ease infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes dp{0%,60%,100%{opacity:.35;transform:scale(1)}30%{opacity:1;transform:scale(1.3)}}
.csuggs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.sg{background:var(--cream);border:1px solid var(--border);border-radius:16px;
  padding:6px 11px;font-family:var(--fh);font-size:8px;letter-spacing:.07em;
  text-transform:uppercase;cursor:pointer;transition:all .17s;color:var(--muted);
  white-space:nowrap;min-height:36px;display:flex;align-items:center}
.sg:hover{border-color:var(--gold);color:var(--gold);background:var(--lgold)}
.cir{display:flex;gap:7px;margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
.cinp{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:9px;
  color:var(--text);font-family:var(--fb);font-size:15px;padding:10px 12px;
  outline:none;resize:none;transition:border-color .18s;-webkit-appearance:none}
.cinp:focus{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,146,28,.08)}

/* ── MATCH ── */
.sring{width:84px;height:84px;border-radius:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;margin:0 auto 13px;border:3px solid}
.snum{font-family:var(--fh);font-size:26px;line-height:1}
.sden{font-family:var(--fh);font-size:10px;opacity:.5}
.kgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
@media(min-width:500px){.kgrid{grid-template-columns:repeat(auto-fill,minmax(135px,1fr))}}
.kut{background:var(--cream);border:1px solid var(--border);border-radius:8px;padding:9px 11px}
.kn{font-family:var(--fh);font-size:8px;letter-spacing:.11em;color:var(--muted);
  text-transform:uppercase;margin-bottom:3px}
.ks{font-family:var(--fh);font-size:13px;color:var(--deep)}
.km{font-size:10px;color:var(--muted)}
.kbar{height:3px;border-radius:2px;background:var(--light);margin-top:5px;overflow:hidden}
.kfill{height:100%;border-radius:2px}
.mv{text-align:center;padding:16px 18px;border-radius:10px;margin-bottom:15px}
.mvt{font-family:var(--fh);font-size:12px;letter-spacing:.13em;text-transform:uppercase;margin-bottom:5px}
.mvd{font-size:14.5px;line-height:1.72;color:var(--text)}

/* ── READING ── */
.reading h3{font-family:var(--fh);color:var(--amber);font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;margin:20px 0 8px;padding-bottom:6px;
  border-bottom:1px solid var(--border)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:15.5px;line-height:1.88;margin-bottom:8px;color:var(--text)}
.reading ul{list-style:none;padding:0;margin-bottom:8px}
.reading li{font-size:15px;line-height:1.78;padding-left:14px;position:relative;margin-bottom:2px}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--amber);font-size:6px;top:7px}
.hlb{background:rgba(160,100,10,.05);border-left:3px solid var(--amber);border-radius:0 5px 5px 0;
  padding:10px 14px;margin:10px 0;font-style:italic;font-size:14.5px;color:var(--muted);line-height:1.75}

/* ── LOADER ── */
.ld{text-align:center;padding:36px}
.lr{width:36px;height:36px;border-radius:50%;border:2.5px solid var(--light);
  border-top-color:var(--gold);animation:spin 1s linear infinite;margin:0 auto 10px}
@keyframes spin{to{transform:rotate(360deg)}}
.lt{font-family:var(--fh);color:var(--gold);font-size:9.5px;letter-spacing:.22em}
.ls2{font-size:12.5px;color:var(--muted);font-style:italic;margin-top:4px}

/* ── HISTORY STRIP ── */
.history-strip{display:flex;align-items:flex-start;gap:10px;background:var(--lgold);
  border:1px solid rgba(160,114,10,.25);border-radius:10px;padding:12px 16px;
  margin-bottom:10px;font-size:13px;line-height:1.65;color:var(--deep)}
.hs-icon{font-size:16px;flex-shrink:0;margin-top:1px}
.hs-text{font-style:italic;color:var(--muted)}

/* ── MISC ── */
@media(max-width:480px){
  .hdr{padding:18px 0 12px}
  .snaps{padding:8px 12px}
  .dchip{padding:5px 8px;font-size:8px}
}

/* ── PLACE AUTOCOMPLETE ── */
.ac-wrap{position:relative}
.ac-drop{position:absolute;top:100%;left:0;right:0;background:var(--card);
  border:1px solid var(--border);border-top:none;border-radius:0 0 8px 8px;
  z-index:100;max-height:220px;overflow-y:auto;box-shadow:0 4px 14px rgba(0,0,0,.1)}
.ac-item{padding:10px 13px;cursor:pointer;font-size:14px;line-height:1.4;
  border-bottom:1px solid var(--b2)}
.ac-item:last-child{border-bottom:none}
.ac-item:hover,.ac-item:active{background:var(--cream)}
.ac-city{color:var(--deep);font-weight:500}
.ac-region{font-size:12px;color:var(--muted);margin-top:1px}

/* ── CHART STYLE TOGGLE ── */
.chart-toggle{display:flex;gap:4px;justify-content:center;margin-bottom:14px}
.ctbtn{font-family:var(--fh);font-size:9px;letter-spacing:.14em;text-transform:uppercase;
  padding:6px 16px;border-radius:20px;border:1px solid var(--border);color:var(--muted);
  background:transparent;cursor:pointer;transition:all .18s}
.ctbtn.on{background:var(--lgold);color:var(--gold);border-color:var(--gold)}

/* ── NORTH INDIAN CHART ── */
.ni-svg{width:100%;max-width:360px;display:block;margin:0 auto}

/* ── YOGAS ── */
.yoga-grid{display:grid;grid-template-columns:1fr;gap:8px}
@media(min-width:500px){.yoga-grid{grid-template-columns:1fr 1fr}}
.yoga-card{border-radius:9px;padding:12px 14px;border:1px solid}
.yoga-card.present{background:rgba(160,100,10,.06);border-color:rgba(160,100,10,.22)}
.yoga-card.absent{background:var(--cream);border-color:var(--b2);opacity:.55}
.yoga-name{font-family:var(--fh);font-size:11px;letter-spacing:.08em;color:var(--deep);margin-bottom:3px}
.yoga-type{font-family:var(--fh);font-size:7.5px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--amber);margin-bottom:5px}
.yoga-desc{font-size:13px;line-height:1.65;color:var(--muted)}
.yoga-badge{display:inline-block;font-family:var(--fh);font-size:7.5px;letter-spacing:.1em;
  text-transform:uppercase;padding:2px 8px;border-radius:10px;margin-top:5px}
.yoga-badge.yes{background:rgba(160,100,10,.12);color:var(--gold)}
.yoga-badge.no{background:var(--b2);color:var(--muted)}
.yoga-section-title{font-family:var(--fh);font-size:9px;letter-spacing:.22em;color:var(--amber);
  text-transform:uppercase;margin:18px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--border)}
.yoga-section-title:first-child{margin-top:0}

/* ── DASHA TREE ── */
.dtree{display:flex;flex-direction:column;gap:6px}
.dnode{border-radius:9px;border:1px solid var(--border);overflow:hidden}
.dnode-hdr{display:flex;align-items:center;gap:10px;padding:11px 14px;cursor:pointer;
  user-select:none;transition:background .18s;-webkit-tap-highlight-color:transparent}
.dnode-hdr:active{background:var(--cream)}
.dnode.curr>.dnode-hdr{background:var(--lgold);border-color:var(--gold)}
.dnode.past>.dnode-hdr{opacity:.45}
.dnode-lord{font-family:var(--fh);font-size:12px;letter-spacing:.08em;color:var(--deep);flex:1}
.dnode.curr>.dnode-hdr .dnode-lord{color:var(--gold)}
.dnode-yrs{font-size:12px;color:var(--muted)}
.dnode-arr{font-size:11px;color:var(--muted);transition:transform .2s;margin-left:4px}
.dnode-arr.open{transform:rotate(90deg)}
.dnode-children{padding:4px 8px 8px 28px;display:flex;flex-direction:column;gap:4px;
  border-top:1px solid var(--b2);background:var(--cream)}
.dnode-child{border-radius:7px;border:1px solid var(--b2);overflow:hidden}
.dnode-child-hdr{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;
  user-select:none;font-size:13px;-webkit-tap-highlight-color:transparent}
.dnode-child-hdr:active{background:var(--lgold)}
.dnode-child.curr-child>.dnode-child-hdr{background:rgba(160,100,10,.08);color:var(--gold)}
.dnode-child-lord{font-family:var(--fh);font-size:10px;letter-spacing:.07em;color:var(--deep);flex:1}
.dnode-child-yrs{font-size:11px;color:var(--muted)}
.dnode-child-arr{font-size:9px;color:var(--muted);transition:transform .2s}
.dnode-child-arr.open{transform:rotate(90deg)}
.dnode-grandchildren{padding:3px 6px 6px 22px;display:flex;flex-direction:column;gap:3px;
  background:var(--lgold)}
.dgrand{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;
  font-size:12px;border:1px solid var(--b2);background:var(--card)}
.dgrand.curr-grand{background:var(--lgold);border-color:var(--gold);color:var(--gold)}
.dgrand-lord{font-family:var(--fh);font-size:9px;letter-spacing:.07em;color:var(--deep);flex:1}
.dgrand.curr-grand .dgrand-lord{color:var(--gold)}
.dgrand-yrs{font-size:10.5px;color:var(--muted);font-family:monospace}

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


// ─── YOGA CALCULATIONS (Brihat Parashara Hora Shastra) ───────────────────────
function getYogas(sid, lagna) {
  const ls = so(lagna);
  const h = p => ((so(sid[p]) - ls + 12) % 12) + 1; // house of planet
  const sign = p => so(sid[p]);
  const inSigns = (p, signs) => signs.includes(sign(p));
  const conjunct = (a, b) => sign(a) === sign(b);
  const aspect7 = (a, b) => Math.abs(sign(a) - sign(b)) === 6;
  const exalted = {Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6};
  const ownSign = {Sun:[4],Moon:[3],Mars:[0,7],Mercury:[2,5],Jupiter:[8,11],Venus:[1,6],Saturn:[9,10]};
  const isExalted = p => sign(p) === exalted[p];
  const isOwn = p => (ownSign[p]||[]).includes(sign(p));
  const isStrong = p => isExalted(p) || isOwn(p);
  const kendras = [1,4,7,10];
  const trikonas = [1,5,9];
  const inKendra = p => kendras.includes(h(p));
  const inTrikona = p => trikonas.includes(h(p));

  const yogas = [];
  const add = (name, type, present, desc, detail='') =>
    yogas.push({name, type, present, desc, detail});

  // ── PANCHA MAHAPURUSHA YOGAS ──
  add('Ruchaka Yoga','Pancha Mahapurusha',
    isStrong('Mars') && inKendra('Mars'),
    'Mars strong in a Kendra. Grants leadership, courage, military success, and commanding personality.',
    `Mars in ${RS[sign('Mars')]} H${h('Mars')}`);

  add('Bhadra Yoga','Pancha Mahapurusha',
    isStrong('Mercury') && inKendra('Mercury'),
    'Mercury strong in a Kendra. Grants sharp intellect, oratory, business acumen, and scholarly success.',
    `Mercury in ${RS[sign('Mercury')]} H${h('Mercury')}`);

  add('Hamsa Yoga','Pancha Mahapurusha',
    isStrong('Jupiter') && inKendra('Jupiter'),
    'Jupiter strong in a Kendra. Grants wisdom, spiritual inclination, wealth, and respected status.',
    `Jupiter in ${RS[sign('Jupiter')]} H${h('Jupiter')}`);

  add('Malavya Yoga','Pancha Mahapurusha',
    isStrong('Venus') && inKendra('Venus'),
    'Venus strong in a Kendra. Grants beauty, luxury, artistic talent, and a comfortable pleasurable life.',
    `Venus in ${RS[sign('Venus')]} H${h('Venus')}`);

  add('Shasha Yoga','Pancha Mahapurusha',
    isStrong('Saturn') && inKendra('Saturn'),
    'Saturn strong in a Kendra. Grants authority, discipline, longevity, and success through perseverance.',
    `Saturn in ${RS[sign('Saturn')]} H${h('Saturn')}`);

  // ── RAJA & DHANA YOGAS ──
  add('Gajakesari Yoga','Raja Yoga',
    [1,4,7,10].includes(((sign('Jupiter')-sign('Moon')+12)%12)),
    'Jupiter in a Kendra from Moon. One of the most auspicious yogas — grants fame, wealth, wisdom, and a noble character.',
    `Moon in ${RS[sign('Moon')]}, Jupiter in ${RS[sign('Jupiter')]}`);

  add('Budha-Aditya Yoga','Raja Yoga',
    conjunct('Sun','Mercury'),
    'Sun and Mercury conjunct. Grants intelligence, administrative ability, fame, and excellence in communication.',
    `Both in ${RS[sign('Sun')]}`);

  add('Chandra-Mangala Yoga','Dhana Yoga',
    conjunct('Moon','Mars') || aspect7('Moon','Mars'),
    'Moon and Mars in conjunction or mutual 7th aspect. Grants wealth through bold enterprise and business.',
    conjunct('Moon','Mars')?`Both in ${RS[sign('Moon')]}`:`Moon in ${RS[sign('Moon')]}, Mars in ${RS[sign('Mars')]}`);

  add('Lakshmi Yoga','Dhana Yoga',
    (isStrong('Venus') || inKendra('Venus') || inTrikona('Venus')) &&
    (isStrong('Moon') || inTrikona('Moon')),
    'Venus and Moon both strong or in auspicious positions. Grants great wealth, prosperity, and comforts.',
    `Venus H${h('Venus')}, Moon H${h('Moon')}`);

  add('Dhana Yoga','Dhana Yoga',
    (inKendra('Jupiter') || inTrikona('Jupiter')) && (inKendra('Venus') || inTrikona('Venus')),
    'Jupiter and Venus in Kendra or Trikona. A powerful wealth yoga giving financial abundance throughout life.',
    `Jupiter H${h('Jupiter')}, Venus H${h('Venus')}`);

  // ── NEECHA BHANGA (Cancellation of Debilitation) ──
  const debilitated = {Sun:6,Moon:7,Mars:3,Mercury:11,Jupiter:9,Venus:5,Saturn:0};
  const debPlanets = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].filter(p=>sign(p)===debilitated[p]);
  const neechaBhanga = debPlanets.filter(p=>{
    const dl = {Sun:'Saturn',Moon:'Venus',Mars:'Moon',Mercury:'Venus',Jupiter:'Mars',Venus:'Mercury',Saturn:'Jupiter'}[p];
    return isStrong(dl)||inKendra(dl)||inKendra(p);
  });
  add('Neecha Bhanga Raja Yoga','Raja Yoga',
    neechaBhanga.length > 0,
    'Cancellation of a debilitated planet creates a powerful Raja Yoga. Obstacles early in life give way to remarkable success.',
    neechaBhanga.length>0 ? `Applies to: ${neechaBhanga.map(p=>`${p} (${RS[sign(p)]})`).join(', ')}` : 'No debilitated planets in chart');

  // ── VIPARITA RAJA YOGA ──
  const dusthana = [6,8,12];
  const viparita = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].filter(p=>{
    const hp = h(p);
    return dusthana.includes(hp) && ['Mercury','Jupiter','Venus','Saturn'].includes(p);
  });
  add('Viparita Raja Yoga','Raja Yoga',
    viparita.length >= 2,
    'Lords of 6th, 8th, or 12th houses interchanged or placed in each others houses. Success through reversal of adversity.',
    viparita.length>0?`Planets in dusthanas: ${viparita.map(p=>`${p} H${h(p)}`).join(', ')}`:'');

  // ── SPIRITUAL YOGAS ──
  add('Adhi Yoga','Benefic Yoga',
    ['Mercury','Jupiter','Venus'].every(p=>[6,7,8].includes(((sign(p)-sign('Moon')+12)%12)+1)),
    'Mercury, Jupiter and Venus in 6th, 7th, 8th from Moon. Grants leadership, abundance, and noble character.',
    `From Moon (${RS[sign('Moon')]})`);

  add('Saraswati Yoga','Knowledge Yoga',
    (inKendra('Jupiter')||inTrikona('Jupiter')) &&
    (isStrong('Venus')||inKendra('Venus')||inTrikona('Venus')) &&
    (isStrong('Mercury')||inKendra('Mercury')||inTrikona('Mercury')),
    'Jupiter, Venus and Mercury all strong or well-placed. Grants exceptional intelligence, artistic genius, and scholarly fame.',
    `Jupiter H${h('Jupiter')}, Venus H${h('Venus')}, Mercury H${h('Mercury')}`);

  add('Kemadruma Yoga','Challenging Yoga',
    !['Sun','Mercury','Venus','Mars','Jupiter','Saturn'].some(p=>{
      const diff=(sign(p)-sign('Moon')+12)%12;
      return diff===1||diff===11;
    }),
    'No planet in 2nd or 12th from Moon. Can indicate isolation, hardship, or unconventional life path. Other strong yogas can mitigate this.',
    `Moon in ${RS[sign('Moon')]}, no flanking planets`);

  add('Amala Yoga','Benefic Yoga',
    ['Jupiter','Venus','Mercury'].some(p=>h(p)===10),
    'A benefic planet in the 10th house. Grants spotless reputation, fame, and lasting positive impact through career.',
    ['Jupiter','Venus','Mercury'].filter(p=>h(p)===10).map(p=>`${p} in 10th (${RS[sign(p)]})`).join(', ')||'None');

  // Sort: present first
  return yogas.sort((a,b)=>b.present-a.present);
}

// ─── ANTARDASHA & PRATYANTAR COMPUTATION ─────────────────────────────────────
function getAntardashas(mahaLord, mahaStart, mahaEnd) {
  const totalYrs = mahaEnd - mahaStart;
  const idx = DS.indexOf(mahaLord);
  const NOW = 2026.25;
  let cursor = mahaStart;
  return DS.map((_,i) => {
    const al = DS[(idx+i)%9];
    const dur = totalYrs * DY[al] / 120;
    const s = cursor, e = cursor + dur;
    cursor = e;
    return { lord: al, start: s, end: e, curr: s <= NOW && e > NOW };
  });
}

function getPratyantardashas(mahaLord, antarLord, antarStart, antarEnd) {
  const totalYrs = antarEnd - antarStart;
  const idx = DS.indexOf(antarLord);
  const NOW = 2026.25;
  let cursor = antarStart;
  return DS.map((_,i) => {
    const pl = DS[(idx+i)%9];
    const dur = totalYrs * DY[pl] / 120;
    const s = cursor, e = cursor + dur;
    cursor = e;
    return { lord: pl, start: s, end: e, curr: s <= NOW && e > NOW };
  });
}

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


// ─── NORTH INDIAN CHART SVG ──────────────────────────────────────────────────
// Classic diamond layout: 12 houses in rhombus pattern
// Houses 1-12 fixed positions in North Indian style
function NISvg({sid, lagna}) {
  const ls = so(lagna);
  const by = Array.from({length:12}, ()=>[]);
  const ab={Sun:'Su',Moon:'Mo',Mercury:'Me',Venus:'Ve',Mars:'Ma',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};
  const cl={Su:'#b07000',Mo:'#3b6faa',Me:'#1a7a40',Ve:'#aa2a7a',Ma:'#b02020',Ju:'#886000',Sa:'#6040a0',Ra:'#444',Ke:'#666'};
  for(const[n,l]of Object.entries(sid)) by[so(l)].push(ab[n]);

  // In North Indian style, houses are FIXED (not signs)
  // House 1 = Lagna sign, rest follow
  // We show sign name in each house position
  // North Indian fixed positions for 12 houses:
  // H1=top-center-diamond, going clockwise
  // Polygon points for each house (in a 400x400 grid)
  const cx=200, cy=200, s=100;
  // 12 house polygons (North Indian style)
  const houses = [
    // H1: top diamond
    [[cx,cy-s],[cx+s,cy],[cx,cy+s],[cx-s,cy]], // center
    // Outer houses as triangles/quadrilaterals around the center
  ];

  // Simplified North Indian: 4x4 grid with diagonal lines
  // Fixed sign positions for North Indian chart
  // Sign 0 (Aries) is always in position based on Lagna
  const NI_LABELS = [
    {x:200,y:30,sign:(ls)%12},        // H1 top
    {x:320,y:80,sign:(ls+1)%12},      // H2 right-top
    {x:370,y:200,sign:(ls+2)%12},     // H3 right
    {x:320,y:320,sign:(ls+3)%12},     // H4 right-bottom
    {x:200,y:370,sign:(ls+4)%12},     // H5 bottom
    {x:80,y:320,sign:(ls+5)%12},      // H6 left-bottom
    {x:30,y:200,sign:(ls+6)%12},      // H7 left
    {x:80,y:80,sign:(ls+7)%12},       // H8 left-top
    {x:200,y:110,sign:(ls+8)%12},     // H9 inner-top
    {x:290,y:200,sign:(ls+9)%12},     // H10 inner-right
    {x:200,y:290,sign:(ls+10)%12},    // H11 inner-bottom
    {x:110,y:200,sign:(ls+11)%12},    // H12 inner-left
  ];

  return(
    <svg viewBox="0 0 400 400" className="ni-svg">
      <defs>
        <linearGradient id="ng1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffef8"/><stop offset="100%" stopColor="#fdf5e2"/></linearGradient>
        <linearGradient id="ngL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffaec"/><stop offset="100%" stopColor="#f9e9b8"/></linearGradient>
      </defs>

      {/* Outer border */}
      <rect x="5" y="5" width="390" height="390" fill="url(#ng1)" stroke="#d4b060" strokeWidth=".8" rx="4"/>

      {/* Diagonal lines forming the diamond */}
      <line x1="5" y1="5" x2="200" y2="200" stroke="#d4b060" strokeWidth=".8"/>
      <line x1="395" y1="5" x2="200" y2="200" stroke="#d4b060" strokeWidth=".8"/>
      <line x1="5" y1="395" x2="200" y2="200" stroke="#d4b060" strokeWidth=".8"/>
      <line x1="395" y1="395" x2="200" y2="200" stroke="#d4b060" strokeWidth=".8"/>

      {/* Inner diamond */}
      <polygon points="200,100 300,200 200,300 100,200" fill="url(#ngL)" stroke="#d4b060" strokeWidth=".8"/>
      {/* Inner diamond diagonals */}
      <line x1="200" y1="100" x2="200" y2="300" stroke="#d4b060" strokeWidth=".8"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="#d4b060" strokeWidth=".8"/>

      {/* House sign labels and planets */}
      {NI_LABELS.map(({x,y,sign},hi)=>{
        const house = hi+1;
        const isLagna = sign === ls;
        const planetsHere = by[sign];
        return(
          <g key={hi}>
            {isLagna && <text x={x} y={y-10} textAnchor="middle" fontSize="7" fill="#a0720a" fontFamily="Cinzel,serif" fontWeight="600">Asc</text>}
            <text x={x} y={y+(isLagna?2:0)} textAnchor="middle" fontSize="9" fill="#8a6020" fontFamily="Cinzel,serif" fontWeight="500">{RSH[sign]}</text>
            <text x={x} y={y+14} textAnchor="middle" fontSize="7" fill="#b09060">{house}</text>
            {planetsHere.slice(0,3).map((ab,i)=>(
              <text key={i} x={x+((i-planetsHere.slice(0,3).length/2+.5)*20)} y={y+27} textAnchor="middle" fontSize="9.5" fill={cl[ab]||'#3a1e08'} fontFamily="Cinzel,serif" fontWeight="500">{ab}</text>
            ))}
          </g>
        );
      })}

      {/* Center OM */}
      <text x="200" y="207" textAnchor="middle" fontSize="22" fill="#c9a84c" fontFamily="serif" opacity=".85">ॐ</text>
    </svg>
  );
}

function RText({text}){const secs=[];let cur=null;text.split('\n').forEach(line=>{const t=line.trim();if(!t)return;if(t.startsWith('## ')){if(cur)secs.push(cur);cur={title:t.slice(3),items:[]};}else{if(!cur)cur={title:null,items:[]};cur.items.push(t);}});if(cur)secs.push(cur);return(<div className="reading">{secs.map((s,i)=>(<div key={i}>{s.title&&<h3>{s.title}</h3>}{s.items.map((it,j)=>{if(it.startsWith('- ')||it.startsWith('• '))return<ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;if(it.startsWith('"'))return<div key={j} className="hlb">{it}</div>;return<p key={j}>{it}</p>;})}</div>))}</div>);}

const CITIES={delhi:[28.6517,77.2219],'new delhi':[28.6517,77.2219],mumbai:[19.076,72.8777],bombay:[19.076,72.8777],bangalore:[12.9716,77.5946],bengaluru:[12.9716,77.5946],chennai:[13.0827,80.2707],kolkata:[22.5726,88.3639],hyderabad:[17.385,78.4867],pune:[18.5204,73.8567],ahmedabad:[23.0225,72.5714],jaipur:[26.9124,75.7873],lucknow:[26.8467,80.9462],nagpur:[21.1458,79.0882],surat:[21.1702,72.8311],patna:[25.5941,85.1376],bhopal:[23.2599,77.4126],indore:[22.7196,75.8577],kochi:[9.9312,76.2673],trivandrum:[8.5241,76.9366],thiruvananthapuram:[8.5241,76.9366],visakhapatnam:[17.6868,83.2185],vizag:[17.6868,83.2185],agra:[27.1767,78.0081],varanasi:[25.3176,82.9739],srinagar:[34.0837,74.7973],chandigarh:[30.7333,76.7794],gurgaon:[28.4595,77.0266],gurugram:[28.4595,77.0266],noida:[28.5355,77.391],amritsar:[31.634,74.8723],jodhpur:[26.2389,73.0243],udaipur:[24.5854,73.7125],mysore:[12.2958,76.6394],mysuru:[12.2958,76.6394],nashik:[19.9975,73.7898],dehradun:[30.3165,78.0322],haridwar:[29.9457,78.1642],rishikesh:[30.0869,78.2676],prayagraj:[25.4358,81.8463],allahabad:[25.4358,81.8463],goa:[15.2993,74.124],tirupati:[13.6288,79.4192],madurai:[9.9252,78.1198],coimbatore:[11.0168,76.9558],leh:[34.1526,77.577],jammu:[32.7266,74.857],kathmandu:[27.7172,85.324],dhaka:[23.8103,90.4125],islamabad:[33.6844,73.0479],karachi:[24.8607,67.0011],lahore:[31.5497,74.3436],colombo:[6.9271,79.8612],dubai:[25.2048,55.2708],'abu dhabi':[24.4539,54.3773],riyadh:[24.7136,46.6753],doha:[25.2854,51.531],singapore:[1.3521,103.8198],'kuala lumpur':[3.139,101.6869],bangkok:[13.7563,100.5018],tokyo:[35.6762,139.6503],beijing:[39.9042,116.4074],'hong kong':[22.3193,114.1694],london:[51.5074,-0.1278],'new york':[40.7128,-74.006],'los angeles':[34.0522,-118.2437],toronto:[43.6532,-79.3832],sydney:[-33.8688,151.2093],paris:[48.8566,2.3522],berlin:[52.52,13.405],moscow:[55.7558,37.6173],istanbul:[41.0082,28.9784]};
function cityLookup(q){const s=q.toLowerCase().trim();if(CITIES[s])return CITIES[s];for(const[k,v]of Object.entries(CITIES))if(k.includes(s)||s.includes(k))return v;return null;}

async function callAI(messages,max_tokens=1000){const res=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens,messages})});const d=await res.json();if(d.error)throw new Error(d.error.message);return d.content?.map(b=>b.text||'').join('')||'';}

const SUGGS=['Will I get married in 2026?','What career suits me?','When will I become wealthy?','Which gemstone should I wear?','Why is my love life difficult?','What does my dasha mean for me?'];

// ─── ALL TABS ─────────────────────────────────────────────────────────────────
const ROW1=[
  {id:'chart',   icon:'⬡',  label:'Kundali'},
  {id:'planets', icon:'☉',  label:'Planets'},
  {id:'panchang',icon:'📅', label:'Panchang'},
  {id:'dasha',   icon:'⌛', label:'Dasha'},
  {id:'doshas',  icon:'⚠',  label:'Doshas'},
  {id:'yogas',   icon:'★',  label:'Yogas'},
];
const ROW2=[
  {id:'transits',icon:'🔭', label:'Transits'},
  {id:'chat',    icon:'💬', label:'Chat'},
  {id:'match',   icon:'💍', label:'Match'},
  {id:'remedies',icon:'🙏', label:'Remedies'},
];
const READING_TAB={id:'reading', icon:'✦', label:'Reading'};
const TABS=[...ROW1,...ROW2,READING_TAB];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [f,sf]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'5.5',place:'',lat:'',lon:''});
  const set=(k,v)=>sf(p=>({...p,[k]:v}));
  const [formOpen,setFormOpen]=useState(true);
  const [chart,setChart]=useState(null);
  const [chartStyle,setChartStyle]=useState('south'); // 'south' | 'north'
  const [expandedDasha,setExpandedDasha]=useState(null); // mahadasha lord
  const [expandedAntar,setExpandedAntar]=useState(null); // antardasha lord
  const [yogas,setYogas]=useState(null);
  const [placeResults,setPlaceResults]=useState([]);
  const [placeLoading,setPlaceLoading]=useState(false);
  const [dasha,setDasha]=useState(null);
  const [panch,setPanch]=useState(null);
  const [doshas,setDoshas]=useState(null);
  const [transits,setTransits]=useState(null);
  const [tab,setTab]=useState('chart');
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

  const searchPlaces = async(query) => {
    if(!query||query.length<2){setPlaceResults([]);return;}
    setPlaceLoading(true);
    try{
      const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`);
      const d=await r.json();
      setPlaceResults(d.results||[]);
    }catch{setPlaceResults([]);}
    setPlaceLoading(false);
  };

  const selectPlace=(result)=>{
    sf(p=>({...p,place:result.name,lat:result.latitude.toFixed(4),lon:result.longitude.toFixed(4)}));
    setPlaceResults([]);
  };

  const locate=async(place,onResult,setLoad,setE)=>{if(!place)return;setLoad(true);setE('');const loc=cityLookup(place);if(loc){onResult(loc[0].toFixed(4),loc[1].toFixed(4));setLoad(false);return;}try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0])onResult(d.results[0].latitude.toFixed(4),d.results[0].longitude.toFixed(4));else setE(`"${place}" not found — enter lat/lon manually`);}catch{setE('Network error — enter lat/lon manually.');}setLoad(false);};

  const castChart=()=>{setErr('');const{year,month,day,hour,min,tz,lat,lon}=f;if(!year||!month||!day)return setErr('Please enter date of birth.');if(!lat||!lon)return setErr('Please locate your city or enter lat/lon manually.');try{const c=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);setChart(c);setDasha(getDasha(c.sid.Moon,+year,+month,+day));setPanch(getPanchang(c.jde,c.ay));setDoshas({mangal:getMangal(c.sid,c.lagna),ksd:getKSD(c.sid),sati:getSati(c.sid)});setTransits(getTransits(c.lagna));setYogas(getYogas(c.sid,c.lagna));setReading('');setMsgs([]);setMatchR(null);setTransitR('');setRemedies('');setExpandedDasha(null);setExpandedAntar(null);setTab('chart');}catch(e){setErr('Error: '+e.message);}};

  const buildCtx=()=>{if(!chart)return'';const{sid,lagna}=chart,ls=so(lagna);const bh=+(f.hour||12),bm=+(f.min||0),ampm=bh<12?'AM':'PM',h12=bh===0?12:bh>12?bh-12:bh;return`${f.name||'Native'} | ${f.day}/${f.month}/${f.year} ${h12}:${bm.toString().padStart(2,'0')} ${ampm} (UTC+${f.tz}) | ${f.place}\nLagna:${RS[ls]} | Moon:${RS[so(sid.Moon)]} | Nak:${NK[no(sid.Moon)]} Pada${po(sid.Moon)}\n${Object.entries(sid).map(([n,l])=>`${n}:${RS[so(l)]} H${((so(l)-ls+12)%12)+1}`).join(', ')}\n${dasha?.curr?`Mahadasha:${FN[dasha.curr.lord]} until ${dasha.curr.end.toFixed(1)}`:''}`;};

  const doReading=async()=>{setAiLoad(true);setAiErr('');try{setReading(await callAI([{role:'user',content:`You are Shri Acharya Adi Yogi, a warm and deeply wise Vedic astrologer. Write a personal, punchy reading structured as a journey through time. Chart data:\n${buildCtx()}\n\nRules: use ## for headings, maximum 3 short sentences per section, speak directly using you and your, give one specific insight per section, warm authoritative tone. Structure the reading as Past then Present then Future:\n\n## Your Past — Karma You Carry (based on birth chart placements and early dasha periods — what shaped you)\n## Your Present — What Is Active Now (current Mahadasha and Antardasha — what is playing out right now in 2026)\n## Your Strengths — Yogas Working For You (which yogas are present and what they give you)\n## Your Challenges — Doshas and Karmic Lessons\n## Your Career and Life Purpose\n## Love and Relationships\n## Your Future — What Is Coming (upcoming dasha periods and planetary cycles — next 3 to 5 years)\n## Your Remedies — What Will Help Most\n## Message from Acharya Adi Yogi (one powerful personal insight they will remember)`}]));setTab('reading');}catch(e){setAiErr(e.message);}setAiLoad(false);};

  const sendChat=async(text)=>{const t=text||cinput;if(!t.trim()||cload)return;setCinput('');const nm=[...msgs,{role:'user',content:t}];setMsgs(nm);setCload(true);try{const reply=await callAI([{role:'user',content:`You are Acharya Adi Yogi, a warm and wise Vedic astrologer speaking directly to a person who may not know astrology. Answer their question about this chart:\n${buildCtx()}\n\nRules:\n- Maximum 3-4 short sentences\n- Plain conversational language — no jargon without explanation\n- Speak directly to them (use "you", "your")\n- Be warm, specific, and encouraging\n- If relevant, mention ONE practical tip or remedy\n- Never give a lecture — be like a wise friend`},{role:'assistant',content:'Namaste! I am here to guide you.'}, ...nm],400);setMsgs(p=>[...p,{role:'assistant',content:reply}]);}catch{setMsgs(p=>[...p,{role:'assistant',content:'Connection error. Try again.'}]);}setCload(false);};

  const doRemedies=async()=>{setRemLoad(true);try{setRemedies(await callAI([{role:'user',content:`You are Acharya Adi Yogi. Give specific practical remedies for this chart:\n${buildCtx()}\n\nRules: use ## headings, max 2-3 lines per section, very specific (exact mantra, count, day, stone, finger), plain language, explain why each remedy helps. Sections: ## Your Daily Mantra, ## Gemstone to Wear, ## Fasting Day, ## Charity, ## Daily Practice, ## Most Important Remedy`}]))}catch(e){}setTrLoad(false);};

  const doMatch=async()=>{const{year,month,day,hour,min,tz,lat,lon}=p2;if(!year||!month||!day||!lat||!lon)return;setMload(true);try{const c2=computeChart(+year,+month,+day,+(hour||12),+(min||0),+tz,+lat,+lon);setMatchR({res:matchKutas(no(chart.sid.Moon),so(chart.sid.Moon),no(c2.sid.Moon),so(c2.sid.Moon)),p1nak:no(chart.sid.Moon),p1sign:so(chart.sid.Moon),p2nak:no(c2.sid.Moon),p2sign:so(c2.sid.Moon)});}catch(e){}setMload(false);};

  const ls=chart?so(chart.lagna):null;
  const anyDosha=doshas&&(doshas.mangal.effective||doshas.ksd.hasKSD||doshas.sati.inSati);
  const cg=panch?getChog(panch.vara):null;

  // Empty state component
  const Emp=({icon})=>(
    <div className="emp">
      <span className="emp-i">{icon}</span>
      <div className="emp-t">No chart cast yet</div>
      <div className="emp-s">Enter your birth details above, then tap <strong>✦ Cast Kundali</strong> to unlock this feature.</div>
    </div>
  );

  return(
    <>
      <style>{FONTS}{CSS}</style>
      <div className="app">
        <div className="wrap">

          {/* Header */}
          <div className="hdr">
            <span className="hom">ॐ</span>
            <h1 className="htitle">Shri Acharya Adi Yogi</h1>
            <p style={{fontFamily:"var(--fh)",fontSize:"11px",letterSpacing:".18em",color:"var(--amber)",textTransform:"uppercase",marginTop:4}}>Jyotish AI · Vedic Astrology</p>
            <p className="hsub">The sacred science of Jyotish — guiding souls for over 5,000 years</p>
          </div>

          {/* ── HISTORY STRIP ── */}
          <div className="history-strip">
            <span className="hs-icon">📜</span>
            <span className="hs-text">Jyotish — the Eye of the Vedas — is a sacred science first revealed by Maharishi Parashara over 5,000 years ago. Every planetary position in your chart carries the wisdom of this ancient tradition.</span>
          </div>

          {/* ╔═══════════════════════════════════════════════════╗
              ║  MAIN BOX — TAB BAR IS THE VERY FIRST ELEMENT    ║
              ╚═══════════════════════════════════════════════════╝ */}
          <div className="box">

            {/* ████ TWO-ROW TAB BAR — ALWAYS RENDERED, NO CONDITION ████ */}
            <div className="tbar2">
              {/* Row 1: chart features */}
              <div className="trow">
                {ROW1.map(t=>(
                  <div key={t.id} className={`ti${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>
                    <span className="ti-icon">{t.icon}</span>
                    <span className="ti-label">{t.label}</span>
                  </div>
                ))}
              </div>
              {/* Row 2: tools + Reading highlighted */}
              <div className="trow">
                {ROW2.map(t=>(
                  <div key={t.id} className={`ti${tab===t.id?' on':''}`} onClick={()=>setTab(t.id)}>
                    <span className="ti-icon">{t.icon}</span>
                    <span className="ti-label">{t.label}</span>
                  </div>
                ))}
                <div
                  className={`ti ti-reading${tab==='reading'?' on':''}`}
                  onClick={()=>setTab('reading')}
                >
                  <span className="ti-icon">✦</span>
                  <span className="ti-label">Reading</span>
                </div>
              </div>
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

              {/* ⬡ KUNDALI — shows form when no chart, chart when cast */}
              {tab==='chart'&&(chart
                ? <div style={{textAlign:'center'}}>
                    <div className="chart-toggle">
                      <button className={`ctbtn${chartStyle==='south'?' on':''}`} onClick={()=>setChartStyle('south')}>South Indian</button>
                      <button className={`ctbtn${chartStyle==='north'?' on':''}`} onClick={()=>setChartStyle('north')}>North Indian</button>
                    </div>
                    {chartStyle==='south'
                      ? <KSvg sid={chart.sid} lagna={chart.lagna}/>
                      : <NISvg sid={chart.sid} lagna={chart.lagna}/>}
                    <p style={{fontSize:10.5,color:'var(--muted)',fontStyle:'italic',marginTop:10,letterSpacing:'.06em'}}>
                      Lahiri Ayanamsa {chart.ay.toFixed(3)}° · Whole Sign · {chartStyle==='south'?'South':'North'} Indian
                    </p>
                    <div style={{marginTop:14}}><button className="bgh" onClick={()=>{setChart(null);setFormOpen(true);}}>✎ Edit Birth Details</button></div>
                  </div>
                : <div>
                    <div className="stitle">✦ Enter Birth Details</div>
                    <div className="g2">
                      <div className="fg"><label className="lbl">Full Name</label><input className="fi" placeholder="e.g. Aditya Sharma" value={f.name} onChange={e=>set('name',e.target.value)}/></div>
                      <div className="fg"><label className="lbl">Date of Birth (DD / MM / YYYY)</label><div className="frow"><input className="fi" placeholder="DD" maxLength={2} value={f.day} onChange={e=>set('day',e.target.value)} style={{width:52}}/><input className="fi" placeholder="MM" maxLength={2} value={f.month} onChange={e=>set('month',e.target.value)} style={{width:52}}/><input className="fi" placeholder="YYYY" maxLength={4} value={f.year} onChange={e=>set('year',e.target.value)} style={{width:80}}/></div></div>
                      <div className="fg"><label className="lbl">Time of Birth (e.g. 02 30 for 2:30 AM, 14 30 for 2:30 PM)</label><div className="frow"><input className="fi" placeholder="HH" maxLength={2} value={f.hour} onChange={e=>set('hour',e.target.value)} style={{width:64}}/><input className="fi" placeholder="MM" maxLength={2} value={f.min} onChange={e=>set('min',e.target.value)} style={{width:64}}/></div></div>
                      <div className="fg"><label className="lbl">UTC Offset (IST = 5.5)</label><input className="fi" placeholder="5.5" value={f.tz} onChange={e=>set('tz',e.target.value)}/></div>
                      <div className="fg full"><label className="lbl">Place of Birth</label>
                        <div className="ac-wrap">
                          <input className="fi" placeholder="Type city name…" value={f.place}
                            onChange={e=>{set('place',e.target.value);searchPlaces(e.target.value);}}
                            onBlur={()=>setTimeout(()=>setPlaceResults([]),200)}
                            autoComplete="off"/>
                          {placeResults.length>0&&(
                            <div className="ac-drop">
                              {placeResults.map((r,i)=>(
                                <div key={i} className="ac-item" onMouseDown={()=>selectPlace(r)}>
                                  <div className="ac-city">{r.name}</div>
                                  <div className="ac-region">{[r.admin1,r.country].filter(Boolean).join(', ')}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {f.lat&&f.lon?<p className="fh" style={{color:'var(--gold)'}}>✓ {f.place} · {f.lat}°N, {f.lon}°E</p>:<p className="fh">Start typing — city suggestions appear automatically</p>}
                      </div>
                      <div className="fg"><label className="lbl">Latitude (°N)</label><input className="fi" placeholder="28.6517" value={f.lat} onChange={e=>set('lat',e.target.value)}/></div>
                      <div className="fg"><label className="lbl">Longitude (°E)</label><input className="fi" placeholder="77.2219" value={f.lon} onChange={e=>set('lon',e.target.value)}/></div>
                    </div>
                    {err&&<div className="ferr">⚠ {err}</div>}
                    <div className="acts"><button className="bg" onClick={castChart}>✦ Cast Kundali</button></div>
                  </div>
              )}

              {/* ☉ PLANETS */}
              {tab==='planets'&&(chart?(
                <div className="pt-wrap"><table className="pt">
                  <thead><tr><th>Planet</th><th>Sidereal Lon.</th><th>Rashi</th><th>House</th><th>Deg in Sign</th></tr></thead>
                  <tbody>
                    {['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu','Ketu'].map(nm=>{const l=chart.sid[nm],s=so(l),h=((s-ls+12)%12)+1;return(<tr key={nm}><td><span style={{color:PC[nm],marginRight:3,fontSize:12}}>{GL[nm]}</span><span className="pn">{nm}</span></td><td><span className="pd">{l.toFixed(3)}°</span></td><td><span className="ps2">{RS[s]}</span> <span style={{fontSize:10.5,color:'var(--muted)'}}>({RE[s]})</span></td><td><span className="ph">{h}</span></td><td><span className="pd">{di(l).toFixed(2)}°</span></td></tr>);})}
                    <tr><td><span style={{color:'var(--amber)',marginRight:3,fontSize:12}}>⬡</span><span className="pn">Lagna</span></td><td><span className="pd">{chart.lagna.toFixed(3)}°</span></td><td><span className="ps2">{RS[ls]}</span></td><td><span className="ph">1</span></td><td><span className="pd">{di(chart.lagna).toFixed(2)}°</span></td></tr>
                  </tbody>
                </table></div>
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

              {/* ⌛ DASHA — expandable tree */}
              {tab==='dasha'&&(dasha?(
                <div>
                  <p style={{fontSize:13,color:'var(--muted)',fontStyle:'italic',marginBottom:14}}>
                    Janma Nakshatra: <strong style={{color:'var(--deep)'}}>{NK[dasha.nak]}</strong> · Birth Lord: <strong style={{color:'var(--deep)'}}>{FN[dasha.lord]}</strong>
                  </p>
                  <div className="dtree">
                    {dasha.seq.map((maha,i)=>{
                      const isExp=expandedDasha===maha.lord+'_'+i;
                      const antars=isExp?getAntardashas(maha.lord,maha.start,maha.end):[];
                      const isPast=maha.end<2026.25;
                      const isCurr=dasha.curr?.lord===maha.lord&&Math.abs((dasha.curr?.start||0)-maha.start)<.01;
                      return(
                        <div key={i} className={`dnode${isCurr?' curr':isPast?' past':''}`}>
                          <div className="dnode-hdr" onClick={()=>setExpandedDasha(isExp?null:maha.lord+'_'+i)}>
                            <span className="dnode-lord">{FN[maha.lord]} Mahadasha</span>
                            <span className="dnode-yrs">{Math.round(maha.start)}–{Math.round(maha.end)}</span>
                            <span className={`dnode-arr${isExp?' open':''}`}>▶</span>
                          </div>
                          {isExp&&(
                            <div className="dnode-children">
                              {antars.map((antar,j)=>{
                                const isAExp=expandedAntar===antar.lord+'_'+i+'_'+j;
                                const pratyantars=isAExp?getPratyantardashas(maha.lord,antar.lord,antar.start,antar.end):[];
                                return(
                                  <div key={j} className={`dnode-child${antar.curr?' curr-child':''}`}>
                                    <div className="dnode-child-hdr" onClick={()=>setExpandedAntar(isAExp?null:antar.lord+'_'+i+'_'+j)}>
                                      <span className="dnode-child-lord">{FN[antar.lord]} Antardasha</span>
                                      <span className="dnode-child-yrs">{antar.start.toFixed(1)}–{antar.end.toFixed(1)}</span>
                                      <span className={`dnode-child-arr${isAExp?' open':''}`}>▶</span>
                                    </div>
                                    {isAExp&&(
                                      <div className="dnode-grandchildren">
                                        {pratyantars.map((pr,k)=>(
                                          <div key={k} className={`dgrand${pr.curr?' curr-grand':''}`}>
                                            <span className="dgrand-lord">{FN[pr.lord]}</span>
                                            <span className="dgrand-yrs">{pr.start.toFixed(2)}–{pr.end.toFixed(2)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
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

              {/* ★ YOGAS */}
              {tab==='yogas'&&(yogas?(
                <div>
                  {['Pancha Mahapurusha','Raja Yoga','Dhana Yoga','Benefic Yoga','Knowledge Yoga','Challenging Yoga'].map(type=>{
                    const group=yogas.filter(y=>y.type===type);
                    if(!group.length)return null;
                    return(
                      <div key={type}>
                        <div className="yoga-section-title">{type}</div>
                        <div className="yoga-grid">
                          {group.map((y,i)=>(
                            <div key={i} className={`yoga-card ${y.present?'present':'absent'}`}>
                              <div className="yoga-type">{y.type}</div>
                              <div className="yoga-name">{y.name}</div>
                              <div className="yoga-desc">{y.desc}</div>
                              {y.detail&&<div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{y.detail}</div>}
                              <span className={`yoga-badge ${y.present?'yes':'no'}`}>{y.present?'✓ Present':'✗ Absent'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ):<Emp icon="★"/>)}

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
                  {msgs.length===0&&<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontStyle:'italic',color:'var(--muted)',fontSize:14.5,lineHeight:1.8,padding:'16px'}}>Namaste 🙏<br/><span style={{fontSize:13.5}}>Ask Acharya Adi Yogi anything about your chart.</span></div>}
                  {msgs.length>0&&<div className="chatmsgs">{msgs.map((m,i)=><div key={i} className={`cm ${m.role==='user'?'u':'a'}`}><div className="cml">{m.role==='user'?'You':'Acharya Adi Yogi'}</div><div className="cmb">{m.content}</div></div>)}{cload&&<div className="typing2"><div className="dot"/><div className="dot"/><div className="dot"/></div>}<div ref={chatEnd}/></div>}
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
