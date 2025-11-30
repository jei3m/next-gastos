"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        style: {
          background: "var(--normal-bg)",
          color: "var(--normal-text)",
          border: "2px solid var(--normal-border)",
        },
        classNames: {
          toast: "bg-popover text-popover-foreground border-border",
          success: "!bg-[oklch(79.76%_0.2044_153.08)] text-white",
          error: "!bg-[oklch(62.82%_0.204_26.71)] text-white",
          warning: "!bg-[oklch(62.82%_0.204_26.71)] text-white",
          info: "!bg-[oklch(62.82%_0.132_231.6)] text-white",
        }
      }}
      className="toaster group"
      {...props}
    />
  )
}

export { Toaster }
