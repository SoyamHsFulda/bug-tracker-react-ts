import { FormEvent, useState } from "react";
import { SEVERITIES, type Severity } from "../types";

interface Props {
  onAdd: (title: string, severity: Severity) => void;
}

export default function BugForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    onAdd(trimmed, severity);
    setTitle("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form">
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={error ? "true" : "false"}
        />
      </div>

      <div className="field">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add bug</button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </form>
  );
}
