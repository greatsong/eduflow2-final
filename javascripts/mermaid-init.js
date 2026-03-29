document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid === 'undefined') return;
  var isDark = document.documentElement.getAttribute('data-md-color-scheme') === 'slate';
  mermaid.initialize({
    startOnLoad: true, theme: 'base',
    themeVariables: isDark ? {
      primaryColor:'#1e293b',primaryBorderColor:'#60a5fa',primaryTextColor:'#e2e8f0',lineColor:'#475569',
      secondaryColor:'#1e3a5f',secondaryBorderColor:'#38bdf8',secondaryTextColor:'#bae6fd',
      tertiaryColor:'#1c1917',tertiaryBorderColor:'#a78bfa',tertiaryTextColor:'#ddd6fe',
      fontFamily:'"Noto Sans KR",system-ui',fontSize:'14px',nodeBorder:'2px',mainBkg:'#1e293b'
    } : {
      primaryColor:'#eff6ff',primaryBorderColor:'#3b82f6',primaryTextColor:'#1e3a5f',lineColor:'#94a3b8',
      secondaryColor:'#f0fdf4',secondaryBorderColor:'#22c55e',secondaryTextColor:'#166534',
      tertiaryColor:'#faf5ff',tertiaryBorderColor:'#a78bfa',tertiaryTextColor:'#5b21b6',
      fontFamily:'"Noto Sans KR",system-ui',fontSize:'14px',nodeBorder:'2px',mainBkg:'#eff6ff'
    },
    flowchart:{useMaxWidth:true,htmlLabels:true,curve:'basis',padding:15},
  });
  new MutationObserver(function(){location.reload()})
    .observe(document.documentElement,{attributes:true,attributeFilter:['data-md-color-scheme']});
});
