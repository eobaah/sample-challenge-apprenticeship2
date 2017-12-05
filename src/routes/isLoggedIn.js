export default function isLoggedIn(req, res, next) {
  if (req.session.user) {
    res.locals.isLoggedIn = true
  }
  next()
}
