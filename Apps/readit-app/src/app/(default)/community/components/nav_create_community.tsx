import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, NavLink, Paper, Textarea, TextInput, Center, Stack } from '@mantine/core';
import { IconHomeBitcoin } from '@tabler/icons-react';

export function NavCreateCommunity() {
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={handlers.close} title="Start A Community">
            <Paper shadow="xs" >

<Stack gap="md">
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
    <Button fullWidth  variant="default">Submit</Button>
</Stack>






            </Paper>







        {/* Modal content */}
      </Modal>

            <NavLink
        label={"Create Community"}
        leftSection={<IconHomeBitcoin size={16} stroke={1.5} />}
        onClick={
          handlers.open
        }
      />
    </>
  );
}