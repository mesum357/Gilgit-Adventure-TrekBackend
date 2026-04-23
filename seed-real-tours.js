/**
 * Seed script: Insert real tour data from Word documents into MongoDB.
 * Source: c:\Users\hp\OneDrive\Desktop\GB list\ (4 folders)
 *
 * Run:  node seed-real-tours.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const destinations = [

  /* ================================================================
     TOP DESTINATIONS  (category: 'tour')
     ================================================================ */

  {
    id: 1,
    name: '11 Days Pakistan Tour',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150a53?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 700,
    description: 'An 11-day journey from Islamabad through the Karakoram Highway to Gilgit-Baltistan, exploring Hunza Valley, Attabad Lake, Passu, and returning via Lahore with its Mughal heritage sites.',
    highlights: ['Karakoram Highway', 'Hunza Valley', 'Attabad Lake', 'Passu Valley', 'Eagle Nest Viewpoint', 'Badshahi Mosque', 'Lahore Fort', 'Wagah Border'],
    duration: '11 Days',
    priceUSD: '$700',
    groupSize: '7-12',
    bestSeason: 'April - October',
    difficulty: 'Easy',
    route: ['Islamabad', 'Besham', 'Gilgit', 'Hunza', 'Gulmit', 'Passu', 'Gilgit', 'Besham', 'Islamabad', 'Lahore'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive Islamabad, at night time. Transfer to hotel.' },
      { day: '2', title: 'Islamabad to Besham', description: 'Meet on arrival in Islamabad. Drive to Besham via Abbottabad, Batgram & Thakot Bridge. Stop at several places for sightseeing, overnight Besham Hotel.' },
      { day: '3', title: 'Besham to Gilgit', description: 'Drive to Gilgit, stay at Gilgit, visit around Gilgit.' },
      { day: '4', title: 'Gilgit to Hunza', description: 'Drive to Hunza. Lunch at Nagar Valley — from here you can see many nice views. Drive to Hunza, stay at Hunza and visit Hunza Valley. Visit Eagle Nest for sunset. Back to Hotel.' },
      { day: '5', title: 'Hunza to Gulmit & Passu', description: 'Drive to Attabad Lake and take boat to Gulmit. Stay at Gulmit Valley, and visit Passu Valley. Back to Hotel.' },
      { day: '6', title: 'Back to Gilgit', description: 'Back to Gilgit, if possible go back by air next day otherwise by road.' },
      { day: '7', title: 'Gilgit to Besham', description: 'Back to Besham. Stay at Besham.' },
      { day: '8', title: 'Besham to Lahore', description: 'Back to Islamabad, same day drive to Lahore.' },
      { day: '9', title: 'Lahore Sightseeing', description: 'Visit Wagah Border, Visit Meenar-e-Pakistan. Back to Hotel.' },
      { day: '10', title: 'Lahore Heritage', description: 'Visit Badshahi Mosque, Lahore Fort, Lahore Emperor Jahangir\'s Tomb. Back to Hotel.' },
      { day: '11', title: 'Departure', description: 'Visit Market, Food Street and back to Airport. Fly back home.' }
    ],
    includes: [],
    excludes: [],
    gallery: []
  },

  {
    id: 2,
    name: '11 Days Autumn Colors Tour',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 750,
    description: 'The most exciting season in Gilgit-Baltistan is autumn. At the end of summer, orchards start changing color like a bride with a colorful wedding dress. This 11-day autumn tour covers Hunza, Gulmit, Khunjerab Pass, Gupis, Fairy Meadows, and Lahore.',
    highlights: ['Autumn Colors', 'Hunza Valley', 'Baltit Fort', 'Altit Fort', 'Khunjerab Pass 4734m', 'Gupis Valley', 'Fairy Meadows', 'Nanga Parbat Views', 'Lahore Heritage'],
    duration: '11 Days',
    priceUSD: '$750',
    groupSize: '5-12',
    bestSeason: 'September - November',
    difficulty: 'Easy',
    route: ['Islamabad', 'Gilgit', 'Hunza', 'Gulmit', 'Khunjerab', 'Gupis', 'Gilgit', 'Fairy Meadows', 'Chilas', 'Islamabad', 'Lahore'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive at Islamabad Airport and transfer to Hotel.' },
      { day: '2', title: 'Islamabad to Hunza', description: 'Islamabad to Gilgit by air and straight to Hunza. At Karimabad Hunza, visit Baltit Fort Museum and Altit Fort. Visit Eagle Nest for view of Hunza and spectacular sunshine view. Ultar, Hunza Dome, Bublimating, Spantik and Diran are famous peaks visible from here.' },
      { day: '3', title: 'Hunza to Gulmit', description: 'Drive to Gulmit village crossing tunnel and Attabad Lake. Visit village old house and upper village for colors and view of Attabad Lake. Visit Hussaini Suspension Bridge near village.' },
      { day: '4', title: 'Gulmit to Khunjerab & Back', description: 'Departure for the Sino-Pak border at Khunjerab, crossing the villages of Passu and Sost en route. Khunjerab is the highest point on KKH at 4734m and considered the highest trade route in the world.' },
      { day: '5', title: 'Gulmit to Gupis', description: 'Departure to Gupis Valley. On the way visit Gahkuch and upper Gahkuch for autumn colors. Stay overnight at Gupis. At this village we have to find Trout Fish for dinner.' },
      { day: '6', title: 'Gupis to Gilgit', description: 'Drive back to Gilgit, visit Kargah Buddha and visit city market. Stay overnight at Gilgit.' },
      { day: '7', title: 'Gilgit to Fairy Meadows', description: 'Drive to Raikot Bridge and take Mountain Jeep to Tatto Valley and ride horse to Fairy Meadows.' },
      { day: '8', title: 'Fairy Meadows & Bayal Camp', description: 'Day hike to Bayal Camp between big jungle and beautiful hills. Back to Fairy Meadows. In this night make fire camp and enjoy beautiful night with views of Nanga Parbat.' },
      { day: '9', title: 'Fairy Meadows to Chilas', description: 'Early in the morning come back to Raikot Bridge and drive to Chilas. Stay overnight at Chilas town.' },
      { day: '10', title: 'Chilas to Islamabad', description: 'Drive to Islamabad from Chilas, stop many times for photos at Mansehra city and Abbottabad city. Stay overnight at Islamabad.' },
      { day: '11', title: 'Islamabad to Lahore', description: 'Early departure from Islamabad to Lahore. Visit Badshahi Mosque, Meenar-e-Pakistan, Shahi Qilla and Food Street. Stay overnight at Lahore.' }
    ],
    includes: [],
    excludes: [],
    gallery: []
  },

  {
    id: 3,
    name: '15 Days Autumn Tour Gilgit-Baltistan & Lahore',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 1200,
    description: 'A comprehensive 15-day autumn itinerary covering Islamabad, Fairy Meadows, Hunza Valley, Passu, Yunz Valley, Hoper Valley, Gilgit, and Lahore — the ultimate Gilgit-Baltistan experience during peak autumn colors.',
    highlights: ['Fairy Meadows', 'Nanga Parbat Bayal Camp', 'Hunza Forts', 'Eagle Nest', 'Attabad Lake', 'Hussaini Bridge', 'Passu Glacier', 'Yunz Valley Trek', 'Hoper Valley', 'Kargah Buddha', 'Taxila Museum', 'Lahore Heritage', 'Wagah Border'],
    duration: '15 Days',
    priceUSD: '$1200',
    groupSize: '5-12',
    bestSeason: 'September - November',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Passu', 'Minapin', 'Gilgit', 'Islamabad', 'Lahore'],
    itinerary: [
      { day: '1', title: 'Islamabad', description: 'Arrival at Islamabad International Airport. Transfer to hotel, visit Faisal Masjid, Margallah Hills, Truck Art. Evening back to Islamabad, stay overnight.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Early morning drive to Chilas. On the way stop at different areas of KPK Province (Khyber Pakhtunkhwa), upper Kohistan area and Shatial Rocks Carving. It takes 9.5 hours to reach Chilas. Overnight in Chilas.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: '1 hour drive to Raikhot Bridge and take Mountain Jeep to Tatto Valley — 2 hours off-road drive and 3 hours hiking to Fairy Meadows. Stay overnight in a cottage at Fairy Meadows.' },
      { day: '4', title: 'Fairy Meadows & Bayal Camp', description: 'Visit reflection lake of Nanga Parbat and 2 hours hike to Bayal Camp — the nearest viewpoint of Nanga Parbat and whole glacier. Trek back to Fairy Meadows. Stay overnight.' },
      { day: '5', title: 'Fairy Meadows to Hunza', description: 'Trek back from Fairy Meadows to Tatto Valley and take jeep to Raikhot Bridge. Drive to Hunza, stopping at Junction Point of Three Great Mountain Ranges and Old Silk Route in Nagar, and Rakaposhi Viewpoint. Transfer to Hotel at Karimabad Hunza.' },
      { day: '6', title: 'Karimabad Hunza', description: 'Visit Baltit Fort Museum, Altit Fort Museum. Drive up to 3000m high viewpoint of Hunza and Nagar Districts — Duiker (Eagle Nest). Walk along water canals and drive back to Karimabad. Stay overnight.' },
      { day: '7', title: 'Ultar Meadow Trek', description: 'Trek to Ultar Meadow. Trek back to Karimabad, visit old Karimabad bazaar. Back to hotel, stay overnight in Karimabad Hunza.' },
      { day: '8', title: 'Karimabad to Passu', description: 'Drive to Passu. On the way visit the 1000-year-old Ganish village, petroglyphs on the sacred rock of Hunza (Haldeikish), Attabad Lake boating, Gulmit village, Hussaini Suspension Bridge, Borith Lake, and hike to Passu White Glacier. Stay overnight in Passu.' },
      { day: '9', title: 'Yunz Valley Trek', description: 'Early morning visit Passu village and Yunz Valley Pass Trek. Stay overnight in Passu.' },
      { day: '10', title: 'Passu to Minapin', description: 'Drive to Hoper Valley, Cafe de Glacier with views and a walk in the area. Late afternoon drive back to Minapin Valley, District Nagar. Stay overnight in a guesthouse.' },
      { day: '12', title: 'Minapin to Gilgit', description: 'Drive back to Rakaposhi Viewpoint, stop for photos. Drive to Gilgit, visit Kargah Buddha, walk in the old market. Stay overnight in Gilgit.' },
      { day: '13', title: 'Gilgit to Islamabad', description: 'Flight to Islamabad. Visit Taxila Museum, Rawalpindi old market, and Truck Art. Stay overnight in Islamabad.' },
      { day: '14', title: 'Islamabad to Lahore', description: 'Drive to Lahore (350 km, 5 hours via Motorway). Transfer hotel, visit Delhi Gate and Wazir Khan Masjid. Evening visit Food Street and Haveli Restaurant for night view of Badshahi Masjid and Lahore Fort.' },
      { day: '15', title: 'Lahore & Departure', description: 'Early morning visit Meenar-e-Pakistan Garden, Badshahi Masjid, Lahore Fort, Lahore Museum. Afternoon drive to Wagah Border for Closing Ceremony. Drive back to hotel. Midnight drive to Airport and fly back.' }
    ],
    includes: ['Hotel, 2 Person Sharing Room', 'Transportation, AC VIP Coaster/Van', 'Off Road Transportation', 'Guide & Assistant Guide', 'Fee for Forts', 'Toll Taxes', 'Fee for Museums', 'Invitation Letter'],
    excludes: ['International Air Ticket', 'Other expenses'],
    gallery: []
  },

  {
    id: 4,
    name: '20 Days Pakistan North & South Tour',
    country: 'Pakistan',
    category: 'tour',
    featured: true,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 2500,
    description: 'The ultimate Pakistan experience — a 20-day tour combining Northern highlights (Skardu, Hunza, Fairy Meadows) with Southern cultural heritage (Lahore, Multan, Mohenjo-daro, Karachi). From the Karakoram peaks to the Indus Valley Civilization.',
    highlights: ['Skardu', 'Shigar Fort', 'Satpara Lake', 'Hunza Valley', 'Baltit Fort', 'Attabad Lake', 'Khunjerab Pass', 'Fairy Meadows', 'Nanga Parbat', 'Lahore Heritage', 'Harappa Ruins', 'Derawar Fort', 'Mohenjo-daro UNESCO', 'Karachi'],
    duration: '20 Days',
    priceUSD: '$2500',
    groupSize: '5-12',
    bestSeason: 'March - November',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Skardu', 'Minapin', 'Hunza', 'Passu', 'Gilgit', 'Fairy Meadows', 'Besham', 'Islamabad', 'Lahore', 'Multan', 'Bahawalpur', 'Sukkur', 'Hyderabad', 'Karachi'],
    itinerary: [
      { day: '1', title: 'Flight to Pakistan', description: 'Flight to Islamabad, Pakistan. Meeting with tour leader at the airport.' },
      { day: '2', title: 'Islamabad to Skardu', description: 'Arrival in Islamabad and meeting with the local guide. Continue flight to Skardu in Gilgit-Baltistan (approx. 1 hour). Scenic flight with views of the Himalayas and Karakoram. Afternoon sightseeing in Skardu, walk through the town and local bazaar. Overnight in Skardu.' },
      { day: '3', title: 'Skardu Excursion', description: 'Full-day excursion to Shigar Valley (gateway to Karakoram), Shigar Fort, Sarfaranga Cold Desert, and Satpara Lake. Return to Skardu. Overnight stay.' },
      { day: '4', title: 'Skardu to Minapin', description: 'Long scenic drive along the Indus River towards Minapin via Gilgit region. Journey through dramatic mountain landscapes and Karakoram Highway. Arrival in Minapin in the evening. Overnight stay.' },
      { day: '5', title: 'Minapin to Hunza', description: 'Morning walk in Minapin Valley with views of Rakaposhi. Travel to Hunza Valley and Karimabad. Visit Baltit Fort, Altit Fort (UNESCO heritage area). Evening drive to Eagle\'s Nest viewpoint for sunset over Rakaposhi. Overnight in Hunza.' },
      { day: '6', title: 'Hunza to Passu', description: 'Journey along Karakoram Highway: Attabad Lake (boat ride), Passu Glacier viewpoint, Khunjerab Pass (4,693m). Return to Passu village. Overnight stay.' },
      { day: '7', title: 'Passu to Gilgit', description: 'Visit Hussaini Suspension Bridge. Continue to Gilgit. City walk and overnight stay.' },
      { day: '8', title: 'Gilgit to Fairy Meadows', description: 'Drive and jeep transfer to Fairy Meadows followed by a trek. Arrival at one of the most beautiful alpine meadows with views of Nanga Parbat (8,126m). Overnight in wooden huts.' },
      { day: '9', title: 'Fairy Meadows Trekking', description: 'Optional trekking to Beyal Camp and Nanga Parbat Base Camp. Free time for relaxation in Fairy Meadows. Overnight stay.' },
      { day: '10', title: 'Fairy Meadows to Besham', description: 'Return trek and long drive along Karakoram Highway through Kohistan region. Overnight in Besham or Naran.' },
      { day: '11', title: 'Besham to Islamabad', description: 'Drive to Islamabad. En route visit Rawalpindi, including old city and truck art workshops. Overnight in Islamabad.' },
      { day: '12', title: 'Islamabad to Lahore', description: 'Visit Faisal Mosque. Drive to Lahore. Evening sightseeing and overnight stay.' },
      { day: '13', title: 'Lahore City Tour', description: 'Visit Badshahi Mosque, Lahore Fort, old city bazaars. Optional Wagah Border ceremony. Overnight in Lahore.' },
      { day: '14', title: 'Lahore Cultural Day', description: 'Visit Wazir Khan Mosque, Shalimar Gardens, Lahore Museum and Anarkali Bazaar. Overnight in Lahore.' },
      { day: '15', title: 'Lahore to Multan', description: 'Drive to Multan. Stop at Harappa ruins. Arrival in Multan — city tour: Shrine of Shah Rukn-e-Alam, local bazaars. Overnight in Multan.' },
      { day: '16', title: 'Multan to Bahawalpur', description: 'Travel to Bahawalpur via Uch Sharif. Visit Noor Mahal and local cultural sites. Overnight in Bahawalpur.' },
      { day: '17', title: 'Bahawalpur to Sukkur', description: 'Visit Derawar Fort. Continue to Sukkur. Overnight stay.' },
      { day: '18', title: 'Sukkur to Hyderabad', description: 'Visit Mohenjo-daro (UNESCO World Heritage Site). Continue to Hyderabad. Overnight stay.' },
      { day: '19', title: 'Hyderabad to Karachi', description: 'Visit Makli Necropolis. Continue to Karachi. Overnight stay.' },
      { day: '20', title: 'Departure from Karachi', description: 'Transfer to airport for departure.' }
    ],
    includes: [],
    excludes: [],
    gallery: []
  },

  /* ================================================================
     TREKS  (category: 'trek')
     ================================================================ */

  {
    id: 5,
    name: '11 Days Fairy Meadows Trekking Tour',
    country: 'Pakistan',
    category: 'trek',
    featured: true,
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 700,
    description: 'Great but soft adventures at the base camp of Nanga Parbat (8,125m), the lone giant of the Himalayas. This 11-day tour combines Fairy Meadows trekking with Hunza Valley exploration, Khunjerab Pass, and the scenic Ghizer District.',
    highlights: ['Fairy Meadows', 'Nanga Parbat Base Camp', 'Bayal Camp', 'Hunza Valley', 'Hoper Glacier', 'Khunjerab Pass 4734m', 'Hussaini Bridge', 'Phandar Valley', 'Gupis Trout Fish', 'Taxila Museum'],
    duration: '11 Days',
    priceUSD: '$700',
    groupSize: '7-12',
    bestSeason: 'May - October',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Chilas', 'Fairy Meadows', 'Hunza', 'Hoper', 'Passu', 'Khunjerab', 'Gilgit', 'Gupis', 'Besham', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive at Islamabad and transfer to Hotel.' },
      { day: '2', title: 'Islamabad to Chilas', description: 'Depart from Islamabad and arrive at Naran Kaghan Valley crossing the famous towns of Abbottabad and Mansehra. Following the upstream course of River Indus, after a long day aboard, we arrive at Chilas and transfer to hotel for overnight.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Drive to Raikot Bridge on KKH and onwards to Tatto by jeeps at the foot of Fairy Meadows. From there, a 3-hour hike through the primeval pine forests brings us to Fairy Meadows at the base of Nanga Parbat (8,125m).' },
      { day: '4', title: 'Fairy Meadows to Bayal Camp', description: 'A soft trek of 2-3 hours, walking through dense pine forest and birch trees along shallow streams, takes us to Beyal — a summer settlement of shepherds with stunning views of Nanga Parbat (8,125m). Lunch at Bayal Camp and special camp fire at night.' },
      { day: '5', title: 'Fairy Meadows to Hunza', description: 'Back to Raikot Bridge. Drive to Gilgit, stopping at Nanga Parbat viewpoint and the unique point where three mountain ranges — Karakoram, Himalayas and Hindu Kush — meet. Continue to Karimabad Hunza. Visit Baltit Fort Museum and Altit Fort.' },
      { day: '6', title: 'Hunza to Passu', description: 'Drive to Hoper Valley — visit glacier and beautiful sceneries. Back to Hunza and drive to Gojal Valley. On the way visit Attabad Lake for photos, Passu Glacier and Hussaini Suspension Bridge. Drive to Passu. Stay overnight at Passu.' },
      { day: '7', title: 'Passu to Khunjerab & Gilgit', description: 'Drive up to Sino-Pak border at Khunjerab, crossing the villages of Passu and Sost. Khunjerab is the highest point on KKH at 4,734m and considered the highest trade route in the world. Drive back to Gilgit. Stay overnight.' },
      { day: '8', title: 'Gilgit to Gupis', description: 'Drive to Gupis in District Ghizer — very famous for trout fish. Visit Phandar Valley. Back to hotel, stay overnight at PTDC Gupis.' },
      { day: '9', title: 'Gupis to Besham', description: 'Visit another unique valley of Ghizer District (Yaseen Valley) and drive back to Besham. Stay overnight at Besham.' },
      { day: '10', title: 'Besham to Islamabad', description: 'Making an early departure for Islamabad, we arrive at Taxila, the famous capital of Buddhists. Visit Jaulian Monastery and Archaeological Museum and resume drive to Islamabad for overnight.' },
      { day: '11', title: 'Islamabad Excursion & Departure', description: 'Visit Faisal Mosque, Margallah Hills, Shakar Parian, Lakeview Park. Back to Airport. Fly back home.' }
    ],
    includes: ['11 days 10 nights accommodation', 'Two Person Sharing Room', 'Quality transportation with Air-condition'],
    excludes: ['Horse Riding Fee at Fairy Meadows (optional)', 'International Air Ticket'],
    gallery: []
  },

  {
    id: 6,
    name: '15 Days Treks & Tours Plan A',
    country: 'Pakistan',
    category: 'trek',
    featured: true,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 1430,
    description: 'A 15-day adventure starting with a flight to Skardu, exploring Katpana Desert, Shigar, Khaplu Fort, then driving through Gilgit to Hunza, Passu, Khunjerab Top, Ghizer District, and finishing with Fairy Meadows trekking and Islamabad sightseeing.',
    highlights: ['Skardu', 'Katpana Desert', 'Shigar Fort', 'Khaplu Fort', 'Hunza Valley', 'Passu', 'Khunjerab Top', 'Hoper Valley', 'Attabad Lake', 'Gupis', 'Ishkoman Valley', 'Fairy Meadows', 'Bayal Camp', 'Faisal Mosque'],
    duration: '15 Days',
    priceUSD: '$1430',
    groupSize: '5-12',
    bestSeason: 'April - October',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Skardu', 'Shigar', 'Khaplu', 'Minapin', 'Hunza', 'Passu', 'Khunjerab', 'Gilgit', 'Gupis', 'Ishkoman', 'Fairy Meadows', 'Besham', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Skardu', description: 'Arrive at Airport around 3am in the morning, take next flight to Skardu around 6am. Scenic flight with views of Himalayas and Karakoram. Arrival in Skardu, transfer to hotel. Visit Skardu bazaar and surroundings.' },
      { day: '2', title: 'Skardu to Khaplu', description: 'Early morning drive to Katpana Desert, visit around and drive to Shigar District. Visit Shigar Fort and mosque, and continue drive to Khaplu. Stay overnight at Khaplu.' },
      { day: '3', title: 'Khaplu to Skardu', description: 'Early morning visit Khaplu Fort, old mosque, villages. Drive back to Skardu. Stay overnight.' },
      { day: '4', title: 'Skardu to Minapin', description: 'Early morning drive to Gilgit region and drive to Minapin Valley, District Nagar. Stay overnight at Minapin.' },
      { day: '5', title: 'Minapin to Hunza', description: 'Drive to Karimabad Hunza, transfer hotel. Walk up to 3000m high viewpoint and visit Baltit Fort Museum. Stay overnight at Hunza.' },
      { day: '6', title: 'Hunza to Passu', description: 'Drive to Hoper Valley, and drive to Attabad Lake, Hussaini Suspension Bridge, Passu Glacier viewpoint. Stay overnight at Passu.' },
      { day: '7', title: 'Passu to Khunjerab & Gilgit', description: 'Drive straight to Pak-China Border Khunjerab Top. Drive back to Gilgit. Stay overnight at Gilgit.' },
      { day: '8', title: 'Gilgit to Gupis', description: 'Drive to Gupis Valley, District Ghizer, crossing main town Gahkuch. Stay overnight at Gupis.' },
      { day: '9', title: 'Gupis to Ishkoman', description: 'Drive back to Gahkuch, and drive to another valley — Ishkoman. Visit upper Ishkoman and drive back to Gilgit. Stay overnight.' },
      { day: '10', title: 'Gilgit to Fairy Meadows', description: 'Drive to Raikot Bridge, on the way stop at junction point of three mountain ranges. Take Mountain Jeep to Tatto Valley and trek to Fairy Meadows. Stay overnight.' },
      { day: '11', title: 'Fairy Meadows & Bayal Camp', description: 'Day hike to Bayal Camp — the nearest viewpoint of Nanga Parbat and the whole glacier. Trek back to Fairy Meadows. Stay overnight.' },
      { day: '12', title: 'Fairy Meadows to Besham', description: 'Trek back to Tatto and take jeep to Raikot. Drive to Besham via Karakoram Highway. Stay night at Besham.' },
      { day: '13', title: 'Besham to Islamabad', description: 'Drive to Islamabad crossing Mansehra Town and Abbottabad Town. On the way visit Taxila Museum. Stay night at Islamabad.' },
      { day: '14', title: 'Islamabad Sightseeing', description: 'Visit Faisal Masjid, Margallah Hills, Truck Art, and local sightseeing. Stay night at Islamabad.' },
      { day: '15', title: 'Departure', description: 'Around 2am drive to Airport and fly back home.' }
    ],
    includes: ['Transport Land Cruiser Prado', 'Off Road Jeep to Fairy Meadows', 'Fee of Suspension Bridges', 'Fuel', 'Guide', 'Invitation Letter'],
    excludes: ['International Air Tickets', 'Visa Fee', 'Tips'],
    gallery: []
  },

  {
    id: 7,
    name: '15 Days Treks & Tours Plan B',
    country: 'Pakistan',
    category: 'trek',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 1380,
    description: 'An alternative 15-day itinerary starting by road from Islamabad via Besham, featuring Fairy Meadows trekking first, then Hunza, Passu, Khunjerab, Ghizer valleys (Gupis, Phandar, Gahkuch), and back via Karakoram Highway to Islamabad.',
    highlights: ['Fairy Meadows', 'Bayal Camp', 'Nanga Parbat', 'Hunza Valley', 'Hoper Glacier', 'Passu Glacier', 'Khunjerab Top', 'Gupis Valley', 'Phandar Valley', 'Gahkuch', 'Taxila Museum'],
    duration: '15 Days',
    priceUSD: '$1380',
    groupSize: '5-12',
    bestSeason: 'April - October',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Besham', 'Chilas', 'Fairy Meadows', 'Minapin', 'Hunza', 'Passu', 'Khunjerab', 'Gilgit', 'Gupis', 'Phandar', 'Gahkuch', 'Gilgit', 'Besham', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Besham', description: 'Arrive at Islamabad Airport and drive to Besham crossing Abbottabad and Mansehra. It takes 5 hours from Islamabad. Stay overnight at Besham.' },
      { day: '2', title: 'Besham to Chilas', description: 'Early morning drive to Chilas via Karakoram Highway crossing different villages of upper Kohistan area. Stay overnight at Chilas.' },
      { day: '3', title: 'Chilas to Fairy Meadows', description: 'Drive to Raikot Bridge, take mountain jeep from Raikot Bridge to Tatto Valley — 2 hours off-road drive and 3 hours hiking to Fairy Meadows. Stay overnight.' },
      { day: '4', title: 'Fairy Meadows & Bayal Camp', description: 'Day hike to Bayal Camp — the nearest viewpoint of Nanga Parbat and the whole glacier. Trek back to Fairy Meadows. Stay overnight.' },
      { day: '5', title: 'Fairy Meadows to Minapin', description: 'Early morning trek back to Tatto Valley, take mountain jeep to Raikot Bridge. Drive to Minapin Valley. Stay overnight at Minapin.' },
      { day: '6', title: 'Minapin to Hunza', description: 'Drive to Karimabad Hunza, on the way stop for photos at different viewpoints and Rakaposhi viewpoint. Visit Baltit Fort Museum, Eagle Nest. Stay overnight at Hunza.' },
      { day: '7', title: 'Hunza to Passu', description: 'Drive to Hoper Valley, visit the valley and Hoper Glacier. Drive to Attabad Lake, Hussaini Suspension Bridge, and Passu. Stay overnight at Passu.' },
      { day: '8', title: 'Passu to Khunjerab & Gilgit', description: 'Drive up to Pakistan and China border — 4,737m high border in the world. Take photos, visit around. Drive back to Gilgit. Stay overnight.' },
      { day: '9', title: 'Gilgit to Gupis', description: 'Drive to Gupis Valley, District Ghizer, crossing main town Gahkuch. Stay overnight at Gupis.' },
      { day: '10', title: 'Gupis to Phandar & Gahkuch', description: 'Drive up to Phandar Valley and in the evening drive back to Gahkuch. Stay night at Gahkuch.' },
      { day: '11', title: 'Gahkuch to Gilgit', description: 'Drive to upper Gahkuch for panoramic view of whole Gahkuch town. Visit Kargah Buddha and Gilgit old market. Stay overnight at Gilgit.' },
      { day: '12', title: 'Gilgit to Besham', description: 'Drive to Besham via Karakoram Highway. Stay night.' },
      { day: '13', title: 'Besham to Islamabad', description: 'Drive to Islamabad, on the way visit Taxila Museum. Drive to Islamabad, stay night.' },
      { day: '14', title: 'Islamabad Sightseeing', description: 'Visit Faisal Masjid, Margallah Hills, Truck Art, and local sightseeing. Stay night at Islamabad.' },
      { day: '15', title: 'Departure', description: 'Around 2am drive to Airport and fly back home.' }
    ],
    includes: ['Transport Land Cruiser Prado', 'Off Road Jeep to Fairy Meadows', 'Fee of Suspension Bridges', 'Fuel', 'Guide', 'Invitation Letter'],
    excludes: ['International Air Tickets', 'Visa Fee', 'Tips'],
    gallery: []
  },

  {
    id: 8,
    name: 'K2 Base Camp Trek',
    country: 'Pakistan',
    category: 'trek',
    featured: true,
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41128c4b?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 2000,
    description: 'K2 Base Camp trek mainly involves walking over and marching along the world\'s 5th longest non-polar glacier — Baltoro Glacier (63 km). At the end of Baltoro Glacier is Concordia, known as the "Throne Room of Mountain Gods". It is the supreme point from where you can view four 8,000m peaks: K2, Broad Peak, Gasherbrum I, and Gasherbrum II.',
    highlights: ['K2 (8,611m)', 'Concordia', 'Baltoro Glacier', 'Broad Peak', 'Gasherbrum Peaks', 'Paiju Peak', 'Askole Village', 'Skardu'],
    duration: '14 Days',
    priceUSD: '$2000',
    groupSize: '5-10',
    bestSeason: 'Mid June - End August',
    difficulty: 'Extreme',
    route: ['Skardu', 'Askole', 'Jhula', 'Paiju', 'Urdukas', 'Goro', 'Concordia', 'K2 Base Camp', 'Goro', 'Paiju', 'Askole', 'Skardu'],
    itinerary: [
      { day: '1', title: 'Islamabad to Skardu (By Air)', description: 'Early morning flight to Skardu (flights are subject to weather). If unable to fly, we will depart for Skardu by road with overnight stay at Chilas. Overnight stay in hotel at Skardu.' },
      { day: '2', title: 'Skardu to Askole', description: 'After breakfast, embark jeeps for a full day ride on a winding jeep trail to Askole — the last inhabited village on our way to the Great Glaciers. Camp in tents.' },
      { day: '3', title: 'Askole to Jhula', description: 'After breakfast, trek to Jhula. We leave the last inhabited village of Askole. For the remaining portion, we rely on our local team who will carry food and equipment. Trek to the Dumurdo River crossing at Jhula. Camp in tents.' },
      { day: '4', title: 'Jhula to Paiju', description: 'Resume trek along the Braldu River to a green oasis under the shadows of Paiju Peak (6,611m). Camp in tents.' },
      { day: '5', title: 'Rest Day at Paiju', description: 'Rest and acclimatization day at Paiju. Camp in tents.' },
      { day: '6', title: 'Paiju to Urdukas / Khubursae', description: 'Begin trek after an early breakfast. Enter the Baltoro Glacier. Camp in tents.' },
      { day: '7', title: 'Urdukas to Goro I / Goro II', description: 'A long walk on the icy Baltoro Glacier. Camp in tents.' },
      { day: '8', title: 'Goro II to Concordia', description: 'After an early breakfast, resume a long walk on the Baltoro Glacier to Concordia — a huge junction of Baltoro, Abruzzi & Godwin-Austin Glaciers at 4,000m. Camp in tents.' },
      { day: '9', title: 'Concordia & K2 Base Camp', description: 'Members are free to explore K2 Base Camp (a day trip — 4 hrs up, 3 hrs down). After an early breakfast, resume walk to K2 Base Camp. Visit Memorial, lunch at K2 Base Camp and back to Concordia. Camp in tents.' },
      { day: '10', title: 'Concordia to Goro II / Urdukas', description: 'After an early breakfast, trek back to Goro II / Urdukas. Camp in tents.' },
      { day: '11', title: 'Goro II to Paiju', description: 'After an early breakfast, trek to Khubursae / Paiju. Camp in tents.' },
      { day: '12', title: 'Paiju to Jhula', description: 'After an early breakfast, trek back to Jhula. Camp in tents.' },
      { day: '13', title: 'Jhula to Askole & Skardu', description: 'After breakfast, continue walk along the Dumurdo River on an easy path. Upon arrival in Askole, lunch. After lunch, drive to Skardu. Transfer to hotel and check in. Overnight stay in hotel.' },
      { day: '14', title: 'Skardu to Islamabad', description: 'After an early breakfast, drive to Airport and fly to Islamabad. End of services.' }
    ],
    includes: [
      'Traveling Cost (Skardu to Skardu)',
      'Hotel accommodation on twin sharing basis',
      'Sleeping tents on twin person sharing basis',
      'Mattresses',
      '12 Kg porter facility for personal gear',
      'Permit formalities with GB Tourism Department',
      'Trekking permit fees',
      'CKNP waste management fees',
      '4x4 Jeeps (Skardu-Askole-Skardu)',
      'Trekking food (breakfast, lunch & dinner for 13-14 days)',
      'Mess tent, kitchen tent and kitchen crockery',
      'All porters wages, kits and insurance',
      'English speaking Guide and insurance',
      'Tips for baggage handling at airport & hotels',
      'Bridge crossing, cable crossing, camping fees',
      'International flight tickets re-confirmations'
    ],
    excludes: [
      'Member flight tickets',
      'Member personal insurance',
      'Sleeping bag and personal expenses (telephone, fax, email)',
      'Room service',
      'Unforeseen expenses (road block, extra hotel stay, etc.)',
      'Insurance liability and helicopter rescue coverage',
      'Jeep rent for local excursion (Deosai etc.)',
      'Above 12 Kg personal gear will be charged separately'
    ],
    gallery: []
  },

  /* ================================================================
     SAFARIS  (category: 'safari')
     ================================================================ */

  {
    id: 9,
    name: '10 Days Jeep Safari Gilgit-Baltistan & Lahore',
    country: 'Pakistan',
    category: 'safari',
    featured: true,
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=500&fit=crop',
    rating: 4.8,
    reviews: 0,
    price: 900,
    description: 'A 10-day jeep safari covering Hunza Valley, Hoper Glacier, Passu, Khunjerab Pass (4,737m), the scenic Ghizer District (Gupis, Phandar, Ishkoman), and finishing with Lahore heritage sightseeing and Wagah Border ceremony.',
    highlights: ['Hunza Valley', 'Eagle Nest', 'Hoper Glacier', 'Attabad Lake', 'Hussaini Bridge', 'Passu Glacier', 'Khunjerab Pass 4737m', 'Gupis Valley', 'Phandar Valley', 'Ishkoman Valley', 'Kargah Buddha', 'Lahore Fort', 'Wagah Border'],
    duration: '10 Days',
    priceUSD: '$900',
    groupSize: '5-12',
    bestSeason: 'April - November',
    difficulty: 'Easy',
    route: ['Islamabad', 'Gilgit', 'Hunza', 'Hoper', 'Passu', 'Khunjerab', 'Minapin', 'Gupis', 'Phandar', 'Ishkoman', 'Gilgit', 'Islamabad', 'Lahore'],
    itinerary: [
      { day: '1', title: 'Arrive Islamabad', description: 'Arrive at Islamabad. Transfer to hotel, stay night at Islamabad.' },
      { day: '2', title: 'Islamabad to Hunza (by Air)', description: 'Early morning drive to Islamabad Airport and fly to Gilgit by air (55 minutes). Breakfast at Gilgit and drive to Hunza. On the way stop at different villages and Old Silk Route village, Rakaposhi viewpoint. Transfer to hotel at Karimabad Hunza. Visit Eagle Nest viewpoint and Karimabad bazaar.' },
      { day: '3', title: 'Hunza to Passu', description: 'Drive to Hoper Valley for autumn colors, visit glacier and beautiful sceneries (1.5 hours from Hunza). Drive back to Hunza and continue to Gojal (Upper Hunza). Visit Attabad Lake, Hussaini Suspension Bridge, Passu Glacier. Stay overnight at Passu.' },
      { day: '4', title: 'Khunjerab Top & Minapin', description: 'Drive to Pak-China Border Khunjerab Top (4,737m high pass). Stop at Khyber village and Sost village for photos. Drive back to Minapin Valley, District Nagar. Visit village. Stay night at Minapin.' },
      { day: '5', title: 'Minapin to Gupis', description: 'Drive back to Gilgit, and drive to Gupis in District Ghizer — very famous for trout fish and lush green valleys. Stop at different valleys on the way. Visit upper Gahkuch, drive to Gupis, visit Khalti Lake. Stay overnight at Gupis.' },
      { day: '6', title: 'Gupis to Phandar & Gahkuch', description: 'Drive to Phandar Valley and drive to Ghulaghmuli Valley (Ghizer) towards Hindu Kush Mountain Range. Visit villages and drive back to Gahkuch. Gupis to Ghulaghmuli is 70 km, 3.5 hours. Stay night at Gahkuch.' },
      { day: '7', title: 'Gahkuch to Ishkoman & Gilgit', description: 'Drive to upper Gahkuch for autumn colors of apricot and Ghizer views. Drive to Ishkoman Valley, visit different villages. Drive back to Gilgit, visit Kargah Buddha and Old Market. Stay night at Gilgit.' },
      { day: '8', title: 'Gilgit to Lahore', description: 'Depart from Gilgit to Islamabad by air (55 minutes). Visit Faisal Mosque, Truck Art Rawalpindi. Drive to Lahore from Islamabad (350 km, 5 hours via Motorway). Stay night at Lahore.' },
      { day: '9', title: 'Lahore Sightseeing', description: 'Visit Badshahi Masjid, Lahore Fort, Delhi Gate and Wazir Khan Masjid. Evening visit Food Street for dinner. Back to hotel, stay night.' },
      { day: '10', title: 'Lahore & Departure', description: 'Visit Lahore Museum, Jahangir\'s Tomb, Old Bazaar. Around 2pm drive to Wagah Border for closing ceremony. Drive back to Lahore Allama Iqbal International Airport. Fly back home.' }
    ],
    includes: ['Food (Breakfast, Lunch, Dinner)', 'Mineral Water', 'Hotel, 2 Person Sharing Room', 'Transportation, AC VIP Coaster', 'Guide & Assistant Guide', 'Fee for Forts', 'Toll Taxes', 'Invitation Letter'],
    excludes: ['International Air Ticket', 'Other expenses'],
    gallery: []
  },

  {
    id: 10,
    name: '10 Days Jeep Safari & Trekking Tour',
    country: 'Pakistan',
    category: 'safari',
    featured: true,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=500&fit=crop',
    rating: 4.7,
    reviews: 0,
    price: 850,
    description: 'The most exciting season in Gilgit-Baltistan is autumn. This 10-day jeep safari and trekking tour covers Hunza Valley, Hoper Glacier, Passu, Khunjerab Border, Gupis, Fairy Meadows with Nanga Parbat views, and scenic Naran Valley.',
    highlights: ['Hunza Valley', 'Altit Fort', 'Hoper Glacier', 'Attabad Lake', 'Khunjerab Border', 'Gupis Valley', 'Fairy Meadows', 'Nanga Parbat', 'Naran Valley', 'Taxila Museum', 'Faisal Mosque'],
    duration: '10 Days',
    priceUSD: '$850',
    groupSize: '5-12',
    bestSeason: 'April - November',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Mansehra', 'Gilgit', 'Hunza', 'Passu', 'Khunjerab', 'Gilgit', 'Gupis', 'Fairy Meadows', 'Naran', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Islamabad to Mansehra', description: 'Receive from Islamabad Airport and drive to Mansehra. Transfer to hotel. Stay overnight at Mansehra.' },
      { day: '2', title: 'Mansehra to Gilgit', description: 'Departure from Mansehra to Gilgit by road crossing Naran and Kaghan Valley. Stop at different points along the Karakoram Highway. Stay overnight at Gilgit.' },
      { day: '3', title: 'Gilgit to Hunza', description: 'Drive to Hunza. On the way stop at Rakaposhi Viewpoint. Visit Minapin Valley, Altit Fort Garden. Stay overnight at Hunza.' },
      { day: '4', title: 'Hunza to Passu', description: 'Drive to Hoper Valley, visit Hoper Glacier. Drive to Gojal Valley. On the way visit Attabad Lake, Hussaini Suspension Bridge. Stay overnight at Passu.' },
      { day: '5', title: 'Passu to Khunjerab & Gilgit', description: 'Drive to the Sino-Pak border at Khunjerab, crossing the villages of Passu and Sost. Visit Pak-China Border and drive back to Gilgit. Stay overnight at Gilgit.' },
      { day: '6', title: 'Gilgit to Gupis & Gahkuch', description: 'Drive to Gupis Valley (3.5 hours). Drive back to Gahkuch for stay. Visit surrounding valleys.' },
      { day: '7', title: 'Gahkuch to Fairy Meadows', description: 'Drive to Raikot Bridge and take jeep to Tatto Valley. After jeep, trek by foot to Fairy Meadows with views of Nanga Parbat. Stay overnight.' },
      { day: '8', title: 'Fairy Meadows to Naran Valley', description: 'Back to Raikot Bridge and drive to Naran Valley through the crossing of Babusar Pass. Stay overnight at Naran.' },
      { day: '9', title: 'Naran to Islamabad', description: 'Early morning drive to Islamabad. On the way visit Taxila Museum. Stay overnight at Islamabad.' },
      { day: '10', title: 'Islamabad & Departure', description: 'Full day visit Islamabad — Faisal Mosque, Margallah Hills, Rawalpindi Old Market for shopping. Back to Airport, fly back home.' }
    ],
    includes: ['Accommodation on twin sharing room', 'Breakfast, lunch & dinner', 'Mineral water', 'Transportation (AC VIP Coaster)', 'Off-road jeep', 'Guide & Assistant Guide', 'Toll taxes & fort fees', 'Invitation Letter'],
    excludes: ['International Air Ticket', 'Other personal expenses'],
    gallery: []
  },

  /* ================================================================
     CULTURE & HERITAGE  (category: 'heritage')
     ================================================================ */

  {
    id: 11,
    name: 'Pakistan Hunza & Kalash Festival Tour',
    country: 'Pakistan',
    category: 'heritage',
    featured: true,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
    rating: 4.9,
    reviews: 0,
    price: 1500,
    description: 'A 15-day cultural tour combining Gilgit-Baltistan highlights with the unique Kalash Valley Joshi Festival. Travel from Islamabad through Hunza, cross Shandur Pass to Chitral, experience the ancient Kalash culture, and visit Buddhist heritage sites in Swat and Taxila.',
    highlights: ['Hunza Valley', 'Baltit Fort', 'Attabad Lake', 'Hussaini Bridge', 'Hoper Glacier', 'Gupis Valley', 'Shandur Pass', 'Chitral', 'Kalash Valley', 'Joshi Festival', 'Bumburet Valley', 'Swat Buddhist Sites', 'Takht-i-Bahi', 'Taxila Museum', 'Faisal Mosque'],
    duration: '15 Days',
    priceUSD: '$1500',
    groupSize: 'Max 12',
    bestSeason: 'May (Joshi Festival)',
    difficulty: 'Moderate',
    route: ['Islamabad', 'Besham', 'Gilgit', 'Hunza', 'Passu', 'Hoper', 'Minapin', 'Gupis', 'Shandur Pass', 'Mastuj', 'Chitral', 'Kalash Valley', 'Swat', 'Islamabad'],
    itinerary: [
      { day: '1', title: 'Flight to Pakistan', description: 'Flight from home country to Pakistan.' },
      { day: '2', title: 'Islamabad to Besham', description: 'Arrival in Islamabad and 5 hours drive to Besham, KPK Province. Overnight in Besham.' },
      { day: '3', title: 'Besham to Gilgit', description: 'Drive from Besham to Gilgit. On the way stop at viewpoint of Pattan Valley, petroglyphs in Shatial, and junction point of three mountain ranges (Karakoram, Himalayas, Hindu Kush). Stay overnight at Gilgit.' },
      { day: '4', title: 'Gilgit to Hunza', description: 'Drive to Karimabad Hunza. On the way stop at Old Silk Route, Rakaposhi Viewpoint. Visit Baltit Fort Museum, Altit Fort, Eagle Nest for sunset view. Stay overnight at Hunza.' },
      { day: '5', title: 'Hunza to Passu', description: 'Drive to Attabad Lake, visit lake by boat. Visit Hussaini Suspension Bridge, Passu Bridge, Passu Glacier. Stay overnight at Passu.' },
      { day: '6', title: 'Passu to Minapin', description: 'Channel walk in Karimabad, Ganesh Village. Drive to Hoper with view of Hoper Glacier. Drive to Minapin Valley. Stay overnight.' },
      { day: '7', title: 'Minapin to Gupis', description: 'Drive back to Gilgit and drive via Hindu Kush Mountain Range, crossing Gahkuch Town. Stay overnight at Gupis (Khalti Lake).' },
      { day: '8', title: 'Gupis to Mastuj', description: 'Drive to Mastuj crossing Shandur Pass. Stay at Prawak near Mastuj or Buni in a local guesthouse.' },
      { day: '9', title: 'Mastuj to Chitral', description: 'Drive to Chitral. Sightseeing of fort and masjid in Chitral. Overnight in Chitral.' },
      { day: '10', title: 'Chitral to Kalash Valley', description: 'Morning view of Tirich Mir, sightseeing in Chitral. Two hours drive to Kalash Valley. Stay overnight in Kalash for Joshi Festival.' },
      { day: '11', title: 'Kalash Festival Day', description: 'Second day of Joshi Festival. Visit Bumburet Valley and Kalash Museum. Enjoy the Joshi celebrations. Night in Bumburet.' },
      { day: '12', title: 'Kalash to Swat', description: 'Drive back to Ayun and drive to Swat (8 hours drive). Visit Buddhist places in Swat Valley. Overnight in Swat.' },
      { day: '13', title: 'Swat to Islamabad', description: 'Drive to Islamabad. On the way visit Buddhist monastery Takht-i-Bahi and Taxila Museum with sightseeing. Stay overnight at Islamabad.' },
      { day: '14', title: 'Islamabad Sightseeing', description: 'Visit Faisal Masjid, Truck Art, Margallah Hills, and shopping. Overnight in Islamabad.' },
      { day: '15', title: 'Departure', description: 'Drive to Islamabad Airport. Fly back home.' }
    ],
    includes: ['Transport Land Cruiser Prado (Off Road)', 'Van AC VIP', 'Fee of Suspension Bridges', 'Fuel', 'Guide & Assistant Guide', 'Invitation Letter'],
    excludes: ['International Air Tickets', 'Visa Fee', 'Tips'],
    gallery: []
  }

];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error('MONGODB_URI not set'); process.exit(1); }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  let created = 0, updated = 0;
  for (const dest of destinations) {
    const existing = await Destination.findOne({ id: dest.id });
    if (existing) {
      await Destination.findOneAndUpdate({ id: dest.id }, dest, { runValidators: true });
      updated++;
      console.log(`  Updated: ${dest.name}`);
    } else {
      await Destination.create(dest);
      created++;
      console.log(`  Created: ${dest.name}`);
    }
  }

  console.log(`\nDone! Created: ${created}, Updated: ${updated}, Total: ${destinations.length}`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
