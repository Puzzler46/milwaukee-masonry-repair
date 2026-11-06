'use strict';

// Original project images published by Milwaukee Masonry Repair on its existing Google Site.
// Photo categories are a preliminary editorial grouping; review against the photos before publishing.
// For a reliable production gallery, copy approved originals into /assets/projects and replace URLs.
const ORIGINAL_PROJECT_PHOTOS = [
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vPiLRMyJ2aeCFMk5A9Hh-W5skeWOcoyz3MsqWUFsNt11sk6I0oXt7jkhvTvJHca7-abq3uvY5mOy4Zlh2IvtVgjy2_gPdg5uRX3OYhrpRTCyr6vzHVjMDYM7hMOhcQH20-hE0aPVbCqEd9tqGxQLYTlh1jib9q61KU6Ko2zuDD0EzbHIPj754lABYHIVHwrQu3X1dMpFL63RXQwru99pgLkghfuQE4L0Edocf7hJk=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tiYlqtTvOF94b7iOeJnmsfi2QNC6DphJi1Ar7Bw-BLkpmVdhXUVhFaG6_kB4MvFeRV61TjQLGg1j76r5N7nyPXc61H2gFm_gMUDLKT6-VQPyOio-aL3muPAwjtvO43zg4CLy-fer7KcBHh-8DIrGmSy58p9dcYeGT0tWdbIIrU0O-hDOJcyUASexDzaRiAsI03rLamfBymfVl9TKVOZl81Uo67P49r8Iq-VIYyHK4=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72s6BjLkD4QnEiW4Y6SicLTGlUXN1u6y0yaPWy9wzqJHQrAXVVgwyor9CO450oxkldKTSvZ13XBrQ1JZOxFkah81UaZ855LVBhro2IPB6lzAwLhriB4ayD4V3_vm3SNlwwjCfV5-TTFjVLgdS7CZhXQHv5qxREU_gg-4svym9Yz-j9jVXwK1mlvkolIn9p-D868eGlwgoZiq-1Gf_3SmBwCJ7rUiOvp2j962hLTP=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72uObIJKxjxfcyD8FJTOQO3CFWHaucy3paP_WNv3MizegU72wIwnzM6FhaFNmsiYU46a8OLUKTwRU1Lg5xVsS1UsMTK31u68KgjToRu9RR9rx8WWGVLrT4uv84kq3EgUnG11A8n0PR5IHc0fSoHVqOyN6ezEYBAgmzE7j1Jq6rWkA0bNW88YZBFdPGr5KnoUcYH46PYHsxH9PCa_2mrs8-ViUSWzrU1E6C_pXlDi4KI=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72sUHsM3SM-8n4wTaVsvo2lcrKphbqr6n46HVTorsSMHTS83e3AE7_9s8UXnA5mha5INUQP5LpZkKvbIVL4LQy8FAfSV3aIEfmdQLSiQlQRN5vDtImEEYnuo4BGVjITACQGYlB65oRg29g726ibn7qediT6_6Wx_yQ6gDst4FqGbRpWLoUpTB6hhY9cJex-gm0NYL-11PZdEIKaeYAsl2-RAuJDJutp2hVkNbWhl=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72uj5t6ITjpdSEmLng4wkVv-LQF1JktyOb1jw5KrnWC6SUjdQWwxPNzGjm-41pxZRq7Yv8GHLntGTmRGi8i6pDYAI5QG4Qd5j06DxR8hoMT5TDlKmUV7icEaBcP1DglHCjwaWoPDvLbAepdhHXDT6SFnIuCClU9EU7KPWeXaSAUt-ENyz5RvI4K_J-pxoGXskszq9Mu7N43DaaqXMbcWbrd2DwjwgXqCCp0KzR1bYxY=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72uBXPiY6yyzJVfcp2B4mIwTysQ-8qRsF61e4qY_rsG1ledPd5tPFoT52qzXD3EVJNLKwJ27ODHHtmvEkI-VK9eH3ops7dMJU4fCLN5N7pycURgGOpb0eFV_LFRvtBHDl7M3pwQjsc-jW0GZPLoeLNlHd2xstLokW8qLwqZZw_gIQmVgryUXNd46sRepBOk=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vn6jDozjkHybNuoD3xKMhc1XIig-1U6pPHUQBLw3V_3fFwiq-ZLBl1R81dC5p4_gacIMzdOOnOaseutAh3DWWxFsjmLA0dOOcBTi8127931kwnrAmXNzzZf4HvUexTw-K6ouOktdtzdzhoKTOcQiHwTcritCHHJF4G9yjZPApkAKLSvJUS3yFTsOD0GP7ydj9jVR68NkL1ak5UU5feeP0zqbdQlpWuwAsJsgKH1UM=w1280',
  'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72u1T_mrbOAobrv60RptGjThmaw9Gv9Q5Aj6IpGPru4047RSlxq2Ir6d-Q2EXzoAkC5ad52nubDJPtwhc3FEiW4LR3hJ1oMTvZPRWr7U3kj7cl_Vq6thPBOkPw3YqspXAHEyDsa6xu5QcBMStt8o4-H99NW7c9Whx5PxhkpOo-qq6EGv-WBwOczW8UT7fVTPS0flWUTtmmKQE_cnN9V4GlgbcRVg52_Mx7eS-4cEKG4=w1280'
];
const categoryNames = {brick:'Brick & block',chimney:'Chimney & restoration',stone:'Stone & pavers'};
const photos = ORIGINAL_PROJECT_PHOTOS.map((url, i) => ({url, index:i+1, category:['brick','brick','brick','chimney','chimney','chimney','stone','stone','stone'][i]}));
const $ = selector => document.querySelector(selector);
const galleryTrack = $('#gallery-track');
const galleryFilter = $('#gallery-category');
const galleryCount = $('#gallery-count');
let activeGallery = photos;
let lightboxIndex = -1;
let lastLightboxFocus = null;

