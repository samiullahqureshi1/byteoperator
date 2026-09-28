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

/* 4. SaaS MVP development: product window + launch roadmap */
const step=(x,label,done)=>`<circle cx="${x}" cy="610" r="${done?16:13}" fill="${done?'url(#blue)':'#070f2b'}" stroke="#4d86ff" stroke-width="3"/>${done?`<path d="M${x-7} 610 l5 5 l9 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`:''}<rect x="${x-40}" y="640" width="80" height="10" rx="5" fill="#ffffff" fill-opacity="${done?0.45:0.2}"/>`;
const saas=base(620,360,`
<rect x="170" y="110" width="720" height="440" rx="22" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="170" y="110" width="720" height="44" rx="22" fill="#1b2c5c"/><rect x="170" y="132" width="720" height="22" fill="#1b2c5c"/>
<circle cx="202" cy="132" r="7" fill="#ff5f7a"/><circle cx="226" cy="132" r="7" fill="#ffc14d"/><circle cx="250" cy="132" r="7" fill="#3ddc97"/>
<rect x="170" y="154" width="150" height="396" fill="#0f1b3d"/>
${[0,1,2,3,4].map(i=>`<rect x="192" y="${186+i*44}" width="${i===0?106:86}" height="14" rx="7" fill="${i===0?'url(#cyan)':'#ffffff'}" fill-opacity="${i===0?1:0.22}"/>`).join('')}
${[0,1,2].map(i=>`<rect x="${346+i*176}" y="180" width="156" height="96" rx="14" fill="#0b1a44" stroke="#2a3f7a"/><rect x="${364+i*176}" y="202" width="64" height="10" rx="5" fill="#ffffff" fill-opacity="0.35"/><rect x="${364+i*176}" y="226" width="${[92,70,110][i]}" height="24" rx="6" fill="${['url(#cyan)','#4d86ff','#ffffff'][i]}" fill-opacity="${[1,1,0.25][i]}"/>`).join('')}
<rect x="346" y="300" width="508" height="220" rx="14" fill="#0b1a44" stroke="#2a3f7a"/>
<path d="M372 480 C430 470 460 420 520 430 S620 360 680 372 S780 318 830 322" fill="none" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>
<path d="M372 480 C430 470 460 420 520 430 S620 360 680 372 S780 318 830 322 V500 H372Z" fill="#0550ff" fill-opacity="0.14"/>
<path d="M150 610 H1230" stroke="#2a3f7a" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"/>
${step(260,'',1)}${step(480,'',1)}${step(700,'',1)}${step(920,'',0)}
<g transform="translate(1060 150)">
<path d="M90 0 C150 50 160 150 130 250 H50 C20 150 30 50 90 0Z" fill="url(#blue)"/>
<circle cx="90" cy="110" r="30" fill="#070f2b" stroke="#38d6ff" stroke-width="5"/>
<path d="M50 190 L0 260 L50 250Z M130 190 L180 260 L130 250Z" fill="#2c4a9e"/>
<path d="M60 262 Q90 350 120 262Z" fill="#38d6ff" fill-opacity="0.85"/><path d="M75 262 Q90 320 105 262Z" fill="#fff" fill-opacity="0.8"/>
</g>
<circle cx="1150" cy="610" r="20" fill="#070f2b" stroke="#38d6ff" stroke-width="4"/><path d="M1150 598 v24 M1138 610 h24" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>
`);

