import type { Metadata } from "next";
import "./globals.css";
import { AgentStateProvider } from "@/hooks/use-agent-state";
import { ConnectionProvider } from "@/hooks/use-connection";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Public_Sans } from "next/font/google";

// Configure the Public Sans font
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

import "@livekit/components-styles";

export const metadata: Metadata = {
  title: "Example Title",
  description:
    "Example Title",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={publicSans.className}>
        <AgentStateProvider>
          <ConnectionProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ConnectionProvider>
        </AgentStateProvider>
      </body>
    </html>
  );
}
