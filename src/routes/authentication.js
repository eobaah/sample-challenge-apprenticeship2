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
  const {name, email, password} = req.body
  signUp(name, email, password)
    .then((newUser) => {
      req.session.user = newUser
      res.json({REDIRECT_URL: '/'})
    })
})


router.get('/sign-in', (req, res, next) => {
  if (res.locals.isLoggedIn) {
    res.redirect('/')
  } else {
    res.render('authentication/sign-in')
  }
})

router.post('/sign-in', (req, res, next) => {
  const {email, password} = req.body
  signIn(email)
    .then((existingUser) => {
      if(!existingUser){
        res.render('authentication/sign-in', {'error':'invalid username or password' })
      }
      req.session.user = newUser
      res.json({REDIRECT_URL: '/'})
    })
})

router.delete('/logout', (req, res, next) => {
  req.session.destroy()
  res.json({REDIRECT_URL: '/sign-in'})
})

export default router