/* 5. Generative engine optimisation: AI answer citing sources */
const src=(x,y,w,hi)=>`<rect x="${x}" y="${y}" width="${w}" height="86" rx="16" fill="url(#panel)" stroke="${hi?'#38d6ff':'#2a3f7a'}" stroke-width="${hi?3:2}"/><rect x="${x+20}" y="${y+20}" width="40" height="40" rx="10" fill="${hi?'url(#cyan)':'#1b2c5c'}"/><rect x="${x+76}" y="${y+24}" width="${w*0.45}" height="12" rx="6" fill="#ffffff" fill-opacity="${hi?0.7:0.4}"/><rect x="${x+76}" y="${y+48}" width="${w*0.3}" height="9" rx="4.5" fill="#ffffff" fill-opacity="0.2"/>`;
const geo=base(560,360,`
<rect x="150" y="90" width="700" height="72" rx="36" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
<circle cx="196" cy="126" r="15" fill="none" stroke="#fff" stroke-width="4"/><path d="M207 137 l14 14" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
<rect x="240" y="118" width="380" height="16" rx="8" fill="#ffffff" fill-opacity="0.55"/>
<rect x="760" y="104" width="72" height="44" rx="22" fill="url(#blue)"/><path d="M788 116 l12 10 l-12 10" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="150" y="200" width="700" height="360" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<g transform="translate(182 232)"><rect width="56" height="56" rx="16" fill="url(#blue)"/><path d="M28 12 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 l11 -4z" fill="#fff"/></g>
${[[260,250,420],[260,280,500],[260,310,460],[260,340,380]].map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="12" rx="6" fill="#ffffff" fill-opacity="0.35"/>`).join('')}
<rect x="646" y="336" width="44" height="22" rx="11" fill="url(#cyan)"/><rect x="700" y="336" width="44" height="22" rx="11" fill="#1b2c5c" stroke="#3a5bb0"/>
${[[260,392,560],[260,422,480],[260,452,520]].map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="12" rx="6" fill="#ffffff" fill-opacity="0.22"/>`).join('')}
<rect x="260" y="492" width="120" height="30" rx="15" fill="#0b1a44" stroke="#2a3f7a"/><rect x="392" y="492" width="120" height="30" rx="15" fill="#0b1a44" stroke="#2a3f7a"/>
${src(930,150,300,1)}${src(930,270,300,0)}${src(930,390,300,0)}${src(930,510,300,0)}
<path d="M690 347 C800 347 820 193 930 193" fill="none" stroke="#38d6ff" stroke-width="3" stroke-dasharray="6 8"/>
<path d="M744 347 C830 347 850 313 930 313" fill="none" stroke="#4d86ff" stroke-width="2" stroke-opacity="0.6" stroke-dasharray="6 8"/>
`);

