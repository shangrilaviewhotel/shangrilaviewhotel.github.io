/* Complete hotel room inventory for the Admin Room Management screen. */
(()=>{
'use strict';
if(window.__svhRoomInventoryLoaded)return;window.__svhRoomInventoryLoaded=true;
const ROOMS=[
['A1','Standard',18000],['A2','Standard',18000],['A3','Standard',18000],['A4','Standard',18000],['A5','Standard',18000],['A6','Standard',18000],['A7','Standard',18000],['A8','Standard',18000],['A9','Standard',18000],['A10','Standard',18000],['A11','Standard',18000],
['101','Super Deluxe',25000],['102','Deluxe',22000],['103','Super Deluxe',25000],['104','Deluxe',22000],['105','Super Deluxe',25000],['106','Deluxe',22000],['107','Standard',18000],
['201','Deluxe',22000],['202','Deluxe',22000],['203','Deluxe',22000],['204','Super Deluxe',25000],['205','Deluxe',22000],['206','Super Deluxe',25000],['207','Deluxe',22000],['208','Deluxe',22000],
['301','Super Deluxe',25000],['302','Super Deluxe',25000],['303','Super Deluxe',25000],['304','Super Deluxe',25000],['305','Deluxe',22000],['306','Super Deluxe',25000],['307','Deluxe',22000],['308','Super Deluxe',25000],['309','Suites',30000]
];
const getDb=()=>window.db||(window.firebase&&window.firebase.firestore?window.firebase.firestore():null);
async function ensure(){const db=getDb();if(!db)return;try{const snap=await db.collection('rooms').get();const existing=new Set(snap.docs.map(d=>String(d.data().roomNumber||'').trim().toUpperCase()));const batch=db.batch();let added=0;ROOMS.forEach(([roomNumber,type,price])=>{if(existing.has(roomNumber))return;const ref=db.collection('rooms').doc();batch.set(ref,{roomNumber,type,price,discountPrice:null,capacity:2,status:'available',description:'',featured:false,amenities:[],images:[],createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});added++});if(added)await batch.commit();if(typeof window.loadRooms==='function')await window.loadRooms();if(typeof window.loadDashboard==='function')await window.loadDashboard();console.log('Admin room inventory verified:',ROOMS.length,'rooms;',added,'added.')}catch(e){console.error('Admin room inventory error:',e)}}
function makeRoomViewReliable(){if(typeof window.renderRoomsTable!=='function'||window.__svhRoomRenderPatched)return;window.__svhRoomRenderPatched=true;const original=window.renderRoomsTable;window.renderRoomsTable=function(){original();const body=document.getElementById('roomsTable');if(!body)return;const rows=[...body.querySelectorAll('tr')];const hasRoom=ROOMS.some(([n])=>rows.some(r=>r.textContent.includes(n)));if(!hasRoom&&window.rooms&&window.rooms.length===0){ensure()}}}
async function init(){if(!location.pathname.toLowerCase().includes('admin'))return;makeRoomViewReliable();await ensure();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,800));else setTimeout(init,800);
window.SVHRoomInventory={ROOMS,ensure};
})();
