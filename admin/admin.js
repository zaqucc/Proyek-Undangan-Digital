const loginForm=document.getElementById('login-form'),message=document.getElementById('admin-message'),dashboard=document.getElementById('dashboard'),ordersWrap=document.getElementById('orders-wrap');
function say(s){message.textContent=s}
async function loadOrders(){
 if(!window.supabaseClient){say('Supabase belum dikonfigurasi.');return;}
 const {data,error}=await window.supabaseClient.from('orders').select('*').order('created_at',{ascending:false}).limit(100);
 if(error){say('Tidak dapat memuat pesanan. Periksa izin admin dan RLS.');return;}
 if(!data.length){ordersWrap.textContent='Belum ada pesanan.';return;}
 const table=document.createElement('table');table.className='admin-table';table.innerHTML='<thead><tr><th>Nama</th><th>Acara</th><th>Template</th><th>Status</th><th>Aksi</th></tr></thead><tbody></tbody>';
 const body=table.querySelector('tbody');
 data.forEach(o=>{const tr=document.createElement('tr');tr.innerHTML=`<td></td><td></td><td></td><td></td><td><select aria-label="Ubah status"><option value="new">Baru</option><option value="confirmed">Dikonfirmasi</option><option value="in_progress">Diproses</option><option value="published">Terbit</option><option value="cancelled">Batal</option></select> <button class="text-link">Simpan</button></td>`;tr.children[0].textContent=o.customer_name||'-';tr.children[1].textContent=o.event_type||'-';tr.children[2].textContent=o.template_code||'-';tr.children[3].textContent=o.status||'-';const select=tr.querySelector('select');select.value=o.status||'new';tr.querySelector('button').addEventListener('click',async()=>{const result=await window.supabaseClient.from('orders').update({status:select.value}).eq('id',o.id);say(result.error?'Gagal memperbarui status.':'Status diperbarui.');if(!result.error)loadOrders()});body.appendChild(tr)});
 ordersWrap.replaceChildren(table);
}
loginForm.addEventListener('submit',async e=>{e.preventDefault();if(!window.supabaseClient){say('Isi konfigurasi Supabase dahulu.');return;}const {error}=await window.supabaseClient.auth.signInWithPassword({email:document.getElementById('email').value,password:document.getElementById('password').value});if(error){say('Login gagal. Periksa akun dan konfigurasi.');return;}say('Login berhasil.');dashboard.classList.remove('hidden');loadOrders()});
document.getElementById('logout').addEventListener('click',async()=>{if(window.supabaseClient)await window.supabaseClient.auth.signOut();dashboard.classList.add('hidden');say('Kamu sudah logout.')});
document.getElementById('refresh').addEventListener('click',loadOrders);
