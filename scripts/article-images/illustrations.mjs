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
<rect x="140" y="100" width="560" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="140" y="100" width="560" height="48" rx="24" fill="#1b2c5c"/><rect x="140" y="124" width="560" height="24" fill="#1b2c5c"/>
<circle cx="172" cy="124" r="7" fill="#ff5f7a"/><circle cx="196" cy="124" r="7" fill="#ffc14d"/><circle cx="220" cy="124" r="7" fill="#3ddc97"/>
<rect x="250" y="116" width="260" height="16" rx="8" fill="#ffffff" fill-opacity="0.4"/>

<g transform="translate(180 180)">
  <rect width="480" height="90" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <circle cx="50" cy="45" r="22" fill="url(#blue)"/>
  <rect x="90" y="30" width="220" height="14" rx="7" fill="url(#cyan)"/>
  <rect x="90" y="52" width="160" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/>
</g>

<path d="M420 270 V310" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>

<g transform="translate(180 310)">
  <rect width="225" height="130" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <circle cx="45" cy="45" r="18" fill="#3ddc97"/>
  <rect x="75" y="35" width="100" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="30" y="80" width="165" height="10" rx="5" fill="#ffffff" fill-opacity="0.25"/>
  <rect x="30" y="98" width="120" height="10" rx="5" fill="#ffffff" fill-opacity="0.2"/>
</g>

<g transform="translate(435 310)">
  <rect width="225" height="130" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <circle cx="45" cy="45" r="18" fill="url(#blue)"/>
  <rect x="75" y="35" width="100" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="30" y="80" width="165" height="10" rx="5" fill="#ffffff" fill-opacity="0.25"/>
  <rect x="30" y="98" width="120" height="10" rx="5" fill="#ffffff" fill-opacity="0.2"/>
</g>

<path d="M420 440 V470" stroke="#38d6ff" stroke-width="4" stroke-linecap="round"/>

<g transform="translate(180 470)">
  <rect width="480" height="120" rx="16" fill="url(#panel)" stroke="#3ddc97" stroke-width="2"/>
  <circle cx="50" cy="60" r="22" fill="#3ddc97"/>
  <rect x="90" y="42" width="240" height="14" rx="7" fill="#ffffff" fill-opacity="0.9"/>
  <rect x="90" y="66" width="180" height="10" rx="5" fill="#ffffff" fill-opacity="0.4"/>
</g>

<g transform="translate(740 100)">
  <rect width="496" height="540" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="30" y="30" width="436" height="50" rx="12" fill="#0b1a44"/>
  <rect x="50" y="48" width="220" height="14" rx="7" fill="url(#cyan)"/>
  ${[0, 1, 2, 3].map(i => `
    <rect x="30" y="${100 + i * 105}" width="436" height="85" rx="14" fill="#0b1a44" stroke="#2a3f7a"/>
    <circle cx="65" cy="${142 + i * 105}" r="16" fill="${['#3ddc97', '#38d6ff', 'url(#blue)', '#4d86ff'][i]}"/>
    <rect x="100" y="${128 + i * 105}" width="${[220, 260, 200, 240][i]}" height="14" rx="7" fill="#ffffff" fill-opacity="0.75"/>
    <rect x="100" y="${150 + i * 105}" width="${[160, 190, 140, 170][i]}" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/>
  `).join('')}
</g>
`);

/* 10. Next.js SaaS Architecture Best Practices */
const nextjsSaas = base(688, 380, `
<rect x="140" y="100" width="700" height="540" rx="24" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<rect x="140" y="100" width="700" height="48" rx="24" fill="#1b2c5c"/><rect x="140" y="124" width="700" height="24" fill="#1b2c5c"/>
<circle cx="172" cy="124" r="7" fill="#ff5f7a"/><circle cx="196" cy="124" r="7" fill="#ffc14d"/><circle cx="220" cy="124" r="7" fill="#3ddc97"/>
<rect x="250" y="116" width="320" height="16" rx="8" fill="#ffffff" fill-opacity="0.4"/>

<g transform="translate(180 180)">
  <rect width="620" height="90" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="25" y="25" width="160" height="40" rx="10" fill="url(#cyan)"/>
  <rect x="205" y="25" width="160" height="40" rx="10" fill="url(#blue)"/>
  <rect x="385" y="25" width="210" height="40" rx="10" fill="#16244d" stroke="#3a5bb0"/>
</g>

<g transform="translate(180 290)">
  <rect width="620" height="150" rx="16" fill="#0b1a44" stroke="#2a3f7a"/>
  <rect x="30" y="25" width="260" height="14" rx="7" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="30" y="55" width="560" height="10" rx="5" fill="#38d6ff" fill-opacity="0.6"/>
  <rect x="30" y="75" width="480" height="10" rx="5" fill="#ffffff" fill-opacity="0.3"/>
  <rect x="30" y="105" width="140" height="26" rx="13" fill="url(#cyan)" fill-opacity="0.9"/>
</g>

<g transform="translate(180 460)">
  <rect width="620" height="140" rx="16" fill="#0b1a44" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="30" y="25" width="240" height="14" rx="7" fill="#3ddc97"/>
  <rect x="30" y="55" width="180" height="50" rx="10" fill="#16244d"/>
  <rect x="230" y="55" width="180" height="50" rx="10" fill="#16244d"/>
  <rect x="430" y="55" width="160" height="50" rx="10" fill="url(#blue)"/>
</g>

<g transform="translate(880 140)">
  <rect width="360" height="460" rx="24" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <rect x="30" y="30" width="300" height="40" rx="10" fill="#0b1a44"/>
  <rect x="50" y="44" width="180" height="12" rx="6" fill="url(#cyan)"/>
  ${[0, 1, 2, 3, 4].map(i => `
    <rect x="30" y="${85 + i * 70}" width="300" height="56" rx="12" fill="#0b1a44" stroke="#2a3f7a"/>
    <rect x="50" y="${100 + i * 70}" width="${[180, 160, 140, 170, 190][i]}" height="12" rx="6" fill="#38d6ff"/>
    <rect x="50" y="${118 + i * 70}" width="${[120, 100, 90, 110, 130][i]}" height="8" rx="4" fill="#ffffff" fill-opacity="0.3"/>
  `).join('')}
</g>
`);

/* 11. Shopify to Custom Web Platform Migration */
const shopifyCustomMigrate = base(688, 380, `
<g transform="translate(120 140)">
  <rect width="320" height="480" rx="22" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <rect x="40" y="35" width="180" height="16" rx="8" fill="#ff5f7a"/>
  <rect x="40" y="70" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="95" width="140" height="12" rx="6" fill="#ffffff" fill-opacity="0.7"/>
  <rect x="40" y="160" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="185" width="160" height="12" rx="6" fill="#ffffff" fill-opacity="0.7"/>
  <rect x="40" y="250" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="275" width="130" height="12" rx="6" fill="#ffffff" fill-opacity="0.7"/>
  <rect x="40" y="340" width="240" height="100" rx="14" fill="#1b2c5c"/>
  <rect x="60" y="380" width="150" height="14" rx="7" fill="#38d6ff"/>
