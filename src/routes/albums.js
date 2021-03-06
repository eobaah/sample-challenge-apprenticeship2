import express from 'express'

import {
  getAlbums,
  getAlbumById,
} from '../actions'

const router = express.Router()

router.get('/', (req, res, next) => {
  if (res.locals.isLoggedIn) {
    getAlbums()
      .then(albums => res.render('albums/index', {albums}))
      .catch(next)
  } else {
    res.redirect('/sign-in?redirect=albums')
  }
})

router.get('/:albumID', (req, res, next) => {
  if (res.locals.isLoggedIn) {
    getAlbumById(req.params.albumID)
      .then(album => res.render('albums/album', {album}))
      .catch(next)
  } else {
    res.redirect(`/sign-in?redirect=albums/${req.params.albumID}`)
  }
})

export default router
