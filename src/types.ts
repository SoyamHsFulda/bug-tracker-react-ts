export const SEVERITIES = ["Low", "Medium", "High", "Critical"] as const;
export const STATUSES = ["Open", "In Progress", "Resolved"] as const;

export type Severity = (typeof SEVERITIES)[number];
export type Status = (typeof STATUSES)[number];

export interface Bug {
  id: string;
  title: string;
  severity: Severity;
  status: Status;
  createdAt: string;
}
