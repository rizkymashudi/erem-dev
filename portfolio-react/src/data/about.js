// Bio phrases — highlights array marks text that gets the .highlight class
export const BIO_PHRASES = [
  {
    segments: [
      { text: 'Rizky Mashudi', highlight: true },
      { text: ' is an iOS engineer based in Jakarta, Indonesia, with 4+ years of experience building and shipping production mobile applications across fintech, government services, e-commerce, and media.' },
    ],
  },
  {
    segments: [
      { text: 'A graduate of the ' },
      { text: 'Apple Developer Academy', highlight: true },
      { text: ' and currently enrolled at the ' },
      { text: 'Essential Developer Academy', highlight: true },
      { text: ' (London), he continuously invests in clean architecture, TDD, and engineering excellence.' },
    ],
  },
  {
    segments: [
      { text: 'With a proven track record delivering ' },
      { text: '13+ client projects', highlight: true },
      { text: ' at a software consulting firm, he serves as both individual contributor and team coordinator — shipping scalable iOS apps and sharing insights on ' },
      { text: 'Medium @ikyrm', highlight: true },
      { text: '.' },
    ],
  },
];

export const LINK_CARDS = [
  { href: 'https://www.linkedin.com/in/rizky-mashudi', label: 'LinkedIn', color: 'cyan', external: true },
  { href: 'https://github.com/rizkymashudi', label: 'GitHub', color: 'primary', external: true },
  { href: 'https://medium.com/@ikyrm', label: 'Medium blog', color: 'yellow', external: true },
  { href: 'mailto:rizkymashudi7@gmail.com', label: 'Email', color: 'orange', external: false },
];
