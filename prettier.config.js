/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/lib/(.*)$",
    "^@/app/(.*)$",
    "^@/styles/(.*)$",
    "^@/server/(.*)$",
    "^@/components/(.*)$",
    "^[./](.*)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
