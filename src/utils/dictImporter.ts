import { Word } from '@/types';

interface DictEntry {
  word: string;
  phonetic: string;
  definitions: string[];
  examples: string[];
}

export async function importFreeDictData(file: File): Promise<Word[]> {
  const text = await readFileAsText(file);
  const entries = parseDictdFormat(text);
  return convertToAppFormat(entries);
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

function parseDictdFormat(text: string): DictEntry[] {
  const entries: DictEntry[] = [];
  const lines = text.split('\n');
  let currentEntry: Partial<DictEntry> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // New entry starts with a word
    if (line.match(/^[A-Za-z]/)) {
      if (currentEntry.word) {
        entries.push(currentEntry as DictEntry);
        currentEntry = {};
      }
      
      // Parse word and phonetic if available
      const [word, ...rest] = line.split(' ');
      currentEntry.word = word;
      currentEntry.phonetic = rest.join(' ').match(/\/(.+?)\//)?.[1] || '';
      currentEntry.definitions = [];
      currentEntry.examples = [];
    }
    // Definition lines start with spaces or tabs
    else if (line.match(/^\s+/)) {
      const content = line.trim();
      if (content.startsWith('eg:') || content.startsWith('ex:')) {
        currentEntry.examples?.push(content.substring(3).trim());
      } else {
        currentEntry.definitions?.push(content);
      }
    }
  }

  // Add last entry
  if (currentEntry.word) {
    entries.push(currentEntry as DictEntry);
  }

  return entries;
}

function convertToAppFormat(entries: DictEntry[]): Word[] {
  return entries.map((entry, index) => ({
    id: `freedict-${index}`,
    word: entry.word,
    pronunciation: entry.phonetic ? `/${entry.phonetic}/` : '',
    definition: entry.definitions.join('; '),
    examples: entry.examples,
    imageUrl: undefined
  }));
}