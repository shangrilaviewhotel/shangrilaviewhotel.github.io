/* Live booking synchronisation for the admin dashboard. */
(()=>{
'use strict';
if(window.__svhAdminBookingSync)return;window.__svhAdminBookingSync=true;
const start=()=>{
  if(typeof firebase==='undefined'||typeof db==='undefined'||!location.pathname.toLowerCase().includes('admin'))return;
  let first=true;
  db.collection('bookings').onSnapshot(snap=>{
    window.adminBookings=snap.docs.map(d=>({id:d.id,...d.data()}));
    if(typeof renderBookingsManagement==='function')renderBookingsManagement();
    if(typeof loadDashboard==='function')loadDashboard();
    if(first){first=false;return}
    if(typeof toast==='function')toast('New booking received. Dashboard updated.');
  },err=>console.error('Live booking sync failed:',err));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,500));else setTimeout(start,500);
})();
