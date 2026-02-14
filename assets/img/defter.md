<section id="memory-notebook">
  <div class="notebook-wrapper">
    <div class="notebook-stage">
      <div class="book" id="book" aria-label="Anı Defteri">
        <div class="spine"></div>

        <!-- Kapak (isteğe bağlı) -->
        <div class="cover cover-front">
          <div class="cover-title">Anı Defteri</div>
        </div>

        <!-- Sayfalar -->
        <div class="pages" id="pages">
          <!-- Her .page bir "sheet" gibi düşün: ön/arka yüz -->
          <article class="page" data-page="0">
            <div class="face front">
              <div class="page-grid">
                <div class="page-left">
                  <div class="polaroid">
                    <img src="img/01.jpg" alt="" />
                    <div class="polaroid-caption">❤️</div>
                  </div>
                </div>
                <div class="page-right">
                  <div class="date">14 Şubat 2026</div>
                  <h3 class="title">İlk Kahve</h3>
                  <p class="desc">O gün konuşurken zaman durdu gibi…</p>
                </div>
              </div>
            </div>
            <div class="face back">
              <div class="page-grid">
                <div class="page-left">
                  <div class="polaroid">
                    <img src="img/02.jpg" alt="" />
                    <div class="polaroid-caption">📸</div>
                  </div>
                </div>
                <div class="page-right">
                  <div class="date">20 Şubat 2026</div>
                  <h3 class="title">Yürüyüş</h3>
                  <p class="desc">Şehir sessizdi, biz gürültüydük.</p>
                </div>
              </div>
            </div>
          </article>

          <!-- 1..10 sayfaları aynı yapıda çoğalt -->
          <!-- ... -->
        </div>

        <!-- Arka kapak (isteğe bağlı) -->
        <div class="cover cover-back"></div>

        <!-- Sağ kenar (sayfa kalınlığı hissi) -->
        <div class="edge"></div>
      </div>
    </div>
  </div>
</section>
Not: Her .page bir “sheet” gibi: front ve back yüzleri var. Böylece flip gerçekten “sayfa çevirme” gibi görünür.

:root{
  --book-w: min(920px, 92vw);
  --book-h: min(520px, 72vh);
  --paper: #f6f0df;
  --ink: #1f2328;
  --shadow: 0 30px 70px rgba(0,0,0,.25);
  --page-radius: 18px;
  --flip-perspective: 1600px;
}

#memory-notebook{
  background: radial-gradient(1200px 600px at 50% 20%, #fff 0%, #f3f4f7 40%, #eceef4 100%);
  padding: 80px 0;
}

.notebook-wrapper{
  height: 330vh; /* senin mantık */
  position: relative;
}

.notebook-stage{
  position: sticky;
  top: 10vh;
  height: 80vh;
  display: grid;
  place-items: center;
}

.book{
  width: var(--book-w);
  height: var(--book-h);
  position: relative;
  perspective: var(--flip-perspective);
  transform-style: preserve-3d;
  filter: drop-shadow(var(--shadow));
}

