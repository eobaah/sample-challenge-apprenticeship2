import db from '../db'

export default function signIn(email) {
  return db.oneOrNone('SELECT * FROM members WHERE email=$1', [email])
}
