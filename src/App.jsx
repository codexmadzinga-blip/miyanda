import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, MapPin, Star, Phone, Mail, Calendar, X, ShieldCheck, Trash2, Zap, Building,
  GraduationCap, Stethoscope, Scissors, Car, Shirt, Pill, Sparkles, Laptop, Truck,
  Briefcase, Heart, Wrench, Home, Menu, ChevronLeft, ChevronRight, BadgeCheck, SlidersHorizontal
} from 'lucide-react';
import { getServiceArt } from './serviceArt';

/* =====================================================================
   MIYANDA MARKETPLACE — App.jsx (revamped)
   Stack: React 18 + Tailwind CSS + Lucide Icons
   Brand: #1B5469 (Teal-Navy), #102A38 (Deep Navy), #E88C30 (Warm Amber)
   ===================================================================== */

const COMPANY_EMAILS = [
  'support@miyanda.co.zw',
  'bookings@miyanda.co.zw',
  'marketing@miyanda.co.zw',
  'partnerships@miyanda.co.zw',
  'billing@miyanda.co.zw'
];

const CONTACT_NUMBERS = {
  founder: { label: 'Founder & Technical Director', number: '+263 71 205 6000' },
  marketer1: { label: 'Marketer Hotline 1', number: '+263 77 456 7890' },
  marketer2: { label: 'Marketer Hotline 2', number: '+263 78 500 8560' },
  marketer3: { label: 'Senior Marketer', number: '+263 71 999 8888' },
  director: { label: 'Executive Direct', number: '+263 77 000 0000' }
};

const CATEGORIES = [
  { name: 'Researchers & Tutors', icon: GraduationCap },
  { name: 'Consultants', icon: Briefcase },
  { name: 'Freelancers', icon: Laptop },
  { name: 'Furniture & Carpentry', icon: Wrench },
  { name: 'Construction & Contractors', icon: Building },
  { name: 'Real Estate', icon: Home },
  { name: 'Electricians & Plumbers', icon: Zap },
  { name: 'Beauty Therapists', icon: Sparkles },
  { name: 'Salons & Barbers', icon: Scissors },
  { name: 'Car Sales & Rental', icon: Car },
  { name: 'Fashion & Clothing', icon: Shirt },
  { name: 'Doctors & Surgeries', icon: Stethoscope },
  { name: 'Pharmacies', icon: Pill },
  { name: 'Events & Design', icon: Sparkles },
  { name: 'Transport & Logistics', icon: Truck },
  { name: 'Private Schools', icon: GraduationCap },
  { name: 'Other Services', icon: Briefcase }
];

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore Directory' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80'
];

const QUICK_PILLS = [
  { label: 'Burst Pipe', q: 'Plumber' },
  { label: 'Power Cut / Solar', q: 'Solar' },
  { label: 'Exam Tutor', q: 'Tutor' },
  { label: 'Moving House', q: 'Moving' },
  { label: 'Event Planning', q: 'Event' }
];

/* Compact seed data. Defaults (verified, featured, email/whatsapp) are applied below. */
const seed = (id, name, category, location, rating, reviewsCount, phone, email, description, services, image, extra = {}) => ({
  id, name, category, location, rating, reviewsCount, phone, email, whatsapp: phone,
  verified: true, featured: false, isFurniturePrice: false, description, services, image, ...extra
});