</g>

<g transform="translate(480 200)">
  <rect width="416" height="360" rx="20" fill="url(#panel)" stroke="#38d6ff" stroke-width="2"/>
  <rect x="40" y="30" width="220" height="16" rx="8" fill="url(#cyan)"/>
  ${[0, 1, 2, 3].map(i => `
    <rect x="30" y="${65 + i * 68}" width="356" height="54" rx="12" fill="#0b1a44" stroke="#2a3f7a"/>
    <rect x="50" y="${80 + i * 68}" width="${[180, 160, 200, 150][i]}" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
    <rect x="50" y="${98 + i * 68}" width="${[120, 110, 140, 90][i]}" height="8" rx="4" fill="#ffffff" fill-opacity="0.3"/>
  `).join('')}
</g>

<g transform="translate(936 140)">
  <rect width="320" height="480" rx="22" fill="url(#panel)" stroke="#3ddc97" stroke-width="2"/>
  <rect x="40" y="35" width="200" height="16" rx="8" fill="#3ddc97"/>
  <rect x="40" y="70" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="95" width="160" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="40" y="160" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="185" width="170" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="40" y="250" width="240" height="70" rx="14" fill="#0b1a44"/>
  <rect x="60" y="275" width="150" height="12" rx="6" fill="#ffffff" fill-opacity="0.8"/>
  <rect x="40" y="340" width="240" height="100" rx="14" fill="url(#blue)" fill-opacity="0.3"/>
  <rect x="60" y="375" width="180" height="14" rx="7" fill="#3ddc97"/>
</g>
`);

// --- shopify-speed-optimization ---
const shopifySpeed = base(688, 380, `
<rect x="140" y="80" width="1096" height="56" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="200" y="118" font-family="sans-serif" font-size="26" font-weight="700" fill="#38d6ff">Shopify Speed Optimization Guide 2026</text>
<text x="920" y="118" font-family="sans-serif" font-size="18" fill="#4d86ff">Core Web Vitals</text>

<g transform="translate(140 170)">
  <rect width="300" height="180" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="150" y="44" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.6">LCP</text>
  <text x="150" y="90" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="800" fill="url(#cyan)">1.8s</text>
  <text x="150" y="130" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#3ddc97">Good (&lt;2.5s)</text>
  <rect x="30" y="150" width="240" height="10" rx="5" fill="#0b1a44"/>
  <rect x="30" y="150" width="170" height="10" rx="5" fill="url(#blue)"/>
</g>

<g transform="translate(470 170)">
  <rect width="300" height="180" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="150" y="44" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.6">INP</text>
  <text x="150" y="90" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="800" fill="#3ddc97">62ms</text>
  <text x="150" y="130" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#3ddc97">Good (&lt;200ms)</text>
  <rect x="30" y="150" width="240" height="10" rx="5" fill="#0b1a44"/>
  <rect x="30" y="150" width="74" height="10" rx="5" fill="#3ddc97"/>
</g>

<g transform="translate(800 170)">
  <rect width="300" height="180" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="150" y="44" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.6">CLS</text>
  <text x="150" y="90" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="800" fill="url(#cyan)">0.04</text>
  <text x="150" y="130" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#3ddc97">Good (&lt;0.1)</text>
  <rect x="30" y="150" width="240" height="10" rx="5" fill="#0b1a44"/>
  <rect x="30" y="150" width="96" height="10" rx="5" fill="url(#cyan)"/>
</g>

<g transform="translate(140 390)">
  <rect width="620" height="300" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="40" font-family="sans-serif" font-size="16" font-weight="700" fill="url(#cyan)">Optimization Checklist</text>
  <rect x="30" y="60" width="560" height="28" rx="8" fill="#0b1a44"/>
  <text x="50" y="79" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Preload LCP image with fetchpriority=high</text>
  <rect x="30" y="98" width="560" height="28" rx="8" fill="#0b1a44"/>
  <text x="50" y="117" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Defer non-critical third-party scripts</text>
  <rect x="30" y="136" width="560" height="28" rx="8" fill="#0b1a44"/>
  <text x="50" y="155" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Serve WebP images via Shopify CDN</text>
  <rect x="30" y="174" width="560" height="28" rx="8" fill="#0b1a44"/>
  <text x="50" y="193" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Add explicit width/height on all images</text>
  <rect x="30" y="212" width="560" height="28" rx="8" fill="#0b1a44"/>
  <text x="50" y="231" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Remove unused app scripts from theme</text>
  <rect x="30" y="250" width="200" height="32" rx="16" fill="url(#blue)"/>
  <text x="130" y="271" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Run PageSpeed Audit</text>
</g>

<g transform="translate(800 390)">
  <rect width="436" height="300" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="40" font-family="sans-serif" font-size="16" font-weight="700" fill="#38d6ff">TTFB Breakdown</text>
  <rect x="30" y="60" width="376" height="44" rx="10" fill="#0b1a44"/>
  <text x="50" y="78" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">DNS Lookup</text>
  <rect x="220" y="70" width="60" height="12" rx="6" fill="url(#cyan)"/>
  <text x="290" y="82" font-family="sans-serif" font-size="12" fill="#38d6ff">12ms</text>
  <rect x="30" y="116" width="376" height="44" rx="10" fill="#0b1a44"/>
  <text x="50" y="134" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">TLS Handshake</text>
  <rect x="220" y="126" width="80" height="12" rx="6" fill="url(#blue)"/>
  <text x="310" y="138" font-family="sans-serif" font-size="12" fill="#4d86ff">38ms</text>
  <rect x="30" y="172" width="376" height="44" rx="10" fill="#0b1a44"/>
  <text x="50" y="190" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Server Response</text>
  <rect x="220" y="182" width="140" height="12" rx="6" fill="#3ddc97"/>
  <text x="368" y="194" font-family="sans-serif" font-size="12" fill="#3ddc97">160ms</text>
  <rect x="30" y="240" width="376" height="32" rx="16" fill="#3ddc97" fill-opacity="0.2"/>
  <text x="218" y="261" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#3ddc97">Total TTFB: 210ms</text>
