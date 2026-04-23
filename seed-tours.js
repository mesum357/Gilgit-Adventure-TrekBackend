/**
 * seed-tours.js — Insert 13 tour-plan destinations from Word document data.
 * Run once: node seed-tours.js
 *
 * Uses upsert by name so it can be re-run safely without creating duplicates.
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const tours = [
  {
    id: 101, name: '10 Days GB & Lahore Jeep Safari', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    rating: 4.8, reviews: 45, price: 95000, featured: true,
    description: 'A 10-day jeep safari covering Gilgit-Baltistan highlights and Lahore. Drive the Karakoram Highway, explore Hunza Valley, visit Khunjerab Pass, and conclude with the cultural heritage of Lahore.',
    highlights: ['Karakoram Highway', 'Hunza Valley', 'Khunjerab Pass', 'Lahore Heritage', 'Jeep Safari'],
    duration: '10 Days / 9 Nights',
    priceUSD: '$650–700/person',
    groupSize: '6–15 people',
    bestSeason: 'Spring–Autumn (April–October)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Chilas', 'Hunza', 'Khunjerab Pass', 'Gilgit', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Chilas', description: 'Depart Islamabad early morning via Karakoram Highway. Drive along the Indus River through Besham and Dasu. Overnight in Chilas.' },
      { day: '2', title: 'Chilas to Karimabad, Hunza', description: 'Continue on KKH past Nanga Parbat viewpoint and Rakaposhi. Arrive Karimabad. Visit Eagle\'s Nest viewpoint at sunset.' },
      { day: '3', title: 'Hunza Valley Exploration', description: 'Full day exploring Baltit Fort, Altit Fort, Sacred Rock of Hunza, and local markets. Walk through apricot orchards.' },
      { day: '4', title: 'Hunza to Khunjerab Pass', description: 'Drive to Khunjerab Pass (4,693m), the highest paved border crossing. See yaks and enjoy panoramic glacier views. Return to Karimabad.' },
      { day: '5', title: 'Passu & Attabad Lake', description: 'Visit Passu Cones, walk Hussaini Suspension Bridge. Boat ride on turquoise Attabad Lake. Return to Hunza.' },
      { day: '6', title: 'Hunza to Gilgit', description: 'Drive to Gilgit city. Visit Kargah Buddha, Gilgit bazaar, and local handicraft shops.' },
      { day: '7', title: 'Gilgit to Chilas', description: 'Scenic drive back along the Indus. Stop at junction points for photography. Overnight in Chilas.' },
      { day: '8', title: 'Chilas to Islamabad', description: 'Long drive back via KKH. Evening arrival in Islamabad. Rest and prepare for Lahore.' },
      { day: '9', title: 'Islamabad to Lahore', description: 'Drive or fly to Lahore. Visit Badshahi Mosque, Lahore Fort, Shalimar Gardens, and Food Street.' },
      { day: '10', title: 'Lahore Exploration & Departure', description: 'Visit Minar-e-Pakistan, old walled city, and local bazaars. Tour concludes. Transfer to airport or station.' }
    ],
    includes: ['All ground transport (Coaster/Jeep)', 'Accommodation (hotels & guest houses)', 'All meals (breakfast, lunch, dinner)', 'Experienced tour guide', 'Permits & entry fees', 'Lahore city guide', 'First aid kit'],
    excludes: ['International/domestic flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag (available for rent)'],
    gallery: []
  },
  {
    id: 102, name: '11 Days Pakistan Tour (Thailand)', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    rating: 4.9, reviews: 32, price: 110000, featured: true,
    description: 'An 11-day comprehensive Pakistan tour designed for Thai travelers. Covers Islamabad, Hunza Valley, Khunjerab Pass, Fairy Meadows, and Lahore — showcasing the best of Pakistani culture, mountains, and hospitality.',
    highlights: ['Designed for Thai Travelers', 'Hunza Valley', 'Fairy Meadows', 'Khunjerab Pass', 'Lahore Heritage', 'Cultural Immersion'],
    duration: '11 Days / 10 Nights',
    priceUSD: '$750–850/person',
    groupSize: '6–15 people',
    bestSeason: 'Spring–Autumn (April–October)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Khunjerab Pass', 'Gilgit', 'Naran', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. Visit Faisal Mosque, Daman-e-Koh viewpoint, and Pakistan Monument. Welcome dinner with traditional cuisine.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Depart via Karakoram Highway. Drive along the Indus River. Overnight in Chilas.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Jeep ride to Tato village, then trek to Fairy Meadows. Stunning Nanga Parbat views. Camping under stars.' },
      { day: '4', title: 'Fairy Meadows to Karimabad', description: 'Morning photography at Fairy Meadows. Trek down and drive to Hunza Valley.' },
      { day: '5', title: 'Hunza Valley Exploration', description: 'Eagle\'s Nest sunrise, Baltit Fort, Altit Fort, local markets. Try traditional Hunza food.' },
      { day: '6', title: 'Hunza to Khunjerab Pass', description: 'Full-day excursion to the China border at 4,693m. Yaks, glaciers, and roof-of-the-world views.' },
      { day: '7', title: 'Passu & Attabad Lake', description: 'Passu Cones, Hussaini Bridge, boat ride on Attabad Lake. Evening in Hunza.' },
      { day: '8', title: 'Hunza to Naran', description: 'Drive via Babusar Pass (seasonal) or KKH. Arrive in Naran. Evening walk by Kunhar River.' },
      { day: '9', title: 'Naran & Lake Saif-ul-Malook', description: 'Jeep ride to Lake Saif-ul-Malook. Visit Lulusar Lake. Return to Naran.' },
      { day: '10', title: 'Naran to Lahore', description: 'Drive to Islamabad, then onward to Lahore. Evening at Food Street and Badshahi Mosque.' },
      { day: '11', title: 'Lahore & Departure', description: 'Visit Lahore Fort, Shalimar Gardens, Minar-e-Pakistan. Tour concludes with airport transfer.' }
    ],
    includes: ['Airport pickup & drop-off', 'All ground transport', 'Accommodation', 'All meals', 'Thai-speaking liaison available', 'Tour guide', 'Permits & entry fees', 'First aid kit'],
    excludes: ['International flights', 'Pakistan visa fees', 'Personal expenses', 'Travel insurance', 'Tips & gratuities'],
    gallery: []
  },
  {
    id: 103, name: '11 Days Pakistan Tour', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    rating: 4.8, reviews: 68, price: 105000, featured: true,
    description: 'An 11-day complete Pakistan tour covering the northern mountain regions and cultural highlights. From Islamabad to Hunza, Fairy Meadows, Naran-Kaghan, and Lahore heritage sites.',
    highlights: ['Complete Pakistan Overview', 'Hunza Valley', 'Fairy Meadows', 'Naran-Kaghan', 'Lahore Heritage', 'Karakoram Highway'],
    duration: '11 Days / 10 Nights',
    priceUSD: '$700–800/person',
    groupSize: '6–15 people',
    bestSeason: 'Spring–Autumn (April–October)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Khunjerab Pass', 'Naran', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. City tour: Faisal Mosque, Pakistan Monument, Daman-e-Koh. Welcome dinner.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Drive via KKH along the Indus River. Stop at key viewpoints. Overnight Chilas.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Thrilling jeep ride to Tato, trek to Fairy Meadows. Nanga Parbat base views.' },
      { day: '4', title: 'Fairy Meadows to Hunza', description: 'Morning in meadows, then drive to Karimabad. Evening at Eagle\'s Nest viewpoint.' },
      { day: '5', title: 'Hunza Valley Day', description: 'Baltit Fort, Altit Fort, local bazaar, cherry blossom terraces, Rakaposhi viewpoint.' },
      { day: '6', title: 'Khunjerab Pass Excursion', description: 'Full-day drive to Khunjerab Pass (4,693m). Passu Cones, Attabad Lake on return.' },
      { day: '7', title: 'Hunza to Gilgit', description: 'Drive to Gilgit. Visit Kargah Buddha and local markets.' },
      { day: '8', title: 'Gilgit to Naran', description: 'Scenic drive via Babusar Pass (seasonal) to Naran. Evening by Kunhar River.' },
      { day: '9', title: 'Lake Saif-ul-Malook & Kaghan', description: 'Jeep ride to Lake Saif-ul-Malook. Visit Lulusar Lake. Return to Naran.' },
      { day: '10', title: 'Naran to Lahore', description: 'Drive to Islamabad, continue to Lahore. Evening at Badshahi Mosque and Food Street.' },
      { day: '11', title: 'Lahore & Departure', description: 'Lahore Fort, Shalimar Gardens, old walled city. Airport transfer. Tour ends.' }
    ],
    includes: ['All ground transport', 'Accommodation', 'All meals', 'Experienced tour guide', 'Permits & entry fees', 'First aid kit'],
    excludes: ['International/domestic flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities'],
    gallery: []
  },
  {
    id: 104, name: '11 Days Jeep Safari & Trekking', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80',
    rating: 4.8, reviews: 52, price: 115000, featured: true,
    description: 'An action-packed 11-day jeep safari and trekking adventure through Northern Pakistan. Combines scenic jeep drives on the Karakoram Highway with treks at Fairy Meadows and Rakaposhi Base Camp.',
    highlights: ['Jeep Safari & Trekking Combo', 'Fairy Meadows Trek', 'Rakaposhi BC Trail', 'Hunza Valley', 'Khunjerab Pass', 'Passu Glacier'],
    duration: '10 Days / 9 Nights',
    priceUSD: '$750–850/person',
    groupSize: '4–12 people',
    bestSeason: 'Summer (May–September)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Rakaposhi BC', 'Khunjerab Pass', 'Passu', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Chilas', description: 'Depart Islamabad via KKH. Drive along the Indus River gorge. Overnight in Chilas.' },
      { day: '2', title: 'Chilas to Fairy Meadows', description: 'Jeep to Tato Village via the world\'s most dangerous road. Trek 3 hours to Fairy Meadows.' },
      { day: '3', title: 'Fairy Meadows & Beyal Camp', description: 'Hike to Beyal Camp for close-up Nanga Parbat views. Return for evening stargazing.' },
      { day: '4', title: 'Fairy Meadows to Karimabad', description: 'Trek down, drive to Hunza Valley. Evening exploration of Karimabad town.' },
      { day: '5', title: 'Rakaposhi Base Camp Trek', description: 'Drive to Minapin, trek to Rakaposhi Base Camp trail. Stunning glacier and peak views.' },
      { day: '6', title: 'Hunza Valley Exploration', description: 'Baltit Fort, Altit Fort, Eagle\'s Nest viewpoint, local bazaar and food.' },
      { day: '7', title: 'Hunza to Khunjerab Pass', description: 'Full-day excursion to the China border at 4,693m. Yak spotting and glacier panoramas.' },
      { day: '8', title: 'Passu & Attabad Lake', description: 'Passu Cones, Hussaini Bridge, Passu Glacier walk. Boat ride on Attabad Lake.' },
      { day: '9', title: 'Passu to Chilas', description: 'Drive back via KKH. Stop at Rakaposhi viewpoint. Overnight in Chilas.' },
      { day: '10', title: 'Chilas to Islamabad', description: 'Final drive back to Islamabad. Tour concludes upon arrival.' }
    ],
    includes: ['All ground transport (Coaster/4x4 Jeep)', 'Accommodation (hotels & camping)', 'All meals', 'Experienced trek guide & porters', 'Camping & trekking equipment', 'Permits & entry fees', 'First aid kit'],
    excludes: ['International/domestic flights', 'Personal trekking gear', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 105, name: '11 Days Fairy Meadows Tour', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&q=80',
    rating: 4.9, reviews: 73, price: 100000, featured: true,
    description: 'An 11-day tour centered around the magical Fairy Meadows and Nanga Parbat, combined with the highlights of Hunza Valley, Attabad Lake, and the Karakoram Highway.',
    highlights: ['Fairy Meadows Focus', 'Nanga Parbat Views', 'Hunza Valley', 'Attabad Lake', 'Khunjerab Pass', 'Karakoram Highway'],
    duration: '11 Days / 10 Nights',
    priceUSD: '$700–780/person',
    groupSize: '6–15 people',
    bestSeason: 'Spring–Autumn (May–October)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Khunjerab Pass', 'Attabad Lake', 'Naran', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad City Tour', description: 'Faisal Mosque, Pakistan Monument, Daman-e-Koh, Margalla Hills. Welcome dinner.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Drive via KKH along the Indus River. Scenic stops along the way. Overnight Chilas.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Jeep ride to Tato Village on the world\'s most thrilling road. Trek to Fairy Meadows.' },
      { day: '4', title: 'Fairy Meadows Exploration', description: 'Full day at Fairy Meadows. Hike to Beyal Camp, Nanga Parbat Base Camp trail. Stargazing.' },
      { day: '5', title: 'Fairy Meadows to Karimabad', description: 'Morning in the meadows, trek down. Drive to Hunza Valley.' },
      { day: '6', title: 'Hunza Valley', description: 'Eagle\'s Nest sunrise, Baltit Fort, Altit Fort, traditional lunch, local bazaar.' },
      { day: '7', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab Pass (4,693m). Return via Passu.' },
      { day: '8', title: 'Attabad Lake & Passu', description: 'Boat ride on Attabad Lake, Passu Cones, Hussaini Bridge. Evening in Hunza.' },
      { day: '9', title: 'Hunza to Naran', description: 'Drive via Babusar Pass (seasonal) or KKH to Naran.' },
      { day: '10', title: 'Lake Saif-ul-Malook', description: 'Jeep to Lake Saif-ul-Malook. Visit Lulusar Lake. Evening in Naran.' },
      { day: '11', title: 'Naran to Islamabad', description: 'Scenic drive via Kaghan Valley back to Islamabad. Tour concludes.' }
    ],
    includes: ['All ground transport', 'Accommodation (hotels, guest houses, camping)', 'All meals', 'Tour guide', 'Camping equipment for Fairy Meadows', 'Permits & entry fees', 'First aid kit'],
    excludes: ['International/domestic flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 106, name: '11 Days Autumn Colors Tour', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    rating: 4.9, reviews: 88, price: 98000, featured: true,
    description: 'An 11-day autumn photography tour through the golden landscapes of Northern Pakistan. Witness the famous Hunza autumn colors, golden poplar avenues, and the warm hues of Skardu and Naran valleys.',
    highlights: ['Autumn Photography', 'Golden Poplars of Hunza', 'Skardu Flight', 'Deosai Plateau', 'Fairy Meadows', 'Lake Saif-ul-Malook'],
    duration: '11 Days / 10 Nights',
    priceUSD: '$700–780/person',
    groupSize: '6–15 people',
    bestSeason: 'Autumn (October–November)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Skardu', 'Deosai', 'Hunza', 'Khunjerab Pass', 'Fairy Meadows', 'Naran', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Fly Islamabad to Skardu', description: 'Morning flight over the Karakoram. Afternoon at Shangrila Resort and Lower Kachura Lake.' },
      { day: '2', title: 'Skardu Exploration', description: 'Skardu Fort, Upper Kachura Lake, Cold Desert. Autumn colors in the orchards.' },
      { day: '3', title: 'Skardu to Hunza via Gilgit', description: 'Drive through autumn-colored valleys to Karimabad. Golden poplars along the road.' },
      { day: '4', title: 'Hunza Valley Autumn', description: 'Eagle\'s Nest sunrise over autumn valley. Baltit Fort, Altit Fort, poplar avenues.' },
      { day: '5', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab Pass (4,693m). Early snow views possible.' },
      { day: '6', title: 'Passu & Attabad Lake', description: 'Passu Cones in autumn light, Hussaini Bridge, Attabad Lake boat ride.' },
      { day: '7', title: 'Hunza to Fairy Meadows', description: 'Drive to Raikot Bridge, jeep to Tato, trek to Fairy Meadows.' },
      { day: '8', title: 'Fairy Meadows', description: 'Morning hike toward Nanga Parbat. Autumn colors in the pine forests. Stargazing.' },
      { day: '9', title: 'Fairy Meadows to Naran', description: 'Trek down, drive via Babusar Pass (if open) to Naran. Autumn colors along Kaghan.' },
      { day: '10', title: 'Lake Saif-ul-Malook', description: 'Jeep to Lake Saif-ul-Malook surrounded by autumn hues. Lulusar Lake visit.' },
      { day: '11', title: 'Naran to Islamabad', description: 'Scenic drive back via Kaghan Valley. Tour concludes in Islamabad.' }
    ],
    includes: ['Flight Islamabad–Skardu', 'All ground transport', 'Accommodation', 'All meals', 'Photography guide tips', 'Tour guide', 'Permits & entry fees'],
    excludes: ['International flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities', 'Camera equipment'],
    gallery: []
  },
  {
    id: 107, name: '11 Days Autumn & Fairy Meadows Trek', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80',
    rating: 4.8, reviews: 55, price: 105000, featured: true,
    description: 'An 11-day autumn trekking tour combining the golden autumn landscapes of Hunza and Skardu with a trek to Fairy Meadows. Perfect for photography enthusiasts and nature lovers.',
    highlights: ['Autumn Trekking', 'Fairy Meadows Trek', 'Golden Hunza Valley', 'Skardu Lakes', 'Nanga Parbat', 'Babusar Pass'],
    duration: '11 Days / 10 Nights',
    priceUSD: '$720–800/person',
    groupSize: '4–12 people',
    bestSeason: 'Autumn (October–November)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Skardu', 'Hunza', 'Fairy Meadows', 'Naran', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Fly Islamabad to Skardu', description: 'Scenic flight. Afternoon explore Skardu town and autumn orchards.' },
      { day: '2', title: 'Skardu Lakes & Fort', description: 'Upper & Lower Kachura Lakes, Skardu Fort, Shangrila Resort in autumn light.' },
      { day: '3', title: 'Skardu to Hunza', description: 'Drive through golden-leaved valleys to Karimabad. Sunset at Eagle\'s Nest.' },
      { day: '4', title: 'Hunza Autumn Exploration', description: 'Baltit Fort, Altit Fort surrounded by golden poplars. Local Hunza food tasting.' },
      { day: '5', title: 'Khunjerab Pass & Passu', description: 'Full-day Khunjerab excursion. Return via Passu Cones and Attabad Lake.' },
      { day: '6', title: 'Hunza to Fairy Meadows', description: 'Drive to Raikot Bridge, jeep to Tato. Trek up through autumn-colored forests to Fairy Meadows.' },
      { day: '7', title: 'Fairy Meadows Trek Day', description: 'Hike to Beyal Camp and toward Nanga Parbat Base Camp. Photography and exploration.' },
      { day: '8', title: 'Fairy Meadows to Chilas', description: 'Trek down from Fairy Meadows. Drive to Chilas. Overnight rest.' },
      { day: '9', title: 'Chilas to Naran via Babusar', description: 'Drive over Babusar Pass (if open). Golden autumn meadows. Arrive Naran.' },
      { day: '10', title: 'Lake Saif-ul-Malook', description: 'Jeep to Lake Saif-ul-Malook. Autumn reflections in the water. Visit Lulusar Lake.' },
      { day: '11', title: 'Naran to Islamabad', description: 'Drive via Kaghan Valley. Tour concludes in Islamabad.' }
    ],
    includes: ['Flight Islamabad–Skardu', 'All ground transport', 'Accommodation (hotels & camping)', 'All meals', 'Trek guide & porters', 'Camping equipment', 'Permits & entry fees'],
    excludes: ['International flights', 'Personal trekking gear', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 108, name: '12 Days GB & Kalash Jeep Safari', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
    rating: 4.9, reviews: 42, price: 130000, featured: true,
    description: 'A 12-day jeep safari covering both Gilgit-Baltistan and the remote Kalash Valley in Chitral. Experience the Karakoram Highway, Hunza, Shandur Pass, and the unique Kalash culture — one of the most comprehensive Northern Pakistan tours.',
    highlights: ['Kalash Valley & Culture', 'Hunza Valley', 'Shandur Pass', 'Chitral Valley', 'Khunjerab Pass', 'GB to Kalash Route'],
    duration: '12 Days / 11 Nights',
    priceUSD: '$900–1000/person',
    groupSize: '4–12 people',
    bestSeason: 'Summer (May–September)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Hunza', 'Khunjerab', 'Gilgit', 'Shandur Pass', 'Chitral', 'Kalash', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Chilas', description: 'Drive via KKH along the Indus River. Overnight in Chilas.' },
      { day: '2', title: 'Chilas to Karimabad', description: 'Continue on KKH to Hunza. Visit Eagle\'s Nest at sunset.' },
      { day: '3', title: 'Hunza Valley', description: 'Explore Baltit Fort, Altit Fort, local markets and terraced orchards.' },
      { day: '4', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab Pass (4,693m). Passu and Attabad Lake on return.' },
      { day: '5', title: 'Hunza to Gilgit', description: 'Drive to Gilgit. Visit Kargah Buddha and Gilgit bazaar.' },
      { day: '6', title: 'Gilgit to Phandar Valley', description: 'Drive through Ghizer to Phandar. Boat ride on pristine Phandar Lake.' },
      { day: '7', title: 'Phandar to Shandur Pass', description: 'Drive to Shandur Pass (3,700m). Visit the famous polo ground. Camp under stars.' },
      { day: '8', title: 'Shandur to Chitral', description: 'Descend toward Chitral via Mastuj. Scenic valley and river views.' },
      { day: '9', title: 'Chitral to Kalash Valley', description: 'Drive to Kalash Valley. Visit Bumburet village. Meet Kalash people and learn their culture.' },
      { day: '10', title: 'Kalash Valley Exploration', description: 'Visit Rumbur and Birir valleys. Explore Kalash temples, graveyards, and traditions.' },
      { day: '11', title: 'Kalash to Chitral', description: 'Return to Chitral. Visit Chitral Fort and Shahi Mosque. Evening rest.' },
      { day: '12', title: 'Chitral to Islamabad', description: 'Fly from Chitral to Islamabad (or drive via Lowari Tunnel). Tour concludes.' }
    ],
    includes: ['All ground transport (4x4 Jeep)', 'Accommodation (hotels, guest houses, camping)', 'All meals', 'Experienced cultural guide', 'Kalash valley permits', 'Camping equipment', 'First aid kit'],
    excludes: ['Chitral–Islamabad flight (can be arranged)', 'Personal expenses', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 109, name: '15 Days Treks & Tours Plan A', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80',
    rating: 4.9, reviews: 38, price: 155000, featured: true,
    description: 'A comprehensive 15-day trek and tour covering Skardu, Deosai, Hunza, Fairy Meadows, and Naran. Plan A focuses on a Skardu-first route with Deosai Plateau exploration.',
    highlights: ['15-Day Comprehensive Tour', 'Skardu & Deosai', 'Hunza Valley', 'Fairy Meadows', 'Naran-Kaghan', 'Karakoram Highway'],
    duration: '15 Days / 14 Nights',
    priceUSD: '$1050–1200/person',
    groupSize: '4–12 people',
    bestSeason: 'Summer (June–September)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Skardu', 'Deosai', 'Hunza', 'Khunjerab', 'Fairy Meadows', 'Naran', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. City tour: Faisal Mosque, Pakistan Monument. Welcome dinner.' },
      { day: '2', title: 'Fly to Skardu', description: 'Scenic flight over the Karakoram. Afternoon at Shangrila Resort and Kachura Lake.' },
      { day: '3', title: 'Skardu Exploration', description: 'Skardu Fort, Upper Kachura, Cold Desert, Satpara Lake. Local Balti cuisine.' },
      { day: '4', title: 'Skardu to Deosai Plateau', description: 'Jeep drive to Deosai National Park. Sheosar Lake, search for Himalayan brown bears. Camp at Bara Pani.' },
      { day: '5', title: 'Deosai to Gilgit', description: 'Return via Skardu and drive to Gilgit along the Indus River.' },
      { day: '6', title: 'Gilgit to Karimabad', description: 'Drive to Hunza Valley. Eagle\'s Nest sunset. Explore Karimabad town.' },
      { day: '7', title: 'Hunza Valley', description: 'Baltit Fort, Altit Fort, local markets, Rakaposhi viewpoint, cherry orchards.' },
      { day: '8', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab Pass (4,693m). Return via Passu and Attabad Lake.' },
      { day: '9', title: 'Hunza Rest Day', description: 'Leisure day. Optional Hoper Glacier visit or local cooking class.' },
      { day: '10', title: 'Hunza to Fairy Meadows', description: 'Drive to Raikot Bridge, jeep to Tato. Trek to Fairy Meadows.' },
      { day: '11', title: 'Fairy Meadows', description: 'Full day at Fairy Meadows. Hike to Beyal Camp. Nanga Parbat photography.' },
      { day: '12', title: 'Fairy Meadows to Naran', description: 'Trek down, drive via Babusar Pass to Naran.' },
      { day: '13', title: 'Lake Saif-ul-Malook & Kaghan', description: 'Jeep to Lake Saif-ul-Malook. Lulusar Lake. Evening in Naran.' },
      { day: '14', title: 'Naran to Lahore', description: 'Drive to Islamabad, continue to Lahore. Badshahi Mosque, Food Street.' },
      { day: '15', title: 'Lahore & Departure', description: 'Lahore Fort, Shalimar Gardens, old walled city. Airport transfer. Tour ends.' }
    ],
    includes: ['Flight Islamabad–Skardu', 'All ground transport', 'Accommodation', 'All meals', 'Trek guide & porters', 'Camping equipment', 'All permits & entry fees', 'First aid kit'],
    excludes: ['International flights', 'Personal trekking gear', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 110, name: '15 Days Treks & Tours Plan B', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80',
    rating: 4.8, reviews: 35, price: 155000, featured: true,
    description: 'A comprehensive 15-day trek and tour — Plan B starts with Hunza Valley and works south to Skardu. Includes Naltar Valley, Fairy Meadows, and concludes with Skardu lakes and Lahore heritage.',
    highlights: ['15-Day Comprehensive Tour', 'Hunza-First Route', 'Naltar Valley', 'Fairy Meadows', 'Skardu Lakes', 'Lahore Heritage'],
    duration: '15 Days / 14 Nights',
    priceUSD: '$1050–1200/person',
    groupSize: '4–12 people',
    bestSeason: 'Summer (June–September)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Hunza', 'Naltar', 'Fairy Meadows', 'Skardu', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. City tour: Faisal Mosque, Daman-e-Koh. Welcome dinner.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Drive via KKH. Scenic Indus River views. Overnight Chilas.' },
      { day: '3', title: 'Chilas to Karimabad', description: 'Continue to Hunza Valley. Eagle\'s Nest sunset panorama.' },
      { day: '4', title: 'Hunza Valley', description: 'Baltit Fort, Altit Fort, terraced farms, local food, Rakaposhi views.' },
      { day: '5', title: 'Khunjerab Pass & Passu', description: 'Full-day Khunjerab excursion. Return via Passu Cones, Attabad Lake.' },
      { day: '6', title: 'Naltar Valley', description: 'Day trip to Naltar. See the famous tri-colored lakes amid pine forests.' },
      { day: '7', title: 'Hunza to Fairy Meadows', description: 'Drive to Raikot Bridge, jeep to Tato. Trek to Fairy Meadows.' },
      { day: '8', title: 'Fairy Meadows', description: 'Hike to Beyal Camp, Nanga Parbat views. Photography and stargazing.' },
      { day: '9', title: 'Fairy Meadows to Gilgit', description: 'Trek down, drive to Gilgit. Visit Kargah Buddha.' },
      { day: '10', title: 'Gilgit to Skardu', description: 'Scenic drive along the Indus River to Skardu.' },
      { day: '11', title: 'Skardu Lakes & Fort', description: 'Shangrila, Upper & Lower Kachura Lakes, Skardu Fort, Cold Desert.' },
      { day: '12', title: 'Skardu to Deosai', description: 'Jeep to Deosai Plateau. Sheosar Lake, wildlife spotting. Return to Skardu.' },
      { day: '13', title: 'Fly Skardu to Islamabad', description: 'Morning flight to Islamabad. Afternoon drive to Lahore.' },
      { day: '14', title: 'Lahore Heritage', description: 'Badshahi Mosque, Lahore Fort, Shalimar Gardens, Food Street, old city.' },
      { day: '15', title: 'Lahore & Departure', description: 'Minar-e-Pakistan, local bazaars. Airport transfer. Tour concludes.' }
    ],
    includes: ['Flight Skardu–Islamabad', 'All ground transport', 'Accommodation', 'All meals', 'Trek guide & porters', 'Camping equipment', 'All permits & entry fees', 'First aid kit'],
    excludes: ['International flights', 'Personal trekking gear', 'Travel insurance', 'Tips & gratuities', 'Sleeping bag rental'],
    gallery: []
  },
  {
    id: 111, name: '15 Days Autumn GB & Lahore Tour', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    rating: 4.9, reviews: 60, price: 140000, featured: true,
    description: 'A 15-day autumn tour covering all of Gilgit-Baltistan\'s golden landscapes plus Lahore\'s Mughal heritage. From Skardu\'s autumn orchards to Hunza\'s golden poplars, Fairy Meadows, and Lahore\'s grand monuments.',
    highlights: ['15-Day Autumn Special', 'Golden Hunza Poplars', 'Skardu Autumn', 'Fairy Meadows', 'Deosai Plateau', 'Lahore Heritage'],
    duration: '15 Days / 14 Nights',
    priceUSD: '$950–1100/person',
    groupSize: '6–15 people',
    bestSeason: 'Autumn (October–November)',
    difficulty: 'Easy',
    route: ['Islamabad', 'Skardu', 'Deosai', 'Hunza', 'Khunjerab', 'Fairy Meadows', 'Naran', 'Lahore', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. City tour and welcome dinner.' },
      { day: '2', title: 'Fly to Skardu', description: 'Morning flight. Afternoon at Shangrila Resort amid autumn colors.' },
      { day: '3', title: 'Skardu Exploration', description: 'Skardu Fort, Kachura Lakes, Cold Desert. Golden orchards everywhere.' },
      { day: '4', title: 'Skardu to Khaplu', description: 'Drive to Khaplu. Visit Chaqchan Mosque and Khaplu Palace in autumn light.' },
      { day: '5', title: 'Khaplu to Skardu via Shigar', description: 'Return via Shigar Fort. Autumn colors along the Shigar River.' },
      { day: '6', title: 'Deosai Plateau', description: 'Full-day jeep safari on Deosai. Sheosar Lake, late-season wildflowers.' },
      { day: '7', title: 'Skardu to Hunza', description: 'Drive through golden valleys to Karimabad. Sunset at Eagle\'s Nest.' },
      { day: '8', title: 'Hunza Autumn Valley', description: 'Golden poplar avenues, Baltit Fort, Altit Fort, Rakaposhi views.' },
      { day: '9', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab. Early snow possible. Passu on return.' },
      { day: '10', title: 'Attabad Lake & Passu', description: 'Boat ride on turquoise Attabad Lake. Passu Cones, Hussaini Bridge.' },
      { day: '11', title: 'Hunza to Fairy Meadows', description: 'Drive to Raikot Bridge, trek to Fairy Meadows through autumn forests.' },
      { day: '12', title: 'Fairy Meadows', description: 'Hike to Beyal Camp. Nanga Parbat photography. Evening stargazing.' },
      { day: '13', title: 'Fairy Meadows to Naran', description: 'Trek down. Drive via Babusar Pass to Naran. Autumn Kaghan Valley.' },
      { day: '14', title: 'Naran to Lahore', description: 'Drive to Islamabad, continue to Lahore. Badshahi Mosque, Food Street.' },
      { day: '15', title: 'Lahore & Departure', description: 'Lahore Fort, Shalimar Gardens, old city. Airport transfer. Tour ends.' }
    ],
    includes: ['Flight Islamabad–Skardu', 'All ground transport', 'Accommodation', 'All meals', 'Tour guide', 'All permits & entry fees', 'First aid kit'],
    excludes: ['International flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities', 'Camera equipment'],
    gallery: []
  },
  {
    id: 112, name: 'K2 Base Camp Trek', country: 'Baltistan Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80',
    rating: 4.9, reviews: 28, price: 320000, featured: true,
    description: 'A 14-day trek to K2 Base Camp via the mighty Baltoro Glacier. Stand at the foot of the world\'s second-highest mountain (8,611m) at Concordia, surrounded by four 8,000m+ peaks.',
    highlights: ['K2 Base Camp (5,150m)', 'Concordia Junction', 'Baltoro Glacier', 'Trango Towers', 'Four 8,000m Peaks', 'Askole to Concordia'],
    duration: '14 Days',
    priceUSD: '$2,100–2,400/person',
    groupSize: '4–10 people',
    bestSeason: 'Summer (June–August)',
    difficulty: 'Extreme',
    route: ['Islamabad', 'Skardu', 'Askole', 'Jhola', 'Paiju', 'Urdokas', 'Goro II', 'Concordia', 'K2 BC', 'Skardu', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Team briefing, gear check, and overnight rest in Islamabad.' },
      { day: '2', title: 'Fly to Skardu', description: 'Scenic flight over the Karakoram. Rest day in Skardu. Visit Kachura Lake.' },
      { day: '3', title: 'Skardu to Askole', description: 'Jeep ride to Askole (3,040m), the last village before the wilderness.' },
      { day: '4', title: 'Askole to Jhola', description: 'Trek along the Braldu River gorge. Cross cable bridges. Camp at Jhola (3,200m).' },
      { day: '5', title: 'Jhola to Paiju', description: 'Trek through rocky terrain to Paiju Camp (3,480m) beneath Paiju Peak.' },
      { day: '6', title: 'Paiju Rest & Acclimatize', description: 'Rest day for acclimatization. Short hikes for glacier views. Gear preparation.' },
      { day: '7', title: 'Paiju to Urdokas', description: 'Cross onto the Baltoro Glacier. Camp at Urdokas (4,050m). Trango Towers visible.' },
      { day: '8', title: 'Urdokas to Goro II', description: 'Trek through glacier moraine. Gasherbrum group comes into view. Camp at 4,450m.' },
      { day: '9', title: 'Goro II to Concordia', description: 'Arrive at Concordia (4,600m). K2, Broad Peak, Gasherbrums, Mitre Peak — all visible.' },
      { day: '10', title: 'Concordia to K2 Base Camp', description: 'Trek to K2 Base Camp (5,150m). Stand at the foot of K2. Return to Concordia.' },
      { day: '11', title: 'Concordia to Goro II', description: 'Begin return trek. Retrace route back to Goro II.' },
      { day: '12', title: 'Goro II to Paiju', description: 'Long day trekking back through the glacier to Paiju.' },
      { day: '13', title: 'Paiju to Askole', description: 'Final trek day back to Askole village. Celebration dinner.' },
      { day: '14', title: 'Askole to Skardu to Islamabad', description: 'Jeep to Skardu, fly to Islamabad. Tour concludes.' }
    ],
    includes: ['All transport (flights + jeeps)', 'Accommodation (hotels in cities, tents on trek)', 'All meals during trek', 'Experienced high-altitude guide & porters', 'All camping & cooking equipment', 'Trekking permits (national park, restricted zone)', 'First aid & emergency plan'],
    excludes: ['International flights', 'Personal trekking gear (boots, clothing, sleeping bag)', 'Travel & rescue insurance (mandatory)', 'Tips for porters & guides', 'Personal expenses', 'Visa fees'],
    gallery: []
  },
  {
    id: 113, name: 'Pakistan Hunza & Kalash Festival Tour', country: 'Gilgit Region', category: 'tour',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    rating: 4.9, reviews: 47, price: 145000, featured: true,
    description: 'A 15-day cultural and adventure tour combining the best of Hunza Valley with the vibrant Kalash Festival. Experience Shandur Polo, Kalash ceremonies, and the stunning landscapes of GB and Chitral.',
    highlights: ['Kalash Festival', 'Hunza Valley', 'Shandur Polo Ground', 'Chitral Valley', 'Khunjerab Pass', 'Cultural Immersion'],
    duration: '15 Days / 14 Nights',
    priceUSD: '$1000–1150/person',
    groupSize: '6–15 people',
    bestSeason: 'Summer (May–June for Chilimjusht Festival)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Hunza', 'Khunjerab', 'Gilgit', 'Shandur', 'Chitral', 'Kalash', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrival in Islamabad', description: 'Airport pickup. City tour: Faisal Mosque, Pakistan Monument. Welcome dinner.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Drive via KKH along the Indus. Overnight Chilas.' },
      { day: '3', title: 'Chilas to Karimabad', description: 'Continue to Hunza Valley. Eagle\'s Nest sunset.' },
      { day: '4', title: 'Hunza Valley Exploration', description: 'Baltit Fort, Altit Fort, Sacred Rock, local markets and food.' },
      { day: '5', title: 'Khunjerab Pass', description: 'Full-day excursion to Khunjerab Pass (4,693m). Passu Cones on return.' },
      { day: '6', title: 'Attabad Lake & Hunza', description: 'Boat ride on Attabad Lake. Hussaini Bridge. Leisure afternoon.' },
      { day: '7', title: 'Hunza to Gilgit', description: 'Drive to Gilgit. Visit Kargah Buddha, bazaar, and local restaurants.' },
      { day: '8', title: 'Gilgit to Phandar Valley', description: 'Drive through Ghizer to Phandar. Boat ride on pristine Phandar Lake.' },
      { day: '9', title: 'Phandar to Shandur Pass', description: 'Drive to Shandur Pass (3,700m). Visit polo ground. Camp under the stars.' },
      { day: '10', title: 'Shandur to Chitral', description: 'Descend via Mastuj to Chitral town. Visit Chitral Fort and Shahi Mosque.' },
      { day: '11', title: 'Chitral to Kalash Valley', description: 'Drive to Bumburet Valley. Introduction to Kalash culture and village walk.' },
      { day: '12', title: 'Kalash Festival Day', description: 'Attend Kalash festival celebrations. Traditional music, dance, and ceremonies.' },
      { day: '13', title: 'Kalash Valley Exploration', description: 'Visit Rumbur and Birir valleys. Explore temples, graveyards, and traditions.' },
      { day: '14', title: 'Kalash to Chitral', description: 'Return to Chitral. Evening rest and local dinner.' },
      { day: '15', title: 'Chitral to Islamabad', description: 'Fly from Chitral (or drive via Lowari Tunnel). Tour concludes in Islamabad.' }
    ],
    includes: ['All ground transport (4x4 Jeep)', 'Accommodation (hotels, guest houses, camping)', 'All meals', 'Cultural & adventure guide', 'Kalash valley permits', 'Camping equipment', 'Festival access coordination', 'First aid kit'],
    excludes: ['Chitral–Islamabad flight', 'International flights', 'Personal expenses', 'Travel insurance', 'Tips & gratuities'],
    gallery: []
  }
];

async function seedTours() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let inserted = 0;
    let updated = 0;

    for (const tour of tours) {
      const existing = await Destination.findOne({ name: tour.name });
      if (existing) {
        await Destination.findOneAndUpdate({ name: tour.name }, tour, { runValidators: true });
        updated++;
        console.log(`  Updated: ${tour.name}`);
      } else {
        await Destination.create(tour);
        inserted++;
        console.log(`  Inserted: ${tour.name}`);
      }
    }

    console.log(`\nSeed complete! Inserted: ${inserted}, Updated: ${updated}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedTours();
