import { createContext, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEFAULT_SETTINGS, STORAGE_KEYS } from "../constants/application";
import { createAppTheme } from "../theme";

// eslint-disable-next-line react-refresh/only-export-components
export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [stored, setStored] = useLocalStorage(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS
  );

  // Merge so older saved data picks up newly added fields.
  const settings = useMemo(
    () => ({
      profile: { ...DEFAULT_SETTINGS.profile, ...stored?.profile },
      preferences: { ...DEFAULT_SETTINGS.preferences, ...stored?.preferences },
    }),
    [stored]
  );

  const value = useMemo(
    () => ({
      ...settings,
      updateProfile: (changes) =>
        setStored({
          ...settings,
          profile: { ...settings.profile, ...changes },
        }),
      updatePreferences: (changes) =>
        setStored({
          ...settings,
          preferences: { ...settings.preferences, ...changes },
        }),
      resetSettings: () => setStored(DEFAULT_SETTINGS),
    }),
    [settings, setStored]
  );

  const theme = useMemo(
    () => createAppTheme(settings.preferences.darkMode ? "dark" : "light"),
    [settings.preferences.darkMode]
  );

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}
