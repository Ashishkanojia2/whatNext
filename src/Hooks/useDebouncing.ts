import { useEffect, useState } from 'react';

const useDebouncing = (value: string, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsSearching(false)
    }, delay);

    return () => clearTimeout(timer); 
  }, [value, delay]);

  return {debouncedValue , isSearching};
};

export default useDebouncing;
