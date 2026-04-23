require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const dest = {
  id: 13,
  name: '12 Days Jeep Safari Gilgit, Hunza & Kalash',
  country: 'Pakistan',
  category: 'safari',
  featured: true,
  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  rating: 4.8,
  reviews: 0,
  price: 1100,
  description: 'Blossom is the time of year when trees of Almond, Apricots, Peach and Apple burst into different colours. This 12-day jeep safari covers Gilgit, Hunza Valley, Khunjerab Pass, Gupis, Shandur Pass, Chitral, and the unique Kalash Valley — home to the non-Muslim descendants with completely unique culture and traditions.',
  highlights: ['Hunza Valley', 'Baltit Fort', 'Altit Fort', 'Eagle Nest', 'Attabad Lake', 'Passu Glacier', 'Khunjerab Pass 4734m', 'Gupis & Khalti Lake', 'Shandur Pass 3700m', 'Chitral', 'Kalash Valley', 'Kalash Culture', 'Taxila Museum', 'Faisal Mosque'],
  duration: '12 Days',
  priceUSD: '$1100',
  groupSize: '5-12',
  bestSeason: 'March - May (Blossom), September - November (Autumn)',
  difficulty: 'Moderate',
  route: ['Islamabad', 'Besham', 'Gilgit', 'Hunza', 'Gulmit', 'Khunjerab', 'Gupis', 'Shandur Pass', 'Mastuj', 'Chitral', 'Kalash', 'Islamabad'],
  itinerary: [
    { day: '1', title: 'Arrive Islamabad', description: 'Receive from Islamabad Airport and transfer to the hotel.' },
    { day: '2', title: 'Islamabad to Besham', description: 'Departure for Besham sightseeing and crossing the famous towns of Abbottabad and Mansehra en route. Arrival at Besham and transfer to the hotel. Overnight stay at Besham.' },
    { day: '3', title: 'Besham to Gilgit', description: 'Departure for Gilgit with sightseeing en route. On the way stop at Nanga Parbat viewpoint offering breathtaking views. The next stop will be at the unique point where three mountain ranges — Karakoram, Himalayas and Hindu Kush — meet. Arrival at Gilgit. Overnight stay.' },
    { day: '4', title: 'Gilgit to Hunza', description: 'Departure for Hunza. On the way stop at Rakaposhi Viewpoint. Visit Minapin Valley for photos. At Karimabad, visit Baltit Fort Museum and Altit Fort. Visit Eagle Nest for view of Hunza and spectacular sunshine view. Ultar, Hunza Dome, Bublimating, Spantik and Diran are famous peaks surrounding us, while Rakaposhi at 7,788m dominates the whole panorama. Stay overnight at Hunza.' },
    { day: '5', title: 'Hunza to Khunjerab Pass & Gulmit', description: 'Drive to Gojal Valley. On the way visit Attabad Lake for photos, visit Passu Glacier and Passu Suspension Bridge. Then drive to the Sino-Pak border at Khunjerab, crossing the villages of Passu and Sost en route. Khunjerab is the highest point on KKH at 4,734m and considered the highest trade route in the world. Back to hotel at Gulmit.' },
    { day: '6', title: 'Gulmit to Gupis (Ghizer)', description: 'Gulmit Gojal to Gupis village in Ghizer Valley. Pass through Gilgit city, visit rock carvings, Kargah Buddha, enjoy the blossom on the way to Gupis. Test the famous trout fish in Gupis village. Stay in PTDC hotel with beautiful view of Khalti Lake.' },
    { day: '7', title: 'Gupis to Mastuj (Chitral)', description: 'Drive to Mastuj Valley at Chitral District through the famous and beautiful village of Phandar and the Shandur Pass — 3,700m, the highest polo ground in the world. Stay in PTDC Mastuj.' },
    { day: '8', title: 'Mastuj to Kalash Valley', description: 'Drive to Kalash Valley through Chitral. Stay with Kalash people, enjoy their food, customs and Kalash traditions. The Kalash are non-Muslims, descendants of Alexander the Great. Their culture and tradition is completely unique in the world. Stay in local house in Bumburet.' },
    { day: '9', title: 'Kalash Valley Exploration', description: 'There are 3 Kalash villages — Rumboor, Bumburet, and Birir. Visit Rumboor and explore the valleys. Stay overnight at Chitral.' },
    { day: '10', title: 'Chitral to Islamabad', description: 'Drive to Islamabad, 10-12 hours through Lowari Pass. Stay in hotel.' },
    { day: '11', title: 'Islamabad & Taxila', description: 'Visit Taxila Museum and Taxila historical places. Back to Islamabad, stay overnight at hotel.' },
    { day: '12', title: 'Islamabad & Departure', description: 'Visit Islamabad, Rawalpindi old bazaar, Faisal Mosque, Margallah Hills and local market. Back to Airport and fly back home in the evening.' }
  ],
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
