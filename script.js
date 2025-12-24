// script.js
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'elbo_theme'; // 'dark' or 'light'

  // 初期テーマを決定（localStorage → prefers-color-scheme → light）
  function getInitialTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme', 'dark');
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed', 'false');
    }
  }

  function toggleTheme(){
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // 初期化
  const initial = getInitialTheme();
  applyTheme(initial);

  // イベント
  toggle.addEventListener('click', toggleTheme);

  // キーボード操作対応（Enter/Spaceで切替）
  toggle.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
})();
