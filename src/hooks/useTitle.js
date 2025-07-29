// src/hooks/useTitle.js
import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
