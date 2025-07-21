'use client';

import React, {
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
} from 'react';
import { motion } from 'motion/react';
import styles from '@/components/animate-ui/buttons/ripple.module.css';

function RippleButton({ children, onClick, ...props }, ref) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  useImperativeHandle(ref, () => buttonRef.current);

  const createRipple = useCallback((event) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  const handleClick = useCallback(
    (event) => {
      createRipple(event);
      if (onClick) onClick(event);
    },
    [createRipple, onClick],
  );

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={styles.button}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 10, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.ripple}
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
    </motion.button>
  );
}

export { RippleButton };
