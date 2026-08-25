(() => {
  if (location.pathname.split('/').pop().toLowerCase() !== 'booking.html') return;
  if (document.querySelector('script[data-room-video-booking]')) return;
  const s=document.createElement('script');
  s.src='booking-room-videos.js';
  s.defer=true;
  s.dataset.roomVideoBooking='true';
  document.head.appendChild(s);
})();
