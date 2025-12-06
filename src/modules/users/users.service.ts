import { pool } from '../../config/database';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, phone, role FROM users ORDER BY id');
  return result.rows;
};

export const updateUser = async (userId: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const result = await pool.query(
    `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING id, name, email, phone, role`,
    [...values, userId]
  );

  return result.rows[0];
};

export const deleteUser = async (userId: string) => {
  const activeBookings = await pool.query(
    'SELECT id FROM bookings WHERE customer_id = $1 AND status = $2',
    [userId, 'active']
  );

  if (activeBookings.rows.length > 0) {
    throw new Error('Cannot delete user with active bookings');
  }

  const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  return (result.rowCount ?? 0) > 0;
};