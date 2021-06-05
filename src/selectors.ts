import { ByRoleOptions } from "@testing-library/dom";
import { byRole } from "testing-library-selector";

export const chakra = {
  menuButton: (
    name: ByRoleOptions["name"],
    options?: Omit<ByRoleOptions, "name">
  ) => byRole("button", { ...options, name }),
  menuItem: (
    name: ByRoleOptions["name"],
    options?: Omit<ByRoleOptions, "name">
  ) => byRole("menuitem", { ...options, name }),
};
