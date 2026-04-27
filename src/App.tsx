import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./context/ThemeProvider";
import { SettingsProvider } from "./context/SettingsProvider";

function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <PrimeReactProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </PrimeReactProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}

export default App;
