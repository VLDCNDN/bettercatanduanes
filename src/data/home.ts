export const homeSources = {
  population:
    'https://rsso05.psa.gov.ph/content/highlights-2024-census-population-catanduanes',
  psgc: 'https://psa.gov.ph/classification/psgc/citimuni/0502000000',
  history:
    'https://issuances-library.senate.gov.ph/legislative-issuance/commonwealth-act-687',
  abacaCapital:
    'https://lawphil.net/statutes/repacts/ra2022/ra_11700_2022.html',
  abaca:
    'https://rsso05.psa.gov.ph/content/catanduanes-remains-philippines-top-abaca-producer-2025',
  culture:
    'https://mirror.pia.gov.ph/news/2023/10/31/pantomina-showdown-featured-in-78th-catandungan-fest',
  hotlines: 'https://provinceofcatanduanes.gov.ph/',
};
export const provinceFacts = [
  {
    label: "Population",
    value: '261,169',
    reference: "1 July 2024 · 2024 POPCEN",
  },
  {
    label: "Number of municipalities",
    value: '11',
    reference: "PSGC · 31 July 2025",
  },
  {
    label: "Number of barangays",
    value: '315',
    reference: "PSGC · 31 July 2025",
  },
  { label: "Capital", value: "Virac", reference: 'PSA · Catanduanes' },
] as const;
export const historyMilestones = [
  {
    year: '1945',
    title: "A province of its own",
    description:
      "Commonwealth Act No. 687 provided for Catanduanes to separate from Albay, with Virac as its capital.",
    sourceLabel: 'Commonwealth Act No. 687',
    sourceUrl: homeSources.history,
  },
  {
    year: '1995',
    title: "Catandungan Festival begins",
    description:
      "The festival began on the province's 50th anniversary, bringing together cultural celebrations from its communities.",
    sourceLabel: "PIA · Catandungan Festival history",
    sourceUrl: homeSources.culture,
  },
  {
    year: '2022',
    title: "Abaca Capital of the Philippines",
    description:
      "Republic Act No. 11700 declared Catanduanes the Abaca Capital of the Philippines, recognizing the industry's role in livelihoods and agriculture.",
    sourceLabel: 'Republic Act No. 11700',
    sourceUrl: homeSources.abacaCapital,
  },
] as const;

export const cultureHighlights = [
  {
    id: 'abaca',
    title: "Abaca and livelihoods",
    metric: '20.2%',
    metricLabel: "of national abaca production in 2025",
    description:
      "Catanduanes led the country in abaca fiber production, producing 11,256.59 metric tons in 2025. Output fell 44.7% from 2024.",
    sourceLabel: "PSA · Abaca production, 2025",
    sourceUrl: homeSources.abaca,
  },
  {
    id: 'pantomina',
    title: "Pantomina in the community",
    metric: '9',
    metricLabel: "municipalities joined the Pantomina showdown in 2023",
    description:
      "On 25 October 2023, participants from nine municipalities danced through Virac's streets. This traditional courtship dance is also part of weddings and community gatherings.",
    sourceLabel: "PIA · Pantomina, 25 October 2023",
    sourceUrl: homeSources.culture,
  },
] as const;

// Transcribed from the user-provided provincial website screenshot.
// The live website blocked retrieval; these numbers have not been test-called.
export const hotlineRecordedAt = '2026-10-29';
export const hotlines = [
  {
    id: 'pdrrmo',
    office: 'PDRRMO',
    description: "Disaster response and rescue",
    phone: '0912-670-7777',
    tel: 'tel:+639126707777',
  },
  {
    id: 'pnp',
    office: 'PNP Catanduanes',
    description: "Police",
    phone: '0948-652-9970',
    tel: 'tel:+639486529970',
  },
  {
    id: 'bfp',
    office: 'BFP Catanduanes',
    description: "Fire and rescue",
    phone: '0933-826-9295',
    tel: 'tel:+639338269295',
  },
  {
    id: 'coast-guard',
    office: 'Catanduanes Coast Guard',
    description: "Maritime safety",
    phone: '0947-831-0880',
    tel: 'tel:+639478310880',
  },
  {
    id: 'red-cross',
    office: 'Philippine Red Cross',
    description: "Medical and humanitarian assistance",
    phone: '0951-103-1624',
    tel: 'tel:+639511031624',
  },
  {
    id: 'army',
    office: 'Philippine Army',
    description: "Army",
    phone: '0965-993-8056',
    tel: 'tel:+639659938056',
  },
  {
    id: 'pagasa',
    office: 'DOST PAGASA',
    description: "Weather information",
    phone: '0918-311-1420',
    tel: 'tel:+639183111420',
  },
] as const;