</g>
`);

// --- mern-stack-development ---
const mernStack = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="700" fill="#ffffff">MERN Stack Full-Stack Development Guide 2026</text>

<g transform="translate(140 150)">
  <rect width="240" height="160" rx="18" fill="url(#panel)" stroke="#3ddc97" stroke-width="3"/>
  <text x="120" y="55" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#3ddc97">M</text>
  <text x="120" y="95" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">MongoDB</text>
  <text x="120" y="120" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">NoSQL Database</text>
  <rect x="30" y="135" width="180" height="8" rx="4" fill="#3ddc97" fill-opacity="0.3"/>
</g>

<g transform="translate(410 150)">
  <rect width="240" height="160" rx="18" fill="url(#panel)" stroke="#ffc14d" stroke-width="3"/>
  <text x="120" y="55" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#ffc14d">E</text>
  <text x="120" y="95" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Express.js</text>
  <text x="120" y="120" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">REST API Layer</text>
  <rect x="30" y="135" width="180" height="8" rx="4" fill="#ffc14d" fill-opacity="0.3"/>
</g>

<g transform="translate(680 150)">
  <rect width="240" height="160" rx="18" fill="url(#panel)" stroke="#38d6ff" stroke-width="3"/>
  <text x="120" y="55" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#38d6ff">R</text>
  <text x="120" y="95" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">React.js</text>
  <text x="120" y="120" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">Frontend UI</text>
  <rect x="30" y="135" width="180" height="8" rx="4" fill="url(#cyan)"/>
</g>

<g transform="translate(950 150)">
  <rect width="240" height="160" rx="18" fill="url(#panel)" stroke="#4d86ff" stroke-width="3"/>
  <text x="120" y="55" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="url(#blue)">N</text>
  <text x="120" y="95" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Node.js</text>
  <text x="120" y="120" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">Server Runtime</text>
  <rect x="30" y="135" width="180" height="8" rx="4" fill="url(#blue)"/>
</g>

<line x1="380" y1="230" x2="410" y2="230" stroke="#2a3f7a" stroke-width="3"/>
<line x1="650" y1="230" x2="680" y2="230" stroke="#2a3f7a" stroke-width="3"/>
<line x1="920" y1="230" x2="950" y2="230" stroke="#2a3f7a" stroke-width="3"/>

<g transform="translate(140 360)">
  <rect width="1096" height="320" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="url(#cyan)">Typical MERN Architecture</text>
  <rect x="30" y="60" width="1036" height="48" rx="10" fill="#0b1a44"/>
  <text x="50" y="80" font-family="monospace" font-size="14" fill="#38d6ff">Client (React)</text>
  <text x="230" y="80" font-family="monospace" font-size="14" fill="#ffffff" fill-opacity="0.5">--HTTP/WS--&gt;</text>
  <text x="420" y="80" font-family="monospace" font-size="14" fill="#ffc14d">Express API</text>
  <text x="580" y="80" font-family="monospace" font-size="14" fill="#ffffff" fill-opacity="0.5">--Mongoose--&gt;</text>
  <text x="760" y="80" font-family="monospace" font-size="14" fill="#3ddc97">MongoDB</text>
  <text x="50" y="98" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.35">useState / React Query</text>
  <text x="420" y="98" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.35">JWT Auth Middleware</text>
  <text x="760" y="98" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.35">Atlas / Self-hosted</text>
  <rect x="30" y="124" width="340" height="60" rx="10" fill="#0b1a44"/>
  <text x="50" y="148" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">State Management</text>
  <text x="50" y="170" font-family="sans-serif" font-size="13" fill="#38d6ff">React Query + Zustand</text>
  <rect x="390" y="124" width="340" height="60" rx="10" fill="#0b1a44"/>
  <text x="410" y="148" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Authentication</text>
  <text x="410" y="170" font-family="sans-serif" font-size="13" fill="#ffc14d">JWT + HTTP-only Cookies</text>
  <rect x="750" y="124" width="316" height="60" rx="10" fill="#0b1a44"/>
  <text x="770" y="148" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Deployment</text>
  <text x="770" y="170" font-family="sans-serif" font-size="13" fill="#3ddc97">Vercel + Railway + Atlas</text>
  <rect x="30" y="210" width="200" height="80" rx="10" fill="#0b1a44"/>
  <text x="50" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Real-time</text>
  <text x="50" y="258" font-family="sans-serif" font-size="14" font-weight="700" fill="#38d6ff">Socket.io</text>
  <rect x="248" y="210" width="200" height="80" rx="10" fill="#0b1a44"/>
  <text x="268" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Validation</text>
  <text x="268" y="258" font-family="sans-serif" font-size="14" font-weight="700" fill="#4d86ff">Zod / Joi</text>
  <rect x="466" y="210" width="200" height="80" rx="10" fill="#0b1a44"/>
  <text x="486" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">ORM</text>
  <text x="486" y="258" font-family="sans-serif" font-size="14" font-weight="700" fill="#3ddc97">Mongoose</text>
  <rect x="684" y="210" width="200" height="80" rx="10" fill="#0b1a44"/>
  <text x="704" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Bundler</text>
  <text x="704" y="258" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffc14d">Vite / CRA</text>
  <rect x="900" y="210" width="196" height="80" rx="10" fill="#0b1a44"/>
  <text x="920" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Testing</text>
  <text x="920" y="258" font-family="sans-serif" font-size="14" font-weight="700" fill="url(#cyan)">Jest + RTL</text>
</g>
`);

// --- api-integration-best-practices ---
const apiIntegration = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">API Integration Best Practices 2026</text>

<g transform="translate(140 150)">
  <rect width="1096" height="140" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="40" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Integration Patterns Comparison</text>
  <rect x="30" y="56" width="180" height="60" rx="10" fill="#0b1a44"/>
  <text x="120" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#38d6ff">REST API</text>
  <text x="120" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Request/Response</text>
  <rect x="228" y="56" width="180" height="60" rx="10" fill="#0b1a44"/>
  <text x="318" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4d86ff">GraphQL</text>
  <text x="318" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Query/Mutation</text>
  <rect x="426" y="56" width="180" height="60" rx="10" fill="#0b1a44"/>
  <text x="516" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#3ddc97">Webhooks</text>
  <text x="516" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Server Push Events</text>
  <rect x="624" y="56" width="180" height="60" rx="10" fill="#0b1a44"/>
  <text x="714" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffc14d">WebSocket</text>
  <text x="714" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Real-time Bidirectional</text>
  <rect x="822" y="56" width="244" height="60" rx="10" fill="#0b1a44"/>
  <text x="944" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ff5f7a">Message Queue</text>
  <text x="944" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Async Decoupled Processing</text>
</g>

<g transform="translate(140 330)">
  <rect width="520" height="370" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="url(#cyan)">Security Checklist</text>
  <rect x="30" y="60" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="83" font-family="sans-serif" font-size="14" fill="#3ddc97">OAuth 2.0 for third-party auth flows</text>
  <rect x="30" y="106" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="129" font-family="sans-serif" font-size="14" fill="#3ddc97">JWT with short expiry + refresh rotation</text>
  <rect x="30" y="152" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="175" font-family="sans-serif" font-size="14" fill="#3ddc97">HMAC-SHA256 webhook signature verify</text>
  <rect x="30" y="198" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="221" font-family="sans-serif" font-size="14" fill="#3ddc97">API keys in secrets manager only</text>
  <rect x="30" y="244" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="267" font-family="sans-serif" font-size="14" fill="#3ddc97">Rate limit headers respected</text>
  <rect x="30" y="290" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="313" font-family="sans-serif" font-size="14" fill="#3ddc97">Idempotency keys on mutations</text>
