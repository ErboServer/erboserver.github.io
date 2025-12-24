// script-shop-server-view.js
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // テーマ（既存サイトと合わせる）
  function getInitialTheme(){
    const saved = localStorage.getItem('elbo_theme');
    if(saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t){
    if(t === 'dark'){ root.setAttribute('data-theme','dark'); themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true'); }
    else { root.removeAttribute('data-theme'); themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false'); }
  }
  themeToggle.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('elbo_theme', next);
  });
  applyTheme(getInitialTheme());

  /* --- 商品データ --- */
  const ITEMS = [
    /* 建築 */
    {name:'オークの原木', price:18, category:'建築'},
    {name:'シラカバの原木', price:18, category:'建築'},
    {name:'トウヒの原木', price:18, category:'建築'},
    {name:'アカシアの原木', price:18, category:'建築'},
    {name:'ジャングルの原木', price:18, category:'建築'},
    {name:'ダークオークの原木', price:18, category:'建築'},
    {name:'マングローブの原木', price:18, category:'建築'},
    {name:'桜の原木', price:18, category:'建築'},
    {name:'ペールオークの原木', price:18, category:'建築'},
    {name:'真紅の幹', price:18, category:'建築'},
    {name:'歪んだ幹', price:18, category:'建築'},
    {name:'石レンガ', price:18, category:'建築'},
    {name:'レンガ', price:18, category:'建築'},
    {name:'ガラス', price:30, category:'建築'},
    {name:'クォーツブロック', price:20, category:'建築'},
    {name:'白の羊毛', price:18, category:'建築'},
    {name:'土', price:12, category:'建築'},
    {name:'砂', price:12, category:'建築'},
    {name:'石', price:12, category:'建築'},
    {name:'丸石', price:12, category:'建築'},
    {name:'ディープスレート', price:12, category:'建築'},
    {name:'安山岩', price:12, category:'建築'},
    {name:'花崗岩', price:12, category:'建築'},
    {name:'閃緑岩', price:12, category:'建築'},
    {name:'シーランタン', price:36, category:'建築'},

    /* モブドロップ */
    {name:'腐った肉', price:200, category:'モブドロップ'},
    {name:'骨', price:180, category:'モブドロップ'},
    {name:'糸', price:180, category:'モブドロップ'},
    {name:'イカ墨', price:200, category:'モブドロップ'},
    {name:'エンダーパール', price:300, category:'モブドロップ'},
    {name:'スライムボール', price:100, category:'モブドロップ'},
    {name:'火薬', price:300, category:'モブドロップ'},
    {name:'革', price:150, category:'モブドロップ'},
    {name:'ブレイズロッド', price:400, category:'モブドロップ'},
    {name:'蜘蛛の目', price:300, category:'モブドロップ'},

    /* 鉱石 */
    {name:'鉄インゴット', price:300, category:'鉱石'},
    {name:'金インゴット', price:400, category:'鉱石'},
    {name:'銅インゴット', price:100, category:'鉱石'},
    {name:'ダイヤモンド', price:800, category:'鉱石'},
    {name:'レッドストーン', price:400, category:'鉱石'},
    {name:'ラピスラズリ', price:400, category:'鉱石'},
    {name:'エメラルド', price:600, category:'鉱石'},

    /* レアアイテム */
    {name:'シュルカーの殻', price:8000, category:'レアアイテム'},
    {name:'トライデント', price:9000, category:'レアアイテム'},
    {name:'メイス', price:9000, category:'レアアイテム'},
    {name:'ネザライトインゴット', price:30000, category:'レアアイテム'},
    {name:'エリトラ', price:50000, category:'レアアイテム'},
    {name:'盾', price:2000, category:'レアアイテム'},
    {name:'ガストの涙', price:10000, category:'レアアイテム'},
    {name:'エンドクリスタル', price:5000, category:'レアアイテム'},
    {name:'ファントムの被膜', price:3000, category:'レアアイテム'},
    {name:'ブリーズロッド', price:7500, category:'レアアイテム'},

    /* スポーンエッグ */
    {name:'ゾンビのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'スケルトンのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'クリーパーのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'スライムのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'クモのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'ブレイズのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'村人のスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'ガストのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {name:'マグマキューブのスポーンエッグ', price:2000, category:'スポーンエッグ'}
  ];

  /* --- DOM --- */
  const itemsGrid = document.getElementById('items-grid');
  const searchInput = document.getElementById('search');
  const categoryFilter = document.getElementById('category-filter');

  function renderItems(){
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categoryFilter.value;
    itemsGrid.innerHTML = '';
    const filtered = ITEMS.filter(it => {
      if(cat !== 'all' && it.category !== cat) return false;
      if(!q) return true;
      return it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    });

    if(filtered.length === 0){
      itemsGrid.innerHTML = '<p class="muted">該当するアイテムはありません。</p>';
      return;
    }

    filtered.forEach(it => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-top">
          <div>
            <div class="item-name">${escapeHtml(it.name)}</div>
            <div class="item-cat muted">${escapeHtml(it.category)}</div>
          </div>
          <div class="item-price">${it.price}$</div>
        </div>
      `;
      itemsGrid.appendChild(card);
    });
  }

  // 検索・フィルタ
  searchInput.addEventListener('input', renderItems);
  categoryFilter.addEventListener('change', renderItems);

  // 初期描画
  renderItems();

  // ヘルパー
  function escapeHtml(s){ if(!s && s !== 0) return ''; return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
})();
