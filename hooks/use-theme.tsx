"use client";

import { useState } from "react";

const defaultTheme = ["dark", "light", "system"];

export const useTheme = (initialTheme?: string, customThemes?: string) => {
  const [currentTheme, setCurrentTheme] = useState(() => initialTheme ?? "");
  const [themesList, setThemesList] = useState(() => {
    return Array.from(new Set([...defaultTheme, ...(customThemes ?? [])]));
  });

  const setTheme = (theme: string) => {
    const classList = document.body.classList;
    if (currentTheme) classList.remove(currentTheme);

    theme = theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;

    classList.add(theme);
    document.cookie = "theme=" + theme;
    setCurrentTheme(theme);
  };

  return {
    currentTheme,
    themesList,
    setTheme,
    setThemesList,
  };
};
