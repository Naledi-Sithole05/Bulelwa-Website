(function () {
  const inHtmlFolder = window.location.pathname.includes('/HTML/');
  const prefix = inHtmlFolder ? '../' : '';

  const navLinks = [
    { href: prefix + 'index.html',         label: 'Home' },
    { href: prefix + 'HTML/Services.html', label: 'Services' },
    { href: prefix + 'HTML/Contacts.html', label: 'Contact' },
    { href: prefix + 'HTML/About.html',    label: 'About' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = navLinks; // same nav everywhere

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

      const linkPage = link.href.split('/').pop();
      if (linkPage === currentPage) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    attachNavHoverEffects();
  }

  function attachNavHoverEffects() {
    const navLinkElements = document.querySelectorAll('.nav-links a');

    navLinkElements.forEach(link => {
      link.style.transformOrigin = "center";

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
          color: "#efeab6",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', buildNav);
})();
 