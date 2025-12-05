import { useDisclosure } from "@mantine/hooks";
import {
  SegmentedControl,
  Modal,
  Button,
  NavLink,
  Paper,
  Textarea,
  TextInput,
  Center,
  Stack,
  Card,
  Image,
} from "@mantine/core";
import { IconHomeBitcoin } from "@tabler/icons-react";

export function NavCreateCommunity() {
  const [opened, handlers] = useDisclosure(false);
  const privacySettingsData = ["private", "public", "restricted"];

  return (
    <>
      <Modal opened={opened} onClose={handlers.close} title="Start A Community">
        <Stack gap="md">
          <Image
            radius="md"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          ></Image>
          <TextInput
            label="Title"
            description="Enter a unique title."
            placeholder="Type something really cool..."
          />

          <Textarea
            label="Description"
            description="Enter a unique description to describe your subreadit."
            placeholder="Type something cool..."
          />
          <SegmentedControl
            withItemsBorders={false}
            radius={"xl"}
            fullWidth
            data={privacySettingsData}
          />

          <Button fullWidth variant="default">
            Submit
          </Button>
        </Stack>

        {/* Modal content */}
      </Modal>

      <NavLink
        label={"Create Community"}
        leftSection={<IconHomeBitcoin size={16} stroke={1.5} />}
        onClick={handlers.open}
      />
    </>
  );
}
