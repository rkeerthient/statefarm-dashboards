import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";

export default defineConfig({
  plugins: [react(), yextSSG()],
  ssr: {
    noExternal: ["faker", "@yext/react-components"],
  },
});
