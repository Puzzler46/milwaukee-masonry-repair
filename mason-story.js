'use strict';

// Decorative illustration. No image requests, third-party scripts, or layout shifts.
// A completed brick course follows document scroll progress; reversing scroll
// reverses construction. The worker faces visitors at the bottom of the page.
(function initMasonryStory() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scene = document.createElement('div');
  scene.id = 'masonry-story';
  scene.className = 'masonry-story';
  scene.setAttribute('aria-hidden', 'true');

  scene.innerHTML = [
    '<svg class="masonry-story__art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" focusable="false">',
    '<defs>',
    '  <linearGradient id="storyBrick" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d78158"/><stop offset=".55" stop-color="#a94d38"/><stop offset="1" stop-color="#723e32"/></linearGradient>',
    '  <linearGradient id="storyVest" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8af276"/><stop offset="1" stop-color="#229741"/></linearGradient>',
    '  <linearGradient id="storyHat" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffe879"/><stop offset="1" stop-color="#e6a92b"/></linearGradient>',
    '  <clipPath id="storyWallClip"><rect x="56" y="157" width="418" height="181" rx="1"/></clipPath>',
    '</defs>',
    '<ellipse cx="326" cy="341" rx="293" ry="15" fill="#030907" opacity=".65"/>',
    '<path d="M45 336H484L473 344H48Z" fill="#74847a" stroke="#273e31" stroke-width="3"/>',
    '<g id="story-brick-courses" clip-path="url(#storyWallClip)"></g>',
    '<g class="masonry-story__worker masonry-story__worker--back">',
    '  <g transform="translate(386 49)">',
    '    <path d="M78 224L106 224 100 279 73 279Z" fill="#25465a" stroke="#092028" stroke-width="5" stroke-linejoin="round"/>',
    '    <path d="M117 224L147 224 151 278 123 278Z" fill="#214254" stroke="#092028" stroke-width="5" stroke-linejoin="round"/>',
    '    <path d="M68 268H101L106 283Q103 290 93 290H61Q56 284 63 278Z" fill="#1c272a" stroke="#0b161a" stroke-width="4"/>',
    '    <path d="M123 268H154L166 283Q168 290 156 291H123Q118 285 123 268Z" fill="#1c272a" stroke="#0b161a" stroke-width="4"/>',
    '    <path d="M61 144Q69 117 99 115H124Q156 119 162 149L166 216Q110 239 62 215Z" fill="#224b50" stroke="#092c2c" stroke-width="6"/>',
    '    <path d="M78 125Q100 118 147 126L151 210Q112 230 72 209Z" fill="url(#storyVest)" stroke="#0b6b36" stroke-width="5"/>',
    '    <path d="M74 149L153 145 155 158 74 162Z" fill="#d8f4b9" opacity=".85"/>',
    '    <path d="M77 183L155 178 156 190 75 196Z" fill="#f0efad" opacity=".88"/>',
    '    <path d="M110 128L111 212" stroke="#1c8745" stroke-width="6"/>',
    '    <path d="M155 138Q178 145 180 173L183 211 162 214 151 166Z" fill="#275b5e" stroke="#10363b" stroke-width="5"/>',
    '    <path d="M171 204L186 201 191 218 180 229 166 218Z" fill="#e7ab81" stroke="#8d5941" stroke-width="3"/>',
    '    <g class="masonry-story__laying-arm">',
    '      <path d="M67 140Q49 140 42 163L20 205Q17 215 28 221L44 223 66 179Z" fill="#295d61" stroke="#10363b" stroke-width="6" stroke-linejoin="round"/>',
    '      <path d="M17 201L40 208 43 223 23 232 10 218Z" fill="#e5a87d" stroke="#9b664e" stroke-width="4"/>',
    '      <path d="M19 224L-15 243" stroke="#4a4e4a" stroke-width="6" stroke-linecap="round"/>',
    '      <path d="M-24 238L11 235 -3 251 -31 251Z" fill="#bdcbd0" stroke="#536369" stroke-width="3" stroke-linejoin="round"/>',
    '      <path d="M-16 242L-1 241" stroke="#f5ffff" stroke-width="3" opacity=".75"/>',
    '    </g>',
    '    <path d="M86 119V109H136V121" fill="#cf8d65" stroke="#915a3d" stroke-width="3"/>',
    '    <ellipse cx="110" cy="76" rx="47" ry="48" fill="#835339" stroke="#513c2a" stroke-width="6"/>',
    '    <path d="M61 65Q58 22 99 17Q152 15 159 66L155 80H63Z" fill="url(#storyHat)" stroke="#755118" stroke-width="5"/>',
    '    <path d="M58 67Q109 78 160 67L164 79Q113 91 55 78Z" fill="#f2bc37" stroke="#8c5e1a" stroke-width="4"/>',
    '    <path d="M111 22V67" stroke="#ffec95" stroke-width="10" stroke-linecap="round" opacity=".9"/>',
    '    <path d="M79 96Q107 109 135 96" stroke="#5b3527" stroke-width="5" stroke-linecap="round" fill="none"/>',
    '  </g>',
    '</g>',
    '<g class="masonry-story__worker masonry-story__worker--front">',
    '  <g transform="translate(386 49)">',
    '    <path d="M78 224L106 224 100 279 73 279Z" fill="#25465a" stroke="#092028" stroke-width="5" stroke-linejoin="round"/>',
    '    <path d="M117 224L147 224 151 278 123 278Z" fill="#214254" stroke="#092028" stroke-width="5" stroke-linejoin="round"/>',
    '    <path d="M68 268H101L106 283Q103 290 93 290H61Q56 284 63 278Z" fill="#1c272a" stroke="#0b161a" stroke-width="4"/>',
    '    <path d="M123 268H154L166 283Q168 290 156 291H123Q118 285 123 268Z" fill="#1c272a" stroke="#0b161a" stroke-width="4"/>',
    '    <path d="M61 144Q69 117 99 115H124Q156 119 162 149L166 216Q110 239 62 215Z" fill="#224b50" stroke="#092c2c" stroke-width="6"/>',
    '    <path d="M78 125Q100 118 147 126L151 210Q112 230 72 209Z" fill="url(#storyVest)" stroke="#0b6b36" stroke-width="5"/>',
    '    <path d="M74 149L153 145 155 158 74 162Z" fill="#eef4c7"/>',
    '    <path d="M77 183L155 178 156 190 75 196Z" fill="#eef4c7"/>',
    '    <path d="M109 127L111 214" stroke="#0b7b3d" stroke-width="6"/>',
    '    <rect x="96" y="163" width="30" height="24" rx="3" fill="#1b4d33"/><text x="111" y="180" text-anchor="middle" fill="#d1ffb9" font-size="15" font-weight="900" font-family="sans-serif">M</text>',
    '    <path d="M67 147Q47 151 43 176L42 223 63 228 73 182Z" fill="#285a60" stroke="#10363b" stroke-width="6"/>',
    '    <path d="M41 214L64 212 65 230Q53 245 40 230Z" fill="#e8ac82" stroke="#8d5941" stroke-width="3"/>',
    '    <g class="masonry-story__thumb">',
    '      <path d="M151 143Q176 130 187 150L198 171 183 182 167 164 156 171Z" fill="#275a60" stroke="#10363b" stroke-width="6"/>',
    '      <path d="M184 173Q192 160 194 143L202 126Q211 122 215 131L209 156 220 149Q228 151 225 161L219 192 198 207 176 190Z" fill="#e8ac82" stroke="#925d46" stroke-width="4" stroke-linejoin="round"/>',
    '      <path d="M202 133L204 117Q210 109 216 118L213 139" fill="#e8ac82" stroke="#925d46" stroke-width="4" stroke-linejoin="round"/>',
    '    </g>',
    '    <path d="M88 119V108H137V120" fill="#cf8d65" stroke="#915a3d" stroke-width="3"/>',
    '    <ellipse cx="110" cy="79" rx="46" ry="49" fill="#e5ac82" stroke="#8c573d" stroke-width="6"/>',
    '    <path d="M69 88Q62 23 107 21Q159 21 155 84" fill="#6d4531" opacity=".6"/>',
    '    <path d="M63 65Q60 22 101 17Q152 15 159 66L155 80H63Z" fill="url(#storyHat)" stroke="#755118" stroke-width="5"/>',
    '    <path d="M58 67Q109 78 160 67L164 79Q113 91 55 78Z" fill="#f2bc37" stroke="#8c5e1a" stroke-width="4"/>',
    '    <path d="M111 22V67" stroke="#ffec95" stroke-width="10" stroke-linecap="round" opacity=".9"/>',
    '    <ellipse cx="94" cy="92" rx="5" ry="6" fill="#2f2b27"/><ellipse cx="127" cy="92" rx="5" ry="6" fill="#2f2b27"/>',
    '    <path d="M83 81Q93 75 102 80M119 81Q130 75 139 80" fill="none" stroke="#64432f" stroke-width="4" stroke-linecap="round"/>',
    '    <path d="M91 109Q110 132 132 108" fill="none" stroke="#693728" stroke-width="5" stroke-linecap="round"/>',
    '    <path d="M94 111Q111 124 129 111" fill="none" stroke="#fff8e5" stroke-width="3" stroke-linecap="round"/>',
    '    <circle cx="76" cy="103" r="5" fill="#dc8e6c" opacity=".8"/><circle cx="145" cy="103" r="5" fill="#dc8e6c" opacity=".8"/>',
    '  </g>',
    '</g>',
    '</svg>',
    '<div class="masonry-story__label"><strong>JOB WELL DONE!</strong><span>BUILT ON INTEGRITY.</span></div>'
  ].join('');

  const mount = document.querySelector('.announcement') || document.body.firstChild;
  document.body.insertBefore(scene, mount);

  const svg = scene.querySelector('svg');
  const brickLayer = svg.querySelector('#story-brick-courses');
  const svgNS = 'http://www.w3.org/2000/svg';
  const bricks = [];
  const rows = 6;
  const columns = 11;
  const brickW = 37;
  const brickH = 25;
  const mortar = 3;

  // Bottom course first, staggered joints, clipped neatly at wall edges.
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = 56 + column * (brickW + mortar) - (row % 2 ? 20 : 0);
      const y = 309 - row * (brickH + mortar);
      const brick = document.createElementNS(svgNS, 'g');
      brick.classList.add('masonry-story__brick');
      const face = document.createElementNS(svgNS, 'rect');
      face.setAttribute('x', x);
      face.setAttribute('y', y);
      face.setAttribute('width', brickW);
      face.setAttribute('height', brickH);
      face.setAttribute('rx', '2');
      face.setAttribute('fill', ['#bb664b', '#b75c40', '#a8543d', '#cd7150'][(row * 7 + column * 3) % 4]);
      face.setAttribute('stroke', '#4e392f');
      face.setAttribute('stroke-width', '2.5');
      const shine = document.createElementNS(svgNS, 'path');
      shine.setAttribute('d', 'M' + (x + 4) + ' ' + (y + 5) + 'H' + (x + brickW - 6));
      shine.setAttribute('stroke', '#eaa17b');
      shine.setAttribute('stroke-width', '2');
      shine.setAttribute('stroke-linecap', 'round');
      shine.setAttribute('opacity', '.55');
      brick.append(face, shine);
      brickLayer.append(brick);
      bricks.push(brick);
    }
  }

  let frame = 0;
  let activityTimeout = 0;

  function render() {
    frame = 0;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 1;
    const reduced = reduceMotion.matches;
    const completed = reduced || progress >= 0.984 || (maxScroll - window.scrollY < 8);
    const build = Math.min(1, Math.max(0, (progress - 0.05) / 0.93));
    const visible = reduced || progress > 0.025;
    scene.classList.toggle('is-visible', visible);
    scene.classList.toggle('is-complete', completed);
    scene.classList.toggle('is-reduced-motion', reduced);
    const count = completed ? bricks.length : Math.floor(build * bricks.length);
    bricks.forEach((brick, index) => {
      const placed = index < count;
      if (brick.classList.contains('is-placed') !== placed) {
        brick.classList.toggle('is-placed', placed);
      }
    });
  }

  function requestRender() {
    if (!frame) frame = window.requestAnimationFrame(render);
    if (reduceMotion.matches) return;
    scene.classList.add('is-working');
    clearTimeout(activityTimeout);
    activityTimeout = window.setTimeout(() => scene.classList.remove('is-working'), 220);
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  reduceMotion.addEventListener('change', requestRender);
  requestRender();
})();
