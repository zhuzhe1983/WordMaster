import { Word } from '@/types';
import { wordList } from '../words';

export const cet4: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `cet4-${word.id}`
}));