'use strict';
/* Milwaukee Masonry Repair scroll-driven masonry mascot.
   All art is inline SVG; there are no remote assets or canvas dependencies.
   When reduced motion is requested, show the completed wall and thumbs-up. */
(() => {
  const stage = document.createElement('div');
  stage.className = 'mmr-mason-scene';
  stage.id = 'mmr-mason-scene';
  stage.setAttribute('aria-hidden', 'true');
  stage.innerHTML = `
    <div class="mmr-mason-heading"><span class="mmr-mason-heading-dot"></span>
      <span class="mmr-mason-heading-text">WALL IN PROGRESS</span><span class="mmr-mason-count">00%</span>
    </div>
    <svg class="mmr-mason-svg" viewBox="0 0 422 316" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="mmr-brick-grade" x1="0" y1="0" x2="0.92" y2="1">
          <stop offset="0" stop-color="#ce8061"/>
          <stop offset="0.44" stop-color="#ae5b43"/>
          <stop offset="1" stop-color="#71392e"/>
        </linearGradient>
        <linearGradient id="mmr-vest-grade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#85f26b"/>
          <stop offset="0.6" stop-color="#37ac42"/>
          <stop offset="1" stop-color="#1c612b"/>
        </linearGradient>
        <linearGradient id="mmr-hat-grade" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#fffca1"/><stop offset="1" stop-color="#f2b925"/>
        </linearGradient>
      </defs>
      <ellipse cx="190" cy="292" rx="168" ry="12" fill="#000" opacity=".42"/>
      <path d="M12 277 H291" fill="none" stroke="#323d35" stroke-width="6" stroke-linecap="round"/>
      <path d="M14 281 H287" fill="none" stroke="#87a988" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      <g id="mmr-brick-layer"></g>
      <g class="mmr-mason-working">
        <!-- Boots and trousers -->
        <path d="M306 232 L331 234 L329 273 L311 277 Z M337 230 L358 230 L359 277 L343 275Z" fill="#36434b" stroke="#141c1a" stroke-width="5" stroke-linejoin="round"/>
        <path d="M309 269 L329 269 L333 281 L303 282 Q298 276 309 269Z M342 268 L360 268 L368 281 L339 282Z" fill="#252a2e" stroke="#080e0a" stroke-width="4"/>
        <!-- Vest / torso viewed from behind -->
        <path d="M306 179 Q330 169 351 184 L359 240 Q332 249 300 239Z" fill="url(#mmr-vest-grade)" stroke="#111c13" stroke-width="5" stroke-linejoin="round"/>
        <path d="M318 176 L325 240 M340 177 L334 240" fill="none" stroke="#dfedcf" stroke-width="7" opacity=".85"/>
        <path d="M304 222 Q332 230 358 221" fill="none" stroke="#deecdd" stroke-width="7" opacity=".8"/>
        <!-- Head facing the brickwork -->
        <path d="M309 148 Q304 167 313 178 Q328 184 341 170 L341 150Z" fill="#e5ac79" stroke="#231b17" stroke-width="4"/>
        <path d="M307 155 Q299 151 304 143" fill="none" stroke="#231b17" stroke-width="4"/>
        <path d="M302 142 Q306 119 326 120 Q342 121 346 144 L349 150 L296 150 Q289 145 302 142Z" fill="url(#mmr-hat-grade)" stroke="#24251a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M305 139 H344" stroke="#f9df68" stroke-width="5"/>
        <!-- Left arm placing a brick -->
        <path d="M309 189 L286 206 L272 198" fill="none" stroke="#293c35" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M282 201 L269 194" fill="none" stroke="#e1a979" stroke-width="13" stroke-linecap="round"/>
        <g class="mmr-mason-trowel">
          <path d="M263 186 L251 175" fill="none" stroke="#8d9b94" stroke-width="5" stroke-linecap="round"/>
          <path d="M247 175 L270 168 L259 189 Z" fill="#e1e8de" stroke="#283a32" stroke-width="3" stroke-linejoin="round"/>
        </g>
        <!-- Right arm / hand -->
        <path d="M347 189 L364 215 L362 231" fill="none" stroke="#2b4830" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="361" cy="232" r="8" fill="#e3a575" stroke="#533528" stroke-width="3"/>
      </g>
      <g class="mmr-mason-finished">
        <path d="M305 229 L326 235 L322 273 L308 273Z M339 234 L356 232 L359 272 L342 273Z" fill="#343f4b" stroke="#141c1b" stroke-width="5" stroke-linejoin="round"/>
        <path d="M305 267 L325 267 L329 281 L299 282 Q300 274 305 267Z M339 266 L361 266 L365 281 L335 281Z" fill="#222930" stroke="#101411" stroke-width="4"/>
        <path d="M300 183 Q331 174 357 186 L361 239 Q331 248 299 239Z" fill="url(#mmr-vest-grade)" stroke="#141e16" stroke-width="5" stroke-linejoin="round"/>
        <path d="M312 182 L313 238 M346 182 L346 239 M299 218 L358 218" stroke="#f2f5df" stroke-width="6" fill="none" opacity=".9"/>
        <!-- Happy face -->
        <path d="M310 144 L310 169 Q332 186 346 165 L344 143Z" fill="#ecad7a" stroke="#39251b" stroke-width="4" stroke-linejoin="round"/>
        <ellipse cx="323" cy="155" rx="2.5" ry="4" fill="#1b251b"/>
        <ellipse cx="338" cy="155" rx="2.5" ry="4" fill="#1b251b"/>
        <path d="M322 165 Q331 174 340 164" fill="none" stroke="#733d2e" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M306 143 Q307 119 327 120 Q347 119 352 144 L360 149 Q328 157 299 148Z" fill="url(#mmr-hat-grade)" stroke="#292a1a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M316 138 H344" stroke="#f9df6d" stroke-width="5"/>
        <!-- Left hand on hip -->
        <path d="M304 190 Q288 210 305 223" fill="none" stroke="#326e40" stroke-width="14" stroke-linecap="round"/>
        <circle cx="306" cy="221" r="7" fill="#e6ab76" stroke="#533a29" stroke-width="3"/>
        <!-- Right arm raised; full thumbs-up silhouette -->
        <path d="M351 192 Q371 191 378 165" fill="none" stroke="#2e6c3a" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M378 166 L373 152 Q371 145 376 143 L380 143 L383 129 Q385 124 391 126 Q394 128 393 135 L392 146 L399 147 Q404 150 401 156 L396 171 Q393 176 384 176 L380 173Z" fill="#e7ac7b" stroke="#493326" stroke-width="3.5" stroke-linejoin="round"/>
      </g>
      <g class="mmr-finish-sparkles" fill="#89ff7d" opacity=".9">
        <path d="M289 69 L292 57 L295 69 L307 72 L295 75 L292 87 L289 75 L277 72Z"/>
        <path d="M384 100 L386 91 L389 100 L398 103 L389 106 L386 115 L384 106 L375 103Z"/>
        <circle cx="303" cy="106" r="3"/><circle cx="405" cy="80" r="2"/>
      </g>
    </svg>
    <div class="mmr-mason-bar"><span class="mmr-mason-bar-fill"></span></div>
  `;
  document.body.insertBefore(stage, document.querySelector('main'));

  // The brick order is bottom-to-top: every scroll increment lays more courses.
  const ns = 'http://www.w3.org/2000/svg';
  const layer = stage.querySelector('#mmr-brick-layer');
  const bricks = [];
  const colors = ['#bd7050','#b96649','#9d513f','#c07455','#ad5944','#a95c48'];
  for (let row = 0; row < 9; row++) {
    const y = 251 - row * 22;
    const positions = row % 2 === 0
      ? Array.from({length: 7}, (_, i) => [16 + i * 38, 36])
      : [[16, 17], ...Array.from({length: 6}, (_, i) => [35 + i * 38, 36]), [263, 17]];
    for (let i = 0; i < positions.length; i++) {
      const [x,w] = positions[i];
      const brick = document.createElementNS(ns,'g');
      brick.classList.add('mmr-brick');
      const rect = document.createElementNS(ns,'rect');
      for (const [key,value] of Object.entries({x,y,width:w,height:20,rx:2,fill:colors[(row*3+i*2)%colors.length],stroke:'#30332f','stroke-width':2})) {
        rect.setAttribute(key,String(value));
      }
      const highlight = document.createElementNS(ns,'path');
      highlight.setAttribute('d',`M${x+3} ${y+4} H${x+w-5}`);
      highlight.setAttribute('stroke','#edb59a');
      highlight.setAttribute('stroke-width','1.6');
      highlight.setAttribute('opacity','.50');
      const scratch = document.createElementNS(ns,'path');
      scratch.setAttribute('d',`M${x+w*.52} ${y+10} l${Math.max(3,w*.14)} 1`);
      scratch.setAttribute('stroke','#5b322b');
      scratch.setAttribute('stroke-width','1.3');
      scratch.setAttribute('opacity','.56');
      brick.append(rect,highlight,scratch);
      brick.style.opacity = '0';
      brick.style.transform = 'translateY(-10px)';
      layer.appendChild(brick);
      bricks.push(brick);
    }
  }

  const label = stage.querySelector('.mmr-mason-heading-text');
  const count = stage.querySelector('.mmr-mason-count');
  const fill = stage.querySelector('.mmr-mason-bar-fill');
  const arm = stage.querySelector('.mmr-mason-trowel');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastCount = 0;
  let scheduled = false;
  function update() {
    scheduled = false;
    const maxScroll = Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const progress = reducedMotion.matches ? 1 : Math.max(0,Math.min(1,window.scrollY/maxScroll));
    const wallProgress = Math.min(1, progress / .89);
    const nextCount = Math.min(bricks.length, Math.floor(wallProgress * bricks.length + .00001));
    if (lastCount !== nextCount) {
      const start = Math.min(lastCount,nextCount);
      const end = Math.max(lastCount,nextCount);
      for (let i=start; i<end; i++) {
        const visible = i < nextCount;
        bricks[i].style.opacity = visible ? '1' : '0';
        bricks[i].style.transform = visible ? 'translateY(0)' : 'translateY(-10px)';
      }
      lastCount = nextCount;
    }
    const complete = progress >= .97;
    stage.classList.toggle('mmr-is-complete',complete);
    label.textContent = complete ? 'WALL COMPLETE' : 'WALL IN PROGRESS';
    count.textContent = complete ? '✓' : `${String(Math.round(wallProgress*100)).padStart(2,'0')}%`;
    fill.style.width = `${Math.round(wallProgress*100)}%`;
    if (!complete && !reducedMotion.matches) {
      const angle = Math.sin(wallProgress * Math.PI * 22) * 12;
      arm.setAttribute('transform', `rotate(${angle.toFixed(1)} 269 193)`);
    }
  }
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  reducedMotion.addEventListener?.('change',onScroll);
  onScroll();
})();