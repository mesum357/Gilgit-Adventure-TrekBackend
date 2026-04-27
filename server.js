require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB (cached for serverless)
const dbReady = connectDB();

// Trust proxy for Vercel/serverless (required for rate limiting)
app.set('trust proxy', 1);

// Middleware — CORS (frontend is same-origin; this covers admin/external tools)
const allowedOrigins = [
  'https://gilgitadventuretreks.com',
  'https://www.gilgitadventuretreks.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow same-origin requests (no origin header) and whitelisted origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));

// Gzip compression for all responses
app.use(compression());

// Security headers via helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disabled — inline scripts and external resources are used
  crossOriginEmbedderPolicy: false, // Allows loading cross-origin images/videos
  hsts: { maxAge: 31536000, includeSubDomains: true } // 1 year HSTS
}));

// Rate limiters with proxy support
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false } // Disable validation, we handle it via app.set
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: { message: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false }
});

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false }
});

// Apply a limiter only for specific HTTP methods (e.g. POST submissions)
function limitMethods(limiter, methods) {
  const allowed = new Set(methods.map(m => String(m).toUpperCase()));
  return (req, res, next) => (allowed.has(req.method) ? limiter(req, res, next) : next());
}

// Apply rate limiters
app.use('/api/auth', authLimiter);
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/users/forgot-password', authLimiter);
app.use('/api/users/reset-password', authLimiter);
// Only limit *submission* style endpoints on POST so admin GETs don't get 429'd.
app.use('/api/bookings', limitMethods(submitLimiter, ['POST']));
app.use('/api/contact', limitMethods(submitLimiter, ['POST']));
app.use('/api/subscribers', limitMethods(submitLimiter, ['POST']));
app.use('/api/chat', limitMethods(submitLimiter, ['POST']));
app.use('/api/ai', limitMethods(submitLimiter, ['POST']));
app.use('/api/reviews/public', limitMethods(submitLimiter, ['POST']));
app.use('/api', apiLimiter);

