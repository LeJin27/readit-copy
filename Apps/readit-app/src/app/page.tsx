import { ColorSchemesSwitcher } from "@/components/color-schemes-switcher";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Grid,
  GridCol,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { AppHeader } from "./components/appheader";
import { CommunitiesNavbar } from "./community/components/communities_navbar";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <AppHeader />

        <Group className="h-full px-md">
          <Image
            className="dark:invert"
            src="https://nextjs.org/icons/next.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Group>
      </AppShellHeader>

        <AppShellNavbar>
          <CommunitiesNavbar/>
        </AppShellNavbar>

      <AppShellMain>

      </AppShellMain>
    </AppShell>
  );
}
