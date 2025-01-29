import Image from "next/image";
import type { Metadata } from "next";
import { TanstackProvider } from "~/components/providers/tanstack-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";

import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Voyages | DFDS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <TanstackProvider>
          <nav className="flex w-full items-center justify-center border-b border-white border-opacity-50 bg-gray-800 py-4">
            <div className="flex w-full max-w-screen-xl items-center px-4">
              <Image
                src="/logo.svg"
                alt="DFDS logo"
                width={56}
                height={18}
                priority
              />
            </div>
          </nav>
          <main className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-2">
            <ThemeProvider>{children}</ThemeProvider>
          </main>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}
