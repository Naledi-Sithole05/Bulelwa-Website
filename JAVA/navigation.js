(function () {
  const navLinks = [
    { href: '../index.html',         label: 'Home' },
    { href: '../HTML/Services.html', label: 'Services' },
    { href: '../HTML/Contacts.html', label: 'Contact' },
    { href: '../HTML/About.html',    label: 'About' },
  ];

  const homeNavLinks = [
    { href: 'index.html',         label: 'Home' },
    { href: 'HTML/Services.html', label: 'Services' },
    { href: 'HTML/Contacts.html', label: 'Contact' },
    { href: 'HTML/About.html',    label: 'About' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isHomePage = currentPage === 'index.html' || currentPage === '';
  const links = isHomePage ? homeNavLinks : navLinks;

  function buildNav() {
    const nav = document.querySelector('.Navigation');
    if (!nav) return;

    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    links.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;

      // Highlight whichever link matches the page currently open
      const linkPage = link.href.split('/').pop();
      if (linkPage === currentPage) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);

    // Only attach hover effects once the links actually exist in the DOM
    attachNavHoverEffects();
  }

  function attachNavHoverEffects() {
    const navLinkElements = document.querySelectorAll('.nav-links a');

    navLinkElements.forEach(link => {
      link.style.transformOrigin = "center"; // makes sure it scales evenly, not lopsided

    link.addEventListener('mouseenter', () => {
  gsap.to(link, {
    scale: 1.2,
    z: 50,
    rotationX: 5,
    
    color: "#fffffc",
    duration: 0.3,
    ease: "power2.out"
  });
});
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          opacity: 1,
          color: "#efeab6", // back to the original nav-link color from your CSS
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', buildNav);
})();


 