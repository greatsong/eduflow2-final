document.addEventListener('DOMContentLoaded', function() {
  // 라이트박스 오버레이 생성
  var overlay = document.createElement('div');
  overlay.className = 'ef-lightbox';
  overlay.innerHTML = '<span class="ef-lightbox-close">&times;</span><img src="" alt=""><div class="ef-lightbox-caption"></div>';
  document.body.appendChild(overlay);

  var lbImg = overlay.querySelector('img');
  var lbCaption = overlay.querySelector('.ef-lightbox-caption');
  var lbClose = overlay.querySelector('.ef-lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbCaption.textContent = alt || '';
    lbCaption.style.display = alt ? 'block' : 'none';
    overlay.style.display = 'flex';
    requestAnimationFrame(function() { overlay.classList.add('active'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(function() { overlay.style.display = 'none'; lbImg.src = ''; }, 300);
    document.body.style.overflow = '';
  }

  // 이미지 클릭 이벤트 (이모지 제외)
  document.addEventListener('click', function(e) {
    var img = e.target.closest('.md-content img:not(.twemoji):not(.emojione)');
    if (img) { e.preventDefault(); openLightbox(img.src, img.alt); }
  });

  // 닫기: 오버레이/X 클릭, ESC 키
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target === lbClose || e.target.closest('.ef-lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });
});
