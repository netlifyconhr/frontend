// import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
export const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: "rounded-md shadow-md",
          descriptionClassName: "text-sm text-gray-200",
          actionButtonStyle: { backgroundColor: "#fff" },
        }}
      />
    </ThemeProvider>
  </QueryClientProvider>
);
