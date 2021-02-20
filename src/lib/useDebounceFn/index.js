import { useRef } from "react";

function useDebouncedFunction(func, delay) {
  const timeoutRef = useRef();
  // Очистка таймера
  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  return (...args) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}

export {
  useDebouncedFunction
}