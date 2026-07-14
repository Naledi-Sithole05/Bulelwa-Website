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
  }

  document.addEventListener('DOMContentLoaded', buildNav);
})();
