import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

let basepath="";
if(process.env.NODE_ENV === 'production'){
	basepath = "";
}
if(process.env.NODE_ENV === 'apache'){
  console.log("preparando build para apache");
	basepath = "/test/qr-code-svelte/build";
}

const config = {
  kit: {
    paths: { base: basepath },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
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
