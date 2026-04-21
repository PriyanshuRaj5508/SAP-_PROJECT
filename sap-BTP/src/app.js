// ─── APP CONTROLLER ───────────────────────────────────────────────────────────

let currentTab = 'home';

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  document.querySelectorAll('.sidenav-item[data-tab]').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });

  renderContent(tab);

  if (window.innerWidth < 768) closeSidenav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderContent(tab, filterText) {
  if (filterText === undefined) filterText = '';
  tab = tab || currentTab;

  const c = document.getElementById('content');
  if (!c) return;

  try {
    switch (tab) {
      case 'home':       c.innerHTML = renderHome();             break;
      case 'assets':     c.innerHTML = renderAssets(filterText); break;
      case 'orders':     c.innerHTML = renderOrders();           break;
      case 'inspection': c.innerHTML = renderInspection();       break;
      case 'costs':      c.innerHTML = renderCosts();            break;
      case 'report':     c.innerHTML = renderReport();           break;
      default:           c.innerHTML = renderHome();             break;
    }
  } catch(err) {
    c.innerHTML = `<div class="notif-banner err">⚠ Render error: ${err.message}</div>`;
    console.error(err);
  }
}

// ─── SIDENAV ──────────────────────────────────────────────────────────────────

let sidenavOpen = false;

function toggleSidenav() {
  sidenavOpen = !sidenavOpen;
  if (sidenavOpen) {
    document.getElementById('sidenav').classList.add('open');
    document.body.classList.add('sidenav-open');
    let bd = document.getElementById('sidenav-backdrop');
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'sidenav-backdrop';
      bd.className = 'sidenav-backdrop show';
      bd.onclick = closeSidenav;
      document.body.appendChild(bd);
    } else {
      bd.classList.add('show');
    }
  } else {
    closeSidenav();
  }
}

function closeSidenav() {
  sidenavOpen = false;
  const nav = document.getElementById('sidenav');
  if (nav) nav.classList.remove('open');
  document.body.classList.remove('sidenav-open');
  const bd = document.getElementById('sidenav-backdrop');
  if (bd) bd.classList.remove('show');
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────

function closeModal() {
  const ov = document.getElementById('overlay');
  if (ov) ov.classList.remove('show');
}

function saveModal() {
  closeModal();
  showToast('Record saved successfully and released to system.', 'ok');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function init() {
  // Sidenav toggle
  const toggleBtn = document.getElementById('sidenavToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidenav);

  // Modal backdrop close
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (e.altKey) {
      const shortcuts = { '1':'home','2':'assets','3':'orders','4':'inspection','5':'costs','6':'report' };
      if (shortcuts[e.key]) { e.preventDefault(); switchTab(shortcuts[e.key]); }
    }
  });

  // Render initial page
  renderContent('home');
  setTimeout(() => showToast('SAP S/4HANA Plant Maintenance loaded', 'info'), 500);
}

// Run after all scripts are parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
