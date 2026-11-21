import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

type User = ReturnType<typeof userEvent.setup>;

async function addBug(user: User, title: string) {
  await user.type(screen.getByLabelText("Title"), title);
  await user.click(screen.getByRole("button", { name: "Add bug" }));
}

describe("Bug Tracker", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows an empty state at the start", () => {
    render(<App />);
    expect(screen.getByText("No bugs found.")).toBeInTheDocument();
  });

  it("adds a bug and shows it in the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addBug(user, "Login button is broken");

    expect(screen.getByText("Login button is broken")).toBeInTheDocument();
    expect(screen.getByText("Open: 1")).toBeInTheDocument();
  });

  it("rejects a title that is too short", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addBug(user, "ab");

    expect(screen.getByRole("alert")).toHaveTextContent("at least 3 characters");
    expect(screen.getByText("No bugs found.")).toBeInTheDocument();
  });

  it("filters bugs by status", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addBug(user, "Checkout page crashes");
    await user.selectOptions(screen.getByLabelText("Status for Checkout page crashes"), "Resolved");
    await user.selectOptions(screen.getByLabelText("Filter by status"), "Open");

    expect(screen.getByText("No bugs found.")).toBeInTheDocument();
  });

  it("deletes a bug", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addBug(user, "Typo on home page");
    await user.click(screen.getByRole("button", { name: "Delete Typo on home page" }));

    expect(screen.queryByText("Typo on home page")).not.toBeInTheDocument();
  });
});
