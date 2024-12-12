import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/theme';
import { WordCardActions } from './WordCardActions';

interface WordCardOverlayProps {
  imageUrl?: string;
  show?: boolean;
  onClose?: () => void;
  actions?: {
    onSave?: () => void;
    onLike?: () => void;
    onShare?: () => void;
    onGame?: () => void;
  };
}

export function WordCardOverlay({ imageUrl, show, onClose, actions }: WordCardOverlayProps) {
  const { isDark } = useTheme();

  if (imageUrl) {
    return (
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-gray-900/40 via-gray-900/30 to-gray-900/40'
            : 'bg-gradient-to-b from-white/40 via-white/30 to-white/40'
        }`} />
      </div>
    );
  }

  if (show && onClose && actions) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <WordCardActions {...actions} onClick={(e) => e.stopPropagation()} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}