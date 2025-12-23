// Detect touch device
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

const navItems = document.querySelectorAll('.nav-item');

const menuBtn = document.getElementById('menu');
const navItemsMenu = document.getElementById('navItem');
const closeBtn = document.getElementById('close-menu'); 

// ===== STICKY NAV ON SCROLL =====
const nav = document.querySelector('nav');  // 👈 Select <nav> element

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');  // 👈 Add class to <nav>
  } else {
    nav.classList.remove('scrolled');
  }
});

// Open menu when clicking hamburger
menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navItemsMenu.classList.add('active');
});

// Close menu when clicking X
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navItemsMenu.classList.remove('active');
});

navItems.forEach(item => {
  const link = item.querySelector('a');
  const child = item.querySelector('.child');
  
  if (!child) return; // Skip if no child menu
  
  // Close all other menus
  const closeOtherMenus = () => {
    document.querySelectorAll('.child').forEach(menu => {
      if (menu !== child) menu.classList.remove('active_child');
    });
    document.querySelectorAll('.nav-item').forEach(navItem => {
      if (navItem !== item) navItem.classList.remove('active');
    });
  };
  
  if (isTouchDevice) {
    // ===== MOBILE/TOUCH: CLICK =====
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeOtherMenus();
      child.classList.toggle('active_child');
      item.classList.toggle('active');
    });
  } else {
    // ===== DESKTOP: HOVER ===== 
    let hoverTimeout;  // 👈 Add timeout variable
    
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);  // 👈 Clear any pending close
      closeOtherMenus();
      child.classList.add('active_child');
      item.classList.add('active');
    });
    
    item.addEventListener('mouseleave', () => {
      // 👈 Add small delay before closing
      hoverTimeout = setTimeout(() => {
        child.classList.remove('active_child');
        item.classList.remove('active');
      }, 100);  // 100ms delay allows smooth transition to submenu
    });
    
    // 👈 NEW: Keep menu open when hovering over child
    child.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);  // Cancel closing
    });
    
    child.addEventListener('mouseleave', () => {
      child.classList.remove('active_child');
      item.classList.remove('active');
    });
  }
});
 