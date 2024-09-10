const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('File', fileSchema);
