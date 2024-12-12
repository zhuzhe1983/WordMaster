import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CardStackItem } from './CardStackItem';

interface CardStackProps {
  children: ReactNode;
  currentIndex: number;
}

export function CardStack({ children, currentIndex }: CardStackProps) {
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence initial={false} mode="popLayout">
        <CardStackItem key={currentIndex}>
          {children}
        </CardStackItem>
      </AnimatePresence>
    </div>
  );
}