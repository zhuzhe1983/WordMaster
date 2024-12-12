import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Gamepad2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface WordActionsProps {
  show: boolean;
  onClose: () => void;
  onSave?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onGame?: () => void;
}

export function WordActions({
  show,
  onClose,
  onSave,
  onLike,
  onShare,
  onGame
}: WordActionsProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <div className="flex gap-4">
            {onLike && (
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                  onClose();
                }}
              >
                <Heart className="w-4 h-4" />
              </Button>
            )}
            {onShare && (
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                  onClose();
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            {onGame && (
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onGame();
                  onClose();
                }}
              >
                <Gamepad2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}