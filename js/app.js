const templates=[
{id:'WD001',name:'Wedding Minimalist Elegant',category:'wedding',desc:'Tampilan bersih dan elegan untuk hari pernikahan.',style:'minimalist'},
{id:'WD002',name:'Wedding Modern Floral',category:'wedding',desc:'Nuansa floral modern untuk cerita dua insan.',style:'floral'},
{id:'AQ001',name:'Aqiqah Soft Minimal',category:'aqiqah',desc:'Lembut dan hangat untuk syukuran aqiqah.',style:'soft'},
{id:'BD001',name:'Birthday Modern Playful',category:'birthday',desc:'Ceria dan modern untuk perayaan ulang tahun.',style:'playful'},
{id:'KH001',name:'Khitanan Modern Classic',category:'khitanan',desc:'Klasik dan rapi untuk acara keluarga.',style:'classic'}
];
const grid=document.getElementById('template-grid');
function renderCards(category='all'){
  grid.innerHTML='';
  templates.filter(t=>category==='all'||t.category===category).forEach(t=>{
    const card=document.createElement('article');card.className='template-card';
    card.innerHTML=`<div class="template-cover"><div class="cover-inner"><small>${t.id}</small><strong>${t.category==='wedding'?'The Wedding':t.category==='aqiqah'?'Aqiqah Celebration':t.category==='birthday'?'Happy Birthday':'Undangan Khitanan'}</strong><small>${t.style.toUpperCase()}</small></div></div><div class="template-info"><h3>${t.name}</h3><p>${t.desc}</p><div class="card-actions"><span class="status">Pratinjau konsep</span><a class="text-link" href="order/?template=${t.id}">Pilih →</a></div></div>`;
    grid.appendChild(card);
  });
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderCards(btn.dataset.category);
}));
document.getElementById('year').textContent=new Date().getFullYear();
renderCards();
