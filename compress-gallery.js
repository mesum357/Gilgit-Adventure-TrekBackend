/**
 * Compress gallery images into optimized thumbnails.
 *
 * Source: ../Gilgit-Adventure-TrekFrontend/images/Northern Gallery/<category>/
 * Output: ../Gilgit-Adventure-TrekFrontend/images/Northern Gallery/thumbs/<category>/
 *
 * Resizes to 800px wide, JPEG quality 80.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'Gilgit-Adventure-TrekFrontend', 'images', 'Northern Gallery');
const THUMBS = path.join(BASE, 'thumbs');
const WIDTH = 800;
const QUALITY = 80;

async function run() {
  const folders = fs.readdirSync(BASE).filter(function(d) {
    return d !== 'thumbs' && fs.statSync(path.join(BASE, d)).isDirectory();
  });

  var total = 0;
  var savedBytes = 0;

  for (var i = 0; i < folders.length; i++) {
    var folder = folders[i];
    var srcDir = path.join(BASE, folder);
    var outDir = path.join(THUMBS, folder);
    fs.mkdirSync(outDir, { recursive: true });

    var files = fs.readdirSync(srcDir).filter(function(f) {
      return /\.(jpe?g|png|webp)$/i.test(f);
    });

    console.log(folder + ': ' + files.length + ' images');

    for (var j = 0; j < files.length; j++) {
      var file = files[j];
      var src = path.join(srcDir, file);
      var outName = file.replace(/\.(jpe?g|png|webp)$/i, '.jpg');
      var dst = path.join(outDir, outName);

      var origSize = fs.statSync(src).size;

      await sharp(src)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY })
        .toFile(dst);

      var newSize = fs.statSync(dst).size;
      savedBytes += origSize - newSize;
      total++;
    }
  }

  console.log('\nDone! Compressed ' + total + ' images');
  console.log('Saved ' + (savedBytes / 1024 / 1024).toFixed(1) + ' MB');
}

run().catch(function(e) { console.error(e); process.exit(1); });
