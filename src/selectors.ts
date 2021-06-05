import { ByRoleOptions } from "@testing-library/dom";
import { byRole } from "testing-library-selector";

export const menuButton = (
  name: ByRoleOptions["name"],
  options?: Omit<ByRoleOptions, "name">
) => byRole("button", { ...options, name });

export const menuItem = (
  name: ByRoleOptions["name"],
  options?: Omit<ByRoleOptions, "name">
) => byRole("menuitem", { ...options, name });

export const chakra = {
  menuButton,
  menuItem,
};
