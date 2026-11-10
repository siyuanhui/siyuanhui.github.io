/** Courses named on the current site. No campus or term is attached unless the site states one. */
export const courses = [
  { code: 'EECS 311', en: 'Electronic Circuits (EECS 311)', zh: '电子电路（EECS 311）', progress: false },
  { code: 'EECS 216', en: 'Signals & Systems (EECS 216)', zh: '信号与系统（EECS 216）', progress: false },
  { code: 'EECS 270', en: 'Intro to Logic Design (EECS 270)', zh: '逻辑设计导论（EECS 270）', progress: false },
  { code: 'EECS 280', en: 'Programming & Data Structures (EECS 280)', zh: '程序设计与数据结构（EECS 280）', progress: false },
  { code: 'EECS 215', en: 'Intro to Circuits (EECS 215)', zh: '电路导论（EECS 215）', progress: false },
  { code: 'EECS 301', en: 'Probabilistic Methods (EECS 301)', zh: '概率方法（EECS 301）', progress: false },
  {
    code: 'EECS 370',
    en: 'Computer Organization (EECS 370)',
    zh: '计算机组成（EECS 370）',
    progress: true,
    topic: 'computer-architecture',
  },
  {
    code: 'EECS 312',
    en: 'Digital Integrated Circuits (EECS 312)',
    zh: '数字集成电路（EECS 312）',
    progress: true,
    topic: 'digital-vlsi',
  },
] as const;

export type CourseCode = (typeof courses)[number]['code'];
