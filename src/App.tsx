import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  theme,
  Text,
} from "@chakra-ui/react";
import React, { CSSProperties, MouseEvent } from "react";

const toString = (target: string, event: MouseEvent<unknown>) => {
  const { bubbles, cancelable, button } = event;
  return JSON.stringify({ target, bubbles, cancelable, button }, null, 2);
};

const VanillaReact = () => {
  const spanStyle: CSSProperties = {
    pointerEvents: "none",
  };
  return (
    <button onClick={(event) => console.log(toString("button", event))}>
      <span
        style={spanStyle}
        onClick={(event) => console.log(toString("span", event))}
      >
        click me
      </span>
    </button>
  );
};

const ChakraFlavour = () => (
  <ChakraProvider theme={theme}>
    <Menu>
      <MenuButton as={Button}>Open Menu</MenuButton>
      <MenuList onClick={(event) => console.log(toString("MenuList", event))}>
        <MenuItem
          onClick={(event) => console.log(toString("MenuItem", event))}
          command="T"
        >
          Woo-hoo!
        </MenuItem>
        <MenuItem
          icon={<ChevronDownIcon />}
          onClick={(event) => console.log(toString("MenuItem", event))}
          command="K"
        >
          <Text>Crazy</Text>
          <Text>Split</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  </ChakraProvider>
);
const App = () => {
  return (
    <div onClick={(event) => console.log(toString("div", event))}>
      <ChakraFlavour />
      <VanillaReact />
    </div>
  );
};

export default App;
