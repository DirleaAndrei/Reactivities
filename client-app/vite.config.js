import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(() => {
  return {
    build: {
      outDir: "../API/wwwroot",
    },
    server: {
      port: 3000,
      https: true,
    },
    plugins: [react(), mkcert()],
  };
});
