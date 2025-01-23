"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Button} from "@/components/ui/DarkMode/button";
import { Switch } from "@/components/ui/DarkMode/switch";
import { usecheckSession } from "@/components/ui/auth/checkSession";

const DisplayPage = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  usecheckSession(); 
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme || "system";

  const themeOptions = [
    { 
      id: "light", 
      icon: Sun, 
      label: "Light",
      description: "Clean and bright interface for daytime use",
      ariaLabel: "Switch to light theme"
    },
    { 
      id: "dark", 
      icon: Moon, 
      label: "Dark",
      description: "Easy on the eyes in low-light conditions",
      ariaLabel: "Switch to dark theme"
    },
    { 
      id: "system", 
      icon: Monitor, 
      label: "System",
      description: "Automatically matches your device settings",
      ariaLabel: "Use system theme preferences"
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="max-w-4xl  space-y-8 p-4 sm:p-6 md:p-8">
        <section className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Display Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Customize the appearance of your interface.
          </p>
        </section>

        <section className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeOptions.map(({ id, icon: Icon, label, description, ariaLabel }) => (
              <Button
                key={id}
                variant={currentTheme === id ? "default" : "outline"}
                className={`
                  relative w-auto py-6 h-full  text-center
                  flex flex-col items-start justify-start
                  transition-all duration-200 ease-in-out
                  hover:scale-[1.02] active:scale-[0.98] 
                  ${currentTheme === id 
                    ? "bg-muted text-muted-foreground ring-2 ring-primary" 
                    : "bg-card hover:bg-accent"
                  }
                `}
                onClick={() => setTheme(id)}
                aria-label={ariaLabel}
                aria-pressed={currentTheme === id}
              >
                <div className="w-full space-y-4 flex flex-col  ">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="font-medium text-base">{label}</span>
                    </div>
                    {currentTheme === id && (
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                  </div>
                  
                  <p className=" h-auto w-auto text-sm  text-center leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Button>
            ))}
          </div>

          <div 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-lg bg-muted gap-4"
            role="region"
            aria-label="Quick theme toggle"
          >
            <div className="space-y-1">
              <div className="font-medium">Quick Theme Toggle</div>
              <div className="text-sm text-muted-foreground">
                Currently: {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </div>
            </div>
            <Switch
              checked={resolvedTheme === "dark"}
              onCheckedChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DisplayPage;