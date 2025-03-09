export interface NavItem {
  label: string;
  link?: string;
  icon: string;
  key: string;
  children?: NavItem[];
}