function drawGallery() {
  const group=galleryFilter.value;
  activeGallery = group==='all' ? photos : photos.filter(p=>p.category===group);
  galleryTrack.replaceChildren();
  activeGallery.forEach((photo, i)=>{
    const card=document.createElement('button');
    card.className='gallery-card'; card.type='button';
    card.setAttribute('aria-label',`Open project photo ${photo.index}`);
    const fallback=document.createElement('div');fallback.className='gallery-fallback';
    const big=document.createElement('strong');big.textContent='MMR';
    const small=document.createElement('span');small.textContent='Original project photo unavailable';
    fallback.append(big,small);
    const img=document.createElement('img');img.alt=`Milwaukee Masonry Repair project photograph ${photo.index}`;img.loading='lazy';img.decoding='async';
    img.addEventListener('load',()=>{fallback.hidden=true;});
    img.addEventListener('error',()=>{img.hidden=true;fallback.hidden=false;});
    img.src=photo.url;
    const info=document.createElement('div');info.className='gallery-card-info';
    const copy=document.createElement('div');
    const tag=document.createElement('small');tag.textContent=`PROJECT PHOTO / ${String(photo.index).padStart(2,'0')}`;
    const title=document.createElement('strong');title.textContent='Project gallery';
    const plus=document.createElement('b');plus.textContent='+';
    copy.append(tag,title);info.append(copy,plus);
    card.append(fallback,img,info);
    card.addEventListener('click',()=>openLightbox(i));
    galleryTrack.append(card);
  });
  galleryTrack.scrollLeft=0;
  galleryCount.textContent=`${String(activeGallery.length).padStart(2,'0')} PHOTOS`;
}
galleryFilter.addEventListener('change',drawGallery);
$('#gallery-prev').addEventListener('click',()=>galleryTrack.scrollBy({left:-galleryTrack.clientWidth*.75,behavior:'smooth'}));
$('#gallery-next').addEventListener('click',()=>galleryTrack.scrollBy({left:galleryTrack.clientWidth*.75,behavior:'smooth'}));
const lightbox=$('#lightbox');
function openLightbox(index) {
  lightboxIndex=index;lastLightboxFocus=document.activeElement;
  updateLightbox();lightbox.hidden=false;document.body.style.overflow='hidden';$('#lightbox-close').focus();
}
function updateLightbox() {
  const p=activeGallery[lightboxIndex];if(!p)return;
  $('#lightbox-image').src=p.url;
  $('#lightbox-image').alt=`Milwaukee Masonry Repair project photo ${p.index}`;
  $('#lightbox-caption').textContent=`PROJECT PHOTO ${String(p.index).padStart(2,'0')} / ${String(activeGallery.length).padStart(2,'0')}`;
}
function closeLightbox(){lightbox.hidden=true;document.body.style.overflow='';if(lastLightboxFocus)lastLightboxFocus.focus();}
function stepLightbox(dir){lightboxIndex=(lightboxIndex+dir+activeGallery.length)%activeGallery.length;updateLightbox();}
$('#lightbox-close').addEventListener('click',closeLightbox);
$('#lightbox-back').addEventListener('click',()=>stepLightbox(-1));
$('#lightbox-forward').addEventListener('click',()=>stepLightbox(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{
  if(lightbox.hidden)return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowLeft')stepLightbox(-1);
  if(e.key==='ArrowRight')stepLightbox(1);
});
drawGallery();

const menuToggle=$('.menu-toggle');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));$('#nav-links').classList.toggle('is-open',open);});
$('.nav-links').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuToggle.setAttribute('aria-expanded','false');$('#nav-links').classList.remove('is-open');}));
$('#year').textContent=String(new Date().getFullYear());

