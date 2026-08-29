/* Live booking and room synchronisation for the admin dashboard. */
(()=>{
'use strict';
if(window.__svhAdminBookingSync)return;window.__svhAdminBookingSync=true;
const loadRoomInventory=()=>new Promise((resolve,reject)=>{if(!location.pathname.toLowerCase().includes('admin'))return resolve();if(window.SVHRoomInventory)return resolve();const s=document.createElement('script');s.src='admin-room-inventory.js';s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const loadAdminHistory=()=>new Promise((resolve,reject)=>{if(!location.pathname.toLowerCase().includes('admin'))return resolve();if(window.SVHAdminHistory)return resolve();const s=document.createElement('script');s.src='admin-history.js';s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const loadLiveDashboard=()=>new Promise((resolve,reject)=>{if(!location.pathname.toLowerCase().includes('admin'))return resolve();if(window.__svhLiveDashboard)return resolve();const s=document.createElement('script');s.src='admin-dashboard-live.js';s.defer=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const start=async()=>{
  if(typeof firebase==='undefined'||typeof db==='undefined'||!location.pathname.toLowerCase().includes('admin'))return;
  try{await loadRoomInventory();}catch(e){console.error('Room inventory loader failed:',e)}
  try{await loadAdminHistory();}catch(e){console.error('Admin history loader failed:',e)}
  try{await loadLiveDashboard();}catch(e){console.error('Live dashboard loader failed:',e)}
  let first=true;
  db.collection('bookings').onSnapshot(snap=>{
    window.adminBookings=snap.docs.map(d=>({id:d.id,...d.data()}));
    if(typeof renderBookingsManagement==='function')renderBookingsManagement();
    if(typeof loadDashboard==='function')loadDashboard();
    if(typeof window.SVHRefreshDashboard==='function')window.SVHRefreshDashboard();
    if(window.SVHAdminHistory&&typeof window.SVHAdminHistory.loadHistory==='function')window.SVHAdminHistory.loadHistory();
    if(first){first=false;return}
    if(typeof toast==='function')toast('Booking data changed. Dashboard updated.');
  },err=>console.error('Live booking sync failed:',err));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,500));else setTimeout(start,500);
})();
