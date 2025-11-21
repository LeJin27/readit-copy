"use client";

import {
  IconSearch,
  IconCirclePlusFilled,
  IconCookieManFilled,
} from "@tabler/icons-react";
import { Autocomplete, Box, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const appButtons = [
  { link: "/profile", label: "Profile", icon: <IconCookieManFilled /> },
  { link: "/createpost", label: "Create Post", icon: <IconCirclePlusFilled /> },
];

export function AppHeader() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = (
    <Box className="flex items-center gap-5">
      {appButtons.map((link) => (
        <a
          key={link.label}
          href={link.link}
          onClick={(event) => event.preventDefault()}
        >
          <Box className="flex">
            {link.icon}
            {link.label}
          </Box>
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
