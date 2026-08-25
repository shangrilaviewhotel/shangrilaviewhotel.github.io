(() => {
  'use strict';
  if (location.pathname.split('/').pop().toLowerCase() !== 'booking.html') return;
  if (document.getElementById('booking-now-float')) return;

  const addButton = () => {
    if (document.getElementById('booking-now-float')) return;
    const whatsapp = document.querySelector('.whatsapp-float');
    const button = document.createElement('button');
    button.id = 'booking-now-float';
    button.type = 'button';
    button.textContent = 'BOOK NOW';
    button.setAttribute('aria-label', 'Scroll to the booking form');
    button.innerHTML = '<span aria-hidden="true">◆</span> BOOK NOW';

    const style = document.createElement('style');
    style.textContent = `
      #booking-now-float{
        position:fixed;
        left:92px;
        bottom:24px;
        z-index:1100;
        height:54px;
        min-width:116px;
        padding:0 18px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        border:1px solid #c8a96b;
        border-radius:2px;
        background:#8f2033;
        color:#fff;
        box-shadow:0 15px 35px rgba(0,0,0,.38);
        font:600 10px/1 'DM Sans',sans-serif;
        letter-spacing:.16em;
        cursor:pointer;
        transition:transform 420ms cubic-bezier(.22,1,.36,1),background 300ms ease,box-shadow 300ms ease;
      }
      #booking-now-float span{color:#e2c995;font-size:8px}
      #booking-now-float:hover{background:#651526;transform:translateY(-4px);box-shadow:0 20px 42px rgba(0,0,0,.48)}
      #booking-now-float:focus-visible{outline:2px solid #e2c995;outline-offset:4px}
      @media(max-width:560px){
        #booking-now-float{left:76px;bottom:18px;height:50px;min-width:102px;padding:0 13px;font-size:9px;letter-spacing:.12em}
      }
      @media(prefers-reduced-motion:reduce){#booking-now-float{transition:none}}
    `;
    document.head.appendChild(style);

    const scrollToBooking = () => {
      const target = document.getElementById('reservation') || document.querySelector('.form-box') || document.querySelector('.booking-section');
      if (!target) return;
      target.scrollIntoView({ behavior:'smooth', block:'start' });
      setTimeout(() => document.getElementById('room')?.focus(), 650);
    };

    button.addEventListener('click', scrollToBooking);
    document.body.appendChild(button);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButton, { once:true });
  else addButton();
})();
