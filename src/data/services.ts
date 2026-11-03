import officeRecords from './service-offices.json';

export const sources = {
  treasurer: {
    title: "Provincial Treasurer’s Office Citizen’s Charter",
    publisher: 'Provincial Government of Catanduanes',
    edition: '2024, first edition',
    recordedAt: '2026-11-03',
    url: 'https://provinceofcatanduanes.gov.ph/wp-content/uploads/2025/07/CITIZENS-CHARTER-PTO-PROV-ORD-20241.pdf',
    landingUrl: 'https://provinceofcatanduanes.gov.ph/citizens-charter/',
  },
  offices: {
    title: 'List of Department Heads 2025',
    publisher: 'Provincial Government of Catanduanes',
    edition: '2025 directory',
    recordedAt: '2026-11-03',
    url: 'https://provinceofcatanduanes.gov.ph/department-heads/',
  },
} as const;

export const categories = [
  { id: 'civil-registry', name: 'Certificates & civil registry', description: 'Birth, marriage, and death records and related documents.' },
  { id: 'business', name: 'Business & permits', description: 'Business-related permits, registrations, and provincial taxes.' },
  { id: 'health', name: 'Health & medical assistance', description: 'Published health-office and hospital contacts.' },
  { id: 'social-assistance', name: 'Social assistance', description: 'Social welfare and disability affairs contacts.' },
  { id: 'education-employment', name: 'Education & employment', description: 'Employment and youth development contacts.' },
  { id: 'property-tax', name: 'Property, taxes & construction', description: 'Property transactions, professional tax, and equipment rental.' },
  { id: 'agriculture', name: 'Agriculture, fisheries & livestock', description: 'Agriculture, cooperatives, and veterinary office contacts.' },
  { id: 'emergency', name: 'Emergency & disaster support', description: 'Official disaster-office information and contact sources.' },
] as const;

export type CategoryId = typeof categories[number]['id'];

export interface Office {
  kind: 'office';
  id: string;
  title: string;
  categoryIds: string[];
  phone?: string;
  email?: string;
  note?: string;
  noteSource?: { url: string; label: string };
  aliases?: string;
  page: number;
}

export interface Service {
  kind: 'guide';
  id: string;
  title: string;
  description: string;
  categoryIds: CategoryId[];
  eligibility: string;
  requirements: string[];
  steps: string[];
  sourceUrl: string;
  pages: string;
  officeId: string;
}

export const offices = officeRecords as Office[];

const paymentSteps = [
  'Present the documents to the Provincial Treasurer’s Office for validation and assessment.',
  'Pay the amount assessed by the office and receive the official receipt.',
];

function guide(entry: Omit<Service, 'kind' | 'sourceUrl' | 'officeId'>): Service {
  return { ...entry, kind: 'guide', officeId: 'provincial-treasurer', sourceUrl: `${sources.treasurer.url}#page=${entry.pages.split('–')[0]}` };
}

