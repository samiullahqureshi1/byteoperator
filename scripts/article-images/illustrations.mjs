const W=1376,H=768;
const defs=`<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070f2b"/><stop offset="1" stop-color="#0d1a3a"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#0550ff" stop-opacity="0.45"/><stop offset="1" stop-color="#0550ff" stop-opacity="0"/></radialGradient>
<linearGradient id="blue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d86ff"/><stop offset="1" stop-color="#0550ff"/></linearGradient>
<linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16244d"/><stop offset="1" stop-color="#0f1b3d"/></linearGradient>
<linearGradient id="cyan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0550ff"/><stop offset="1" stop-color="#38d6ff"/></linearGradient>
<pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#ffffff" fill-opacity="0.06"/></pattern>
</defs>`;
const base=(glowX,glowY,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#dots)"/>
<ellipse cx="${glowX}" cy="${glowY}" rx="560" ry="360" fill="url(#glow)"/>${body}</svg>`;

/* 1. Custom software development cost */
const bars=[90,140,120,190,230,290].map((h,i)=>`<rect x="${250+i*62}" y="${500-h}" width="38" height="${h}" rx="6" fill="url(#blue)" fill-opacity="${0.55+i*0.08}"/>`).join('');
const coins=(x,y,n)=>Array.from({length:n},(_,i)=>`<ellipse cx="${x}" cy="${y-i*16}" rx="46" ry="14" fill="#0b1a44" stroke="#4d86ff" stroke-width="3"/>`).join('')+`<ellipse cx="${x}" cy="${y-(n-1)*16}" rx="46" ry="14" fill="url(#blue)"/>`;
const cost=base(560,380,`
<rect x="190" y="150" width="620" height="400" rx="22" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="190" y="150" width="620" height="44" rx="22" fill="#1b2c5c"/><rect x="190" y="172" width="620" height="22" fill="#1b2c5c"/>
<circle cx="222" cy="172" r="7" fill="#ff5f7a"/><circle cx="246" cy="172" r="7" fill="#ffc14d"/><circle cx="270" cy="172" r="7" fill="#3ddc97"/>
<rect x="230" y="220" width="160" height="14" rx="7" fill="#ffffff" fill-opacity="0.75"/><rect x="230" y="244" width="100" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/>
${bars}
<path d="M269 420 L331 372 L393 390 L455 318 L517 282 L579 214" fill="none" stroke="#38d6ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
${[[269,420],[331,372],[393,390],[455,318],[517,282],[579,214]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#070f2b" stroke="#38d6ff" stroke-width="3"/>`).join('')}
<rect x="640" y="220" width="140" height="90" rx="14" fill="#0b1a44" stroke="#2a3f7a"/><rect x="660" y="244" width="70" height="10" rx="5" fill="#ffffff" fill-opacity="0.35"/><rect x="660" y="266" width="96" height="20" rx="6" fill="url(#cyan)"/>
<rect x="640" y="330" width="140" height="90" rx="14" fill="#0b1a44" stroke="#2a3f7a"/><rect x="660" y="354" width="70" height="10" rx="5" fill="#ffffff" fill-opacity="0.35"/><rect x="660" y="376" width="64" height="20" rx="6" fill="#4d86ff"/>
<rect x="640" y="440" width="140" height="80" rx="14" fill="#0b1a44" stroke="#2a3f7a"/><rect x="660" y="462" width="70" height="10" rx="5" fill="#ffffff" fill-opacity="0.35"/><rect x="660" y="482" width="104" height="18" rx="6" fill="#ffffff" fill-opacity="0.18"/>
<path d="M170 600 L830 600" stroke="#2a3f7a" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"/>
${[220,390,560,730].map((x,i)=>`<circle cx="${x}" cy="600" r="${i===3?16:12}" fill="${i<3?'url(#blue)':'#070f2b'}" stroke="#4d86ff" stroke-width="3"/>`).join('')}
${[[900,300,320,'0.5'],[900,400,380,'0.75'],[900,500,440,'1']].map(([x,y,w,o])=>`<rect x="${x}" y="${y}" width="${w}" height="72" rx="16" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/><rect x="${x+24}" y="${y+22}" width="${w*0.35}" height="12" rx="6" fill="#ffffff" fill-opacity="0.6"/><rect x="${x+24}" y="${y+44}" width="${w*0.2}" height="8" rx="4" fill="#ffffff" fill-opacity="0.25"/><rect x="${x+w-110}" y="${y+22}" width="86" height="28" rx="14" fill="url(#blue)" fill-opacity="${o}"/>`).join('')}
${coins(1050,250,4)}${coins(1165,250,6)}${coins(1280,250,8)}
`);

/* 2. AI agents for business automation */
const cx=688,cy=384,R=265;
const angles=[-90,-30,30,90,150,210];
const nodes=angles.map(a=>[cx+R*1.35*Math.cos(a*Math.PI/180),cy+R*Math.sin(a*Math.PI/180)]);
const icon=(i,x,y)=>{
 const s=(d)=>`<g transform="translate(${x-28},${y-28})">${d}</g>`;
 return [
  s(`<rect x="4" y="12" width="48" height="34" rx="6" fill="none" stroke="#fff" stroke-width="3"/><path d="M6 15 L28 32 L50 15" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`),
  s(`<path d="M6 10 h44 a4 4 0 0 1 4 4 v24 a4 4 0 0 1 -4 4 h-26 l-10 9 v-9 h-8 a4 4 0 0 1 -4 -4 v-24 a4 4 0 0 1 4 -4z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><circle cx="18" cy="26" r="3" fill="#fff"/><circle cx="28" cy="26" r="3" fill="#fff"/><circle cx="38" cy="26" r="3" fill="#fff"/>`),
  s(`<rect x="12" y="4" width="34" height="46" rx="4" fill="none" stroke="#fff" stroke-width="3"/><path d="M19 16 h20 M19 25 h20 M19 34 h13" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
  s(`<path d="M28 6 L50 17 L50 41 L28 52 L6 41 L6 17Z M6 17 L28 28 L50 17 M28 28 L28 52" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`),
  s(`<rect x="6" y="10" width="44" height="40" rx="5" fill="none" stroke="#fff" stroke-width="3"/><path d="M6 21 h44 M17 5 v10 M39 5 v10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><rect x="14" y="28" width="8" height="7" rx="1.5" fill="#fff"/><rect x="26" y="28" width="8" height="7" rx="1.5" fill="#fff"/><rect x="14" y="38" width="8" height="7" rx="1.5" fill="#fff" fill-opacity="0.5"/>`),
  s(`<circle cx="28" cy="18" r="9" fill="none" stroke="#fff" stroke-width="3"/><path d="M10 50 a18 16 0 0 1 36 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="14" r="5" fill="#38d6ff"/>`),
 ][i];
};
const links=nodes.map(([x,y],i)=>{const mx=(cx+x)/2+(i%2?40:-40),my=(cy+y)/2;return `<path d="M${cx} ${cy} Q${mx} ${my} ${x} ${y}" fill="none" stroke="#2f86ff" stroke-width="3" stroke-opacity="0.85"/><circle cx="${(cx+2*mx+x)/4}" cy="${(cy+2*my+y)/4}" r="6" fill="#38d6ff"/>`}).join('');
const agents=base(cx,cy,`
<ellipse cx="${cx}" cy="${cy}" rx="${R*1.35}" ry="${R}" fill="none" stroke="#2a3f7a" stroke-width="2" stroke-dasharray="4 10"/>
${links}
${nodes.map(([x,y],i)=>`<rect x="${x-52}" y="${y-52}" width="104" height="104" rx="26" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>${icon(i,x,y)}`).join('')}
<circle cx="${cx}" cy="${cy}" r="120" fill="#0550ff" fill-opacity="0.12"/>
<circle cx="${cx}" cy="${cy}" r="92" fill="#0550ff" fill-opacity="0.18"/>
<rect x="${cx-72}" y="${cy-62}" width="144" height="124" rx="36" fill="url(#blue)"/>
<rect x="${cx-50}" y="${cy-34}" width="100" height="56" rx="24" fill="#070f2b"/>
<circle cx="${cx-20}" cy="${cy-6}" r="10" fill="#38d6ff"/><circle cx="${cx+20}" cy="${cy-6}" r="10" fill="#38d6ff"/>
<path d="M${cx} ${cy-62} v-28" stroke="#4d86ff" stroke-width="5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy-96}" r="10" fill="#38d6ff"/>
`);

/* 3. Headless vs traditional commerce */
const cube=(x,y,s,fill,op=1)=>`<g opacity="${op}"><path d="M${x} ${y} L${x+s} ${y-s*0.5} L${x+2*s} ${y} L${x+s} ${y+s*0.5}Z" fill="#2c4a9e"/><path d="M${x} ${y} L${x+s} ${y+s*0.5} L${x+s} ${y+s*1.5} L${x} ${y+s}Z" fill="${fill}"/><path d="M${x+s} ${y+s*0.5} L${x+2*s} ${y} L${x+2*s} ${y+s} L${x+s} ${y+s*1.5}Z" fill="#0a1740"/></g>`;
const headless=base(900,380,`
${cube(150,280,190,'#1b2c5c',0.95)}
${[0,1,2,3,4].map(i=>`<path d="M${170} ${300+i*34+95*0} l150 75" stroke="#ffffff" stroke-opacity="0.07" stroke-width="3"/>`).join('')}
<path d="M560 384 H660" stroke="#4d86ff" stroke-width="5" stroke-linecap="round"/><path d="M645 368 L665 384 L645 400" fill="none" stroke="#4d86ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="760" y="110" width="360" height="190" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
<rect x="780" y="130" width="320" height="130" rx="10" fill="#0b1a44"/><rect x="800" y="150" width="120" height="90" rx="8" fill="url(#blue)" fill-opacity="0.7"/><rect x="936" y="152" width="140" height="12" rx="6" fill="#ffffff" fill-opacity="0.6"/><rect x="936" y="174" width="100" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/><rect x="936" y="208" width="96" height="26" rx="13" fill="url(#cyan)"/>
<rect x="1150" y="130" width="96" height="170" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/><rect x="1162" y="150" width="72" height="72" rx="8" fill="url(#blue)" fill-opacity="0.7"/><rect x="1162" y="232" width="56" height="9" rx="4" fill="#ffffff" fill-opacity="0.5"/><rect x="1162" y="252" width="72" height="22" rx="11" fill="url(#cyan)"/>
<rect x="760" y="360" width="486" height="48" rx="24" fill="url(#cyan)" fill-opacity="0.9"/>
${[820,920,1020,1120,1200].map(x=>`<circle cx="${x}" cy="384" r="7" fill="#070f2b"/>`).join('')}
${[[940,300],[1198,300]].map(([x,y])=>`<path d="M${x} ${y} V360" stroke="#38d6ff" stroke-width="3" stroke-dasharray="6 8"/>`).join('')}
${[[790,580],[935,580],[1080,580]].map(([x,y])=>`<path d="M${x+62} 408 V${y-62}" stroke="#38d6ff" stroke-width="3" stroke-dasharray="6 8"/>`).join('')}
${cube(790,520,62,'#16357f')}${cube(935,520,62,'#16357f')}${cube(1080,520,62,'#16357f')}
`);

export default {'custom-software-development-cost':cost,'ai-agents-business-automation':agents,'headless-vs-traditional-commerce':headless};
