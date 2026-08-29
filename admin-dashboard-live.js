/* Shangri-La View Hotel - live admin dashboard data bridge. */
(()=>{
'use strict';
if(window.__svhLiveDashboard)return;
window.__svhLiveDashboard=true;

const FIREBASE_CONFIG={
  apiKey:'AIzaSyDhwIAmuZrY5Xqo6Ql7LDKxrPiklpG5GTE',
  authDomain:'shangrila-booking.firebaseapp.com',
  projectId:'shangrila-booking',
  storageBucket:'shangrila-booking.firebasestorage.app',
  messagingSenderId:'981170210173',
  appId:'1:981170210173:web:4d74cb3f6109fe1c0a3814'
};

const load=(src)=>new Promise((resolve,reject)=>{
  if(document.querySelector(`script[src="${src}"]`))return resolve();
  const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
});
const ensureDb=async()=>{
  await load('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
  await load('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js');
  if(!window.firebase.apps.length)window.firebase.initializeApp(FIREBASE_CONFIG);
  return window.firebase.firestore();
};
const date=(v)=>{const d=new Date(v);return Number.isNaN(d.getTime())?null:d};
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const money=(v)=>'₦'+Number(v||0).toLocaleString('en-NG');
const set=(id,value)=>{const e=document.getElementById(id);if(e)e.textContent=value};

function calculate(bookings,rooms){
  const now=today(),tomorrow=new Date(now);tomorrow.setDate(tomorrow.getDate()+1);
  const active=bookings.filter(b=>b.status!=='cancelled');
  const staying=active.filter(b=>{const ci=date(b.checkIn),co=date(b.checkOut);return ci&&co&&now>=ci&&now<co});
  const upcoming=active.filter(b=>{const ci=date(b.checkIn);return ci&&ci>=tomorrow});
  const arrivals=active.filter(b=>{const ci=date(b.checkIn);return ci&&ci.toDateString()===now.toDateString()});
  const departures=active.filter(b=>{const co=date(b.checkOut);return co&&co.toDateString()===now.toDateString()});
  const occupied=new Set();
  rooms.forEach(r=>{if(String(r.status||'').toLowerCase()==='occupied')occupied.add(String(r.roomNumber||r.number||r.id))});
  staying.forEach(b=>{if(b.roomNumber)occupied.add(String(b.roomNumber))});
  const maintenance=rooms.filter(r=>String(r.status||'').toLowerCase()==='maintenance').length;
  const inactive=rooms.filter(r=>String(r.status||'').toLowerCase()==='inactive').length;
  const available=Math.max(0,rooms.length-occupied.size-maintenance-inactive);
  const revenue=active.reduce((sum,b)=>sum+Number(b.amountPaid||b.totalAmount||b.price||0),0);
  const guests=new Set(active.map(b=>String(b.email||b.name||b.id||'').toLowerCase())).size;
  const occupancy=rooms.length?Math.round(occupied.size/rooms.length*100):0;
  return {active,staying,upcoming,arrivals,departures,occupied,maintenance,available,revenue,guests,occupancy};
}

function render(bookings,rooms){
  const x=calculate(bookings,rooms);
  set('statTotalBookings',x.active.length);
  set('statCheckedIn',x.staying.length);
  set('statPending',x.upcoming.length);
  set('statTotalRooms',rooms.length);
  set('statAvailableRooms',x.available);
  set('statOccupiedRooms',x.occupied.size);
  set('statCheckedOut',x.departures.length);
  set('statReservedRooms',x.staying.length);
  set('statOccupancyRate',x.occupancy+'%');
  set('statRevenue',money(x.revenue));
  set('statGuestProfiles',x.guests);
  set('statRoomMaintenance',x.maintenance);
  set('svhBookingActivity',x.active.length);
  set('svhTodayArrivalCount',x.arrivals.length);
  set('svhUpcomingCount',x.upcoming.length);
  window.SVHLiveDashboardState=x;
  if(typeof renderBookingsManagement==='function')renderBookingsManagement();
  if(typeof renderRecentBookings==='function')renderRecentBookings(bookings);
  if(typeof renderArrivals==='function')renderArrivals(bookings);
  if(typeof renderOccupancyChart==='function')renderOccupancyChart(rooms);
  if(typeof renderBookingsChart==='function')renderBookingsChart(bookings);
}

async function start(){
  if(!/admin/.test(location.pathname.toLowerCase()))return;
  try{
    const db=await ensureDb();
    let bookings=[],rooms=[];
    const refresh=()=>render(bookings,rooms);
    db.collection('bookings').onSnapshot(s=>{
      bookings=s.docs.map(d=>({id:d.id,...d.data()}));
      window.adminBookings=bookings;
      refresh();
    },e=>console.error('Live dashboard booking listener failed:',e));
    db.collection('rooms').onSnapshot(s=>{
      rooms=s.docs.map(d=>({id:d.id,...d.data()}));
      window.adminRooms=rooms;
      refresh();
    },e=>console.error('Live dashboard room listener failed:',e));
    window.SVHRefreshDashboard=refresh;
  }catch(e){console.error('Live dashboard failed to start:',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,700));
else setTimeout(start,700);
})();
