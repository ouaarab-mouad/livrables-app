const Etudiant = require('../models/Etudiant');
const Livre = require('../models/Livre');
const Emprunt = require('../models/Emprunt');

exports.getDashboard = async (req, res) => {
  try {
    // Get counts from database
    const [etudiantsCount, livresCount, empruntsCount] = await Promise.all([
      Etudiant.countDocuments(),
      Livre.countDocuments(),
      Emprunt.countDocuments({ status: 'borrowed' })
    ]);

    // Sample recent activities (replace with real data later)
    const activities = [
      {
        icon: 'fas fa-user-plus',
        title: 'Nouvel étudiant inscrit',
        description: 'Jean Dupont a été ajouté au système',
        time: '10 min ago'
      },
      {
        icon: 'fas fa-book',
        title: 'Nouveau livre ajouté',
        description: 'L\'Étranger par Albert Camus',
        time: '1h ago'
      },
      {
        icon: 'fas fa-exchange-alt',
        title: 'Nouvel emprunt',
        description: 'Marie Martin a emprunté Le Petit Prince',
        time: '2h ago'
      }
    ];

    res.render('home', {
      stats: {
        etudiantsCount,
        livresCount,
        empruntsCount
      },
      activities
    });
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
};