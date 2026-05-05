import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { expect, test } from "vitest";

test("shows error msg when adding empty todo", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/add your task/i);
  const button = screen.getByText(/add task/i);

  await userEvent.type(input, "   ");
  await userEvent.click(button);

 expect(
  await screen.findByText("Please write a task first!")
  ).toBeInTheDocument();
  
});