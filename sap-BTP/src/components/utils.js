// ─── UTILITIES ────────────────────────────────────────────────────────────────

function statusBadge(s) {
  const map = {
    'Active':             'badge-active',
    'Under Maintenance':  'badge-warn',
    'Breakdown':          'badge-err',
    'Released':           'badge-info',
    'In Progress':        'badge-warn',
    'Completed':          'badge-active',
    'Planned':            'badge-gray',
    'Due Soon':           'badge-warn',
    'Overdue':            'badge-err',
    'On Track':           'badge-active'
  };
  return `<span class="badge ${map[s] || 'badge-gray'}">${s}</span>`;
}

function priorityDot(p) {
  const map = { 'Very High': 'p-high', 'High': 'p-high', 'Medium': 'p-med', 'Low': 'p-low' };
  return `<span class="priority-dot ${map[p] || 'p-low'}"></span>${p}`;
}

function availBar(pct, label = true) {
  const color = pct > 95 ? '#107E3E' : pct > 85 ? '#E9730C' : '#BB0000';
  return `<div class="avail-inline">
    <div class="progress-bar" style="width:64px">
      <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
    </div>
    ${label ? `<span>${pct}%</span>` : ''}
  </div>`;
}

function breadcrumb(...parts) {
  return `<div class="breadcrumb">
    ${parts.map((p, i) => {
      if (i === parts.length - 1) return `<span>${p.label}</span>`;
      return `<span class="bc-link" onclick="${p.action}">${p.label}</span><span class="bc-sep">›</span>`;
    }).join('')}
  </div>`;
}

function showToast(msg, type = 'ok') {
  const icons = {
    ok:   '✔',
    err:  '✖',
    info: 'ℹ',
    warn: '⚠'
  };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || icons.ok}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => {
    el.classList.add('dismissing');
    setTimeout(() => el.remove(), 220);
  }, 3200);
}
