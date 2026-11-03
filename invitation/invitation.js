async function renderInvitation(){
 const root=document.getElementById('invitation-root'),msg=document.getElementById('invitation-message');const slug=location.pathname.split('/').filter(Boolean).pop();
 if(!window.supabaseClient){msg.textContent='Undangan belum dapat dimuat karena Supabase belum dikonfigurasi.';return;}
 const {data,error}=await window.supabaseClient.from('invitations').select('*').eq('slug',slug).eq('status','published').maybeSingle();
 if(error||!data){root.querySelector('h1').textContent='Undangan tidak ditemukan';msg.textContent='Periksa kembali tautan undangan.';return;}
 root.querySelector('h1').textContent=data.title||'Undangan';msg.textContent=data.description||'Dengan hormat, kami mengundang Anda untuk hadir.';
 if(data.event_date){const p=document.createElement('p');p.textContent=new Date(data.event_date).toLocaleDateString('id-ID',{dateStyle:'full'});root.appendChild(p)}
 if(data.event_location){const p=document.createElement('p');p.textContent=data.event_location;root.appendChild(p)}
}
renderInvitation();
