Sadece HTML, CSS ve vanilla JavaScript kullanarak (framework yok) tek sayfalık, tam ekran (100vh) “yıldızlı uzay” temalı, sinematik ve yüksek animasyonlu bir Sevgililer Günü web sitesi oluştur.

Dil: TÜM METİNLER TÜRKÇE olacak.
Kişi adı: Ebrar (metinlerde sevgilinin adı Ebrar olarak geçecek).
Tasarım hedefi: Moment Zero benzeri premium scrollytelling deneyimi; koyu uzay arka planı, büyük yıl tipografisi, scroll ile senkron animasyonlar, minimal UI, duygusal atmosfer.

GENEL YAPI (tek sayfa):
1) GİRİŞ (Hero) – 100vh
- Arka plan: yıldızlı uzay + hafif nebula/grain efekti (CSS/Canvas ile)
- Başlık (ortada büyük): “Ebrar, Bu Bizim Hikâyemiz”
- Alt metin: “Aşağı kaydır, anılarımıza birlikte bakalım.”
- Yumuşak fade-in ve hafif parallax hissi
- Arka planda çok hafif hareket eden yıldız partikülleri (performans dostu)

2) ANI TÜNELİ (Yıllara göre) – Moment Zero tarzı
- Her yıl bir tam ekran sahne (ör: 2021, 2022, 2023, 2024)
- Ekranın ortasında dev yıl yazısı
- Ortadan aşağı inen ince bir dikey çizgi + parlayan bir nokta (scroll ile hareket ediyor)
- Sahne aktifken: yıl yazısı çok hafif büyür, glow artar, arka plan tonu ince değişir
- Her yıl için içerik:
  - Kısa başlık (örn: “Tanıştığımız Gün”)
  - 2–3 satır duygu cümlesi (Türkçe)
  - 1 fotoğraf “sinematik reveal” (fade + blur’dan netleşme + hafif scale)
- Scroll davranışı:
  - Bazı sahneler kısa süre “pin” gibi hissedebilir (JS ile scroll progress’e bağlı)
  - Animasyonlar scroll ile “scrub” şeklinde senkron ilerlesin

3) FOTOĞRAF SAHNESİ (Sinematik kartlar) – 100vh
- Ortada üst üste yığılmış foto kartları (polaroid hissi ama özgün)
- Scroll yaptıkça kartlar sırayla:
  - hafif rotate + slide ile ayrılır
  - yumuşak gölge ve derinlik
- Arka planda yıldızlar çok hafif akışta

4) SOHBET SAHNESİ (WhatsApp esintili ama kopya değil) – 100vh
- Tam ekran, ortada minimal sohbet penceresi
- Tasarım WhatsApp’ı birebir kopyalamayacak: özgün renkler, baloncuk şekli, fontlar
- Scroll yaptıkça mesajlar sırayla gelsin:
  - typing efekti (3 nokta animasyonu)
  - sonra mesaj balonu slide-in + fade-in
  - sağ/sol konuşmacı ayrımı
- Mesaj içerikleri Türkçe ve romantik olsun (kısa, gerçekçi)
- İsteğe bağlı küçük tarih/saat notları düşük opaklıkla

5) MEKTUP FİNALİ – 100vh
- Ortada zarf + mektup animasyonu
- Scroll ilerledikçe:
  - zarf açılır
  - mektup çıkar
  - yazı satır satır görünür (typewriter benzeri ama yumuşak)
- Mektup metni Türkçe ve Ebrar’a hitap edecek şekilde duygusal bir final:
  - “Ebrar, iyi ki varsın…”
  - Son satır çok güçlü: “Seni seviyorum. Hep.”

6) KAPANIŞ / SÜRPRİZ – 100vh
- Yıldızlar arasından beliren küçük bir “buton” veya “kalp”
- Tıklayınca küçük bir sürpriz modal:
  - “Birlikte nice anıya.”
  - (isteğe bağlı) “Sana bir şey söylemek istiyorum…” gibi

TASARIM KURALLARI:
- Tam ekran, premium, sinematik hissiyat
- Koyu uzay teması + yumuşak glow aksanlar
- Tipografi: büyük, temiz; romantik vurgu için sadece mektupta el yazısı hissi veren font kullanılabilir (ama aşırıya kaçma)
- Animasyonlar agresif olmayacak: yavaş, smooth, duygusal
- Performans: scroll animasyonlarında layout thrashing yapma, transform/opacity ağırlıklı ilerle
- Responsive: mobilde de çok iyi görünmeli

TEKNİK:
- Tek HTML dosyası + ayrı CSS + ayrı JS dosyası (veya tek dosya ama düzenli)
- Scroll animasyonları için IntersectionObserver + scroll progress hesaplama kullan
- requestAnimationFrame ile scroll progress yönetimi (gerekirse)
- Canvas starfield veya CSS ile partikül (tercihen canvas, performanslı)
- Kod temiz ve modüler olsun: her sahne için ayrı fonksiyon/section

İÇERİK (placeholder kabul):
- Fotoğraflar için yer tutucu görseller kullan, sonra kullanıcı değiştirebilsin
- Yıllar ve anı başlıkları örnek olsun ama Türkçe ve romantik

ÇIKTI:
- Çalışır halde bir mini proje yapısı üret:
  - index.html
  - styles.css
  - main.js
  - assets/ (placeholder görseller)
