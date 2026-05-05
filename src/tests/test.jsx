import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { expect, test } from "vitest";

test("prevents empty todo from being added", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add todo/i);
  const button = screen.getByText(/add/i);

  await userEvent.type(input, "   ");
  await userEvent.click(button);

  expect(screen.queryByText("")).not.toBeInTheDocument();
});