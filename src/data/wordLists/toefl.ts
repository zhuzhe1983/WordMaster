import { Word } from '@/types';
import { wordList } from '../words';

export const toefl: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `toefl-${word.id}`
}));