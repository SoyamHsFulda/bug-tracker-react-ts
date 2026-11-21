# Bug Tracker (React + TypeScript)

A small bug-tracking app to log bugs, change their status, and filter the list. Built with **React 18, TypeScript and Vite**, with automated component tests written in **Vitest and React Testing Library**.

I built this to practise frontend development together with my QA background: the app is small, but it is typed, accessible and tested.

## Features

- Report a bug with a title and severity (validation: title needs at least 3 characters)
- Change a bug's status (Open, In Progress, Resolved) or delete it
- Filter the list by status and see counts per status
- Data is saved in the browser (`localStorage`) and survives a page reload
- Accessible: labelled form fields, `role="alert"` for errors, labelled buttons, visible focus

## Tech

React 18 · TypeScript (strict mode) · Vite · Vitest · React Testing Library · GitHub Actions

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server
npm test          # run the tests once
npm run build     # type-check and build for production
```

After the first `npm install`, commit the generated `package-lock.json`.

## Project structure

```
src
├── App.tsx                    # state, filtering, layout
├── components
│   ├── BugForm.tsx            # form with validation
│   └── BugList.tsx            # list, status change, delete
├── hooks/useLocalStorage.ts   # state saved in localStorage
├── types.ts                   # Bug, Severity, Status types
└── App.test.tsx               # component tests
```

## Tests

The tests check what a user sees and does, not implementation details:

- empty state at the start
- adding a bug shows it in the list and updates the counts
- a too-short title shows an error and adds nothing
- filtering by status
- deleting a bug

## Ideas for next steps

- Edit a bug's title
- Sort by severity or date
- End-to-end tests with Playwright
- Migrate to Next.js
