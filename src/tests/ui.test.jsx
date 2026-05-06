import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { expect, test } from "vitest";

test("toggles todo completion", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add your task/i);
  const button = screen.getByText(/add task/i);

  await userEvent.type(input, "Study");
  await userEvent.click(button);

  const todo = screen.getByText("Study");

  await userEvent.click(todo);

  expect(todo).toHaveClass("underline");
});