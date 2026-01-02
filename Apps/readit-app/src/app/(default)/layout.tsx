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
import { AppHeader } from "../components/appheader";
import { CommunitiesNavbar } from "./community/components/communities_navbar";
import type { ReactNode } from "react";


export default function Layout({ children } : {children: ReactNode}) {
  return (
    <AppShell header={{ height: 60 }} 
    navbar={{
        width: "20%",
        breakpoint: 'sm',
      }}
      padding="md">
      <AppShellHeader>
        <AppHeader />
      </AppShellHeader>

      <AppShellNavbar>
        <CommunitiesNavbar />
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  )
}