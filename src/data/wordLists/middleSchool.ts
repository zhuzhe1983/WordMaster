import { Word } from '@/types';
import { wordList } from '../words';

export const middleSchool: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `middle-school-${word.id}`
}));