import express from 'express'

import { findById, updateById } from '../actions'

const router = express.Router()

router.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  if (!res.locals.isLoggedIn) {
    res.redirect('/sign-in')
  } else {
    findById(userId)
    .then((member) => {
      res.render('users/profile', {member})
    })
  }
})

router.get("/users/:id/edit", (req, res, next) => {
  const member = req.params.id;
  if (!res.locals.isLoggedIn) {
    res.redirect('/sign-in')
  } else {
    findById(member)
    .then((member) => {
      res.status(200).render("users/edit-profile", {member});
    })
  }
})

router.put("/users/:id", (req, res, next) => {
  const {name, email} = req.body
  const member = req.params.id;
  updateById(name, email, member)
  .then(() => {
    res.json({REDIRECT_URL: `/users/${member}`})
  })
  .catch((err) => {
    console.log("error", err);
  })
})

export default router
