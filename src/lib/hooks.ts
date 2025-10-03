import { useEffect, useState } from 'react';
import { jobItem } from './types';
import { JOBS_API_URL } from './constants';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<jobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSlice = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${JOBS_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  // Arrays are mutable, so typescript will infer the type of every element in the array
  // as jobItem or boolean, because the order of elements could change and typescript
  // cannot guarantee that the first element will always be jobItem and the second always boolean.
  // By using 'as const', we tell typescript to treat this array as a tuple with fixed types
  // for each position, ensuring that the first element is always jobItem[] and the second is always boolean.
  // The array becomes a tuple constant
  return { jobItemsSlice, isLoading } as const;
}

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  // note the unary plus operator is similar to casting with parseInt
  useEffect(() => {
    const handleChangeHash = () => {
      setActiveId(+window.location.hash.slice(1));
    };

    window.addEventListener('hashchange', handleChangeHash);

    return () => {
      window.removeEventListener('hashchange', handleChangeHash);
    };
  }, []);

  return activeId;
};

export const useJobDetail = (activeId: number | null) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!activeId) return;
      const response = await fetch(`${JOBS_API_URL}/${activeId}`);
      const data = await response.json();
      setIsLoading(false);
      setJobDetails(data.jobItem);
    };

    fetchData();
  }, [activeId]);

  return { jobDetails, isLoading } as const;
};

// Debounce is a technique to limit the rate at which a function can fire.
// It is useful in cases like scrolling where the user can trigger many events in milliseconds
// or in search input where we triggering a network request on every keystroke might be too expensive
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // The cleanup function is called before the effect runs again, and when the component unmounts
    // so in this case it will remove any pending timeout before rerendering so timeouts
    // don't stack up and only the latest one is applied
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
