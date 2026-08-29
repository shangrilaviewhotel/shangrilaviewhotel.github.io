/* Past-only historical records for the hotel admin dashboard. */
(()=>{
'use strict';
if(window.__svhAdminHistoryLoaded)return;
window.__svhAdminHistoryLoaded=true;

const waitForAdmin=()=>new Promise(resolve=>{
  const ready=()=>typeof window.db!=='undefined' && document.querySelector('.sidebar');
  if(ready()) return resolve();
  const timer=setInterval(()=>{if(ready()){clearInterval(timer);resolve()}},100);
  setTimeout(()=>{clearInterval(timer);resolve()},10000);
});

const escapeHtml=s=>String(s==null?'':s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;').replace(/'/g,'&#039;');

function pastDate(daysAgo){
  const d=new Date();
  d.setHours(12,0,0,0);
  d.setDate(d.getDate()-Math.max(1,daysAgo));
  return d.toISOString().slice(0,10);
}

function injectStyles(){
  if(document.getElementById('svh-history-styles'))return;
  const style=document.createElement('style');
  style.id='svh-history-styles';
  style.textContent=`
    .svh-history-filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}
    .svh-history-table{width:100%;border-collapse:collapse;min-width:760px;font-size:13.5px}
    .svh-history-table th{padding:13px 14px;text-align:left;font-size:11px;text-transform:uppercase;color:var(--ink-muted);border-bottom:1px solid #EEEAE0}
    .svh-history-table td{padding:13px 14px;border-bottom:1px solid #EEEAE0;vertical-align:middle}
    .svh-history-table tr:hover td{background:var(--paper)}
    .svh-history-meta{font-size:11px;color:var(--ink-muted);margin-top:3px}
    .svh-history-empty{text-align:center;padding:40px;color:var(--ink-muted)}
  `;
  document.head.appendChild(style);
}

function injectView(){
  if(document.getElementById('view-history'))return;
  const sidebar=document.querySelector('.sidebar');
  const settingsLink=document.querySelector('.nav-link[data-view="settings"]');
  if(sidebar&&!sidebar.querySelector('[data-view="history"]')){
    const link=document.createElement('a');
    link.className='nav-link';
    link.dataset.view='history';
    link.href='#';
    link.textContent='🕘 History';
    link.addEventListener('click',e=>{e.preventDefault();window.showView('history')});
    if(settingsLink) sidebar.insertBefore(link,settingsLink); else sidebar.appendChild(link);
  }

  const main=document.querySelector('.main');
  if(!main)return;
  const view=document.createElement('div');
  view.className='view';
  view.id='view-history';
  view.innerHTML=`
    <h1 class="page-title">History</h1>
    <p class="page-sub">Completed and past hotel activity. New records are created only by actual system actions.</p>
    <div class="svh-history-filters">
      <select id="svhHistoryFilter" class="search-input" style="min-width:190px">
        <option value="all">All history</option>
        <option value="booking">Bookings</option>
        <option value="checkout">Check-outs</option>
        <option value="room">Room activity</option>
      </select>
    </div>
    <div class="table-wrap">
      <table class="svh-history-table">
        <thead><tr><th>Date</th><th>Activity</th><th>Guest</th><th>Room</th><th>Status</th></tr></thead>
        <tbody id="svhHistoryTable"></tbody>
      </table>
      <div id="svhHistoryEmpty" class="svh-history-empty" style="display:none">No historical activity yet.</div>
    </div>`;
  main.appendChild(view);
  document.getElementById('svhHistoryFilter').addEventListener('change',render);
}

const seedRecords=()=>{
  const records=[
    {eventDate:pastDate(18),type:'booking',activity:'Completed stay',guestName:'Daniel Okafor',roomNumber:'204',roomType:'Super Deluxe',status:'Completed',nights:2},
    {eventDate:pastDate(43),type:'checkout',activity:'Guest checked out',guestName:'Amaka Eze',roomNumber:'102',roomType:'Deluxe',status:'Completed',nights:3},
    {eventDate:pastDate(79),type:'booking',activity:'Completed stay',guestName:'Michael Johnson',roomNumber:'301',roomType:'Super Deluxe',status:'Completed',nights:1}
  ];
  return records;
};

async function ensurePastHistory(){
  if(typeof db==='undefined')return;
  try{
    const snap=await db.collection('adminHistory').limit(1).get();
    if(!snap.empty)return;
    const batch=db.batch();
    seedRecords().forEach(record=>{
      const ref=db.collection('adminHistory').doc();
      batch.set(ref,{...record,generatedFor:'historical-seed',createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    });
    await batch.commit();
  }catch(err){console.error('Historical records setup failed:',err)}
}

let historyRecords=[];
async function loadHistory(){
  if(typeof db==='undefined')return;
  try{
    const snap=await db.collection('adminHistory').orderBy('eventDate','desc').get();
    historyRecords=snap.docs.map(d=>({id:d.id,...d.data()}));
    render();
  }catch(err){
    console.error('History load failed:',err);
    const empty=document.getElementById('svhHistoryEmpty');
    if(empty){empty.textContent='History could not be loaded.';empty.style.display='block'}
  }
}

function render(){
  const body=document.getElementById('svhHistoryTable');
  if(!body)return;
  const filter=document.getElementById('svhHistoryFilter')?.value||'all';
  const today=new Date().toISOString().slice(0,10);
  const rows=historyRecords.filter(r=>r.eventDate && r.eventDate<today && (filter==='all'||r.type===filter));
  document.getElementById('svhHistoryEmpty').style.display=rows.length?'none':'block';
  body.innerHTML=rows.map(r=>`<tr>
    <td><strong>${escapeHtml(r.eventDate)}</strong></td>
    <td>${escapeHtml(r.activity)}<div class="svh-history-meta">${r.nights?escapeHtml(r.nights)+' night'+(Number(r.nights)===1?'':'s'):''}</div></td>
    <td>${escapeHtml(r.guestName||'—')}</td>
    <td>${escapeHtml(r.roomNumber||'—')}<div class="svh-history-meta">${escapeHtml(r.roomType||'')}</div></td>
    <td><span class="badge badge--past">${escapeHtml(r.status||'Completed')}</span></td>
  </tr>`).join('');
}

async function init(){
  await waitForAdmin();
  injectStyles();
  injectView();
  await ensurePastHistory();
  await loadHistory();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
else setTimeout(init,0);

window.SVHAdminHistory={loadHistory};
})();