</g>

<g transform="translate(700 330)">
  <rect width="536" height="370" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="#4d86ff">Resilience Patterns</text>
  <rect x="30" y="60" width="476" height="68" rx="10" fill="#0b1a44"/>
  <text x="50" y="86" font-family="sans-serif" font-size="14" font-weight="700" fill="#38d6ff">Circuit Breaker</text>
  <text x="50" y="110" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">Open on failure threshold; auto-recover on health check</text>
  <rect x="30" y="140" width="476" height="68" rx="10" fill="#0b1a44"/>
  <text x="50" y="166" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffc14d">Exponential Backoff</text>
  <text x="50" y="190" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">1s, 2s, 4s, 8s + jitter on 429 / 5xx responses</text>
  <rect x="30" y="220" width="476" height="68" rx="10" fill="#0b1a44"/>
  <text x="50" y="246" font-family="sans-serif" font-size="14" font-weight="700" fill="#3ddc97">Idempotent Retries</text>
  <text x="50" y="270" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">Unique idempotency key per mutation; safe to retry</text>
  <rect x="30" y="300" width="476" height="40" rx="16" fill="url(#blue)"/>
  <text x="238" y="326" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>
`);

// --- ecommerce-conversion-rate-optimization ---
const ecommerceCro = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">eCommerce Conversion Rate Optimization 2026</text>

<g transform="translate(140 150)">
  <rect width="560" height="530" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="url(#cyan)">Conversion Funnel</text>
  <rect x="40" y="60" width="480" height="60" rx="10" fill="url(#blue)" fill-opacity="0.5"/>
  <text x="280" y="95" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff">Visitors Land on Store</text>
  <rect x="70" y="132" width="420" height="60" rx="10" fill="url(#blue)" fill-opacity="0.4"/>
  <text x="280" y="167" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff">Product Page Views</text>
  <rect x="100" y="204" width="360" height="60" rx="10" fill="url(#blue)" fill-opacity="0.3"/>
  <text x="280" y="239" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff">Add to Cart</text>
  <rect x="130" y="276" width="300" height="60" rx="10" fill="url(#blue)" fill-opacity="0.25"/>
  <text x="280" y="311" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="600" fill="#ffffff">Checkout Initiated</text>
  <rect x="160" y="348" width="240" height="60" rx="10" fill="url(#blue)" fill-opacity="0.9"/>
  <text x="280" y="383" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">Purchase Completed</text>
  <rect x="40" y="430" width="480" height="70" rx="12" fill="#0b1a44"/>
  <text x="280" y="458" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Optimize highest drop-off step first</text>
  <text x="280" y="482" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#38d6ff">Use GA4 Funnel Exploration Reports</text>
</g>

<g transform="translate(740 150)">
  <rect width="496" height="530" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="#4d86ff">Top CRO Tactics</text>
  <rect x="30" y="60" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="85" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">A/B Test CTAs, headlines, images</text>
  <rect x="30" y="110" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="135" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">One-page / guest checkout</text>
  <rect x="30" y="160" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="185" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Show shipping cost before checkout</text>
  <rect x="30" y="210" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="235" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Verified customer reviews + UGC</text>
  <rect x="30" y="260" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="285" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Apple Pay / Shop Pay one-tap mobile</text>
  <rect x="30" y="310" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="335" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">LCP under 2.5s on mobile</text>
  <rect x="30" y="360" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="385" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Exit intent offers for abandoning users</text>
  <rect x="30" y="410" width="436" height="40" rx="8" fill="#0b1a44"/>
  <text x="50" y="435" font-family="sans-serif" font-size="14" fill="#ffffff" fill-opacity="0.85">Product images: multi-angle + lifestyle</text>
  <rect x="30" y="462" width="436" height="40" rx="16" fill="url(#blue)"/>
  <text x="218" y="487" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>
`);

// --- ai-automation-roi-guide ---
const aiRoi = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">AI Automation ROI Measurement Guide 2026</text>

<g transform="translate(140 150)">
  <rect width="680" height="530" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="url(#cyan)">Illustrative ROI Framework</text>
  <rect x="30" y="60" width="620" height="36" rx="8" fill="#0b1a44"/>
  <text x="340" y="83" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.5">ROI = (Net Benefit / Total Cost) x 100</text>
  <rect x="30" y="108" width="290" height="80" rx="10" fill="#0b1a44"/>
  <text x="175" y="134" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Benefit Types</text>
  <text x="50" y="158" font-family="sans-serif" font-size="12" fill="#3ddc97">Labor savings</text>
  <text x="50" y="175" font-family="sans-serif" font-size="12" fill="#3ddc97">Error reduction</text>
  <rect x="340" y="108" width="310" height="80" rx="10" fill="#0b1a44"/>
  <text x="495" y="134" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Cost Types</text>
  <text x="360" y="158" font-family="sans-serif" font-size="12" fill="#ff5f7a">Dev + integration</text>
  <text x="360" y="175" font-family="sans-serif" font-size="12" fill="#ff5f7a">API + maintenance</text>
  <rect x="30" y="210" width="620" height="56" rx="10" fill="#0b1a44" stroke="#2a3f7a" stroke-width="1"/>
  <text x="50" y="234" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Time savings (illustrative example range)</text>
  <rect x="340" y="224" width="180" height="20" rx="10" fill="#2a3f7a"/>
  <rect x="340" y="224" width="126" height="20" rx="10" fill="url(#blue)"/>
  <text x="530" y="239" font-family="sans-serif" font-size="13" fill="#38d6ff">40-70%</text>
  <rect x="30" y="278" width="620" height="56" rx="10" fill="#0b1a44" stroke="#2a3f7a" stroke-width="1"/>
  <text x="50" y="302" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Error reduction (illustrative example range)</text>
  <rect x="340" y="292" width="180" height="20" rx="10" fill="#2a3f7a"/>
  <rect x="340" y="292" width="144" height="20" rx="10" fill="#3ddc97" fill-opacity="0.8"/>
  <text x="530" y="307" font-family="sans-serif" font-size="13" fill="#3ddc97">Up to 80%</text>
  <rect x="30" y="350" width="620" height="36" rx="8" fill="#0b1a44"/>
  <text x="50" y="373" font-family="sans-serif" font-size="12" fill="#ffc14d">Actual results vary by process, industry, and implementation quality</text>
  <rect x="30" y="402" width="290" height="80" rx="10" fill="#0b1a44"/>
  <text x="50" y="426" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">High ROI processes</text>
  <text x="50" y="450" font-family="sans-serif" font-size="12" fill="#38d6ff">Document extraction</text>
  <text x="50" y="467" font-family="sans-serif" font-size="12" fill="#38d6ff">Customer service tier-1</text>
  <rect x="340" y="402" width="310" height="80" rx="10" fill="#0b1a44"/>
  <text x="360" y="426" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Lower ROI processes</text>
  <text x="360" y="450" font-family="sans-serif" font-size="12" fill="#ff5f7a">Low volume tasks</text>
  <text x="360" y="467" font-family="sans-serif" font-size="12" fill="#ff5f7a">High judgment required</text>
