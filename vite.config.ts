import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Local .env থেকে load করবে (dev এ), আর Vercel এ process.env থেকে নেবে
  const env = loadEnv(mode, process.cwd(), "");

  // Vercel/CI environment variable priority
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;

  return {
    // ✅ Vercel-এর জন্য base ঠিক করা (assets 404 fix)
    base: "/",

    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [react()],

    // ✅ তোমার কোডে process.env.* ব্যবহার করলে build-time এ inject হবে
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(GEMINI_API_KEY || ""),
      "process.env.API_KEY": JSON.stringify(GEMINI_API_KEY || ""),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
