import { Word } from '@/types';
import { wordList } from '../words';

export const oxford: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `oxford-${word.id}`
}));