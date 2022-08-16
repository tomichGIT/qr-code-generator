import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    paths: {
      base: ""
    },
    adapter: adapter(),
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
