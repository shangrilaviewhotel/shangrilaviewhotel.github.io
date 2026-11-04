/* Shangri-La View Hotel social links — floating dock and contact links. */
(() => {
  'use strict';
  if (window.__svhSocialLinksLoaded) return;
  window.__svhSocialLinksLoaded = true;
  const links = [
    {name:'Facebook',short:'f',url:'https://www.facebook.com/profile.php?id=61589839160031'},
    {name:'TikTok',short:'♪',url:'https://vm.tiktok.com/ZS9ycHDWHU7u6-f7dC7/'},
    {name:'Instagram',short:'◎',url:'https://www.instagram.com/shangri_la_view_hotel/'},
    {name:'Threads',short:'@',url:'https://www.threads.com/@shangri_la_view_hotel'}
  ];
  const style=document.createElement('style');
  style.textContent='.svh-social-dock{position:fixed;left:24px;right:auto;top:auto;bottom:90px;transform:none;z-index:3900;display:flex;flex-direction:row;gap:9px}.svh-social-dock a{width:43px;height:43px;border:1px solid rgba(212,175,55,.55);border-radius:50%;display:grid;place-items:center;background:rgba(13,9,10,.94);color:#f3e8d0;text-decoration:none;font:700 20px Arial,sans-serif;box-shadow:0 7px 22px rgba(0,0,0,.3);transition:transform .2s ease,background .2s ease}.svh-social-dock a:hover{transform:translateY(-4px);background:#6e1b2a}.svh-social-contact{margin-top:26px;padding-top:20px;border-top:1px solid rgba(199,168,107,.25)}.svh-social-contact .svh-social-heading{display:block;color:#c7a86b;font-size:9px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:13px}.svh-social-contact .svh-social-list{display:flex;flex-wrap:wrap;gap:10px}.svh-social-contact a{display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid rgba(199,168,107,.3);color:#eee8df;text-decoration:none;font-size:12px}.svh-social-contact a:hover{background:#241316;border-color:#c7a86b}.svh-social-contact .svh-social-mark{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#241316;color:#d4af37;font-weight:700}@media(max-width:600px){.svh-social-dock{left:16px;right:auto;bottom:82px;gap:7px}.svh-social-dock a{width:36px;height:36px;font-size:17px}.svh-social-contact .svh-social-list{gap:7px}.svh-social-contact a{padding:8px 9px;font-size:11px}}@media(prefers-reduced-motion:reduce){.svh-social-dock a{transition:none}}';
  document.head.appendChild(style);
  const dock=document.createElement('nav');dock.className='svh-social-dock';dock.setAttribute('aria-label','Follow Shangri-La View Hotel');
  links.forEach(item=>{const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Visit our '+item.name+' page');a.title=item.name;a.textContent=item.short;dock.appendChild(a)});
  document.body.appendChild(dock);
  document.querySelectorAll('.contact-details').forEach(section=>{
    if(section.querySelector('.svh-social-contact'))return;
    const group=document.createElement('div');group.className='svh-social-contact';
    const heading=document.createElement('span');heading.className='svh-social-heading';heading.textContent='Connect with us';
    const list=document.createElement('div');list.className='svh-social-list';
    links.forEach(item=>{const a=document.createElement('a');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';const mark=document.createElement('span');mark.className='svh-social-mark';mark.textContent=item.short;a.append(mark,document.createTextNode(item.name));list.appendChild(a)});
    group.append(heading,list);section.appendChild(group);
  });
})();