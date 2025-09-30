import { useEffect, useState } from 'react';
import { jobItem } from './types';

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<jobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSlice = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
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
  return [jobItemsSlice, isLoading] as const;
}
