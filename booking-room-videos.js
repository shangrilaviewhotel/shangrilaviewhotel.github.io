(() => {
  'use strict';
  if (location.pathname.split('/').pop().toLowerCase() !== 'booking.html') return;
  if (document.getElementById('room-video-booking')) return;

  const videos = [
    { id: 'A1', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM (1).mp4' },
    { id: 'A2', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM (2).mp4' },
    { id: 'A3', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM.mp4' }
  ];

  const url = file => encodeURI(file);
  const section = document.createElement('section');
  section.id = 'room-video-booking';
  section.setAttribute('aria-labelledby', 'room-video-title');
  section.innerHTML = `
    <style>
      #room-video-booking{padding:0 0 78px;background:#090807;color:#f7f2e9}
      #room-video-booking .rv-wrap{width:min(1180px,92%);margin:0 auto}
      #room-video-booking .rv-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:28px}
      #room-video-booking .rv-eyebrow{display:flex;align-items:center;gap:12px;color:#c8a96b;font:500 10px/1 'DM Sans',sans-serif;letter-spacing:.25em;text-transform:uppercase;margin-bottom:12px}
      #room-video-booking .rv-eyebrow:before{content:"";width:38px;height:1px;background:#c8a96b}
      #room-video-booking h2{font:500 clamp(32px,4vw,52px)/1.05 'Playfair Display',serif;margin:0}
      #room-video-booking .rv-copy{max-width:430px;color:#b9b0a4;font:13px/1.75 'DM Sans',sans-serif}
      #room-video-booking .rv-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
      #room-video-booking .rv-card{position:relative;overflow:hidden;background:#14110f;border:1px solid rgba(226,201,149,.18);box-shadow:0 20px 55px rgba(0,0,0,.25);transition:transform 420ms cubic-bezier(.22,1,.36,1),border-color 420ms ease}
      #room-video-booking .rv-card:hover{transform:translateY(-5px);border-color:rgba(200,169,107,.62)}
      #room-video-booking .rv-preview{position:relative;aspect-ratio:16/10;overflow:hidden;background:#050504;cursor:pointer}
      #room-video-booking video{display:block;width:100%;height:100%;object-fit:cover;transition:transform 650ms cubic-bezier(.22,1,.36,1),filter 420ms ease}
      #room-video-booking .rv-card:hover video{transform:scale(1.04);filter:brightness(.78)}
      #room-video-booking .rv-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,transparent 35%,rgba(0,0,0,.7));pointer-events:none}
      #room-video-booking .rv-play{width:58px;height:58px;border:1px solid rgba(226,201,149,.75);border-radius:50%;display:grid;place-items:center;background:rgba(9,8,7,.58);color:#e2c995;font-size:20px;padding-left:3px;backdrop-filter:blur(5px)}
      #room-video-booking .rv-label{position:absolute;left:16px;bottom:14px;font:500 12px/1 'DM Sans',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#fff}
      #room-video-booking .rv-body{padding:17px 17px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
      #room-video-booking .rv-name{font:500 25px/1 'Playfair Display',serif;color:#fff}
      #room-video-booking .rv-sub{margin-top:6px;color:#9e958a;font:10px/1.5 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase}
      #room-video-booking .rv-book{border:1px solid #c8a96b;background:#8f2033;color:#fff;padding:11px 13px;cursor:pointer;font:600 9px/1 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase;white-space:nowrap}
      #room-video-booking .rv-book:hover{background:#651526}
      #room-video-booking .rv-modal{position:fixed;inset:0;z-index:5000;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(0,0,0,.9);backdrop-filter:blur(12px)}
      #room-video-booking .rv-modal.open{display:flex}
      #room-video-booking .rv-dialog{width:min(1000px,96vw);position:relative;background:#0c0b09;border:1px solid rgba(226,201,149,.25);box-shadow:0 35px 120px rgba(0,0,0,.7)}
      #room-video-booking .rv-dialog video{width:100%;max-height:78vh;object-fit:contain;background:#000}
      #room-video-booking .rv-close{position:absolute;right:10px;top:10px;z-index:2;width:42px;height:42px;border:1px solid rgba(226,201,149,.45);background:rgba(9,8,7,.82);color:#e2c995;font-size:25px;cursor:pointer}
      #room-video-booking .rv-modal-bar{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:13px 16px;background:#14110f}
      #room-video-booking .rv-modal-name{font:500 25px/1 'Playfair Display',serif}
      #room-video-booking .rv-modal-hint{color:#9e958a;font:10px/1.4 'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:.12em}
      #room-video-booking .rv-modal-book{border:1px solid #c8a96b;background:#8f2033;color:#fff;padding:11px 15px;cursor:pointer;font:600 9px/1 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase}
      @media(max-width:850px){#room-video-booking .rv-grid{grid-template-columns:1fr 1fr}.rv-head{align-items:start;flex-direction:column}}
      @media(max-width:560px){#room-video-booking{padding-bottom:55px}#room-video-booking .rv-grid{grid-template-columns:1fr}#room-video-booking .rv-head{margin-bottom:20px}#room-video-booking .rv-body{padding:15px}.rv-modal-bar{align-items:flex-start!important;flex-direction:column}.rv-modal-book{width:100%}}
      @media(prefers-reduced-motion:reduce){#room-video-booking .rv-card,#room-video-booking video{transition:none}}
    </style>
    <div class="rv-wrap">
      <div class="rv-head">
        <div><div class="rv-eyebrow">Preview before you reserve</div><h2 id="room-video-title">Choose your room</h2></div>
        <p class="rv-copy">Watch a preview of each available room before completing the normal reservation form. Select the room code so the hotel can identify your choice.</p>
      </div>
      <div class="rv-grid"></div>
    </div>
    <div class="rv-modal" role="dialog" aria-modal="true" aria-labelledby="rv-modal-name">
      <div class="rv-dialog">
        <button class="rv-close" type="button" aria-label="Close room video">&times;</button>
        <video class="rv-modal-video" controls playsinline preload="metadata"></video>
        <div class="rv-modal-bar"><div><div class="rv-modal-name" id="rv-modal-name">A1</div><div class="rv-modal-hint">Room preview • press escape to return</div></div><button class="rv-modal-book" type="button">Book this room</button></div>
      </div>
    </div>`;

  const grid = section.querySelector('.rv-grid');
  const modal = section.querySelector('.rv-modal');
  const modalVideo = section.querySelector('.rv-modal-video');
  const modalName = section.querySelector('.rv-modal-name');
  const close = () => { modal.classList.remove('open'); modalVideo.pause(); modalVideo.removeAttribute('src'); modalVideo.load(); document.body.style.overflow=''; };
  let selected = null;

  videos.forEach(item => {
    const card = document.createElement('article');
    card.className = 'rv-card';
    card.innerHTML = `<div class="rv-preview" role="button" tabindex="0" aria-label="Play room ${item.id} preview"><video src="${url(item.file)}" muted playsinline preload="metadata"></video><div class="rv-overlay"><span class="rv-play">▶</span><span class="rv-label">Room ${item.id}</span></div></div><div class="rv-body"><div><div class="rv-name">${item.id}</div><div class="rv-sub">Room preview</div></div><button class="rv-book" type="button">Book ${item.id}</button></div>`;
    const preview = card.querySelector('.rv-preview');
    const book = card.querySelector('.rv-book');
    const open = () => {
      selected = item.id;
      modalName.textContent = item.id;
      modalVideo.src = url(item.file);
      modal.classList.add('open');
      document.body.style.overflow='hidden';
      modalVideo.play().catch(()=>{});
    };
    preview.addEventListener('click', open);
    preview.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();open();} });
    book.addEventListener('click', () => selectRoom(item.id));
    grid.appendChild(card);
  });

  function selectRoom(id){
    const room = document.getElementById('room');
    const message = document.getElementById('message');
    if(message){ const tag = `[Room video choice: ${id}]`; if(!message.value.includes(tag)) message.value = message.value ? `${tag}\n${message.value}` : tag; }
    if(room){ room.focus(); room.scrollIntoView({behavior:'smooth',block:'center'}); }
    document.getElementById('reservation')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  section.querySelector('.rv-close').addEventListener('click', close);
  section.querySelector('.rv-modal-book').addEventListener('click', () => { if(selected) selectRoom(selected); close(); });
  modal.addEventListener('click', e => { if(e.target === modal) close(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape' && modal.classList.contains('open')) close(); });

  const target = document.getElementById('reservation') || document.querySelector('main');
  if(target) target.parentNode.insertBefore(section, target);
})();