// Historical source summaries, not confirmation of current requirements or fees.
// Page references refer to the PDF's printed page numbers, which match its PDF pages.
export const services: Service[] = [
  guide({
    id: 'professional-tax', title: 'Pay professional tax',
    description: 'Find the provincial procedure for professional-tax assessment and payment.',
    categoryIds: ['property-tax', 'education-employment'], pages: '14',
    eligibility: 'The charter lists professionals who passed the bar, board, PRC, or other government examinations. Confirm whether the tax applies to your circumstances.',
    requirements: ['Professional ID (PRC), where applicable.', 'For insurance agents: agency ID or examination certificate.', 'For lawyers: IBP ID or certificate of membership in the Philippine Bar.'],
    steps: paymentSteps,
  }),
  guide({
    id: 'property-transfer-tax', title: 'Pay real-property transfer tax',
    description: 'Find the provincial payment procedure for a transfer of real-property ownership.',
    categoryIds: ['property-tax'], pages: '15',
    eligibility: 'Taxpayers transferring real-property ownership, as described in the charter. This payment is separate from title registration and regular real-property tax.',
    requirements: ['Notarized legal transfer instrument, such as a deed of sale, donation, or extrajudicial settlement.', 'Tax declaration.', 'Certificate of real-property tax payment. Confirm the issuing office before your visit.', 'Special Power of Attorney if transacting through a representative.'],
    steps: paymentSteps,
  }),
  guide({
    id: 'delivery-vehicle-tax', title: 'Pay tax for covered delivery vehicles',
    description: 'Read the annual fixed-tax procedure for covered delivery trucks, vans, and other delivery vehicles.',
    categoryIds: ['business'], pages: '5–6',
    eligibility: 'Owners of covered vehicles doing business within Catanduanes. The source describes vehicles used to deliver or distribute certain products; this is not an LTO registration fee.',
    requirements: ['Vehicle Certificate of Registration / Official Receipt from LTO.', 'Provincial Treasurer’s Office registration form.', 'Governor’s Permit.'],
    steps: ['Obtain, complete, and submit the registration form and required documents for assessment.', 'Pay the amount assessed and receive the official receipt and sticker.'],
  }),
  guide({
    id: 'heavy-equipment-rental', title: 'Arrange payment for heavy-equipment rental',
    description: 'Find the payment procedure and equipment-rental source published by the province.',
    categoryIds: ['property-tax'], pages: '9–10',
    eligibility: 'Citizens, business entities, and government agencies, as listed in the charter. Equipment availability and scheduling must be confirmed with the Equipment Pool Office.',
    requirements: ['Order of Payment from the Provincial Equipment Pool Office.', 'Equipment Rental Request Order from the Provincial Equipment Pool Office.'],
    steps: ['Present the paperwork to the Treasurer. The charter also calls for checking the utilization report for a previous rental.', 'Pay the assessed rental amount and receive the official receipt. Confirm equipment release and operating arrangements separately.'],
  }),
  guide({
    id: 'amusement-tax', title: 'Pay amusement tax',
    description: 'Find the assessment and payment procedure for operators of covered amusement places.',
    categoryIds: ['business'], pages: '4',
    eligibility: 'Taxpayers operating amusement places covered by the charter.',
    requirements: ['Certificate of tickets registration.', 'Unsold tickets.', 'Daily count sheet.', 'Amusement tax return from the Provincial Treasurer’s Office.'],
    steps: paymentSteps,
  }),
  guide({
    id: 'ticket-registration', title: 'Register admission tickets',
    description: 'Find the provincial registration procedure for admission tickets subject to amusement tax.',
    categoryIds: ['business'], pages: '7',
    eligibility: 'Taxpayers operating amusement places covered by the charter.',
    requirements: ['Approved Sangguniang Bayan resolution.', 'Admission tickets.', 'Governor’s Permit.'],
    steps: ['Present the documents for validation.', 'Pay the assessed amount. The office prepares the registration certificate and marks the tickets.', 'Receive the official receipt, registration certificate, and registered tickets.'],
  }),
  guide({
    id: 'franchise-tax', title: 'Pay provincial franchise tax',
    description: 'Read the provincial assessment and payment procedure for covered franchise businesses.',
    categoryIds: ['business'], pages: '8',
    eligibility: 'Taxpayers enjoying a franchise, as described in the charter. Confirm applicability and the current assessment with the Treasurer.',
    requirements: ['Declaration of annual gross receipts / report of sales.', 'Governor’s Permit.'],
    steps: paymentSteps,
  }),
  guide({
    id: 'printing-publication-tax', title: 'Pay printing and publication business tax',
    description: 'Find the provincial tax-payment procedure for covered printing and publication businesses.',
    categoryIds: ['business'], pages: '11–12',
    eligibility: 'Taxpayers engaged in the printing or publication business covered by the charter.',
    requirements: ['Declaration of annual gross receipts / report of sales.', 'BIR Form 2551 / 2551Q, as listed in the 2024 document; confirm the currently applicable form.', 'Governor’s Permit.'],
    steps: paymentSteps,
  }),
  guide({
    id: 'quarry-tax', title: 'Pay assessed quarry-resource taxes and fees',
    description: 'Find the payment procedure for sand, gravel, and other covered quarry resources.',
    categoryIds: ['property-tax'], pages: '13',
    eligibility: 'Quarry permittees, as listed in the charter. Payment is separate from obtaining a quarry permit.',
    requirements: ['Notice / Order of Payment issued by ENRO–Catanduanes.', 'Governor’s Permit / Quarry Permit.', 'Invoice and receipt of accountable forms from ENRO–Catanduanes.', 'Monthly report from the taxpayer / permittee.'],
    steps: ['Present the documents and monthly report for validation.', 'Pay the amount in the ENRO Notice / Order of Payment and receive the official receipt.'],
  }),
];

export type DirectoryEntry = Service | Office;
export interface DirectoryFilters {
  query?: string;
  category?: string;
  view?: string;
  municipality?: string;
}

export function filterDirectory({ query = '', category = '', view = 'all' }: DirectoryFilters = {}): DirectoryEntry[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const validCategory = categories.some(item => item.id === category) ? category : '';
  return [...services, ...offices].filter(entry => {
    if (view === 'guides' && entry.kind !== 'guide') return false;
    if (view === 'offices' && entry.kind !== 'office') return false;
    if (validCategory && !entry.categoryIds.some(id => id === validCategory)) return false;
    const text = entry.kind === 'guide'
      ? `${entry.title} ${entry.description} ${entry.eligibility}`
      : `${entry.title} ${entry.aliases ?? ''} ${entry.phone ?? ''} ${entry.email ?? ''}`;
    return terms.every(term => text.toLocaleLowerCase().includes(term));
  });
}
