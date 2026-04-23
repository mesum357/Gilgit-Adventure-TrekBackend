require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const destinations = [
  {
    id: 14,
    name: '11 Days Pakistan Tour from Thailand',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150a53?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 700,
    description: 'An 11-day journey from Islamabad through the Karakoram Highway to Gilgit-Baltistan, exploring Hunza Valley, Attabad Lake, Passu Glacier, and returning via Lahore with Mughal heritage sites. This itinerary is without flights included.',
    highlights: ['Karakoram Highway', 'Hunza Valley', 'Eagle Nest', 'Attabad Lake', 'Passu Glacier', 'Gulmit Valley', 'Badshahi Mosque', 'Lahore Fort', 'Wagah Border', 'Food Street Lahore'],
    duration: '11 Days',
    priceUSD: '$700',
    groupSize: '7-12',
    bestSeason: 'April - October',
    difficulty: 'Easy',
    route: ['Islamabad', 'Besham', 'Gilgit', 'Hunza', 'Gulmit', 'Passu', 'Gilgit', 'Besham', 'Islamabad', 'Lahore', 'BKK'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive Islamabad, at night time.' },
      { day: '2', title: 'Islamabad to Besham', description: 'Meet on arrival in Islamabad. Drive to Besham via Abbottabad, Batgram & Thakot Bridge. Stop at several places for sightseeing, overnight Besham Hotel.' },
      { day: '3', title: 'Besham to Gilgit', description: 'Drive to Gilgit, stay at Gilgit, visit around Gilgit.' },
      { day: '4', title: 'Gilgit to Hunza', description: 'Drive to Hunza. Lunch at Nagar Valley — from here you can see many beautiful views. Drive to Hunza, stay at Hunza and visit Hunza Valley. Visit Eagle Nest for sunset. Back to Hotel.' },
      { day: '5', title: 'Hunza to Gulmit & Passu', description: 'Drive to Attabad Lake through tunnel. Stay at Gulmit Valley, and visit Passu Valley and Passu Glacier. Back to Hotel.' },
      { day: '6', title: 'Back to Gilgit', description: 'Back to Gilgit, if possible go back by air next day otherwise by road.' },
      { day: '7', title: 'Gilgit to Besham', description: 'Back to Besham. Stay at Besham.' },
      { day: '8', title: 'Besham to Lahore', description: 'Back to Islamabad, same day drive to Lahore.' },
      { day: '9', title: 'Lahore Sightseeing', description: 'Visit Wagah Border, visit Meenar-e-Pakistan. Back to Hotel.' },
      { day: '10', title: 'Lahore Heritage', description: 'Visit Badshahi Mosque, Lahore Fort, Lahore Emperor Jahangir\'s Tomb. Back to Hotel.' },
      { day: '11', title: 'Departure', description: 'Visit Market, Food Street and back to Airport. Fly to BKK.' }
    ],
    includes: [],
    excludes: [],
    gallery: []
  },

  {
    id: 15,
    name: '11 Days Autumn Tour with Fairy Meadows',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 700,
    description: 'An 11-day autumn tour combining Fairy Meadows trekking with Hunza Valley exploration, Khunjerab Pass, Gupis trout fishing, and Islamabad sightseeing. Includes soft adventures at the base camp of Nanga Parbat (8,125m).',
    highlights: ['Fairy Meadows', 'Nanga Parbat', 'Bayal Camp', 'Hunza Valley', 'Hoper Glacier', 'Hussaini Bridge', 'Khunjerab Pass', 'Phandar Valley', 'Gupis Trout Fish', 'Taxila Museum', 'Faisal Mosque'],
    duration: '11 Days',
    priceUSD: '$700',
    groupSize: '7-12',
    bestSeason: 'September - November',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Hoper', 'Passu', 'Khunjerab', 'Gilgit', 'Gupis', 'Besham', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive at Islamabad and transfer to Hotel.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Depart from Islamabad and arrive at Naran Kaghan Valley crossing the famous towns of Abbottabad and Mansehra. Following the upstream course of River Indus, arrive at Chilas and transfer to hotel.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Great but soft adventures at the base camp of Nanga Parbat (8,125m). Drive to Raikot Bridge on KKH and onwards to Tatto by jeeps. From there, a 3-hour hike through primeval pine forests to Fairy Meadows.' },
      { day: '4', title: 'Fairy Meadows to Bayal Camp', description: 'A soft trek of 2-3 hours walking through dense pine forest and birch trees along shallow streams to Beyal — a summer settlement of shepherds with stunning views of Nanga Parbat. Lunch at Bayal Camp and special camp fire at night.' },
      { day: '5', title: 'Fairy Meadows to Hunza', description: 'Back to Raikot Bridge. Drive to Gilgit, stopping at Nanga Parbat viewpoint and the unique point where three mountain ranges meet. Continue to Karimabad Hunza. Visit Baltit Fort Museum and Altit Fort.' },
      { day: '6', title: 'Hunza to Passu', description: 'Drive to Hoper Valley, visit glacier and beautiful sceneries. Back to Hunza and drive to Gojal Valley. Visit Attabad Lake, Passu Glacier and Hussaini Suspension Bridge. Stay overnight at Passu.' },
      { day: '7', title: 'Passu to Khunjerab & Gilgit', description: 'Drive to Sino-Pak border at Khunjerab (4,734m), crossing Passu and Sost. The highest trade route in the world. Back to Gilgit. Stay overnight.' },
      { day: '8', title: 'Gilgit to Gupis', description: 'Drive to Gupis, District Ghizer — famous for trout fish. Visit Phandar Valley. Stay overnight at PTDC Gupis.' },
      { day: '9', title: 'Gupis to Besham', description: 'Visit another unique valley of Ghizer District (Yaseen Valley) and back to Besham. Stay overnight.' },
      { day: '10', title: 'Besham to Islamabad', description: 'Early departure for Islamabad. Visit Taxila — the famous capital of Buddhists. Visit Jaulian Monastery and Archaeological Museum. Drive to Islamabad for overnight.' },
      { day: '11', title: 'Islamabad & Departure', description: 'Visit Faisal Mosque, Margallah Hills, Shakar Parian, Lakeview Park. Back to Airport. Fly back home.' }
    ],
    includes: ['11 days 10 nights accommodation', 'Two Person Sharing Room', 'Quality transportation with Air-condition'],
    excludes: ['Horse Riding Fee at Fairy Meadows (optional)', 'International Air Ticket'],
    gallery: []
  },

  {
    id: 16,
    name: 'Blossom & Autumn Jeep Safari Tours',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 800,
    description: 'Spring in Gilgit-Baltistan is like a living painting — valleys come alive with cherry, apricot, apple, and almond blossoms. In autumn, valleys transform into shades of gold, red, orange, and amber creating a magical contrast with snow-covered peaks. Experience both seasons on our jeep safari tours.',
    highlights: ['Spring Blossom (March-May)', 'Autumn Colors (Sept-Nov)', 'Hunza Valley', 'Karimabad, Altit, Baltit', 'Nagar Valley & Hoper Glacier', 'Skardu, Shigar, Khaplu', 'Attabad Lake', 'Passu Cones', 'Ghizer & Phandar Valley', 'Naltar Valley', 'Deosai Plains'],
    duration: 'Custom',
    priceUSD: '$800',
    groupSize: '5-12',
    bestSeason: 'Late March - Mid April (Blossom), Mid October (Autumn)',
    difficulty: 'Easy',
    route: ['Hunza', 'Nagar', 'Skardu', 'Shigar', 'Khaplu', 'Gilgit', 'Attabad Lake', 'Passu', 'Ghizer', 'Phandar', 'Naltar', 'Deosai'],
    itinerary: [],
    includes: [],
    excludes: [],
    gallery: []
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  let created = 0, updated = 0;
  for (const dest of destinations) {
    const existing = await Destination.findOne({ id: dest.id });
    if (existing) {
      await Destination.findOneAndUpdate({ id: dest.id }, dest, { runValidators: true });
      updated++;
      console.log('  Updated:', dest.name);
    } else {
      await Destination.create(dest);
      created++;
      console.log('  Created:', dest.name);
    }
  }
  console.log(`\nDone! Created: ${created}, Updated: ${updated}`);
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
