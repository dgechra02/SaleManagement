"use client";

import { Theme } from "@radix-ui/themes";
import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext<{
    isDark : boolean, // esko bhi null krte eski vale pta nhi ho, per es case me pta hai ki hamesha hi boolean hogi
    setIsDark : ((value : boolean) => void)
}>({
    isDark : true,
    setIsDark : () => {}
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </ThemeContext.Provider>
  );
}