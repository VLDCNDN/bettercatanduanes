/** Wikipedia snapshot, not an independently verified directory of officials. */
export const governmentSource = {
  url: 'https://en.wikipedia.org/wiki/Catanduanes',
  revisionUrl:
    'https://en.wikipedia.org/w/index.php?title=Catanduanes&oldid=1379919938',
  recordedAt: '2026-10-29',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
};

// Follow the infobox; the article's Government section contains older names.
// Do not add term dates or board members until supported by a dated source.
export const provincialLeaders = [
  {
    id: 'patrick-azanza',
    role: 'Governor',
    name: 'Patrick Alain T. Azanza',
    image: '/images/officials/patrick-azanza.jpg',
    imageWidth: 225,
    imageHeight: 224,
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Portrait_of_Gov._Patrick_Azanza.jpg',
    imageCredit: 'Dr. Patrick Alain T. Azanza · Wikimedia Commons',
  },
  {
    id: 'robert-fernandez',
    role: 'Vice Governor',
    name: 'Robert A. Fernandez',
    image: '/images/officials/robert-fernandez.jpg',
    imageWidth: 500,
    imageHeight: 504,
    imageSource:
      'https://www.pinoyexpose.net/news/catanduanes-governor-vindicated-as-omb-suspends-vice-gov-all-sp-members',
    imageCredit: 'Facebook · Pinoy Exposé',
  },
  {
    id: 'eulogio-rodriguez',
    role: 'Representative in Congress',
    name: 'Eulogio R. Rodriguez',
    image: '/images/officials/eulogio-rodriguez.jpg',
    imageWidth: 288,
    imageHeight: 387,
    imageSource:
      'https://commons.wikimedia.org/wiki/File:Rep._Eulogio_Rodriguez_(20th_Congress).jpg',
    imageCredit:
      'House of Representatives of the Philippines · Wikimedia Commons',
  },
];

// Barangay counts from the article's Administrative divisions table.
// No population columns: that table uses an older census than the infobox.
export const governmentMunicipalities = [
  { id: 'bagamanoc', name: 'Bagamanoc', barangays: 18 },
  { id: 'baras', name: 'Baras', barangays: 29 },
  { id: 'bato', name: 'Bato', barangays: 27 },
  { id: 'caramoran', name: 'Caramoran', barangays: 27 },
  { id: 'gigmoto', name: 'Gigmoto', barangays: 9 },
  { id: 'pandan', name: 'Pandan', barangays: 26 },
  { id: 'panganiban', name: 'Panganiban', barangays: 23 },
  { id: 'san-andres', name: 'San Andres', barangays: 38 },
  { id: 'san-miguel', name: 'San Miguel', barangays: 24 },
  { id: 'viga', name: 'Viga', barangays: 31 },
  { id: 'virac', name: 'Virac', barangays: 63 },
];

