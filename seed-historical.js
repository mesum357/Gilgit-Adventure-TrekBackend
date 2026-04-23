require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const dest = {
  id: 12,
  name: 'Historical & Cultural Tours of Pakistan',
  country: 'Pakistan',
  category: 'heritage',
  featured: true,
  image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=500&fit=crop',
  rating: 4.8,
  reviews: 0,
  price: 1800,
  description: 'Pakistan is a land where ancient civilizations, Mughal heritage, Buddhist history, and vibrant living cultures come together. Historical and cultural tours offer travelers a journey through thousands of years of history, from the Indus Valley Civilization to the Mughal Empire and beyond.',
  highlights: [
    'Mohenjo-daro (Sindh) – Ancient Indus Valley Civilization',
    'Harappa (Punjab) – Early urban settlement ruins',
    'Badshahi Mosque (Lahore) – Grand Mughal masterpiece',
    'Lahore Fort – UNESCO World Heritage Site',
    'Shalimar Gardens – Persian-style royal gardens',
    'Wazir Khan Mosque – Famous tile artwork',
    'Shah Jahan Mosque (Thatta)',
    'Baltit Fort & Altit Fort (Hunza)',
    'Khaplu Palace (Baltistan)',
    'Shigar Fort',
    'Takht-i-Bahi – UNESCO site',
    'Shrine of Shah Rukn-e-Alam (Multan)',
    'Shrine of Bahauddin Zakariya (Multan)',
    'Ancient Silk Route villages'
  ],
  duration: 'Custom',
  priceUSD: '$1800',
  groupSize: '5-12',
  bestSeason: 'October - April',
  difficulty: 'Easy',
  route: ['Lahore', 'Multan', 'Harappa', 'Mohenjo-daro', 'Thatta', 'Hunza', 'Skardu', 'Swat'],
  itinerary: [],
  includes: [],
  excludes: [],
  gallery: []
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await Destination.findOne({ id: dest.id });
  if (existing) {
    await Destination.findOneAndUpdate({ id: dest.id }, dest, { runValidators: true });
    console.log('Updated:', dest.name);
  } else {
    await Destination.create(dest);
    console.log('Created:', dest.name);
  }
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