// Static asset caching (helmet already handles security headers)
app.use((req, res, next) => {
  const url = req.url;
  if (url.match(/\.(css|js|jpg|jpeg|png|gif|webp|svg|ico|woff2?|mp4)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
  }
  next();
});

// SEO routes (robots.txt, sitemaps) — before static files
app.use('/', require('./routes/seo'));

function resolvePublicDir() {
  const candidates = [
    process.env.FRONTEND_PATH,
    path.join(__dirname, '..', 'Frontend'),
    path.join(__dirname, '..', 'frontend'),
    path.join(__dirname, '..', 'Gilgit-Adventure-TrekFrontend')
  ].filter(Boolean);
  for (const c of candidates) {
    const abs = path.isAbsolute(c) ? c : path.join(__dirname, c);
    if (fs.existsSync(abs)) return abs;
  }
  return __dirname;
}

function resolveAdminDir() {
  const candidates = [
    process.env.ADMIN_PATH,
    path.join(__dirname, '..', 'admin'),
    path.join(__dirname, '..', 'Admin'),
    path.join(__dirname, '..', 'Gilgit-Adventure-TrekAdmin')
  ].filter(Boolean);
  for (const c of candidates) {
    const abs = path.isAbsolute(c) ? c : path.join(__dirname, c);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

// Serve uploaded files (review photos, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files — public site (VPS: ensure Frontend/ sits next to backend, or set FRONTEND_PATH)
const publicDir = resolvePublicDir();
if (publicDir === __dirname) {
  console.warn('Frontend not found: use ../Frontend, ../Gilgit-Adventure-TrekFrontend, or set FRONTEND_PATH in backend .env');
}

// Serve index.html with embedded API data — eliminates the fetch round-trip
app.get(['/', '/index.html'], async (req, res) => {
  try {
    // Read and cache the HTML file
    if (!indexHtmlCache) {
      indexHtmlCache = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
    }

    // Get API data from cache or DB
    let data = apiCache.data;
    if (!data || (Date.now() - apiCache.timestamp) >= apiCache.ttl) {
      await dbReady;
      const [destinations, reviews, videos, gallery, team, settings] = await Promise.all([
        require('./models/Destination').find().sort({ id: 1 }).lean(),
        require('./models/Review').find({ $or: [{ status: 'approved' }, { status: { $exists: false } }] }).sort({ createdAt: -1 }).lean(),
        require('./models/Video').find().sort({ sortOrder: 1 }).lean(),
        require('./models/GalleryImage').find().sort({ sortOrder: 1 }).lean(),
        require('./models/TeamMember').find().sort({ sortOrder: 1 }).lean(),
        require('./models/SiteSettings').getSettings()
      ]);
      data = { destinations, reviews, videos, gallery, team, settings };
      apiCache.data = data;
      apiCache.timestamp = Date.now();
    }

    // Inject data into HTML before </head>
    // Escape </script> and <!-- to prevent XSS via database content
    const safeJson = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    const injection = '<script>window.__inlineData=' + safeJson + '</script>';
    const html = indexHtmlCache.replace('</head>', injection + '\n</head>');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.send(html);
  } catch (err) {
    // Fallback to static file if injection fails
    res.sendFile(path.join(publicDir, 'index.html'));
  }
});

app.use(express.static(publicDir));

const adminDir = resolveAdminDir();
if (adminDir) {
  app.use('/admin', express.static(adminDir, { index: 'index.html' }));
}

// Health check / warmup endpoint (fast, triggers DB connection early)
app.get('/api/health', async (req, res) => {
  try {
    const conn = await dbReady;
    if (!conn) throw new Error('DB not configured');
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false });
  }
});

// In-memory cache for API responses (2 min TTL)
const apiCache = { data: null, timestamp: 0, ttl: 2 * 60 * 1000 };
const pageCache = {};
let indexHtmlCache = null;

// Clear all caches — called by admin routes after any data change
function clearApiCache() {
  apiCache.data = null;
  apiCache.timestamp = 0;
  indexHtmlCache = null;
  Object.keys(pageCache).forEach(k => delete pageCache[k]);
}
app.locals.clearApiCache = clearApiCache;

// Combined public data endpoint — single request instead of 6 + site settings
app.get('/api/public-data', async (req, res) => {
  try {
    // Return cached response if fresh
    if (apiCache.data && (Date.now() - apiCache.timestamp) < apiCache.ttl) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=120');
      return res.json(apiCache.data);
    }

    await dbReady;
    const SiteSettings = require('./models/SiteSettings');
    const [destinations, reviews, videos, gallery, team, settings] = await Promise.all([
      require('./models/Destination').find().sort({ id: 1 }).lean(),
      require('./models/Review').find({ $or: [{ status: 'approved' }, { status: { $exists: false } }] }).sort({ createdAt: -1 }).lean(),
      require('./models/Video').find().sort({ sortOrder: 1 }).lean(),
      require('./models/GalleryImage').find().sort({ sortOrder: 1 }).lean(),
      require('./models/TeamMember').find().sort({ sortOrder: 1 }).lean(),
      SiteSettings.getSettings()
    ]);
    const result = { destinations, reviews, videos, gallery, team, settings };

    // Cache the result
    apiCache.data = result;
    apiCache.timestamp = Date.now();

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// Lightweight endpoint — only settings + specific collections (faster for subpages)
app.get('/api/page-data', async (req, res) => {
  try {
    const need = (req.query.need || '').split(',').filter(Boolean);
    const cacheKey = need.sort().join(',');

    // Return cached response if fresh (2 min)
    if (pageCache[cacheKey] && (Date.now() - pageCache[cacheKey].ts) < 120000) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=120');
      return res.json(pageCache[cacheKey].data);
    }

    await dbReady;
    const SiteSettings = require('./models/SiteSettings');
    const queries = { settings: SiteSettings.getSettings() };

    if (need.includes('destinations')) queries.destinations = require('./models/Destination').find().sort({ id: 1 }).lean();
    if (need.includes('reviews')) queries.reviews = require('./models/Review').find({ $or: [{ status: 'approved' }, { status: { $exists: false } }] }).sort({ createdAt: -1 }).lean();
    if (need.includes('videos')) queries.videos = require('./models/Video').find().sort({ sortOrder: 1 }).lean();
    if (need.includes('gallery')) queries.gallery = require('./models/GalleryImage').find().sort({ sortOrder: 1 }).lean();
    if (need.includes('team')) queries.team = require('./models/TeamMember').find().sort({ sortOrder: 1 }).lean();

    const keys = Object.keys(queries);
    const values = await Promise.all(keys.map(k => queries[k]));
    const result = {};
    keys.forEach((k, i) => { result[k] = values[i]; });

    // Cache result
    pageCache[cacheKey] = { data: result, ts: Date.now() };

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// API Routes
app.use('/api/users', require('./routes/userAuth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/subscribers', require('./routes/subscribers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/team', require('./routes/team'));

// Chat AI route
app.use('/api/chat', require('./routes/chat'));

// AI Trip/Project Planner route
app.use('/api/ai', require('./routes/ai'));

// Seed route (for initial database setup on Vercel)
app.use('/api', require('./routes/seed'));

// Global error-handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler — SEO-friendly error page
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found — Gilgit Adventure Treks</title>
  <meta name="robots" content="noindex, follow">
  <style>
    body { font-family: 'Times New Roman', serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1B4332; text-align: center; }
    .container { max-width: 500px; padding: 2rem; }
    h1 { font-size: 4rem; margin: 0; color: #2D6A4F; }
    h2 { font-size: 1.5rem; margin: 0.5rem 0; }
    p { color: #64748b; line-height: 1.6; }
    a { color: #2D6A4F; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
    .btn { display: inline-block; padding: 0.75rem 2rem; background: #2D6A4F; color: #fff; border-radius: 8px; margin-top: 1rem; }
    .btn:hover { background: #1B4332; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <h2>Trail Not Found</h2>
    <p>Looks like this path doesn't lead anywhere. Even our best guides can't find this page! Let's get you back on track.</p>
    <a href="/" class="btn">Back to Base Camp</a>
    <p style="margin-top:2rem;"><a href="/destinations.html">Browse Destinations</a> &middot; <a href="/book.html">Book a Trek</a> &middot; <a href="/contact.html">Contact Us</a></p>
  </div>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;

// Prevent crashes from unhandled promise rejections and exceptions
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // Give time to log, then exit — PM2 will restart
  setTimeout(() => process.exit(1), 1000);
});

// Start server (needed for Render and local dev)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel serverless
module.exports = app;
