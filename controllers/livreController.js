const Livre = require('../models/Livre');

exports.listLivres = async (req, res) => {
  try {
    const livres = await Livre.find().sort({ title: 1 });
    res.render('livres/list', { livres });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
};

exports.showAddForm = (req, res) => {
  res.render('livres/add');
};

exports.addLivre = async (req, res) => {
    try {
      const { isbn, title, author, quantity } = req.body;
      
      // Add validation
      if (!isbn || !title || !author || !quantity) {
        return res.render('livres/add', { 
          error: "Tous les champs sont obligatoires" 
        });
      }
  
      const newLivre = new Livre({
        isbn: isbn.trim(),
        title: title.trim(),
        author: author.trim(),
        available_quantity: parseInt(quantity),
        total_quantity: parseInt(quantity)
      });
  
      await newLivre.save();
      res.redirect('/livres');
    } catch (err) {
      console.error(err);
      res.render('livres/add', { 
        error: err.code === 11000 ? "ISBN déjà existant" : "Erreur lors de l'ajout" 
      });
    }
  };

exports.deleteLivre = async (req, res) => {
  try {
    await Livre.findByIdAndDelete(req.params.id);
    res.redirect('/livres');
  } catch (err) {
    console.error(err);
    res.redirect('/livres');
  }
};

exports.showEditForm = async (req, res) => {
    try {
      const livre = await Livre.findById(req.params.id);
      res.render('livres/edit', { livre });
    } catch (err) {
      console.error(err);
      res.redirect('/livres');
    }
  };
  
  exports.updateLivre = async (req, res) => {
    try {
      const { isbn, title, author, total_quantity } = req.body;
      const livre = await Livre.findById(req.params.id);
      
      // Calculate new available quantity
      const borrowed = livre.total_quantity - livre.available_quantity;
      const newAvailable = total_quantity - borrowed;
      
      await Livre.findByIdAndUpdate(req.params.id, {
        isbn,
        title,
        author,
        total_quantity,
        available_quantity: newAvailable
      });
      
      res.redirect('/livres');
    } catch (err) {
      console.error(err);
      res.redirect(`/livres/${req.params.id}/edit`);
    }
  };