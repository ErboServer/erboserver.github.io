// script-shop.js
(function(){
  const STORAGE_KEY = 'elbo_shop_cart';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // テーマ初期化（既存と同じロジック）
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
    {id:'oak_log', name:'オークの原木', price:18, category:'建築'},
    {id:'birch_log', name:'シラカバの原木', price:18, category:'建築'},
    {id:'spruce_log', name:'トウヒの原木', price:18, category:'建築'},
    {id:'acacia_log', name:'アカシアの原木', price:18, category:'建築'},
    {id:'jungle_log', name:'ジャングルの原木', price:18, category:'建築'},
    {id:'dark_oak_log', name:'ダークオークの原木', price:18, category:'建築'},
    {id:'mangrove_log', name:'マングローブの原木', price:18, category:'建築'},
    {id:'sakura_log', name:'桜の原木', price:18, category:'建築'},
    {id:'pale_oak_log', name:'ペールオークの原木', price:18, category:'建築'},
    {id:'crimson_stem', name:'真紅の幹', price:18, category:'建築'},
    {id:'warped_stem', name:'歪んだ幹', price:18, category:'建築'},
    {id:'stone_bricks', name:'石レンガ', price:18, category:'建築'},
    {id:'bricks', name:'レンガ', price:18, category:'建築'},
    {id:'glass', name:'ガラス', price:30, category:'建築'},
    {id:'quartz_block', name:'クォーツブロック', price:20, category:'建築'},
    {id:'white_wool', name:'白の羊毛', price:18, category:'建築'},
    {id:'dirt', name:'土', price:12, category:'建築'},
    {id:'sand', name:'砂', price:12, category:'建築'},
    {id:'stone', name:'石', price:12, category:'建築'},
    {id:'cobblestone', name:'丸石', price:12, category:'建築'},
    {id:'deepslate', name:'ディープスレート', price:12, category:'建築'},
    {id:'andesite', name:'安山岩', price:12, category:'建築'},
    {id:'granite', name:'花崗岩', price:12, category:'建築'},
    {id:'diorite', name:'閃緑岩', price:12, category:'建築'},
    {id:'sea_lantern', name:'シーランタン', price:36, category:'建築'},

    /* モブドロップ */
    {id:'rotten_flesh', name:'腐った肉', price:200, category:'モブドロップ'},
    {id:'bone', name:'骨', price:180, category:'モブドロップ'},
    {id:'string', name:'糸', price:180, category:'モブドロップ'},
    {id:'ink_sac', name:'イカ墨', price:200, category:'モブドロップ'},
    {id:'ender_pearl', name:'エンダーパール', price:300, category:'モブドロップ'},
    {id:'slime_ball', name:'スライムボール', price:100, category:'モブドロップ'},
    {id:'gunpowder', name:'火薬', price:300, category:'モブドロップ'},
    {id:'leather', name:'革', price:150, category:'モブドロップ'},
    {id:'blaze_rod', name:'ブレイズロッド', price:400, category:'モブドロップ'},
    {id:'spider_eye', name:'蜘蛛の目', price:300, category:'モブドロップ'},

    /* 鉱石 */
    {id:'iron_ingot', name:'鉄インゴット', price:300, category:'鉱石'},
    {id:'gold_ingot', name:'金インゴット', price:400, category:'鉱石'},
    {id:'copper_ingot', name:'銅インゴット', price:100, category:'鉱石'},
    {id:'diamond', name:'ダイヤモンド', price:800, category:'鉱石'},
    {id:'redstone', name:'レッドストーン', price:400, category:'鉱石'},
    {id:'lapis', name:'ラピスラズリ', price:400, category:'鉱石'},
    {id:'emerald', name:'エメラルド', price:600, category:'鉱石'},

    /* レアアイテム */
    {id:'shulker_shell', name:'シュルカーの殻', price:8000, category:'レアアイテム'},
    {id:'trident', name:'トライデント', price:9000, category:'レアアイテム'},
    {id:'mace', name:'メイス', price:9000, category:'レアアイテム'},
    {id:'netherite_ingot', name:'ネザライトインゴット', price:30000, category:'レアアイテム'},
    {id:'elytra', name:'エリトラ', price:50000, category:'レアアイテム'},
    {id:'shield', name:'盾', price:2000, category:'レアアイテム'},
    {id:'ghast_tear', name:'ガストの涙', price:10000, category:'レアアイテム'},
    {id:'end_crystal', name:'エンドクリスタル', price:5000, category:'レアアイテム'},
    {id:'phantom_membrane', name:'ファントムの被膜', price:3000, category:'レアアイテム'},
    {id:'breeze_rod', name:'ブリーズロッド', price:7500, category:'レアアイテム'},

    /* スポーンエッグ */
    {id:'zombie_egg', name:'ゾンビのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'skeleton_egg', name:'スケルトンのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'creeper_egg', name:'クリーパーのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'slime_egg', name:'スライムのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'spider_egg', name:'クモのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'blaze_egg', name:'ブレイズのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'villager_egg', name:'村人のスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'ghast_egg', name:'ガストのスポーンエッグ', price:2000, category:'スポーンエッグ'},
    {id:'magma_cube_egg', name:'マグマキューブのスポーンエッグ', price:2000, category:'スポーンエッグ'}
  ];

  /* --- カート管理 --- */
  function loadCart(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function saveCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); updateCartUI(); }
  function addToCart(id, qty){
    const cart = loadCart();
    cart[id] = (cart[id] || 0) + qty;
    if(cart[id] <= 0) delete cart[id];
    saveCart(cart);
  }
  function clearCart(){ localStorage.removeItem(STORAGE_KEY); updateCartUI(); }

  /* --- 描画 --- */
  const itemsGrid = document.getElementById('items-grid');
  const searchInput = document.getElementById('search');
  const categoryFilter = document.getElementById('category-filter');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsEl = document.getElementById('cart-items');
  const cartModalTotal = document.getElementById('cart-modal-total');
  const clearCartBtn = document.getElementById('clear-cart');
  const checkoutBtn = document.getElementById('checkout');

  function formatPrice(n){ return `${n}$`; }

  function renderItems(){
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categoryFilter.value;
    itemsGrid.innerHTML = '';
    const filtered = ITEMS.filter(it => {
      if(cat !== 'all' && it.category !== cat) return false;
      if(!q) return true;
      return it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    });
    filtered.forEach(it => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.innerHTML = `
        <div class="item-top">
          <div>
            <div class="item-name">${escapeHtml(it.name)}</div>
            <div class="item-cat muted">${escapeHtml(it.category)}</div>
          </div>
          <div class="item-price">${formatPrice(it.price)}</div>
        </div>
        <div class="item-actions">
          <input type="number" class="qty" min="1" value="1" aria-label="数量" />
          <button class="btn primary add-btn" data-id="${it.id}">カートに追加</button>
        </div>
      `;
      itemsGrid.appendChild(card);
    });

    // イベント
    itemsGrid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const qtyInput = btn.parentElement.querySelector('.qty');
        const qty = Math.max(1, parseInt(qtyInput.value || '1', 10));
        addToCart(id, qty);
        btn.textContent = '追加済';
        setTimeout(()=> btn.textContent = 'カートに追加', 900);
      });
    });
  }

  function updateCartUI(){
    const cart = loadCart();
    let count = 0, total = 0;
    for(const id in cart){
      const qty = cart[id];
      const item = ITEMS.find(i => i.id === id);
      if(!item) continue;
      count += qty;
      total += item.price * qty;
    }
    cartCountEl.textContent = count;
    cartTotalEl.textContent = formatPrice(total);
    cartModalTotal.textContent = formatPrice(total);
  }

  function openCart(){
    renderCartItems();
    cartModal.setAttribute('aria-hidden','false');
  }
  function closeCart(){ cartModal.setAttribute('aria-hidden','true'); }

  function renderCartItems(){
    const cart = loadCart();
    cartItemsEl.innerHTML = '';
    if(Object.keys(cart).length === 0){
      cartItemsEl.innerHTML = '<p class="muted">カートは空です。</p>';
      return;
    }
    for(const id in cart){
      const qty = cart[id];
      const item = ITEMS.find(i => i.id === id);
      if(!item) continue;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div>
          <div style="font-weight:700">${escapeHtml(item.name)}</div>
          <div class="muted">単価: ${formatPrice(item.price)} × ${qty}</div>
        </div>
        <div>
          <div style="text-align:right;font-weight:800">${formatPrice(item.price * qty)}</div>
          <div style="margin-top:6px;display:flex;gap:6px;justify-content:flex-end">
            <button class="btn secondary dec" data-id="${id}">-</button>
            <button class="btn secondary inc" data-id="${id}">+</button>
            <button class="btn" style="background:transparent;border:1px solid var(--card-border)" data-id="${id}" data-action="remove">削除</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(el);
    }

    // cart item events
    cartItemsEl.querySelectorAll('.inc').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        addToCart(id, 1);
      });
    });
    cartItemsEl.querySelectorAll('.dec').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        addToCart(id, -1);
      });
    });
    cartItemsEl.querySelectorAll('button[data-action="remove"]').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-id');
        const cart = loadCart();
        delete cart[id];
        saveCart(cart);
      });
    });
  }

  // checkout（ここではダミー：実際の処理は運営に連携）
  checkoutBtn.addEventListener('click', () => {
    const cart = loadCart();
    if(Object.keys(cart).length === 0){ alert('カートが空です'); return; }
    // ここでサーバー申請や運営への通知処理を行う（実装は運営側）
    alert('購入申請を送信しました（ダミー）。運営の案内に従ってください。');
    clearCart();
    closeCart();
  });

  // clear cart
  clearCartBtn.addEventListener('click', () => {
    if(confirm('カートを空にしますか？')) clearCart();
  });

  // open/close cart
  openCartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartModal.addEventListener('click', (e) => { if(e.target === cartModal) closeCart(); });

  // search / filter
  searchInput.addEventListener('input', renderItems);
  categoryFilter.addEventListener('change', renderItems);

  // 初期描画
  renderItems();
  updateCartUI();

  // helper
  function escapeHtml(s){ if(!s && s !== 0) return ''; return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
})();
