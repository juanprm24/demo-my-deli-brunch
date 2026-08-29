import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/demo-my-deli-brunch/",
  },
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    },
  },
});