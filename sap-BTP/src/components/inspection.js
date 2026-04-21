// ─── INSPECTION PLANS ─────────────────────────────────────────────────────────

function renderInspection() {
  return `
  <div class="page-enter">
    ${breadcrumb({ label: 'Home', action: "switchTab('home')" }, { label: 'Inspection Plans' })}
    <div class="page-title"><span class="page-title-icon">✅</span>Inspection Plans</div>

    <div class="search-bar">
      <input class="search-inp" placeholder="Search inspection plans..."/>
      <button class="btn btn-primary" onclick="showToast('Inspection plan creation form opened', 'info')">+ Create Plan</button>
    </div>

    <div class="panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan ID</th><th>Description</th><th>Frequency</th>
              <th>Equipment Count</th><th>Last Executed</th><th>Next Due</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody class="table-stagger">
            ${INSP_PLANS.map(p => `
            <tr>
              <td><span style="color:var(--sap-blue);font-weight:600">${p.id}</span></td>
              <td>${p.desc}</td>
              <td><span class="badge badge-info">${p.freq}</span></td>
              <td style="text-align:center">${p.equip_cnt}</td>
              <td style="font-size:12px">${p.last}</td>
              <td style="font-size:12px;color:${p.status === 'Overdue' ? 'var(--sap-err)' : p.status === 'Due Soon' ? 'var(--sap-warn)' : 'inherit'};font-weight:${p.status !== 'On Track' ? '600' : '400'}">
                ${p.next}
              </td>
              <td>${statusBadge(p.status)}</td>
              <td>
                <span class="tbl-action" onclick="showToast('Inspection ${p.id} executed', 'ok')">▶ Execute</span>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel">
      <div class="panel-hdr">
        <span class="panel-hdr-title">Maintenance Calendar — April / May 2026</span>
        <span style="font-size:11px;color:var(--sap-text-md)">Gantt view</span>
      </div>
      <div class="panel-body">
        <div style="margin-bottom:12px">
          ${[
            { name: 'CT-600 Emergency', left: 56, width: 6, color: '#BB0000', label: 'Apr 18-24' },
            { name: 'AC-150 Bearing', left: 60, width: 4, color: '#E9730C', label: 'Apr 19-21' },
            { name: 'IP-302 PSV Test', left: 50, width: 3, color: '#BB0000', label: 'OVERDUE' },
            { name: 'CP-400 Annual', left: 89, width: 3, color: '#0070F2', label: 'Apr 28' },
            { name: 'HE-220 Cleaning', left: 98, width: 5, color: '#6E6E6E', label: 'May 14' },
            { name: 'CB-12M Belt Check', left: 110, width: 2, color: '#107E3E', label: 'May 28' },
          ].map(row => `
          <div class="gantt-row">
            <span style="font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--sap-text-md)">${row.name}</span>
            <div class="gantt-track">
              <div class="gantt-bar" style="left:${row.left / 1.3}%;width:${row.width / 1.3}%;background:${row.color}">
                ${row.label}
              </div>
            </div>
          </div>`).join('')}
        </div>
        <div class="cal-legend">
          <div class="cal-legend-item"><div class="cal-legend-dot" style="background:#BB0000"></div>Emergency / Overdue</div>
          <div class="cal-legend-item"><div class="cal-legend-dot" style="background:#E9730C"></div>High Priority</div>
          <div class="cal-legend-item"><div class="cal-legend-dot" style="background:#0070F2"></div>Planned</div>
          <div class="cal-legend-item"><div class="cal-legend-dot" style="background:#107E3E"></div>On Track</div>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── COST ANALYSIS ────────────────────────────────────────────────────────────

function renderCosts() {
  const total = ASSETS.reduce((s, a) => s + a.cost_ytd, 0);
  const budget = 75000;
  const pct = Math.round((total / budget) * 100);
  const sorted = [...ASSETS].sort((a, b) => b.cost_ytd - a.cost_ytd);
  const maxCost = sorted[0].cost_ytd;
  const circumference = 2 * Math.PI * 48;

  return `
  <div class="page-enter">
    ${breadcrumb({ label: 'Home', action: "switchTab('home')" }, { label: 'Cost Analysis' })}
    <div class="page-title"><span class="page-title-icon">📊</span>Cost Analysis — YTD 2026</div>

    <div class="kpi-row">
      <div class="kpi">
        <div class="kpi-val">€${(total / 1000).toFixed(1)}K</div>
        <div class="kpi-lbl">Total YTD Cost</div>
      </div>
      <div class="kpi err">
        <div class="kpi-val">€31.2K</div>
        <div class="kpi-lbl">Emergency / Corrective</div>
        <div class="kpi-delta delta-dn">49% of total</div>
      </div>
      <div class="kpi ok">
        <div class="kpi-val">€32.5K</div>
        <div class="kpi-lbl">Preventive</div>
        <div class="kpi-delta delta-up">51% of total</div>
      </div>
      <div class="kpi warn">
        <div class="kpi-val">€${budget.toLocaleString()}</div>
        <div class="kpi-lbl">Annual Budget</div>
        <div class="kpi-delta delta-dn">${pct}% consumed</div>
      </div>
    </div>

    <div class="two-col">
      <div class="panel">
        <div class="panel-hdr"><span class="panel-hdr-title">Cost by Equipment</span></div>
        <div class="panel-body">
          ${sorted.map(a => `
          <div class="cost-bar-row">
            <div class="cost-bar-label">
              <span class="eq-name" onclick="viewAsset('${a.id}')">${a.name}</span>
              <span class="eq-cost">€${a.cost_ytd.toLocaleString()}</span>
            </div>
            <div class="progress-bar" style="height:10px">
              <div class="progress-fill" style="width:${Math.round((a.cost_ytd / maxCost) * 100)}%;background:${a.cost_ytd > 15000 ? '#BB0000' : a.cost_ytd > 5000 ? '#E9730C' : '#0070F2'}"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Budget Consumption</span></div>
          <div class="panel-body">
            <div class="donut-wrap">
              <svg viewBox="0 0 120 120" width="130" height="130" class="donut-chart">
                <circle class="donut-bg" cx="60" cy="60" r="48" stroke-width="16"/>
                <circle class="donut-fill" cx="60" cy="60" r="48"
                  stroke="#0070F2" stroke-width="16"
                  stroke-dasharray="${circumference * pct / 100} ${circumference * (1 - pct / 100)}"
                  stroke-dashoffset="${circumference * 0.25}"/>
                <text x="60" y="56" text-anchor="middle" font-size="18" font-weight="600" fill="#32363A">${pct}%</text>
                <text x="60" y="72" text-anchor="middle" font-size="9" fill="#6E6E6E">consumed</text>
              </svg>
            </div>
            <div class="stat-mini"><span class="field-lbl">Spent</span><span style="font-weight:600">€${total.toLocaleString()}</span></div>
            <div class="stat-mini"><span class="field-lbl">Remaining</span><span style="color:var(--sap-ok);font-weight:600">€${(budget - total).toLocaleString()}</span></div>
            <div class="stat-mini"><span class="field-lbl">Forecast EOY</span><span style="color:var(--sap-warn);font-weight:600">€92,000</span></div>
            <div class="notif-banner warn" style="font-size:11px;margin-top:10px">⚠ EOY forecast exceeds budget by €17,000</div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Cost Type Breakdown</span></div>
          <div class="panel-body">
            <div class="stat-mini"><span style="font-size:12px">Labor (Internal)</span><span style="font-size:12px">€28,400 (45%)</span></div>
            <div class="stat-mini"><span style="font-size:12px">Spare Parts</span><span style="font-size:12px">€19,100 (30%)</span></div>
            <div class="stat-mini"><span style="font-size:12px">External Services</span><span style="font-size:12px">€12,730 (20%)</span></div>
            <div class="stat-mini"><span style="font-size:12px">Other / Misc.</span><span style="font-size:12px">€3,420 (5%)</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ─── REPORTING ────────────────────────────────────────────────────────────────

function renderReport() {
  return `
  <div class="page-enter">
    ${breadcrumb({ label: 'Home', action: "switchTab('home')" }, { label: 'Reporting' })}
    <div class="page-title"><span class="page-title-icon">📈</span>Management Reporting</div>

    <div class="notif-banner ok">
      ✅ Overall fleet OEE: <strong>93.4%</strong> — Above industry benchmark of 90%.
      Cooling Tower CT-600 requires immediate attention.
    </div>

    <div class="panel">
      <div class="panel-hdr">
        <span class="panel-hdr-title">Equipment Reliability Summary</span>
        <button class="btn btn-ghost btn-sm" onclick="showToast('Exporting report to Excel...', 'info')">⬇ Export</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Equipment</th><th>Availability</th><th>MTBF</th>
              <th>Orders YTD</th><th>YTD Cost</th><th>Criticality</th><th>Recommendation</th>
            </tr>
          </thead>
          <tbody class="table-stagger">
            ${ASSETS.map(a => {
              const rec = a.avail > 98 ? { label: 'Continue PM schedule', cls: 'rec-green' }
                        : a.avail > 90 ? { label: 'Review PM frequency', cls: 'rec-amber' }
                        : a.avail > 80 ? { label: 'Increase inspection', cls: 'rec-amber' }
                        : { label: 'Consider replacement', cls: 'rec-red' };
              return `<tr>
                <td>
                  <span style="color:var(--sap-blue);cursor:pointer;font-weight:500" onclick="viewAsset('${a.id}')">${a.name}</span>
                </td>
                <td>${availBar(a.avail)}</td>
                <td>${a.mtbf}</td>
                <td style="text-align:center">${a.orders}</td>
                <td style="font-weight:600">€${a.cost_ytd.toLocaleString()}</td>
                <td>${priorityDot(a.criticality)}</td>
                <td><span class="rec-chip ${rec.cls}">${rec.label}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel">
      <div class="panel-hdr"><span class="panel-hdr-title">Key Performance Indicators</span></div>
      <div class="panel-body">
        <div class="kpi-row">
          <div class="kpi ok">
            <div class="kpi-val">93.4%</div>
            <div class="kpi-lbl">Fleet OEE</div>
            <div class="kpi-delta delta-up">▲ +2.1% vs. prior year</div>
          </div>
          <div class="kpi ok">
            <div class="kpi-val">2,373h</div>
            <div class="kpi-lbl">Avg. MTBF</div>
            <div class="kpi-delta delta-up">▲ Fleet average</div>
          </div>
          <div class="kpi warn">
            <div class="kpi-val">51%</div>
            <div class="kpi-lbl">Preventive vs. Corrective</div>
            <div class="kpi-delta">Target: 70% preventive</div>
          </div>
          <div class="kpi err">
            <div class="kpi-val">1</div>
            <div class="kpi-lbl">Breakdown Events YTD</div>
            <div class="kpi-delta delta-dn">CT-600 Cooling Tower</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
