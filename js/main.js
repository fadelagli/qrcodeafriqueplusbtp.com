(function(){
const C=window.SITE_CONFIG,$=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ===== CARROUSEL VIDEO 3D ===== */
const rail=$('#rail'),V=C.videos,N=V.length,dotsEl=$('#dots');
let cur=0,muted=true,sx=null;
const slides=V.map((v,i)=>{
  const s=document.createElement('div');s.className='slide';
  if(v.poster)s.style.backgroundImage=`url(${v.poster})`;
  s.innerHTML=`<video muted playsinline preload="${i?'metadata':'auto'}" ${v.poster?`poster="${v.poster}"`:''} ${N==1?'loop':''}><source src="${v.src}" type="video/mp4">${v.webm?`<source src="${v.webm}" type="video/webm">`:''}</video><div class="cap"><b>${v.title||''}</b><span>${v.caption||''}</span></div>`;
  s.querySelector('video').addEventListener('ended',()=>N>1&&go(cur+1));
  s.addEventListener('click',()=>{if(!s.classList.contains('on'))go(i)});
  rail.appendChild(s);
  const d=document.createElement('i');d.onclick=()=>go(i);dotsEl.appendChild(d);
  return s;
});
function go(i){cur=(i+N)%N;paint()}
 function paint(){
  slides.forEach((s,i)=>{
    let d=i-cur;
    if(d>N/2) d-=N; 
    if(d<-N/2) d+=N; 
    const a=Math.abs(d), v=s.querySelector('video');
    
    // L'animation : la vidéo glisse de 100% de la largeur, recule un peu en 3D
    s.style.transform = `translateX(${d * 100}%) translateZ(${-a * 100}px) rotateY(${-d * 15}deg)`;
    
    s.style.opacity = a>1 ? 0 : 1; // On ne voit que la vidéo centrale et un peu les côtés
    s.style.zIndex = 10-a;
    s.classList.toggle('on',d===0);
    
    if(d===0){
      v.muted=muted;
      v.play().catch(()=>{});
    }else{
      v.pause();
    }
  });
  [...dotsEl.children].forEach((d,i)=>d.classList.toggle('on',i===cur));
}
$('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
$('#snd').onclick=e=>{muted=!muted;slides[cur].querySelector('video').muted=muted;e.target.textContent=muted?'🔇':'🔊'};
const stage=$('#stage');
stage.addEventListener('pointerdown',e=>sx=e.clientX);
addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>50)go(cur+(e.clientX<sx?1:-1));sx=null});
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
new IntersectionObserver(es=>{const v=slides[cur].querySelector('video');es[0].isIntersecting?v.play().catch(()=>{}):v.pause()},{threshold:.2}).observe($('#hero'));
paint();

/* ===== CARROUSEL CATALOGUES ===== */
const track=$('#track');
C.catalogues.forEach(c=>{
  const a=document.createElement('a');a.className='card';a.target='_blank';a.rel='noopener';
  a.href=`catalogue.html?f=${encodeURIComponent(c.pdf)}&t=${encodeURIComponent(c.title)}`;
  const imgs=[c.cover,...(c.photos||[])];
  a.innerHTML=imgs.map((u,i)=>`<img class="${i?'':'on'}" src="${u}" alt="${i?'':c.title}" loading="lazy" decoding="async" onerror="this.remove()">`).join('')+`<div class="ov"><small>${c.tag||'Catalogue'}</small><h3>${c.title}</h3><span class="go">Ouvrir le catalogue →</span></div>`;
  if(imgs.length>1&&!RM){let k=0;setInterval(()=>{const im=a.querySelectorAll('img');if(im.length<2)return;im[k%im.length].classList.remove('on');k++;im[k%im.length].classList.add('on')},3200)}
  a.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;a.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});
  a.addEventListener('pointerleave',()=>a.style.transform='');
  track.appendChild(a);
});
const step=()=>(track.firstElementChild?.offsetWidth||320)+18;
$('#cprev').onclick=()=>track.scrollBy({left:-step(),behavior:'smooth'});
$('#cnext').onclick=()=>track.scrollBy({left:step(),behavior:'smooth'});
if(!RM){let t=setInterval(()=>{track.scrollLeft+track.clientWidth>=track.scrollWidth-4?track.scrollTo({left:0,behavior:'smooth'}):track.scrollBy({left:step(),behavior:'smooth'})},5000);
  ['pointerdown','wheel','mouseenter'].forEach(ev=>track.addEventListener(ev,()=>clearInterval(t),{once:true}))}

/* ===== COMPTEURS (animent seulement si data-count est un nombre) ===== */
const io=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;io.unobserve(en.target);
  const n=parseInt(en.target.dataset.count,10);if(isNaN(n))return;let s=null;
  (function f(t){s=s||t;const p=Math.min((t-s)/1400,1);en.target.textContent=Math.round(n*p)+(p===1?'+':'');if(p<1)requestAnimationFrame(f)})(performance.now());
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(e=>io.observe(e));

/* ===== CARROUSEL GALERIE TEMPS FORTS ===== */
const hTrack = document.getElementById('htrack');
const hPrev = document.getElementById('hprev');
const hNext = document.getElementById('hnext');

if(hTrack && hPrev && hNext) {
    // Calcule la distance à faire défiler (la largeur du groupe + l'espace)
    const getScrollAmount = () => {
        const firstGroup = hTrack.querySelector('.h-group');
        return firstGroup ? firstGroup.offsetWidth + 20 : 0;
    };

    hNext.addEventListener('click', () => {
        hTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    hPrev.addEventListener('click', () => {
        hTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
}
})();
