export const CONTACT = {
  whatsappRaw: "2348125937596",
  whatsappDisplay: "+234 812 593 7596",
  telegramHandle: "Yeshua_zion",
  telegramUrl: "https://t.me/Yeshua_zion",
};

export const getWhatsAppLink = (message?: string): string => {
  const defaultMsg = "Hello Josh! I explored your website showroom on JoshSites and I would like to discuss building a custom website for my business.";
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${CONTACT.whatsappRaw}?text=${encoded}`;
};
