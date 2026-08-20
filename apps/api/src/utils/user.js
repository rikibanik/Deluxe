/**
 * @param {import('pg').QueryResultRow} row
 */
export function toPublicUser(row) {
  return {
    id: row.id ?? row.user_id,
    username: row.username,
    email: row.email,
    email_verified: row.email_verified,
    display_name: row.display_name ?? null,
    status: row.status ?? row.user_status,
    created_at: row.created_at,
  };
}
