import { Word } from '@/types';
import { wordList } from '../words';

export const cet6: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `cet6-${word.id}`
}));