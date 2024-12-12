import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardStackItemProps {
  children: ReactNode;
}

export const CardStackItem = forwardRef<HTMLDivElement, CardStackItemProps>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200, scale: 0.8, rotateX: 45 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: -200, scale: 0.8, rotateX: -45 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1,
          opacity: { duration: 0.4 }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    );
  }
);

CardStackItem.displayName = 'CardStackItem';