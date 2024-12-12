import { useState, useCallback } from 'react';

export function useWordCardAnimation(onSwipe: (direction: 'up' | 'down') => void) {
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);

  const handleDragEnd = useCallback((_, info) => {
    const yOffset = info.offset.y;
    const direction = yOffset < -50 ? 'up' : yOffset > 50 ? 'down' : null;
    
    if (direction) {
      setDragDirection(direction);
      setTimeout(() => {
        onSwipe(direction);
        setDragDirection(null);
      }, 500);
    }
  }, [onSwipe]);

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 100,
      scale: 0.9,
      rotateX: 45
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: (direction: 'up' | 'down' | null) => ({
      opacity: 0,
      scale: 0.9,
      y: direction === 'up' ? -200 : direction === 'down' ? 200 : 0,
      rotateX: direction === 'up' ? -45 : direction === 'down' ? 45 : 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return {
    dragDirection,
    handleDragEnd,
    cardVariants
  };
}