import express from 'express'

import {
  signUp,
  signIn,
} from '../actions'

const router = express.Router()


router.get('/sign-up', (req, res, next) => {
  if (res.locals.isLoggedIn) {
    res.redirect('/')
  } else {
    res.render('authentication/sign-up')
  }
})

router.post('/sign-up', (req, res, next) => {
  const {redirect} = req.query
  signUp(req.body)
    .then((newUser) => {
      req.session.user = newUser
      res.json({REDIRECT_URL: `/${redirect || ''}`})
    })
})

router.get('/sign-in', (req, res, next) => {
  if (res.locals.isLoggedIn) {
    res.redirect('/')
  } else {
    res.render('authentication/sign-in', {error: null})
  }
})

router.post('/sign-in', (req, res, next) => {
  const {redirect} = req.query
  const {email, password} = req.body
  signIn(email)
    .then((existingUser) => {
      if (!existingUser) {
        res.json({error: 'Invalid username or password'})
      } else if (password === existingUser.encrypted_password) {
        req.session.user = existingUser
        res.json({REDIRECT_URL: `/${redirect || ''}`})
      } else {
        res.json({error: 'Invalid username or password'})
      }
    })
})

router.delete('/logout', (req, res, next) => {
  req.session.destroy()
  res.json({REDIRECT_URL: '/sign-in'})
})

export default router
