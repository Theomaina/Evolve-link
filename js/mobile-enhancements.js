/**
 * Mobile Enhancements Script
 * Evolve-Link Digital
 * Improves mobile user experience
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Prevent horizontal scroll
    preventHorizontalScroll();
    
    // Improve touch interactions
    improveTouchInteractions();
    
    // Fix viewport height for mobile browsers
    fixViewportHeight();
    
    // Enhance mobile menu
    enhanceMobileMenu();
    
    // Add smooth scroll behavior
    addSmoothScroll();
    
    // Optimize images for mobile
    optimizeImages();
    
    // Handle orientation changes
    handleOrientationChange();
    
    // Prevent double-tap zoom on buttons
    preventDoubleTapZoom();
  }

  /**
   * Prevent horizontal scroll caused by overflowing elements
   */
  function preventHorizontalScroll() {
    // Check for horizontal overflow on page load and resize
    function checkOverflow() {
      const body = document.body;
      const html = document.documentElement;
      
      if (body.scrollWidth > html.clientWidth) {
        console.warn('Horizontal overflow detected');
        // You can log which element is causing overflow
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          if (el.scrollWidth > html.clientWidth) {
            console.warn('Overflowing element:', el);
          }
        });
      }
    }
    
    checkOverflow();
    window.addEventListener('resize', debounce(checkOverflow, 250));
  }

  /**
   * Improve touch interactions for better UX
   */
  function improveTouchInteractions() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        this.style.opacity = '';
      }, { passive: true });
      
      element.addEventListener('touchcancel', function() {
        this.style.opacity = '';
      }, { passive: true });
    });
  }

  /**
   * Fix viewport height for mobile browsers (addresses URL bar issues)
   */
  function fixViewportHeight() {
    // Set CSS variable for actual viewport height
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
    window.addEventListener('orientationchange', setVH);
  }

  /**
   * Enhance mobile menu functionality
   */
  function enhanceMobileMenu() {
    const menuToggler = document.querySelector('.menu-toggler');
    const menuWrapper = document.querySelector('.menu-wrapper');
    const body = document.body;
    
    if (!menuToggler || !menuWrapper) return;
    
    menuToggler.addEventListener('click', function(e) {
      e.preventDefault();
      
      const isOpen = menuWrapper.classList.contains('show');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Close menu when clicking on a link
    const menuLinks = menuWrapper.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Only close if it's not a submenu toggler
        if (!this.classList.contains('submenu-toggler')) {
          setTimeout(closeMenu, 300);
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (menuWrapper.classList.contains('show')) {
        if (!menuWrapper.contains(e.target) && !menuToggler.contains(e.target)) {
          closeMenu();
        }
      }
    });
    
    function openMenu() {
      menuWrapper.classList.add('show');
      body.style.overflow = 'hidden';
      menuToggler.querySelector('.menu').classList.add('hidden');
      menuToggler.querySelector('.cross').classList.remove('hidden');
    }
    
    function closeMenu() {
      menuWrapper.classList.remove('show');
      body.style.overflow = '';
      menuToggler.querySelector('.menu').classList.remove('hidden');
      menuToggler.querySelector('.cross').classList.add('hidden');
    }
  }

  /**
   * Add smooth scroll behavior for anchor links
   */
  function addSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Get header height for offset
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Optimize images for mobile viewport
   */
  function optimizeImages() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    
    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => {
        // Only lazy load images that are not in the initial viewport
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
    
    // Handle image errors gracefully
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
      });
    });
  }

  /**
   * Handle orientation changes
   */
  function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
      // Close mobile menu on orientation change
      const menuWrapper = document.querySelector('.menu-wrapper');
      if (menuWrapper && menuWrapper.classList.contains('show')) {
        menuWrapper.classList.remove('show');
        document.body.style.overflow = '';
      }
      
      // Recalculate layout
      setTimeout(() => {
        window.scrollTo(window.scrollX, window.scrollY);
      }, 100);
    });
  }

  /**
   * Prevent double-tap zoom on buttons and interactive elements
   */
  function preventDoubleTapZoom() {
    let lastTouchEnd = 0;
    
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, textarea');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      }, { passive: false });
    });
  }

  /**
   * Debounce helper function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Detect if device is mobile
   */
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
  }

  /**
   * Add mobile class to body for specific mobile-only styles
   */
  if (isMobile()) {
    document.body.classList.add('is-mobile');
  }

  // Export for potential external use
  window.MobileEnhancements = {
    isMobile: isMobile,
    fixViewportHeight: fixViewportHeight
  };

})();

