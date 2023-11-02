import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./../globals.css";
import Sidebar from "@/components/Sidebar";
import { NextUiProvider, ReduxToolkitProvider } from "../providers";
import MusicPlayer from "@/components/MusicPlayer/index";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Hey there!",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          <main className="dark text-foreground bg-background">
            <Sidebar>{children}</Sidebar>
            <MusicPlayer />
          </main>
        </NextUiProvider>
      </body>
    </html>
  );
}
