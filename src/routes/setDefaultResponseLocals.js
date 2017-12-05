export default function setDefaultResponseLocals(req, res, next) {
  if (req.session.user) {
    res.locals.isLoggedIn = false
  } else {
    next()
  }
}
