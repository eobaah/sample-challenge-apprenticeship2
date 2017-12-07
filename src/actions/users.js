import db from '../db'

export function findById(member) {
  return db.one(`
    SELECT *
    FROM
      members
    WHERE members.id = $1
  `, [member])
}

export function updateById(name, email, id) {
  return db.oneOrNone(`
    UPDATE
      members
    SET
      name = $1,
      email = $2
    WHERE
      members.id = $3
  `, [name, email, id])
}