/* Defter sırtı */
.spine{
  position: absolute;
  left: -22px;
  top: 10px;
  width: 30px;
  height: calc(100% - 20px);
  background: linear-gradient(90deg, #3b2f2a, #2c2320);
  border-radius: 16px;
  transform: translateZ(20px);
  box-shadow: inset -6px 0 10px rgba(255,255,255,.15);
}

/* Kapaklar */
.cover{
  position: absolute;
  inset: 0;
  border-radius: var(--page-radius);
  background: linear-gradient(135deg, #4a2b2b, #2b1a1a);
  transform-style: preserve-3d;
}
.cover-front{
  transform: translateZ(22px);
}
.cover-title{
  position: absolute;
  left: 28px;
  top: 26px;
  color: rgba(255,255,255,.92);
  font: 700 24px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial;
  letter-spacing: .4px;
}
.cover-back{
  transform: translateZ(-22px) rotateY(180deg);
  opacity: .95;
}

/* Sağ kenar: sayfa kalınlığı hissi */
.edge{
  position: absolute;
  right: -10px;
  top: 14px;
  width: 18px;
  height: calc(100% - 28px);
  border-radius: 10px;
  background: linear-gradient(90deg, #efe7d0, #fff, #e7dec7);
  transform: translateZ(8px);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
}

/* Sayfa yığını */
.pages{
  position: absolute;
  inset: 14px 14px 14px 14px;
  border-radius: calc(var(--page-radius) - 6px);
  transform: translateZ(10px);
  transform-style: preserve-3d;
}

/* Her page bir "sheet" */
.page{
  position: absolute;
  inset: 0;
  border-radius: calc(var(--page-radius) - 6px);
  transform-style: preserve-3d;
  transform-origin: left center;
  backface-visibility: hidden;
  will-change: transform;
}

/* Ön/arka yüzler */
.face{
  position: absolute;
  inset: 0;
  border-radius: calc(var(--page-radius) - 6px);
  background: var(--paper);
  color: var(--ink);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.05);
}

/* Kağıt dokusu + kıvrım/crease */
.face::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(1200px 600px at 10% 20%, rgba(255,255,255,.55), transparent 55%),
    radial-gradient(800px 500px at 80% 60%, rgba(0,0,0,.05), transparent 60%),
    repeating-linear-gradient(0deg, rgba(0,0,0,.015) 0 1px, transparent 1px 6px);
  pointer-events:none;
  mix-blend-mode:multiply;
  opacity:.65;
}

/* Orta kıvrım gölgesi */
.face::after{
  content:"";
  position:absolute;
  top:0; bottom:0;
  left:48.5%;
  width:3%;
  background: linear-gradient(90deg, rgba(0,0,0,.08), rgba(0,0,0,0), rgba(0,0,0,.06));
  opacity:.9;
  pointer-events:none;
}

.face.back{
  transform: rotateY(180deg);
}

/* İçerik layout */
.page-grid{
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  padding: 28px;
}

.page-left, .page-right{ display:flex; align-items:center; justify-content:center; }
.page-right{ flex-direction:column; align-items:flex-start; justify-content:center; gap:10px; }

.date{
  font: 600 13px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial;
  opacity: .7;
  letter-spacing: .3px;
}
.title{
  margin: 0;
  font: 800 28px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial;
}
.desc{
  margin: 0;
  font: 500 15px/1.55 system-ui, -apple-system, Segoe UI, Roboto, Arial;
  opacity: .9;
  max-width: 36ch;
}

/* Polaroid */
.polaroid{
  width: min(320px, 34vw);
  background: #fff;
  padding: 14px 14px 30px;
  border-radius: 10px;
  transform: rotate(-2deg);
  box-shadow: 0 16px 35px rgba(0,0,0,.18);
  position: relative;
}
.polaroid img{
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  display:block;
}
.polaroid-caption{
  position:absolute;
  left: 16px;
  bottom: 8px;
  font: 700 14px/1 system-ui;
  opacity:.7;
}

/* Flip sırasında daha belirgin gölge (sayfanın altı) */
.page .front{
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,.05),
    0 16px 45px rgba(0,0,0,.12);
}
.page.is-flipping .front{
  box-shadow:
    inset 0 0 0 1px rgba(0,0,0,.05),
    0 30px 70px rgba(0,0,0,.22);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .page{ transition: none !important; }
}


JS (Scroll → sayfa flip, tutarlı ve net)

Bu script:

progress hesaplar (0–1 clamp)

targetFlip = progress * (pageCount) gibi sürekli bir değer üretir

Her sayfanın dönüşünü: rotateY(-180deg * clamp(targetFlip - i, 0..1)) ile belirler
→ Böylece sayfalar sırayla çevrilir, “opacity toggle” gibi değil.

