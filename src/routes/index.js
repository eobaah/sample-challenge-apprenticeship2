import express from 'express'

import isLoggedIn from './isLoggedIn'
import albums from './albums'
import authentication from './authentication'
import users from './users'

const routes = express.Router()

routes.use(isLoggedIn)

routes.get('/', (req, res) => res.redirect('/albums'))
routes.use('/', authentication)
routes.use('/', users)
routes.use('/albums', albums)

export default routes
