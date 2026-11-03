const params=new URLSearchParams(location.search);const templateParam=params.get('template');if(templateParam)document.getElementById('template').value=templateParam;
document.getElementById('order-form').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget;const msg=document.getElementById('form-message');const data=Object.fromEntries(new FormData(form).entries());
 if(!window.supabaseClient){msg.textContent='Form belum terhubung. Admin perlu mengatur Supabase di js/config.js sebelum formulir dapat mengirim data.';return;}
 const {error}=await window.supabaseClient.from('orders').insert({customer_name:data.name,customer_phone:data.phone,event_type:data.event_type,template_code:data.template_code||null,event_date:data.event_date||null,event_location:data.event_location||null,notes:data.notes||null,status:'new'});
 if(error){msg.textContent='Pesanan belum terkirim. Periksa konfigurasi database dan kebijakan keamanan.';return;}
 msg.textContent='Permintaan terkirim. Admin akan menghubungi melalui WhatsApp.';form.reset();
});
