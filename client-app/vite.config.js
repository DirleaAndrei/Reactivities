import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    build: {
      outDir: "../API/wwwroot",
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
  };
});
