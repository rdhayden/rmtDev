import JobListItem from './JobListItem';
import { jobItem } from '../lib/types';
import Spinner from './Spinner';
import { useActiveId } from '../lib/hooks';

type JobListProps = {
  jobItems: jobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();

  // note that while it looks like we're passing a normal prop called key to JobListItem,
  // we're actually not. key is a special prop in React that is used for list rendering
  // and is not passed down to the component as a regular prop.
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
