export const PROJECTS = [
  {
    id: 1,
    name: 'nbs.co.id — iOS platform',
    desc: 'Enterprise iOS application developed over 3+ years as lead iOS engineer. Scalable architecture, continuous delivery.',
    tags: ['Swift', 'Clean Architecture', 'CI/CD', '3+ years'],
    gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04) 50%, rgba(230,90,79,0.08))',
    rotate: -3,
  },
  {
    id: 2,
    name: 'PerLu — fact verification',
    desc: "Verify social media text against MAFINDO's database. Copy, paste, get the truth.",
    tags: ['UIKit', 'API Integration', 'MAFINDO'],
    gradient: 'linear-gradient(135deg, rgba(230,90,79,0.14), rgba(230,90,79,0.04))',
    rotate: 2,
  },
  {
    id: 3,
    name: 'Sleeplance — watchOS companion',
    desc: 'Sleep tracking wearable app, evolved through 3 challenge iterations from MVP to TestFlight release.',
    tags: ['WatchKit', 'HealthKit', 'TestFlight'],
    gradient: 'linear-gradient(135deg, rgba(242,201,76,0.14), rgba(242,201,76,0.04))',
    rotate: -1.5,
  },
  {
    id: 4,
    name: 'Say it! — sentence generator',
    desc: 'Structured sentence builder from keyword input. Designed for quick, natural expression.',
    tags: ['Native iOS', 'NLP'],
    gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04))',
    rotate: 3.5,
  },
  {
    id: 5,
    name: 'Pocket Money — expense tracker',
    desc: 'Personal finance tracking with CoreData persistence and visual spending breakdowns.',
    tags: ['CoreData', 'Charts'],
    gradient: 'linear-gradient(135deg, rgba(230,90,79,0.1), rgba(242,201,76,0.08))',
    rotate: -2.5,
    isLast: true,
  },
];

export const SUBTITLE_TEXT = 'Projects that made it from concept to production. Real apps, real users.';
