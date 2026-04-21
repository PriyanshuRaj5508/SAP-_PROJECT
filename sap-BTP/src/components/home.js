// ─── HOME / LAUNCHPAD ─────────────────────────────────────────────────────────

function renderHome() {
  const totalCost = ASSETS.reduce((s, a) => s + a.cost_ytd, 0);
  const breakdowns = ASSETS.filter(a => a.status === 'Breakdown').length;
  const openOrders = ORDERS.filter(o => o.status === 'In Progress' || o.status === 'Released').length;

  return `
  <div class="page-enter">
    <div class="notif-banner err">
      <span>⚠</span>
      <span>3 maintenance items require attention today. Cooling Tower CT-600 is in
      <strong>Breakdown</strong> status — Emergency order ORD-5003 is in progress.</span>
    </div>

    ${breadcrumb({ label: 'SAP Fiori Launchpad', action: '' })}
    <div class="page-title">
      <span class="page-title-icon">🏭</span>
      Plant Maintenance &amp; Asset Lifecycle Management
    </div>

    <div class="kpi-row">
      <div class="kpi ok">
        <div class="kpi-val">${ASSETS.length}</div>
        <div class="kpi-lbl">Total Equipment</div>
        <div class="kpi-delta delta-up">▲ 98.2% avg. availability</div>
      </div>
      <div class="kpi warn">
        <div class="kpi-val">${openOrders}</div>
        <div class="kpi-lbl">Open Work Orders</div>
        <div class="kpi-delta delta-dn">▼ 1 overdue inspection</div>
      </div>
      <div class="kpi err">
        <div class="kpi-val">${breakdowns}</div>
        <div class="kpi-lbl">Breakdown Events</div>
        <div class="kpi-delta delta-dn">▲ CT-600 Cooling Tower</div>
      </div>
      <div class="kpi">
        <div class="kpi-val">€${(totalCost / 1000).toFixed(0)}K</div>
        <div class="kpi-lbl">YTD Maintenance Cost</div>
        <div class="kpi-delta delta-dn">▲ +18% vs. prior year</div>
      </div>
    </div>

    <div class="launchpad">
      <div class="tile" onclick="switchTab('assets')">
        <div class="tile-icon">⚙</div>
        <div class="tile-num">${ASSETS.length}</div>
        <div class="tile-title">Equipment Register</div>
        <div class="tile-sub">View &amp; manage equipment master data, specs, and history</div>
      </div>
      <div class="tile warn" onclick="switchTab('orders')">
        <div class="tile-badge">${openOrders}</div>
        <div class="tile-icon">🔧</div>
        <div class="tile-num">${ORDERS.length}</div>
        <div class="tile-title">Maintenance Orders</div>
        <div class="tile-sub">Work orders, technician assignments &amp; progress tracking</div>
      </div>
      <div class="tile warn" onclick="switchTab('inspection')">
        <div class="tile-badge">1</div>
        <div class="tile-icon">✅</div>
        <div class="tile-num">${INSP_PLANS.length}</div>
        <div class="tile-title">Inspection Plans</div>
        <div class="tile-sub">Schedule &amp; track preventive inspection tasks</div>
      </div>
      <div class="tile" onclick="switchTab('costs')">
        <div class="tile-icon">📊</div>
        <div class="tile-num">€${(totalCost / 1000).toFixed(0)}K</div>
        <div class="tile-title">Cost Analysis</div>
        <div class="tile-sub">Budget tracking, YTD actuals &amp; cost breakdown</div>
      </div>
    </div>

    <div class="two-col">
      <div class="panel">
        <div class="panel-hdr">
          <span class="panel-hdr-title">Recent Activity</span>
          <span style="font-size:11px;color:var(--sap-text-md)">Last 30 days</span>
        </div>
        <div class="panel-body">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot" style="background:#BB0000"></div>
              <div>
                <div class="tl-title">CT-600 Breakdown Reported</div>
                <div class="tl-date">Apr 18, 2026 — Klaus B. — Emergency order ORD-5003 created</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:#E9730C"></div>
              <div>
                <div class="tl-title">Bearing Replacement Started — AC-150</div>
                <div class="tl-date">Apr 19, 2026 — Priya S. — ORD-5002 in progress</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:#107E3E"></div>
              <div>
                <div class="tl-title">Lubrication Service Completed — EM-75KW</div>
                <div class="tl-date">Mar 01, 2026 — Raj K. — ORD-5004 closed, cost: €310</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:#0070F2"></div>
              <div>
                <div class="tl-title">Annual Inspection Planned — CP-400</div>
                <div class="tl-date">Feb 20, 2026 — System — ORD-5001 auto-generated</div>
              </div>
            </div>
            <div class="tl-item">
              <div class="tl-dot" style="background:#6E6E6E"></div>
              <div>
                <div class="tl-title">HE-220 Tube Bundle Cleaning Scheduled</div>
                <div class="tl-date">Feb 10, 2026 — Hans M. — ORD-5005 planned for May 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Equipment Status</span></div>
          <div class="panel-body">
            <div class="stat-mini">
              <span>Active</span>
              ${statusBadge('Active')}&nbsp;<strong>4</strong>
            </div>
            <div class="stat-mini">
              <span>Under Maintenance</span>
              ${statusBadge('Under Maintenance')}&nbsp;<strong>1</strong>
            </div>
            <div class="stat-mini">
              <span>Breakdown</span>
              ${statusBadge('Breakdown')}&nbsp;<strong>1</strong>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Upcoming Maintenance</span></div>
          <div class="panel-body">
            <div class="stat-mini">
              <span style="font-size:12px">CT-600 Emergency Repair</span>
              <span class="badge badge-err">Today</span>
            </div>
            <div class="stat-mini">
              <span style="font-size:12px">AC-150 Bearing Replacement</span>
              <span class="badge badge-err">Today</span>
            </div>
            <div class="stat-mini">
              <span style="font-size:12px">IP-302 PSV Quarterly Test</span>
              <span class="badge badge-err">Overdue</span>
            </div>
            <div class="stat-mini">
              <span style="font-size:12px">CP-400 Annual Inspection</span>
              <span style="font-size:11px;color:#888">Apr 28</span>
            </div>
            <div class="stat-mini">
              <span style="font-size:12px">HE-220 Tube Cleaning</span>
              <span style="font-size:11px;color:#888">May 14</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
