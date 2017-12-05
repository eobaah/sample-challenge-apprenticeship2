import db from '../db'

export default function signUp(name, email, encryptedPassword) {
  return db.one('INSERT INTO members(name, email, encrypted_password) VALUES($1,$2, $3) RETURNING *', [name, email, encryptedPassword])
}
