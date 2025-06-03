import { HeaderMegaMenu } from "#/appshell/HeaderMegaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "#/pages/home";
import Login from "#/pages/login";
import { useState } from "react";
import { AppShell, MantineProvider } from "@mantine/core";
import type { UserDto } from "@shared/models/user";

export default function AppContainer() {
  const [user, setUser] = useState<UserDto | null>(null);

  const onLogin = (userData: UserDto) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };

  return (
    <BrowserRouter>
      <MantineProvider>
        <AppShell padding="md" header={{ height: 60 }}>
          <AppShell.Header>
            <HeaderMegaMenu />
          </AppShell.Header>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}
