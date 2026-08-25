(() => {
  'use strict';
  if (location.pathname.split('/').pop().toLowerCase() !== 'booking.html') return;
  if (document.getElementById('room-video-booking')) return;

  const videos = [
    { id: 'A1', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM (1).mp4' },
    { id: 'A2', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM (2).mp4' },
    { id: 'A3', file: 'WhatsApp Video 2026-07-29 at 9.53.58 PM.mp4' },
    { id: 'A4', file: 'WhatsApp Video 2026-07-29 at 9.53.59 PM (1).mp4' },
    { id: 'A5', file: 'WhatsApp Video 2026-07-29 at 9.53.59 PM (2).mp4' },
    { id: 'A6', file: 'WhatsApp Video 2026-07-29 at 9.53.59 PM (3).mp4' },
    { id: 'A7', file: 'WhatsApp Video 2026-07-29 at 9.53.59 PM (4).mp4' },
    { id: 'A8', file: 'WhatsApp Video 2026-07-29 at 9.53.59 PM.mp4' },
    { id: 'A9', file: 'WhatsApp Video 2026-07-29 at 9.54.00 PM.mp4' },
    { id: 'A10', file: 'WhatsApp Video 2026-07-29 at 9.55.15 PM (1).mp4' },
    { id: 'A11', file: 'WhatsApp Video 2026-07-29 at 9.55.15 PM.mp4' }
  ];

  const url = file => encodeURI(file);
  const section = document.createElement('section');
  section.id = 'room-video-booking';
  section.setAttribute('aria-labelledby', 'room-video-title');
  section.innerHTML = `
    <style>
      #room-video-booking{padding:0 0 82px;background:#090807;color:#f7f2e9}
      #room-video-booking .rv-wrap{width:min(1180px,92%);margin:0 auto}
      #room-video-booking .rv-head{display:flex;justify-content:space-between;gap:35px;align-items:end;margin-bottom:30px;padding-bottom:22px;border-bottom:1px solid rgba(226,201,149,.18)}
      #room-video-booking .rv-eyebrow{display:flex;align-items:center;gap:12px;color:#c8a96b;font:500 10px/1 'DM Sans',sans-serif;letter-spacing:.25em;text-transform:uppercase;margin-bottom:12px}
      #room-video-booking .rv-eyebrow:before{content:"";width:38px;height:1px;background:#c8a96b}
      #room-video-booking h2{font:500 clamp(32px,4vw,52px)/1.05 'Playfair Display',serif;margin:0}
      #room-video-booking .rv-copy{max-width:430px;color:#b9b0a4;font:13px/1.75 'DM Sans',sans-serif}
      #room-video-booking .rv-grid{display:flex;flex-direction:column;border-top:1px solid rgba(226,201,149,.12)}
      #room-video-booking .rv-card{display:grid;grid-template-columns:minmax(260px,34%) 1fr;min-height:190px;background:linear-gradient(90deg,rgba(20,17,15,.92),rgba(14,12,10,.72));border-bottom:1px solid rgba(226,201,149,.14);transition:background 420ms ease,border-color 420ms ease}
      #room-video-booking .rv-card:hover{background:linear-gradient(90deg,rgba(31,24,20,.98),rgba(18,14,12,.9));border-bottom-color:rgba(200,169,107,.38)}
      #room-video-booking .rv-preview{position:relative;min-height:190px;overflow:hidden;background:#050504;cursor:pointer}
      #room-video-booking video{display:block;width:100%;height:100%;object-fit:cover;transition:transform 650ms cubic-bezier(.22,1,.36,1),filter 420ms ease}
      #room-video-booking .rv-card:hover .rv-preview video{transform:scale(1.035);filter:brightness(.74)}
      #room-video-booking .rv-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.42));pointer-events:none}
      #room-video-booking .rv-play{width:58px;height:58px;border:1px solid rgba(226,201,149,.75);border-radius:50%;display:grid;place-items:center;background:rgba(9,8,7,.62);color:#e2c995;font-size:20px;padding-left:3px;backdrop-filter:blur(5px);transition:transform 420ms ease,background 420ms ease}
      #room-video-booking .rv-card:hover .rv-play{transform:scale(1.08);background:rgba(143,32,51,.72)}
      #room-video-booking .rv-label{position:absolute;left:18px;bottom:15px;font:500 10px/1 'DM Sans',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#fff}
      #room-video-booking .rv-body{display:flex;align-items:center;justify-content:space-between;gap:28px;padding:28px 30px}
      #room-video-booking .rv-kicker{color:#c8a96b;font:500 9px/1 'DM Sans',sans-serif;letter-spacing:.22em;text-transform:uppercase;margin-bottom:9px}
      #room-video-booking .rv-name{font:500 clamp(28px,3vw,38px)/1 'Playfair Display',serif;color:#fff}
      #room-video-booking .rv-sub{margin-top:9px;max-width:430px;color:#9e958a;font:12px/1.65 'DM Sans',sans-serif}
      #room-video-booking .rv-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
      #room-video-booking .rv-book{border:1px solid #c8a96b;background:#8f2033;color:#fff;padding:13px 17px;cursor:pointer;font:600 9px/1 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase;white-space:nowrap;transition:background 300ms ease,transform 300ms ease}
      #room-video-booking .rv-book:hover{background:#651526;transform:translateY(-2px)}
      #room-video-booking .rv-watch{border:1px solid rgba(226,201,149,.35);background:transparent;color:#e2c995;padding:13px 17px;cursor:pointer;font:600 9px/1 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase;white-space:nowrap}
      #room-video-booking .rv-watch:hover{border-color:#c8a96b;background:rgba(200,169,107,.06)}
      #room-video-booking .rv-modal{position:fixed;inset:0;z-index:5000;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(0,0,0,.9);backdrop-filter:blur(12px)}
      #room-video-booking .rv-modal.open{display:flex}
      #room-video-booking .rv-dialog{width:min(1000px,96vw);position:relative;background:#0c0b09;border:1px solid rgba(226,201,149,.25);box-shadow:0 35px 120px rgba(0,0,0,.7)}
      #room-video-booking .rv-dialog video{width:100%;max-height:78vh;object-fit:contain;background:#000}
      #room-video-booking .rv-close{position:absolute;right:10px;top:10px;z-index:2;width:42px;height:42px;border:1px solid rgba(226,201,149,.45);background:rgba(9,8,7,.82);color:#e2c995;font-size:25px;cursor:pointer}
      #room-video-booking .rv-modal-bar{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:13px 16px;background:#14110f}
      #room-video-booking .rv-modal-name{font:500 25px/1 'Playfair Display',serif}
      #room-video-booking .rv-modal-hint{color:#9e958a;font:10px/1.4 'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:.12em}
      #room-video-booking .rv-modal-book{border:1px solid #c8a96b;background:#8f2033;color:#fff;padding:11px 15px;cursor:pointer;font:600 9px/1 'DM Sans',sans-serif;letter-spacing:.13em;text-transform:uppercase}
      @media(max-width:850px){#room-video-booking .rv-card{grid-template-columns:42% 1fr}.rv-head{align-items:start;flex-direction:column}.rv-body{padding:22px!important}}
      @media(max-width:560px){#room-video-booking{padding-bottom:55px}#room-video-booking .rv-card{display:block}.rv-preview{min-height:205px!important}.rv-body{padding:20px!important;display:block!important}.rv-actions{justify-content:flex-start!important;margin-top:18px}.rv-book,.rv-watch{flex:1}.rv-modal-bar{align-items:flex-start!important;flex-direction:column}.rv-modal-book{width:100%}}
      @media(prefers-reduced-motion:reduce){#room-video-booking .rv-card,#room-video-booking video,#room-video-booking .rv-play,#room-video-booking .rv-book{transition:none}}
    </style>
    <div class="rv-wrap">
      <div class="rv-head">
        <div><div class="rv-eyebrow">Preview before you reserve</div><h2 id="room-video-title">Choose your room</h2></div>
        <p class="rv-copy">Watch a preview of each room before completing your reservation. Choose a room code and the booking form will select it for you automatically.</p>
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

  function ensureRoomOptions(){
    const room = document.getElementById('room');
    if(!room) return;
    videos.forEach(item => {
      if(!Array.from(room.options).some(option => option.value === item.id || option.text.trim() === item.id)){
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.id;
        room.appendChild(option);
      }
    });
  }

  function selectRoom(id){
    ensureRoomOptions();
    const room = document.getElementById('room');
    const message = document.getElementById('message');
    if(room){
      const option = Array.from(room.options).find(o => o.value === id || o.text.trim() === id);
      if(option){
        room.value = option.value;
        room.dispatchEvent(new Event('change',{bubbles:true}));
      }
      room.focus();
    }
    if(message){
      const tag = `[Room video choice: ${id}]`;
      if(!message.value.includes(tag)) message.value = message.value ? `${tag}\n${message.value}` : tag;
    }
    document.getElementById('reservation')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(() => room?.focus(), 550);
  }

  ensureRoomOptions();

  videos.forEach(item => {
    const card = document.createElement('article');
    card.className = 'rv-card';
    card.innerHTML = `<div class="rv-preview" role="button" tabindex="0" aria-label="Play room ${item.id} preview"><video src="${url(item.file)}" muted playsinline preload="metadata"></video><div class="rv-overlay"><span class="rv-play">▶</span><span class="rv-label">Room ${item.id}</span></div></div><div class="rv-body"><div><div class="rv-kicker">Room selection</div><div class="rv-name">${item.id}</div><div class="rv-sub">View this room before reserving it. Selecting ${item.id} will automatically choose it in the booking form.</div></div><div class="rv-actions"><button class="rv-watch" type="button">Watch preview</button><button class="rv-book" type="button">Book ${item.id}</button></div></div>`;
    const preview = card.querySelector('.rv-preview');
    const watch = card.querySelector('.rv-watch');
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
    watch.addEventListener('click', open);
    book.addEventListener('click', () => selectRoom(item.id));
    grid.appendChild(card);
  });

  section.querySelector('.rv-close').addEventListener('click', close);
  section.querySelector('.rv-modal-book').addEventListener('click', () => { if(selected) selectRoom(selected); close(); });
  modal.addEventListener('click', e => { if(e.target === modal) close(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape' && modal.classList.contains('open')) close(); });

  const target = document.getElementById('reservation') || document.querySelector('main');
  if(target) target.parentNode.insertBefore(section, target);
})();
