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
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "2348123456789", // Stored in one config
    whatsappDisplay: "+234 812 345 6789",
  },
  socials: {
    instagram: "https://instagram.com/joshsites",
    twitter: "https://twitter.com/joshsites",
    github: "https://github.com/joshsites",
  }
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMsg = "Hello Josh! I explored your website showroom on JoshSites and I would like to discuss building a custom website for my business.";
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${SITE_CONFIG.developer.whatsappNumber}?text=${encoded}`;
};
