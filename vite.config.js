import { sveltekit } from "@sveltejs/kit/vite";


// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
  // esta opción habilita acceder desde LAN!
  server: {
    host: true
  },
};

export default config;