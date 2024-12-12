import { Word } from '@/types';
import { wordList } from '../words';

export const goneWithTheWind: Word[] = wordList.slice(0, 30).map(word => ({
  ...word,
  id: `gone-with-the-wind-${word.id}`
}));