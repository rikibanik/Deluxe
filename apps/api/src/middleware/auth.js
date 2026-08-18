// Session and PAT authentication middleware.

export function requireSession(req, res, next) {
  // TODO (M1): validate session cookie
  next();
}

export function requirePat(req, res, next) {
  // TODO (M2): validate personal access token
  next();
}
