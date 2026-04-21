// ─── EQUIPMENT REGISTER ────────────────────────────────────────────────────────

function renderAssets(filterText = '') {
  const filtered = filterText
    ? ASSETS.filter(a =>
        [a.id, a.name, a.cat, a.loc, a.status].join(' ')
          .toLowerCase().includes(filterText.toLowerCase()))
    : ASSETS;

  return `
  <div class="page-enter">
    ${breadcrumb(
      { label: 'Home', action: "switchTab('home')" },
      { label: 'Equipment Register' }
    )}
    <div class="page-title">
      <span class="page-title-icon">⚙</span>
      Equipment Register
      <span style="font-size:13px;font-weight:400;color:var(--sap-text-md)">(${filtered.length} records)</span>
    </div>

    <div class="search-bar">
      <input class="search-inp" id="asset-search" placeholder="Search ID, name, location..."
        value="${filterText}" oninput="renderContent('assets', this.value)" />
      <select class="filter-select" onchange="renderContent('assets', document.getElementById('asset-search').value)">
        <option>All Categories</option>
        <option>Pump</option><option>Compressor</option><option>Motor</option>
        <option>Heat Exchanger</option><option>Cooling</option><option>Conveyor</option>
      </select>
      <button class="btn btn-primary" onclick="openCreateAsset()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Create Equipment
      </button>
      <button class="btn btn-icon" onclick="showToast('Exporting to Excel...', 'info')">⬇ Export</button>
    </div>

    <div class="panel">
      <div class="table-wrap">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Equipment ID</th>
                <th>Description</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Criticality</th>
                <th>Availability</th>
                <th>Next Maint.</th>
                <th>YTD Cost</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody class="table-stagger">
              ${filtered.length === 0
                ? `<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--sap-text-md)">No equipment found</td></tr>`
                : filtered.map(a => `
                <tr onclick="viewAsset('${a.id}')">
                  <td><span style="color:var(--sap-blue);font-weight:600;cursor:pointer">${a.id}</span></td>
                  <td><strong>${a.name}</strong></td>
                  <td><span class="badge badge-gray">${a.cat}</span></td>
                  <td style="font-size:12px">${a.loc}</td>
                  <td>${statusBadge(a.status)}</td>
                  <td>${priorityDot(a.criticality)}</td>
                  <td>${availBar(a.avail)}</td>
                  <td style="font-size:12px;color:${a.next_maint === 'Overdue' ? 'var(--sap-err)' : 'inherit'};font-weight:${a.next_maint === 'Overdue' ? '600' : '400'}">${a.next_maint}</td>
                  <td style="font-weight:600">€${a.cost_ytd.toLocaleString()}</td>
                  <td><span class="badge badge-info">${a.orders}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

function viewAsset(id) {
  const a = ASSETS.find(x => x.id === id);
  if (!a) return;
  const relOrders = ORDERS.filter(o => o.equip === id);
  const c = document.getElementById('content');
  c.innerHTML = `
  <div class="page-enter">
    ${breadcrumb(
      { label: 'Home', action: "switchTab('home')" },
      { label: 'Equipment Register', action: "switchTab('assets')" },
      { label: a.id }
    )}
    <div class="page-title">
      <span class="page-title-icon">⚙</span>
      ${a.name}
      <span style="margin-left:4px">${statusBadge(a.status)}</span>
    </div>

    <div class="detail-actions">
      <button class="btn btn-primary" onclick="openCreateOrder('${a.id}')">+ Create Maintenance Order</button>
      <button class="btn btn-ghost" onclick="showToast('Equipment master opened for editing', 'info')">Edit Equipment</button>
      <button class="btn btn-ghost" onclick="showToast('Label sent to printer', 'ok')">🖨 Print Label</button>
      <button class="btn btn-icon" onclick="showToast('Generating PDF report...', 'info')">⬇ Export</button>
    </div>

    <div class="two-col">
      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">General Data</span></div>
          <div class="panel-body">
            <div class="detail-grid">
              <div class="field-row">
                <div class="field-lbl">Equipment ID</div>
                <div class="field-val">${a.id}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Category</div>
                <div class="field-val">${a.cat}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Plant</div>
                <div class="field-val">${a.plant} — Hamburg</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Location</div>
                <div class="field-val">${a.loc}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Installation Date</div>
                <div class="field-val">${a.install}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Criticality</div>
                <div class="field-val">${priorityDot(a.criticality)}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">MTBF</div>
                <div class="field-val">${a.mtbf}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Availability</div>
                <div class="field-val">${availBar(a.avail)}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Manufacturer</div>
                <div class="field-val">${a.manufacturer}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Model</div>
                <div class="field-val">${a.model}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Serial No.</div>
                <div class="field-val">${a.serial}</div>
              </div>
              <div class="field-row">
                <div class="field-lbl">Asset Class</div>
                <div class="field-val">Technical Object</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Maintenance History</span>
            <span style="font-size:11px;color:var(--sap-text-md)">${relOrders.length} orders</span>
          </div>
          <div class="panel-body">
            <div class="timeline">
              ${relOrders.length === 0
                ? `<div style="color:var(--sap-text-md);font-size:13px;padding:8px 0">No maintenance orders found.</div>`
                : relOrders.map(o => `
                <div class="tl-item" style="cursor:pointer" onclick="viewOrder('${o.id}')">
                  <div class="tl-dot" style="background:${o.status==='Completed'?'#107E3E':o.status==='In Progress'?'#E9730C':'#0070F2'}"></div>
                  <div>
                    <div class="tl-title">${o.desc}</div>
                    <div class="tl-date">${o.planned} — ${o.tech} — ${statusBadge(o.status)}</div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="panel">
          <div class="panel-hdr"><span class="panel-hdr-title">Performance Metrics</span></div>
          <div class="panel-body">
            <div class="field-row">
              <div class="field-lbl">YTD Maintenance Cost</div>
              <div class="field-val" style="font-size:20px;font-weight:300">€${a.cost_ytd.toLocaleString()}</div>
            </div>
            <div class="field-row">
              <div class="field-lbl">Total Orders This Year</div>
              <div class="field-val">${a.orders}</div>
            </div>
            <div class="field-row">
              <div class="field-lbl">Last Maintenance</div>
              <div class="field-val">${a.last_maint}</div>
            </div>
            <div class="field-row">
              <div class="field-lbl">Next Planned Maint.</div>
              <div class="field-val" style="color:${a.next_maint === 'Overdue' ? 'var(--sap-err)' : 'inherit'}">${a.next_maint}</div>
            </div>
            <div style="margin-top:12px">
              <div class="field-lbl" style="margin-bottom:8px">Overall Equipment Availability</div>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="progress-bar" style="flex:1;height:14px">
                  <div class="progress-fill" style="width:${a.avail}%;background:${a.avail>95?'#107E3E':a.avail>85?'#E9730C':'#BB0000'}"></div>
                </div>
                <span style="font-size:15px;font-weight:600">${a.avail}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
