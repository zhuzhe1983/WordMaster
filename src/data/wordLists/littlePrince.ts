import { Word } from '@/types';
import { wordList } from '../words';

export const littlePrince: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `little-prince-${word.id}`
}));