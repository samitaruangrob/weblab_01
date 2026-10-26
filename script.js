/* ==========================================================
   Bake & Bloom - Interactive Client Scripts
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // 3. Scrollspy: Highlight Active Nav Link based on section in viewport
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // 4. Menu Filtering Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button style
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
});

// 5. Booking / Inquiry Form Handling
function handleFormSubmit() {
  const form = document.getElementById('cake-inquiry-form');
  const successMsg = document.getElementById('form-success-msg');
  const name = document.getElementById('cust-name').value;
  const cakeSelect = document.getElementById('cust-cake');
  const cakeName = cakeSelect.options[cakeSelect.selectedIndex].text;

  // Show success message
  successMsg.style.display = 'flex';
  successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Reset form
  form.reset();

  // Hide alert after 8 seconds
  setTimeout(() => {
    successMsg.style.display = 'none';
  }, 8000);
}
