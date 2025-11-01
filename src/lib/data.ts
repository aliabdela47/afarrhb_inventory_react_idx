export const inventoryItems = [
  { id: 'ITM001', itemcode: 'FL-WW-01', name: 'Whole Wheat Flour', description: 'Organic whole wheat flour for baking.', category: 'Dry Goods', warehouse: 'WH-Main', unit: 'kg', quantity: 150, modelnumber: 'MOD-54321', expirationDate: '2024-12-31', status: 'In Stock' },
  { id: 'ITM002', itemcode: 'OIL-VEG-01', name: 'Vegetable Oil', description: 'Pure vegetable oil for cooking.', category: 'Cooking Oils', warehouse: 'WH-Main', unit: 'liters', quantity: 80, modelnumber: 'MOD-54322', expirationDate: '2025-05-20', status: 'In Stock' },
  { id: 'ITM003', itemcode: 'LEG-LEN-01', name: 'Lentils', description: 'Red lentils, split.', category: 'Legumes', warehouse: 'WH-North', unit: 'kg', quantity: 200, modelnumber: 'MOD-54323', expirationDate: '2024-09-15', status: 'Expiring Soon' },
  { id: 'ITM004', itemcode: 'CAN-TOM-01', name: 'Canned Tomatoes', description: 'Diced tomatoes in juice.', category: 'Canned Goods', warehouse: 'WH-Main', unit: 'cans', quantity: 300, modelnumber: 'MOD-54324', expirationDate: '2026-01-10', status: 'In Stock' },
  { id: 'ITM005', itemcode: 'GRN-RICE-01', name: 'Rice', description: 'Long grain white rice.', category: 'Grains', warehouse: 'WH-South', unit: 'kg', quantity: 500, modelnumber: 'MOD-54325', expirationDate: '2025-10-01', status: 'In Stock' },
  { id: 'ITM006', itemcode: 'SWT-SUG-01', name: 'Sugar', description: 'Refined white sugar.', category: 'Sweeteners', warehouse: 'WH-Main', unit: 'kg', quantity: 90, modelnumber: 'MOD-54326', expirationDate: '2025-11-22', status: 'In Stock' },
  { id: 'ITM007', itemcode: 'DRY-MILK-01', name: 'Milk Powder', description: 'Full cream milk powder.', category: 'Dairy', warehouse: 'WH-North', unit: 'kg', quantity: 45, modelnumber: 'MOD-54327', expirationDate: '2024-08-10', status: 'Expiring Soon' },
  { id: 'ITM008', itemcode: 'SEA-SALT-01', name: 'Salt', description: 'Iodized table salt.', category: 'Seasonings', warehouse: 'WH-South', unit: 'kg', quantity: 70, modelnumber: 'MOD-54328', expirationDate: '2027-07-01', status: 'In Stock' },
];

export const categories = [
  { id: 'CAT001', name: 'Dry Goods', parentcategoryid: null, description: 'Shelf-stable dry food items.' },
  { id: 'CAT002', name: 'Cooking Oils', parentcategoryid: null, description: 'Various types of cooking oils.' },
  { id: 'CAT003', name: 'Legumes', parentcategoryid: 'CAT001', description: 'Beans, lentils, and peas.' },
  { id: 'CAT004', name: 'Canned Goods', parentcategoryid: null, description: 'Food items preserved in cans.' },
  { id: 'CAT005', name: 'Grains', parentcategoryid: 'CAT001', description: 'Rice, wheat, and other grains.' },
];

export const warehouses = [
    { id: 'WH-Main', name: 'Main Warehouse', location: 'Addis Ababa', capacity: 10000, manager: 'John Doe' },
    { id: 'WH-North', name: 'Northern Hub', location: 'Mekelle', capacity: 5000, manager: 'Jane Smith' },
    { id: 'WH-South', name: 'Southern Hub', location: 'Hawassa', capacity: 7500, manager: 'Peter Jones' },
];

export const employees = [
    { id: 'EMP001', fullname: 'Abebe Bikila', employeeid: 'EID-001', directorateid: 'DIR-Health', position: 'Manager', phone: '123-456-7890', email: 'abebe@example.com', isactive: true },
    { id: 'EMP002', fullname: 'Fatuma Roba', employeeid: 'EID-002', directorateid: 'DIR-Logistics', position: 'Driver', phone: '123-456-7891', email: 'fatuma@example.com', isactive: true },
    { id: 'EMP003', fullname: 'Kenenisa Bekele', employeeid: 'EID-003', directorateid: 'DIR-Logistics', position: 'Driver', phone: '123-456-7892', email: 'kenenisa@example.com', isactive: false },
];

export const customers = [
    { id: 'CUS001', name: 'Red Cross', contactname: 'John Smith', phone: '987-654-3210', email: 'john@redcross.org', address: '123 Red Cross St', type: 'NGO', isactive: true },
    { id: 'CUS002', name: 'WFP', contactname: 'Maria Garcia', phone: '987-654-3211', email: 'maria@wfp.org', address: '456 WFP Ave', type: 'UN Agency', isactive: true },
    { id: 'CUS003', name: 'Local Clinic', contactname: 'Dr. Alemayehu', phone: '987-654-3212', email: 'alemayehu@clinic.com', address: '789 Clinic Rd', type: 'Health Facility', isactive: false },
];

export const directorates = [
    { id: 'DIR001', name: 'Health', code: 'HLTH', parentunit: null, directorname: 'Dr. John Doe', phone: '111-222-3333', address: 'Health Dept Bldg', is_active: true },
    { id: 'DIR002', name: 'Logistics', code: 'LOG', parentunit: null, directorname: 'Jane Smith', phone: '444-555-6666', address: 'Logistics Center', is_active: true },
    { id: 'DIR003', name: 'Maternal and Child Health', code: 'MCH', parentunit: 'DIR001', directorname: 'Dr. Emily White', phone: '777-888-9999', address: 'Health Dept Bldg, Wing A', is_active: true },
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
