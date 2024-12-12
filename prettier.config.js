/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/lib/(.*)$",
    "^@/app/(.*)$",
    "^@/styles/(.*)$",
    "^@/hooks/(.*)$",
    "^@/server/(.*)$",
    "^@/components/(.*)$",
    "^[./](.*)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
