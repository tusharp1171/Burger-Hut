import { MenuItem } from "./MenuItem";

export interface Category {
    id: number;
    name: string;
    menuItems: MenuItem[];
  }