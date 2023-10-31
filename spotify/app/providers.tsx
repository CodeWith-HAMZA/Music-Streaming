// app/providers.tsx
"use client";

import store from "@/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

export function NextUiProvider({ children }: { children: React.ReactNode }) {
  const props = { children };
  return <NextUIProvider {...props} />;
}

// * Redux-Toolkit (State-Mangement-Library) Provider On The (Client-Side)
export function ReduxToolkitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const props = { store, children };
  return <Provider {...props} />;
}
