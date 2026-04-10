export default function Privacy() {
  return (
    <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px 80px',
      fontFamily:"'EB Garamond',serif",color:'#3a1e08',fontSize:16,lineHeight:1.8,
      background:'#faf6ec',minHeight:'100vh'}}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet"/>
      <div style={{textAlign:'center',marginBottom:40}}>
        <svg width="72" height="72" viewBox="0 0 100 100" style={{marginBottom:12}}>
          <rect width="100" height="100" rx="20" fill="#faf6ec"/>
          <polygon points="50,8 88,68 12,68" fill="none" stroke="#c9921c" strokeWidth="3.5"/>
          <polygon points="50,92 12,32 88,32" fill="none" stroke="#a0720a" strokeWidth="2.5"/>
          <circle cx="50" cy="50" r="18" fill="#fff8ee" stroke="#c9921c" strokeWidth="1.8"/>
          <text y="57" x="50" fontSize="20" fill="#a0720a" fontFamily="serif" textAnchor="middle">ॐ</text>
        </svg>
        <h1 style={{fontFamily:"'Cinzel',serif",fontSize:26,fontWeight:500,
          letterSpacing:'.12em',color:'#a0720a',marginBottom:6}}>Jyotish AI</h1>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:'.2em',
          color:'#7a5830',textTransform:'uppercase'}}>Privacy Policy</p>
      </div>
      <p style={{color:'#7a5830',fontStyle:'italic',marginBottom:32}}>Last updated: April 2026</p>
      <S title="Overview">Jyotish AI is a free Vedic astrology web application. We are committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</S>
      <S title="Data We Collect"><b>Birth details you enter:</b> Date, time, and place of birth, and your name (optional). These are used only to generate your Kundali and readings.<br/><br/><b>We do NOT store your data.</b> Birth details are processed in your browser and never saved to any database or server. Each session starts fresh.</S>
      <S title="AI Features & Third-Party Services">AI features (Reading, Chat, Remedies, Transits) send your chart data to <a href="https://www.anthropic.com/privacy" style={{color:'#a0720a'}}>Anthropic's API</a>. We do not store AI conversations.<br/><br/><b>Vercel Analytics</b> tracks anonymous page views only — no personal data.<br/><br/><b>Open-Meteo</b> geocoding is used for place search — only the city name you type is sent.</S>
      <S title="Cookies & Local Storage">We do not use cookies for tracking. No personal data is stored in your browser.</S>
      <S title="Children's Privacy">Jyotish AI does not knowingly collect information from children under 13.</S>
      <S title="Data Security">We do not store personal data on our servers. All API calls are made over HTTPS with encrypted connections.</S>
      <S title="Your Rights">Since we do not retain your data, there is nothing to request deletion of. For questions about Anthropic's data processing, contact them at their privacy page.</S>
      <S title="Contact">Questions? Email us at: <a href="mailto:hello@jyotishai.app" style={{color:'#a0720a'}}>hello@jyotishai.app</a></S>
      <div style={{marginTop:48,textAlign:'center',borderTop:'1px solid rgba(155,100,12,.18)',paddingTop:24}}>
        <button onClick={()=>window.location.href='/'} style={{fontFamily:"'Cinzel',serif",
          fontSize:'9.5px',letterSpacing:'.18em',textTransform:'uppercase',padding:'10px 22px',
          background:'transparent',border:'1.5px solid #a0720a',color:'#a0720a',
          borderRadius:8,cursor:'pointer'}}>← Back to App</button>
      </div>
    </div>
  );
}
function S({title,children}){
  return(<div style={{marginBottom:28}}>
    <h2 style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:'.2em',color:'#d4780a',
      textTransform:'uppercase',marginBottom:10,paddingBottom:7,
      borderBottom:'1px solid rgba(155,100,12,.15)'}}>{title}</h2>
    <p style={{fontSize:15.5,lineHeight:1.85}}>{children}</p>
  </div>);
}
