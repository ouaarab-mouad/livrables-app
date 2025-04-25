const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Etudiant', etudiantSchema);