export interface IndicatorHistory {
  date: string;
  value: number;
}

export interface Indicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  normalRange: string;
  isAbnormal: boolean;
  trend: 'up' | 'down' | 'stable';
  history: IndicatorHistory[];
  category: 'blood' | 'urine' | 'biochemistry';
}

export const mockIndicators: Indicator[] = [
  {
    id: '1',
    name: '白细胞计数',
    value: 11.2,
    unit: '×10^9/L',
    normalRange: '3.5-9.5',
    isAbnormal: true,
    trend: 'up',
    category: 'blood',
    history: [
      { date: '2023-01-01', value: 5.2 },
      { date: '2023-04-01', value: 7.8 },
      { date: '2023-07-01', value: 9.1 },
      { date: '2023-10-01', value: 11.2 },
    ],
  },
  {
    id: '2',
    name: '血红蛋白',
    value: 125,
    unit: 'g/L',
    normalRange: '130-175',
    isAbnormal: true,
    trend: 'stable',
    category: 'blood',
    history: [
      { date: '2023-01-01', value: 132 },
      { date: '2023-04-01', value: 128 },
      { date: '2023-07-01', value: 126 },
      { date: '2023-10-01', value: 125 },
    ],
  },
  {
    id: '3',
    name: '尿蛋白',
    value: 0,
    unit: 'g/L',
    normalRange: '阴性',
    isAbnormal: false,
    trend: 'stable',
    category: 'urine',
    history: [
      { date: '2023-01-01', value: 0 },
      { date: '2023-04-01', value: 0 },
      { date: '2023-07-01', value: 0 },
      { date: '2023-10-01', value: 0 },
    ],
  },
];
