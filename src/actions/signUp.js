import db from '../db'

export default function signUp(member) {
  return db.one(`
    INSERT INTO
      members(name, email, encrypted_password)
    VALUES
      ($1,$2, $3)
    RETURNING
      *`, [member.name, member.email, member.password])
}
