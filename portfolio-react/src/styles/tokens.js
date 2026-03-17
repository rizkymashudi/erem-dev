/* JS-accessible design tokens */

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  smallMobile: 480,
};

export const SCROLL_BUDGETS = {
  desktop: {
    work: 500,    // vh
    skills: 450,
    experience: 600,
    about: 400,
  },
  mobile: {
    work: 500,
    skills: 450,
    experience: 550,
    about: 500,
  },
  smallMobile: {
    work: 550,
    skills: 500,
    experience: 600,
    about: 550,
  },
};

export const CARD_SIZES = {
  desktop: 380,
  tablet: 320,
  mobile: 300,
  smallMobile: 260,
};

export const EASING = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  stickerPop: [0.34, 1.56, 0.64, 1],
};

export const PARALLAX_SPEEDS = [0.15, 0.3, 0.5, 0.7];

export const TILT = {
  desktop: 2.5,   // degrees
  mobile: 1.5,
  lerp: 0.08,
};

export const TYPING = {
  hero: { min: 30, max: 60 },
  work: { speed: 30 },
  experience: { speed: 40 },
};
