import "./App.css";
import "@mantine/core/styles.css";
import { HeaderMegaMenu } from "./appshell/HeaderMegaMenu";

import { AppShell, MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header>
          <HeaderMegaMenu />
        </AppShell.Header>
        <AppShell.Main></AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
