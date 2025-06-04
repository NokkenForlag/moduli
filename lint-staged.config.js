export default {
  "*.{ts,tsx}": async (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
    "pnpm typecheck",
  ],

  "*.svelte": async (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write --plugin prettier-plugin-svelte ${filenames.join(" ")}`,
  ],

  "*.{js,jsx,mjs,cjs}": async (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],

  "*.{json,yaml,yml}": (filenames) => `prettier --write ${filenames.join(" ")}`,

  "*.md": (filenames) => `prettier --write ${filenames.join(" ")}`,

  "*.{css,scss}": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
