import "@/globals.css";

import type { Metadata } from "next";
import Header from "@/shared/components/Header";
import Provider from "@/shared/components/Provider";

export const metadata: Metadata = {
  title: "Grocery Sync",
  description: "Sync your grocery list with your family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-indigo-50 via-cyan-50 to-indigo-50">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
