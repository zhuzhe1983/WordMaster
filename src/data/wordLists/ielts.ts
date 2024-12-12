import { Word } from '@/types';
import { wordList } from '../words';

export const ielts: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `ielts-${word.id}`
}));