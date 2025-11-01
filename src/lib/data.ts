export const inventoryItems = [
  { id: 'ITM001', name: 'Whole Wheat Flour', category: 'Dry Goods', quantity: 150, unit: 'kg', expirationDate: '2024-12-31', status: 'In Stock' },
  { id: 'ITM002', name: 'Vegetable Oil', category: 'Cooking Oils', quantity: 80, unit: 'liters', expirationDate: '2025-05-20', status: 'In Stock' },
  { id: 'ITM003', name: 'Lentils', category: 'Legumes', quantity: 200, unit: 'kg', expirationDate: '2024-09-15', status: 'Expiring Soon' },
  { id: 'ITM004', name: 'Canned Tomatoes', category: 'Canned Goods', quantity: 300, unit: 'cans', expirationDate: '2026-01-10', status: 'In Stock' },
  { id: 'ITM005', name: 'Rice', category: 'Grains', quantity: 500, unit: 'kg', expirationDate: '2025-10-01', status: 'In Stock' },
  { id: 'ITM006', name: 'Sugar', category: 'Sweeteners', quantity: 90, unit: 'kg', expirationDate: '2025-11-22', status: 'In Stock' },
  { id: 'ITM007', name: 'Milk Powder', category: 'Dairy', quantity: 45, unit: 'kg', expirationDate: '2024-08-10', status: 'Expiring Soon' },
  { id: 'ITM008', name: 'Salt', category: 'Seasonings', quantity: 70, unit: 'kg', expirationDate: '2027-07-01', status: 'In Stock' },
];

export const model19Receipts = [
  { id: 'REC-2024-00123', date: '2024-07-15', supplier: 'Global Food Suppliers', status: 'Completed', items: 3 },
  { id: 'REC-2024-00124', date: '2024-07-18', supplier: 'Agro-Producers Inc.', status: 'Pending', items: 5 },
  { id: 'REC-2024-00125', date: '2024-07-20', supplier: 'FarmFresh Co-op', status: 'Completed', items: 2 },
  { id: 'REC-2024-00126', date: '2024-07-21', supplier: 'National Millers', status: 'In-Transit', items: 1 },
];

export const auditLogs = [
    { id: 1, timestamp: '2024-07-22 14:35:12', user: 'admin@afarrhb.org', module: 'Inventory', action: 'CREATE', details: 'Added new item: ITM008 (Salt)' },
    { id: 2, timestamp: '2024-07-22 11:20:45', user: 'manager@afarrhb.org', module: 'Receipts', action: 'UPDATE', details: 'Updated status of REC-2024-00124 to Pending' },
    { id: 3, timestamp: '2024-07-21 09:05:00', user: 'staff@afarrhb.org', module: 'Inventory', action: 'EDIT', details: 'Updated quantity for ITM003 (Lentils) to 200kg' },
    { id: 4, timestamp: '2024-07-20 16:50:21', user: 'admin@afarrhb.org', module: 'Users', action: 'CREATE', details: 'Created new user: newstaff@afarrhb.org' },
    { id: 5, timestamp: '2024-07-19 13:00:15', user: 'manager@afarrhb.org', module: 'Tracking', action: 'UPDATE', details: 'Vehicle AF-002 checked in at Adama' },
    { id: 6, timestamp: '2024-07-18 10:15:30', user: 'staff@afarrhb.org', module: 'Receipts', action: 'CREATE', details: 'Created new receipt REC-2024-00124' },
];

export const vehicles = [
  { id: 'AF-001', driver: 'Abebe Bikila', status: 'On Route', lastCheckIn: 'Awash', lastCheckInTime: '2024-07-22 13:00', route: ['Addis Ababa', 'Awash', 'Dire Dawa'], position: { lat: 9.0, lng: 40.16 } },
  { id: 'AF-002', driver: 'Fatuma Roba', status: 'Idle', lastCheckIn: 'Adama', lastCheckInTime: '2024-07-22 09:45', route: ['Adama', 'Mojo'], position: { lat: 8.55, lng: 39.27 } },
  { id: 'AF-003', driver: 'Kenenisa Bekele', status: 'On Route', lastCheckIn: 'Debre Birhan', lastCheckInTime: '2024-07-22 14:15', route: ['Addis Ababa', 'Debre Birhan', 'Dessie'], position: { lat: 9.68, lng: 39.53 } },
];

export const inventorySummaryChartData = [
  { month: 'January', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'February', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'March', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'April', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'May', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'June', total: Math.floor(Math.random() * 2000) + 1000 },
  { month: 'July', total: Math.floor(Math.random() * 2000) + 1000 },
];
