import db from '../db'

export default function signUp(user) {
  return db.one(`
    INSERT INTO
      members(name, email, encrypted_password)
    VALUES
      ($1,$2, $3)
    RETURNING
      *`, [user.name, user.email, user.password])
}
