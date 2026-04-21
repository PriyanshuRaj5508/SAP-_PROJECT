// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ASSETS = [
  {
    id: 'EQ-1001', name: 'Centrifugal Pump CP-400', plant: '1000', loc: 'PUMP-HALL-A',
    cat: 'Pump', status: 'Active', criticality: 'High',
    install: '2019-03-15', last_maint: '2026-01-22', next_maint: '2026-04-28',
    mtbf: '2,340h', avail: 98.2, cost_ytd: 12400, orders: 3,
    manufacturer: 'Siemens AG', model: 'CP-PRO-400', serial: 'SN-1001-2019'
  },
  {
    id: 'EQ-1002', name: 'Air Compressor AC-150', plant: '1000', loc: 'UTIL-ROOM-B',
    cat: 'Compressor', status: 'Under Maintenance', criticality: 'Medium',
    install: '2020-07-01', last_maint: '2026-03-10', next_maint: '2026-04-20',
    mtbf: '1,800h', avail: 91.5, cost_ytd: 8750, orders: 5,
    manufacturer: 'Atlas Copco', model: 'AC-150-GX', serial: 'SN-1002-2020'
  },
  {
    id: 'EQ-1003', name: 'Heat Exchanger HE-220', plant: '1000', loc: 'PROCESS-AREA-C',
    cat: 'Heat Exchanger', status: 'Active', criticality: 'High',
    install: '2018-11-20', last_maint: '2026-02-14', next_maint: '2026-05-14',
    mtbf: '3,100h', avail: 99.1, cost_ytd: 5200, orders: 1,
    manufacturer: 'Alfa Laval', model: 'HE-220-T', serial: 'SN-1003-2018'
  },
  {
    id: 'EQ-1004', name: 'Electric Motor EM-75KW', plant: '1000', loc: 'DRIVE-UNIT-D',
    cat: 'Motor', status: 'Active', criticality: 'Low',
    install: '2021-04-09', last_maint: '2026-03-01', next_maint: '2026-06-01',
    mtbf: '5,000h', avail: 99.7, cost_ytd: 1800, orders: 1,
    manufacturer: 'ABB Ltd.', model: 'EM-75-IE4', serial: 'SN-1004-2021'
  },
  {
    id: 'EQ-1005', name: 'Cooling Tower CT-600', plant: '1000', loc: 'OUTDOOR-ZONE-E',
    cat: 'Cooling', status: 'Breakdown', criticality: 'High',
    install: '2017-06-30', last_maint: '2026-04-12', next_maint: 'Overdue',
    mtbf: '1,200h', avail: 74.3, cost_ytd: 31200, orders: 8,
    manufacturer: 'SPX Cooling', model: 'CT-600-IND', serial: 'SN-1005-2017'
  },
  {
    id: 'EQ-1006', name: 'Conveyor Belt CB-12M', plant: '1000', loc: 'PROD-LINE-F',
    cat: 'Conveyor', status: 'Active', criticality: 'Medium',
    install: '2022-01-15', last_maint: '2026-02-28', next_maint: '2026-05-28',
    mtbf: '2,800h', avail: 96.8, cost_ytd: 4300, orders: 2,
    manufacturer: 'Interroll', model: 'CB-12M-HD', serial: 'SN-1006-2022'
  }
];

