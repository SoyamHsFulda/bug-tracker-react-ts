import { STATUSES, type Bug, type Status } from "../types";

interface Props {
  bugs: Bug[];
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

export default function BugList({ bugs, onStatusChange, onDelete }: Props) {
  if (bugs.length === 0) {
    return <p className="empty">No bugs found.</p>;
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li key={bug.id} className="bug">
          <div>
            <strong>{bug.title}</strong>
            <span className={`badge badge-${bug.severity.toLowerCase()}`}>{bug.severity}</span>
          </div>
          <div className="bug-actions">
            <select
              aria-label={`Status for ${bug.title}`}
              value={bug.status}
              onChange={(e) => onStatusChange(bug.id, e.target.value as Status)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="danger"
              aria-label={`Delete ${bug.title}`}
              onClick={() => onDelete(bug.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
