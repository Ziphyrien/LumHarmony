import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default {
  plugins: [
    ...tailwindcss(),
    ...(await sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({ fallback: '200.html' }),
    })),
  ],
  server: { host: true },
  lint: {
    ignorePatterns: ['build/**', 'dist/**', '.svelte-kit/**'],
  },
  fmt: {
    singleQuote: true,
    semi: true,
  },
  staged: {
    '*.{js,ts,svelte,css,md,json}': 'vp check --fix',
  },
};
