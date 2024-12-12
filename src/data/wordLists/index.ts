import { WordList } from '@/types';
import { wordList } from '../words';

// Helper function to create word lists with unique IDs
const createWordList = (
  id: string,
  name: string,
  category: WordList['category'],
  description: string,
  startIndex: number,
  endIndex: number
): WordList => ({
  id: `list-${id}-${Date.now()}`, // Ensure globally unique IDs
  name,
  category,
  description,
  words: wordList.slice(startIndex, endIndex).map(word => ({
    ...word,
    id: `${id}-${word.id}` // Ensure unique word IDs within list
  }))
});

// Create lists with non-overlapping word ranges
export const defaultWordLists: WordList[] = [
  createWordList(
    'middle-school',
    '初中词汇',
    'school',
    '初中必备词汇',
    0,
    30
  ),
  createWordList(
    'high-school',
    '高中词汇',
    'school',
    '高中必备词汇',
    30,
    60
  ),
  createWordList(
    'cet4',
    'CET-4',
    'exam',
    '大学英语四级词汇',
    60,
    90
  ),
  createWordList(
    'cet6',
    'CET-6',
    'exam',
    '大学英语六级词汇',
    90,
    120
  ),
  createWordList(
    'oxford',
    '牛津词典',
    'dictionary',
    '牛津词典精选词汇',
    120,
    150
  ),
  createWordList(
    'toefl',
    'TOEFL',
    'exam',
    '托福考试词汇',
    150,
    180
  ),
  createWordList(
    'ielts',
    'IELTS',
    'exam',
    '雅思考试词汇',
    180,
    210
  ),
  createWordList(
    'little-prince',
    '小王子',
    'literature',
    '《小王子》经典词汇',
    210,
    240
  ),
  createWordList(
    'gone-with-wind',
    '乱世佳人',
    'literature',
    '《乱世佳人》经典词汇',
    240,
    270
  ),
];