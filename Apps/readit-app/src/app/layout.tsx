import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
    AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Box,
  Grid,
  GridCol,
  Group,
  Text,
  Title,
} from "@mantine/core";
import theme from "./theme";
import "./globals.css";
import { AppHeader } from "./components/appheader";
import { CommunitiesNavbar } from "./(default)/community/components/communities_navbar";

export const metadata: Metadata = {
  title: "Next App Mantine Tailwind Template",
  description: "Next App Mantine Tailwind Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
        {children}
        </MantineProvider>
      </body>
    </html>
  );
}
