/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {boolean} email_verified
 * @property {string} [display_name]
 * @property {'pending'|'active'|'suspended'|'deleted'} status
 * @property {string} created_at
 */

/**
 * @typedef {Object} Repository
 * @property {string} id
 * @property {string} owner_id
 * @property {string} name
 * @property {string} [description]
 * @property {'public'|'private'} visibility
 * @property {string} default_branch
 * @property {boolean} is_empty
 * @property {number} size_bytes
 * @property {string} [pushed_at]
 * @property {string} created_at
 */

export {};
