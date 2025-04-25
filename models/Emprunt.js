const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Etudiant', 
    required: true 
  },
  book_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Livre', 
    required: true 
  },
  borrow_date: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  return_date: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['borrowed', 'returned', 'overdue'], 
    default: 'borrowed' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Emprunt', empruntSchema);