// Customer project-address verification (not the contractor's business address).
// On-demand search only: do not use Nominatim for keystroke autocomplete.
const street=$('#street'),city=$('#city'),zip=$('#zip');
const verifyButton=$('#verify-address'),verifyStatus=$('#address-status'),results=$('#address-results'),mapLink=$('#map-link');
let matchedAddress=null;
let lastLookupAt=0;
function manualAddress(){return [street.value.trim(),city.value.trim(),'WI',zip.value.trim()].filter(Boolean).join(', ');}
function setStatus(message,kind=''){verifyStatus.textContent=message;verifyStatus.className=`address-status ${kind}`.trim();}
function updateMapLink(){
  if(!street.value.trim()) {mapLink.hidden=true;return;}
  const url=matchedAddress && matchedAddress.lat && matchedAddress.lon
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(matchedAddress.lat+','+matchedAddress.lon)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manualAddress())}`;
  mapLink.href=url;mapLink.hidden=false;
}
function resetVerification(){matchedAddress=null;results.hidden=true;results.replaceChildren();setStatus('Not checked');updateMapLink();}
[street,city,zip].forEach(el=>el.addEventListener('input',resetVerification));
function cleanText(text){return String(text??'').trim();}
function resultIsExact(item){
  const addr=item.address||{};
  const wanted=(street.value.match(/^\s*(\d+[A-Za-z]?)\b/)||[])[1];
  const found=cleanText(addr.house_number);
  const state=cleanText(addr.state).toLowerCase();
  const validState=state==='wisconsin' || state==='wi';
  return Boolean(wanted && found && wanted.toLowerCase()===found.toLowerCase() && validState && (addr.road || addr.pedestrian || addr.residential));
}
function renderCandidates(items){
  results.replaceChildren();results.hidden=false;
  const heading=document.createElement('div');heading.className='results-heading';heading.textContent='CHOOSE THE CORRECT PROJECT ADDRESS';results.append(heading);
  items.forEach(item=>{
    const exact=resultIsExact(item);
    const button=document.createElement('button');button.type='button';
    button.textContent=`${item.display_name}${exact?' — house number matched':' — approximate location only'}`;
    button.addEventListener('click',()=>{
      matchedAddress=exact?{label:item.display_name,lat:item.lat,lon:item.lon}:null;
      results.hidden=true;results.replaceChildren();
      if(exact){setStatus('✓ Project address matched on map','matched');}
      else {setStatus('Approximate result — full address not verified','unmatched');}
      updateMapLink();
    });
    results.append(button);
  });
}
verifyButton.addEventListener('click',async()=>{
  if(!street.value.trim()||!city.value.trim()){
    setStatus('Enter a street address and city first','unmatched');street.focus();return;
  }
  if(Date.now()-lastLookupAt<1100){setStatus('Please wait before searching again','unmatched');return;}
  lastLookupAt=Date.now();
  matchedAddress=null;results.hidden=true;results.replaceChildren();
  verifyButton.disabled=true;setStatus('Checking address map…');updateMapLink();
  const requestAddress=manualAddress();
  const searchURL=new URL('https://nominatim.openstreetmap.org/search');
  searchURL.searchParams.set('q',requestAddress);
  searchURL.searchParams.set('format','jsonv2');
  searchURL.searchParams.set('addressdetails','1');
  searchURL.searchParams.set('limit','5');
  searchURL.searchParams.set('countrycodes','us');
  try{
    const response=await fetch(searchURL.toString(),{headers:{'Accept':'application/json'}});
    if(!response.ok)throw new Error('Map service unavailable');
    const items=await response.json();
    // Ignore an outdated result if the customer changed the address mid-search.
    if(requestAddress!==manualAddress())return;
    if(!Array.isArray(items)||items.length===0){setStatus('No map match found — address not verified','unmatched');}
    else{setStatus('Select the correct result below');renderCandidates(items);}
  }catch(_){setStatus('Map lookup unavailable — address not verified','unmatched');}
  finally{verifyButton.disabled=false;updateMapLink();}
});
updateMapLink();

// This static preview prepares an email. It does not submit to a server or silently collect customer data.
$('#inquiry-form').addEventListener('submit',e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity())return;
  const note=$('#form-note');note.classList.remove('error');
  const typed=manualAddress();
  const addressLine=matchedAddress?matchedAddress.label:typed;
  const status=matchedAddress?'House number matched in OpenStreetMap address data':'NOT VERIFIED — please confirm with customer';
  const mapURL=mapLink.href;
  const msg=[
    'New Milwaukee Masonry Repair project inquiry','',
    `Customer: ${$('#name').value.trim()}`,
    `Phone: ${$('#phone').value.trim()||'Not provided'}`,
    `Email: ${$('#email').value.trim()}`,
    `Requested service: ${$('#service').value}`,'',
    `CUSTOMER PROJECT ADDRESS: ${addressLine}`,
    `Map status: ${status}`,
    `Google Maps link: ${mapURL}`,'',
    'Project details:',
    $('#message').value.trim()||'No additional details provided.'
  ].join('\n');
  const mailto=`mailto:milwaukeemasonryrepair@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${$('#service').value}`)}&body=${encodeURIComponent(msg)}`;
  note.textContent='Your email app should open with your request. Review it, then click Send to deliver it.';
  window.location.href=mailto;
});