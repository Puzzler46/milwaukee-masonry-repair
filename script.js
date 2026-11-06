'use strict';

// The prior gallery linked to nine Google Sites images whose hotlink URLs cannot
// be relied upon from GitHub Pages. Do not treat arbitrary photo order as proof
// of a project's service category. These are six correctly labeled slots.
// When actual photos are supplied, set image to their local repository path.
const galleryItems = [
  {category:'brick', title:'Brick & block repair', image:null},
  {category:'tuckpointing', title:'Tuckpointing', image:null},
  {category:'chimney', title:'Chimney work', image:null},
  {category:'stone', title:'Stone, sills & lintels', image:null},
  {category:'pavers', title:'Pavers & hardscaping', image:null},
  {category:'cleaning', title:'Cleaning & sealing', image:null}
];
const originalGalleryURL = 'https://www.milwaukeemasonryrepair.com/';
const $ = selector => document.querySelector(selector);
const galleryTrack = $('#gallery-track');
const galleryFilter = $('#gallery-category');
const galleryCount = $('#gallery-count');
let activeGallery = galleryItems;
let lightboxIndex = -1;
let lastLightboxFocus = null;
const lightbox = $('#lightbox');

function makeElement(tag, className, value){
  const el=document.createElement(tag);
  if(className)el.className=className;
  if(value!=null)el.textContent=value;
  return el;
}
function drawGallery(){
  const selected=galleryFilter.value;
  activeGallery=selected==='all'?galleryItems:galleryItems.filter(item=>item.category===selected);
  galleryTrack.replaceChildren();
  activeGallery.forEach((item, i)=>{
    const card=document.createElement('a');
    card.className='gallery-card';
    card.href=originalGalleryURL;
    card.target='_blank';
    card.rel='noopener noreferrer';
    card.setAttribute('aria-label',`View original gallery for ${item.title} (photos not yet uploaded)`);
    const fallback=makeElement('div','gallery-fallback');
    fallback.append(
      makeElement('strong','',String(galleryItems.indexOf(item)+1).padStart(2,'0')),
      makeElement('span','',item.title),
      makeElement('small','','PHOTO FILES PENDING — VIEW ORIGINAL GALLERY ↗')
    );
    card.append(fallback);
    if(item.image){
      const img=document.createElement('img');
      img.alt=`${item.title} project photograph`;
      img.loading='lazy'; img.decoding='async';
      img.addEventListener('load',()=>{fallback.hidden=true;card.removeAttribute('href');card.removeAttribute('target');card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('aria-label',`Open ${item.title} project photograph`);});
      img.addEventListener('error',()=>{img.remove();fallback.hidden=false;});
      img.src=item.image;
      card.prepend(img);
      card.addEventListener('click',e=>{if(img.complete&&img.naturalWidth){e.preventDefault();openLightbox(i);}});
      card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&img.complete&&img.naturalWidth){e.preventDefault();openLightbox(i);}});
    }
    const info=makeElement('div','gallery-card-info');
    const copy=document.createElement('div');
    copy.append(makeElement('small','',`SERVICE CATEGORY / ${String(galleryItems.indexOf(item)+1).padStart(2,'0')}`),makeElement('strong','',item.title));
    info.append(copy,makeElement('b','', '↗'));
    card.append(info);
    galleryTrack.append(card);
  });
  galleryTrack.scrollLeft=0;
  galleryCount.textContent=selected==='all'?'06 CATEGORIES':`01 CATEGORY / ${activeGallery[0]?.title.toUpperCase()||''}`;
}
galleryFilter.addEventListener('change',drawGallery);
$('#gallery-prev').addEventListener('click',()=>galleryTrack.scrollBy({left:-galleryTrack.clientWidth*.75,behavior:'smooth'}));
$('#gallery-next').addEventListener('click',()=>galleryTrack.scrollBy({left:galleryTrack.clientWidth*.75,behavior:'smooth'}));
// An anchor jump stays functional without JavaScript; with JavaScript it also
// applies the service-specific filter before scrolling to the gallery.
document.querySelectorAll('.service-card[data-gallery-category]').forEach(card=>{
  card.addEventListener('click',()=>{
    galleryFilter.value=card.dataset.galleryCategory;
    drawGallery();
  });
});
function openLightbox(index){
  const item=activeGallery[index];
  if(!item?.image)return;
  lightboxIndex=index;lastLightboxFocus=document.activeElement;
  updateLightbox();lightbox.hidden=false;document.body.style.overflow='hidden';$('#lightbox-close').focus();
}
function updateLightbox(){
  const item=activeGallery[lightboxIndex];if(!item?.image)return;
  $('#lightbox-image').src=item.image;
  $('#lightbox-image').alt=`${item.title} project photo`;
  $('#lightbox-caption').textContent=item.title;
}
function closeLightbox(){
  lightbox.hidden=true;document.body.style.overflow='';if(lastLightboxFocus)lastLightboxFocus.focus();
}
function stepLightbox(dir){
  const available=activeGallery.map((item,i)=>item.image?i:-1).filter(i=>i>=0);
  if(!available.length)return;
  const position=Math.max(0,available.indexOf(lightboxIndex));
  lightboxIndex=available[(position+dir+available.length)%available.length];
  updateLightbox();
}
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