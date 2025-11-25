"use client";

import {
  IconSearch,
  IconCirclePlusFilled,
  IconCookieManFilled,
} from "@tabler/icons-react";
import { Autocomplete, Box, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { logoutAction } from "../login/action";
import { useRouter } from "next/navigation";



export function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  const handleSignout = async() =>{ 
    await logoutAction();
    router.push("/login")


  }
  const appButtons = [
    { key: "profile", link: "/profile", label: "Profile", icon: <IconCookieManFilled /> },
    { key: "signout", link: "/signout", label: "Signout", onClick: handleSignout},
    { key: "createpost", link: "/createpost", label: "Create Post", icon: <IconCirclePlusFilled /> },
  ];


  const items = (
    <Box className="flex items-center gap-5">
      {appButtons.map((menu) => (
        <a
          key={menu.key}
          href={menu.link}
          onClick={(event) => event.preventDefault()}
        >
          <Button className="flex" {...(menu.onClick && { onClick: menu.onClick })}>
            {menu.icon}
            {menu.label}
          </Button>
        </a>
      ))}
    </Box>
  );

  const historyAutoComplete = ["React", "Dispatch", "Needle", "Dog"];

  return (
    <header>
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </Group>

      <Group>
        <Group ml={50} gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Autocomplete
          placeholder="Search Readit"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          data={historyAutoComplete}
          visibleFrom="xs"
        />
      </Group>
    </header>
  );
}
