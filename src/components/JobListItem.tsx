import BookmarkIcon from './BookmarkIcon';
import { jobItem } from '../lib/types';

type JobListItemProps = {
  jobItem: jobItem;
};

export default function JobListItem({ jobItem }: JobListItemProps) {
  return (
    <li className="job-item" key={jobItem.id}>
      <a className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
