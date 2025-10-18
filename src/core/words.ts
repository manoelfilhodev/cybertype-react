const words = [
  'cyber',
  'keyboard',
  'speed',
  'react',
  'future',
  'learning',
  'matrix',
  'neural',
  'logic',
  'code',
];

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
