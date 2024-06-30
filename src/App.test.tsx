import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Ships", () => {
  render(<App />);
  const linkElement = screen.getByText(/Ships/i);
  expect(linkElement).toBeInTheDocument();
});
