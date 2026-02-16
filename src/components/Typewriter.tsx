// src/components/Typewriter.tsx
import React, { useState, useEffect } from 'react';

import { USER_DATA } from '../context/user-data';

const TITLES = USER_DATA.titles;

export default function Typewriter() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TITLES.length;
      const fullText = TITLES[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Speed adjustments
      setTypingSpeed(isDeleting ? 30 : 100);

      // Finished typing
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
        setTypingSpeed(1500); // Pause time
      } 
      // Finished deleting
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before new word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="font-mono text-emerald-400">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
