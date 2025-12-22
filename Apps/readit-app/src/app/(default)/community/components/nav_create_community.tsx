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
  Box,
  Alert,
  Title,
  Group,
  Stepper,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { IconHomeBitcoin } from "@tabler/icons-react";
import { create } from "../actions";
import { NewCommunity } from "../../../../types";

export function NavCreateCommunity() {
  const [opened, handlers] = useDisclosure(false);
  const privacySettingsData = ["private", "public", "restricted"];
  const [showInvalidForm, setShowInvalidForm] = useState(false);
  const [inputFormDisplay, setInputFormDisplay] = useDisclosure(true);
  const [allValues, setAllValues] = useState({
    name: "",
    description: "",
    privacy: "private",
  });
  const [active, setActive] = useState(0);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  function handleSubmitInputForm() {
    if (allValues.name === "" || allValues.description == "") {
      setShowInvalidForm(true);
    } else {
      setShowInvalidForm(false);
      setInputFormDisplay.toggle();
      setActive(1)
    }
  }
  function handleCancelValidForm() {
    setActive(0)
  }
  async function handleSubmitValidForm() {

    const newCommunity : NewCommunity = {name : allValues.name, description: allValues.description, privacy: allValues.privacy}

    const createCommunityAction = async () => {
      await create(newCommunity);
    };
    await createCommunityAction()
    handlers.close()
  }

  function inputForm() {
    return (
      <Stack gap="md">
        <Image
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        ></Image>
        <TextInput
          label="Name"
          value={allValues.name}
          name="name"
          onChange={changeHandler}
          description="Enter a unique title."
          placeholder="Type something really cool..."
        />

        <Textarea
          label="Description"
          description="Enter a unique description to describe your subreadit."
          placeholder="Type something cool..."
          name="description"
          value={allValues.description}
          onChange={changeHandler}
        />
        <SegmentedControl
          withItemsBorders={false}
          radius={"xl"}
          fullWidth
          name="privacy"
          data={privacySettingsData}
          value={allValues.privacy}
          onChange={(value) =>
            setAllValues((prev) => ({ ...prev, privacy: value }))
          }
        />
        <Button fullWidth variant="default" onClick={handleSubmitInputForm}>
          Submit
        </Button>
        {showInvalidForm && (
          <Alert variant="light" title="Invalid Form">
            Make sure description and name is full.
          </Alert>
        )}
      </Stack>
    );
  }

  function validateForm() {
    return (
      <Stack>
        <Title order={1}>{allValues.name}</Title>
        <Text size="lg">{allValues.description}</Text>
        <Text size="lg">{allValues.privacy}</Text>

        <Box className="flex items-center gap-5">
          <Button
            fullWidth
            variant="default"
            onClick={(e) => handleCancelValidForm()}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={(e) => handleSubmitValidForm()}
          >
            Create Community
          </Button>
        </Box>
      </Stack>
    );
  }

        //{inputFormDisplay ? inputForm() : validateForm()}
  return (
    <>
      <Modal opened={opened} onClose={handlers.close} title="Start A Community">
        {/* Modal content */}

        <Stepper active={active} >
          <Stepper.Step label="Input info" description="General">
            {inputForm()}
        </Stepper.Step>
        <Stepper.Step label="Validate Info" description="Double Check">
          {validateForm()}
        </Stepper.Step>

        </Stepper>


      </Modal>

      <NavLink
        label={"Create Community"}
        leftSection={<IconHomeBitcoin size={16} stroke={1.5} />}
        onClick={handlers.open}
      />
    </>
  );
}
