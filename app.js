(()=>{
 const root=document.documentElement,base=document.body.dataset.base||'./';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let still=reduced;try{still=reduced||localStorage.getItem('portfolio-motion')==='off'}catch{}
 const motion=document.querySelector('.motion');
 function sync(){root.classList.toggle('still',still);motion.textContent=still?'Motion: off':'Motion: on';motion.setAttribute('aria-pressed',String(still))}sync();
 motion.addEventListener('click',()=>{still=!still;sync();try{localStorage.setItem('portfolio-motion',still?'off':'on')}catch{}});
 const dialog=document.querySelector('.lightbox');let lastFocus;
 document.querySelectorAll('.image-button').forEach(button=>button.addEventListener('click',()=>{lastFocus=button;const img=button.querySelector('img');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal()}));
 dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>lastFocus?.focus());
 const cache=new Map();let manifest;
 async function reconstruct(path,status){
  if(cache.has(path))return cache.get(path);
  status.textContent='Preparing the original file…';
  if(!manifest){const res=await fetch(base+'large-file-parts/manifest.json');if(!res.ok)throw Error('Manifest unavailable');manifest=await res.json()}
  const item=manifest.find(x=>x.path===path);if(!item)throw Error('File not listed');
  let loaded=0;const chunks=[];
  for(const part of item.parts){const res=await fetch(base+part.split('/').map(encodeURIComponent).join('/'));if(!res.ok)throw Error('Part unavailable');const bytes=await res.arrayBuffer();chunks.push(bytes);loaded+=bytes.byteLength;status.textContent=`Preparing file… ${Math.round(loaded/item.size*100)}%`}
  if(loaded!==item.size)throw Error('Incomplete file');
  const blob=new Blob(chunks,{type:path.endsWith('.pdf')?'application/pdf':'video/mp4'});
  if(globalThis.crypto?.subtle){const digest=await crypto.subtle.digest('SHA-256',await blob.arrayBuffer());const hash=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');if(hash!==item.sha256)throw Error('File verification failed')}
  const u=URL.createObjectURL(blob);cache.set(path,u);status.textContent='Original file ready.';return u;
 }
 document.querySelectorAll('a[data-large]').forEach(a=>a.addEventListener('click',async e=>{
  if(cache.has(a.dataset.large))return;
  e.preventDefault();if(a.getAttribute('aria-busy')==='true')return;
  const status=a.parentElement.querySelector('.asset-status');a.setAttribute('aria-busy','true');
  try{const u=await reconstruct(a.dataset.large,status);a.href=u;a.querySelector('span:last-child').textContent='Open PDF ↗';status.textContent='Ready. Select Open PDF to view the document.'}catch{status.textContent='The file could not load. Please try again.'}finally{a.removeAttribute('aria-busy')}
 }));
 document.querySelectorAll('.load-video').forEach(btn=>btn.addEventListener('click',async()=>{
  const parent=btn.parentElement,video=parent.querySelector('video'),status=parent.querySelector('.asset-status');btn.disabled=true;
  try{video.src=await reconstruct(video.dataset.large,status);video.load();btn.hidden=true;status.textContent='Ready to play.';video.focus()}catch{status.textContent='The video could not load. Please try again.';btn.disabled=false}
 }));
})();
