const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  altText: { type: String, default: '' },
  category: { type: String, default: '' },
  hidden: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

galleryImageSchema.index({ sortOrder: 1 });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
