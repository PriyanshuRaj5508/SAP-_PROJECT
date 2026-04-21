// ─── MAINTENANCE ORDERS ────────────────────────────────────────────────────────

function renderOrders() {
  return `
  <div class="page-enter">
    ${breadcrumb(
      { label: 'Home', action: "switchTab('home')" },
      { label: 'Maintenance Orders' }
    )}
    <div class="page-title"><span class="page-title-icon">🔧</span>Maintenance Orders</div>

    <div class="search-bar">
      <input class="search-inp" placeholder="Search order, equipment, technician..." oninput="filterOrders(this.value)" id="order-search"/>
      <select class="filter-select" id="order-status-filter" onchange="filterOrders(document.getElementById('order-search').value)">
        <option value="">All Statuses</option>
        <option>In Progress</option><option>Released</option><option>Planned</option><option>Completed</option>
      </select>
      <select class="filter-select" id="order-prio-filter" onchange="filterOrders(document.getElementById('order-search').value)">
        <option value="">All Priorities</option>
        <option>Very High</option><option>High</option><option>Medium</option><option>Low</option>
      </select>
      <button class="btn btn-primary" onclick="openCreateOrder('')">+ Create Order</button>
    </div>

    <div class="panel">
      <div class="table-wrap">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Order No.</th><th>Type</th><th>Description</th><th>Equipment</th>
                <th>Priority</th><th>Status</th><th>Planned Date</th>
                <th>Technician</th><th>Est. Cost</th><th>Actual Cost</th><th>Progress</th>
              </tr>
            </thead>
            <tbody class="table-stagger" id="orders-tbody">
              ${ORDERS.map(o => orderRow(o)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

function orderRow(o) {
  const progColor = o.progress === 100 ? '#107E3E' : o.progress > 0 ? '#0070F2' : '#E0E0E0';
  return `<tr onclick="viewOrder('${o.id}')">
    <td><span style="color:var(--sap-blue);font-weight:600">${o.id}</span></td>
    <td><span class="badge badge-gray">${o.type}</span></td>
    <td style="max-width:200px">${o.desc}</td>
    <td><span class="badge badge-info" style="cursor:pointer" onclick="event.stopPropagation();viewAsset('${o.equip}')">${o.equip}</span></td>
    <td>${priorityDot(o.priority)}</td>
    <td>${statusBadge(o.status)}</td>
    <td style="font-size:12px">${o.planned}</td>
    <td style="font-size:12px">${o.tech}</td>
    <td style="font-weight:600">€${o.cost_est.toLocaleString()}</td>
    <td style="color:${o.cost_act > o.cost_est ? 'var(--sap-err)' : 'inherit'}">${o.cost_act > 0 ? '€' + o.cost_act.toLocaleString() : '—'}</td>
    <td>
      <div style="display:flex;align-items:center;gap:6px;min-width:80px">
        <div class="progress-bar" style="flex:1">
          <div class="progress-fill" style="width:${o.progress}%;background:${progColor}"></div>
        </div>
        <span style="font-size:11px;min-width:28px">${o.progress}%</span>
      </div>
    </td>
  </tr>`;
}

function filterOrders(text) {
  const statusF = document.getElementById('order-status-filter').value;
  const prioF   = document.getElementById('order-prio-filter').value;
  const tbody   = document.getElementById('orders-tbody');
  if (!tbody) return;
  const filtered = ORDERS.filter(o => {
    const t = text.toLowerCase();
    const matchText = !t || [o.id, o.desc, o.equip, o.tech].join(' ').toLowerCase().includes(t);
    const matchStatus = !statusF || o.status === statusF;
    const matchPrio   = !prioF   || o.priority === prioF;
    return matchText && matchStatus && matchPrio;
  });
  tbody.innerHTML = filtered.length === 0
    ? `<tr><td colspan="11" style="text-align:center;padding:32px;color:var(--sap-text-md)">No orders match your filters</td></tr>`
    : filtered.map(o => orderRow(o)).join('');
}

function viewOrder(id) {
  const o = ORDERS.find(x => x.id === id);
  if (!o) return;
  const a = ASSETS.find(x => x.id === o.equip);
  const laborCost    = Math.round(o.cost_est * 0.55);
  const matCost      = Math.round(o.cost_est * 0.30);
  const extCost      = Math.round(o.cost_est * 0.15);
  const overBudget   = o.cost_act > o.cost_est;

  document.getElementById('content').innerHTML = `
  <div class="page-enter">
    ${breadcrumb(
      { label: 'Home', action: "switchTab('home')" },
      { label: 'Maintenance Orders', action: "switchTab('orders')" },
      { label: o.id }
    )}
    <div class="page-title">
      🔧 ${o.desc}
      <span style="margin-left:4px">${statusBadge(o.status)}</span>
    </div>

    <div class="detail-actions">
      <button class="btn btn-primary" onclick="showToast('Operations confirmed for ${o.id}', 'ok')">Confirm Operations</button>
      <button class="btn btn-ghost" onclick="showToast('Work order sent to printer', 'info')">🖨 Print Work Order</button>
      <button class="btn btn-danger" onclick="showToast('Order closure workflow initiated', 'warn')">Close Order</button>
    </div>

    <div class="two-col">
      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Order Details</span></div>
          <div class="panel-body">
            <div class="detail-grid">
              <div class="field-row"><div class="field-lbl">Order Number</div><div class="field-val">${o.id}</div></div>
              <div class="field-row"><div class="field-lbl">Order Type</div><div class="field-val">${o.type}</div></div>
              <div class="field-row">
                <div class="field-lbl">Equipment</div>
                <div class="field-val link" onclick="viewAsset('${o.equip}')">${o.equip}</div>
              </div>
              <div class="field-row"><div class="field-lbl">Priority</div><div class="field-val">${priorityDot(o.priority)}</div></div>
              <div class="field-row"><div class="field-lbl">Planned Start</div><div class="field-val">${o.planned}</div></div>
              <div class="field-row"><div class="field-lbl">Est. Duration</div><div class="field-val">${o.duration}</div></div>
              <div class="field-row"><div class="field-lbl">Assigned Technician</div><div class="field-val">${o.tech}</div></div>
              <div class="field-row"><div class="field-lbl">Work Center</div><div class="field-val">MAINT-1000</div></div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Operations</span>
            <span style="font-size:11px;color:var(--sap-text-md)">${o.ops.length} operations</span>
          </div>
          <div class="panel-body">
            <div class="table-wrap">
              <table class="ops-table">
                <thead>
                  <tr><th>Op.</th><th>Description</th><th>Work Ctr.</th><th>Hrs</th><th>Status</th></tr>
                </thead>
                <tbody>
                  ${o.ops.map(op => `<tr>
                    <td style="font-weight:600">${op.no}</td>
                    <td>${op.desc}</td>
                    <td style="font-size:11px">${op.wc}</td>
                    <td>${op.hrs}h</td>
                    <td>${statusBadge(op.status)}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Cost Summary</span></div>
          <div class="panel-body">
            <div class="kpi-mini-row">
              <div class="kpi-mini">
                <div class="kpi-mini-val">€${o.cost_est.toLocaleString()}</div>
                <div class="kpi-mini-lbl">Estimated</div>
              </div>
              <div class="kpi-mini ${overBudget ? 'err' : 'ok'}">
                <div class="kpi-mini-val">€${o.cost_act.toLocaleString()}</div>
                <div class="kpi-mini-lbl">Actual</div>
              </div>
            </div>
            ${overBudget ? `<div class="notif-banner err" style="margin-bottom:10px;font-size:12px">⚠ Actual cost exceeds estimate by €${(o.cost_act - o.cost_est).toLocaleString()}</div>` : ''}
            <div class="field-lbl" style="margin-bottom:8px">Completion Progress</div>
            <div class="progress-bar" style="height:12px;margin-bottom:4px">
              <div class="progress-fill" style="width:${o.progress}%;background:${o.progress===100?'#107E3E':'#0070F2'}"></div>
            </div>
            <div style="font-size:12px;color:var(--sap-text-md);margin-bottom:12px">${o.progress}% complete</div>
            <div class="section-hdr">Cost Components (Estimated)</div>
            <div class="stat-mini"><span style="font-size:12px">Labor</span><span style="font-size:12px">€${laborCost.toLocaleString()} (55%)</span></div>
            <div class="stat-mini"><span style="font-size:12px">Materials &amp; Spare Parts</span><span style="font-size:12px">€${matCost.toLocaleString()} (30%)</span></div>
            <div class="stat-mini"><span style="font-size:12px">External Services</span><span style="font-size:12px">€${extCost.toLocaleString()} (15%)</span></div>
          </div>
        </div>

        ${a ? `
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Equipment Info</span></div>
          <div class="panel-body">
            <div class="stat-mini">
              <span class="field-lbl">Equipment</span>
              <span class="field-val link" style="font-size:12px" onclick="viewAsset('${a.id}')">${a.name}</span>
            </div>
            <div class="stat-mini"><span class="field-lbl">Status</span>${statusBadge(a.status)}</div>
            <div class="stat-mini"><span class="field-lbl">Location</span><span style="font-size:12px">${a.loc}</span></div>
            <div class="stat-mini"><span class="field-lbl">Criticality</span>${priorityDot(a.criticality)}</div>
            <div class="stat-mini"><span class="field-lbl">Availability</span>${availBar(a.avail)}</div>
          </div>
        </div>` : ''}
      </div>
    </div>
  </div>`;
}
