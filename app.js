const express = require('express');
const app = express();
const methodOverride = require('method-override');
const connectDB = require('./models/db');
const livreRoutes = require('./routes/livres');
const bodyParser = require('body-parser');
const empruntRoutes = require('./routes/emprunts');
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

// Login route (POST) - Simple static check
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin') {
    res.redirect('/home');
  } else {
    res.render('auth/login', { error: 'Invalid credentials! Use admin/admin' });
  }
});

// Home page - No authentication check
app.get('/home', (req, res) => {
  res.render('home');
});

// Root route - Direct to login
app.get('/', (req, res) => {
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
  console.log(`Server running on http://localhost:${PORT}`);
});