/* 6. Ecommerce platform migration without losing SEO */
const store=(x,y,accent,op)=>`<g opacity="${op}"><rect x="${x}" y="${y}" width="300" height="340" rx="22" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
<path d="M${x+30} ${y+40} h240 l-18 50 h-204z" fill="${accent}"/>${[0,1,2,3,4].map(i=>`<path d="M${x+48+i*48} ${y+40} v50" stroke="#070f2b" stroke-opacity="0.35" stroke-width="3"/>`).join('')}
${[0,1].map(r=>[0,1,2].map(c=>`<rect x="${x+30+c*84}" y="${y+120+r*100}" width="72" height="84" rx="10" fill="#0b1a44" stroke="#2a3f7a"/><rect x="${x+40+c*84}" y="${y+130+r*100}" width="52" height="40" rx="6" fill="${accent}" fill-opacity="0.5"/><rect x="${x+40+c*84}" y="${y+180+r*100}" width="40" height="8" rx="4" fill="#ffffff" fill-opacity="0.35"/>`).join('')).join('')}</g>`;
const migrate=base(688,380,`
${store(110,210,'#2c4a9e',0.6)}
${store(966,210,'url(#cyan)',1)}
${[0,1,2,3,4].map(i=>`<rect x="470" y="${200+i*76}" width="436" height="54" rx="27" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/><rect x="494" y="${220+i*76}" width="${[110,90,130,100,120][i]}" height="12" rx="6" fill="#ffffff" fill-opacity="0.3"/><text x="660" y="${234+i*76}" font-family="monospace" font-size="18" font-weight="700" fill="#38d6ff">301</text><path d="M708 ${227+i*76} h36" stroke="#38d6ff" stroke-width="3" stroke-linecap="round"/><path d="M736 ${219+i*76} l9 8 l-9 8" fill="none" stroke="#38d6ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="${760}" y="${220+i*76}" width="${[110,90,120,96,116][i]}" height="12" rx="6" fill="#ffffff" fill-opacity="0.6"/>`).join('')}
<path d="M420 380 H455" stroke="#4d86ff" stroke-width="4" stroke-linecap="round"/><path d="M921 380 H956" stroke="#4d86ff" stroke-width="4" stroke-linecap="round"/>
<g transform="translate(560 90)"><rect width="256" height="70" rx="35" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
<path d="M40 48 l22 -18 l18 12 l28 -24" fill="none" stroke="#3ddc97" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="130" y="24" width="96" height="10" rx="5" fill="#ffffff" fill-opacity="0.55"/><rect x="130" y="42" width="66" height="8" rx="4" fill="#ffffff" fill-opacity="0.25"/></g>
`);

/* 7. Technical SEO Checklist: audit clipboard, green checks, Core Web Vitals gauges */
const checkItem=(x,y,w,label)=>`<g transform="translate(${x} ${y})"><rect width="${w}" height="56" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/><circle cx="32" cy="28" r="14" fill="#0b1a44" stroke="#3ddc97" stroke-width="2.5"/><path d="M26 28 l4 4 l8 -8" fill="none" stroke="#3ddc97" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="60" y="22" width="${w-80}" height="12" rx="6" fill="#ffffff" fill-opacity="0.6"/></g>`;
const gauge=(x,y,score,label,unit)=>`<g transform="translate(${x} ${y})"><rect width="180" height="150" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/><circle cx="90" cy="70" r="42" fill="none" stroke="#0b1a44" stroke-width="10"/><circle cx="90" cy="70" r="42" fill="none" stroke="#3ddc97" stroke-width="10" stroke-dasharray="264" stroke-dashoffset="30" stroke-linecap="round"/><text x="90" y="78" font-family="sans-serif" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle">${score}</text><text x="90" y="128" font-family="sans-serif" font-size="14" font-weight="600" fill="#38d6ff" text-anchor="middle">${label}</text></g>`;

const techSeo=base(688,380,`
<rect x="140" y="100" width="600" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="140" y="100" width="600" height="48" rx="24" fill="#1b2c5c"/><rect x="140" y="124" width="600" height="24" fill="#1b2c5c"/>
<circle cx="172" cy="124" r="7" fill="#ff5f7a"/><circle cx="196" cy="124" r="7" fill="#ffc14d"/><circle cx="220" cy="124" r="7" fill="#3ddc97"/>
<rect x="250" y="116" width="300" height="16" rx="8" fill="#ffffff" fill-opacity="0.4"/>
<g transform="translate(180 180)">
${checkItem(0,0,520,'')}
${checkItem(0,76,520,'')}
${checkItem(0,152,520,'')}
${checkItem(0,228,520,'')}
${checkItem(0,304,520,'')}
</g>
<g transform="translate(780 100)">
<rect width="456" height="540" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
<rect x="30" y="30" width="396" height="40" rx="10" fill="#0b1a44"/><rect x="50" y="44" width="220" height="12" rx="6" fill="url(#cyan)"/>
${gauge(30,100,'100','LCP 0.8s','')}
${gauge(246,100,'100','INP 34ms','')}
${gauge(30,280,'0.00','CLS Zero','')}
${gauge(246,280,'100','Core Vitals','')}
<rect x="30" y="460" width="396" height="48" rx="24" fill="url(#blue)"/><path d="M190 484 l14 -10 l14 10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
</g>
`);

/* 8. Shopify Custom App Development: Remix, GraphQL, Webhooks */
const shopifyApp = base(688, 380, `
<rect x="140" y="100" width="620" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="140" y="100" width="620" height="48" rx="24" fill="#1b2c5c"/><rect x="140" y="124" width="620" height="24" fill="#1b2c5c"/>
<circle cx="172" cy="124" r="7" fill="#ff5f7a"/><circle cx="196" cy="124" r="7" fill="#ffc14d"/><circle cx="220" cy="124" r="7" fill="#3ddc97"/>
<rect x="250" y="116" width="220" height="16" rx="8" fill="#ffffff" fill-opacity="0.4"/>
<g transform="translate(180 180)">
  <rect width="540" height="100" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="45" font-family="monospace" font-size="16" fill="#38d6ff">query GetCustomerOrders {</text>
  <text x="50" y="70" font-family="monospace" font-size="15" fill="#ffffff" fill-opacity="0.8">orders(first: 10) { edges { node { id total } } }</text>
  <text x="30" y="90" font-family="monospace" font-size="16" fill="#38d6ff">}</text>
</g>
<g transform="translate(180 300)">
  <rect width="540" height="150" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <rect x="30" y="25" width="120" height="14" rx="7" fill="url(#cyan)"/>
  <rect x="30" y="55" width="480" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/>
  <rect x="30" y="75" width="380" height="10" rx="5" fill="#ffffff" fill-opacity="0.2"/>
  <rect x="30" y="100" width="140" height="30" rx="15" fill="url(#blue)"/>
</g>
<g transform="translate(180 470)">
  <rect width="255" height="130" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="25" y="25" width="90" height="12" rx="6" fill="#ffffff" fill-opacity="0.7"/>
  <text x="25" y="75" font-family="sans-serif" font-size="22" font-weight="700" fill="#3ddc97">Remix / Vite</text>
  <rect x="25" y="95" width="120" height="8" rx="4" fill="#ffffff" fill-opacity="0.3"/>
</g>
<g transform="translate(465 470)">
  <rect width="255" height="130" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="25" y="25" width="90" height="12" rx="6" fill="#ffffff" fill-opacity="0.7"/>
  <text x="25" y="75" font-family="sans-serif" font-size="22" font-weight="700" fill="#38d6ff">GraphQL API</text>
  <rect x="25" y="95" width="120" height="8" rx="4" fill="#ffffff" fill-opacity="0.3"/>
</g>
<g transform="translate(800 140)">
  <rect width="440" height="460" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="40" y="40" width="360" height="80" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <circle cx="80" cy="80" r="20" fill="url(#blue)"/>
  <text x="120" y="86" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Webhooks Bus</text>
  <rect x="40" y="140" width="360" height="80" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <circle cx="80" cy="180" r="20" fill="#3ddc97"/>
  <text x="120" y="186" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">App Bridge v4</text>
  <rect x="40" y="240" width="360" height="80" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <circle cx="80" cy="280" r="20" fill="url(#cyan)"/>
  <text x="120" y="286" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Session Tokens</text>
  <rect x="40" y="340" width="360" height="80" rx="16" fill="url(#blue)" fill-opacity="0.3"/>
  <text x="120" y="386" font-family="sans-serif" font-size="18" font-weight="700" fill="#38d6ff">Prisma PostgreSQL</text>
</g>
`);

/* 9. Enterprise AI Automation & Agentic Workflows */
const aiEnterprise = base(688, 380, `
<g transform="translate(140 100)">
  <rect width="520" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <rect width="520" height="48" rx="24" fill="#1b2c5c"/><rect y="24" width="520" height="24" fill="#1b2c5c"/>
  <circle cx="32" cy="24" r="7" fill="#ff5f7a"/><circle cx="56" cy="24" r="7" fill="#ffc14d"/><circle cx="80" cy="24" r="7" fill="#3ddc97"/>
  <text x="110" y="30" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff" fill-opacity="0.8">LangGraph Multi-Agent Orchestration</text>
  
  <rect x="40" y="80" width="440" height="90" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <text x="70" y="125" font-family="sans-serif" font-size="18" font-weight="700" fill="#38d6ff">Supervisor Agent (Router)</text>
  <text x="70" y="148" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">Intent classification & plan decomposition</text>
  
  <path d="M260 170 V210" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>
  
  <rect x="40" y="210" width="205" height="120" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <text x="60" y="250" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">RAG Agent</text>
  <text x="60" y="275" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">Vector DB query</text>
  <text x="60" y="300" font-family="sans-serif" font-size="12" fill="#3ddc97">pgvector embeddings</text>
  
  <rect x="275" y="210" width="205" height="120" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <text x="295" y="250" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">Tool Agent</text>
  <text x="295" y="275" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">ERP & CRM APIs</text>
  <text x="295" y="300" font-family="sans-serif" font-size="12" fill="#38d6ff">Deterministic execution</text>

  <path d="M260 330 V370" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>
  
  <rect x="40" y="370" width="440" height="110" rx="16" fill="url(#panel)" stroke="#3ddc97" stroke-width="2"/>
  <text x="70" y="415" font-family="sans-serif" font-size="18" font-weight="700" fill="#3ddc97">Evaluation & HITL Gate</text>
  <text x="70" y="440" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Schema validation & human approval</text>
</g>
<g transform="translate(700 100)">
  <rect width="536" height="540" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="40" y="40" width="456" height="60" rx="14" fill="#0b1a44"/>
  <text x="70" y="76" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Enterprise Guardrails</text>
  ${[
    ['Zero-Data Retention Policy', 'Enterprise private endpoints', '#3ddc97'],
    ['Pydantic / Zod Output Schemas', 'Strict deterministic typing', '#38d6ff'],
    ['Least-Privilege API Scopes', 'Granular IAM credentials', 'url(#blue)'],
    ['Immutable Audit Logs', 'Full tracing with OpenTelemetry', '#4d86ff']
  ].map(([title, sub, color], i) => `
    <rect x="40" y="${120 + i * 95}" width="456" height="78" rx="14" fill="#0b1a44" stroke="#2a3f7a"/>
    <circle cx="75" cy="${159 + i * 95}" r="12" fill="${color}"/>
    <text x="105" y="${154 + i * 95}" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">${title}</text>
    <text x="105" y="${176 + i * 95}" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.55">${sub}</text>
  `).join('')}
</g>
`);

/* 10. Next.js SaaS Architecture Best Practices */
const nextjsSaas = base(688, 380, `
<rect x="140" y="100" width="700" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="140" y="100" width="700" height="48" rx="24" fill="#1b2c5c"/><rect x="140" y="124" width="700" height="24" fill="#1b2c5c"/>
<circle cx="172" cy="124" r="7" fill="#ff5f7a"/><circle cx="196" cy="124" r="7" fill="#ffc14d"/><circle cx="220" cy="124" r="7" fill="#3ddc97"/>
<text x="250" y="130" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff" fill-opacity="0.8">Next.js 14 App Router + Multi-Tenant Architecture</text>

<g transform="translate(180 180)">
  <rect width="620" height="90" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="25" y="25" width="160" height="40" rx="10" fill="url(#cyan)"/>
  <text x="45" y="50" font-family="sans-serif" font-size="15" font-weight="700" fill="#070f2b">Server Actions</text>
  <rect x="205" y="25" width="160" height="40" rx="10" fill="url(#blue)"/>
  <text x="225" y="50" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">Edge Middleware</text>
  <rect x="385" y="25" width="210" height="40" rx="10" fill="#16244d" stroke="#3a5bb0"/>
  <text x="405" y="50" font-family="sans-serif" font-size="15" font-weight="700" fill="#38d6ff">Tenant Subdomain /app</text>
</g>

<g transform="translate(180 290)">
  <rect width="620" height="150" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <text x="30" y="40" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">PostgreSQL Row-Level Security (RLS)</text>
  <text x="30" y="70" font-family="monospace" font-size="14" fill="#38d6ff">CREATE POLICY tenant_isolation_policy ON organizations</text>
  <text x="30" y="95" font-family="monospace" font-size="14" fill="#ffffff" fill-opacity="0.7">USING (tenant_id = current_setting('app.current_tenant'));</text>
  <rect x="30" y="115" width="140" height="20" rx="6" fill="url(#cyan)" fill-opacity="0.8"/>
</g>

<g transform="translate(180 460)">
  <rect width="620" height="140" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="40" font-family="sans-serif" font-size="16" font-weight="700" fill="#3ddc97">Stripe Subscriptions & Webhook Queue</text>
  <rect x="30" y="60" width="180" height="50" rx="10" fill="#16244d"/>
  <text x="45" y="90" font-family="sans-serif" font-size="14" font-weight="600" fill="#ffffff">invoice.paid</text>
  <rect x="230" y="60" width="180" height="50" rx="10" fill="#16244d"/>
  <text x="245" y="90" font-family="sans-serif" font-size="14" font-weight="600" fill="#ffffff">customer.updated</text>
  <rect x="430" y="60" width="160" height="50" rx="10" fill="url(#blue)"/>
  <text x="445" y="90" font-family="sans-serif" font-size="14" font-weight="600" fill="#ffffff">Idempotent Sync</text>
</g>

<g transform="translate(880 140)">
  <rect width="360" height="460" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="35" y="55" font-family="sans-serif" font-size="20" font-weight="700" fill="#ffffff">Production Stack</text>
  ${[
    ['Next.js 14 App Router', 'React Server Components'],
    ['Prisma / Drizzle ORM', 'Type-safe SQL queries'],
    ['Clerk / NextAuth', 'Secure session JWTs'],
    ['Inngest / BullMQ', 'Background job workers'],
    ['Tailwind + shadcn/ui', 'Reusable design system']
  ].map(([t, s], i) => `
    <rect x="30" y="${80 + i * 72}" width="300" height="60" rx="12" fill="#0b1a44" stroke="#2a3f7a"/>
    <text x="50" y="${108 + i * 72}" font-family="sans-serif" font-size="15" font-weight="700" fill="#38d6ff">${t}</text>
    <text x="50" y="${128 + i * 72}" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">${s}</text>
  `).join('')}
</g>
`);

/* 11. Shopify to Custom Web Platform Migration */
const shopifyCustomMigrate = base(688, 380, `
<g transform="translate(120 140)">
  <rect width="320" height="480" rx="22" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="40" y="55" font-family="sans-serif" font-size="20" font-weight="700" fill="#ff5f7a">Legacy Shopify Store</text>
  <rect x="40" y="80" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="115" font-family="sans-serif" font-size="15" fill="#ffffff">Liquid Templates</text>
  <rect x="40" y="160" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="195" font-family="sans-serif" font-size="15" fill="#ffffff">App Script Injections</text>
  <rect x="40" y="240" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="275" font-family="sans-serif" font-size="15" fill="#ffffff">Monolithic Limits</text>
  <rect x="40" y="320" width="240" height="120" rx="12" fill="#1b2c5c"/>
  <text x="60" y="360" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.6">Data Export:</text>
  <text x="60" y="390" font-family="monospace" font-size="13" fill="#38d6ff">JSON / REST / GraphQL</text>
</g>

<g transform="translate(480 200)">
  <rect width="416" height="360" rx="20" fill="url(#panel)" stroke="#38d6ff" stroke-width="2"/>
  <text x="40" y="50" font-family="sans-serif" font-size="18" font-weight="700" fill="#38d6ff">ETL & Migration Pipeline</text>
  ${[
    ['1. Customer & Hash Porting', 'Multipass / bcrypt verification'],
    ['2. Order & Transaction Sync', 'Preserve order histories'],
    ['3. URL 1-to-1 Redirect Rules', 'Zero 404s, 100% PageRank'],
    ['4. Delta Sync Cutover', 'Zero downtime cutover']
  ].map(([t, s], i) => `
    <rect x="30" y="${75 + i * 65}" width="356" height="52" rx="10" fill="#0b1a44" stroke="#2a3f7a"/>
    <text x="50" y="${100 + i * 65}" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">${t}</text>
    <text x="50" y="${118 + i * 65}" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">${s}</text>
  `).join('')}
</g>

<g transform="translate(936 140)">
  <rect width="320" height="480" rx="22" fill="url(#panel)" stroke="#3ddc97" stroke-width="2"/>
  <text x="40" y="55" font-family="sans-serif" font-size="20" font-weight="700" fill="#3ddc97">Custom Web Platform</text>
  <rect x="40" y="80" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="115" font-family="sans-serif" font-size="15" fill="#ffffff">Next.js Edge Frontend</text>
  <rect x="40" y="160" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="195" font-family="sans-serif" font-size="15" fill="#ffffff">Node.js Microservices</text>
  <rect x="40" y="240" width="240" height="60" rx="12" fill="#0b1a44"/>
  <text x="60" y="275" font-family="sans-serif" font-size="15" fill="#ffffff">PostgreSQL / Redis</text>
  <rect x="40" y="320" width="240" height="120" rx="12" fill="url(#blue)" fill-opacity="0.3"/>
  <text x="60" y="365" font-family="sans-serif" font-size="15" font-weight="700" fill="#3ddc97">Full Custom Ownership</text>
  <text x="60" y="395" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.8">Sub-second global TTFB</text>
</g>
`);

export default {
  'custom-software-development-cost': cost,
  'ai-agents-business-automation': agents,
  'headless-vs-traditional-commerce': headless,
  'saas-mvp-development-guide': saas,
  'generative-engine-optimization': geo,
  'ecommerce-platform-migration-seo': migrate,
  'technical-seo-checklist': techSeo,
  'shopify-custom-app-development': shopifyApp,
  'enterprise-ai-automation': aiEnterprise,
  'nextjs-saas-architecture': nextjsSaas,
  'shopify-to-custom-platform': shopifyCustomMigrate,
};


