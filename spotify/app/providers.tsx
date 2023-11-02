"use client";
import { NextUIProvider } from "@nextui-org/react";

export function NextUiProvider({ children }: { children: React.ReactNode }) {
  const props = { children };
  return <NextUIProvider {...props} />;
}
