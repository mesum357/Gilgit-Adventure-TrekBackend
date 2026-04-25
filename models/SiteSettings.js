const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  _singleton: { type: String, default: 'site-settings', unique: true },

  contact: {
    whatsappNumber: { type: String, default: '+923465001043' },
    whatsappUrl: { type: String, default: 'https://wa.me/923465001043' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' }
  },

  bookingConfig: {
    serviceFee: { type: Number, default: 2000 },
    porterFeePerNight: { type: Number, default: 3000 },
    childDiscount: { type: Number, default: 0.5 }
  },

  aiTripPlanner: {
    welcomeMessage: { type: String, default: "Assalam o Alaikum! I'm your AI trek planning assistant for Northern Pakistan. Set your preferences on the left and click <strong>Generate My Trek</strong> to get a personalized itinerary through Gilgit-Baltistan!" },
    aiResponses: { type: mongoose.Schema.Types.Mixed, default: {} },
    chatResponses: { type: mongoose.Schema.Types.Mixed, default: {} }
  },

  seo: {
    siteTitle: { type: String, default: 'Gilgit Adventure Treks — Pakistan\'s #1 Adventure & Trekking Company' },
    metaDescription: { type: String, default: 'Book K2 Base Camp treks, Fairy Meadows tours, Hunza Valley trips & Karakoram Highway jeep safaris with Pakistan\'s most trusted adventure company. Expert local guides, best prices guaranteed.' },
    keywords: { type: String, default: 'gilgit adventure treks, k2 base camp trek, fairy meadows tour, hunza valley trekking, pakistan adventure tours, karakoram highway, skardu tours, northern pakistan trekking, gilgit baltistan tours, nanga parbat trek' },
    ogImage: { type: String, default: 'images/k2.jpg' },
    canonicalUrl: { type: String, default: 'https://gilgitadventuretreks.com' },
    founderName: { type: String, default: 'Aisha' },
    foundingYear: { type: String, default: '2018' },
    priceRange: { type: String, default: '$$' },
    officeAddress: { type: String, default: 'Main Bazaar, Gilgit, Gilgit-Baltistan, Pakistan' },
    geoLatitude: { type: String, default: '35.9208' },
    geoLongitude: { type: String, default: '74.3144' },
    socialProfiles: {
      facebook: { type: String, default: 'https://www.facebook.com/gilgitadventuretreks' },
      instagram: { type: String, default: 'https://www.instagram.com/gilgit_adventure_treks/' },
      youtube: { type: String, default: 'https://www.youtube.com/@sabir4053' },
      tiktok: { type: String, default: '' },
      twitter: { type: String, default: '' }
    },
    googleVerification: { type: String, default: '' },
    bingVerification: { type: String, default: '' },
    ga4MeasurementId: { type: String, default: '' },
    gtmContainerId: { type: String, default: '' },
    fbPixelId: { type: String, default: '' },
    clarityId: { type: String, default: '' }
  }

}, { timestamps: true });

// Static method to get the singleton
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne({ _singleton: 'site-settings' });
  if (!settings) {
    settings = await this.create({ _singleton: 'site-settings' });
  }
  return settings;
};

// Static method to update settings
siteSettingsSchema.statics.updateSettings = async function (data) {
  const settings = await this.findOneAndUpdate(
    { _singleton: 'site-settings' },
    { $set: data },
    { new: true, upsert: true, runValidators: true }
  );
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
