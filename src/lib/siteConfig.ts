/**
 * Site domain and contact — single source of truth for billreliefai.com
 */
export const SITE_DOMAIN = "billreliefai.com";
export const SITE_URL = `https://www.${SITE_DOMAIN}`;
export const CONTACT_EMAIL = "contact@billreliefai.com";

/** Customer service hours (footer and contact pages) */
export const CUSTOMER_SERVICE_HOURS = "Mon–Fri 9am–6pm ET";

/** Social and trust links (optional; use # for placeholder) */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/billreliefai",
  linkedin: "https://www.linkedin.com/company/billrelief",
  facebook: "https://www.facebook.com/billreliefai",
} as const;

export const BBB_URL = "https://www.bbb.org/";
