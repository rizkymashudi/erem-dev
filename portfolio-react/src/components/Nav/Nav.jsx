import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '#work', label: 'work', num: '(01)' },
  { href: '#skills', label: 'skills', num: '(02)' },
  { href: '#experience', label: 'experience', num: '(03)' },
  { href: '#about', label: 'about', num: '(04)' },
  { href: '#contact', label: 'contact', num: '(05)' },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Nav({ theme, toggleTheme }) {
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const outerRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const closeNav = useCallback(() => {
    const panel = panelRef.current;
    if (panel) {
      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(() => {
        panel.style.height = '0';
      });
    }
    setExpanded(false);
  }, []);

  const openNav = useCallback(() => {
    setExpanded(true);
    const panel = panelRef.current;
    if (panel) {
      panel.style.height = panel.scrollHeight + 'px';
      const handler = () => {
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', handler);
      };
      panel.addEventListener('transitionend', handler);
    }
  }, []);

  const handleHamburgerClick = () => {
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  };

  const handleMobileLink = (e, href) => {
    e.preventDefault();
    closeNav();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleDesktopLink = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expanded && navRef.current && !navRef.current.contains(e.target)) {
        closeNav();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [expanded, closeNav]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && expanded) {
        closeNav();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [expanded, closeNav]);

  // Nav scroll behavior — shrink/grow on scroll direction
  useEffect(() => {
    const navOuter = outerRef.current;
    if (!navOuter) return;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      if (scrollY > 100 && scrollY > lastScrollYRef.current) {
        navOuter.style.top = '8px';
        navOuter.style.opacity = '0.9';
      } else {
        navOuter.style.top = scrollY > 50 ? '12px' : '16px';
        navOuter.style.opacity = '1';
      }
      navOuter.style.transition = 'top 0.4s var(--ease-out-expo), opacity 0.4s var(--ease-out-expo)';
      lastScrollYRef.current = scrollY;
      ticking = false;
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.navOuter} ref={outerRef}>
      <nav
        ref={navRef}
        className={`${styles.nav} ${expanded ? styles.expanded : ''}`}
      >
        <div className={styles.navBar}>
          <a href="#" className={styles.navLogo}>
            RM<span>_</span>
          </a>
          <div className={styles.navSep} />
          <div className={styles.navDesktopLinks}>
            <div className={styles.navLinks}>
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleDesktopLink(e, href)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={styles.hamburger}
            onClick={handleHamburgerClick}
            aria-label="Toggle menu"
            aria-expanded={expanded}
          >
            <span className={`${styles.hamburgerLine} ${styles.hamburgerTop}`} />
            <span className={`${styles.hamburgerLine} ${styles.hamburgerMid}`} />
            <span className={`${styles.hamburgerLine} ${styles.hamburgerBot}`} />
          </button>
        </div>
        <div ref={panelRef} className={styles.navMobilePanel}>
          <div className={styles.navMobileLinks}>
            {NAV_LINKS.map(({ href, label, num }) => (
              <a
                key={href}
                href={href}
                className={styles.navMobileLink}
                onClick={(e) => handleMobileLink(e, href)}
              >
                <span className={styles.navMobileNum}>{num}</span>
                <span className={styles.navMobileLabel}>{label}</span>
              </a>
            ))}
          </div>
          <div className={styles.navMobileFooter}>
            <span className={styles.navMobileEmail}>eremism1@gmail.com</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
