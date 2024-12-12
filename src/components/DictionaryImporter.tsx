import { useState } from 'react';
import { importFreeDictData } from '@/utils/dictImporter';
import { useWordListsStore } from '@/store/wordLists';
import { Button } from './ui/Button';
import { Upload } from 'lucide-react';

export function DictionaryImporter() {
  const [isLoading, setIsLoading] = useState(false);
  const { addList } = useWordListsStore();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const words = await importFreeDictData(file);
      addList({
        id: `freedict-${Date.now()}`,
        name: 'FreeDICT Import',
        category: 'custom',
        description: 'Imported from FreeDICT',
        words
      });
    } catch (error) {
      console.error('Failed to import dictionary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".dictd,.tar.xz"
        onChange={handleFileSelect}
        className="hidden"
        id="dict-file"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => document.getElementById('dict-file')?.click()}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        {isLoading ? 'Importing...' : 'Import FreeDICT'}
      </Button>
    </div>
  );
}