import { render, screen } from "@testing-library/react";

import user from "@testing-library/user-event";
import React from "react";
import App from "./App";
import { chakra } from "./selectors";

// https://github.com/testing-library/user-event/issues/630 initial implementation
//         https://github.com/testing-library/user-event/releases/tag/v13.1.0
// https://github.com/testing-library/user-event/issues/646#issuecomment-818289198
// https://github.com/testing-library/user-event/issues/639#issuecomment-816984104
// https://github.com/testing-library/user-event/issues/646#issuecomment-818289198 why not skip to the parent

test("vanilla react click", () => {
  render(<App />);
  return expect(async () =>
    user.click(await screen.findByText("click me"))
  ).rejects.toThrow(
    'unable to click element as it has or inherits pointer-events set to "none".'
  );
});

test("chakra click", async () => {
  render(<App />);
  user.click(await screen.findByRole("button", { name: "Open Menu" }));
  user.click(await screen.findByRole("menuitem", { name: /Woo-hoo!/ }));
});

test("chakra click with custom selectors", async () => {
  render(<App />);
  user.click(await chakra.menuButton("Open Menu").find());
  user.click(await chakra.menuItem(/woo-hoo! t/i).find());
});
