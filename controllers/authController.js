exports.showLogin = (req, res) => {
    res.render('auth/login', { error: null });
  };
  
  exports.login = (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'admin') {
      req.session.regenerate(err => {
        if (err) {
          console.error('Session regeneration error:', err);
          return res.render('auth/login', { error: 'Session error' });
        }
        
        req.session.isLoggedIn = true;
        req.session.user = { username: 'admin' };
        
        req.session.save(err => {
          if (err) {
            console.error('Session save error:', err);
            return res.render('auth/login', { error: 'Session error' });
          }
          return res.redirect('/home');
        });
      });
    } else {
      res.render('auth/login', { error: 'Invalid credentials' });
    }
  };
  
  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destruction error:', err);
      }
      res.redirect('/login');
    });
  };