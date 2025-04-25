const Emprunt = require('../models/Emprunt');
const Etudiant = require('../models/Etudiant');
const Livre = require('../models/Livre');

// List all borrowings
exports.listEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find()
      .populate('student_id', 'first_name last_name student_id')
      .populate('book_id', 'title author isbn')
      .sort({ borrow_date: -1 });
    
    res.render('emprunts/list', { emprunts });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
};

// Show add form
exports.showAddForm = async (req, res) => {
  try {
    const [etudiants, livres] = await Promise.all([
      Etudiant.find().sort({ last_name: 1 }),
      Livre.find({ available_quantity: { $gt: 0 } }).sort({ title: 1 })
    ]);
    
    res.render('emprunts/add', { etudiants, livres, error: null });
  } catch (err) {
    console.error(err);
    res.redirect('/emprunts');
  }
};

// Create new borrowing
exports.addEmprunt = async (req, res) => {
  try {
    const { student_id, book_id } = req.body;
    
    // Create borrowing
    const newEmprunt = new Emprunt({
      student_id,
      book_id
    });
    
    // Update book availability
    await Livre.findByIdAndUpdate(book_id, {
      $inc: { available_quantity: -1 }
    });
    
    await newEmprunt.save();
    res.redirect('/emprunts');
  } catch (err) {
    console.error(err);
    res.render('emprunts/add', { 
      error: "Erreur lors de l'emprunt" 
    });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    
    // Update borrowing record
    emprunt.return_date = new Date();
    emprunt.status = 'returned';
    await emprunt.save();
    
    // Update book availability
    await Livre.findByIdAndUpdate(emprunt.book_id, {
      $inc: { available_quantity: 1 }
    });
    
    res.redirect('/emprunts');
  } catch (err) {
    console.error(err);
    res.redirect('/emprunts');
  }
};