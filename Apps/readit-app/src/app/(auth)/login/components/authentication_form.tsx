"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { loginAction } from "../../../login/action";
import { useRouter } from "next/navigation";
//import { GoogleButton } from './GoogleButton';
//import { TwitterButton } from './TwitterButton';

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const type = "login";
  const handleLogin = async () => {
    console.log("test click");
    const formValues = form.getValues();
    console.log(formValues);
    const credentials = {
      email: formValues.email,
      password: formValues.password,
    };

    const validUser = await loginAction(credentials);
    if (validUser) {
      console.log("Redirecting after successful login");
      router.push("/");
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Paper radius="md" className="max-w-1/4 mx-auto p-5" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Readit, Login with
      </Text>

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" size="xs">
            Already have an account? {type.toLowerCase()}
          </Anchor>
          <Button type="submit" radius="xl" onClick={() => handleLogin()}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
