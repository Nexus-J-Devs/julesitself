import { CONTACT, getWhatsAppLink } from './contact';

export const SITE_CONFIG = {
  name: "JoshSites",
  tagline: "Interactive Website Demo Showroom",
  description: "Explore fully custom-designed website concepts tailored for your business industry before building.",
  url: "https://joshsites.netlify.app",
  developer: {
    name: "Josh",
    agency: "JoshSites Studio",
    email: "contact@joshsites.com",
    availability: "Available for new client projects",
    whatsappNumber: CONTACT.whatsappRaw,
    whatsappDisplay: CONTACT.whatsappDisplay,
    telegramHandle: CONTACT.telegramHandle,
    telegramUrl: CONTACT.telegramUrl,
  },
  socials: {
    telegram: CONTACT.telegramUrl,
    instagram: "https://instagram.com/joshsites",
    twitter: "https://twitter.com/joshsites",
    github: "https://github.com/joshsites",
  }
};

export { CONTACT, getWhatsAppLink };
