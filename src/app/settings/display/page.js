"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Button } from "@/app/ui/components/DarkMode/button";
import { Switch } from "@/app/ui/components/DarkMode/switch";

const DisplayPage = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme || "system";

  const themeOptions = [
    { 
      id: "light", 
      icon: Sun, 
      label: "Light",
      description: "Clean and bright interface for daytime use"
    },
    { 
      id: "dark", 
      icon: Moon, 
      label: "Dark",
      description: "Easy on the eyes in low-light conditions"
    },
    { 
      id: "system", 
      icon: Monitor, 
      label: "System",
      description: "Automatically matches your device settings"
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Display Settings</h1>
        <p className="text-muted-foreground">
          Customize the appearance of your interface.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map(({ id, icon: Icon, label, description }) => (
            <Button
              key={id}
              variant={currentTheme === id ? "default" : "outline"}
              className={`flex-col h-32 space-y-2 relative ${
                currentTheme === id ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
              }`}
              onClick={() => setTheme(id)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
              <span className="text-xs px-2 text-center">
                {description}
              </span>
              {currentTheme === id && (
                <Check className="h-4 w-4 absolute top-2 right-2" />
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
          <div className="space-y-0.5">
            <div className="font-medium">Quick Theme Toggle</div>
            <div className="text-sm text-muted-foreground">
              Currently: {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </div>
          </div>
          <Switch
            checked={resolvedTheme === "dark"}
            onCheckedChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;