</g>

<g transform="translate(860 150)">
  <rect width="376" height="530" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="16" font-weight="700" fill="#4d86ff">Business Case Steps</text>
  <rect x="30" y="60" width="316" height="60" rx="10" fill="#0b1a44"/>
  <circle cx="52" cy="90" r="14" fill="url(#blue)"/>
  <text x="52" y="95" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">1</text>
  <text x="80" y="84" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Measure baseline</text>
  <text x="80" y="102" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Hours, errors, cycle time</text>
  <rect x="30" y="132" width="316" height="60" rx="10" fill="#0b1a44"/>
  <circle cx="52" cy="162" r="14" fill="url(#blue)"/>
  <text x="52" y="167" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">2</text>
  <text x="80" y="156" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Conservative estimates</text>
  <text x="80" y="174" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Use 50-60% of theoretical max</text>
  <rect x="30" y="204" width="316" height="60" rx="10" fill="#0b1a44"/>
  <circle cx="52" cy="234" r="14" fill="url(#blue)"/>
  <text x="52" y="239" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">3</text>
  <text x="80" y="228" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Full cost accounting</text>
  <text x="80" y="246" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Dev + API + maintenance</text>
  <rect x="30" y="276" width="316" height="60" rx="10" fill="#0b1a44"/>
  <circle cx="52" cy="306" r="14" fill="url(#blue)"/>
  <text x="52" y="311" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">4</text>
  <text x="80" y="300" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Pilot phase first</text>
  <text x="80" y="318" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Validate before full rollout</text>
  <rect x="30" y="348" width="316" height="60" rx="10" fill="#0b1a44"/>
  <circle cx="52" cy="378" r="14" fill="#3ddc97"/>
  <text x="52" y="383" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">5</text>
  <text x="80" y="372" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Define KPIs upfront</text>
  <text x="80" y="390" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Measure actual vs projected</text>
  <rect x="30" y="440" width="316" height="60" rx="16" fill="url(#blue)"/>
  <text x="188" y="475" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>
`);
// --- web3-blockchain-development ---
const web3Blockchain = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">Web3 &amp; Blockchain Development Guide 2026</text>

<g transform="translate(140 150)">
  <rect width="340" height="540" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="170" y="44" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Blockchain Layers</text>
  <rect x="20" y="60" width="300" height="56" rx="10" fill="#0b1a44" stroke="#4d86ff" stroke-width="1"/>
  <text x="170" y="84" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">Layer 1 — Base Chain</text>
  <text x="170" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Ethereum / Solana / Polygon</text>
  <rect x="20" y="128" width="300" height="56" rx="10" fill="#0b1a44" stroke="#3ddc97" stroke-width="1"/>
  <text x="170" y="152" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">Layer 2 — Scaling</text>
  <text x="170" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Arbitrum / Optimism / zkSync</text>
  <rect x="20" y="196" width="300" height="56" rx="10" fill="#0b1a44" stroke="#ffc14d" stroke-width="1"/>
  <text x="170" y="220" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Smart Contracts</text>
  <text x="170" y="240" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Solidity / Rust / Vyper</text>
  <rect x="20" y="264" width="300" height="56" rx="10" fill="#0b1a44" stroke="#4d86ff" stroke-width="1"/>
  <text x="170" y="288" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#4d86ff">dApp Frontend</text>
  <text x="170" y="308" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">React + ethers.js / wagmi</text>
  <rect x="20" y="332" width="300" height="56" rx="10" fill="#0b1a44" stroke="#ff5f7a" stroke-width="1"/>
  <text x="170" y="356" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ff5f7a">Wallet &amp; Auth</text>
  <text x="170" y="376" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">MetaMask / WalletConnect / SIWE</text>
  <rect x="20" y="400" width="300" height="56" rx="10" fill="#0b1a44" stroke="#a78bfa" stroke-width="1"/>
  <text x="170" y="424" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#a78bfa">Indexing &amp; Storage</text>
  <text x="170" y="444" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">The Graph / IPFS / Arweave</text>
  <rect x="20" y="468" width="300" height="40" rx="16" fill="url(#blue)"/>
  <text x="170" y="493" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>

<g transform="translate(510 150)">
  <rect width="726" height="260" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#4d86ff">Smart Contract Code Pattern</text>
  <rect x="20" y="58" width="686" height="180" rx="10" fill="#070f2b"/>
  <text x="40" y="85" font-family="monospace" font-size="13" fill="#38d6ff">// SPDX-License-Identifier: MIT</text>
  <text x="40" y="108" font-family="monospace" font-size="13" fill="#4d86ff">pragma solidity</text>
  <text x="185" y="108" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.8">^0.8.20;</text>
  <text x="40" y="131" font-family="monospace" font-size="13" fill="#ffc14d">contract</text>
  <text x="130" y="131" font-family="monospace" font-size="13" fill="#3ddc97">ByteToken</text>
  <text x="220" y="131" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.6">is ERC20 {</text>
  <text x="60" y="154" font-family="monospace" font-size="13" fill="#4d86ff">mapping</text>
  <text x="130" y="154" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.6">(address =&gt; uint256)</text>
  <text x="320" y="154" font-family="monospace" font-size="13" fill="#ffc14d">public</text>
  <text x="375" y="154" font-family="monospace" font-size="13" fill="#38d6ff">balances;</text>
  <text x="60" y="177" font-family="monospace" font-size="13" fill="#3ddc97">event</text>
  <text x="108" y="177" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.8">Transfer(address indexed from, address to, uint256 val);</text>
  <text x="40" y="220" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.3">}</text>
</g>

<g transform="translate(510 432)">
  <rect width="340" height="258" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#3ddc97">Security Checklist</text>
  <rect x="20" y="58" width="300" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="79" font-family="sans-serif" font-size="13" fill="#3ddc97">Reentrancy guard pattern</text>
  <rect x="20" y="100" width="300" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="121" font-family="sans-serif" font-size="13" fill="#3ddc97">Audit via Slither / MythX</text>
  <rect x="20" y="142" width="300" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="163" font-family="sans-serif" font-size="13" fill="#3ddc97">Multi-sig for admin functions</text>
  <rect x="20" y="184" width="300" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="205" font-family="sans-serif" font-size="13" fill="#3ddc97">Testnet deploy before mainnet</text>
</g>

<g transform="translate(872 432)">
  <rect width="364" height="258" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffc14d">Use Cases</text>
  <rect x="20" y="58" width="324" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="79" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">DeFi Protocols &amp; DEX</text>
  <rect x="20" y="100" width="324" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="121" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">NFT Marketplaces</text>
  <rect x="20" y="142" width="324" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="163" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">DAOs &amp; On-chain Governance</text>
  <rect x="20" y="184" width="324" height="32" rx="8" fill="#0b1a44"/>
  <text x="36" y="205" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Supply Chain &amp; Provenance</text>
</g>
`);

