/**
 * Trusted section: "Trusted by Thousands · Real Savings, Real Relief"
 * 10 images from Unsplash. #1, #7, #9 kept from original; #2,3,4,5,6,8,10 from recommended set.
 */
const U = (id: string, n: number) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&id=${n}`;

export const TRUSTED_IMAGES = [
  { src: U("1559839734-2b71ea197ec2", 1), alt: "Female healthcare professional, expert review", caption: "Expert review" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80", alt: "Modern medical facility, trusted care environment", caption: "Trusted care" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80", alt: "Medical documents and analysis", caption: "Accurate analysis" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80", alt: "Secure document management and data protection", caption: "Secure handling" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", alt: "Financial visualization and cost reduction", caption: "Clear savings" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80", alt: "Serene, calm environment representing relief", caption: "Peace of mind" },
  { src: U("1584515933487-6f4a2a63218a", 7), alt: "Medical paperwork and files, human and AI", caption: "Human + AI" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80", alt: "Family unity and care", caption: "For your family" },
  { src: U("1559757145-915b886e1c", 9), alt: "Medical professional, protected care", caption: "Protected" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80", alt: "Success and achievement, real results", caption: "Real results" },
] as const;

/** Three medical images for section headers (Hero, HowItWorks, Pricing). No duplicate portraits. */
export const SECTION_IMAGES = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", alt: "Hospital building" },
  { src: "https://images.unsplash.com/photo-1631217868264-43b71f992eed?w=600&q=80", alt: "Stethoscope and medical equipment" },
  { src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80", alt: "Secure documents" },
] as const;
