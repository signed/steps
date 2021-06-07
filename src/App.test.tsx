import { render, screen } from "@testing-library/react";

import user from "@testing-library/user-event";
import React from "react";
import App from "./App";
import { chakra, menuItem, menuButton } from "./selectors";
import {
  chakra as c,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

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
  user.click(await menuButton("Open Menu").find());
  user.click(await menuItem(/woo-hoo! t/i).find());
});

test("chakra click with custom selectors with indirection", async () => {
  render(<App />);
  user.click(await chakra.menuButton("Open Menu").find());
  user.click(await chakra.menuItem(/woo-hoo! t/i).find());
});

const MenuItemW: React.FC = (props) => {
  return (
    <MenuItem>
      <c.span flex="1" pointerEvents="none">
        {props.children}
      </c.span>
    </MenuItem>
  );
};

test("unable to find menuitem reproducer", async () => {
  render(
    <Menu>
      <MenuButton>Open Menu</MenuButton>
      <MenuList>
        <MenuItemW>
          <Text>Execute</Text>
        </MenuItemW>
      </MenuList>
    </Menu>
  );
  user.click(screen.getByRole("button"));
  user.click(await screen.findByRole("menuitem"));
});
