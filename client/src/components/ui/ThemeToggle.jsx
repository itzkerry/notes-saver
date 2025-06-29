import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted,setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if(!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <Button
      size='sm' className="text-xs sm:text-sm px-1 py-1 sm:px-4 sm:py-4"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
