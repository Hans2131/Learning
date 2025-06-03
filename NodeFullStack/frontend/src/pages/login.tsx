import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  type PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import type { UserDto } from "@shared/models/user";
import { useNavigate } from "react-router-dom";

export interface Props {
  onLogin: (user: UserDto) => void;
  paperProps?: PaperProps;
}

async function loginUser(credentials: { email: string; password: string }) {
  return fetch("https://localhost/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

async function registerUser(credentials: {
  email: string;
  password: string;
  username: string;
}) {
  return fetch("https://localhost/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export default function Login({ onLogin, ...props }: Props) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (emailRegex.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    if (type === "register") {
      await registerSubmit(values);
      return;
    }

    loginSubmit(values);
  };

  const loginSubmit = async (values: typeof form.values) => {
    const { email, password } = values;

    try {
      await loginUser({ email, password })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Handle login error
            console.error("Login failed:", response.statusText);
          }
        })
        .then(({ user }: { user: UserDto }) => {
          onLogin(user);
          navigate("/");
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const registerSubmit = async (values: typeof form.values) => {
    const { name, email, password } = values;
    try {
      await registerUser({ email, password, username: name })
        .then((response) => {
          console.log("Register response:", response);
          if (response.status === 201) {
            // Handle successful registration
            return response.json();
          } else {
            // Handle registration error
            console.error("Registration failed:", response.statusText);
          }
        })
        .then((data: UserDto) => {
          console.log("Registration successful:", data);
          toggle(); // Switch to login after successful registration
        });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Paper
      style={{ maxWidth: 400, margin: "auto", padding: 20 }}
      radius="md"
      p="lg"
      withBorder
      {...props}
    >
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

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

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
