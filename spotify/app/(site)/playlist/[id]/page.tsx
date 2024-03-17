'use client'
import React from 'react';

const Playlist = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="flex">
        <main className="flex-1">
          <section className="p-5">
            <div className="flex items-end space-x-5">
              <img
                src="/placeholder.svg"
                alt="Album cover"
                className="h-36 w-36"
                width="144"
                height="144"
                style={{ aspectRatio: '144 / 144', objectFit: 'cover' }}
              />
              <div>
                <h1 className="text-4xl font-bold">Shaddu</h1>
                <p className="text-sm text-[#b3b3b3]">Mr. Waves - 2 songs, 7 min 3 sec</p>
              </div>
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <button className="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#1db954] px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Play</button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M17 12h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M7 12h.01"></path>
              </svg>
            </div>
            <div className="mt-5">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-[#b3b3b3]">#</th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-[#b3b3b3]">Title</th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-[#b3b3b3]">Album</th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-[#b3b3b3]">Date added</th>
                      <th className="[&amp;:has([role=checkbox])]:pr-0 h-12 px-4 text-left align-middle font-medium text-[#b3b3b3]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle font-medium">1</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">Faded</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">Different World</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">3 minutes ago</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">3:32</td>
                    </tr>
                    <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle font-medium">2</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">Cheap Thrills</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">This is Acting</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">2 minutes ago</td>
                      <td className="[&amp;:has([role=checkbox])]:pr-0 p-4 align-middle">3:31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-xl font-bold">Recommended</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p>Rockabye (feat. Sean Paul & Anne-Marie)</p>
                  <button className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Add</button>
                </div>
                <div className="flex items-center justify-between">
                  <p>Alone</p>
                  <button className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Add</button>
                </div>
                <div className="flex items-center justify-between">
                  <p>Cheap Thrills (feat. Sean Paul)</p>
                  <button className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Add</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Playlist;
