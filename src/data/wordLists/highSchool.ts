import { Word } from '@/types';
import { wordList } from '../words';

export const highSchool: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `high-school-${word.id}`
}));