"use client";

import { createContext, ReactNode, useState } from "react";
import { Theme } from "@radix-ui/themes";

const themeType = {};

export const ThemeContext = createContext<{
    isDark : boolean, // esko bhi null krte eski vale pta nhi ho, per es case me pta hai ki hamesha hi boolean hogi
    setIsDark : ((value : boolean) => void) | null
}>({
    isDark : true, 
    setIsDark : null
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </ThemeContext.Provider>
  );
}
