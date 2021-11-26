import { ChangeThemeParams } from "./Theme.types";

export const defaultTheme = {
  colors: {
    black: '#222831',
    dark: '#393E46',
    primary: '#00ADB5',
    light: '#EEEEEE',
    error: '#B91646'
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 22
  }
};

export const initialContext = {
  theme: defaultTheme,
  changeTheme: (_params: ChangeThemeParams) => { },
}