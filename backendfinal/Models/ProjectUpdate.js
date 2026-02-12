const mongoose = require('mongoose');

const projectUpdateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  message: {
    type: String,
    required: true,
    trim: true
  }

}, { timestamps: true });

module.exports = mongoose.model('ProjectUpdate', projectUpdateSchema);
