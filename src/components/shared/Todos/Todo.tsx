'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect, useRef } from 'react';

type TodoProps = {
  todo: {
    id: string;
    text: string;
  };
};

export default function Todo({ todo }: TodoProps) {
  const { id, text } = todo;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [isDragged, setIsDragged] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isDragged) {
      setNodeRef?.(document.activeElement as HTMLElement);
      timerRef.current = setTimeout(() => {
        setIsFocused(false);
      }, 2000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDragged, setNodeRef]);

  const handleDragStart = () => {
    setIsDragged(true);
    setIsFocused(true);
  };

  const handleDragEnd = () => {
    setIsDragged(false);
    setIsFocused(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      tabIndex={isFocused ? 0 : -1} // Focus only during drag
      onFocus={handleDragStart} // Focus on drag start
      onBlur={handleDragEnd} // Remove focus when drag ends
      className='bg-white p-3 rounded shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 touch-none'
    >
      {text}
    </div>
  );
}
