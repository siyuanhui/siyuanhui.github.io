export const menginPhotos = [
  {
    file: 'award-stage.jpg',
    alt: {
      en: 'Receiving an award on stage in front of a Joint Institute projection screen.',
      zh: '在交大密西根学院的投影屏幕前登台领奖。',
    },
    span: 'span-8',
    hero: true,
  },
  {
    file: 'stage-mic.jpg',
    alt: {
      en: 'On stage with a microphone, waving to the audience.',
      zh: '在台上手持麦克风，向台下挥手。',
    },
    span: 'span-4',
  },
  {
    file: 'panel-stage.jpg',
    alt: {
      en: 'A panel of people seated on stage at an M-ENGIN event.',
      zh: 'M-ENGIN 活动中，一组人坐在台上参加座谈。',
    },
    span: 'span-7',
  },
  {
    file: 'craft-table.jpg',
    alt: {
      en: 'People doing a craft activity at a long table.',
      zh: '人们围坐在长桌旁做手工活动。',
    },
    span: 'span-5',
  },
  {
    file: 'group-river.jpg',
    alt: {
      en: 'A group standing together by a river at dusk.',
      zh: '黄昏时分，一群人站在河边合影。',
    },
    span: 'span-5',
  },
  {
    file: 'group-waving.jpg',
    alt: {
      en: 'A large group waving outside a brick building.',
      zh: '一大群人在砖楼外挥手合影。',
    },
    span: 'span-7',
  },
  {
    file: 'group-indoor.jpg',
    alt: {
      en: 'A large group posing for a photo indoors.',
      zh: '室内大合影。',
    },
    span: 'span-12',
  },
] as const;

export const mengin = {
  title: 'M-ENGIN Program Buddy',
  org: 'SJTU Global College International Program Office',
  award: 'Best Buddy Award',
  period: { en: 'Mar. 2025', zh: '2025年3月' },
  intro: {
    en: 'I made new friends and beautiful memories with people from all around the world.',
    zh: '我在这里结识了来自世界各地的新朋友，留下了美好的回忆。',
  },
  quote: [
    "It's something unpredictable, but in the end it's right",
    'I hope you had the time of your life.',
  ],
  attribution: '— Green Day, “Good Riddance (Time of Your Life)”',
  photos: menginPhotos,
} as const;
