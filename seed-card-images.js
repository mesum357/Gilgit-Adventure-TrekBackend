require('dotenv').config();
var mongoose = require('mongoose');
var Destination = require('./models/Destination');

var imageMap = {
  1:  '/images/gallery/IMG-20210724-WA0115.jpg',
  2:  '/images/gallery/IMG-20210724-WA0053.jpg',
  3:  '/images/gallery/IMG-20210724-WA0114.jpg',
  4:  '/images/gallery/IMG-20210724-WA0087.jpg',
  5:  '/images/gallery/IMG-20210724-WA0113.jpg',
  6:  '/images/gallery/IMG-20210724-WA0071.jpg',
  7:  '/images/gallery/IMG-20210724-WA0080.jpg',
  8:  '/images/gallery/IMG-20210724-WA0082.jpg',
  9:  '/images/gallery/IMG-20210724-WA0108.jpg',
  10: '/images/gallery/IMG-20210724-WA0068.jpg',
  11: '/images/gallery/IMG-20210725-WA0061.jpg',
  12: '/images/gallery/IMG-20210724-WA0083.jpg',
  13: '/images/gallery/IMG-20210725-WA0037.jpg',
  14: '/images/gallery/IMG-20210724-WA0063.jpg',
  15: '/images/gallery/IMG-20210724-WA0069.jpg',
  16: '/images/gallery/IMG-20210724-WA0074.jpg'
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  var ids = Object.keys(imageMap);
  for (var i = 0; i < ids.length; i++) {
    var id = Number(ids[i]);
    var result = await Destination.findOneAndUpdate(
      { id: id },
      { image: imageMap[id] },
      { new: true }
    );
    if (result) {
      console.log('  Updated ID ' + id + ': ' + result.name + ' -> ' + imageMap[id]);
    } else {
      console.log('  NOT FOUND ID ' + id);
    }
  }

  console.log('\nDone! Updated ' + ids.length + ' destination card images.');
  process.exit(0);
}

seed().catch(function(e) { console.error(e); process.exit(1); });
