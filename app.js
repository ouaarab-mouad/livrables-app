const express = require('express');
const session = require('express-session');
const app = express();
const methodOverride = require('method-override');
const connectDB = require('./models/db');
const livreRoutes = require('./routes/livres');
const bodyParser = require('body-parser');
const empruntRoutes = require('./routes/emprunts');
const MongoStore = require('connect-mongo');
const indexRoutes = require('./routes/index');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Set port
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure session - consolidated into a single configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-very-secret-key-12345',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://warabmoad:9QYTF00AjWJmtpFT@cluster0.cdkrawh.mongodb.net/livrables?retryWrites=true&w=majority',
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    sameSite: 'lax'
  }
}));

// Add this debug middleware right after session config
app.use((req, res, next) => {
  console.log('Session Debug:', {
    id: req.sessionID,
    data: req.session,
    cookies: req.cookies
  });
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://warabmoad:9QYTF00AjWJmtpFT@cluster0.cdkrawh.mongodb.net/livrables?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/emprunts', empruntRoutes);
app.use('/livres', livreRoutes);
app.use('/', indexRoutes);

// Login route (GET)
app.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

// Login route (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, sessionID: req.sessionID });
  
  // Hardcoded credentials (admin/admin)
  if (username === 'admin' && password === 'admin') {
    req.session.isLoggedIn = true;
    req.session.user = { username: 'admin' };
    
    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).render('auth/login', { error: 'Session error occurred' });
      }
      console.log('Login successful, redirecting to home');
      return res.redirect('/home');
    });
  } else {
    console.log('Login failed: Invalid credentials');
    res.render('auth/login', { error: 'Invalid credentials!' });
  }
});

// Home page - Add authentication check
app.get('/home', (req, res) => {
  console.log('Home page access:', { 
    sessionID: req.sessionID, 
    isLoggedIn: req.session.isLoggedIn 
  });
  
  if (!req.session.isLoggedIn) {
    console.log('Unauthorized access attempt to home page');
    return res.redirect('/login');
  }
  res.render('home');
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

const etudiantRoutes = require('./routes/etudiants');
app.use('/etudiants', etudiantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).render('error', { 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/login`);
});
