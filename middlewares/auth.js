module.exports = {
    ensureAuthenticated: (req, res, next) => {
      console.log('Session:', req.session); // Add this for debugging
      if (req.session && req.session.isLoggedIn) {
        return next();
      }
      res.redirect('/login');
    }
  };