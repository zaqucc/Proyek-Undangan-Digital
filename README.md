# Proyek Undangan Digital

Kerangka MVP website undangan digital berbasis HTML, CSS, JavaScript, dan Supabase.

## Fitur awal
- Katalog 5 template: Wedding, Aqiqah, Birthday, dan Khitanan.
- Filter kategori.
- Form pemesanan dasar.
- Login admin dan daftar pesanan.
- Halaman renderer undangan berdasarkan slug.
- Skema database Supabase dengan Row Level Security (RLS).

## Menjalankan secara lokal
Buka `index.html` melalui server statis atau gunakan Live Server.

## Konfigurasi Supabase
1. Buat project di Supabase.
2. Jalankan SQL pada `supabase/schema.sql` di SQL Editor.
3. Isi URL dan anon key di `js/config.js`.
4. Jangan pernah menaruh service-role key di frontend.

## Deploy
Deploy folder ini ke Cloudflare Pages sebagai situs statis. Atur fallback/rewrite sesuai kebutuhan routing.

## Batasan MVP
Ini kerangka awal, belum siap produksi. Belum tersedia unggah bukti pembayaran, editor admin lengkap, pembuatan/penerbitan undangan end-to-end, RSVP, galeri unggah, musik, atau validasi pembayaran otomatis. Tinjau kebijakan RLS, validasi server-side, anti-spam, dan keamanan sebelum menerima pesanan nyata.
