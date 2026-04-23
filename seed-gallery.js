require('dotenv').config();
const mongoose = require('mongoose');
const GalleryImage = require('./models/GalleryImage');

// Images organized by category (folder name -> data-gallery value)
const categories = {
  'Autumn': {
    category: 'autumn',
    altText: 'Autumn colours in Gilgit-Baltistan — Gilgit Adventure Treks',
    files: [
      '20181025_103649-01.jpeg',
      '20181025_104922-01.jpeg',
      '20181025_153700-01.jpeg',
      '20181026_074326-01.jpeg',
      '20181110_142412-01.jpeg',
      '20201006_142922-01.jpeg',
      '20211114_112715.jpg',
      'FB_IMG_1569389019798-01.jpeg',
      'FB_IMG_1570200021290.jpg',
      'FB_IMG_1570200037182.jpg',
      'IMG-20181026-WA0004-01.jpeg',
      'IMG-20181110-WA0028-01.jpeg',
      'IMG-20181110-WA0029-01.jpeg',
      'JPEG_147568859945566.jpg'
    ]
  },
  'Bike Tours': {
    category: 'bike-tours',
    altText: 'Bike tour adventure in Northern Pakistan — Gilgit Adventure Treks',
    files: [
      'IMG_20191126_132124_018.jpg',
      'IMG-20191121-WA0020.jpg',
      'IMG-20191121-WA0021.jpg',
      'IMG-20191121-WA0022.jpg',
      'IMG-20191121-WA0023.jpg',
      'IMG-20191121-WA0024.jpg',
      'IMG-20191121-WA0025.jpg',
      'IMG-20191121-WA0026.jpg',
      'IMG-20191121-WA0028.jpg',
      'IMG-20191121-WA0029.jpg',
      'IMG-20191121-WA0030.jpg',
      'IMG-20191125-WA0036.jpg',
      'IMG-20191125-WA0037.jpg',
      'IMG-20191125-WA0038.jpg',
      'IMG-20191125-WA0039.jpg',
      'IMG-20191125-WA0040-01.jpeg',
      'IMG-20191125-WA0045.jpg',
      'IMG-20191125-WA0046.jpg',
      'IMG-20191125-WA0047.jpg',
      'IMG-20191125-WA0048.jpg',
      'IMG-20191125-WA0049.jpg',
      'IMG-20191126-WA0000.jpg'
    ]
  },
  'Blossom': {
    category: 'blossom',
    altText: 'Blossom season in Gilgit-Baltistan — Gilgit Adventure Treks',
    files: [
      'IMG_20191126_132219_615.jpg',
      'IMG-20191125-WA0026.jpg',
      'IMG-20191125-WA0028.jpg',
      'IMG-20191125-WA0029.jpg',
      'IMG-20191125-WA0030.jpg',
      'IMG-20191125-WA0031.jpg',
      'IMG-20191125-WA0032.jpg',
      'IMG-20191125-WA0033.jpg',
      'IMG-20191125-WA0034.jpg',
      'IMG-20191125-WA0035.jpg',
      'IMG-20191125-WA0042.jpg',
      'IMG-20191125-WA0043.jpg',
      'IMG-20191125-WA0044.jpg',
      'IMG-20191125-WA0050.jpg',
      'IMG-20191125-WA0051.jpg'
    ]
  },
  'Lakes': {
    category: 'lakes',
    altText: 'Mountain lake in Gilgit-Baltistan — Gilgit Adventure Treks',
    files: [
      '20211016_102833.jpg',
      '20211016_102836.jpg',
      '20211016_105525.jpg',
      '20211016_105526.jpg',
      '20211016_105531.jpg',
      '20211016_105541.jpg',
      '20211016_111017.jpg',
      '20211016_111023.jpg',
      '20211016_111334.jpg',
      '20211016_111336.jpg',
      '20211016_111342.jpg',
      '20211016_111354.jpg',
      '20211016_111410.jpg',
      '20211016_111413.jpg',
      '20211016_111418.jpg'
    ]
  },
  'Mountains': {
    category: 'mountains',
    altText: 'Mountain landscape in Gilgit-Baltistan — Gilgit Adventure Treks',
    files: [
      '20210509_091517.jpg',
      '20210509_091522-01.jpeg',
      '20210917_072729_03-1.jpg',
      '20210917_081029.jpg',
      '20210917_081041.jpg',
      '20210917_081327.jpg',
      '20210917_083755-1.jpg',
      '20211007_204849.jpg',
      '20211007_204909.jpg',
      'DSC_2392_.JPG',
      'DSC_2394_.JPG',
      'DSC_2397_.JPG',
      'DSC_2402_.JPG',
      'DSC_2422_.JPG',
      'DSC_2486_.JPG',
      'DSC_2495_.JPG',
      'DSC_2497_.JPG',
      'DSC_2510_.JPG',
      'DSC_2531_.JPG',
      'DSC_2728_.JPG',
      'DSC_2729_.JPG',
      'DSC_2730_.JPG',
      'DSC_2731_.JPG',
      'DSC_2738_.JPG'
    ]
  },
  'Roads': {
    category: 'roads',
    altText: 'Scenic road in Northern Pakistan — Gilgit Adventure Treks',
    files: [
      'DSC_2102_.JPG',
      'DSC_2105_.JPG',
      'DSC_2107_.JPG',
      'DSC_2149_.JPG',
      'DSC_2174_.JPG',
      'DSC_2175_.JPG',
      'DSC_2177_.JPG',
      'DSC_2263_.JPG',
      'DSC_2273_.JPG',
      'DSC_2305_.JPG',
      'DSC_2383_.JPG'
    ]
  }
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing gallery images
  const deleted = await GalleryImage.deleteMany({});
  console.log('Cleared ' + deleted.deletedCount + ' existing gallery images');

  // Build docs from all categories
  var docs = [];
  var order = 1;
  Object.keys(categories).forEach(function(folder) {
    var cat = categories[folder];
    cat.files.forEach(function(filename) {
      var thumbName = filename.replace(/\.(jpe?g|png|webp)$/i, '.jpg');
      docs.push({
        imageUrl: '/images/Northern Gallery/thumbs/' + folder + '/' + thumbName,
        altText: cat.altText,
        category: cat.category,
        hidden: false,
        sortOrder: order++
      });
    });
  });

  await GalleryImage.insertMany(docs);
  console.log('Inserted ' + docs.length + ' gallery images across ' + Object.keys(categories).length + ' categories');

  process.exit(0);
}

seed().catch(function(e) { console.error(e); process.exit(1); });
