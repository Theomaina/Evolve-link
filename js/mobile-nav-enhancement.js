// Enhanced Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
  const menuToggler = document.querySelector('.menu-toggler');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const body = document.body;
  
  if (!menuToggler || !menuWrapper) return;

  // Enhanced touch interactions
  let touchStartY = 0;
  let touchEndY = 0;
  let isMenuOpen = false;

  // Smooth menu toggle with enhanced animations
  function toggleMenu() {
    const crossIcon = menuToggler.querySelector('.cross');
    const menuIcon = menuToggler.querySelector('.menu');
    
    isMenuOpen = !isMenuOpen;
    
    // Enhanced animation timing
    if (isMenuOpen) {
      // Opening animation
      menuWrapper.style.display = 'flex';
      menuWrapper.style.opacity = '0';
      menuWrapper.style.transform = 'translateY(-20px)';
      
      // Smooth fade in
      requestAnimationFrame(() => {
        menuWrapper.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        menuWrapper.style.opacity = '1';
        menuWrapper.style.transform = 'translateY(0)';
      });
      
      // Icon animation
      if (crossIcon && menuIcon) {
        crossIcon.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        menuIcon.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        
        crossIcon.style.opacity = '1';
        crossIcon.style.transform = 'rotate(0deg)';
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'rotate(-90deg)';
        
        crossIcon.classList.remove('hidden');
        menuIcon.classList.add('hidden');
      }
      
      // Prevent body scroll
      body.style.overflow = 'hidden';
      body.classList.add('overflow-y-hidden', 'lg:overflow-y-auto');
      
    } else {
      // Closing animation
      menuWrapper.style.transition = 'opacity 0.25s ease-in, transform 0.25s ease-in';
      menuWrapper.style.opacity = '0';
      menuWrapper.style.transform = 'translateY(-20px)';
      
      // Icon animation
      if (crossIcon && menuIcon) {
        crossIcon.style.transition = 'opacity 0.15s ease-in, transform 0.15s ease-in';
        menuIcon.style.transition = 'opacity 0.15s ease-in, transform 0.15s ease-in';
        
        crossIcon.style.opacity = '0';
        crossIcon.style.transform = 'rotate(90deg)';
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'rotate(0deg)';
        
        crossIcon.classList.add('hidden');
        menuIcon.classList.remove('hidden');
      }
      
      // Re-enable body scroll
      body.style.overflow = '';
      body.classList.remove('overflow-y-hidden', 'lg:overflow-y-auto');
      
      // Hide menu after animation
      setTimeout(() => {
        menuWrapper.style.display = 'none';
      }, 250);
    }
  }

  // Enhanced click handler with touch feedback
  menuToggler.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add touch feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
    
    toggleMenu();
  });

  // Enhanced touch interactions for menu items
  const menuItems = document.querySelectorAll('.navbar li:not(.submenu-item) a');
  menuItems.forEach(item => {
    // Add touch feedback
    item.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
      this.style.transition = 'transform 0.1s ease-out';
    });
    
    item.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    });
    
    // Enhanced click handler
    item.addEventListener('click', function(e) {
      // Smooth close animation
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });

  // Enhanced submenu interactions for mobile
  const submenuItems = document.querySelectorAll('.submenu-item');
  submenuItems.forEach(item => {
    const link = item.querySelector('.submenu-toggler');
    const submenu = item.querySelector('.submenu');
    
    if (link && submenu) {
      // Remove any existing click listeners to prevent conflicts
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simple toggle for mobile
        const isActive = this.classList.contains('active');
        
        if (isActive) {
          // Close submenu
          this.classList.remove('active');
          submenu.classList.add('hidden');
        } else {
          // Open submenu
          this.classList.add('active');
          submenu.classList.remove('hidden');
        }
      });
    }
  });

  // Enhanced swipe to close functionality
  menuWrapper.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  });

  menuWrapper.addEventListener('touchmove', function(e) {
    if (!isMenuOpen) return;
    
    touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Swipe up to close (threshold: 50px)
    if (diff > 50) {
      toggleMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });

  // Enhanced scroll behavior when menu is open
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    if (!isMenuOpen) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Close menu on significant scroll
    if (Math.abs(scrollTop - lastScrollTop) > 10) {
      toggleMenu();
    }
    
    lastScrollTop = scrollTop;
  });

  // Prevent menu from opening on desktop
  function handleResize() {
    if (window.innerWidth >= 1024 && isMenuOpen) {
      toggleMenu();
    }
  }

  window.addEventListener('resize', handleResize);

  // Enhanced focus management
  menuToggler.addEventListener('focus', function() {
    this.style.outline = '2px solid #2dd4bf';
    this.style.outlineOffset = '2px';
  });

  menuToggler.addEventListener('blur', function() {
    this.style.outline = '';
    this.style.outlineOffset = '';
  });
});
