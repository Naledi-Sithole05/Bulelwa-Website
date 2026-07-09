const navLinks = [
  { href: '../index.html',                      label: 'Home'             },
  { href: '../HTML/Services.html',      label: 'Services' },
  { href: '../HTML/Contacts.html',      label: 'Contact' },
  { href: '../HTML/About.html',                 label: 'About'            },
];

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isHomePage  = currentPage === 'index.html' || currentPage === '';

// Home page nav links point directly to root-relative siblings
const homeNavLinks = [
  { href: 'index.html',                   label: 'Home'             },
  { href: 'HTML/2D-Illustrations.html',   label: '2D Illustrations' },
  { href: 'HTML/3D-Illustrations.html',   label: '3D Illustrations' },
  { href: 'HTML/About.html',              label: 'About'            },
];
