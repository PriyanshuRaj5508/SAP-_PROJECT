// ─── MODALS ───────────────────────────────────────────────────────────────────
// closeModal() and saveModal() live in app.js

function openCreateOrder(equipId) {
  document.getElementById('modal-title').textContent = 'Create Maintenance Order';
  document.getElementById('modal-body').innerHTML = `
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Order Type *</label>
      <select class="form-select">
        <option>PM01 — Preventive Maintenance</option>
        <option>PM02 — Corrective Maintenance</option>
        <option>PM03 — Emergency Repair</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-lbl">Priority *</label>
      <select class="form-select">
        <option>Low</option><option selected>Medium</option>
        <option>High</option><option>Very High</option>
      </select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Equipment *</label>
      <select class="form-select">
        ${ASSETS.map(a => '<option value="' + a.id + '" ' + (a.id === equipId ? 'selected' : '') + '>' + a.id + ' — ' + a.name + '</option>').join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-lbl">Work Center</label>
      <input class="form-inp" value="MAINT-1000"/>
    </div>
  </div>
  <div class="form-group" style="margin-bottom:12px">
    <label class="form-lbl">Short Description *</label>
    <input class="form-inp" placeholder="Enter work description..."/>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Planned Start Date</label>
      <input class="form-inp" type="date" value="2026-04-28"/>
    </div>
    <div class="form-group">
      <label class="form-lbl">Estimated Duration (hrs)</label>
      <input class="form-inp" type="number" value="4" min="0.5" step="0.5"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Assigned Technician</label>
      <select class="form-select">
        <option>Hans M.</option><option>Priya S.</option>
        <option>Klaus B.</option><option>Raj K.</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-lbl">Estimated Cost (€)</label>
      <input class="form-inp" type="number" value="2500"/>
    </div>
  </div>
  <div class="form-group">
    <label class="form-lbl">Notes / Instructions</label>
    <textarea class="form-inp" placeholder="Enter additional instructions or safety notes..."></textarea>
  </div>`;
  document.getElementById('overlay').classList.add('show');
}

function openCreateAsset() {
  document.getElementById('modal-title').textContent = 'Create Equipment Master';
  document.getElementById('modal-body').innerHTML = `
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Equipment ID *</label>
      <input class="form-inp" placeholder="e.g. EQ-1007"/>
    </div>
    <div class="form-group">
      <label class="form-lbl">Category *</label>
      <select class="form-select">
        <option>Pump</option><option>Compressor</option><option>Motor</option>
        <option>Heat Exchanger</option><option>Cooling</option><option>Conveyor</option><option>Other</option>
      </select>
    </div>
  </div>
  <div class="form-group" style="margin-bottom:12px">
    <label class="form-lbl">Equipment Description *</label>
    <input class="form-inp" placeholder="e.g. Centrifugal Pump CP-500"/>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Plant *</label>
      <select class="form-select">
        <option>1000 — Hamburg</option><option>2000 — Berlin</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-lbl">Functional Location</label>
      <input class="form-inp" placeholder="e.g. PUMP-HALL-A"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Installation Date</label>
      <input class="form-inp" type="date" value="2026-04-20"/>
    </div>
    <div class="form-group">
      <label class="form-lbl">Criticality</label>
      <select class="form-select">
        <option>Low</option><option selected>Medium</option><option>High</option>
      </select>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label class="form-lbl">Manufacturer</label>
      <input class="form-inp" value="Siemens AG"/>
    </div>
    <div class="form-group">
      <label class="form-lbl">Model</label>
      <input class="form-inp" placeholder="e.g. PRO-500-X"/>
    </div>
  </div>
  <div class="form-group">
    <label class="form-lbl">Serial Number</label>
    <input class="form-inp" placeholder="e.g. SN-2026-001"/>
  </div>`;
  document.getElementById('overlay').classList.add('show');
}
