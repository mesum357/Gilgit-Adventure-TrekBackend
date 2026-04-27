const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'reviews');
fs.mkdirSync(uploadsDir, { recursive: true });

// Multer config for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const allowed = ['.jpeg', '.jpg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  }
});

// GET /api/reviews (public — approved + legacy only)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({
      $or: [{ status: 'approved' }, { status: { $exists: false } }]
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/reviews/all (admin — all reviews including pending)
router.get('/all', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json(reviews);
  } catch (err) {
    console.error('Get reviews error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/reviews/public (public — no auth, pending approval)
router.post('/public', function (req, res, next) {
  upload.single('photo')(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'Photo must be under 5MB' });
      return res.status(400).json({ message: 'Invalid file upload' });
    }
    next();
  });
}, validate(schemas.publicReview), async (req, res) => {
  try {
    const { name, rating, text, avatarUrl } = req.body;
    const avatar = req.file ? '/uploads/reviews/' + req.file.filename : (avatarUrl || '');

    const review = await Review.create({
      name,
      rating,
      text,
      avatar,
      verified: false,
      status: 'pending'
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit review' });
  }
});

// POST /api/reviews (auth)
router.post('/', auth, async (req, res) => {
  try {
    const review = await Review.create(req.body);
    if (req.app.locals.clearApiCache) req.app.locals.clearApiCache();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create review' });
  }
});

// PUT /api/reviews/:id (auth)
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (req.app.locals.clearApiCache) req.app.locals.clearApiCache();
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update review' });
  }
});

// DELETE /api/reviews/:id (auth)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (req.app.locals.clearApiCache) req.app.locals.clearApiCache();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
