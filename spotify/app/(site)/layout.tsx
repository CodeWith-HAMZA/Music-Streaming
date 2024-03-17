import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import "./../globals.css";
import Sidebar from "@/components/Sidebar";
import { NextUiProvider, ReduxToolkitProvider } from "../providers";
import MusicPlayer from "@/components/MusicPlayer/index";
import Header from "@/components/Header";
import Box from "@/components/Box";
import { getUser } from "@/appwrite";
import { AuthProvider } from "../context/AuthContext";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Hey there!",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  // console.log(user);
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextUiProvider>
            <main className="dark text-foreground bg-[#1F1F1F]">
              <Sidebar>
                <Box className="px-3 overflow-y-auto">
                  <Header
                    className={`flex justify-between bg-gradient-to-b rounded-lg from-teal-800 p-2 to-neutral-900 h-[4rem]`}
                  />

                  {children}
                </Box>
              </Sidebar>

              <MusicPlayer />
            </main>
          </NextUiProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
