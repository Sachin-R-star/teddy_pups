/**
 * TeddyPups U.A.E. - Global Site Configuration
 * Centralized settings for easy modification and maintenance.
 */

export const siteConfig = {
  brandName: 'TeddyPups',
  fullName: 'TeddyPups U.A.E.',
  tagline: 'Premium teacup puppies in Dubai',
  subtagline: 'Teddy bear & teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  logo: 'https://puppy.instabizweb.com/brand/logo.png',
  phone: '+971 54 167 6733',
  phoneRaw: '971541676733',
  email: 'teddypupsadmin@gmail.com',
  address: 'Downtown Dubai, United Arab Emirates',
  showroomHours: 'Daily 11:00 AM – 9:00 PM (By appointment)',
  defaultWhatsAppMessage: "Hi TeddyPups! I'd love to know more about your available puppies in Dubai.",
  
  // Quick links in header & footer
  navLinks: [
    { title: 'Home', path: '/' },
    { title: 'Puppies', path: '/puppies' },
    { title: 'Gone home', path: '/gone-home' },
    { title: 'Happy families', path: '/happy-families' },
    { title: 'How it works', path: '/how-it-works' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Visit & contact', path: '/contact' }
  ],

  // WhatsApp generator helper
  getWhatsAppUrl: (customMessage) => {
    const text = encodeURIComponent(customMessage || siteConfig.defaultWhatsAppMessage);
    return `https://wa.me/${siteConfig.phoneRaw}?text=${text}`;
  }
};
