import { render, screen } from "@testing-library/react";

import events from "@testing-library/user-event";
import React from "react";
import App from "./App";

// https://github.com/testing-library/user-event/issues/630 initial implementation
//         https://github.com/testing-library/user-event/releases/tag/v13.1.0
// https://github.com/testing-library/user-event/issues/646#issuecomment-818289198
// https://github.com/testing-library/user-event/issues/639#issuecomment-816984104
// https://github.com/testing-library/user-event/issues/646#issuecomment-818289198 why not skip to the parent

test("vanilla react click", () => {
  render(<App />);
  return expect(async () =>
    events.click(await screen.findByText("click me"))
  ).rejects.toThrow(
    'unable to click element as it has or inherits pointer-events set to "none".'
  );
});

test("chakra click", async () => {
  render(<App />);
  await screen.findByRole("button", { name: "Open Menu" });
  events.click(await screen.findByRole("button", { name: "Open Menu" }));
  await screen.findByRole("menuitem", {
    name: /woo\-hoo! t/i,
  });
  events.click(await screen.findByRole("menuitem", { name: /Woo-hoo!/ }));
});
