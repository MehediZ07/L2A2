import { pool } from '../../config/database';

export const createVehicle = async (vehicleData: any) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicleData;
  
  const result = await pool.query(
    'INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );

  return result.rows[0];
};

export const getAllVehicles = async () => {
  const result = await pool.query('SELECT * FROM vehicles ORDER BY id');
  return result.rows;
};

export const getVehicleById = async (vehicleId: string) => {
  const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [vehicleId]);
  return result.rows[0];
};

export const updateVehicle = async (vehicleId: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE vehicles SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, vehicleId]
  );

  return result.rows[0];
};

export const deleteVehicle = async (vehicleId: string) => {
  const activeBookings = await pool.query(
    'SELECT id FROM bookings WHERE vehicle_id = $1 AND status = $2',
    [vehicleId, 'active']
  );

  if (activeBookings.rows.length > 0) {
    throw new Error('Cannot delete vehicle with active bookings');
  }

  const result = await pool.query('DELETE FROM vehicles WHERE id = $1', [vehicleId]);
  return (result.rowCount ?? 0) > 0;
};