// utils/Animations/CountUp.jsx
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function CountUp({ from = 0, to = 100, duration = 2 }) {
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
        onUpdate: latest => setDisplay(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, to]);

  return (
    <motion.span ref={ref} className="inline-block">
      {display}
    </motion.span>
  );
}
