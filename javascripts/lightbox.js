document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.createElement('div');
  overlay.className = 'ef-lightbox';
  overlay.innerHTML = '<span class="ef-lightbox-close">&times;</span><div class="ef-lightbox-body"></div><div class="ef-lightbox-caption"></div>';
  document.body.appendChild(overlay);
  var lbBody = overlay.querySelector('.ef-lightbox-body');
  var lbCaption = overlay.querySelector('.ef-lightbox-caption');

  function openLightbox(element, caption) {
    lbBody.innerHTML = '';
    if (element.tagName === 'IMG') {
      var img = document.createElement('img');
      img.src = element.src;
      img.alt = element.alt || '';
      lbBody.appendChild(img);
    } else {
      // Mermaid SVG — 복제해서 크게 표시
      var clone = element.cloneNode(true);
      clone.style.maxWidth = '92vw';
      clone.style.maxHeight = '85vh';
      clone.style.width = 'auto';
      clone.style.height = 'auto';
      clone.style.background = '#fff';
      clone.style.borderRadius = '12px';
      clone.style.padding = '2rem';
      clone.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
      // SVG 내부 크기 제거해서 확대
      var svgs = clone.querySelectorAll('svg');
      svgs.forEach(function(svg) {
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxWidth = '88vw';
        svg.style.maxHeight = '80vh';
      });
      lbBody.appendChild(clone);
    }
    lbCaption.textContent = caption || '';
    lbCaption.style.display = caption ? 'block' : 'none';
    overlay.style.display = 'flex';
    requestAnimationFrame(function() { overlay.classList.add('active'); });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(function() { overlay.style.display = 'none'; lbBody.innerHTML = ''; }, 300);
    document.body.style.overflow = '';
  }

  // 이미지 클릭
  document.addEventListener('click', function(e) {
    var img = e.target.closest('.md-content img:not(.twemoji):not(.emojione)');
    if (img) { e.preventDefault(); openLightbox(img, img.alt); return; }
    // Mermaid 다이어그램 클릭
    var mermaid = e.target.closest('.mermaid');
    if (mermaid && mermaid.querySelector('svg')) {
      e.preventDefault();
      var title = mermaid.closest('.md-content') ? '다이어그램 (클릭하여 닫기)' : '';
      openLightbox(mermaid, title);
    }
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target.closest('.ef-lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });
});
