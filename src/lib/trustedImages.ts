/**
 * Trusted section: "Trusted by Thousands · Real Savings, Real Relief"
 * 10 images from Unsplash (free, from internet — no AI generation).
 * Captions match the section labels; alts are descriptive for accessibility.
 */
const U = (id: string, n: number) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&id=${n}`;

export const TRUSTED_IMAGES = [
  { src: U("1559839734-2b71ea197ec2", 1), alt: "Female healthcare professional, expert review", caption: "Expert review" },
  { src: U("1519494026892-80bbd2d6fd0d", 2), alt: "Hospital building, trusted care environment", caption: "Trusted care" },
  { src: U("1631217868264-43b71f992eed", 3), alt: "Stethoscope on medical equipment, accurate analysis", caption: "Accurate analysis" },
  { src: U("1586281380349-632531db7ed4", 4), alt: "Medical documents and secure handling", caption: "Secure handling" },
  { src: U("1582750430899-248006ee4c2d", 5), alt: "Doctor consulting with patient, clear savings", caption: "Clear savings" },
  { src: U("1576091160399-8e16b71a611e", 6), alt: "Healthcare team, peace of mind", caption: "Peace of mind" },
  { src: U("1584515933487-6f4a2a63218a", 7), alt: "Medical paperwork and files, human and AI", caption: "Human + AI" },
  { src: U("1576091160550-2173b3166ab5", 8), alt: "Patient and caregiver, for your family", caption: "For your family" },
  { src: U("1559757145-915b886e1c", 9), alt: "Medical professional, protected care", caption: "Protected" },
  { src: U("1607619056574-ef74f885fa57", 10), alt: "Healthcare and financial planning, real results", caption: "Real results" },
] as const;

/** Three medical images for section headers (Hero, HowItWorks, Pricing). No duplicate portraits. */
export const SECTION_IMAGES = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", alt: "Hospital building" },
  { src: "https://images.unsplash.com/photo-1631217868264-43b71f992eed?w=600&q=80", alt: "Stethoscope and medical equipment" },
  { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80", alt: "Secure documents" },
] as const;
