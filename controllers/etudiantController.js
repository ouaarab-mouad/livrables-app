const Etudiant = require('../models/Etudiant');

exports.listEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find().sort({ createdAt: -1 });
    res.render('etudiants/list', { etudiants });
  } catch (err) {
    console.error(err);
    res.redirect('/home');
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndDelete(req.params.id);
    res.redirect('/etudiants');
  } catch (err) {
    console.error(err);
    res.redirect('/etudiants');
  }
};

exports.showAddForm = (req, res) => {
    res.render('etudiants/add');
  };
  
  exports.addEtudiant = async (req, res) => {
    try {
      const newEtudiant = new Etudiant({
        student_id: req.body.student_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
      });
      
      await newEtudiant.save();
      res.redirect('/etudiants');
    } catch (err) {
      console.error(err);
      res.render('etudiants/add', { error: "Erreur lors de l'ajout" });
    }
  };

  exports.showEditForm = async (req, res) => {
    try {
      const etudiant = await Etudiant.findById(req.params.id);
      res.render('etudiants/edit', { etudiant });
    } catch (err) {
      console.error(err);
      res.redirect('/etudiants');
    }
  };
  
  exports.updateEtudiant = async (req, res) => {
    try {
      const { student_id, first_name, last_name, email, phone } = req.body;
      
      await Etudiant.findByIdAndUpdate(req.params.id, {
        student_id,
        first_name,
        last_name,
        email,
        phone
      });
      
      res.redirect('/etudiants');
    } catch (err) {
      console.error(err);
      res.redirect(`/etudiants/${req.params.id}/edit`);
    }
  };