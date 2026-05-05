import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { expect, test } from "vitest";

test("adds and deletes a todo", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add your task/i);
  const button = screen.getByText(/add task/i);

  await userEvent.type(input, "Learn React");
  await userEvent.click(button);

  expect(screen.getByText("Learn React")).toBeInTheDocument();

  const deleteBtn = screen.getByAltText(/delete/i);
  await userEvent.click(deleteBtn);

  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});