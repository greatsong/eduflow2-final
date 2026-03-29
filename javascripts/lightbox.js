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
      // Mermaid SVG
      var svg = element.querySelector('svg');
      if (!svg) return;
      var clone = svg.cloneNode(true);
      // viewBox가 없으면 생성
      if (!clone.getAttribute('viewBox')) {
        var w = parseFloat(clone.getAttribute('width')) || clone.getBBox && svg.getBBox().width || 800;
        var h = parseFloat(clone.getAttribute('height')) || svg.getBBox && svg.getBBox().height || 400;
        clone.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      }
      // 고정 크기 제거 → CSS로 확대
      clone.removeAttribute('width');
      clone.removeAttribute('height');
      clone.style.cssText = '';

      var wrapper = document.createElement('div');
      wrapper.className = 'ef-svg-wrapper';
      wrapper.appendChild(clone);
      lbBody.appendChild(wrapper);
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

  document.addEventListener('click', function(e) {
    // 이미지 클릭 (Mermaid 내부 이미지 제외)
    var img = e.target.closest('.md-content img:not(.twemoji):not(.emojione)');
    if (img && !e.target.closest('.mermaid')) {
      e.preventDefault();
      openLightbox(img, img.alt);
      return;
    }
    // Mermaid SVG 클릭 — SVG가 렌더링된 경우만
    var mermaid = e.target.closest('.mermaid');
    if (mermaid && mermaid.querySelector('svg')) {
      e.preventDefault();
      openLightbox(mermaid, '');
    }
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target.closest('.ef-lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });
});
