import { useState } from "react";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { STATUSES, type Bug, type Severity, type Status } from "./types";

type Filter = "All" | Status;

export default function App() {
  const [bugs, setBugs] = useLocalStorage<Bug[]>("bug-tracker:bugs", []);
  const [filter, setFilter] = useState<Filter>("All");

  function addBug(title: string, severity: Severity) {
    const bug: Bug = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      severity,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    setBugs((previous) => [bug, ...previous]);
  }

  function changeStatus(id: string, status: Status) {
    setBugs((previous) => previous.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function deleteBug(id: string) {
    setBugs((previous) => previous.filter((b) => b.id !== id));
  }

  const visibleBugs = filter === "All" ? bugs : bugs.filter((b) => b.status === filter);

  return (
    <main className="app">
      <h1>Bug Tracker</h1>

      <section aria-labelledby="add-heading">
        <h2 id="add-heading">Report a bug</h2>
        <BugForm onAdd={addBug} />
      </section>

      <section aria-labelledby="list-heading">
        <h2 id="list-heading">Bugs</h2>

        <ul className="summary" aria-label="Bug counts">
          {STATUSES.map((s) => (
            <li key={s}>
              {s}: {bugs.filter((b) => b.status === s).length}
            </li>
          ))}
        </ul>

        <div className="field">
          <label htmlFor="filter">Filter by status</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
            <option value="All">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <BugList bugs={visibleBugs} onStatusChange={changeStatus} onDelete={deleteBug} />
      </section>
    </main>
  );
}
