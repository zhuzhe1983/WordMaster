import { WordList } from '@/types';
import { WordListCard } from './WordListCard';

interface WordListGridProps {
  lists: WordList[];
  onStudy?: (list: WordList) => void;
}

export function WordListGrid({ lists, onStudy }: WordListGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lists.map((list) => (
        <WordListCard
          key={`${list.id}-${list.category}`}
          list={list}
          onStudy={() => onStudy?.(list)}
        />
      ))}
    </div>
  );
}