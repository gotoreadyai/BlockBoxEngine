// vite.config.ts
import { defineConfig } from "file:///home/grzegorz/code/smart-interactive/frontend-service/node_modules/vite/dist/node/index.js";
import react from "file:///home/grzegorz/code/smart-interactive/frontend-service/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { lingui } from "file:///home/grzegorz/code/smart-interactive/frontend-service/node_modules/@lingui/vite-plugin/dist/index.cjs";
import { VitePWA } from "file:///home/grzegorz/code/smart-interactive/frontend-service/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Smart Interactive EDU platform",
        short_name: "SmartInteractive",
        description: "Adaptatywna platforma edukacyjna wspieraj\u0105ca nauczanie hybrydowe.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            "src": "pwa/16x16.png",
            "sizes": "16x16",
            "type": "image/png"
          },
          {
            "src": "pwa/32x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "pwa/72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "pwa/96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "pwa/120x120.png",
            "sizes": "120x120",
            "type": "image/png"
          },
          {
            "src": "pwa/128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "pwa/144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "pwa/152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "pwa/180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "pwa/192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa/384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "pwa/512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "pwa/512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    }),
    react({
      babel: {
        plugins: ["macros"]
      }
    }),
    lingui()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ncnplZ29yei9jb2RlL3NtYXJ0LWludGVyYWN0aXZlL2Zyb250ZW5kLXNlcnZpY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2dyemVnb3J6L2NvZGUvc21hcnQtaW50ZXJhY3RpdmUvZnJvbnRlbmQtc2VydmljZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9ncnplZ29yei9jb2RlL3NtYXJ0LWludGVyYWN0aXZlL2Zyb250ZW5kLXNlcnZpY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgbGluZ3VpIH0gZnJvbSBcIkBsaW5ndWkvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJTbWFydCBJbnRlcmFjdGl2ZSBFRFUgcGxhdGZvcm1cIixcbiAgICAgICAgc2hvcnRfbmFtZTogXCJTbWFydEludGVyYWN0aXZlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgIFwiQWRhcHRhdHl3bmEgcGxhdGZvcm1hIGVkdWthY3lqbmEgd3NwaWVyYWpcdTAxMDVjYSBuYXVjemFuaWUgaHlicnlkb3dlLlwiLFxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgc2NvcGU6IFwiL1wiLFxuICAgICAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgICAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLzE2eDE2LnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjE2eDE2XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInB3YS8zMngzMi5wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIzMngzMlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJwd2EvNzJ4NzIucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNzJ4NzJcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLzk2eDk2LnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjk2eDk2XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInB3YS8xMjB4MTIwLnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjEyMHgxMjBcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLzEyOHgxMjgucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTI4eDEyOFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJwd2EvMTQ0eDE0NC5wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxNDR4MTQ0XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInB3YS8xNTJ4MTUyLnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjE1MngxNTJcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLzE4MHgxODAucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTgweDE4MFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJwd2EvMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInB3YS8zODR4Mzg0LnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjM4NHgzODRcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwicHdhLzUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJwd2EvNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcbiAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICByZWFjdCh7XG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbXCJtYWNyb3NcIl0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGxpbmd1aSgpLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsb0JBQW9CO0FBQ2pYLE9BQU8sV0FBVztBQUNsQixTQUFTLGNBQWM7QUFDdkIsU0FBUyxlQUFlO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFB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
