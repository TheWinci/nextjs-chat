import { defaultTheme } from "./Theme.constants";

export type TTheme = typeof defaultTheme;
export type ChangeThemeParams = string | TTheme;
export interface IThemeContext {
  theme: TTheme;
  changeTheme: (params: ChangeThemeParams) => void;
}