// --- react-performance-optimization ---
const reactPerf = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">React Performance Optimization Guide 2026</text>

<g transform="translate(140 150)">
  <rect width="500" height="540" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Bundle Size Waterfall</text>
  <rect x="20" y="60" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="83" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Initial JS Bundle (before)</text>
  <rect x="250" y="68" width="210" height="20" rx="6" fill="#ff5f7a" fill-opacity="0.8"/>
  <text x="465" y="83" font-family="sans-serif" font-size="12" fill="#ff5f7a">1.8 MB</text>
  <rect x="20" y="106" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="129" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">After Code Splitting</text>
  <rect x="250" y="114" width="130" height="20" rx="6" fill="#ffc14d" fill-opacity="0.8"/>
  <text x="385" y="129" font-family="sans-serif" font-size="12" fill="#ffc14d">1.1 MB</text>
  <rect x="20" y="152" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="175" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">After Tree Shaking</text>
  <rect x="250" y="160" width="86" height="20" rx="6" fill="#3ddc97" fill-opacity="0.8"/>
  <text x="340" y="175" font-family="sans-serif" font-size="12" fill="#3ddc97">720 KB</text>
  <rect x="20" y="198" width="460" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="221" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">After Lazy + Suspense</text>
  <rect x="250" y="206" width="54" height="20" rx="6" fill="url(#blue)"/>
  <text x="308" y="221" font-family="sans-serif" font-size="12" fill="#38d6ff">450 KB</text>
  <text x="30" y="266" font-family="sans-serif" font-size="15" font-weight="700" fill="#4d86ff">Rendering Techniques</text>
  <rect x="20" y="278" width="220" height="60" rx="10" fill="#0b1a44"/>
  <text x="130" y="302" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">React.memo</text>
  <text x="130" y="322" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Skip unchanged re-renders</text>
  <rect x="258" y="278" width="220" height="60" rx="10" fill="#0b1a44"/>
  <text x="368" y="302" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">useMemo / useCallback</text>
  <text x="368" y="322" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Memoize heavy computations</text>
  <rect x="20" y="352" width="220" height="60" rx="10" fill="#0b1a44"/>
  <text x="130" y="376" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Virtualization</text>
  <text x="130" y="396" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">react-window / TanStack</text>
  <rect x="258" y="352" width="220" height="60" rx="10" fill="#0b1a44"/>
  <text x="368" y="376" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#a78bfa">Concurrent Mode</text>
  <text x="368" y="396" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">useTransition / Suspense</text>
  <rect x="20" y="430" width="460" height="60" rx="10" fill="#0b1a44"/>
  <text x="36" y="454" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Server Components (React 19)</text>
  <text x="36" y="474" font-family="sans-serif" font-size="12" fill="#38d6ff">Zero-bundle client JS for static content</text>
</g>

<g transform="translate(668 150)">
  <rect width="568" height="260" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#3ddc97">Profiling with DevTools</text>
  <rect x="20" y="58" width="528" height="48" rx="10" fill="#070f2b"/>
  <text x="40" y="78" font-family="monospace" font-size="13" fill="#ffc14d">import</text>
  <text x="100" y="78" font-family="monospace" font-size="13" fill="#ffffff" fill-opacity="0.8">&#123; Profiler &#125;</text>
  <text x="210" y="78" font-family="monospace" font-size="13" fill="#ffc14d">from</text>
  <text x="248" y="78" font-family="monospace" font-size="13" fill="#3ddc97">'react'</text>
  <text x="40" y="98" font-family="monospace" font-size="12" fill="#ffffff" fill-opacity="0.4">onRender: (id, phase, duration) =&gt; console.log(id, duration)</text>
  <rect x="20" y="118" width="248" height="56" rx="10" fill="#0b1a44"/>
  <text x="144" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">Flame Graph</text>
  <text x="144" y="162" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#38d6ff">Chrome DevTools</text>
  <rect x="280" y="118" width="248" height="56" rx="10" fill="#0b1a44"/>
  <text x="404" y="142" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.6">Component Render Count</text>
  <text x="404" y="162" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="700" fill="#3ddc97">React DevTools</text>
</g>

<g transform="translate(668 432)">
  <rect width="568" height="258" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffc14d">Performance Checklist</text>
  <rect x="20" y="58" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="81" font-family="sans-serif" font-size="13" fill="#3ddc97">Dynamic import() for routes</text>
  <rect x="292" y="58" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="308" y="81" font-family="sans-serif" font-size="13" fill="#3ddc97">Avoid anonymous functions in JSX</text>
  <rect x="20" y="104" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="127" font-family="sans-serif" font-size="13" fill="#3ddc97">Key prop stability in lists</text>
  <rect x="292" y="104" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="308" y="127" font-family="sans-serif" font-size="13" fill="#3ddc97">Debounce expensive handlers</text>
  <rect x="20" y="150" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="173" font-family="sans-serif" font-size="13" fill="#3ddc97">Virtualize long lists (&gt;200 rows)</text>
  <rect x="292" y="150" width="256" height="36" rx="8" fill="#0b1a44"/>
  <text x="308" y="173" font-family="sans-serif" font-size="13" fill="#3ddc97">Use next/image for lazy loading</text>
  <rect x="20" y="196" width="528" height="40" rx="16" fill="url(#blue)"/>
  <text x="284" y="221" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>
