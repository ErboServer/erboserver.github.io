// script-commands.js
(function(){
  const STORAGE_KEY = 'elbo_theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // 初期テーマ
  function getInitialTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t){
    if(t === 'dark'){ root.setAttribute('data-theme','dark'); toggle.textContent = '☀️'; toggle.setAttribute('aria-pressed','true'); }
    else { root.removeAttribute('data-theme'); toggle.textContent = '🌙'; toggle.setAttribute('aria-pressed','false'); }
  }
  toggle.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
  applyTheme(getInitialTheme());

  /* --- データ --- */
  const commands = [
    {cmd:'/create', desc:'村を創造します', level:null},
    {cmd:'/setting', desc:'村、国の管理画面を開きます', level:null},
    {cmd:'/shows', desc:'村、国の一覧を表示します。選択で管理可能', level:null},
    {cmd:'/showrule', desc:'ルールを表示します', level:null},
    {cmd:'/killme', desc:'自分を倒します', level:null},
    {cmd:'/lobby', desc:'ロビーへテレポートします', level:null},
    {cmd:'/sethome', desc:'ホームをセットします', level:null},
    {cmd:'/showhome', desc:'セットしたホームを確認します', level:null},
    {cmd:'/generalchatcommand', desc:'パブリックチャットを開きます', level:null},
    {cmd:'/incountrychatcommand', desc:'国内チャットを開きます', level:null},
    {cmd:'/teleportcountryhome', desc:'国のホームへテレポートします', level:null},
    {cmd:'/inalliancecountrychatcommand', desc:'同盟チャットを開きます', level:18},
    {cmd:'/leavecountryandvillage', desc:'村、国から脱退します', level:null},
    {cmd:'/money', desc:'現在の所持金を確認します', level:90},
    {cmd:'/shop', desc:'ショップを開きます', level:106},
    {cmd:'/startinvasion', desc:'侵略を開始します', level:30},
    {cmd:'/selectstates', desc:'区画をチャンクに追加します', level:90},
    {cmd:'/getland', desc:'領土を獲得します', level:30},
    {cmd:'/releaseland', desc:'領土を放棄します', level:30},
    {cmd:'/showmonsters', desc:'週間討伐の画面を開きます', level:110},
    {cmd:'/sendmoney', desc:'送金します', level:90},
    {cmd:'/leavemilitaryclique', desc:'軍閥組織から脱退します', level:120},
    {cmd:'/rebellion', desc:'軍閥組織から反乱を開始します', level:120},
    {cmd:'/trainitems', desc:'鉄道のアイテムを取得します', level:130},
    {cmd:'/jobs', desc:'職業を選択します', level:90}
  ];

  const civLevels = [
    {level:1, text:'平和主義'},
    {level:10, text:'木製バケツ'},
    {level:30, text:'領土、外交関係、侵略'},
    {level:35, text:'加工機の作成'},
    {level:45, text:'加工機での釘の作成'},
    {level:50, text:'作業台での太刀の作成'},
    {level:65, text:'鉄刀'},
    {level:70, text:'畳'},
    {level:75, text:'黒刀、緑の畳'},
    {level:85, text:'脇差'},
    {level:90, text:'ネジ、工業作業台'},
    {level:100, text:'国家主義、区画'},
    {level:106, text:'ショップ(建築素材)'},
    {level:108, text:'ショップ(モブドロップ)'},
    {level:110, text:'重工業作業台等、独自税、国際補助、週間討伐'},
    {level:111, text:'ショップ(鉱石)'},
    {level:117, text:'独自税(死税)'},
    {level:119, text:'ショップ(レアアイテム)'},
    {level:120, text:'民主連合、軍閥、反乱、軍服一式'},
    {level:125, text:'特売、ショップ(スポーンエッグ)'},
    {level:128, text:'独自税(買い物税)'},
    {level:130, text:'鉄道'},
    {level:140, text:'エンジン開発'},
    {level:150, text:'なし'}
  ];

  /* --- 描画 --- */
  const commandsListEl = document.getElementById('commands-list');
  const levelsListEl = document.getElementById('levels-list');
  const searchInput = document.getElementById('cmd-search');
  const showLockedCheckbox = document.getElementById('show-locked');

  function renderCommands(filterText = '', onlyLocked = false){
    commandsListEl.innerHTML = '';
    const q = filterText.trim().toLowerCase();
    const filtered = commands.filter(c => {
      if(onlyLocked && (c.level === null || c.level === undefined)) return false;
      if(!q) return true;
      return c.cmd.toLowerCase().includes(q) || (c.desc && c.desc.toLowerCase().includes(q)) || (c.level && String(c.level).includes(q));
    });

    if(filtered.length === 0){
      commandsListEl.innerHTML = '<p class="muted">該当するコマンドはありません。</p>';
      return;
    }

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'command-card';
      card.innerHTML = `
        <div class="command-top">
          <div>
            <div class="cmd-name">${escapeHtml(c.cmd)}</div>
            <div class="cmd-desc">${escapeHtml(c.desc)}</div>
          </div>
          <div class="cmd-meta">
            ${c.level ? `<div class="level-badge">Lv ${c.level}</div>` : `<div class="badge">制限なし</div>`}
            <button class="copy-btn" data-cmd="${escapeHtml(c.cmd)}" aria-label="コマンドをコピー">コピー</button>
          </div>
        </div>
      `;
      commandsListEl.appendChild(card);
    });

    // コピーイベント
    commandsListEl.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const text = btn.getAttribute('data-cmd');
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'コピー済';
          setTimeout(()=> btn.textContent = 'コピー', 1200);
        } catch {
          // フォールバック
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); btn.textContent = 'コピー済'; } catch {}
          ta.remove();
          setTimeout(()=> btn.textContent = 'コピー', 1200);
        }
      });
    });
  }

  function renderLevels(){
    levelsListEl.innerHTML = '';
    civLevels.forEach(l => {
      const card = document.createElement('div');
      card.className = 'level-card';
      card.innerHTML = `
        <h4>Lv ${l.level}</h4>
        <div class="level-list">
          <div class="level-item">
            <div>${escapeHtml(l.text)}</div>
            <div class="badge">解放</div>
          </div>
        </div>
      `;
      levelsListEl.appendChild(card);
    });
  }

  // 初期描画
  renderCommands();
  renderLevels();

  // 検索・フィルタ
  searchInput.addEventListener('input', () => {
    renderCommands(searchInput.value, showLockedCheckbox.checked);
  });
  showLockedCheckbox.addEventListener('change', () => {
    renderCommands(searchInput.value, showLockedCheckbox.checked);
  });

  // ヘルパー
  function escapeHtml(s){
    if(!s && s !== 0) return '';
    return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
  }
})();
