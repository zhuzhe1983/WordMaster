import { BookmarkPlus, Heart, Share2, Gamepad2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../ui/theme';

interface WordCardActionsProps {
  onSave?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onGame?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

export function WordCardActions({ onSave, onLike, onShare, onGame, onClick }: WordCardActionsProps) {
  const { isDark } = useTheme();

  if (onLike || onShare || onGame) {
    return (
      <div className="flex gap-4" onClick={onClick}>
        {onLike && (
          <Button variant="secondary" size="sm" onClick={onLike}>
            <Heart className="w-4 h-4" />
          </Button>
        )}
        {onShare && (
          <Button variant="secondary" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        )}
        {onGame && (
          <Button variant="secondary" size="sm" onClick={onGame}>
            <Gamepad2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  if (onSave) {
    return (
      <div className={`flex justify-center mt-6 pt-4 border-t ${
        isDark ? 'border-gray-700/30' : 'border-gray-200/30'
      }`}>
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-2 backdrop-blur-sm"
        >
          <BookmarkPlus className="w-4 h-4" />
          Save
        </Button>
      </div>
    );
  }

  return null;
}