`);

// --- multi-tenant-saas-architecture ---
const multiTenantSaas = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">Multi-Tenant SaaS Architecture Guide 2026</text>

<g transform="translate(140 150)">
  <rect width="1096" height="160" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Tenancy Models Comparison</text>
  <rect x="20" y="58" width="340" height="80" rx="12" fill="#0b1a44" stroke="#4d86ff" stroke-width="1"/>
  <text x="190" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#38d6ff">Shared DB + Schema</text>
  <text x="190" y="104" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">tenant_id column per row</text>
  <text x="190" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3ddc97">Low cost / High density</text>
  <rect x="378" y="58" width="340" height="80" rx="12" fill="#0b1a44" stroke="#ffc14d" stroke-width="1"/>
  <text x="548" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffc14d">Shared DB + Schema-per-Tenant</text>
  <text x="548" y="104" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Postgres row-level security</text>
  <text x="548" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffc14d">Balanced isolation</text>
  <rect x="736" y="58" width="340" height="80" rx="12" fill="#0b1a44" stroke="#3ddc97" stroke-width="1"/>
  <text x="906" y="82" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#3ddc97">Database-per-Tenant</text>
  <text x="906" y="104" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Full isolation per customer</text>
  <text x="906" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ff5f7a">Higher cost / Enterprise tier</text>
</g>

<g transform="translate(140 338)">
  <rect width="500" height="352" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#4d86ff">Architecture Layers</text>
  <rect x="20" y="60" width="460" height="44" rx="10" fill="#0b1a44" stroke="#38d6ff" stroke-width="1"/>
  <text x="250" y="86" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">Tenant Resolver Middleware</text>
  <line x1="250" y1="104" x2="250" y2="120" stroke="#334155" stroke-width="2"/>
  <rect x="20" y="120" width="460" height="44" rx="10" fill="#0b1a44" stroke="#ffc14d" stroke-width="1"/>
  <text x="250" y="146" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Auth &amp; RBAC Layer</text>
  <line x1="250" y1="164" x2="250" y2="180" stroke="#334155" stroke-width="2"/>
  <rect x="20" y="180" width="460" height="44" rx="10" fill="#0b1a44" stroke="#3ddc97" stroke-width="1"/>
  <text x="250" y="206" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">Business Logic / API Layer</text>
  <line x1="250" y1="224" x2="250" y2="240" stroke="#334155" stroke-width="2"/>
  <rect x="20" y="240" width="460" height="44" rx="10" fill="#0b1a44" stroke="#4d86ff" stroke-width="1"/>
  <text x="250" y="266" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#4d86ff">Tenant-Scoped Data Access</text>
  <line x1="250" y1="284" x2="250" y2="300" stroke="#334155" stroke-width="2"/>
  <rect x="20" y="300" width="460" height="32" rx="16" fill="url(#blue)"/>
  <text x="250" y="321" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffffff">Isolated Database / Schema</text>
</g>

<g transform="translate(668 338)">
  <rect width="568" height="352" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#3ddc97">Implementation Checklist</text>
  <rect x="20" y="60" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="83" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Subdomain routing: tenant.app.com or app.com/tenant</text>
  <rect x="20" y="106" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="129" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Row-Level Security (RLS) in PostgreSQL</text>
  <rect x="20" y="152" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="175" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Tenant context injected at request boundary</text>
  <rect x="20" y="198" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="221" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Feature flags scoped per subscription plan</text>
  <rect x="20" y="244" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="267" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Usage metering per tenant (Stripe billing)</text>
  <rect x="20" y="292" width="528" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="315" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Separate audit logs per tenant</text>
</g>
`);

// --- ecommerce-email-marketing ---
const emailMarketing = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">eCommerce Email Marketing Strategy 2026</text>

<g transform="translate(140 150)">
  <rect width="440" height="540" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Email Automation Flows</text>
  <rect x="20" y="60" width="400" height="52" rx="10" fill="#0b1a44" stroke="#3ddc97" stroke-width="1"/>
  <circle cx="50" cy="86" r="14" fill="#3ddc97"/>
  <text x="50" y="91" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#070f2b">1</text>
  <text x="76" y="80" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">Welcome Series (3 emails)</text>
  <text x="76" y="100" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Day 0, 3, 7 — Brand + offer intro</text>
  <rect x="20" y="124" width="400" height="52" rx="10" fill="#0b1a44" stroke="#38d6ff" stroke-width="1"/>
  <circle cx="50" cy="150" r="14" fill="#38d6ff"/>
  <text x="50" y="155" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#070f2b">2</text>
  <text x="76" y="144" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">Abandoned Cart Recovery</text>
  <text x="76" y="164" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">1h, 24h, 72h after abandonment</text>
  <rect x="20" y="188" width="400" height="52" rx="10" fill="#0b1a44" stroke="#ffc14d" stroke-width="1"/>
  <circle cx="50" cy="214" r="14" fill="#ffc14d"/>
  <text x="50" y="219" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#070f2b">3</text>
  <text x="76" y="208" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Post-Purchase Sequence</text>
  <text x="76" y="228" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Confirmation, review ask, upsell</text>
  <rect x="20" y="252" width="400" height="52" rx="10" fill="#0b1a44" stroke="#4d86ff" stroke-width="1"/>
  <circle cx="50" cy="278" r="14" fill="url(#blue)"/>
  <text x="50" y="283" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">4</text>
  <text x="76" y="272" font-family="sans-serif" font-size="13" font-weight="700" fill="#4d86ff">Browse Abandonment</text>
  <text x="76" y="292" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Viewed but didn't add to cart</text>
  <rect x="20" y="316" width="400" height="52" rx="10" fill="#0b1a44" stroke="#a78bfa" stroke-width="1"/>
  <circle cx="50" cy="342" r="14" fill="#a78bfa"/>
  <text x="50" y="347" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">5</text>
  <text x="76" y="336" font-family="sans-serif" font-size="13" font-weight="700" fill="#a78bfa">Win-Back Campaign</text>
  <text x="76" y="356" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">90-day inactive subscribers</text>
  <rect x="20" y="380" width="400" height="52" rx="10" fill="#0b1a44" stroke="#ff5f7a" stroke-width="1"/>
  <circle cx="50" cy="406" r="14" fill="#ff5f7a"/>
  <text x="50" y="411" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">6</text>
  <text x="76" y="400" font-family="sans-serif" font-size="13" font-weight="700" fill="#ff5f7a">VIP / Loyalty Rewards</text>
  <text x="76" y="420" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Top 20% revenue customers</text>
  <rect x="20" y="466" width="400" height="40" rx="16" fill="url(#blue)"/>
  <text x="220" y="491" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>

<g transform="translate(608 150)">
  <rect width="628" height="260" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffc14d">Key Email Metrics</text>
  <rect x="20" y="58" width="180" height="80" rx="12" fill="#0b1a44"/>
  <text x="110" y="88" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Open Rate</text>
  <text x="110" y="114" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="800" fill="#3ddc97">35-45%</text>
  <rect x="220" y="58" width="180" height="80" rx="12" fill="#0b1a44"/>
  <text x="310" y="88" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Click Rate</text>
  <text x="310" y="114" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="800" fill="#38d6ff">3-8%</text>
  <rect x="420" y="58" width="188" height="80" rx="12" fill="#0b1a44"/>
  <text x="514" y="88" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.6">Revenue Share</text>
  <text x="514" y="114" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="800" fill="#ffc14d">25-35%</text>
  <text x="314" y="168" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#475569">Typical ranges for automated eCommerce flows — actual results vary by list quality and niche</text>
  <rect x="20" y="180" width="588" height="56" rx="10" fill="#0b1a44"/>
  <text x="36" y="200" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Top platforms: Klaviyo / Mailchimp / Drip / Omnisend</text>
  <text x="36" y="222" font-family="sans-serif" font-size="12" fill="#38d6ff">Klaviyo has deep Shopify integration + predictive analytics</text>