const ORDERS = [
  {
    id: 'ORD-5001', type: 'PM01', desc: 'Annual Inspection — CP-400 Pump',
    equip: 'EQ-1001', priority: 'Medium', status: 'Released',
    planned: '2026-04-28', duration: '4h', tech: 'Hans M.',
    cost_est: 2800, cost_act: 0, progress: 0,
    ops: [
      { no: '0010', desc: 'Safety Lockout / LOTO Procedure', wc: 'MAINT-1000', hrs: 0.5, status: 'Planned' },
      { no: '0020', desc: 'Visual & Dimensional Inspection', wc: 'MAINT-1000', hrs: 1.5, status: 'Planned' },
      { no: '0030', desc: 'Bearing & Seal Inspection', wc: 'MAINT-1000', hrs: 1.5, status: 'Planned' },
      { no: '0040', desc: 'Reassembly & Function Test', wc: 'MAINT-1000', hrs: 0.5, status: 'Planned' },
    ]
  },
  {
    id: 'ORD-5002', type: 'PM02', desc: 'Bearing Replacement — AC-150 Compressor',
    equip: 'EQ-1002', priority: 'High', status: 'In Progress',
    planned: '2026-04-19', duration: '6h', tech: 'Priya S.',
    cost_est: 4200, cost_act: 1800, progress: 43,
    ops: [
      { no: '0010', desc: 'Safety Lockout / LOTO Procedure', wc: 'MAINT-1000', hrs: 0.5, status: 'Completed' },
      { no: '0020', desc: 'Disassembly of Compressor Head', wc: 'MAINT-1000', hrs: 2.0, status: 'Completed' },
      { no: '0030', desc: 'Bearing Replacement & Lubrication', wc: 'MAINT-1000', hrs: 2.5, status: 'In Progress' },
      { no: '0040', desc: 'Reassembly & Pressure Test', wc: 'MAINT-1000', hrs: 1.0, status: 'Planned' },
    ]
  },
  {
    id: 'ORD-5003', type: 'PM03', desc: 'Emergency Repair — CT-600 Breakdown',
    equip: 'EQ-1005', priority: 'Very High', status: 'In Progress',
    planned: '2026-04-18', duration: '12h', tech: 'Klaus B.',
    cost_est: 18000, cost_act: 12400, progress: 69,
    ops: [
      { no: '0010', desc: 'Fault Diagnosis & Root Cause Analysis', wc: 'MAINT-1000', hrs: 1.0, status: 'Completed' },
      { no: '0020', desc: 'Cooling Fan Motor Replacement', wc: 'MAINT-1000', hrs: 4.0, status: 'Completed' },
      { no: '0030', desc: 'Fill Media & Basin Cleaning', wc: 'MAINT-1000', hrs: 4.0, status: 'In Progress' },
      { no: '0040', desc: 'Control Panel Rewiring', wc: 'ELEC-1000', hrs: 2.0, status: 'Planned' },
      { no: '0050', desc: 'Performance Test & Commissioning', wc: 'MAINT-1000', hrs: 1.0, status: 'Planned' },
    ]
  },
  {
    id: 'ORD-5004', type: 'PM01', desc: 'Lubrication Service — EM-75KW Motor',
    equip: 'EQ-1004', priority: 'Low', status: 'Completed',
    planned: '2026-03-01', duration: '1h', tech: 'Raj K.',
    cost_est: 350, cost_act: 310, progress: 100,
    ops: [
      { no: '0010', desc: 'Motor Bearing Lubrication', wc: 'MAINT-1000', hrs: 0.5, status: 'Completed' },
      { no: '0020', desc: 'Vibration & Temperature Check', wc: 'MAINT-1000', hrs: 0.5, status: 'Completed' },
    ]
  },
  {
    id: 'ORD-5005', type: 'PM02', desc: 'Tube Bundle Cleaning — HE-220',
    equip: 'EQ-1003', priority: 'Medium', status: 'Planned',
    planned: '2026-05-14', duration: '8h', tech: 'Hans M.',
    cost_est: 6500, cost_act: 0, progress: 0,
    ops: [
      { no: '0010', desc: 'System Isolation & Draining', wc: 'MAINT-1000', hrs: 1.0, status: 'Planned' },
      { no: '0020', desc: 'Tube Bundle Removal', wc: 'MAINT-1000', hrs: 2.0, status: 'Planned' },
      { no: '0030', desc: 'Chemical Cleaning Process', wc: 'CHEM-1000', hrs: 3.0, status: 'Planned' },
      { no: '0040', desc: 'Reinstallation & Leak Test', wc: 'MAINT-1000', hrs: 2.0, status: 'Planned' },
    ]
  },
  {
    id: 'ORD-5006', type: 'PM01', desc: 'Belt Tension Check — CB-12M Conveyor',
    equip: 'EQ-1006', priority: 'Low', status: 'Planned',
    planned: '2026-05-28', duration: '2h', tech: 'Priya S.',
    cost_est: 900, cost_act: 0, progress: 0,
    ops: [
      { no: '0010', desc: 'Belt Tension & Alignment Check', wc: 'MAINT-1000', hrs: 1.0, status: 'Planned' },
      { no: '0020', desc: 'Roller & Pulley Inspection', wc: 'MAINT-1000', hrs: 0.5, status: 'Planned' },
      { no: '0030', desc: 'Drive Unit Lubrication', wc: 'MAINT-1000', hrs: 0.5, status: 'Planned' },
    ]
  }
];

const INSP_PLANS = [
  {
    id: 'IP-301', desc: 'Rotating Equipment — Monthly Check',
    freq: 'Monthly', equip_cnt: 4,
    last: '2026-03-31', next: '2026-04-30', status: 'Due Soon'
  },
  {
    id: 'IP-302', desc: 'Pressure Safety Valve — Quarterly Test',
    freq: 'Quarterly', equip_cnt: 6,
    last: '2026-01-15', next: '2026-04-15', status: 'Overdue'
  },
  {
    id: 'IP-303', desc: 'Electrical Insulation Resistance Test',
    freq: 'Annual', equip_cnt: 12,
    last: '2025-09-01', next: '2026-09-01', status: 'On Track'
  },
  {
    id: 'IP-304', desc: 'Cooling System — Weekly Level Check',
    freq: 'Weekly', equip_cnt: 2,
    last: '2026-04-14', next: '2026-04-21', status: 'Due Soon'
  }
];

const COST_MONTHLY = [4200, 5100, 8800, 7300, 12400, 9600, 6200, 5400, 4800, 3200, 2900, 0];
const COST_MONTHS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