const SEED_PROVIDERS = [
  seed('pro-carpentry-1', 'Kudzai Mutasa Hardwoods', 'Furniture & Carpentry', 'Masvingo, Zimbabwe', 4.95, 42, '+263771234567', 'sales@miyanda.co.zw',
    'Handcrafted teak dining tables, custom lounge chairs, fitted kitchens, and solid wood bedroom suites.',
    ['Teak Tables', 'Fitted Kitchens', 'Wardrobes', 'Sofa Framing'],
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    { featured: true, isFurniturePrice: true, priceUSD: 450, unit: 'per set' }),
  seed('pro-carpentry-2', 'Bindura Timber Crafts', 'Furniture & Carpentry', 'Bindura, Zimbabwe', 4.88, 31, '+263785008560', 'crafts@miyanda.co.zw',
    'Bespoke furniture designs, office workstations, mahogany doors, and re-upholstery services based at 1170 Harare Rd, Bindura.',
    ['Lounge Suites', 'Office Desks', 'Door Frames', 'Wood Polish'],
    'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=600&q=80',
    { featured: true, isFurniturePrice: true, priceUSD: 280, unit: 'starting set' }),
  seed('pro-trades-1', 'Blessing Chiwenga Plumbers', 'Electricians & Plumbers', 'Harare, Zimbabwe', 4.9, 68, '+263771234567', 'plumbing@miyanda.co.zw',
    'Borehole water system maintenance, solar geyser setup, drainage unblocking, and emergency pipe repairs at Karigamombe Center, Harare.',
    ['Boreholes', 'Geyser Swap', 'Burst Pipes', 'Sanitary Fittings'],
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', { featured: true }),
  seed('pro-solar-1', 'Tendai Mukamuri Solar Solutions', 'Electricians & Plumbers', 'Bindura, Zimbabwe', 4.95, 84, '+263712056000', 'solar@miyanda.co.zw',
    'Off-grid and hybrid solar installations, inverter diagnostics, power auditing, and lithium battery setups across Mashonaland Central.',
    ['Solar PV', 'Inverter Repairs', 'Lithium Batteries', 'Fault Checks'],
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80', { featured: true }),
  seed('pro-tutor-1', 'Dr. Chipo Nyathi Academic Research & Tutoring', 'Researchers & Tutors', 'Bulawayo, Zimbabwe', 4.98, 52, '+263779998888', 'tutors@miyanda.co.zw',
    'Professional thesis editing, statistical data analysis (SPSS/R), Cambridge A-Level Maths & Physics tuition.',
    ['Thesis Editing', 'Data Analysis', 'A-Level Maths', 'Research Coaching'],
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'),
  seed('pro-consult-1', 'Zambezi Strategic Advisory', 'Consultants', 'Harare, Zimbabwe', 4.91, 29, '+263712056000', 'consultants@miyanda.co.zw',
    'Corporate tax compliance, ZIMRA advisory, business registration, and feasibility studies for SMEs.',
    ['Tax Advisory', 'Business Plans', 'ZIMRA Compliance', 'SME Audit'],
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'),
  seed('pro-freelance-1', 'Mutare Digital Web & Brand Studio', 'Freelancers', 'Mutare, Zimbabwe', 4.87, 37, '+263785008560', 'freelancers@miyanda.co.zw',
    'Custom e-commerce web design, graphic design, social media management, and branding.',
    ['Web Design', 'Logo Branding', 'Social Media', 'UI/UX'],
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80', { verified: false }),
  seed('pro-const-1', 'Highveld Structural Builders', 'Construction & Contractors', 'Gweru, Zimbabwe', 4.89, 44, '+263771234567', 'construction@miyanda.co.zw',
    'Residential bricklaying, roofing trusses, concrete slab casting, and architectural plan approvals.',
    ['Bricklaying', 'Roofing', 'Foundation Casting', 'House Plans'],
    'https://images.unsplash.com/photo-1541888946425-d0fbb18f192b?auto=format&fit=crop&w=600&q=80'),
  seed('pro-realestate-1', 'Savanna Prime Properties', 'Real Estate', 'Harare, Zimbabwe', 4.93, 61, '+263712056000', 'realestate@miyanda.co.zw',
    'Residential rentals, commercial office space leasing, land title deeds verification, and property valuation.',
    ['Property Sales', 'Office Rentals', 'Valuations', 'Title Deeds'],
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80', { featured: true }),
  seed('pro-beauty-1', 'Glamour Glow Aesthetics', 'Beauty Therapists', 'Bulawayo, Zimbabwe', 4.94, 38, '+263785008560', 'beauty@miyanda.co.zw',
    'Bridal makeup artistry, facial treatments, skin care consultation, and manicure services.',
    ['Bridal Makeup', 'Facials', 'Nail Tech', 'Spa Treatments'],
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80', { verified: false }),
  seed('pro-salon-1', 'Cut & Shave Executive Barber', 'Salons & Barbers', 'Harare, Zimbabwe', 4.96, 95, '+263771234567', 'salons@miyanda.co.zw',
    'Modern fades, beard trimming, hair texturizing, and braiding services for ladies and gents.',
    ['Fade Cuts', 'Hair Braiding', 'Beard Trim', 'Dreadlocks'],
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'),
  seed('pro-car-1', 'Zambezi Auto Imports & Rentals', 'Car Sales & Rental', 'Harare, Zimbabwe', 4.9, 47, '+263712056000', 'cars@miyanda.co.zw',
    'SUV rentals for safaris, Japanese motor vehicle imports, comprehensive insurance assistance.',
    ['Car Rental', 'Vehicle Imports', '4x4 Hire', 'Inspection'],
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'),
  seed('pro-fashion-1', 'Nyasha Haute Couture & Tailoring', 'Fashion & Clothing', 'Mutare, Zimbabwe', 4.92, 33, '+263785008560', 'fashion@miyanda.co.zw',
    'Custom wedding dresses, traditional African wear, suit tailoring, and school uniform adjustments.',
    ['Wedding Gowns', 'Traditional Wear', 'Suit Tailoring', 'Alterations'],
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', { verified: false }),
  seed('pro-doctor-1', 'Dr. Moyo Family Medical Practice', 'Doctors & Surgeries', 'Harare, Zimbabwe', 4.98, 110, '+263771234567', 'doctors@miyanda.co.zw',
    'General practitioner consultations, chronic disease management, pediatric checkups, and minor surgical procedures.',
    ['General Consultation', 'Pediatrics', 'Chronic Care', 'Health Screening'],
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80', { featured: true }),
  seed('pro-pharmacy-1', 'Avondale 24/7 Community Pharmacy', 'Pharmacies', 'Harare, Zimbabwe', 4.95, 76, '+263712056000', 'pharmacy@miyanda.co.zw',
    'Prescription dispensing, blood pressure testing, diabetic supplies, and surgical first aid kits.',
    ['Prescriptions', 'BP Testing', 'First Aid', 'Vitamins'],
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'),
  seed('pro-events-1', 'Celebration Events & Decor Design', 'Events & Design', 'Bulawayo, Zimbabwe', 4.93, 55, '+263785008560', 'events@miyanda.co.zw',
    'Wedding tent setups, draping, sound systems, stage lighting, and corporate gala styling.',
    ['Wedding Decor', 'PA Systems', 'Marquee Tents', 'Lighting'],
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'),
  seed('pro-logistics-1', 'SwiftLink Express Moving & Logistics', 'Transport & Logistics', 'Harare, Zimbabwe', 4.94, 89, '+263771234567', 'logistics@miyanda.co.zw',
    'Intercity household moving truck hire, office relocation, courier parcels, and heavy cargo transport.',
    ['House Moving', 'Truck Hire', 'Courier Service', 'Cargo Transport'],
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', { featured: true }),
  seed('pro-school-1', 'St. Michael Premier Academy', 'Private Schools', 'Bindura, Zimbabwe', 4.97, 64, '+263712056000', 'schools@miyanda.co.zw',
    'ECD through Cambridge O and A Level boarding and day school with computer labs and sports grounds.',
    ['Boarding', 'Cambridge Curriculum', 'Computer Lab', 'Sports'],
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'),
  seed('pro-other-1', 'Miyanda Security & Alarm Systems', 'Other Services', 'Harare, Zimbabwe', 4.91, 40, '+263771234567', 'security@miyanda.co.zw',
    'CCTV camera installations, electric fence repairs, gate motors, and armed response linkages.',
    ['CCTV Install', 'Electric Fences', 'Gate Motors', 'Alarm Systems'],
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80')
];

const SORTS = {
  top: { label: 'Top rated', fn: (a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount },
  reviews: { label: 'Most reviewed', fn: (a, b) => b.reviewsCount - a.reviewsCount },
  name: { label: 'Name (A–Z)', fn: (a, b) => a.name.localeCompare(b.name) }
};

/* ----------------------------- helpers ----------------------------- */

const digits = (s) => String(s || '').replace(/\D/g, '');
const cityOf = (loc) => String(loc || '').split(',')[0].trim();

function usePersistentState(key, initial) {
  const fullKey = 'miyanda:v4:' + key;
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(fullKey);
      return raw !== null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(fullKey, JSON.stringify(state)); } catch { /* ignore */ }
  }, [fullKey, state]);
  return [state, setState];
}

/* ---------------------------- small parts ---------------------------- */

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22.0l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.04 20.1c-1.42 0-2.81-.38-4.03-1.11l-.29-.17-3.03.8.81-2.95-.19-.31c-.8-1.28-1.23-2.77-1.23-4.31 0-4.43 3.6-8.03 8.03-8.03 2.14 0 4.15.83 5.66 2.34 1.51 1.51 2.34 3.52 2.34 5.66 0 4.43-3.6 8.03-8.03 8.03zm4.51-6.04c-.25-.13-1.47-.73-1.7-.82-.23-.09-.4-.13-.57.13-.17.25-.66.82-.81.99-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.38-.78-1.89-.2-.5-.4-.43-.57-.44h-.49c-.17 0-.45.06-.69.32-.24.25-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.69.13.17 1.83 2.79 4.44 3.91.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
    </svg>
  );
}

/* The logo image already contains the "Miyanda" wordmark, so it is shown on its own.
   Text is only rendered as a fallback if the image fails to load. */
function Logo({ onDark = false, size = 'md' }) {
  const [failed, setFailed] = useState(false);
  const sizeCls = size === 'lg' ? 'h-20 max-w-[240px]' : 'h-12 sm:h-14 max-w-[180px]';

  if (!failed) {
    return (
      <img
        src="/logo.jpeg"
        alt="Miyanda Marketplace"
        onError={() => setFailed(true)}
        className={`${sizeCls} w-auto object-contain rounded-lg ${onDark ? 'bg-white p-1.5' : ''}`}
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-xl grid place-items-center text-white font-black text-lg bg-[#1B5469]">M</div>
      <div className="flex flex-col text-left">
        <span className={`text-lg font-black tracking-tight leading-none ${onDark ? 'text-white' : 'text-slate-900'}`}>MIYANDA</span>
        <span className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${onDark ? 'text-slate-300' : 'text-slate-500'}`}>Marketplace</span>
      </div>
    </div>
  );
}

function Modal({ onClose, children, side = false, label }) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex p-4 ${side ? 'justify-end p-0' : 'items-center justify-center'}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {children}
    </div>
  );
}

const inputCls = 'w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1B5469] focus:ring-2 focus:ring-[#1B5469]/15';
const labelCls = 'block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1';

function Field({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

/* Categories whose cards show a person. Stock photos for these are replaced by
   illustrated portraits so they reflect the people the platform serves. A provider's
   own uploaded photo (anything not from images.unsplash.com) always wins. */
const PEOPLE_LOOKS = {
  'Beauty Therapists': { hair: 'afro', outfit: '#E88C30', extra: 'earrings' },
  'Salons & Barbers': { hair: 'fade', outfit: '#102A38', extra: 'scissors' },
  'Researchers & Tutors': { hair: 'short', outfit: '#1B5469', extra: 'cap' },
  'Doctors & Surgeries': { hair: 'short', outfit: '#FFFFFF', extra: 'stethoscope' },
  Freelancers: { hair: 'twists', outfit: '#334155', extra: 'headphones' },
  'Fashion & Clothing': { hair: 'wrap', outfit: '#7C2D12', extra: 'none' },
  Consultants: { hair: 'short', outfit: '#1E293B', extra: 'tie' }
};
const SKIN_TONES = ['#3A2218', '#4E2E1F', '#633A26', '#7A4A2F', '#8C5A3C'];

function personArt(pro) {
  const look = PEOPLE_LOOKS[pro.category];
  const hash = Array.from(String(pro.id || pro.name)).reduce((a, c) => a + c.charCodeAt(0), 0);
  const skin = SKIN_TONES[hash % SKIN_TONES.length];
  const hue = (hash * 37) % 360;
  const hairC = '#15100E';
  const bgA = `hsl(${hue} 45% 28%)`;
  const bgB = `hsl(${(hue + 30) % 360} 50% 42%)`;

  const hairBack = {
    afro: `<circle cx="200" cy="66" r="42" fill="${hairC}"/>`,
    twists: `<circle cx="200" cy="68" r="38" fill="${hairC}"/><g stroke="${hairC}" stroke-width="7" stroke-linecap="round"><path d="M166 70L160 98M176 78L172 104M224 78L228 104M234 70L240 98"/></g>`,
    fade: '', short: '', wrap: ''
  }[look.hair];
  const hairFront = {
    fade: `<path d="M171 72Q170 42 200 42Q230 42 229 72Q222 58 200 58Q178 58 171 72Z" fill="${hairC}"/>`,
    short: `<path d="M170 74Q168 40 200 40Q232 40 230 74Q224 54 200 54Q176 54 170 74Z" fill="${hairC}"/>`,
    afro: `<path d="M172 70Q176 50 200 48Q224 50 228 70Q214 58 200 58Q186 58 172 70Z" fill="${hairC}"/>`,
    twists: `<path d="M172 70Q176 46 200 44Q224 46 228 70Q214 56 200 56Q186 56 172 70Z" fill="${hairC}"/>`,
    wrap: `<path d="M166 72Q164 34 200 32Q236 34 234 72Q220 52 200 52Q180 52 166 72Z" fill="#E88C30"/><path d="M172 58Q200 40 228 58M176 48Q200 34 224 48" stroke="#FFFFFF" stroke-width="3" fill="none" opacity=".8"/>`
  }[look.hair];

  const extras = {
    cap: `<polygon points="200,28 246,44 200,60 154,44" fill="#15202B"/><path d="M178 52V64Q200 74 222 64V52L200 60Z" fill="#15202B"/><path d="M246 44V66" stroke="#E88C30" stroke-width="3"/><circle cx="246" cy="68" r="4" fill="#E88C30"/>`,
    stethoscope: `<path d="M176 118Q176 146 200 146Q224 146 224 118" fill="none" stroke="#94A3B8" stroke-width="4"/><circle cx="200" cy="148" r="6" fill="#94A3B8"/>`,
    headphones: `<path d="M166 76Q166 38 200 38Q234 38 234 76" fill="none" stroke="#fff" stroke-width="6"/><rect x="160" y="70" width="12" height="22" rx="5" fill="#fff"/><rect x="228" y="70" width="12" height="22" rx="5" fill="#fff"/>`,
    tie: `<path d="M196 116L204 116L208 150L200 158L192 150Z" fill="#E88C30"/>`,
    scissors: `<g transform="translate(262 106) rotate(-20)" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"><path d="M0 0L28 28M0 28L28 0"/><circle cx="-4" cy="-4" r="6" stroke="#E88C30"/><circle cx="-4" cy="32" r="6" stroke="#E88C30"/></g>`,
    earrings: `<circle cx="168" cy="92" r="4" fill="#FFD200"/><circle cx="232" cy="92" r="4" fill="#FFD200"/>`,
    none: ''
  }[look.extra];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/></linearGradient></defs><rect width="400" height="160" fill="url(#g)"/><circle cx="335" cy="30" r="64" fill="#fff" opacity=".08"/><circle cx="55" cy="150" r="74" fill="#fff" opacity=".07"/>${hairBack}<rect x="188" y="98" width="24" height="24" rx="6" fill="${skin}"/><path d="M112 160Q116 122 168 116L200 126L232 116Q284 122 288 160Z" fill="${look.outfit}"/><ellipse cx="200" cy="82" rx="30" ry="34" fill="${skin}"/><ellipse cx="170" cy="86" rx="5" ry="8" fill="${skin}"/><ellipse cx="230" cy="86" rx="5" ry="8" fill="${skin}"/>${hairFront}<circle cx="188" cy="82" r="3" fill="#1a0f0a"/><circle cx="212" cy="82" r="3" fill="#1a0f0a"/><path d="M190 98Q200 106 210 98" stroke="#1a0f0a" stroke-width="3" fill="none" stroke-linecap="round"/>${extras}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const usesPortrait = (pro) =>
  !!PEOPLE_LOOKS[pro.category] && (!pro.image || pro.image.includes('images.unsplash.com'));

function ProviderCard({ pro, saved, onToggleSave, onQuote }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = usesPortrait(pro) ? personArt(pro) : imgFailed || !pro.image ? getServiceArt(pro) : pro.image;
  const waText = encodeURIComponent(`Hi ${pro.name}, I found you on MIYANDA Marketplace and would like to enquire about your services.`);

  return (
    <article className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative mb-4">
          <img
            src={src}
            alt={pro.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-40 object-cover rounded-2xl bg-slate-100"
          />
          {pro.verified && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 text-[#1B5469] text-[10px] font-bold px-2 py-1 rounded-full shadow">
              <BadgeCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
          <button
            onClick={() => onToggleSave(pro.id, pro.name)}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:scale-105 transition"
            aria-label={saved ? `Remove ${pro.name} from saved` : `Save ${pro.name}`}
            aria-pressed={saved}
          >
            <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-rose-500 fill-rose-500' : 'text-slate-400 fill-none'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs font-bold text-[#1B5469] bg-sky-50 px-2.5 py-1 rounded-md truncate">{pro.category}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {Number(pro.rating).toFixed(1)}
            <span className="font-medium text-amber-700/70">({pro.reviewsCount})</span>
          </span>
        </div>
        <h3 className="font-bold text-lg text-slate-900 mb-1 leading-snug">{pro.name}</h3>
        <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5" /> {pro.location}
        </p>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{pro.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(pro.services || []).slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {pro.isFurniturePrice && pro.priceUSD > 0 ? (
          <div>
            <span className="text-sm font-black text-[#102A38]">From ${pro.priceUSD}</span>
            <span className="text-[10px] text-slate-500 block">{pro.unit || 'per job'}</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Quote on request</span>
        )}
        <div className="flex items-center gap-1.5">
          <a
            href={`https://wa.me/${digits(pro.whatsapp || pro.phone)}?text=${waText}`}
            target="_blank" rel="noreferrer"
            className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition"
            title="Chat on WhatsApp" aria-label={`WhatsApp ${pro.name}`}
          >
            <WhatsAppIcon />
          </a>
          <a href={`tel:${pro.phone}`} className="p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition" title="Call" aria-label={`Call ${pro.name}`}>
            <Phone className="w-4 h-4" />
          </a>
          <button onClick={() => onQuote(pro)} className="bg-[#102A38] hover:bg-slate-900 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition">
            Request quote
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ icon: Icon, title, text, action, onAction }) {
  return (
    <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-3">
      <Icon className="mx-auto w-10 h-10 text-slate-300" />
      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">{text}</p>
      {action && (
        <button onClick={onAction} className="px-5 py-2.5 bg-[#1B5469] hover:bg-[#154253] text-white font-bold text-xs rounded-xl transition">
          {action}
        </button>
      )}
    </div>
  );
}

/* ------------------------------- App ------------------------------- */

const EMPTY_REG = { name: '', category: 'Electricians & Plumbers', location: '', phone: '', whatsapp: '', email: '', rate: '', services: '', desc: '' };
const EMPTY_AUTH = { name: '', phone: '', location: '', email: '', password: '' };
const EMPTY_QUOTE = { name: '', phone: '', message: '' };

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortKey, setSortKey] = useState('top');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [cityFilter, setCityFilter] = useState('All');

  const [wishlist, setWishlist] = usePersistentState('wishlist', []);
  const [bookings, setBookings] = usePersistentState('bookings', []);
  const [listings, setListings] = usePersistentState('listings', []);
  const [user, setUser] = usePersistentState('user', null);

  const [showWishlist, setShowWishlist] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [auth, setAuth] = useState(EMPTY_AUTH);
  const [quotePro, setQuotePro] = useState(null);
  const [quote, setQuote] = useState(EMPTY_QUOTE);
  const [reg, setReg] = useState(EMPTY_REG);
  const [toast, setToast] = useState('');
  const [heroIdx, setHeroIdx] = useState(0);

  const go = useCallback((tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const notify = useCallback((msg) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Hero auto-advance
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Escape closes overlays; lock scroll while one is open
  const anyOverlay = showWishlist || showAuth || !!quotePro;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setShowWishlist(false);
      setShowAuth(false);
      setQuotePro(null);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [anyOverlay]);

  const toggleWishlist = (id, name) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
      notify(`Removed ${name} from saved`);
    } else {
      setWishlist([...wishlist, id]);
      notify(`Saved ${name}`);
    }
  };

  const allProviders = useMemo(() => [...listings, ...SEED_PROVIDERS], [listings]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    allProviders.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [allProviders]);

  const cities = useMemo(
    () => ['All', ...Array.from(new Set(allProviders.map((p) => cityOf(p.location)).filter(Boolean))).sort()],
    [allProviders]
  );

  const stats = useMemo(() => ({
    providers: allProviders.length,
    categories: CATEGORIES.length,
    cities: cities.length - 1,
    verified: allProviders.filter((p) => p.verified).length
  }), [allProviders, cities]);

  const filteredPros = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allProviders
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (verifiedOnly && !p.verified) return false;
        if (cityFilter !== 'All' && cityOf(p.location) !== cityFilter) return false;
        if (!q) return true;
        const hay = [p.name, p.description, p.location, p.category, ...(p.services || [])].join(' ').toLowerCase();
        return hay.includes(q);
      })
      .sort(SORTS[sortKey].fn);
  }, [allProviders, selectedCategory, searchQuery, verifiedOnly, cityFilter, sortKey]);

  const featuredPros = useMemo(() => allProviders.filter((p) => p.featured).sort(SORTS.top.fn).slice(0, 3), [allProviders]);
  const wishlistPros = useMemo(() => allProviders.filter((p) => wishlist.includes(p.id)), [allProviders, wishlist]);

  const filtersActive = selectedCategory !== 'All' || verifiedOnly || cityFilter !== 'All' || searchQuery.trim() !== '';
  const resetFilters = () => {
    setSelectedCategory('All'); setVerifiedOnly(false); setCityFilter('All'); setSearchQuery(''); setSortKey('top');
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    const rate = Number(reg.rate);
    const newPro = {
      id: `listing-${Date.now()}`,
      name: reg.name.trim(),
      category: reg.category,
      location: reg.location.trim(),
      rating: 5.0,
      reviewsCount: 0,
      phone: reg.phone.trim(),
      email: reg.email.trim(),
      whatsapp: (reg.whatsapp || reg.phone).trim(),
      verified: false,
      featured: false,
      isFurniturePrice: rate > 0,
      priceUSD: rate > 0 ? rate : 0,
      unit: 'per job',
      description: reg.desc.trim(),
      services: reg.services.split(',').map((s) => s.trim()).filter(Boolean),
      image: ''
    };
    setListings([newPro, ...listings]);
    setReg(EMPTY_REG);
    resetFilters();
    go('explore');
    notify(`"${newPro.name}" is now listed`);
  };

  const submitQuote = (e) => {
    e.preventDefault();
    setBookings([
      {
        id: `bk-${Date.now()}`,
        providerName: quotePro.name,
        category: quotePro.category,
        message: quote.message.trim(),
        date: new Date().toLocaleDateString(),
        status: 'Pending response'
      },
      ...bookings
    ]);
    notify(`Request sent to ${quotePro.name}`);
    setQuotePro(null);
    setQuote(EMPTY_QUOTE);
  };

  const submitAuth = (e) => {
    e.preventDefault();
    setUser({
      name: authMode === 'register' ? auth.name.trim() : (auth.email.split('@')[0] || 'Client'),
      email: auth.email.trim(),
      phone: auth.phone,
      location: auth.location
    });
    setShowAuth(false);
    setAuth(EMPTY_AUTH);
    notify(authMode === 'register' ? 'Account created. Welcome!' : 'Signed in');
  };

  const navBtn = (item, mobile = false) => {
    const active = activeTab === item.id;
    const count = item.id === 'bookings' && bookings.length > 0 ? ` (${bookings.length})` : '';
    return (
      <button
        key={item.id}
        onClick={() => go(item.id)}
        aria-current={active ? 'page' : undefined}
        className={
          mobile
            ? `block w-full text-left py-3 px-2 text-sm font-bold rounded-lg ${active ? 'text-[#1B5469] bg-sky-50' : 'text-slate-700 hover:bg-slate-50'}`
            : `transition hover:text-[#1B5469] ${active ? 'text-[#1B5469] border-b-2 border-[#1B5469] pb-1' : 'text-slate-600'}`
        }
      >
        {item.label}{count}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#1B5469] selection:text-white">
      {/* Toast */}
      {toast && (
        <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-[60] bg-[#102A38] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <button onClick={() => go('home')} aria-label="MIYANDA home"><Logo /></button>

          <nav className="hidden md:flex items-center gap-8 font-bold text-xs" aria-label="Main">
            {NAV.map((n) => navBtn(n))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowWishlist(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition"
              aria-label={`Saved providers (${wishlist.length})`}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="hidden sm:inline">Saved</span>
              <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-full text-[10px]">{wishlist.length}</span>
            </button>

            <button
              onClick={() => go('register')}
              className="hidden lg:inline-flex px-4 py-2.5 rounded-xl bg-[#E88C30] hover:bg-[#d67b22] text-white font-bold text-xs shadow transition"
            >
              Register as Provider
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#1B5469] text-white flex items-center justify-center font-bold text-xs" title={user.email}>
                  {(user.name || 'U')[0].toUpperCase()}
                </div>
                <button
                  onClick={() => { setUser(null); notify('Signed out'); }}
                  className="text-xs text-slate-500 hover:text-red-600 font-bold p-1.5"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-[#102A38] hover:bg-slate-900 text-white font-bold text-xs shadow transition"
              >
                Sign in
              </button>
            )}

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu" aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg">
            {NAV.map((n) => navBtn(n, true))}
            <button onClick={() => go('register')} className="block w-full text-left py-3 px-2 text-sm font-bold text-[#E88C30]">Register as Provider</button>
            {user ? (
              <button onClick={() => { setUser(null); setMobileOpen(false); notify('Signed out'); }} className="block w-full text-left py-3 px-2 text-sm font-bold text-slate-500">
                Sign out ({user.name})
              </button>
            ) : (
              <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="block w-full text-left py-3 px-2 text-sm font-bold text-slate-700">Sign in</button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HOME */}
        {activeTab === 'home' && (
          <div className="space-y-14 pb-16">
            <section className="relative bg-[#1B5469] py-24 sm:py-32 px-4 text-white text-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                {HERO_IMAGES.map((src, i) => (
                  <img
                    key={src} src={src} alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIdx ? 'opacity-25' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-[#102A38]/80 via-[#1B5469]/80 to-[#102A38]/90" />
              </div>

              <button
                onClick={() => setHeroIdx((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition"
                aria-label="Previous slide"
              ><ChevronLeft className="w-5 h-5" /></button>
              <button
                onClick={() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length)}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center transition"
                aria-label="Next slide"
              ><ChevronRight className="w-5 h-5" /></button>

              <div className="max-w-4xl mx-auto space-y-6 relative z-10 fade-up">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                  Find trusted professionals <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">across Zimbabwe</span>
                </h1>
                <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-medium">
                  One platform. Seventeen service categories. Direct connections by call or WhatsApp.
                </p>

                <form
                  onSubmit={(e) => { e.preventDefault(); go('explore'); }}
                  className="max-w-2xl mx-auto mt-6 bg-white rounded-2xl p-2.5 shadow-2xl flex items-center"
                  role="search"
                >
                  <Search className="text-slate-400 ml-3 w-5 h-5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by provider, service or city"
                    aria-label="Search providers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
                  />
                  <button type="submit" className="bg-[#E88C30] hover:bg-[#d67b22] text-white font-bold text-sm px-6 sm:px-8 py-3 rounded-xl transition shadow-md">
                    Search
                  </button>
                </form>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {QUICK_PILLS.map((pill) => (
                    <button
                      key={pill.label}
                      onClick={() => { resetFilters(); setSearchQuery(pill.q); go('explore'); }}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-sm transition"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center gap-2 pt-3">
                  {HERO_IMAGES.map((_, i) => (
                    <button
                      key={i} onClick={() => setHeroIdx(i)} aria-label={`Slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${heroIdx === i ? 'w-8 bg-[#E88C30]' : 'w-2 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Stats (computed from data) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  [stats.providers, 'Listed providers'],
                  [stats.categories, 'Service categories'],
                  [stats.cities, 'Cities covered'],
                  [stats.verified, 'Verified providers']
                ].map(([n, label], i) => (
                  <div key={label} className={`space-y-1 ${i % 2 ? 'border-l border-slate-100' : ''} ${i > 1 ? 'md:border-l md:border-slate-100' : ''}`}>
                    <p className="text-3xl font-black text-slate-900">{n}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">Browse all {CATEGORIES.length} services</h2>
                <button onClick={() => { resetFilters(); go('explore'); }} className="text-xs font-bold text-[#1B5469] hover:underline">View all →</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {CATEGORIES.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => { resetFilters(); setSelectedCategory(name); go('explore'); }}
                    className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1B5469] transition flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#1B5469] grid place-items-center mb-3 group-hover:bg-[#1B5469] group-hover:text-white transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xs text-slate-900 mb-1">{name}</span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {categoryCounts[name] || 0} {(categoryCounts[name] || 0) === 1 ? 'listing' : 'listings'}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Featured */}
            {featuredPros.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Top-rated professionals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPros.map((pro) => (
                    <ProviderCard key={pro.id} pro={pro} saved={wishlist.includes(pro.id)} onToggleSave={toggleWishlist} onQuote={setQuotePro} />
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#102A38] text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-black">Offer a service? Get found.</h2>
                  <p className="text-sm text-slate-300">Build a profile, receive enquiries and grow your customer base.</p>
                </div>
                <button onClick={() => go('register')} className="px-6 py-3.5 bg-[#E88C30] hover:bg-[#d67b22] text-white font-bold text-sm rounded-2xl shadow transition shrink-0">
                  Register as Provider
                </button>
              </div>
            </section>

            {/* How it works */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">How MIYANDA works</h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-10">Connecting clients with skilled professionals in three simple steps.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  ['1', 'bg-[#102A38]', 'Pick a service & place', 'Choose from 17 service categories in towns across Zimbabwe.'],
                  ['2', 'bg-[#1B5469]', 'Compare local pros', 'Filter by rating, reviews and verification to find the right match.'],
                  ['3', 'bg-[#E88C30]', 'Request a quote & chat', 'Send your job details, then confirm directly by call or WhatsApp.']
                ].map(([n, bg, title, text]) => (
                  <div key={n} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl ${bg} text-white grid place-items-center font-bold text-base mb-6`}>{n}</div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* REGISTER */}
        {activeTab === 'register' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5469] bg-sky-50 px-3 py-1 rounded-full">For professionals</span>
                <h1 className="text-2xl font-black text-slate-900 mt-2">Register as a service provider</h1>
                <p className="text-xs text-slate-500">Create your listing to appear in the MIYANDA directory. New listings show as unverified until reviewed.</p>
              </div>

              <form onSubmit={submitRegistration} className="space-y-4">
                <Field label="Business / provider name *">
                  <input required className={inputCls} placeholder="e.g. Tino Electricals" value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Service category *">
                    <select className={inputCls} value={reg.category} onChange={(e) => setReg({ ...reg, category: e.target.value })}>
                      {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Town / city & country *">
                    <input required className={inputCls} placeholder="e.g. Mutare, Zimbabwe" value={reg.location} onChange={(e) => setReg({ ...reg, location: e.target.value })} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone number *">
                    <input required type="tel" className={inputCls} placeholder="+263 77 123 4567" value={reg.phone} onChange={(e) => setReg({ ...reg, phone: e.target.value })} />
                  </Field>
                  <Field label="WhatsApp number">
                    <input type="tel" className={inputCls} placeholder="Optional (defaults to phone)" value={reg.whatsapp} onChange={(e) => setReg({ ...reg, whatsapp: e.target.value })} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email address *">
                    <input required type="email" className={inputCls} placeholder="you@business.co.zw" value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} />
                  </Field>
                  <Field label="Starting price in USD (optional)">
                    <input type="number" min="0" className={inputCls} placeholder="Blank = quote on request" value={reg.rate} onChange={(e) => setReg({ ...reg, rate: e.target.value })} />
                  </Field>
                </div>
                <Field label="Key services (comma separated) *">
                  <input required className={inputCls} placeholder="e.g. House wiring, Solar setups, Inverter repairs" value={reg.services} onChange={(e) => setReg({ ...reg, services: e.target.value })} />
                </Field>
                <Field label="Business description *">
                  <textarea required rows={3} className={inputCls} placeholder="Tell clients about your experience and services..." value={reg.desc} onChange={(e) => setReg({ ...reg, desc: e.target.value })} />
                </Field>
                <button type="submit" className="w-full py-3.5 bg-[#E88C30] hover:bg-[#d67b22] text-white font-bold text-xs rounded-xl shadow-md transition">
                  Publish provider listing
                </button>
              </form>
            </div>
          </div>
        )}

        {/* EXPLORE */}
        {activeTab === 'explore' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Explore service directory</h1>
              <p className="text-xs text-slate-500">Browse professionals across Zimbabwe.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col lg:flex-row gap-3 lg:items-center">
              <div className="flex items-center flex-1 bg-slate-50 rounded-xl border border-slate-200 px-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="search" aria-label="Search providers" placeholder="Search by provider, service or city"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-2 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden lg:block" />
                <select aria-label="City" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700">
                  {cities.map((c) => <option key={c} value={c}>{c === 'All' ? 'All cities' : c}</option>)}
                </select>
                <select aria-label="Sort" value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700">
                  {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
                </select>
                <label className="flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer select-none">
                  <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="accent-[#1B5469]" />
                  Verified only
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', ...CATEGORIES.map((c) => c.name)].map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === name ? 'bg-[#1B5469] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {name === 'All' ? 'All services' : name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{filteredPros.length} {filteredPros.length === 1 ? 'provider' : 'providers'} found</span>
              {filtersActive && <button onClick={resetFilters} className="font-bold text-[#1B5469] hover:underline">Clear filters</button>}
            </div>

            {filteredPros.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No providers found"
                text={searchQuery ? `Nothing matches "${searchQuery}". Check the spelling or clear your filters.` : 'No providers match these filters yet.'}
                action="Reset search & filters"
                onAction={resetFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPros.map((pro) => (
                  <ProviderCard key={pro.id} pro={pro} saved={wishlist.includes(pro.id)} onToggleSave={toggleWishlist} onQuote={setQuotePro} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <h1 className="text-3xl font-black text-[#102A38]">Bookings & requests</h1>
            {bookings.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No requests yet"
                text="Explore the directory and request a quote from any professional."
                action="Explore directory"
                onAction={() => go('explore')}
              />
            ) : (
              <div className="space-y-4">
                {bookings.map((b, idx) => (
                  <div key={b.id || idx} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-bold text-base text-slate-900">{b.providerName}</h4>
                      <p className="text-xs text-slate-500">{[b.category, b.date].filter(Boolean).join(' • ')}</p>
                      {b.message && <p className="text-xs text-slate-600 mt-2 line-clamp-3">{b.message}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full">{b.status || 'Pending response'}</span>
                      <button
                        onClick={() => setBookings(bookings.filter((_, i) => i !== idx))}
                        className="text-[11px] font-bold text-slate-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#102A38]">About MIYANDA Marketplace</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                MIYANDA Marketplace is a Zimbabwean platform that connects residential and commercial clients directly with local plumbers, carpenters, solar technicians, tutors, logistics operators and more.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#1B5469] mb-3" />
                <h3 className="font-bold text-base text-slate-900 mb-1">Real people, real skills</h3>
                <p className="text-xs text-slate-500">Providers are human professionals, and verified badges mark listings we have checked.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <MapPin className="w-8 h-8 text-[#E88C30] mb-3" />
                <h3 className="font-bold text-base text-slate-900 mb-1">Nationwide reach</h3>
                <p className="text-xs text-slate-500">From 1170 Harare Rd in Bindura to Karigamombe Center in Harare, with providers in towns across Zimbabwe.</p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B5469] bg-sky-50 px-3 py-1 rounded-full">Get in touch</span>
              <h1 className="text-3xl font-black text-[#102A38]">Operations & support desk</h1>
              <p className="text-sm text-slate-500">Reach our hubs, marketing desk and leadership.</p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-100">
                {[
                  { title: 'Bindura Operational Hub', addr: '1170 Harare Rd, Bindura, Zimbabwe', lines: [CONTACT_NUMBERS.founder, CONTACT_NUMBERS.marketer1, CONTACT_NUMBERS.marketer2] },
                  { title: 'Harare Corporate Center', addr: 'Karigamombe Center, Harare, Zimbabwe', lines: [CONTACT_NUMBERS.marketer3, CONTACT_NUMBERS.director] }
                ].map((hub) => (
                  <div key={hub.title} className="space-y-3">
                    <div className="flex items-center gap-2 text-[#1B5469] font-bold text-sm">
                      <MapPin className="w-4 h-4 shrink-0" /><span>{hub.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-6">{hub.addr}</p>
                    <ul className="pl-6 space-y-1.5 text-xs text-slate-700">
                      {hub.lines.map((l) => (
                        <li key={l.number}>
                          <strong>{l.label}:</strong>{' '}
                          <a href={`tel:${digits(l.number) ? '+' + digits(l.number) : ''}`} className="hover:text-[#1B5469] hover:underline">{l.number}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Departmental emails</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {COMPANY_EMAILS.map((em) => (
                    <a key={em} href={`mailto:${em}`} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/60 transition flex items-center gap-2.5 text-xs font-medium text-slate-700">
                      <Mail className="w-4 h-4 text-[#1B5469] shrink-0" /><span className="truncate">{em}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quote modal */}
      {quotePro && (
        <Modal onClose={() => setQuotePro(null)} label={`Request quote from ${quotePro.name}`}>
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-black text-lg text-slate-900 leading-snug">Request a quote</h3>
                <p className="text-xs text-slate-500">{quotePro.name}</p>
              </div>
              <button onClick={() => setQuotePro(null)} className="p-1 text-slate-400 hover:text-slate-700" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={submitQuote} className="space-y-3">
              <input required className={inputCls} placeholder="Your full name" value={quote.name} onChange={(e) => setQuote({ ...quote, name: e.target.value })} />
              <input required type="tel" className={inputCls} placeholder="Your phone number (+263...)" value={quote.phone} onChange={(e) => setQuote({ ...quote, phone: e.target.value })} />
              <textarea required rows={3} className={inputCls} placeholder="Describe the job requirements..." value={quote.message} onChange={(e) => setQuote({ ...quote, message: e.target.value })} />
              <button type="submit" className="w-full py-3 bg-[#E88C30] hover:bg-[#d67b22] text-white font-bold text-xs rounded-xl shadow transition">Submit request</button>
              <p className="text-[10px] text-center text-slate-400">Requests are saved in this browser. For a faster reply, also message the provider on WhatsApp.</p>
            </form>
          </div>
        </Modal>
      )}

      {/* Wishlist drawer */}
      {showWishlist && (
        <Modal side onClose={() => setShowWishlist(false)} label="Saved providers">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-black text-lg text-slate-900">Saved ({wishlistPros.length})</h2>
              <button onClick={() => setShowWishlist(false)} className="p-2 text-slate-400 hover:text-slate-700" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            {wishlistPros.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">No saved providers yet. Tap the heart on any card to save it for later.</p>
            ) : (
              <div className="space-y-3">
                {wishlistPros.map((pro) => (
                  <div key={pro.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{pro.name}</h4>
                      <p className="text-xs text-slate-500">{pro.category} • {cityOf(pro.location)}</p>
                      <button
                        onClick={() => { setShowWishlist(false); setQuotePro(pro); }}
                        className="mt-1.5 text-[11px] font-bold text-[#1B5469] hover:underline"
                      >
                        Request quote
                      </button>
                    </div>
                    <button onClick={() => toggleWishlist(pro.id, pro.name)} className="text-rose-500 p-2" aria-label={`Remove ${pro.name}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Auth modal */}
      {showAuth && (
        <Modal onClose={() => setShowAuth(false)} label="Sign in or create account">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button onClick={() => setShowAuth(false)} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <Logo size="lg" />
              <div>
                <h2 className="font-black text-xl text-[#102A38]">Welcome</h2>
                <p className="text-xs text-slate-500 mt-1">Save providers and track your requests.</p>
              </div>
            </div>

            <div className="flex rounded-2xl bg-slate-100 p-1">
              {[['signin', 'Sign in'], ['register', 'Create account']].map(([mode, label]) => (
                <button
                  key={mode} type="button" onClick={() => setAuthMode(mode)}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${authMode === mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={submitAuth} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <Field label="Full name">
                    <input required className={inputCls} placeholder="e.g. Tendai Moyo" value={auth.name} onChange={(e) => setAuth({ ...auth, name: e.target.value })} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Phone number">
                      <input required type="tel" className={inputCls} placeholder="+263 77 123 4567" value={auth.phone} onChange={(e) => setAuth({ ...auth, phone: e.target.value })} />
                    </Field>
                    <Field label="Town / city">
                      <input required className={inputCls} placeholder="e.g. Bindura" value={auth.location} onChange={(e) => setAuth({ ...auth, location: e.target.value })} />
                    </Field>
                  </div>
                </>
              )}
              <Field label="Email address">
                <input required type="email" className={inputCls} placeholder="you@domain.co.zw" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} />
              </Field>
              <Field label="Password">
                <input required type="password" minLength={8} className={inputCls} placeholder="At least 8 characters" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} />
              </Field>
              <button type="submit" className="w-full py-3.5 bg-[#1B5469] hover:bg-[#154253] text-white font-bold text-xs rounded-xl shadow-md transition">
                {authMode === 'register' ? 'Create account' : 'Sign in'}
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Demo mode: your name and email are kept only in this browser. Your password is never stored or sent.
              </p>
            </form>
          </div>
        </Modal>
      )}

      {/* Footer */}
      <footer className="bg-[#102A38] text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Logo onDark />
            <p className="text-xs text-slate-400 leading-relaxed">A Zimbabwean marketplace connecting clients directly with local professionals.</p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Hubs & addresses</h4>
            <p>Bindura Hub: 1170 Harare Rd, Bindura</p>
            <p>Harare Center: Karigamombe Center, Harare</p>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Contact</h4>
            <p>{CONTACT_NUMBERS.founder.number}</p>
            <p>{CONTACT_NUMBERS.marketer1.number}</p>
            <p>{COMPANY_EMAILS[0]}</p>
            <p>{COMPANY_EMAILS[1]}</p>
          </div>
        </div>
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500">
          © {new Date().getFullYear()} MIYANDA Marketplace. All rights reserved.
        </p>
      </footer>
    </div>
  );
}