</g>

<g transform="translate(608 432)">
  <rect width="628" height="258" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#4d86ff">Segmentation Strategy</text>
  <rect x="20" y="58" width="290" height="60" rx="10" fill="#0b1a44"/>
  <text x="165" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">RFM Model</text>
  <text x="165" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Recency / Frequency / Monetary</text>
  <rect x="318" y="58" width="290" height="60" rx="10" fill="#0b1a44"/>
  <text x="463" y="82" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">Lifecycle Stage</text>
  <text x="463" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">New / Active / At-risk / Lapsed</text>
  <rect x="20" y="130" width="290" height="60" rx="10" fill="#0b1a44"/>
  <text x="165" y="154" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Category Affinity</text>
  <text x="165" y="174" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">Based on purchase history</text>
  <rect x="318" y="130" width="290" height="60" rx="10" fill="#0b1a44"/>
  <text x="463" y="154" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#a78bfa">AOV Tier</text>
  <text x="463" y="174" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.5">High / Mid / Low spenders</text>
  <rect x="20" y="200" width="588" height="40" rx="16" fill="url(#blue)"/>
  <text x="314" y="225" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>
`);

// --- cloud-cost-optimization ---
const cloudCost = base(688, 380, `
<rect x="140" y="60" width="1096" height="60" rx="14" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
<text x="688" y="100" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="#ffffff">Cloud Cost Optimization Guide 2026 — AWS, GCP &amp; Azure</text>

<g transform="translate(140 150)">
  <rect width="680" height="540" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="url(#cyan)">Cost Reduction Strategies</text>
  <rect x="20" y="58" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="86" r="14" fill="url(#blue)"/>
  <text x="46" y="91" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">1</text>
  <text x="74" y="78" font-family="sans-serif" font-size="13" font-weight="700" fill="#38d6ff">Right-Sizing Compute</text>
  <text x="74" y="98" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Match instance type to actual CPU/RAM utilization metrics</text>
  <rect x="20" y="124" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="152" r="14" fill="url(#blue)"/>
  <text x="46" y="157" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">2</text>
  <text x="74" y="144" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">Reserved Instances / Savings Plans</text>
  <text x="74" y="164" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">1-3 year commitments can reduce On-Demand pricing significantly</text>
  <rect x="20" y="190" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="218" r="14" fill="url(#blue)"/>
  <text x="46" y="223" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">3</text>
  <text x="74" y="210" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffc14d">Spot / Preemptible Instances</text>
  <text x="74" y="230" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">For fault-tolerant batch workloads at fraction of On-Demand cost</text>
  <rect x="20" y="256" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="284" r="14" fill="url(#blue)"/>
  <text x="46" y="289" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">4</text>
  <text x="74" y="276" font-family="sans-serif" font-size="13" font-weight="700" fill="#a78bfa">Storage Lifecycle Policies</text>
  <text x="74" y="296" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Auto-tier S3/GCS objects to cheaper storage classes over time</text>
  <rect x="20" y="322" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="350" r="14" fill="url(#blue)"/>
  <text x="46" y="355" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">5</text>
  <text x="74" y="342" font-family="sans-serif" font-size="13" font-weight="700" fill="#ff5f7a">Serverless for Spiky Workloads</text>
  <text x="74" y="362" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Lambda / Cloud Run — pay only per invocation, no idle cost</text>
  <rect x="20" y="388" width="640" height="56" rx="10" fill="#0b1a44"/>
  <circle cx="46" cy="416" r="14" fill="#3ddc97"/>
  <text x="46" y="421" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#070f2b">6</text>
  <text x="74" y="408" font-family="sans-serif" font-size="13" font-weight="700" fill="#3ddc97">Eliminate Idle / Orphaned Resources</text>
  <text x="74" y="428" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.5">Unattached volumes, unused IPs, old snapshots, zombie VMs</text>
  <rect x="20" y="466" width="640" height="40" rx="16" fill="url(#blue)"/>
  <text x="340" y="491" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffffff">byteoperator.com</text>
</g>

<g transform="translate(848 150)">
  <rect width="388" height="260" rx="18" fill="url(#panel)" stroke="#2a3f7a" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffc14d">Cloud Provider Tools</text>
  <rect x="20" y="58" width="348" height="40" rx="8" fill="#0b1a44"/>
  <text x="36" y="83" font-family="sans-serif" font-size="13" fill="#ff9900">AWS</text>
  <text x="80" y="83" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Cost Explorer + Trusted Advisor</text>
  <rect x="20" y="108" width="348" height="40" rx="8" fill="#0b1a44"/>
  <text x="36" y="133" font-family="sans-serif" font-size="13" fill="#4285f4">GCP</text>
  <text x="80" y="133" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Recommender API + Budget Alerts</text>
  <rect x="20" y="158" width="348" height="40" rx="8" fill="#0b1a44"/>
  <text x="36" y="183" font-family="sans-serif" font-size="13" fill="#0089d6">Azure</text>
  <text x="80" y="183" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.7">Cost Management + Advisor</text>
  <rect x="20" y="208" width="348" height="28" rx="8" fill="#070f2b"/>
  <text x="36" y="226" font-family="sans-serif" font-size="12" fill="#ffffff" fill-opacity="0.4">3rd party: Infracost, CloudHealth, Spot.io</text>
</g>

<g transform="translate(848 432)">
  <rect width="388" height="258" rx="18" fill="url(#panel)" stroke="#3a5bb0" stroke-width="2"/>
  <text x="30" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#3ddc97">FinOps Practices</text>
  <rect x="20" y="58" width="348" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="81" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Tag all resources with team / env / project</text>
  <rect x="20" y="104" width="348" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="127" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Set budget alerts at 50%, 80%, 100%</text>
  <rect x="20" y="150" width="348" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="173" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Weekly cost review per team / service</text>
  <rect x="20" y="196" width="348" height="36" rx="8" fill="#0b1a44"/>
  <text x="36" y="219" font-family="sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.85">Infrastructure as Code for auditability</text>
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
  'shopify-speed-optimization': shopifySpeed,
  'mern-stack-development': mernStack,
  'api-integration-best-practices': apiIntegration,
  'ecommerce-conversion-rate-optimization': ecommerceCro,
  'ai-automation-roi-guide': aiRoi,
  'web3-blockchain-development': web3Blockchain,
  'react-performance-optimization': reactPerf,
  'multi-tenant-saas-architecture': multiTenantSaas,
  'ecommerce-email-marketing-strategy': emailMarketing,
  'cloud-cost-optimization-guide': cloudCost,
};