<script>
(() => {
  const section = document.querySelector("#memory-notebook");
  const wrapper = section.querySelector(".notebook-wrapper");
  const pagesEl = section.querySelector("#pages");
  const pages = Array.from(section.querySelectorAll(".page"));
  const pageCount = pages.length;

  // Kapak varsa, ilk sayfa flip ile çakışmasın diye küçük offset kullanabilirsin
  const FLIP_START = 0.03; // 0..1
  const FLIP_END   = 0.97;

  let ticking = false;
  let lastProgress = -1;

  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  function getProgress() {
    const rect = wrapper.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // wrapper'ın scroll alanı: wrapperHeight - viewportH
    const scrollable = wrapper.offsetHeight - viewportH;
    if (scrollable <= 0) return 0;

    // wrapper üstü viewport'a girince progress başlasın
    const scrolled = clamp01((viewportH - rect.top) / (viewportH + scrollable));
    return scrolled;
  }

  function lerp(a,b,t){ return a + (b-a)*t; }

  function render(progress) {
    // Flip aralığına map et
    const t = clamp01((progress - FLIP_START) / (FLIP_END - FLIP_START));

    // Sürekli flip zaman çizgisi: 0..pageCount
    const flip = t * pageCount;

    // Kitap hafif tilt + derinlik hissi
    const tilt = lerp(2, -2, t); // derece
    const bob  = lerp(0, -6, Math.sin(t * Math.PI)); // px
    pagesEl.style.transform = `translateZ(10px) rotateX(${tilt}deg) translateY(${bob}px)`;

    for (let i = 0; i < pageCount; i++) {
      const p = pages[i];

      // Her sayfanın kendi ilerlemesi: flip - i
      const local = clamp01(flip - i);

      // Net ve gerçekçi: 0..1 => 0..-180deg
      const angle = -180 * local;

      // Sayfa çevrilirken class (gölge vb.)
      const flipping = local > 0 && local < 1;
      p.classList.toggle("is-flipping", flipping);

      // Z-index: çevrilmemiş sayfalar üstte dursun, çevrilenler alta gitsin
      // (Basit kural: i büyüdükçe aşağı)
      p.style.zIndex = String(1000 - i);

      // İnce bir "curl" hissi: sayfa çevrilirken hafif skew/translate
      const curl = lerp(0, 6, Math.sin(local * Math.PI)); // px
      p.style.transform = `translateX(${curl}px) rotateY(${angle}deg)`;
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        const progress = getProgress();

        // çok küçük değişimde render yapma (mikro jitter azaltır)
        if (Math.abs(progress - lastProgress) > 0.0005) {
          lastProgress = progress;
          render(progress);
        }

        ticking = false;
      });
    }
  }

  // İlk render
  render(getProgress());

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => render(getProgress()));
})();
</script>

Neden bu, senin “opacity active page” yaklaşımından daha iyi?

Geçiş net: Opacity crossfade yerine fiziksel sayfa çevirme var. Kullanıcı “sayfa değişti”yi açıkça görür.

Defter hissi: Spine + edge + 3D perspective + paper texture + crease + flip shadow birleşince “gerçek defter” algısı gelir.

Tutarlılık: requestAnimationFrame + clamp + “sürekli flip timeline” jitter/atlama sorununu azaltır.

Scroll mapping daha stabil: wrapper.offsetHeight - viewportH ile gerçek scrollable alan üzerinden hesaplar.

İsteğe bağlı iyileştirmeler (kısa)

Snap hissi: Flip değerini Math.round(flip * 2)/2 gibi yarım sayfalara yaklaştırıp, kullanıcı scroll’u durdurunca “en yakın sayfaya oturtma” animasyonu ekleyebilirsin.

Mobil performans: Görselleri loading="lazy" + uygun boyut + will-change: transform (sadece .page) ile optimize et.

Erişilebilirlik: prefers-reduced-motion varsa flip yerine “fade + slide” alternatifine düş.