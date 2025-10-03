document.addEventListener('DOMContentLoaded', () => {
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate || 'fade-in';
        const delay = element.dataset.delay || '0';
        
        setTimeout(() => {
          element.classList.add('animate-visible');
          element.style.opacity = '1';
          element.style.transform = 'translate(0, 0) scale(1)';
        }, parseInt(delay));
        
        if (element.dataset.animateOnce !== 'false') {
          animationObserver.unobserve(element);
        }
      } else {
        if (entry.target.dataset.animateOnce === 'false') {
          entry.target.classList.remove('animate-visible');
          entry.target.style.opacity = '0';
          applyInitialTransform(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const applyInitialTransform = (element) => {
    const animationType = element.dataset.animate || 'fade-in';
    
    switch(animationType) {
      case 'fade-up':
        element.style.transform = 'translateY(30px)';
        break;
      case 'fade-down':
        element.style.transform = 'translateY(-30px)';
        break;
      case 'fade-left':
        element.style.transform = 'translateX(30px)';
        break;
      case 'fade-right':
        element.style.transform = 'translateX(-30px)';
        break;
      case 'zoom-in':
        element.style.transform = 'scale(0.9)';
        break;
      case 'zoom-out':
        element.style.transform = 'scale(1.1)';
        break;
      case 'rotate-in':
        element.style.transform = 'rotate(-5deg) scale(0.95)';
        break;
      default:
        element.style.transform = 'translateY(0)';
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    [data-animate] {
      opacity: 0;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-animate].animate-visible {
      opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
      [data-animate] {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(element => {
    applyInitialTransform(element);
    animationObserver.observe(element);
  });

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.hasAttribute('data-animate')) {
            applyInitialTransform(node);
            animationObserver.observe(node);
          }
          node.querySelectorAll('[data-animate]').forEach(element => {
            applyInitialTransform(element);
            animationObserver.observe(element);
          });
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
});
