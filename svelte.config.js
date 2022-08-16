import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    paths: {
      base: "/test/qr-code-svelte/build",
    },
    adapter: adapter({
      // pages: './build',
      // assets: './build',
      fallback: 'index.html',
      precompress: false
    }),
    appDir: '_app'
  },
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },

      postcss: true,
    }),
  ],
};

export default config;
